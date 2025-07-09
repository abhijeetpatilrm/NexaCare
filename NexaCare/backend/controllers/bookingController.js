import Booking from '../models/Booking.js';
import razorpay from '../config/razorpay.js';
import crypto from 'crypto';

// POST /api/booking/create-order
export const createOrder = async (req, res) => {
  try {
    const { service, address, date, time, mobile, amount } = req.body;
    const userId = req.userId;

    // Create a new booking with paymentStatus 'pending'
    const booking = await Booking.create({
      user: userId,
      service,
      address,
      date,
      time,
      mobile,
      paymentStatus: 'pending',
    });

    // Create Razorpay order
    const options = {
      amount: amount * 100, // amount in paise
      currency: 'INR',
      receipt: `receipt_order_${booking._id}`,
      notes: {
        bookingId: booking._id.toString(),
      },
    };
    const order = await razorpay.orders.create(options);

    // Save Razorpay order ID to booking
    booking.stripeSessionId = order.id; // reuse field for now, or rename to razorpayOrderId
    await booking.save();

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.RAZORPAY_KEY_ID,
      bookingId: booking._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create Razorpay order' });
  }
};

// POST /api/booking/razorpay-webhook
export const razorpayWebhook = async (req, res) => {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  const signature = req.headers['x-razorpay-signature'];
  const body = JSON.stringify(req.body);

  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex');

  if (signature === expectedSignature) {
    // Payment is verified
    const payment = req.body.payload.payment.entity;
    const orderId = payment.order_id;
    // Find and update booking
    const booking = await Booking.findOne({ stripeSessionId: orderId });
    if (booking) {
      booking.paymentStatus = 'paid';
      await booking.save();
    }
    res.status(200).json({ status: 'ok' });
  } else {
    res.status(400).json({ status: 'invalid signature' });
  }
};

// GET /api/booking/my
export const getUserBookings = async (req, res) => {
  const userId = req.userId;
  const bookings = await Booking.find({ user: userId }).sort({ createdAt: -1 });
  res.json({ bookings });
}; 