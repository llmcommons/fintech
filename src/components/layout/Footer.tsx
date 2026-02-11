'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">🏦</span>
              <span className="text-xl font-bold text-white">NiveshGuru</span>
            </Link>
            <p className="text-gray-400 mb-4 max-w-md">
              Your trusted guide to Indian government investment schemes.
              Learn, compare, and start your investment journey with confidence.
            </p>
            <p className="text-sm text-gray-500">
              Made with care for Indian investors
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/schemes" className="hover:text-white transition-colors">
                  All Schemes
                </Link>
              </li>
              <li>
                <Link href="/learn" className="hover:text-white transition-colors">
                  Learn Investing
                </Link>
              </li>
              <li>
                <Link href="/calculator" className="hover:text-white transition-colors">
                  Calculators
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-white transition-colors">
                  Compare Schemes
                </Link>
              </li>
              <li>
                <Link href="/recommend" className="hover:text-white transition-colors">
                  Get Recommendations
                </Link>
              </li>
            </ul>
          </div>

          {/* Popular Schemes */}
          <div>
            <h3 className="text-white font-semibold mb-4">Popular Schemes</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/schemes/ppf" className="hover:text-white transition-colors">
                  PPF
                </Link>
              </li>
              <li>
                <Link href="/schemes/ssy" className="hover:text-white transition-colors">
                  Sukanya Samriddhi
                </Link>
              </li>
              <li>
                <Link href="/schemes/scss" className="hover:text-white transition-colors">
                  Senior Citizen Savings
                </Link>
              </li>
              <li>
                <Link href="/schemes/nps" className="hover:text-white transition-colors">
                  NPS
                </Link>
              </li>
              <li>
                <Link href="/schemes/nsc" className="hover:text-white transition-colors">
                  NSC
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-400">
              <strong className="text-yellow-500">Disclaimer:</strong> The information provided on this website is for educational purposes only and should not be considered as financial advice. Interest rates are subject to change as per government notifications. Please verify current rates from official sources before making investment decisions. Past performance is not indicative of future results.
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} NiveshGuru. All rights reserved.</p>
            <p className="mt-2 md:mt-0">
              Interest rates last updated: January 2026
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
