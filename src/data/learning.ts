export interface Quiz {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  duration: string;
  content: {
    type: 'text' | 'highlight' | 'example' | 'comparison';
    content: string;
    title?: string;
  }[];
  quiz: Quiz[];
  badge: {
    name: string;
    icon: string;
  };
}

export interface Level {
  id: number;
  title: string;
  description: string;
  icon: string;
  color: string;
  lessons: Lesson[];
}

export const learningLevels: Level[] = [
  {
    id: 1,
    title: 'Money Basics',
    description: 'Understanding why your money needs to work for you',
    icon: '💰',
    color: '#3B82F6',
    lessons: [
      {
        id: 'inflation',
        title: 'The Invisible Thief: Inflation',
        subtitle: 'Why ₹100 today won\'t be ₹100 tomorrow',
        icon: '📉',
        duration: '5 min',
        content: [
          {
            type: 'text',
            content: 'Imagine you have ₹100 today. You can buy 10 packets of chips at ₹10 each. But after one year, the same chips might cost ₹11 each. Now your ₹100 can only buy 9 packets!',
          },
          {
            type: 'highlight',
            title: 'What is Inflation?',
            content: 'Inflation is the rate at which prices of goods and services increase over time. In India, inflation averages around 4-6% per year.',
          },
          {
            type: 'example',
            title: 'Real Example',
            content: 'In 2010, a movie ticket cost around ₹100. Today, the same ticket costs ₹250-300. That\'s inflation eating away at your money\'s value over 15 years!',
          },
          {
            type: 'comparison',
            title: 'Savings Account vs Inflation',
            content: 'Your savings account gives you ~3-4% interest. But if inflation is 5%, your money is actually LOSING 1-2% value every year! This is why just "saving" isn\'t enough - you need to "invest".',
          },
        ],
        quiz: [
          {
            question: 'If inflation is 5% and your savings account gives 3% interest, what happens to your money\'s real value?',
            options: ['It grows by 3%', 'It stays the same', 'It loses 2% value', 'It grows by 5%'],
            correctAnswer: 2,
            explanation: 'When inflation (5%) is higher than your returns (3%), your money loses purchasing power. 3% - 5% = -2% real return.',
          },
          {
            question: 'What is the main problem with keeping money in a savings account long-term?',
            options: ['Banks might close', 'Interest is too high', 'It may not beat inflation', 'There\'s too much paperwork'],
            correctAnswer: 2,
            explanation: 'Savings accounts typically offer 3-4% interest, which often doesn\'t keep up with inflation, causing your money to lose purchasing power over time.',
          },
        ],
        badge: {
          name: 'Inflation Fighter',
          icon: '🛡️',
        },
      },
      {
        id: 'saving-vs-investing',
        title: 'Saving vs Investing',
        subtitle: 'The difference that makes all the difference',
        icon: '⚖️',
        duration: '4 min',
        content: [
          {
            type: 'text',
            content: 'Many people use "saving" and "investing" interchangeably, but they\'re quite different. Understanding this difference is your first step to financial wisdom.',
          },
          {
            type: 'comparison',
            title: 'Saving',
            content: '✓ Putting money aside for short-term needs\\n✓ Low or no risk\\n✓ Low returns (3-4%)\\n✓ Easy access to money\\n✓ Example: Savings account, piggy bank',
          },
          {
            type: 'comparison',
            title: 'Investing',
            content: '✓ Making money work harder for long-term goals\\n✓ Some risk involved\\n✓ Higher returns (7-15%)\\n✓ Money locked for some time\\n✓ Example: PPF, SSY, Mutual Funds',
          },
          {
            type: 'highlight',
            title: 'The Simple Rule',
            content: 'SAVE for emergencies and short-term goals (< 3 years). INVEST for long-term goals like retirement, children\'s education, or buying a house.',
          },
        ],
        quiz: [
          {
            question: 'You need money for a vacation next month. Should you save or invest it?',
            options: ['Invest in PPF', 'Keep in savings account', 'Buy gold bonds', 'Invest in NPS'],
            correctAnswer: 1,
            explanation: 'For very short-term needs (like next month), keeping money in a savings account is best because it\'s easily accessible. Investments have lock-in periods.',
          },
          {
            question: 'For your daughter\'s education in 15 years, what\'s better?',
            options: ['Savings account', 'Cash at home', 'Sukanya Samriddhi Yojana', 'Fixed deposit for 1 year'],
            correctAnswer: 2,
            explanation: 'SSY is specifically designed for girl children\'s future, offers 8.2% interest, and has a 15+ year horizon - perfect for education planning.',
          },
        ],
        badge: {
          name: 'Smart Saver',
          icon: '🎓',
        },
      },
      {
        id: 'compounding',
        title: 'The Magic of Compounding',
        subtitle: 'How small amounts become large fortunes',
        icon: '✨',
        duration: '6 min',
        content: [
          {
            type: 'text',
            content: 'Albert Einstein reportedly called compound interest the "8th wonder of the world." Here\'s why even small, regular investments can make you wealthy over time.',
          },
          {
            type: 'highlight',
            title: 'What is Compounding?',
            content: 'Compounding is earning interest on your interest. Instead of just earning on your original amount, you earn on the growing total.',
          },
          {
            type: 'example',
            title: 'The Rice and Chessboard Story',
            content: 'If you put 1 grain of rice on the first square of a chessboard, 2 on the second, 4 on the third, doubling each time... by the 64th square, you\'d have more rice than exists on Earth! That\'s the power of compounding.',
          },
          {
            type: 'example',
            title: 'Real PPF Example',
            content: 'If you invest ₹12,500 per month in PPF (₹1.5L/year) at 7.1% for 15 years:\\n• You invest: ₹22.5 lakhs\\n• You get back: ₹40.7 lakhs\\n• Extra earned: ₹18.2 lakhs (just from compounding!)',
          },
          {
            type: 'highlight',
            title: 'The Earlier, The Better',
            content: 'Starting at age 25 vs 35 makes a HUGE difference. Even with the same monthly investment, starting 10 years earlier can mean 2-3x more money at retirement!',
          },
        ],
        quiz: [
          {
            question: 'In compounding, you earn interest on:',
            options: ['Only your original investment', 'Only last year\'s interest', 'Your total amount including past interest', 'A fixed amount every year'],
            correctAnswer: 2,
            explanation: 'Compounding means your interest earns interest. Each year, you earn on your original amount PLUS all the interest accumulated so far.',
          },
          {
            question: 'Ravi invests ₹5,000/month from age 25. Shyam invests ₹10,000/month from age 35. At age 60, who has more?',
            options: ['Shyam, because he invested more monthly', 'Ravi, because he started earlier', 'Both have the same', 'Cannot determine'],
            correctAnswer: 1,
            explanation: 'Despite investing half the amount, Ravi\'s 10 extra years of compounding means his money grows significantly more. Time is more powerful than amount!',
          },
        ],
        badge: {
          name: 'Compounding Champion',
          icon: '🏆',
        },
      },
    ],
  },
  {
    id: 2,
    title: 'Risk & Returns',
    description: 'Understanding the relationship between risk and reward',
    icon: '📊',
    color: '#10B981',
    lessons: [
      {
        id: 'what-is-risk',
        title: 'Understanding Risk',
        subtitle: 'Not all risks are created equal',
        icon: '⚠️',
        duration: '5 min',
        content: [
          {
            type: 'text',
            content: 'When we talk about "risk" in investing, we\'re talking about the chance that you might not get the returns you expected - or even lose some of your money.',
          },
          {
            type: 'highlight',
            title: 'The Traffic Light System',
            content: '🟢 GREEN (Very Low Risk): Government schemes like PPF, SSY, SCSS - guaranteed by govt\\n🟡 YELLOW (Medium Risk): NPS, corporate bonds - mostly safe but some fluctuation\\n🔴 RED (High Risk): Stocks, crypto - can give high returns but also big losses',
          },
          {
            type: 'example',
            title: 'Why Government Schemes are Safe',
            content: 'Government schemes are backed by the Government of India. The chances of the Indian government not paying you back are virtually zero. That\'s why they\'re considered the safest investments.',
          },
          {
            type: 'text',
            content: 'For beginners, starting with "green light" investments is wise. You can explore higher-risk options once you\'re comfortable with the basics.',
          },
        ],
        quiz: [
          {
            question: 'Which of these is considered the safest investment?',
            options: ['Bitcoin', 'PPF', 'Stock market', 'Real estate'],
            correctAnswer: 1,
            explanation: 'PPF is backed by the Government of India, making it one of the safest investments available. The government guarantees both your principal and returns.',
          },
          {
            question: 'What does "risk" mean in investing?',
            options: ['Definitely losing money', 'The chance of not getting expected returns', 'Illegal activity', 'High fees'],
            correctAnswer: 1,
            explanation: 'Risk in investing refers to the uncertainty - the possibility that actual returns may differ from expected returns, including the possibility of losing money.',
          },
        ],
        badge: {
          name: 'Risk Assessor',
          icon: '🔍',
        },
      },
      {
        id: 'risk-return-relationship',
        title: 'Risk vs Return Tradeoff',
        subtitle: 'Higher returns usually mean higher risk',
        icon: '📈',
        duration: '4 min',
        content: [
          {
            type: 'text',
            content: 'There\'s a fundamental rule in investing: if someone offers you very high returns with zero risk, they\'re probably lying. Here\'s how risk and return are connected.',
          },
          {
            type: 'comparison',
            title: 'Return Comparison',
            content: '• Savings Account: 3-4% (very safe)\\n• PPF: 7.1% (very safe, govt backed)\\n• SSY: 8.2% (very safe, highest govt rate)\\n• NPS: 9-12% (medium risk, market-linked)\\n• Stocks: 12-15% average (high risk)\\n• "Guaranteed 2% monthly" schemes: FRAUD!',
          },
          {
            type: 'highlight',
            title: 'Red Flag Warning',
            content: 'Any scheme promising more than 12-15% "guaranteed" returns is likely a scam. If someone offers 2-3% monthly (24-36% yearly) guaranteed returns, RUN AWAY!',
          },
          {
            type: 'example',
            title: 'Real Scam Examples',
            content: 'Sahara, Rose Valley, PACL - these companies promised 15-20%+ returns and millions of Indians lost their life savings. Stick to government schemes when starting out.',
          },
        ],
        quiz: [
          {
            question: 'Someone offers you a scheme with "guaranteed 30% annual returns." What should you do?',
            options: ['Invest all your savings', 'Invest a small amount to test', 'Stay away - likely a scam', 'Ask for more details'],
            correctAnswer: 2,
            explanation: 'No legitimate investment offers guaranteed 30% returns. Even the stock market doesn\'t guarantee such returns. This is a classic scam indicator.',
          },
          {
            question: 'Government schemes offer 7-8% returns. Why don\'t they offer 15-20%?',
            options: ['The government is greedy', 'Higher returns would require higher risk', 'They want you to stay poor', 'It\'s a conspiracy'],
            correctAnswer: 1,
            explanation: 'The government offers sustainable, low-risk returns. To offer 15-20%, they would need to take on much higher risk, which isn\'t appropriate for savings schemes.',
          },
        ],
        badge: {
          name: 'Scam Detector',
          icon: '🚨',
        },
      },
    ],
  },
  {
    id: 3,
    title: 'Tax Benefits',
    description: 'Save more by understanding tax deductions',
    icon: '📋',
    color: '#F59E0B',
    lessons: [
      {
        id: 'section-80c',
        title: 'Section 80C Explained',
        subtitle: 'Save up to ₹46,800 in taxes every year',
        icon: '💵',
        duration: '6 min',
        content: [
          {
            type: 'text',
            content: 'Section 80C is your best friend for tax saving. It allows you to reduce your taxable income by up to ₹1.5 lakh, which can save you thousands in taxes!',
          },
          {
            type: 'highlight',
            title: 'How It Works',
            content: 'If you earn ₹10 lakh and invest ₹1.5 lakh in 80C schemes, you\'re taxed on only ₹8.5 lakh. At 30% tax bracket, you save ₹46,800!',
          },
          {
            type: 'comparison',
            title: '80C Eligible Government Schemes',
            content: '✅ PPF - ₹1.5L limit\\n✅ SSY - ₹1.5L limit\\n✅ NSC - No upper limit (but only ₹1.5L eligible)\\n✅ SCSS - ₹30L limit (only ₹1.5L tax benefit)\\n✅ NPS - ₹1.5L under 80C + extra ₹50K under 80CCD(1B)\\n❌ POMIS - Not eligible\\n❌ KVP - Not eligible',
          },
          {
            type: 'example',
            title: 'Smart Tax Planning',
            content: 'Rahul earns ₹12L/year. He invests:\\n• ₹1.5L in PPF (80C: ₹1.5L)\\n• ₹50K in NPS (80CCD: ₹50K)\\nTotal deduction: ₹2L\\nTax saved: ₹62,400 (at 30% + cess)',
          },
        ],
        quiz: [
          {
            question: 'What is the maximum deduction allowed under Section 80C?',
            options: ['₹50,000', '₹1,00,000', '₹1,50,000', '₹2,00,000'],
            correctAnswer: 2,
            explanation: 'Section 80C allows a maximum deduction of ₹1,50,000 from your taxable income. This includes investments in PPF, SSY, NSC, ELSS, life insurance premiums, etc.',
          },
          {
            question: 'Which government scheme is NOT eligible for 80C benefit?',
            options: ['PPF', 'SSY', 'POMIS', 'NSC'],
            correctAnswer: 2,
            explanation: 'Post Office Monthly Income Scheme (POMIS) does not offer Section 80C tax benefits. It\'s good for regular income but not for tax saving.',
          },
        ],
        badge: {
          name: 'Tax Saver',
          icon: '💰',
        },
      },
      {
        id: 'eee-eet-explained',
        title: 'EEE vs EET Status',
        subtitle: 'Why PPF is triple tax-free',
        icon: '✅',
        duration: '4 min',
        content: [
          {
            type: 'text',
            content: 'Investment taxation has three stages: when you invest, when it grows (interest), and when you withdraw. EEE and EET tell you which stages are tax-exempt (E) or taxable (T).',
          },
          {
            type: 'highlight',
            title: 'EEE - The Holy Grail',
            content: 'E - Exempt: Investment is tax-deductible (80C)\\nE - Exempt: Interest earned is tax-free\\nE - Exempt: Maturity amount is tax-free\\n\\nSchemes with EEE: PPF, SSY, EPF',
          },
          {
            type: 'comparison',
            title: 'EET - Partially Taxed',
            content: 'E - Exempt: Investment is tax-deductible (80C)\\nE - Exempt: Interest earned is not taxed yearly\\nT - Taxable: Final amount or interest is taxed\\n\\nSchemes with EET: SCSS, NSC, NPS (partially)',
          },
          {
            type: 'example',
            title: 'Why EEE Matters',
            content: 'PPF (EEE): Invest ₹1.5L → Grow to ₹40L → You keep ₹40L\\nSCSS (EET): Invest ₹30L → Get ₹2.4L interest/year → Interest taxed at your slab\\n\\nFor high earners, EEE schemes save significant tax on returns.',
          },
        ],
        quiz: [
          {
            question: 'What does "EEE" status mean?',
            options: ['Extra Extra Earnings', 'Exempt at all three stages', 'Easy Easy Entry', 'Earnings Every Year'],
            correctAnswer: 1,
            explanation: 'EEE means Exempt-Exempt-Exempt: your investment qualifies for tax deduction, your interest is not taxed, and your maturity amount is also tax-free.',
          },
          {
            question: 'You\'re in the 30% tax bracket. Which gives better post-tax returns: PPF at 7.1% (EEE) or a taxable FD at 8%?',
            options: ['FD at 8%', 'PPF at 7.1%', 'Both are same', 'Cannot compare'],
            correctAnswer: 1,
            explanation: 'FD 8% after 30% tax = 5.6% effective return. PPF 7.1% with EEE status = 7.1% effective return. PPF wins because it\'s tax-free!',
          },
        ],
        badge: {
          name: 'Tax Expert',
          icon: '🎖️',
        },
      },
    ],
  },
  {
    id: 4,
    title: 'Your First Investment',
    description: 'Practical steps to start your investment journey',
    icon: '🚀',
    color: '#8B5CF6',
    lessons: [
      {
        id: 'documents-needed',
        title: 'Documents You Need',
        subtitle: 'Get these ready before you start',
        icon: '📄',
        duration: '3 min',
        content: [
          {
            type: 'text',
            content: 'Before opening any investment account, you\'ll need a few basic documents. Good news: most Indians already have these!',
          },
          {
            type: 'highlight',
            title: 'Essential Documents',
            content: '1. PAN Card - Mandatory for investments > ₹50,000\\n2. Aadhaar Card - For KYC verification\\n3. Bank Account - With cheque book\\n4. Passport Size Photos - 2-3 copies\\n5. Address Proof - Aadhaar/Utility bill/Passport',
          },
          {
            type: 'example',
            title: 'Don\'t Have PAN?',
            content: 'Apply online at incometax.gov.in. It takes about 15-20 days. Cost: ₹107. You can use Aadhaar for small investments while waiting for PAN.',
          },
          {
            type: 'text',
            content: 'Pro tip: Keep scanned copies of all documents on your phone or email. Many banks now accept digital KYC!',
          },
        ],
        quiz: [
          {
            question: 'Which document is mandatory for investments above ₹50,000?',
            options: ['Voter ID', 'Driving License', 'PAN Card', 'Passport'],
            correctAnswer: 2,
            explanation: 'PAN Card is mandatory for all financial transactions above ₹50,000 as per Income Tax rules. It helps the government track high-value transactions.',
          },
        ],
        badge: {
          name: 'Prepared Investor',
          icon: '📋',
        },
      },
      {
        id: 'where-to-open',
        title: 'Where to Open Accounts',
        subtitle: 'Banks vs Post Office vs Online',
        icon: '🏛️',
        duration: '5 min',
        content: [
          {
            type: 'text',
            content: 'You have multiple options for opening government scheme accounts. Here\'s how to choose the right one for you.',
          },
          {
            type: 'comparison',
            title: 'Post Office',
            content: '✅ All government schemes available\\n✅ Personal service\\n✅ Good for rural areas\\n❌ May have queues\\n❌ Limited online access\\n\\nBest for: SSY, KVP, NSC, POMIS, MSSC',
          },
          {
            type: 'comparison',
            title: 'Banks (SBI, HDFC, ICICI, etc.)',
            content: '✅ PPF, SSY, SCSS, NPS available\\n✅ Link to existing savings account\\n✅ Online management via net banking\\n✅ Mobile app access\\n❌ Not all schemes available\\n\\nBest for: PPF, NPS, SCSS',
          },
          {
            type: 'comparison',
            title: 'Online Platforms',
            content: '✅ NPS, SGB available online\\n✅ Quick, paperless\\n✅ 24/7 access\\n❌ Not for all schemes\\n\\nBest for: NPS (eNPS portal), SGB (bank websites)',
          },
          {
            type: 'highlight',
            title: 'Recommendation for Beginners',
            content: 'Start with your existing bank. Open a PPF account linked to your savings account. You can manage it entirely through net banking - invest anytime, check balance anytime!',
          },
        ],
        quiz: [
          {
            question: 'Which is the easiest way for a beginner to start investing in PPF?',
            options: ['Visit the RBI office', 'Through their existing bank\'s net banking', 'Buy from a broker', 'Through a mutual fund'],
            correctAnswer: 1,
            explanation: 'Most banks allow you to open a PPF account through net banking, linked to your existing savings account. It\'s the quickest and most convenient option.',
          },
        ],
        badge: {
          name: 'Account Opener',
          icon: '🔓',
        },
      },
      {
        id: 'first-investment-steps',
        title: 'Making Your First Investment',
        subtitle: 'Step-by-step PPF account opening',
        icon: '✨',
        duration: '5 min',
        content: [
          {
            type: 'text',
            content: 'Let\'s walk through opening a PPF account through SBI Net Banking as an example. The process is similar for other banks.',
          },
          {
            type: 'highlight',
            title: 'Online Steps (SBI Example)',
            content: '1. Login to SBI Net Banking\\n2. Go to Fixed Deposit → PPF → Open PPF Account\\n3. Enter nominee details\\n4. Choose initial deposit amount (min ₹500)\\n5. Accept terms and conditions\\n6. Confirm with OTP\\n7. Done! PPF account opened in 5 minutes',
          },
          {
            type: 'example',
            title: 'Offline Steps (Bank Branch)',
            content: '1. Visit your bank branch\\n2. Ask for PPF account opening form\\n3. Fill form with personal details\\n4. Attach PAN, Aadhaar copies, photo\\n5. Submit with initial deposit cheque\\n6. Collect account number in 2-3 days',
          },
          {
            type: 'highlight',
            title: 'After Opening Your Account',
            content: '✅ Set up auto-debit for monthly investments\\n✅ Save the account number safely\\n✅ Add nominee (very important!)\\n✅ Download passbook/statement yearly\\n✅ Invest before March 31 for tax benefit',
          },
        ],
        quiz: [
          {
            question: 'What\'s the minimum amount to open a PPF account?',
            options: ['₹100', '₹500', '₹1,000', '₹5,000'],
            correctAnswer: 1,
            explanation: 'You can open a PPF account with just ₹500. The minimum yearly deposit is also ₹500, making it accessible for everyone.',
          },
          {
            question: 'Why is adding a nominee important?',
            options: ['For higher interest rate', 'For the money to go to your chosen person if something happens to you', 'It\'s not important', 'For tax benefits'],
            correctAnswer: 1,
            explanation: 'A nominee ensures your investments go to your chosen person in case of your death, avoiding legal complications for your family.',
          },
        ],
        badge: {
          name: 'First Investor',
          icon: '🌟',
        },
      },
    ],
  },
];

export const getLevelById = (id: number): Level | undefined => {
  return learningLevels.find(level => level.id === id);
};

export const getLessonById = (lessonId: string): Lesson | undefined => {
  for (const level of learningLevels) {
    const lesson = level.lessons.find(l => l.id === lessonId);
    if (lesson) return lesson;
  }
  return undefined;
};

export const getTotalLessons = (): number => {
  return learningLevels.reduce((total, level) => total + level.lessons.length, 0);
};
