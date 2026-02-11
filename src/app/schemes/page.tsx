'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Filter, ArrowRight, Shield, TrendingUp, Clock } from 'lucide-react';
import { schemes, Scheme } from '@/data/schemes';
import { Badge } from '@/components/ui';
import { getRiskColor, getRiskLabel } from '@/lib/utils';

type FilterOption = 'all' | 'tax-saving' | 'seniors' | 'women' | 'high-returns';

export default function SchemesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterOption>('all');

  const filters: { id: FilterOption; label: string }[] = [
    { id: 'all', label: 'All Schemes' },
    { id: 'tax-saving', label: 'Tax Saving (80C)' },
    { id: 'high-returns', label: 'High Returns' },
    { id: 'seniors', label: 'For Seniors' },
    { id: 'women', label: 'For Women' },
  ];

  const filteredSchemes = schemes.filter((scheme) => {
    // Search filter
    const matchesSearch =
      searchQuery === '' ||
      scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.description.toLowerCase().includes(searchQuery.toLowerCase());

    // Category filter
    let matchesFilter = true;
    if (activeFilter === 'tax-saving') {
      matchesFilter = scheme.taxBenefit.section80C || scheme.taxBenefit.section80CCD;
    } else if (activeFilter === 'seniors') {
      matchesFilter = scheme.eligibility.minAge !== null && scheme.eligibility.minAge >= 55;
    } else if (activeFilter === 'women') {
      matchesFilter = scheme.eligibility.gender === 'female';
    } else if (activeFilter === 'high-returns') {
      matchesFilter = parseFloat(scheme.interestRate) >= 7.5;
    }

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Government Investment Schemes
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Explore all government-backed investment options. Compare interest rates,
            lock-in periods, and tax benefits to find the perfect scheme for you.
          </p>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="bg-white border-b sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            {/* Search */}
            <div className="relative flex-grow max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search schemes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeFilter === filter.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Schemes Grid */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredSchemes.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No schemes found matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveFilter('all');
                }}
                className="mt-4 text-primary-600 hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSchemes.map((scheme) => (
                <SchemeCard key={scheme.id} scheme={scheme} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Info Banner */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary-50 border border-primary-100 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-primary-900 mb-2">
              Not sure which scheme is right for you?
            </h3>
            <p className="text-primary-700 mb-4">
              Take our quick questionnaire to get personalized recommendations based on
              your age, goals, and investment capacity.
            </p>
            <Link
              href="/recommend"
              className="inline-flex items-center bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Get Recommendations
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function SchemeCard({ scheme }: { scheme: Scheme }) {
  return (
    <Link
      href={`/schemes/${scheme.id}`}
      className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all group"
    >
      {/* Header */}
      <div
        className="p-4 flex items-center justify-between"
        style={{ backgroundColor: `${scheme.color}10` }}
      >
        <div className="flex items-center space-x-3">
          <span className="text-3xl">{scheme.icon}</span>
          <div>
            <h3 className="font-bold text-gray-900">{scheme.shortName}</h3>
            <p className="text-sm text-gray-600">{scheme.name}</p>
          </div>
        </div>
        <div
          className="text-xl font-bold"
          style={{ color: scheme.color }}
        >
          {scheme.interestRate}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{scheme.tagline}</p>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <Clock className="w-4 h-4 text-gray-400 mx-auto mb-1" />
            <p className="text-xs text-gray-500">Lock-in</p>
            <p className="text-sm font-medium text-gray-900">{scheme.lockInPeriod}</p>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <TrendingUp className="w-4 h-4 text-gray-400 mx-auto mb-1" />
            <p className="text-xs text-gray-500">Min Invest</p>
            <p className="text-sm font-medium text-gray-900">₹{scheme.minInvestment}</p>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <Shield className="w-4 h-4 text-gray-400 mx-auto mb-1" />
            <p className="text-xs text-gray-500">Risk</p>
            <p className="text-sm font-medium text-gray-900 capitalize">
              {scheme.riskLevel.replace('-', ' ')}
            </p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {scheme.taxBenefit.section80C && (
            <Badge variant="success" size="sm">80C Tax Benefit</Badge>
          )}
          {scheme.taxBenefit.section80CCD && (
            <Badge variant="success" size="sm">80CCD Benefit</Badge>
          )}
          {scheme.taxBenefit.status === 'EEE' && (
            <Badge variant="info" size="sm">Tax Free (EEE)</Badge>
          )}
          {scheme.eligibility.gender === 'female' && (
            <Badge variant="warning" size="sm">Women Only</Badge>
          )}
          {scheme.eligibility.minAge && scheme.eligibility.minAge >= 55 && (
            <Badge variant="default" size="sm">Seniors</Badge>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
        <span className="text-sm text-gray-500">
          Best for: {scheme.bestFor[0]}
        </span>
        <span className="text-primary-600 group-hover:translate-x-1 transition-transform">
          <ArrowRight className="w-5 h-5" />
        </span>
      </div>
    </Link>
  );
}
