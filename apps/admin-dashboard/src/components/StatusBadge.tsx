import type { OrderStatus } from '@rjdenim/shared-types';

const STYLES: Record<OrderStatus, string> = {
  pending:    'bg-amber-500/10   text-amber-400   border-amber-500/20',
  confirmed:  'bg-sky-500/10     text-sky-400     border-sky-500/20',
  processing: 'bg-indigo-500/10  text-indigo-400  border-indigo-500/20',
  shipped:    'bg-violet-500/10  text-violet-400  border-violet-500/20',
  delivered:  'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  cancelled:  'bg-red-500/10     text-red-400     border-red-500/20',
  refunded:   'bg-zinc-600/10    text-zinc-400    border-zinc-600/20',
};

export function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${STYLES[status]}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
