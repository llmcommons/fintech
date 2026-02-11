import { schemes, Scheme } from './schemes';

export interface QuestionOption {
  value: string;
  label: string;
  icon?: string;
}

export interface RecommendationQuestion {
  id: string;
  question: string;
  helpText?: string;
  options: QuestionOption[];
}

export const recommendationQuestions: RecommendationQuestion[] = [
  {
    id: 'age',
    question: 'What is your age?',
    helpText: 'This helps us find schemes you\'re eligible for',
    options: [
      { value: '18-25', label: '18-25 years', icon: '🎓' },
      { value: '26-35', label: '26-35 years', icon: '💼' },
      { value: '36-45', label: '36-45 years', icon: '👨‍👩‍👧' },
      { value: '46-55', label: '46-55 years', icon: '🏠' },
      { value: '56-60', label: '56-60 years', icon: '⏰' },
      { value: '60+', label: '60+ years', icon: '👴' },
    ],
  },
  {
    id: 'gender',
    question: 'What is your gender?',
    helpText: 'Some schemes are specifically designed for women',
    options: [
      { value: 'male', label: 'Male', icon: '👨' },
      { value: 'female', label: 'Female', icon: '👩' },
      { value: 'other', label: 'Other', icon: '🧑' },
    ],
  },
  {
    id: 'employment',
    question: 'What is your employment type?',
    helpText: 'This determines which pension schemes suit you',
    options: [
      { value: 'salaried', label: 'Salaried (Private/Govt)', icon: '💼' },
      { value: 'self-employed', label: 'Self-employed / Business', icon: '🏪' },
      { value: 'unorganized', label: 'Daily wage / Unorganized', icon: '👷' },
      { value: 'homemaker', label: 'Homemaker', icon: '🏠' },
      { value: 'retired', label: 'Retired', icon: '🌴' },
      { value: 'student', label: 'Student', icon: '📚' },
    ],
  },
  {
    id: 'income',
    question: 'What is your monthly income range?',
    helpText: 'This helps us suggest appropriate investment amounts',
    options: [
      { value: 'below-15k', label: 'Below ₹15,000', icon: '💵' },
      { value: '15k-30k', label: '₹15,000 - ₹30,000', icon: '💵' },
      { value: '30k-50k', label: '₹30,000 - ₹50,000', icon: '💰' },
      { value: '50k-1l', label: '₹50,000 - ₹1,00,000', icon: '💰' },
      { value: 'above-1l', label: 'Above ₹1,00,000', icon: '💎' },
    ],
  },
  {
    id: 'investment-amount',
    question: 'How much can you invest monthly?',
    helpText: 'Be realistic - consistency matters more than amount',
    options: [
      { value: '500', label: '₹500 - ₹1,000', icon: '🌱' },
      { value: '2500', label: '₹1,000 - ₹5,000', icon: '🌿' },
      { value: '7500', label: '₹5,000 - ₹10,000', icon: '🌳' },
      { value: '12500', label: '₹10,000 - ₹15,000', icon: '🏔️' },
      { value: '25000', label: 'Above ₹15,000', icon: '🚀' },
    ],
  },
  {
    id: 'goal',
    question: 'What is your primary investment goal?',
    helpText: 'Choose the most important goal right now',
    options: [
      { value: 'tax-saving', label: 'Save taxes (Section 80C)', icon: '📋' },
      { value: 'retirement', label: 'Retirement planning', icon: '🏖️' },
      { value: 'child-education', label: 'Child\'s education', icon: '🎓' },
      { value: 'daughter-future', label: 'Daughter\'s future', icon: '👧' },
      { value: 'regular-income', label: 'Regular monthly income', icon: '📅' },
      { value: 'wealth-building', label: 'Long-term wealth building', icon: '💎' },
    ],
  },
  {
    id: 'horizon',
    question: 'When do you need this money?',
    helpText: 'Investment horizon affects which schemes work best',
    options: [
      { value: 'short', label: 'Within 3 years', icon: '⏱️' },
      { value: 'medium', label: '3-7 years', icon: '📆' },
      { value: 'long', label: '7-15 years', icon: '🗓️' },
      { value: 'very-long', label: '15+ years', icon: '🎯' },
    ],
  },
  {
    id: 'risk',
    question: 'How do you feel about risk?',
    helpText: 'Be honest - there\'s no wrong answer',
    options: [
      { value: 'very-low', label: 'Only 100% safe govt schemes', icon: '🛡️' },
      { value: 'low', label: 'Mostly safe, small fluctuation OK', icon: '🔒' },
      { value: 'medium', label: 'Some risk for better returns', icon: '⚖️' },
    ],
  },
];

export interface UserProfile {
  age: string;
  gender: string;
  employment: string;
  income: string;
  investmentAmount: string;
  goal: string;
  horizon: string;
  risk: string;
}

export interface RecommendationResult {
  scheme: Scheme;
  score: number;
  reasons: string[];
  suggestedMonthlyAmount: number;
  projectedReturns?: {
    invested: number;
    returns: number;
    years: number;
  };
}

function getAgeFromRange(ageRange: string): number {
  const mapping: Record<string, number> = {
    '18-25': 22,
    '26-35': 30,
    '36-45': 40,
    '46-55': 50,
    '56-60': 58,
    '60+': 65,
  };
  return mapping[ageRange] || 30;
}

function getMonthlyAmount(amountRange: string): number {
  const mapping: Record<string, number> = {
    '500': 750,
    '2500': 3000,
    '7500': 7500,
    '12500': 12500,
    '25000': 20000,
  };
  return mapping[amountRange] || 5000;
}

function checkEligibility(scheme: Scheme, profile: UserProfile): boolean {
  const age = getAgeFromRange(profile.age);
  const { minAge, maxAge, gender } = scheme.eligibility;

  // Age check
  if (minAge !== null && age < minAge) return false;
  if (maxAge !== null && age > maxAge) return false;

  // Gender check
  if (gender === 'female' && profile.gender !== 'female') return false;

  return true;
}

function calculateGoalScore(scheme: Scheme, goal: string): number {
  const goalSchemeMapping: Record<string, string[]> = {
    'tax-saving': ['ppf', 'nps', 'ssy', 'nsc', 'scss'],
    'retirement': ['nps', 'ppf', 'apy', 'scss'],
    'child-education': ['ssy', 'ppf', 'nsc'],
    'daughter-future': ['ssy', 'ppf'],
    'regular-income': ['pomis', 'scss', 'sgb'],
    'wealth-building': ['ppf', 'nps', 'sgb', 'kvp'],
  };

  const relevantSchemes = goalSchemeMapping[goal] || [];
  if (relevantSchemes.includes(scheme.id)) {
    const index = relevantSchemes.indexOf(scheme.id);
    return 40 - (index * 5); // First match gets 40, then 35, 30, etc.
  }
  return 10;
}

function calculateHorizonScore(scheme: Scheme, horizon: string): number {
  const horizonYears: Record<string, number> = {
    'short': 2,
    'medium': 5,
    'long': 10,
    'very-long': 20,
  };

  const targetYears = horizonYears[horizon] || 5;
  const lockInYears = scheme.lockInYears;

  // Perfect match or lock-in shorter than horizon
  if (lockInYears <= targetYears) {
    return 25;
  }
  // Lock-in slightly longer
  if (lockInYears <= targetYears * 1.5) {
    return 15;
  }
  // Lock-in much longer than needed
  return 5;
}

function calculateRiskScore(scheme: Scheme, riskTolerance: string): number {
  const riskMatch: Record<string, Scheme['riskLevel'][]> = {
    'very-low': ['very-low'],
    'low': ['very-low', 'low'],
    'medium': ['very-low', 'low', 'medium'],
  };

  const acceptableRisks = riskMatch[riskTolerance] || ['very-low', 'low'];
  return acceptableRisks.includes(scheme.riskLevel) ? 20 : 0;
}

function calculateTaxScore(scheme: Scheme, income: string): number {
  // Higher income benefits more from tax deductions
  const highIncome = ['50k-1l', 'above-1l'].includes(income);

  if (scheme.taxBenefit.section80C || scheme.taxBenefit.section80CCD) {
    return highIncome ? 15 : 10;
  }
  return 0;
}

function generateReasons(scheme: Scheme, profile: UserProfile): string[] {
  const reasons: string[] = [];

  // Interest rate reason
  if (parseFloat(scheme.interestRate) >= 8) {
    reasons.push(`High interest rate of ${scheme.interestRate} per annum`);
  } else if (parseFloat(scheme.interestRate) >= 7) {
    reasons.push(`Good interest rate of ${scheme.interestRate} per annum`);
  }

  // Tax benefit reason
  if (scheme.taxBenefit.status === 'EEE') {
    reasons.push('Triple tax-free (EEE) - investment, interest, and maturity all tax-free');
  } else if (scheme.taxBenefit.section80C) {
    reasons.push('Eligible for Section 80C tax deduction up to ₹1.5 lakh');
  }
  if (scheme.taxBenefit.section80CCD) {
    reasons.push('Additional ₹50,000 tax benefit under Section 80CCD(1B)');
  }

  // Goal-specific reasons
  if (profile.goal === 'daughter-future' && scheme.id === 'ssy') {
    reasons.push('Specifically designed for girl child\'s education and marriage');
  }
  if (profile.goal === 'retirement' && ['nps', 'apy'].includes(scheme.id)) {
    reasons.push('Designed specifically for retirement corpus building');
  }
  if (profile.goal === 'regular-income' && ['pomis', 'scss'].includes(scheme.id)) {
    reasons.push('Provides guaranteed regular income payouts');
  }

  // Safety reason
  if (scheme.riskLevel === 'very-low') {
    reasons.push('Government-backed with zero risk to your principal');
  }

  // Special features
  if (scheme.id === 'nps' && profile.age === '18-25') {
    reasons.push('Starting early maximizes compound growth for retirement');
  }

  return reasons.slice(0, 4); // Max 4 reasons
}

function calculateProjectedReturns(
  scheme: Scheme,
  monthlyAmount: number,
  horizonYears: number
): { invested: number; returns: number; years: number } {
  const rate = parseFloat(scheme.interestRate) / 100 || 0.07;
  const years = Math.max(scheme.lockInYears, horizonYears);
  const yearlyAmount = monthlyAmount * 12;

  // Simple compound interest calculation for yearly investments
  let total = 0;
  for (let i = 0; i < years; i++) {
    total = (total + yearlyAmount) * (1 + rate);
  }

  return {
    invested: yearlyAmount * years,
    returns: Math.round(total),
    years,
  };
}

export function getRecommendations(profile: UserProfile): RecommendationResult[] {
  const results: RecommendationResult[] = [];
  const monthlyAmount = getMonthlyAmount(profile.investmentAmount);
  const horizonYears = { 'short': 3, 'medium': 5, 'long': 10, 'very-long': 15 }[profile.horizon] || 5;

  for (const scheme of schemes) {
    // Check eligibility first
    if (!checkEligibility(scheme, profile)) continue;

    // Calculate scores
    const goalScore = calculateGoalScore(scheme, profile.goal);
    const horizonScore = calculateHorizonScore(scheme, profile.horizon);
    const riskScore = calculateRiskScore(scheme, profile.risk);
    const taxScore = calculateTaxScore(scheme, profile.income);

    const totalScore = goalScore + horizonScore + riskScore + taxScore;

    // Only include if reasonable match
    if (totalScore >= 30) {
      const suggestedAmount = Math.min(
        monthlyAmount,
        scheme.maxInvestment ? scheme.maxInvestment / 12 : monthlyAmount
      );

      results.push({
        scheme,
        score: totalScore,
        reasons: generateReasons(scheme, profile),
        suggestedMonthlyAmount: Math.round(suggestedAmount),
        projectedReturns: calculateProjectedReturns(scheme, suggestedAmount, horizonYears),
      });
    }
  }

  // Sort by score and return top recommendations
  return results.sort((a, b) => b.score - a.score).slice(0, 5);
}

export function getQuickRecommendation(age: number, goal: string): Scheme[] {
  // Quick recommendations without full questionnaire
  if (age >= 60) {
    return schemes.filter(s => ['scss', 'pomis'].includes(s.id));
  }
  if (goal === 'daughter-future') {
    return schemes.filter(s => ['ssy', 'ppf'].includes(s.id));
  }
  if (goal === 'tax-saving') {
    return schemes.filter(s => ['ppf', 'nps', 'nsc'].includes(s.id));
  }
  // Default for young investors
  return schemes.filter(s => ['ppf', 'nps'].includes(s.id));
}
