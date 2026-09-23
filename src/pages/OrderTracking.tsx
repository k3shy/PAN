import { useState } from 'react';
import { Package, Truck, CheckCircle, Clock, Search } from 'lucide-react';

export default function OrderTracking() {
  const [orderId, setOrderId] = useState('');
  const [tracking, setTracking] = useState<any>(null);
  const [error, setError] = useState('');

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Demo tracking data
    if (orderId === 'PAN-1042' || orderId.length > 0) {
      setTracking({
        orderId: orderId || 'PAN-1042',
        status: 'In Transit',
        estimatedDelivery: 'Dec 28, 2026',
        items: [
          { name: 'P.A.N Oversized Hoodie', qty: 1, price: 5000 },
          { name: 'Needle Cargo Pants', qty: 1, price: 4200 },
        ],
        timeline: [
          { date: 'Dec 24, 2026', time: '2:30 PM', status: 'Order Placed', completed: true },
          { date: 'Dec 25, 2026', time: '10:15 AM', status: 'Processing', completed: true },
          { date: 'Dec 26, 2026', time: '3:45 PM', status: 'Shipped', completed: true },
          { date: 'Dec 27, 2026', time: '9:20 AM', status: 'In Transit', completed: true, current: true },
          { date: 'Dec 28, 2026', time: 'Estimated', status: 'Delivered', completed: false },
        ],
      });
    } else {
      setError('Order not found. Please check your order ID.');
    }
  };

  return (
    <div className="min-h-screen bg-pan-black pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-grotesk font-bold text-pan-white">
            Track Your Order
          </h1>
          <p className="text-sm text-pan-muted mt-2">
            Enter your order ID to see the latest status
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleTrack} className="mb-8">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Package size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-pan-muted" />
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Enter Order ID (e.g., PAN-1042)"
                className="w-full pl-12 pr-4 py-4 bg-pan-dark border border-white/10 rounded-sm text-white placeholder-pan-muted focus:outline-none focus:border-pan-accent transition-colors"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-4 bg-pan-accent text-white font-medium rounded-sm hover:bg-red-600 transition-all flex items-center gap-2"
            >
              <Search size={18} />
              <span className="hidden sm:inline">Track</span>
            </button>
          </div>
          {error && <p className="text-sm text-red-400 mt-2">{error}</p>}
        </form>

        {/* Tracking Results */}
        {tracking && (
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-pan-dark border border-white/5 rounded-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs text-pan-muted">Order ID</p>
                  <p className="text-lg font-grotesk font-bold text-pan-white">{tracking.orderId}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-pan-muted">Estimated Delivery</p>
                  <p className="text-sm font-medium text-pan-accent">{tracking.estimatedDelivery}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-pan-accent/10 border border-pan-accent/30 rounded-sm">
                <Truck size={16} className="text-pan-accent" />
                <span className="text-sm font-medium text-pan-accent">{tracking.status}</span>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-pan-dark border border-white/5 rounded-sm p-6">
              <h3 className="text-sm font-semibold text-pan-white mb-6">Tracking Timeline</h3>
              <div className="space-y-0">
                {tracking.timeline.map((step: any, index: number) => (
                  <div key={index} className="flex gap-4 relative">
                    {/* Line */}
                    {index < tracking.timeline.length - 1 && (
                      <div className={`absolute left-[15px] top-8 w-0.5 h-full ${
                        step.completed ? 'bg-pan-accent' : 'bg-white/10'
                      }`}></div>
                    )}
                    {/* Icon */}
                    <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      step.completed
                        ? step.current
                          ? 'bg-pan-accent'
                          : 'bg-pan-accent/20'
                        : 'bg-pan-gray border border-white/10'
                    }`}>
                      {step.completed ? (
                        <CheckCircle size={16} className={step.current ? 'text-white' : 'text-pan-accent'} />
                      ) : (
                        <Clock size={16} className="text-pan-muted" />
                      )}
                    </div>
                    {/* Content */}
                    <div className="flex-1 pb-8">
                      <p className={`text-sm font-medium ${
                        step.completed ? 'text-pan-white' : 'text-pan-muted'
                      }`}>
                        {step.status}
                      </p>
                      <p className="text-xs text-pan-muted mt-1">
                        {step.date} • {step.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-pan-dark border border-white/5 rounded-sm p-6">
              <h3 className="text-sm font-semibold text-pan-white mb-4">Order Items</h3>
              <div className="space-y-3">
                {tracking.items.map((item: any, index: number) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                    <div>
                      <p className="text-sm text-pan-white">{item.name}</p>
                      <p className="text-xs text-pan-muted">Qty: {item.qty}</p>
                    </div>
                    <p className="text-sm font-medium text-pan-white">KSh {item.price.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Demo Note */}
        <div className="mt-8 bg-blue-900/10 border border-blue-900/20 rounded-sm p-4">
          <p className="text-xs text-blue-400">
            <strong>Demo:</strong> Enter any order ID (e.g., PAN-1042) to see sample tracking data. 
            In production, this would connect to your shipping provider's API.
          </p>
        </div>
      </div>
    </div>
  );
}
