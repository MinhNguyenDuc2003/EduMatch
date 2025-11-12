import dotenv from "dotenv";
import { Request, Response } from "express";
import Stripe from "stripe";

dotenv.config();

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error(
    "STRIPE_SECRET_KEY os required but was not found in env variables"
  );
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createStripePaymentIntent = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { amount, email } = req.body;

  if (!amount || amount <= 0) {
    res
      .status(400)
      .json({ message: "Amount is required and must be greater than 0" });
    return;
  }

  if (!email) {
    res.status(400).json({ message: "Email is required" });
    return;
  }

  try {
    // Check if customer already exists
    const existingCustomer = await stripe.customers.list({
      email: email,
    });
    let customer;
    if (existingCustomer.data.length > 0) {
      customer = existingCustomer.data[0];
    } else {
      customer = await stripe.customers.create({
        email: email,
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: "never",
      },
      customer: customer.id,
    });

    res.status(200).json({ paymentIntent });
  } catch (error) {
    res.status(500).json({ message: "Failed to create payment intent", error });
  }
};
