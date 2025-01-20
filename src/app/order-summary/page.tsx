"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { useSelector } from "react-redux"; // Assuming you're using Redux for state management
import { loadCartFromLocalStorage } from "../../../store/cartSlice";
import { useDispatch } from "react-redux";

// Order Summary Component
export default function OrderSummary() {
  const router = useRouter();
  const [orderData, setOrderData] = useState<any>(null); // Order data from the global store or localStorage
  const [products, setProducts] = useState<any[]>([]); // Products in the cart
  const [totalPrice, setTotalPrice] = useState(0); // Total price of the order
  
  const dispatch = useDispatch();

  const cartItems = useSelector((state: any) => state.cart.items); // Get cart items from Redux store
  // Load the cart from localStorage when the component mounts
    useEffect(() => {
      dispatch(loadCartFromLocalStorage()); // Dispatch action to load the cart from localStorage
    }, [dispatch]);

  // Function to calculate total price
  const calculateTotalPrice = () => {
    return cartItems.reduce((total: number, item: any) => total + item.price * item.quantity, 0);
  };
  const vat = (+totalPrice * 0.15).toFixed(2)

  useEffect(() => {
    // Calculate the total price when cartItems are updated
    setTotalPrice(calculateTotalPrice());
    setProducts(cartItems); // Assuming you get the cart items from the Redux store or localStorage
    setOrderData(JSON.parse(localStorage.getItem("orderData") || "{}")); // Retrieve order data from localStorage if available
  }, [cartItems]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Order Summary</h1>

      {/* Shipping Information Section */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4">Shipping Information</h2>
        {orderData ? (
          <div>
            <p className="mb-2">
              <strong>Full Name: </strong>
              {orderData.fullName}
            </p>
            <p className="mb-2">
              <strong>Email: </strong>
              {orderData.email}
            </p>
            <p className="mb-2">
              <strong>Phone Number: </strong>
              {orderData.phoneNumber}
            </p>
            <p className="mb-2">
              <strong>Address: </strong>
              {orderData.address}, {orderData.city}, {orderData.state} - {orderData.postalCode}, {orderData.country}
            </p>
          </div>
        ) : (
          <p>No shipping information available.</p>
        )}
      </div>



      {/* Order Confirmation */}
      <div className="flex justify-center">
        <Button
          onClick={() => router.push("/shipment")}
          className="bg-green-600 text-white hover:bg-green-700 w-full py-3 mt-6 rounded-lg shadow-md"
        >
          Confirm Order
        </Button>
      </div>
    </div>
  );
}
