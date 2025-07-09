import express from 'express';
import { createOrder, razorpayWebhook, getUserBookings } from '../controllers/bookingController.js';
import authUser from '../middleware/authUser.js';

const bookingRouter = express.Router();

// Create Razorpay Order and Booking (authUser enabled)
bookingRouter.post('/create-order', authUser, createOrder);
// Webhook for Razorpay payment verification
bookingRouter.post('/razorpay-webhook', express.json({ type: '*/*' }), razorpayWebhook);
// Get bookings for logged-in user
bookingRouter.get('/my', authUser, getUserBookings);

export default bookingRouter; 