import Link from 'next/link';
import { ArrowRight, Shield, TrendingUp, BookOpen, Calculator, Users, CheckCircle } from 'lucide-react';
import { schemes } from '@/data/schemes';

const features = [
  {
    icon: Shield,
    title: '100% Safe',
    description: 'All schemes are backed by the Government of India. Your money is completely secure.',
  },
  {
    icon: TrendingUp,
    title: '7-8% Returns',
    description: 'Earn much better returns than savings accounts, with zero market risk.',
  },
  {
    icon: BookOpen,
    title: 'Learn First',
    description: 'Our beginner-friendly guides explain everything in simple language.',
  },
  {
    icon: Calculator,
    title: 'Plan Better',
    description: 'Use our calculators to see exactly how much your money will grow.',
  },
];

const stats = [
  { value: '27%', label: 'Indians financially literate' },
  { value: '8.2%', label: 'Highest govt scheme rate' },
  { value: '₹500', label: 'Minimum to start' },
  { value: '10+', label: 'Schemes covered' },
];

const popularSchemes = schemes.slice(0, 4);

export default function HomePage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center bg-white/10 rounded-full px-4 py-2 mb-6">
                <span className="text-yellow-300 mr-2">New:</span>
                <span className="text-sm">Interest rates updated for Q1 2026</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Your First Step to{' '}
                <span className="text-yellow-300">Smart Investing</span>
              </h1>
              <p className="text-xl text-primary-100 mb-8 leading-relaxed">
                Learn about government investment schemes that are 100% safe,
                offer 7-8% returns, and help you save taxes. Perfect for beginners.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/recommend"
                  className="inline-flex items-center justify-center bg-white text-primary-700 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
                >
                  Find Best Scheme for You
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  href="/learn"
                  className="inline-flex items-center justify-center border-2 border-white/30 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
                >
                  Start Learning
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="text-center mb-6">
                  <p className="text-primary-200 mb-2">If you invest</p>
                  <p className="text-4xl font-bold">₹5,000/month</p>
                  <p className="text-primary-200 mt-2">in PPF for 15 years</p>
                </div>
                <div className="bg-white/10 rounded-xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-primary-200">You invest</span>
                    <span className="text-xl font-semibold">₹9,00,000</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-primary-200">Interest earned</span>
                    <span className="text-xl font-semibold text-green-300">+₹7,27,284</span>
                  </div>
                  <div className="border-t border-white/20 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg">You get (tax-free)</span>
                      <span className="text-2xl font-bold text-yellow-300">₹16,27,284</span>
                    </div>
                  </div>
                </div>
                <Link
                  href="/calculator"
                  className="block text-center text-primary-200 hover:text-white mt-4 text-sm"
                >
                  Try the calculator →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary-600">{stat.value}</p>
                <p className="text-gray-600 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Government Schemes */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Start with Government Schemes?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Before diving into stocks or mutual funds, build a strong foundation
              with these safe, government-backed investments.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Schemes */}
      <section className="py-16 md:py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Popular Schemes
              </h2>
              <p className="text-xl text-gray-600">
                Start with these tried and tested government investments
              </p>
            </div>
            <Link
              href="/schemes"
              className="hidden md:inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
            >
              View all schemes
              <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularSchemes.map((scheme) => (
              <Link
                key={scheme.id}
                href={`/schemes/${scheme.id}`}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{scheme.icon}</span>
                  <span
                    className="px-3 py-1 rounded-full text-sm font-medium"
                    style={{ backgroundColor: `${scheme.color}15`, color: scheme.color }}
                  >
                    {scheme.interestRate}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{scheme.shortName}</h3>
                <p className="text-sm text-gray-500 mb-3">{scheme.name}</p>
                <p className="text-sm text-gray-600 line-clamp-2">{scheme.tagline}</p>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex flex-wrap gap-2">
                    {scheme.taxBenefit.section80C && (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                        80C
                      </span>
                    )}
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      {scheme.lockInPeriod}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link
              href="/schemes"
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
            >
              View all schemes
              <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How NiveshGuru Helps You
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From zero knowledge to confident investor in simple steps
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Learn the Basics</h3>
              <p className="text-gray-600">
                Our Investment 101 course explains inflation, compounding,
                and tax benefits in simple language.
              </p>
              <Link href="/learn" className="inline-flex items-center text-primary-600 mt-4 hover:underline">
                Start learning <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Get Personalized Advice</h3>
              <p className="text-gray-600">
                Answer a few questions about your goals, and we&apos;ll
                recommend the best schemes for your situation.
              </p>
              <Link href="/recommend" className="inline-flex items-center text-primary-600 mt-4 hover:underline">
                Get recommendations <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Start Investing</h3>
              <p className="text-gray-600">
                Follow our step-by-step guides to open your first
                investment account at a bank or post office.
              </p>
              <Link href="/schemes" className="inline-flex items-center text-primary-600 mt-4 hover:underline">
                Explore schemes <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Your Investment Journey?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Take our quick questionnaire and discover which government
            schemes are perfect for your financial goals.
          </p>
          <Link
            href="/recommend"
            className="inline-flex items-center bg-white text-primary-700 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors text-lg"
          >
            Find My Best Schemes
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
          <p className="text-primary-200 mt-4 text-sm">
            Takes less than 2 minutes. No sign-up required.
          </p>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-500">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
              <span>Government-backed schemes only</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
              <span>No hidden charges</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
              <span>Unbiased recommendations</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
              <span>Educational content</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
