import { OrderTable } from '@/components/OrderTable';
import type { OrderStatus } from '@rjdenim/shared-types';

interface DashboardOrder {
  id: string;
  orderNumber: string;
  customerEmail: string;
  totalCents: number;
  status: OrderStatus;
  createdAt: string;
  itemCount: number;
}

const MOCK_ORDERS: DashboardOrder[] = [
  {
    id: '1',
    orderNumber: 'RJD-0001',
    customerEmail: 'alex.morgan@example.com',
    totalCents: 18900,
    status: 'processing',
    createdAt: new Date().toISOString(),
    itemCount: 1,
  },
  {
    id: '2',
    orderNumber: 'RJD-0002',
    customerEmail: 'sam.chen@example.com',
    totalCents: 37800,
    status: 'shipped',
    createdAt: new Date(Date.now() - 86_400_000).toISOString(),
    itemCount: 2,
  },
  {
    id: '3',
    orderNumber: 'RJD-0003',
    customerEmail: 'jamie.lee@example.com',
    totalCents: 17500,
    status: 'pending',
    createdAt: new Date(Date.now() - 172_800_000).toISOString(),
    itemCount: 1,
  },
  {
    id: '4',
    orderNumber: 'RJD-0004',
    customerEmail: 'riley.b@example.com',
    totalCents: 53400,
    status: 'delivered',
    createdAt: new Date(Date.now() - 259_200_000).toISOString(),
    itemCount: 3,
  },
];

const STATS = [
  { label: 'Orders Today', value: '12' },
  { label: 'Pending Fulfillment', value: '3' },
  { label: 'Revenue Today', value: '$2,268' },
  { label: 'Avg. Order Value', value: '$189' },
];

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <header className="border-b border-zinc-800 px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <span className="text-base font-semibold tracking-tight text-white">RJ Denim</span>
            <span className="ml-3 text-xs text-zinc-500 font-medium uppercase tracking-widest">Admin</span>
          </div>
          <time className="text-xs text-zinc-500">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
          </time>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-8 py-10 space-y-8">
        {/* Stat tiles */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map(({ label, value }) => (
            <div key={label} className="bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-5">
              <p className="text-xs text-zinc-500 mb-2 font-medium uppercase tracking-wider">{label}</p>
              <p className="text-2xl font-bold text-white tabular-nums">{value}</p>
            </div>
          ))}
        </div>

        {/* Orders table */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between">
            <h2 className="font-semibold text-white">Recent Orders</h2>
            <span className="text-xs text-zinc-500">{MOCK_ORDERS.length} shown</span>
          </div>
          <OrderTable orders={MOCK_ORDERS} />
        </div>
      </main>
    </div>
  );
}
