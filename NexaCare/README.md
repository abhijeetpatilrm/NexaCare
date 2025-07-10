# NexaCare - Home Services Booking Platform

A full-stack web application for booking home services like cleaning, salon services, repairs, and more. Built with the MERN stack and integrated with Razorpay for secure payments.

## 🚀 Features

- **User Authentication**: Secure login/register with JWT
- **Service Booking**: Browse and book various home services
- **Shopping Cart**: Add multiple services to cart
- **Payment Integration**: Secure payments via Razorpay
- **Booking Management**: View booking history and status
- **Responsive Design**: Works on desktop and mobile
- **Real-time Updates**: Live booking status updates

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Razorpay** - Payment gateway

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Razorpay account

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/nexacare.git
cd nexacare
```

### 2. Install dependencies
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Environment Setup

#### Backend (.env in backend folder)
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
CLIENT_URL=http://localhost:5173
```

#### Frontend (.env in frontend folder)
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

### 4. Start the application
```bash
# Start backend (from backend folder)
npm start

# Start frontend (from frontend folder)
npm run dev
```

## 🌐 Deployment

### Frontend (Vercel/Netlify)
1. Build the frontend: `npm run build`
2. Deploy to Vercel or Netlify
3. Set environment variables in deployment platform

### Backend (Railway/Render)
1. Connect your GitHub repository
2. Set environment variables
3. Deploy

## 📱 Usage

1. **Register/Login**: Create an account or sign in
2. **Browse Services**: Explore available home services
3. **Add to Cart**: Select services and add to cart
4. **Book & Pay**: Fill booking details and complete payment
5. **Track Bookings**: View booking history and status

## 🔧 API Endpoints

### Authentication
- `POST /api/user/register` - User registration
- `POST /api/user/login` - User login
- `GET /api/user/is-auth` - Check authentication
- `GET /api/user/logout` - User logout

### Bookings
- `POST /api/booking/create-order` - Create booking and payment order
- `GET /api/booking/my` - Get user bookings
- `POST /api/booking/razorpay-webhook` - Payment verification webhook

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Abhijeet Patil - [GitHub](https://github.com/abhijeetpatilrm)

## 🙏 Acknowledgments

- Razorpay for payment integration
- MongoDB Atlas for database hosting
- Tailwind CSS for styling
