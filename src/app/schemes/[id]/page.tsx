import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  Shield,
  FileText,
  Building,
  Calculator,
  Users,
  AlertCircle,
} from 'lucide-react';
import { schemes, getSchemeById } from '@/data/schemes';
import { Badge } from '@/components/ui';
import { formatCurrencyFull, getRiskColor, getRiskLabel } from '@/lib/utils';

export function generateStaticParams() {
  return schemes.map((scheme) => ({
    id: scheme.id,
  }));
}

interface SchemePageProps {
  params: { id: string };
}

export default function SchemePage({ params }: SchemePageProps) {
  const scheme = getSchemeById(params.id);

  if (!scheme) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/schemes"
            className="inline-flex items-center text-gray-600 hover:text-primary-600"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to all schemes
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section
        className="py-12"
        style={{ backgroundColor: `${scheme.color}08` }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center space-x-4">
              <span className="text-5xl">{scheme.icon}</span>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                  {scheme.name}
                </h1>
                <p className="text-xl text-gray-600 mt-1">{scheme.shortName}</p>
              </div>
            </div>
            <div className="flex flex-col items-start md:items-end">
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">Interest Rate</span>
                <span
                  className="text-3xl font-bold"
                  style={{ color: scheme.color }}
                >
                  {scheme.interestRate}
                </span>
                {scheme.rateType === 'fixed' && (
                  <Badge variant="success">Fixed</Badge>
                )}
                {scheme.rateType === 'market-linked' && (
                  <Badge variant="warning">Market-linked</Badge>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Rate as of Q1 2026 (subject to change)
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center space-x-2 text-gray-500 mb-1">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Lock-in Period</span>
              </div>
              <p className="text-xl font-semibold text-gray-900">{scheme.lockInPeriod}</p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center space-x-2 text-gray-500 mb-1">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">Min Investment</span>
              </div>
              <p className="text-xl font-semibold text-gray-900">
                {formatCurrencyFull(scheme.minInvestment)}
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center space-x-2 text-gray-500 mb-1">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">Max Investment</span>
              </div>
              <p className="text-xl font-semibold text-gray-900">
                {scheme.maxInvestment ? formatCurrencyFull(scheme.maxInvestment) : 'No limit'}
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center space-x-2 text-gray-500 mb-1">
                <Shield className="w-4 h-4" />
                <span className="text-sm">Risk Level</span>
              </div>
              <p className={`text-xl font-semibold ${getRiskColor(scheme.riskLevel)}`}>
                {getRiskLabel(scheme.riskLevel)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">About {scheme.shortName}</h2>
                <p className="text-gray-600 leading-relaxed">{scheme.description}</p>
                <p className="text-lg font-medium text-gray-800 mt-4 italic">
                  &ldquo;{scheme.tagline}&rdquo;
                </p>
              </div>

              {/* Key Features */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Features</h2>
                <ul className="space-y-3">
                  {scheme.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Eligibility */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Who Can Invest?
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500">Age Requirement</p>
                      <p className="font-medium text-gray-900">
                        {scheme.eligibility.minAge && scheme.eligibility.maxAge
                          ? `${scheme.eligibility.minAge} - ${scheme.eligibility.maxAge} years`
                          : scheme.eligibility.minAge
                          ? `${scheme.eligibility.minAge}+ years`
                          : scheme.eligibility.maxAge
                          ? `Up to ${scheme.eligibility.maxAge} years`
                          : 'No age limit'}
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500">Gender</p>
                      <p className="font-medium text-gray-900 capitalize">
                        {scheme.eligibility.gender === 'all' ? 'Anyone' : scheme.eligibility.gender}
                      </p>
                    </div>
                  </div>
                  {scheme.eligibility.specialConditions.length > 0 && (
                    <div>
                      <p className="text-sm text-gray-500 mb-2">Special Conditions:</p>
                      <ul className="space-y-2">
                        {scheme.eligibility.specialConditions.map((condition, index) => (
                          <li key={index} className="flex items-start space-x-2 text-sm">
                            <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-600">{condition}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Pros and Cons */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-green-700 mb-4">Advantages</h2>
                  <ul className="space-y-3">
                    {scheme.pros.map((pro, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-semibold text-red-700 mb-4">Limitations</h2>
                  <ul className="space-y-3">
                    {scheme.cons.map((con, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-600">{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Documents Required */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Documents Required
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {scheme.documentsRequired.map((doc, index) => (
                    <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-primary-500 rounded-full" />
                      <span className="text-sm text-gray-700">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Where to Open */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Building className="w-5 h-5 mr-2" />
                  Where to Open Account
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {scheme.whereToOpen.map((place, index) => (
                    <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-700">{place}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              {/* Tax Benefits Card */}
              <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-green-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tax Benefits</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Section 80C</span>
                    {scheme.taxBenefit.section80C ? (
                      <Badge variant="success">Eligible</Badge>
                    ) : (
                      <Badge variant="default">Not Eligible</Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Section 80CCD</span>
                    {scheme.taxBenefit.section80CCD ? (
                      <Badge variant="success">Eligible</Badge>
                    ) : (
                      <Badge variant="default">Not Eligible</Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Interest Taxable</span>
                    {scheme.taxBenefit.interestTaxable ? (
                      <Badge variant="warning">Yes</Badge>
                    ) : (
                      <Badge variant="success">No</Badge>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Maturity Taxable</span>
                    {scheme.taxBenefit.maturityTaxable ? (
                      <Badge variant="warning">Yes</Badge>
                    ) : (
                      <Badge variant="success">No</Badge>
                    )}
                  </div>
                  <div className="pt-3 border-t">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">Tax Status</span>
                      <span
                        className={`font-bold ${
                          scheme.taxBenefit.status === 'EEE'
                            ? 'text-green-600'
                            : scheme.taxBenefit.status === 'EET'
                            ? 'text-amber-600'
                            : 'text-gray-600'
                        }`}
                      >
                        {scheme.taxBenefit.status}
                      </span>
                    </div>
                    {scheme.taxBenefit.status === 'EEE' && (
                      <p className="text-sm text-green-600 mt-2">
                        Triple tax-free: Investment, interest, and maturity all exempt!
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Best For Card */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Best For</h3>
                <div className="space-y-2">
                  {scheme.bestFor.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 p-2 bg-primary-50 rounded-lg"
                    >
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: scheme.color }}
                      />
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Calculator CTA */}
              <div className="bg-primary-600 rounded-xl p-6 text-white">
                <Calculator className="w-8 h-8 mb-3" />
                <h3 className="text-lg font-semibold mb-2">Calculate Your Returns</h3>
                <p className="text-primary-100 text-sm mb-4">
                  See how much your money can grow with {scheme.shortName}
                </p>
                <Link
                  href={`/calculator?scheme=${scheme.id}`}
                  className="inline-flex items-center bg-white text-primary-700 px-4 py-2 rounded-lg font-medium hover:bg-primary-50 transition-colors"
                >
                  Open Calculator
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>

              {/* Compare CTA */}
              <div className="bg-gray-100 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Compare with Others</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Not sure if {scheme.shortName} is right for you? Compare it with other schemes.
                </p>
                <Link
                  href={`/compare?schemes=${scheme.id}`}
                  className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700"
                >
                  Compare Schemes
                  <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 bg-amber-50 border-t border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-800">
              <strong>Disclaimer:</strong> Interest rates are subject to quarterly review by the
              Government of India. The rates shown are as of Q1 2026. Please verify current rates
              from official sources (India Post, authorized banks) before making investment decisions.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
