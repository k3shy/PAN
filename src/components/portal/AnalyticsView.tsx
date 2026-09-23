import { TrendingUp, ShoppingBag, Eye, Users, Package, DollarSign } from 'lucide-react';

const stats = [
  { label: 'Total Visitors', value: '12,847', change: '+12.5%', icon: Eye, positive: true },
  { label: 'Orders This Month', value: '342', change: '+8.2%', icon: ShoppingBag, positive: true },
  { label: 'Revenue', value: 'KSh 1.2M', change: '+15.3%', icon: DollarSign, positive: true },
  { label: 'Active Users', value: '2,156', change: '+5.7%', icon: Users, positive: true },
];

const recentOrders = [
  { id: '#1042', customer: 'John K.', items: 3, total: 'KSh 12,200', status: 'Delivered', date: '2 hours ago' },
  { id: '#1041', customer: 'Mary W.', items: 1, total: 'KSh 5,000', status: 'Processing', date: '4 hours ago' },
  { id: '#1040', customer: 'Peter O.', items: 2, total: 'KSh 7,200', status: 'Shipped', date: '6 hours ago' },
  { id: '#1039', customer: 'Grace M.', items: 4, total: 'KSh 18,500', status: 'Delivered', date: '1 day ago' },
  { id: '#1038', customer: 'David N.', items: 1, total: 'KSh 3,000', status: 'Delivered', date: '1 day ago' },
];

const topProducts = [
  { name: 'P.A.N Oversized Hoodie', sold: 45, revenue: 'KSh 225,000' },
  { name: 'Stitch Bomber Jacket', sold: 32, revenue: 'KSh 272,000' },
  { name: 'Needle Cargo Pants', sold: 28, revenue: 'KSh 117,600' },
  { name: 'Thread Theory Tee', sold: 56, revenue: 'KSh 168,000' },
  { name: 'Embroidered Cap', sold: 67, revenue: 'KSh 167,500' },
];

export default function AnalyticsView() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-grotesk font-bold text-pan-white">Analytics</h2>
        <p className="text-sm text-pan-muted mt-1">Overview of store performance and metrics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-pan-dark border border-white/5 rounded-sm p-5">
            <div className="flex items-center justify-between mb-3">
              <stat.icon size={20} className="text-pan-accent" />
              <span className={`text-xs font-medium ${stat.positive ? 'text-green-400' : 'text-red-400'}`}>
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-grotesk font-bold text-pan-white">{stat.value}</p>
            <p className="text-xs text-pan-muted mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-pan-dark border border-white/5 rounded-sm overflow-hidden">
          <div className="p-4 border-b border-white/5 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-pan-white">Recent Orders</h3>
            <TrendingUp size={16} className="text-pan-accent" />
          </div>
          <div className="divide-y divide-white/5">
            {recentOrders.map(order => (
              <div key={order.id} className="flex items-center gap-4 p-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-pan-white">{order.customer}</p>
                  <p className="text-xs text-pan-muted">{order.id} • {order.items} items • {order.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-pan-white">{order.total}</p>
                  <p className={`text-xs ${
                    order.status === 'Delivered' ? 'text-green-400' :
                    order.status === 'Shipped' ? 'text-blue-400' :
                    'text-yellow-400'
                  }`}>
                    {order.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-pan-dark border border-white/5 rounded-sm overflow-hidden">
          <div className="p-4 border-b border-white/5 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-pan-white">Top Products</h3>
            <Package size={16} className="text-pan-accent" />
          </div>
          <div className="divide-y divide-white/5">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center gap-4 p-4">
                <div className="w-8 h-8 bg-pan-accent/10 rounded-sm flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-pan-accent">#{index + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-pan-white truncate">{product.name}</p>
                  <p className="text-xs text-pan-muted">{product.sold} sold</p>
                </div>
                <p className="text-sm font-medium text-pan-white">{product.revenue}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="bg-pan-dark border border-white/5 rounded-sm p-6">
        <h3 className="text-sm font-semibold text-pan-white mb-4">Revenue Trend (Last 7 Days)</h3>
        <div className="flex items-end gap-2 h-40">
          {[65, 45, 80, 55, 90, 70, 85].map((height, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-2">
              <div
                className="w-full bg-pan-accent/20 rounded-t-sm hover:bg-pan-accent/40 transition-colors cursor-pointer"
                style={{ height: `${height}%` }}
              >
                <div
                  className="w-full bg-pan-accent rounded-t-sm"
                  style={{ height: '60%' }}
                ></div>
              </div>
              <span className="text-[10px] text-pan-muted">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Note */}
      <div className="bg-blue-900/10 border border-blue-900/20 rounded-sm p-4">
        <p className="text-xs text-blue-400">
          <strong>Note:</strong> Analytics data shown is for demonstration purposes. In production, this would be connected to real-time data from your e-commerce platform.
        </p>
      </div>
    </div>
  );
}
