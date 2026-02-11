import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatCurrency(amount: number): string {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  }
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} L`;
  }
  if (amount >= 1000) {
    return `₹${(amount / 1000).toFixed(1)}K`;
  }
  return `₹${amount.toLocaleString('en-IN')}`;
}

export function formatCurrencyFull(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

export function calculatePPFReturns(monthlyAmount: number, years: number, rate: number = 7.1) {
  const yearlyAmount = monthlyAmount * 12;
  const r = rate / 100;
  let total = 0;

  for (let i = 0; i < years; i++) {
    total = (total + yearlyAmount) * (1 + r);
  }

  return {
    totalInvested: yearlyAmount * years,
    maturityAmount: Math.round(total),
    totalInterest: Math.round(total - yearlyAmount * years),
  };
}

export function calculateSSYReturns(monthlyAmount: number, girlAge: number, rate: number = 8.2) {
  const yearlyAmount = Math.min(monthlyAmount * 12, 150000);
  const r = rate / 100;
  const depositYears = 15;
  const maturityYears = 21 - girlAge;

  let total = 0;

  // Deposit phase (first 15 years or until girl is 21, whichever is less)
  const actualDepositYears = Math.min(depositYears, maturityYears);
  for (let i = 0; i < actualDepositYears; i++) {
    total = (total + yearlyAmount) * (1 + r);
  }

  // Growth phase (remaining years without deposits)
  const growthYears = maturityYears - actualDepositYears;
  for (let i = 0; i < growthYears; i++) {
    total = total * (1 + r);
  }

  return {
    totalInvested: yearlyAmount * actualDepositYears,
    maturityAmount: Math.round(total),
    totalInterest: Math.round(total - yearlyAmount * actualDepositYears),
    maturityYear: maturityYears,
  };
}

export function calculateSCSSReturns(principal: number, rate: number = 8.2) {
  const quarterlyInterest = (principal * rate) / 400;
  const yearlyInterest = quarterlyInterest * 4;
  const tenure = 5;

  return {
    principal,
    quarterlyPayout: Math.round(quarterlyInterest),
    yearlyPayout: Math.round(yearlyInterest),
    totalInterest: Math.round(yearlyInterest * tenure),
    maturityAmount: principal,
  };
}

export function calculateNPSReturns(
  monthlyAmount: number,
  currentAge: number,
  retirementAge: number = 60,
  expectedReturn: number = 10
) {
  const years = retirementAge - currentAge;
  const yearlyAmount = monthlyAmount * 12;
  const r = expectedReturn / 100;

  let total = 0;
  for (let i = 0; i < years; i++) {
    total = (total + yearlyAmount) * (1 + r);
  }

  const lumpsum = total * 0.6; // 60% can be withdrawn
  const annuityCorpus = total * 0.4; // 40% for annuity

  return {
    totalInvested: yearlyAmount * years,
    totalCorpus: Math.round(total),
    lumpsum: Math.round(lumpsum),
    annuityCorpus: Math.round(annuityCorpus),
    years,
  };
}

export function calculateKVPDoubling(rate: number = 7.5): number {
  // Rule of 72 approximation
  return Math.round((72 / rate) * 12); // Returns months
}

export function getRiskColor(risk: 'very-low' | 'low' | 'medium' | 'high'): string {
  const colors = {
    'very-low': 'text-green-600 bg-green-100',
    'low': 'text-blue-600 bg-blue-100',
    'medium': 'text-yellow-600 bg-yellow-100',
    'high': 'text-red-600 bg-red-100',
  };
  return colors[risk];
}

export function getRiskLabel(risk: 'very-low' | 'low' | 'medium' | 'high'): string {
  const labels = {
    'very-low': 'Very Low Risk',
    'low': 'Low Risk',
    'medium': 'Medium Risk',
    'high': 'High Risk',
  };
  return labels[risk];
}
