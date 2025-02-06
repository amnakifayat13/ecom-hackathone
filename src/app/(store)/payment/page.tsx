"use client"; // This directive ensures the component runs only on the client side in a Next.js app.

import React, { useState, useEffect, useRef } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, loadCartFromLocalStorage, updateStockAfterPayment } from "../../../../store/cartSlice"; // Assuming you have this action in your cartSlice
import { createPaymentIntent } from "./action"; // Update this path as per your setup
import { useRouter } from "next/navigation";

// Initialize Stripe with the public key from environment variables
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export default function CheckoutPage() {
  const dispatch = useDispatch();

  const [clientSecret, setClientSecret] = useState<string | null>(null); // For storing client secret
  const [isLoading, setIsLoading] = useState(true); // For showing loading state
  const cartItems = useSelector((state: any) => state.cart.items); // Getting cart items from Redux state
  const [totalAmount, setTotalAmount] = useState<number>(0); // Store the total amount of the cart
  const [vatAmount, setVatAmount] = useState<number>(0); // For storing calculated VAT amount

  const hasLoadedRef = useRef(false); // Ref to track if cart has been loaded

  useEffect(() => {
    // Load cart from localStorage only once when the cart is empty
    if (!hasLoadedRef.current && (cartItems || []).length === 0) {
      dispatch(loadCartFromLocalStorage());
      hasLoadedRef.current = true; // Mark as loaded
    }

    // Calculate the total price and VAT from cart items
    const calculatedTotal = calculateTotal(cartItems);
    const taxAmount = calculateTax(calculatedTotal); // 15% VAT calculation
    const totalWithTax = calculatedTotal + taxAmount; // Add VAT to the total

    setTotalAmount(totalWithTax);
    setVatAmount(taxAmount);

    // Request PaymentIntent from the server
    createPaymentIntent(totalWithTax)
      .then((res) => {
        setClientSecret(res.clientSecret); // Save the client secret to state
        setIsLoading(false); // Stop loading when the payment intent is created
      })
      .catch((error) => {
        console.error("Error creating payment intent:", error);
        setIsLoading(false); // Stop loading even if an error occurs
      });
  }, [cartItems, dispatch]); // Run this effect only when cartItems changes

  // Function to calculate the total price of cart items
  const calculateTotal = (items: any[]) => {
    return items.reduce((total: number, item: any) => {
      return total + item.price * item.quantity; // Assuming each item has a price and quantity
    }, 0);
  };

  // Function to calculate 15% VAT
  const calculateTax = (total: number) => {
    return total * 0.15; // 15% VAT
  };

  // While waiting for the client secret, show a loading message
  if (isLoading || !clientSecret) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ maxWidth: 400, margin: "0 auto" }} >
      <h1 className="text-xl md:text-2xl font-semibold mt-10 mb-4 text-green-600 ml-10 md:ml-40">Payment</h1>
      {/* Display Total Amount and VAT Amount */}
      <div className="mb-10">
        <p className="text-blue-600 ml-10 md:ml-40">Subtotal: ${totalAmount - vatAmount}</p>
        <p className="text-blue-600 ml-10 md:ml-40">VAT (15%): ${vatAmount}</p>
        <p className="text-green-600 font-bold ml-10 md:ml-40">Total: ${totalAmount}</p>
      </div>
      {/* Wrap the payment form inside the Elements provider with Stripe instance and client secret */}
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <PaymentForm cartItems={cartItems} />
      </Elements>
    </div>
  );
}

function PaymentForm({ cartItems }: { cartItems: any[] }) {
  const stripe = useStripe(); // Hook to access Stripe methods
  const elements = useElements(); // Hook to access Stripe elements
  const dispatch = useDispatch(); // Hook to dispatch Redux actions
  const router = useRouter(); // Hook to navigate programmatically
  const [isProcessing, setIsProcessing] = useState(false); // State to manage loading state while processing
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State to show error messages

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page refresh when submitting the form

    if (!stripe || !elements) return; // Ensure Stripe is loaded before proceeding

    setIsProcessing(true); // Indicate that the payment is being processed

    // Attempt to confirm the payment
    const { error } = await stripe.confirmPayment({
      elements,
      redirect: "if_required", // Redirect if required by the payment method
    });

    if (error) {
      setErrorMessage(error.message || "An unknown error occurred"); // Display error message if payment fails
      setIsProcessing(false);
    } else {
      // Payment was successful
      setErrorMessage(null);
      alert("Payment successful!"); // Notify the user

      // Clear the cart after successful payment
      dispatch(clearCart()); // Dispatch the action to clear the cart in Redux

      // Dispatch the action to update the stock in Sanity after successful payment
      if (Array.isArray(cartItems) && cartItems.length > 0) {
        dispatch(updateStockAfterPayment(cartItems)); // Only pass an array to the thunk
      }

      setIsProcessing(false);

      // Optionally redirect the user to a success page after clearing the cart
      router.push("/success"); 
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Stripe's payment element (handles input fields for card details, etc.) */}
        <PaymentElement />
        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className="mt-10 bg-yellow-600 py-3 px-4 text-white w-full"
        >
          {isProcessing ? "Processing..." : "Pay Now"} {/* Show dynamic button text */}
        </button>
        {/* Display any error messages if they occur */}
        {errorMessage && <div style={{ color: "red", marginTop: 8 }}>{errorMessage}</div>}
      </form>
    </div>
  );
}
