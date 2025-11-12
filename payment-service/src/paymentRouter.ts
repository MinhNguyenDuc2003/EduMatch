import express from "express";
import { createStripePaymentIntent } from "./paymentController";

const router = express.Router();

router.post("/payment-intent", createStripePaymentIntent);

export default router;
