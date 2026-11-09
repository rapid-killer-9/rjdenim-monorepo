import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'RJ Denim — Premium Jeans',
  description: 'Shop premium denim crafted for every fit, every wash.',
  openGraph: {
    title: 'RJ Denim',
    description: 'Premium jeans in every wash and waist.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-stone-50 text-stone-900 antialiased">
        {children}
      </body>
    </html>
  );
}
