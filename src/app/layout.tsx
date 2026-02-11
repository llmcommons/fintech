import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NiveshGuru - Indian Government Investment Schemes Guide',
  description: 'Learn about PPF, SSY, NPS, SCSS and other government investment schemes. Get personalized recommendations and calculate your returns.',
  keywords: 'PPF, Sukanya Samriddhi, NPS, SCSS, government schemes, investment India, tax saving',
  openGraph: {
    title: 'NiveshGuru - Your Investment Guide',
    description: 'Learn about Indian government investment schemes and get personalized recommendations.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
