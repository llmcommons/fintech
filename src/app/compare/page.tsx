'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  GitCompare,
  Plus,
  X,
  CheckCircle,
  XCircle,
  ArrowRight,
  AlertCircle,
} from 'lucide-react';
import { schemes, Scheme } from '@/data/schemes';
import { Button, Badge, Card } from '@/components/ui';
import { formatCurrencyFull, getRiskLabel } from '@/lib/utils';

export default function ComparePage() {
  const searchParams = useSearchParams();
  const initialSchemes = searchParams.get('schemes')?.split(',') || [];

  const [selectedSchemes, setSelectedSchemes] = useState<string[]>(
    initialSchemes.filter((id) => schemes.find((s) => s.id === id))
  );
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const addScheme = (schemeId: string) => {
    if (selectedSchemes.length < 3 && !selectedSchemes.includes(schemeId)) {
      setSelectedSchemes([...selectedSchemes, schemeId]);
    }
    setIsSelectOpen(false);
  };

  const removeScheme = (schemeId: string) => {
    setSelectedSchemes(selectedSchemes.filter((id) => id !== schemeId));
  };

  const selectedSchemeData = selectedSchemes
    .map((id) => schemes.find((s) => s.id === id))
    .filter((s): s is Scheme => s !== undefined);

  const availableSchemes = schemes.filter(
    (s) => !selectedSchemes.includes(s.id)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center space-x-3 mb-4">
            <GitCompare className="w-8 h-8 text-primary-600" />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Compare Schemes
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl">
            Put schemes side by side to see which one fits your needs best.
            Select up to 3 schemes to compare.
          </p>
        </div>
      </section>

      {/* Scheme Selector */}
      <section className="bg-white border-b sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center gap-3">
            {selectedSchemeData.map((scheme) => (
              <div
                key={scheme.id}
                className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-2"
              >
                <span>{scheme.icon}</span>
                <span className="font-medium">{scheme.shortName}</span>
                <button
                  onClick={() => removeScheme(scheme.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}

            {selectedSchemes.length < 3 && (
              <div className="relative">
                <button
                  onClick={() => setIsSelectOpen(!isSelectOpen)}
                  className="flex items-center space-x-2 border-2 border-dashed border-gray-300 rounded-lg px-4 py-2 text-gray-500 hover:border-primary-500 hover:text-primary-600 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  <span>Add Scheme</span>
                </button>

                {isSelectOpen && (
                  <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-lg shadow-lg border z-50 max-h-80 overflow-y-auto">
                    {availableSchemes.map((scheme) => (
                      <button
                        key={scheme.id}
                        onClick={() => addScheme(scheme.id)}
                        className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 text-left"
                      >
                        <span className="text-2xl">{scheme.icon}</span>
                        <div>
                          <p className="font-medium text-gray-900">
                            {scheme.shortName}
                          </p>
                          <p className="text-sm text-gray-500">{scheme.name}</p>
                        </div>
                        <span
                          className="ml-auto font-bold"
                          style={{ color: scheme.color }}
                        >
                          {scheme.interestRate}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {selectedSchemes.length > 0 && (
              <button
                onClick={() => setSelectedSchemes([])}
                className="text-sm text-gray-500 hover:text-red-500 ml-auto"
              >
                Clear all
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Comparison Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {selectedSchemes.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📊</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Select Schemes to Compare
              </h2>
              <p className="text-gray-600 mb-6">
                Click &quot;Add Scheme&quot; above to start comparing
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <button
                  onClick={() => setSelectedSchemes(['ppf', 'nps'])}
                  className="px-4 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200"
                >
                  PPF vs NPS
                </button>
                <button
                  onClick={() => setSelectedSchemes(['ssy', 'ppf'])}
                  className="px-4 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200"
                >
                  SSY vs PPF
                </button>
                <button
                  onClick={() => setSelectedSchemes(['scss', 'pomis'])}
                  className="px-4 py-2 bg-primary-100 text-primary-700 rounded-lg hover:bg-primary-200"
                >
                  SCSS vs POMIS
                </button>
              </div>
            </div>
          ) : selectedSchemes.length === 1 ? (
            <div className="text-center py-16">
              <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                Add at least one more scheme to compare
              </h2>
              <p className="text-gray-600">
                Select another scheme using the &quot;Add Scheme&quot; button above
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left p-4 bg-gray-100 rounded-tl-xl w-48">
                      Feature
                    </th>
                    {selectedSchemeData.map((scheme) => (
                      <th
                        key={scheme.id}
                        className="p-4 bg-gray-100 last:rounded-tr-xl"
                        style={{ minWidth: '200px' }}
                      >
                        <div className="flex flex-col items-center">
                          <span className="text-3xl mb-2">{scheme.icon}</span>
                          <span className="font-bold text-gray-900">
                            {scheme.shortName}
                          </span>
                          <span className="text-sm text-gray-500">
                            {scheme.name}
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {/* Interest Rate */}
                  <CompareRow
                    label="Interest Rate"
                    values={selectedSchemeData.map((s) => (
                      <span
                        key={s.id}
                        className="text-xl font-bold"
                        style={{ color: s.color }}
                      >
                        {s.interestRate}
                      </span>
                    ))}
                  />

                  {/* Rate Type */}
                  <CompareRow
                    label="Rate Type"
                    values={selectedSchemeData.map((s) => (
                      <Badge
                        key={s.id}
                        variant={s.rateType === 'fixed' ? 'success' : 'warning'}
                      >
                        {s.rateType === 'fixed' ? 'Fixed' : 'Market-linked'}
                      </Badge>
                    ))}
                  />

                  {/* Lock-in Period */}
                  <CompareRow
                    label="Lock-in Period"
                    values={selectedSchemeData.map((s) => (
                      <span key={s.id} className="font-medium">
                        {s.lockInPeriod}
                      </span>
                    ))}
                  />

                  {/* Min Investment */}
                  <CompareRow
                    label="Minimum Investment"
                    values={selectedSchemeData.map((s) => (
                      <span key={s.id}>
                        {formatCurrencyFull(s.minInvestment)}
                      </span>
                    ))}
                  />

                  {/* Max Investment */}
                  <CompareRow
                    label="Maximum Investment"
                    values={selectedSchemeData.map((s) => (
                      <span key={s.id}>
                        {s.maxInvestment
                          ? formatCurrencyFull(s.maxInvestment)
                          : 'No limit'}
                      </span>
                    ))}
                  />

                  {/* Risk Level */}
                  <CompareRow
                    label="Risk Level"
                    values={selectedSchemeData.map((s) => (
                      <span key={s.id} className={getRiskLabel(s.riskLevel)}>
                        {getRiskLabel(s.riskLevel)}
                      </span>
                    ))}
                  />

                  {/* Section 80C */}
                  <CompareRow
                    label="Section 80C Benefit"
                    values={selectedSchemeData.map((s) => (
                      <span key={s.id}>
                        {s.taxBenefit.section80C ? (
                          <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                        ) : (
                          <XCircle className="w-6 h-6 text-gray-300 mx-auto" />
                        )}
                      </span>
                    ))}
                  />

                  {/* Section 80CCD */}
                  <CompareRow
                    label="Section 80CCD Benefit"
                    values={selectedSchemeData.map((s) => (
                      <span key={s.id}>
                        {s.taxBenefit.section80CCD ? (
                          <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                        ) : (
                          <XCircle className="w-6 h-6 text-gray-300 mx-auto" />
                        )}
                      </span>
                    ))}
                  />

                  {/* Interest Taxable */}
                  <CompareRow
                    label="Interest Tax-Free"
                    values={selectedSchemeData.map((s) => (
                      <span key={s.id}>
                        {!s.taxBenefit.interestTaxable ? (
                          <CheckCircle className="w-6 h-6 text-green-500 mx-auto" />
                        ) : (
                          <XCircle className="w-6 h-6 text-red-400 mx-auto" />
                        )}
                      </span>
                    ))}
                  />

                  {/* Tax Status */}
                  <CompareRow
                    label="Tax Status"
                    values={selectedSchemeData.map((s) => (
                      <Badge
                        key={s.id}
                        variant={
                          s.taxBenefit.status === 'EEE'
                            ? 'success'
                            : s.taxBenefit.status === 'EET'
                            ? 'warning'
                            : 'default'
                        }
                      >
                        {s.taxBenefit.status}
                      </Badge>
                    ))}
                  />

                  {/* Eligibility - Age */}
                  <CompareRow
                    label="Age Requirement"
                    values={selectedSchemeData.map((s) => (
                      <span key={s.id} className="text-sm">
                        {s.eligibility.minAge && s.eligibility.maxAge
                          ? `${s.eligibility.minAge}-${s.eligibility.maxAge} years`
                          : s.eligibility.minAge
                          ? `${s.eligibility.minAge}+ years`
                          : s.eligibility.maxAge
                          ? `Up to ${s.eligibility.maxAge} years`
                          : 'No restriction'}
                      </span>
                    ))}
                  />

                  {/* Gender */}
                  <CompareRow
                    label="Gender Eligibility"
                    values={selectedSchemeData.map((s) => (
                      <span key={s.id} className="capitalize">
                        {s.eligibility.gender === 'all'
                          ? 'Everyone'
                          : s.eligibility.gender}
                      </span>
                    ))}
                  />

                  {/* Best For */}
                  <CompareRow
                    label="Best For"
                    values={selectedSchemeData.map((s) => (
                      <div key={s.id} className="text-sm space-y-1">
                        {s.bestFor.slice(0, 2).map((b, i) => (
                          <p key={i} className="text-gray-600">
                            • {b}
                          </p>
                        ))}
                      </div>
                    ))}
                  />

                  {/* Action Row */}
                  <tr>
                    <td className="p-4 bg-gray-50 rounded-bl-xl"></td>
                    {selectedSchemeData.map((scheme) => (
                      <td key={scheme.id} className="p-4 bg-gray-50 last:rounded-br-xl">
                        <Link
                          href={`/schemes/${scheme.id}`}
                          className="inline-flex items-center justify-center w-full bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
                        >
                          View Details
                          <ArrowRight className="ml-1 w-4 h-4" />
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      {/* Help Section */}
      {selectedSchemes.length >= 2 && (
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="bg-primary-50 border-primary-100">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-primary-900 mb-1">
                    Need help choosing?
                  </h3>
                  <p className="text-primary-700">
                    Take our quick questionnaire to get a personalized recommendation
                  </p>
                </div>
                <Link
                  href="/recommend"
                  className="mt-4 md:mt-0 inline-flex items-center bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Get Recommendations
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </Card>
          </div>
        </section>
      )}
    </div>
  );
}

interface CompareRowProps {
  label: string;
  values: React.ReactNode[];
}

function CompareRow({ label, values }: CompareRowProps) {
  return (
    <tr className="hover:bg-gray-50">
      <td className="p-4 text-gray-600 font-medium">{label}</td>
      {values.map((value, index) => (
        <td key={index} className="p-4 text-center">
          {value}
        </td>
      ))}
    </tr>
  );
}
