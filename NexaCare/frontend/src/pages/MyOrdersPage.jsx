import React, { useState, useEffect } from 'react';
import { FiSearch, FiChevronDown } from 'react-icons/fi';
import { useAppContext } from '../context/AppContext';

const MyOrdersPage = () => {
  const { axios: axiosInstance } = useAppContext();
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const { data } = await axiosInstance.get('/booking/my');
        setBookings(data.bookings || []);
      } catch (error) {
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [axiosInstance]);

  // Filter bookings based on active tab and search query
  const filteredBookings = bookings.filter(booking => {
    const matchesTab = activeTab === 'all' || booking.service?.toLowerCase().includes(activeTab);
    const matchesSearch = booking.service?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Get status badge style
  const getStatusBadge = (status) => {
    switch (status) {
      case 'paid': return 'bg-emerald-100 text-emerald-800';
      case 'pending': return 'bg-amber-100 text-amber-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-emerald-800">My Bookings</h1>
          <p className="mt-2 text-lg text-emerald-700">
            View your service booking history
          </p>
        </div>
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search bookings..."
              className="w-full pl-10 pr-4 py-2 border border-emerald-300 rounded-full focus:ring-2 focus:ring-amber-300 focus:border-amber-300 text-emerald-800"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute left-3 top-2.5 text-emerald-500">
              <FiSearch className="h-5 w-5" />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'all' 
                  ? 'bg-emerald-700 text-white hover:bg-emerald-800' 
                  : 'bg-white text-emerald-700 border border-emerald-300 hover:bg-emerald-50'
              }`}
            >
              All Bookings
            </button>
            <button
              onClick={() => setActiveTab('salon')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'salon' 
                  ? 'bg-emerald-700 text-white hover:bg-emerald-800' 
                  : 'bg-white text-emerald-700 border border-emerald-300 hover:bg-emerald-50'
              }`}
            >
              Salon
            </button>
            <button
              onClick={() => setActiveTab('cleaning')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'cleaning' 
                  ? 'bg-emerald-700 text-white hover:bg-emerald-800' 
                  : 'bg-white text-emerald-700 border border-emerald-300 hover:bg-emerald-50'
              }`}
            >
              Cleaning
            </button>
            <button
              onClick={() => setActiveTab('repair')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'repair' 
                  ? 'bg-emerald-700 text-white hover:bg-emerald-800' 
                  : 'bg-white text-emerald-700 border border-emerald-300 hover:bg-emerald-50'
              }`}
            >
              Repair
            </button>
            <button
              onClick={() => setActiveTab('pending')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'pending' 
                  ? 'bg-amber-500 text-white hover:bg-amber-600' 
                  : 'bg-white text-amber-600 border border-amber-300 hover:bg-amber-50'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setActiveTab('paid')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'paid' 
                  ? 'bg-emerald-500 text-white hover:bg-emerald-600' 
                  : 'bg-white text-emerald-600 border border-emerald-300 hover:bg-emerald-50'
              }`}
            >
              Paid
            </button>
          </div>
        </div>
        {loading ? (
          <div className="text-center py-12 text-emerald-600">Loading bookings...</div>
        ) : filteredBookings.length > 0 ? (
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <div 
                key={booking._id} 
                className="bg-white shadow-md overflow-hidden rounded-lg hover:shadow-lg transition-shadow duration-300 border border-emerald-100"
              >
                <div className="px-4 py-5 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-emerald-800">{booking.service}</h3>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(booking.paymentStatus)}`}>
                        {booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-emerald-600">{booking.date} at {booking.time}</div>
                    <div className="mt-1 text-sm text-gray-500">{booking.address}</div>
                  </div>
                  <div className="mt-4 sm:mt-0 text-right">
                    <p className="text-lg font-semibold text-emerald-800">Booking ID: {booking._id}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">No bookings found.</div>
        )}
      </div>
    </div>
  );
};

export default MyOrdersPage;