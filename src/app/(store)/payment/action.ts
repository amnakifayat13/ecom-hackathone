"use server";

import Stripe from "stripe";

export async function createPaymentIntent(cartTotal: number) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2025-01-27.acacia", // or the latest stable version
  });
  try {
    // Ensure the cart total is passed in and converted to the correct amount in cents
    const amount = cartTotal * 100; // Amount should be in cents

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd", // Currency (USD in this case)
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return {
      clientSecret: paymentIntent.client_secret,
    };
  } catch (error) {
    console.error("Error creating payment intent:", error);
    throw error;
  }
}

