"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStripePaymentIntent = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const stripe_1 = __importDefault(require("stripe"));
dotenv_1.default.config();
if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY os required but was not found in env variables");
}
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY);
const createStripePaymentIntent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const existingCustomer = yield stripe.customers.list({
            email: email,
        });
        let customer;
        if (existingCustomer.data.length > 0) {
            customer = existingCustomer.data[0];
        }
        else {
            customer = yield stripe.customers.create({
                email: email,
            });
        }
        const paymentIntent = yield stripe.paymentIntents.create({
            amount: Math.round(amount * 100),
            currency: "usd",
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: "never",
            },
            customer: customer.id,
        });
        res.status(200).json({ data: paymentIntent });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to create payment intent", error });
    }
});
exports.createStripePaymentIntent = createStripePaymentIntent;
