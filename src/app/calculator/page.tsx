'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Calculator, TrendingUp, PiggyBank, ArrowRight, Info } from 'lucide-react';
import { Card, Slider, Badge } from '@/components/ui';
import { schemes } from '@/data/schemes';
import {
  formatCurrencyFull,
  formatCurrency,
  calculatePPFReturns,
  calculateSSYReturns,
  calculateSCSSReturns,
  calculateNPSReturns,
} from '@/lib/utils';

type CalculatorType = 'ppf' | 'ssy' | 'scss' | 'nps' | 'generic';

const calculatorSchemes = [
  { id: 'ppf', name: 'PPF Calculator', icon: '🏦' },
  { id: 'ssy', name: 'Sukanya Samriddhi', icon: '👧' },
  { id: 'scss', name: 'Senior Citizen Savings', icon: '👴' },
  { id: 'nps', name: 'NPS Calculator', icon: '🎯' },
  { id: 'generic', name: 'Generic Calculator', icon: '📊' },
];

export default function CalculatorPage() {
  const searchParams = useSearchParams();
  const schemeParam = searchParams.get('scheme');

  const [activeCalculator, setActiveCalculator] = useState<CalculatorType>(
    (schemeParam as CalculatorType) || 'ppf'
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center space-x-3 mb-4">
            <Calculator className="w-8 h-8 text-primary-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Investment Calculators
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl">
            See exactly how much your money can grow. Play with different amounts
            and see the power of compounding!
          </p>
        </div>
      </section>

      {/* Calculator Selection */}
      <section className="bg-white border-b sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-2">
            {calculatorSchemes.map((calc) => (
              <button
                key={calc.id}
                onClick={() => setActiveCalculator(calc.id as CalculatorType)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activeCalculator === calc.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{calc.icon}</span>
                <span className="font-medium">{calc.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {activeCalculator === 'ppf' && <PPFCalculator />}
          {activeCalculator === 'ssy' && <SSYCalculator />}
          {activeCalculator === 'scss' && <SCSSCalculator />}
          {activeCalculator === 'nps' && <NPSCalculator />}
          {activeCalculator === 'generic' && <GenericCalculator />}
        </div>
      </section>
    </div>
  );
}

function PPFCalculator() {
  const [monthlyAmount, setMonthlyAmount] = useState(5000);
  const [years, setYears] = useState(15);
  const [rate, setRate] = useState(7.1);

  const result = calculatePPFReturns(monthlyAmount, years, rate);

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Input Section */}
      <Card variant="elevated">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <span className="text-2xl mr-2">🏦</span>
          PPF Calculator
        </h2>

        <div className="space-y-6">
          <Slider
            label="Monthly Investment"
            min={500}
            max={12500}
            step={500}
            value={monthlyAmount}
            onChange={(e) => setMonthlyAmount(Number(e.target.value))}
            formatValue={(v) => formatCurrency(v)}
          />

          <Slider
            label="Investment Period"
            min={15}
            max={30}
            step={5}
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            formatValue={(v) => `${v} years`}
          />

          <Slider
            label="Interest Rate (Current: 7.1%)"
            min={6}
            max={9}
            step={0.1}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            formatValue={(v) => `${v}%`}
          />
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-start space-x-2">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800">
              PPF has a minimum lock-in of 15 years. You can extend in blocks of 5 years.
              Maximum investment is ₹1.5 lakh per year.
            </p>
          </div>
        </div>
      </Card>

      {/* Results Section */}
      <Card variant="elevated" className="bg-gradient-to-br from-primary-600 to-primary-800 text-white">
        <h3 className="text-lg font-medium text-primary-100 mb-6">Your PPF Returns</h3>

        <div className="space-y-4">
          <div className="flex justify-between items-center pb-4 border-b border-primary-500">
            <span className="text-primary-200">Total Investment</span>
            <span className="text-2xl font-bold">{formatCurrencyFull(result.totalInvested)}</span>
          </div>

          <div className="flex justify-between items-center pb-4 border-b border-primary-500">
            <span className="text-primary-200">Interest Earned</span>
            <span className="text-2xl font-bold text-green-300">
              +{formatCurrencyFull(result.totalInterest)}
            </span>
          </div>

          <div className="flex justify-between items-center pt-2">
            <span className="text-lg">Maturity Amount</span>
            <span className="text-3xl font-bold text-yellow-300">
              {formatCurrencyFull(result.maturityAmount)}
            </span>
          </div>
        </div>

        <div className="mt-6 p-4 bg-white/10 rounded-lg">
          <p className="text-sm text-primary-100">
            <strong className="text-white">Tax Benefit:</strong> Your entire maturity amount is
            TAX FREE (EEE status). Plus, you save up to ₹46,800/year in taxes under Section 80C!
          </p>
        </div>

        <Link
          href="/schemes/ppf"
          className="mt-6 inline-flex items-center justify-center w-full bg-white text-primary-700 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors"
        >
          Learn More About PPF
          <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
      </Card>
    </div>
  );
}

function SSYCalculator() {
  const [monthlyAmount, setMonthlyAmount] = useState(5000);
  const [girlAge, setGirlAge] = useState(5);
  const [rate, setRate] = useState(8.2);

  const result = calculateSSYReturns(monthlyAmount, girlAge, rate);

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <Card variant="elevated">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <span className="text-2xl mr-2">👧</span>
          Sukanya Samriddhi Calculator
        </h2>

        <div className="space-y-6">
          <Slider
            label="Monthly Investment"
            min={250}
            max={12500}
            step={250}
            value={monthlyAmount}
            onChange={(e) => setMonthlyAmount(Number(e.target.value))}
            formatValue={(v) => formatCurrency(v)}
          />

          <Slider
            label="Girl's Current Age"
            min={0}
            max={10}
            step={1}
            value={girlAge}
            onChange={(e) => setGirlAge(Number(e.target.value))}
            formatValue={(v) => `${v} years`}
          />

          <Slider
            label="Interest Rate (Current: 8.2%)"
            min={7}
            max={10}
            step={0.1}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            formatValue={(v) => `${v}%`}
          />
        </div>

        <div className="mt-6 p-4 bg-pink-50 rounded-lg">
          <p className="text-sm text-pink-800">
            SSY offers the highest interest rate (8.2%) among government schemes.
            Account matures when girl turns 21. Deposits needed only for 15 years.
          </p>
        </div>
      </Card>

      <Card variant="elevated" className="bg-gradient-to-br from-pink-500 to-pink-700 text-white">
        <h3 className="text-lg font-medium text-pink-100 mb-6">Your SSY Returns</h3>

        <div className="space-y-4">
          <div className="flex justify-between items-center pb-4 border-b border-pink-400">
            <span className="text-pink-200">Total Investment</span>
            <span className="text-2xl font-bold">{formatCurrencyFull(result.totalInvested)}</span>
          </div>

          <div className="flex justify-between items-center pb-4 border-b border-pink-400">
            <span className="text-pink-200">Interest Earned</span>
            <span className="text-2xl font-bold text-green-300">
              +{formatCurrencyFull(result.totalInterest)}
            </span>
          </div>

          <div className="flex justify-between items-center pt-2">
            <span className="text-lg">At Girl's Age 21</span>
            <span className="text-3xl font-bold text-yellow-300">
              {formatCurrencyFull(result.maturityAmount)}
            </span>
          </div>
        </div>

        <div className="mt-6 p-4 bg-white/10 rounded-lg">
          <p className="text-sm text-pink-100">
            Perfect for your daughter's education or marriage. 50% can be withdrawn
            after she turns 18 for higher education.
          </p>
        </div>

        <Link
          href="/schemes/ssy"
          className="mt-6 inline-flex items-center justify-center w-full bg-white text-pink-700 py-3 rounded-lg font-semibold hover:bg-pink-50 transition-colors"
        >
          Learn More About SSY
          <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
      </Card>
    </div>
  );
}

function SCSSCalculator() {
  const [principal, setPrincipal] = useState(1000000);
  const [rate, setRate] = useState(8.2);

  const result = calculateSCSSReturns(principal, rate);

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <Card variant="elevated">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <span className="text-2xl mr-2">👴</span>
          Senior Citizen Savings Scheme
        </h2>

        <div className="space-y-6">
          <Slider
            label="Investment Amount"
            min={100000}
            max={3000000}
            step={100000}
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
            formatValue={(v) => formatCurrency(v)}
          />

          <Slider
            label="Interest Rate (Current: 8.2%)"
            min={7}
            max={10}
            step={0.1}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            formatValue={(v) => `${v}%`}
          />
        </div>

        <div className="mt-6 p-4 bg-green-50 rounded-lg">
          <p className="text-sm text-green-800">
            SCSS provides quarterly interest payouts - perfect for regular income
            after retirement. Lock-in period is 5 years.
          </p>
        </div>
      </Card>

      <Card variant="elevated" className="bg-gradient-to-br from-green-600 to-green-800 text-white">
        <h3 className="text-lg font-medium text-green-100 mb-6">Your SCSS Returns</h3>

        <div className="space-y-4">
          <div className="flex justify-between items-center pb-4 border-b border-green-500">
            <span className="text-green-200">Your Investment</span>
            <span className="text-2xl font-bold">{formatCurrencyFull(result.principal)}</span>
          </div>

          <div className="flex justify-between items-center pb-4 border-b border-green-500">
            <span className="text-green-200">Quarterly Payout</span>
            <span className="text-2xl font-bold text-yellow-300">
              {formatCurrencyFull(result.quarterlyPayout)}
            </span>
          </div>

          <div className="flex justify-between items-center pb-4 border-b border-green-500">
            <span className="text-green-200">Yearly Income</span>
            <span className="text-2xl font-bold">
              {formatCurrencyFull(result.yearlyPayout)}
            </span>
          </div>

          <div className="flex justify-between items-center pt-2">
            <span className="text-lg">5-Year Interest</span>
            <span className="text-3xl font-bold text-yellow-300">
              {formatCurrencyFull(result.totalInterest)}
            </span>
          </div>
        </div>

        <Link
          href="/schemes/scss"
          className="mt-6 inline-flex items-center justify-center w-full bg-white text-green-700 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
        >
          Learn More About SCSS
          <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
      </Card>
    </div>
  );
}

function NPSCalculator() {
  const [monthlyAmount, setMonthlyAmount] = useState(5000);
  const [currentAge, setCurrentAge] = useState(30);
  const [expectedReturn, setExpectedReturn] = useState(10);

  const result = calculateNPSReturns(monthlyAmount, currentAge, 60, expectedReturn);

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <Card variant="elevated">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <span className="text-2xl mr-2">🎯</span>
          NPS Calculator
        </h2>

        <div className="space-y-6">
          <Slider
            label="Monthly Investment"
            min={500}
            max={50000}
            step={500}
            value={monthlyAmount}
            onChange={(e) => setMonthlyAmount(Number(e.target.value))}
            formatValue={(v) => formatCurrency(v)}
          />

          <Slider
            label="Your Current Age"
            min={18}
            max={55}
            step={1}
            value={currentAge}
            onChange={(e) => setCurrentAge(Number(e.target.value))}
            formatValue={(v) => `${v} years`}
          />

          <Slider
            label="Expected Return (Market-linked)"
            min={8}
            max={14}
            step={0.5}
            value={expectedReturn}
            onChange={(e) => setExpectedReturn(Number(e.target.value))}
            formatValue={(v) => `${v}%`}
          />
        </div>

        <div className="mt-6 p-4 bg-purple-50 rounded-lg">
          <p className="text-sm text-purple-800">
            NPS returns are market-linked and can vary. Historical returns have been 9-12%.
            You get extra ₹50,000 tax benefit under Section 80CCD(1B)!
          </p>
        </div>
      </Card>

      <Card variant="elevated" className="bg-gradient-to-br from-purple-600 to-purple-800 text-white">
        <h3 className="text-lg font-medium text-purple-100 mb-6">
          Your NPS Retirement Corpus (at age 60)
        </h3>

        <div className="space-y-4">
          <div className="flex justify-between items-center pb-4 border-b border-purple-500">
            <span className="text-purple-200">Investment Period</span>
            <span className="text-2xl font-bold">{result.years} years</span>
          </div>

          <div className="flex justify-between items-center pb-4 border-b border-purple-500">
            <span className="text-purple-200">Total Investment</span>
            <span className="text-2xl font-bold">{formatCurrencyFull(result.totalInvested)}</span>
          </div>

          <div className="flex justify-between items-center pb-4 border-b border-purple-500">
            <span className="text-purple-200">Total Corpus</span>
            <span className="text-3xl font-bold text-yellow-300">
              {formatCurrencyFull(result.totalCorpus)}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="text-center p-3 bg-white/10 rounded-lg">
              <p className="text-purple-200 text-sm">Lumpsum (60%)</p>
              <p className="font-bold">{formatCurrency(result.lumpsum)}</p>
            </div>
            <div className="text-center p-3 bg-white/10 rounded-lg">
              <p className="text-purple-200 text-sm">For Annuity (40%)</p>
              <p className="font-bold">{formatCurrency(result.annuityCorpus)}</p>
            </div>
          </div>
        </div>

        <Link
          href="/schemes/nps"
          className="mt-6 inline-flex items-center justify-center w-full bg-white text-purple-700 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
        >
          Learn More About NPS
          <ArrowRight className="ml-2 w-4 h-4" />
        </Link>
      </Card>
    </div>
  );
}

function GenericCalculator() {
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(7.5);
  const [years, setYears] = useState(10);
  const [monthlyAddition, setMonthlyAddition] = useState(0);

  // Calculate compound interest
  const r = rate / 100;
  let total = principal;
  for (let i = 0; i < years; i++) {
    total = (total + monthlyAddition * 12) * (1 + r);
  }
  const totalInvested = principal + monthlyAddition * 12 * years;
  const interest = total - totalInvested;

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <Card variant="elevated">
        <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <span className="text-2xl mr-2">📊</span>
          Generic Compound Interest
        </h2>

        <div className="space-y-6">
          <Slider
            label="Initial Investment"
            min={1000}
            max={1000000}
            step={1000}
            value={principal}
            onChange={(e) => setPrincipal(Number(e.target.value))}
            formatValue={(v) => formatCurrency(v)}
          />

          <Slider
            label="Monthly Addition"
            min={0}
            max={50000}
            step={500}
            value={monthlyAddition}
            onChange={(e) => setMonthlyAddition(Number(e.target.value))}
            formatValue={(v) => formatCurrency(v)}
          />

          <Slider
            label="Interest Rate"
            min={1}
            max={15}
            step={0.1}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            formatValue={(v) => `${v}%`}
          />

          <Slider
            label="Time Period"
            min={1}
            max={30}
            step={1}
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            formatValue={(v) => `${v} years`}
          />
        </div>
      </Card>

      <Card variant="elevated" className="bg-gradient-to-br from-gray-700 to-gray-900 text-white">
        <h3 className="text-lg font-medium text-gray-300 mb-6">Your Returns</h3>

        <div className="space-y-4">
          <div className="flex justify-between items-center pb-4 border-b border-gray-600">
            <span className="text-gray-400">Total Investment</span>
            <span className="text-2xl font-bold">{formatCurrencyFull(totalInvested)}</span>
          </div>

          <div className="flex justify-between items-center pb-4 border-b border-gray-600">
            <span className="text-gray-400">Interest Earned</span>
            <span className="text-2xl font-bold text-green-400">
              +{formatCurrencyFull(Math.round(interest))}
            </span>
          </div>

          <div className="flex justify-between items-center pt-2">
            <span className="text-lg">Final Amount</span>
            <span className="text-3xl font-bold text-yellow-400">
              {formatCurrencyFull(Math.round(total))}
            </span>
          </div>
        </div>

        <div className="mt-6 p-4 bg-white/10 rounded-lg">
          <p className="text-sm text-gray-300">
            This is a simplified calculator. Actual returns may vary based on
            compounding frequency and other factors.
          </p>
        </div>
      </Card>
    </div>
  );
}
