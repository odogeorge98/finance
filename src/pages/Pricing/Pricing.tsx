// src/pages/Pricing/Pricing.tsx
import React, { useState, useEffect } from 'react';
import { Button } from '../../components/Button/Button';
import { StatsCounter } from '../../components/StatsCounter/StatsCounter';
import './Pricing.css';

// React Icons Imports
import {
  FaCheck,
  FaTimes,
  FaChevronRight,
  FaCrown,
  FaUser,
  FaBuilding,
  FaRocket,
  FaQuestionCircle,
  FaFire,
  FaPiggyBank,
  FaGift,
  FaAward
} from 'react-icons/fa';
import {
  BsCheckCircle,
  BsShieldCheck
} from 'react-icons/bs';

import { AiOutlineRocket, AiOutlineLineChart } from 'react-icons/ai';


type PricingPlan = {
  id: string;
  name: string;
  description: string;
  price: number;
  billing: 'monthly' | 'yearly';
  discountPrice?: number;
  period?: string;
  popular: boolean;
  features: string[];
  excluded?: string[];
  buttonText: string;
  buttonVariant: 'primary' | 'outline' | 'ghost';
  icon: React.ReactNode;
  color: string;
  gradient: string;
};

type FAQ = {
  id: number;
  question: string;
  answer: string;
};

export const Pricing: React.FC = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('yearly');
  const [activeFAQ, setActiveFAQ] = useState<number | null>(null);


  const pricingPlans: PricingPlan[] = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Perfect for beginners exploring finance',
      price: 29,
      billing: 'monthly',
      discountPrice: billingPeriod === 'yearly' ? 290 : undefined,
      period: billingPeriod === 'monthly' ? 'per month' : 'per year',
      popular: false,
      features: [
        'Access to 5 beginner courses',
        'Basic community access',
        'Mobile app access',
        'Certificate of completion',
        'Weekly market updates',
        'Email support'
      ],
      excluded: [
        'Advanced courses',
        'One-on-one mentoring',
        'Live Q&A sessions',
        'Priority support',
        'Downloadable resources'
      ],
      buttonText: 'Get Started',
      buttonVariant: 'outline',
      icon: <FaUser />,
      color: '#06b6d4',
      gradient: 'linear-gradient(135deg, #06b6d4, #0891b2)'
    },
    {
      id: 'premium',
      name: 'Premium',
      description: 'Most popular for serious investors',
      price: 99,
      billing: 'monthly',
      discountPrice: billingPeriod === 'yearly' ? 790 : undefined,
      period: billingPeriod === 'monthly' ? 'per month' : 'per year',
      popular: true,
      features: [
        'Access to all 15+ courses',
        'Advanced community access',
        'Mobile app + offline access',
        'Professional certificates',
        'Daily market updates',
        'Priority email support',
        'One-on-one mentoring (2/month)',
        'Live Q&A sessions',
        'Downloadable resources',
        'Portfolio templates'
      ],
      buttonText: 'Choose Premium',
      buttonVariant: 'primary',
      icon: <FaCrown />,
      color: '#8b5cf6',
      gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For teams and organizations',
      price: 299,
      billing: 'monthly',
      discountPrice: billingPeriod === 'yearly' ? 2390 : undefined,
      period: billingPeriod === 'monthly' ? 'per month' : 'per year',
      popular: false,
      features: [
        'Everything in Premium',
        'Team management dashboard',
        'Custom learning paths',
        'Dedicated account manager',
        'Custom content integration',
        'API access',
        'SSO & advanced security',
        'Usage analytics',
        'Custom certificates',
        '24/7 phone support',
        'Onboarding assistance',
        'Quarterly strategy sessions'
      ],
      buttonText: 'Contact Sales',
      buttonVariant: 'outline',
      icon: <FaBuilding />,
      color: '#10b981',
      gradient: 'linear-gradient(135deg, #10b981, #059669)'
    }
  ];

  const featuresComparison = [
    {
      feature: 'Number of Courses',
      starter: '5',
      premium: '15+',
      enterprise: '15+ & Custom'
    },
    {
      feature: 'Community Access',
      starter: 'Basic',
      premium: 'Advanced',
      enterprise: 'Enterprise'
    },
    {
      feature: 'One-on-One Mentoring',
      starter: false,
      premium: '2 sessions/month',
      enterprise: 'Unlimited'
    },
    {
      feature: 'Live Q&A Sessions',
      starter: false,
      premium: true,
      enterprise: true
    },
    {
      feature: 'Certificates',
      starter: 'Basic',
      premium: 'Professional',
      enterprise: 'Custom'
    },
    {
      feature: 'Mobile Offline Access',
      starter: true,
      premium: true,
      enterprise: true
    },
    {
      feature: 'Support',
      starter: 'Email',
      premium: 'Priority Email',
      enterprise: '24/7 Phone'
    },
    {
      feature: 'Team Features',
      starter: false,
      premium: false,
      enterprise: true
    },
    {
      feature: 'API Access',
      starter: false,
      premium: false,
      enterprise: true
    },
    {
      feature: 'Custom Content',
      starter: false,
      premium: false,
      enterprise: true
    }
  ];

  const faqs: FAQ[] = [
    {
      id: 1,
      question: 'Can I switch plans later?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. When upgrading, you\'ll get prorated credit for your remaining time. Downgrades take effect at the end of your billing cycle.'
    },
    {
      id: 2,
      question: 'Is there a free trial?',
      answer: 'Yes! We offer a 7-day free trial for our Premium plan. You get full access to all features during the trial period. No credit card is required to start the trial.'
    },
    {
      id: 3,
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for Enterprise plans. All payments are processed securely with 256-bit SSL encryption.'
    },
    {
      id: 4,
      question: 'Can I cancel anytime?',
      answer: 'Absolutely. You can cancel your subscription at any time from your account settings. There are no cancellation fees, and you\'ll continue to have access until the end of your billing period.'
    },
    {
      id: 5,
      question: 'Do you offer discounts for students?',
      answer: 'Yes! We offer a 50% discount for students with valid .edu email addresses. Contact our support team with proof of enrollment to get your student discount.'
    },
    {
      id: 6,
      question: 'What if I\'m not satisfied?',
      answer: 'We offer a 30-day money-back guarantee. If you\'re not completely satisfied with our platform within the first 30 days, we\'ll issue a full refund, no questions asked.'
    }
  ];

  const valuePropositions = [
    {
      icon: <FaPiggyBank />,
      title: 'Save 33% Annually',
      description: 'Get 2 months free when you choose yearly billing'
    },
    {
      icon: <BsShieldCheck />,
      title: '30-Day Guarantee',
      description: 'Full refund if not satisfied in first month'
    },
    {
      icon: <FaGift />,
      title: 'Free 7-Day Trial',
      description: 'Try Premium plan free for 7 days'
    },
    {
      icon: <FaAward />,
      title: 'Certificate Included',
      description: 'Professional certificates at no extra cost'
    }
  ];

  // Add scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const calculateSavings = (plan: PricingPlan) => {
    if (plan.discountPrice && billingPeriod === 'yearly') {
      const yearlyPrice = plan.price * 12;
      const savings = yearlyPrice - plan.discountPrice;
      const percentage = Math.round((savings / yearlyPrice) * 100);
      return { savings, percentage };
    }
    return { savings: 0, percentage: 0 };
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="pricing-page">
      {/* Hero Section */}
      <section className="pricing-hero">
        <div className="container">
          <div className="pricing-hero__content">
            <div className="pricing-hero__badge animate-on-scroll">
              <FaGift /> Special Launch Offer
            </div>
            
            <h1 className="pricing-hero__title animate-on-scroll">
              Simple, Transparent
              <span className="pricing-hero__title-highlight"> Pricing</span>
            </h1>
            
            <p className="pricing-hero__description animate-on-scroll">
              Choose the perfect plan for your investment journey. All plans include our 
              core features with no hidden fees. Start learning risk-free with our 7-day trial.
            </p>
            
            <div className="pricing-hero__stats animate-on-scroll">
              <div className="pricing-hero__stat">
                <StatsCounter endValue={1250} duration={2000} suffix="+" />
                <span>Active Students</span>
              </div>
              <div className="pricing-hero__stat">
                <StatsCounter endValue={98} duration={2000} suffix="%" />
                <span>Satisfaction Rate</span>
              </div>
              <div className="pricing-hero__stat">
                <StatsCounter endValue={30} duration={2000} />
                <span>Day Guarantee</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pricing-hero__background">
          <div className="pricing-hero__orb pricing-hero__orb--1"></div>
          <div className="pricing-hero__orb pricing-hero__orb--2"></div>
          <div className="pricing-hero__grid-overlay"></div>
        </div>
      </section>

      {/* Billing Toggle */}
      <section className="pricing-toggle">
        <div className="container">
          <div className="pricing-toggle__content animate-on-scroll">
            <div className="pricing-toggle__wrapper">
              <div className="pricing-toggle__labels">
                <span className={`pricing-toggle__label ${billingPeriod === 'monthly' ? 'active' : ''}`}>
                  Monthly
                </span>
                <span className="pricing-toggle__switch">
                  <input
                    type="checkbox"
                    id="billing-toggle"
                    className="pricing-toggle__checkbox"
                    checked={billingPeriod === 'yearly'}
                    onChange={(e) => setBillingPeriod(e.target.checked ? 'yearly' : 'monthly')}
                  />
                  <label htmlFor="billing-toggle" className="pricing-toggle__slider">
                    <span className="pricing-toggle__slider-knob"></span>
                  </label>
                </span>
                <span className={`pricing-toggle__label ${billingPeriod === 'yearly' ? 'active' : ''}`}>
                  Yearly <span className="pricing-toggle__savings">Save 33%</span>
                </span>
              </div>
              <div className="pricing-toggle__note">
                Switch to yearly billing and get 2 months free + additional features
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="value-props">
        <div className="container">
          <div className="value-props__grid">
            {valuePropositions.map((prop, index) => (
              <div
                key={index}
                className="value-prop animate-on-scroll"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="value-prop__icon">
                  {prop.icon}
                </div>
                <h3 className="value-prop__title">{prop.title}</h3>
                <p className="value-prop__description">{prop.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="pricing-plans">
        <div className="container">
          <div className="pricing-plans__header animate-on-scroll">
            <h2 className="pricing-plans__title">
              Choose Your Plan
            </h2>
            <p className="pricing-plans__subtitle">
              All plans include our core features. Upgrade or downgrade at any time.
            </p>
          </div>

          <div className="pricing-plans__grid">
            {pricingPlans.map((plan, index) => {
              const savings = calculateSavings(plan);
              
              return (
                <div
                  key={plan.id}
                  className={`pricing-card animate-on-scroll ${plan.popular ? 'popular' : ''}`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {plan.popular && (
                    <div className="pricing-card__badge">
                      <FaFire /> Most Popular
                    </div>
                  )}
                  
                  <div className="pricing-card__header">
                    <div className="pricing-card__icon" style={{ background: plan.gradient }}>
                      {plan.icon}
                    </div>
                    <h3 className="pricing-card__name">{plan.name}</h3>
                    <p className="pricing-card__description">{plan.description}</p>
                  </div>
                  
                  <div className="pricing-card__pricing">
                    <div className="pricing-card__price">
                      {plan.discountPrice && billingPeriod === 'yearly' ? (
                        <>
                          <span className="pricing-card__old-price">
                            {formatPrice(plan.price * 12)}
                          </span>
                          <span className="pricing-card__new-price">
                            {formatPrice(plan.discountPrice)}
                          </span>
                        </>
                      ) : (
                        <span className="pricing-card__current-price">
                          {formatPrice(plan.price)}
                        </span>
                      )}
                      <span className="pricing-card__period">
                        {plan.period}
                      </span>
                    </div>
                    
                    {savings.percentage > 0 && (
                      <div className="pricing-card__savings">
                        Save {savings.percentage}% ({formatPrice(savings.savings)})
                      </div>
                    )}
                  </div>
                  
                  <div className="pricing-card__features">
                    <h4 className="pricing-card__features-title">
                      What's Included:
                    </h4>
                    <ul className="pricing-card__features-list">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="pricing-card__feature">
                          <FaCheck className="pricing-card__feature-icon" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    {plan.excluded && plan.excluded.length > 0 && (
                      <>
                        <h4 className="pricing-card__excluded-title">
                          Not Included:
                        </h4>
                        <ul className="pricing-card__excluded-list">
                          {plan.excluded.map((feature, idx) => (
                            <li key={idx} className="pricing-card__excluded">
                              <FaTimes className="pricing-card__excluded-icon" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                  
                  <div className="pricing-card__actions">
                    <Button
                      variant={plan.buttonVariant}
                      size="lg"
                      fullWidth
                      className={plan.popular ? 'pricing-card__cta-popular' : ''}
                    >
                      {plan.buttonText}
                      <FaChevronRight className="btn-icon-right" />
                    </Button>
                    
                    {plan.id === 'premium' && (
                      <div className="pricing-card__trial">
                        <FaGift /> 7-day free trial available
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="feature-comparison">
        <div className="container">
          <div className="feature-comparison__header animate-on-scroll">
            <h2 className="feature-comparison__title">
              Compare All Features
            </h2>
            <p className="feature-comparison__subtitle">
              Detailed comparison to help you choose the right plan
            </p>
          </div>

          <div className="feature-comparison__table animate-on-scroll">
            <div className="feature-comparison__table-header">
              <div className="feature-comparison__table-cell feature-comparison__table-feature">
                Feature
              </div>
              <div className="feature-comparison__table-cell feature-comparison__table-plan">
                <div className="feature-comparison__plan-name">
                  <FaUser /> Starter
                </div>
              </div>
              <div className="feature-comparison__table-cell feature-comparison__table-plan popular">
                <div className="feature-comparison__plan-name">
                  <FaCrown /> Premium
                </div>
              </div>
              <div className="feature-comparison__table-cell feature-comparison__table-plan">
                <div className="feature-comparison__plan-name">
                  <FaBuilding /> Enterprise
                </div>
              </div>
            </div>

            <div className="feature-comparison__table-body">
              {featuresComparison.map((item, index) => (
                <div
                  key={index}
                  className={`feature-comparison__table-row ${index % 2 === 0 ? 'even' : 'odd'}`}
                >
                  <div className="feature-comparison__table-cell feature-comparison__table-feature">
                    {item.feature}
                  </div>
                  <div className="feature-comparison__table-cell feature-comparison__table-plan">
                    {typeof item.starter === 'boolean' ? (
                      item.starter ? (
                        <div className="feature-comparison__check">
                          <BsCheckCircle /> Included
                        </div>
                      ) : (
                        <div className="feature-comparison__cross">×</div>
                      )
                    ) : (
                      <div className="feature-comparison__value">{item.starter}</div>
                    )}
                  </div>
                  <div className="feature-comparison__table-cell feature-comparison__table-plan popular">
                    {typeof item.premium === 'boolean' ? (
                      item.premium ? (
                        <div className="feature-comparison__check">
                          <BsCheckCircle /> Included
                        </div>
                      ) : (
                        <div className="feature-comparison__cross">×</div>
                      )
                    ) : (
                      <div className="feature-comparison__value">{item.premium}</div>
                    )}
                  </div>
                  <div className="feature-comparison__table-cell feature-comparison__table-plan">
                    {typeof item.enterprise === 'boolean' ? (
                      item.enterprise ? (
                        <div className="feature-comparison__check">
                          <BsCheckCircle /> Included
                        </div>
                      ) : (
                        <div className="feature-comparison__cross">×</div>
                      )
                    ) : (
                      <div className="feature-comparison__value">{item.enterprise}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="pricing-faq">
        <div className="container">
          <div className="pricing-faq__header animate-on-scroll">
            <h2 className="pricing-faq__title">
              Frequently Asked Questions
            </h2>
            <p className="pricing-faq__subtitle">
              Everything you need to know about our pricing and plans
            </p>
          </div>

          <div className="pricing-faq__content">
            <div className="pricing-faq__questions">
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  className={`pricing-faq__question animate-on-scroll ${
                    activeFAQ === faq.id ? 'active' : ''
                  }`}
                >
                  <button
                    className="pricing-faq__question-header"
                    onClick={() => setActiveFAQ(activeFAQ === faq.id ? null : faq.id)}
                  >
                    <span className="pricing-faq__question-text">
                      {faq.question}
                    </span>
                    <span className="pricing-faq__question-icon">
                      {activeFAQ === faq.id ? '−' : '+'}
                    </span>
                  </button>
                  <div className="pricing-faq__answer">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="pricing-cta">
        <div className="container">
          <div className="pricing-cta__content animate-on-scroll">
            <div className="pricing-cta__badge">
              <AiOutlineRocket /> Limited Time
            </div>
            <h2 className="pricing-cta__title">
              Start Your Financial Journey Today
            </h2>
            <p className="pricing-cta__description">
              Join thousands of successful investors. Choose your plan and get started 
              with a 7-day free trial. No credit card required.
            </p>
            
            <div className="pricing-cta__stats">
              <div className="pricing-cta__stat">
                <div className="pricing-cta__stat-value">
                  <StatsCounter endValue={1250} duration={2000} suffix="+" />
                </div>
                <div className="pricing-cta__stat-label">Students</div>
              </div>
              <div className="pricing-cta__stat">
                <div className="pricing-cta__stat-value">
                  <StatsCounter endValue={94} duration={2000} suffix="%" />
                </div>
                <div className="pricing-cta__stat-label">Satisfaction</div>
              </div>
              <div className="pricing-cta__stat">
                <div className="pricing-cta__stat-value">
                  <StatsCounter endValue={30} duration={2000} />
                </div>
                <div className="pricing-cta__stat-label">Day Guarantee</div>
              </div>
            </div>
            
            <div className="pricing-cta__actions">
              <Button variant="primary" size="lg">
                <span className="pricing-cta__icon">
                  <FaRocket />
                </span>
                Start Free Trial
                <FaChevronRight className="btn-icon-right" />
              </Button>
              <Button variant="outline" size="lg">
                <span className="pricing-cta__icon">
                  <FaQuestionCircle />
                </span>
                Contact Sales
              </Button>
            </div>
            
            <div className="pricing-cta__guarantee">
              <span className="pricing-cta__guarantee-icon">
                <BsShieldCheck />
              </span>
              7-Day Free Trial • 30-Day Money-Back Guarantee • No Hidden Fees
            </div>
          </div>
        </div>
        
        <div className="pricing-cta__background">
          <div className="pricing-cta__particles">
            {[...Array(20)].map((_, i) => (
              <div key={i} className={`pricing-cta__particle particle-${i + 1}`}></div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;