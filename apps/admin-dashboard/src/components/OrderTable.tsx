import type { OrderStatus } from '@rjdenim/shared-types';
import { StatusBadge } from './StatusBadge';

interface DashboardOrder {
  id: string;
  orderNumber: string;
  customerEmail: string;
  totalCents: number;
  status: OrderStatus;
  createdAt: string;
  itemCount: number;
}

export function OrderTable({ orders }: { orders: DashboardOrder[] }) {
  if (!orders.length) {
    return (
      <div className="px-6 py-12 text-center text-sm text-zinc-500">
        No orders found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs text-zinc-500 border-b border-zinc-800">
            <th className="px-6 py-3 font-medium">Order #</th>
            <th className="px-6 py-3 font-medium">Customer</th>
            <th className="px-6 py-3 font-medium">Items</th>
            <th className="px-6 py-3 font-medium text-right">Total</th>
            <th className="px-6 py-3 font-medium">Status</th>
            <th className="px-6 py-3 font-medium">Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800/60">
          {orders.map((order) => (
            <tr
              key={order.id}
              className="hover:bg-zinc-800/40 transition-colors cursor-pointer"
            >
              <td className="px-6 py-4 font-mono text-xs text-zinc-300 whitespace-nowrap">
                {order.orderNumber}
              </td>
              <td className="px-6 py-4 text-zinc-300 max-w-[200px] truncate">
                {order.customerEmail}
              </td>
              <td className="px-6 py-4 text-zinc-500 tabular-nums">
                {order.itemCount}
              </td>
              <td className="px-6 py-4 text-white font-semibold text-right tabular-nums whitespace-nowrap">
                {(order.totalCents / 100).toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
              </td>
              <td className="px-6 py-4">
                <StatusBadge status={order.status} />
              </td>
              <td className="px-6 py-4 text-zinc-500 whitespace-nowrap">
                {new Date(order.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
