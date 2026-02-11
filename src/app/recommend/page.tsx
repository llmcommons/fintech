'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Shield,
  Clock,
  Calculator,
} from 'lucide-react';
import { Button, Card, Badge, ProgressBar } from '@/components/ui';
import {
  recommendationQuestions,
  getRecommendations,
  UserProfile,
  RecommendationResult,
} from '@/data/recommendations';
import { formatCurrencyFull, formatCurrency } from '@/lib/utils';

export default function RecommendPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [results, setResults] = useState<RecommendationResult[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const totalSteps = recommendationQuestions.length;
  const currentQuestion = recommendationQuestions[currentStep];
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);

    if (currentStep < totalSteps - 1) {
      // Move to next question
      setTimeout(() => setCurrentStep(currentStep + 1), 300);
    } else {
      // Calculate results
      setIsLoading(true);
      setTimeout(() => {
        const profile: UserProfile = {
          age: newAnswers.age || '26-35',
          gender: newAnswers.gender || 'male',
          employment: newAnswers.employment || 'salaried',
          income: newAnswers.income || '30k-50k',
          investmentAmount: newAnswers['investment-amount'] || '2500',
          goal: newAnswers.goal || 'wealth-building',
          horizon: newAnswers.horizon || 'long',
          risk: newAnswers.risk || 'low',
        };
        const recommendations = getRecommendations(profile);
        setResults(recommendations);
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setResults(null);
  };

  // Show results
  if (results) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Your Personalized Recommendations
            </h1>
            <p className="text-gray-600">
              Based on your profile, here are the best government schemes for you
            </p>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {results.map((result, index) => (
              <Card key={result.scheme.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  {/* Rank Badge */}
                  <div
                    className="flex-shrink-0 p-6 flex flex-col items-center justify-center"
                    style={{ backgroundColor: `${result.scheme.color}15` }}
                  >
                    <span className="text-4xl mb-2">{result.scheme.icon}</span>
                    <span
                      className="text-2xl font-bold"
                      style={{ color: result.scheme.color }}
                    >
                      #{index + 1}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex-grow p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">
                          {result.scheme.name}
                        </h2>
                        <p className="text-gray-500">{result.scheme.shortName}</p>
                      </div>
                      <div className="mt-2 md:mt-0 text-right">
                        <span
                          className="text-2xl font-bold"
                          style={{ color: result.scheme.color }}
                        >
                          {result.scheme.interestRate}
                        </span>
                        <span className="text-gray-500 text-sm block">per annum</span>
                      </div>
                    </div>

                    {/* Why this scheme */}
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-500 mb-2">
                        Why {result.scheme.shortName} is good for you:
                      </p>
                      <ul className="space-y-1">
                        {result.reasons.map((reason, idx) => (
                          <li key={idx} className="flex items-start space-x-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-600">{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <Clock className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                        <p className="text-xs text-gray-500">Lock-in</p>
                        <p className="text-sm font-semibold">{result.scheme.lockInPeriod}</p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <TrendingUp className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                        <p className="text-xs text-gray-500">Suggested</p>
                        <p className="text-sm font-semibold">
                          {formatCurrency(result.suggestedMonthlyAmount)}/mo
                        </p>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-lg">
                        <Shield className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                        <p className="text-xs text-gray-500">Risk</p>
                        <p className="text-sm font-semibold capitalize">
                          {result.scheme.riskLevel.replace('-', ' ')}
                        </p>
                      </div>
                    </div>

                    {/* Projected Returns */}
                    {result.projectedReturns && (
                      <div className="bg-green-50 rounded-lg p-4 mb-4">
                        <p className="text-sm font-medium text-green-800 mb-2">
                          Projected Returns ({result.projectedReturns.years} years)
                        </p>
                        <div className="flex justify-between text-sm">
                          <span className="text-green-700">You invest:</span>
                          <span className="font-medium text-green-900">
                            {formatCurrencyFull(result.projectedReturns.invested)}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm mt-1">
                          <span className="text-green-700">You could get:</span>
                          <span className="font-bold text-green-900">
                            {formatCurrencyFull(result.projectedReturns.returns)}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {result.scheme.taxBenefit.section80C && (
                        <Badge variant="success" size="sm">80C Tax Benefit</Badge>
                      )}
                      {result.scheme.taxBenefit.status === 'EEE' && (
                        <Badge variant="info" size="sm">Tax Free (EEE)</Badge>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3">
                      <Link
                        href={`/schemes/${result.scheme.id}`}
                        className="inline-flex items-center bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
                      >
                        Learn More
                        <ArrowRight className="ml-1 w-4 h-4" />
                      </Link>
                      <Link
                        href={`/calculator?scheme=${result.scheme.id}`}
                        className="inline-flex items-center border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
                      >
                        <Calculator className="mr-1 w-4 h-4" />
                        Calculate Returns
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="outline" onClick={handleReset}>
              <ArrowLeft className="mr-2 w-4 h-4" />
              Start Over
            </Button>
            <Link href="/schemes">
              <Button variant="secondary">
                Browse All Schemes
              </Button>
            </Link>
          </div>

          {/* Disclaimer */}
          <p className="text-center text-sm text-gray-500 mt-8 max-w-2xl mx-auto">
            These recommendations are based on your inputs and general guidelines.
            Please verify current interest rates and eligibility from official sources
            before making investment decisions.
          </p>
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Analyzing your profile...</p>
        </div>
      </div>
    );
  }

  // Questionnaire
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Find Your Perfect Scheme
          </h1>
          <p className="text-gray-600">
            Answer a few questions to get personalized recommendations
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Question {currentStep + 1} of {totalSteps}</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <ProgressBar value={progress} color="primary" />
        </div>

        {/* Question Card */}
        <Card variant="elevated" className="animate-fade-in">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              {currentQuestion.question}
            </h2>
            {currentQuestion.helpText && (
              <p className="text-gray-500">{currentQuestion.helpText}</p>
            )}
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                  answers[currentQuestion.id] === option.value
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  {option.icon && <span className="text-2xl">{option.icon}</span>}
                  <span className="font-medium text-gray-900">{option.label}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <Button
              variant="ghost"
              onClick={handleBack}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back
            </Button>
            <div className="flex space-x-2">
              {Array.from({ length: totalSteps }).map((_, idx) => (
                <div
                  key={idx}
                  className={`w-2 h-2 rounded-full ${
                    idx === currentStep
                      ? 'bg-primary-600'
                      : idx < currentStep
                      ? 'bg-primary-300'
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
            <div className="w-24" /> {/* Spacer for alignment */}
          </div>
        </Card>

        {/* Skip option */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Want to explore on your own?{' '}
          <Link href="/schemes" className="text-primary-600 hover:underline">
            Browse all schemes
          </Link>
        </p>
      </div>
    </div>
  );
}
