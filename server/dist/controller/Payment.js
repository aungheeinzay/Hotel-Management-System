import errorHandler from "../lib/errorHandler.js";
import { Booking } from "../model/booking.js";
import { NotFoundError } from "../lib/notFound.js";
import { Stripe } from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export const stripeCheckOutSession = errorHandler(async (bookingId) => {
    const booking = await Booking.findById(bookingId).populate("room");
    if (!booking)
        throw new NotFoundError("Book does not exist");
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        client_reference_id: booking.id,
        customer_email: booking.customer.email,
        mode: "payment",
        success_url: `${process.env.CLIENT_URL}/bookings/me/${booking.user}`,
        cancel_url: `${process.env.CLIENT_URL}/bookings/me/${booking.user}`,
        line_items: [{
                price_data: {
                    unit_amount: booking.amount.total * 100,
                    currency: "usd",
                    product_data: {
                        name: booking.room.title,
                        description: booking.room.description,
                        images: [booking.room.images?.[0]?.url],
                    }
                },
                quantity: 1,
            }]
    });
    return { url: session.url };
});
export const webhookHandler = errorHandler(async (signature, rawBody) => {
    const event = stripe.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET);
    if (event.type == "checkout.session.completed") {
        const session = event.data.object;
        const bookingId = session.client_reference_id;
        const paymentInfo = {
            id: session.payment_intent,
            status: session.payment_status,
            method: session.payment_method_types[0],
        };
        await Booking.findByIdAndUpdate(bookingId, ({ paymentInfo }));
        return true;
    }
});
