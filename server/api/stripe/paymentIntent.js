import Stripe from "stripe";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const stripe = new Stripe(process.env.STRIPE_SK_KEY);
  return stripe.paymentIntents.create({
    amount: Number(body.amount * 100),
    currency: "IDR",
    automatic_payment_methods: { enabled: true },
  });
});
