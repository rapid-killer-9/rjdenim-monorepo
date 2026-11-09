import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'RJ Denim — Admin',
  description: 'Order and inventory management dashboard',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-zinc-950 text-zinc-100 antialiased">
        {children}
      </body>
    </html>
  );
}
