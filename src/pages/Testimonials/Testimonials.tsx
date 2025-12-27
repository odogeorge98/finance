// src/pages/Testimonials/Testimonials.tsx
import React, { useState } from 'react';
import { Button } from '../../components/Button/Button';
import { StatsCounter } from '../../components/StatsCounter/StatsCounter';
import './Testimonials.css';

// React Icons Imports
import {
  FaStar,
  FaQuoteLeft,
  FaQuoteRight,
  FaUsers,
  FaGraduationCap,
  FaHeart,
  FaRocket,
  FaChevronRight,
  FaPlay,
  FaCheckCircle
} from 'react-icons/fa';
import {
  BsShieldCheck
} from 'react-icons/bs';

type Testimonial = {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
  date: string;
  location: string;
  verified: boolean;
  achievements?: string[];
};

export const Testimonials: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'James Wilson',
      role: 'Portfolio Manager',
      company: 'Goldman Sachs',
      content: 'The Stock Market Pro course completely transformed my approach to technical analysis. The AI-powered insights are revolutionary and helped me increase my portfolio returns by 42% in just 6 months.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200',
      rating: 5,
      date: 'March 15, 2024',
      location: 'Calabar, Nigeria',
      verified: true,
      achievements: [
        '42% portfolio growth in 6 months',
        'Promoted to Senior Portfolio Manager',
        'Started managing $50M+ in assets'
      ]
    },
    {
      id: 2,
      name: 'Sophia Martinez',
      role: 'Financial Analyst',
      company: 'JP Morgan',
      content: 'As a beginner, Wealth Fundamentals gave me the confidence to manage my own finances. The instructors are exceptional, and the community support made all the difference in my journey.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=200',
      rating: 5,
      date: 'February 28, 2024',
      location: 'port Harcourt, Nigeria',
      verified: true,
      achievements: [
        'Paid off $25,000 in student debt',
        'Built $100,000 investment portfolio',
        'Started financial coaching business'
      ]
    },
    {
      id: 3,
      name: 'Robert Chen',
      role: 'Crypto Trader',
      company: 'Self-Employed',
      content: 'The Crypto Futures course provided insights I never found elsewhere. The DeFi section alone was worth the price. I\'ve applied these strategies to achieve consistent monthly returns.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200',
      rating: 5,
      date: 'April 5, 2024',
      location: 'Oyo, Nigeria',
      verified: true,
      achievements: [
        '25% average monthly returns',
        'Built automated trading bot',
        'Mentoring aspiring traders'
      ]
    },
    {
      id: 4,
      name: 'Amanda Rodriguez',
      role: 'Real Estate Investor',
      company: 'Rodriguez Properties',
      content: 'The Real Estate Investment course changed my life. I went from renting to owning 4 properties in 18 months. The market analysis tools and negotiation strategies were game-changing.',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200',
      rating: 5,
      date: 'January 20, 2024',
      location: 'Lagos, Nigeria',
      verified: true,
      achievements: [
        '4 properties in 18 months',
        '$15,000 monthly rental income',
        'Founded investment group'
      ]
    },
    {
      id: 5,
      name: 'Michael Thompson',
      role: 'Retirement Planner',
      company: 'Fidelity Investments',
      content: 'The Retirement Planning course provided advanced strategies that I now use with my clients. The tax optimization module alone helped clients save thousands annually.',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200',
      rating: 4.5,
      date: 'December 10, 2023',
      location: 'Anambra, Nigeria',
      verified: true,
      achievements: [
        'Increased client retention by 35%',
        'Saved clients $500K+ in taxes',
        'Featured in publications'
      ]
    },
    {
      id: 6,
      name: 'Lisa Wang',
      role: 'Day Trader',
      company: 'Self-Employed',
      content: 'The Advanced Stock Market Pro course took my trading to the next level. The risk management strategies prevented significant losses during market volatility.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200',
      rating: 5,
      date: 'March 30, 2024',
      location: 'Abuja, Nigeria',
      verified: true,
      achievements: [
        'Consistent 15% monthly returns',
        'Published trading guide',
        'Teaching workshops'
      ]
    }
  ];

  const stats = [
    {
      value: 1250,
      label: 'Students Transformed',
      suffix: '+'
    },
    {
      value: 4.9,
      label: 'Average Rating',
      suffix: '/5'
    },
    {
      value: 48,
      label: 'Success Stories',
      suffix: '+'
    },
    {
      value: 98,
      label: 'Would Recommend',
      suffix: '%'
    }
  ];

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} className="star-icon">
        {index < Math.floor(rating) ? (
          <FaStar className="star-filled" />
        ) : index < rating ? (
          <FaStar className="star-half" />
        ) : (
          <FaStar className="star-empty" />
        )}
      </span>
    ));
  };

  return (
    <div className="testimonials-page">
      {/* Hero Section */}
      <section className="testimonials-hero">
        <div className="container">
          <div className="testimonials-hero__content">
            <div className="testimonials-hero__badge">
              <FaHeart /> Transformative Stories
            </div>
            
            <h1 className="testimonials-hero__title">
              Voices of
              <span className="gradient-text"> Success</span>
            </h1>
            
            <p className="testimonials-hero__description">
              Hear from our community of investors who have transformed their financial 
              futures with our cutting-edge courses and expert guidance.
            </p>
            
            <div className="testimonials-hero__stats">
              {stats.map((stat, index) => (
                <div key={index} className="testimonials-hero__stat">
                  <div className="testimonials-hero__stat-value">
                    <StatsCounter
                      endValue={stat.value}
                      duration={2000}
                      suffix={stat.suffix}
                    />
                  </div>
                  <div className="testimonials-hero__stat-label">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Futuristic Background Elements */}
        <div className="testimonials-hero__background">
          {/* Snow Falling Animation */}
          <div className="snow-fall">
            {[...Array(100)].map((_, i) => (
              <div 
                key={i} 
                className="snowflake"
                style={{
                  '--size': `${Math.random() * 4 + 2}px`,
                  '--left': `${Math.random() * 100}%`,
                  '--opacity': Math.random() * 0.5 + 0.3,
                  '--duration': `${Math.random() * 15 + 10}s`,
                  '--delay': `${Math.random() * 5}s`,
                  '--sway': `${Math.random() * 100 - 50}px`
                } as React.CSSProperties}
              ></div>
            ))}
          </div>
          
          {/* Floating Orbs */}
          <div className="hero-orb hero-orb--1"></div>
          <div className="hero-orb hero-orb--2"></div>
          <div className="hero-orb hero-orb--3"></div>
          <div className="hero-orb hero-orb--4"></div>
          
          {/* Animated Grid */}
          <div className="hero-grid"></div>
          
          {/* Floating Particles */}
          <div className="hero-particles">
            {[...Array(6)].map((_, i) => (
              <div key={i} className={`hero-particle particle-${i + 1}`}></div>
            ))}
          </div>
          
          {/* Glowing Rings */}
          <div className="hero-ring hero-ring--1"></div>
          <div className="hero-ring hero-ring--2"></div>
          <div className="hero-ring hero-ring--3"></div>
          
          {/* Gradient Overlay */}
          <div className="hero-gradient-overlay"></div>
          
          {/* Light Beams */}
          <div className="hero-beam hero-beam--1"></div>
          <div className="hero-beam hero-beam--2"></div>
          <div className="hero-beam hero-beam--3"></div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="testimonials-grid">
        <div className="container">
          <div className="testimonials-grid__header">
            <h2 className="testimonials-grid__title">
              Real Results, Real People
            </h2>
            <p className="testimonials-grid__subtitle">
              Meet the investors who are redefining success
            </p>
          </div>

          <div className="testimonials-grid__content">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className={`testimonial-card ${
                  hoveredCard === testimonial.id ? 'hovered' : ''
                }`}
                onMouseEnter={() => setHoveredCard(testimonial.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="testimonial-card__glow"></div>
                
                <div className="testimonial-card__header">
                  <div className="testimonial-card__avatar">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="testimonial-card__avatar-image"
                    />
                    {testimonial.verified && (
                      <div className="testimonial-card__verified">
                        <BsShieldCheck />
                      </div>
                    )}
                  </div>
                  
                  <div className="testimonial-card__info">
                    <h3 className="testimonial-card__name">
                      {testimonial.name}
                    </h3>
                    <div className="testimonial-card__role">
                      {testimonial.role}
                    </div>
                    <div className="testimonial-card__company">
                      {testimonial.company}
                    </div>
                  </div>
                </div>

                <div className="testimonial-card__content">
                  <div className="testimonial-card__quote">
                    <FaQuoteLeft className="testimonial-card__quote-icon quote-left" />
                    <p className="testimonial-card__text">
                      {testimonial.content}
                    </p>
                    <FaQuoteRight className="testimonial-card__quote-icon quote-right" />
                  </div>

                  <div className="testimonial-card__rating">
                    <div className="testimonial-card__stars">
                      {renderStars(testimonial.rating)}
                    </div>
                    <div className="testimonial-card__meta">
                      <span className="testimonial-card__location">
                        {testimonial.location}
                      </span>
                      <span className="testimonial-card__date">
                        {testimonial.date}
                      </span>
                    </div>
                  </div>

                  {testimonial.achievements && (
                    <div className="testimonial-card__achievements">
                      <div className="testimonial-card__achievements-title">
                        Key Achievements
                      </div>
                      <ul className="testimonial-card__achievements-list">
                        {testimonial.achievements.slice(0, 2).map((achievement, idx) => (
                          <li key={idx} className="testimonial-card__achievement">
                            <FaCheckCircle /> {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-section__header">
            <h2 className="stats-section__title">
              Impact by Numbers
            </h2>
            <p className="stats-section__subtitle">
              Quantifying transformation across our community
            </p>
          </div>

          <div className="stats-section__grid">
            <div className="stat-card">
              <div className="stat-card__value">
                <StatsCounter endValue={42} duration={2000} suffix="%" />
              </div>
              <div className="stat-card__label">
                Average Portfolio Growth
              </div>
              <div className="stat-card__description">
                Within 6 months of course completion
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-card__value">
                <StatsCounter endValue={89} duration={2000} suffix="%" />
              </div>
              <div className="stat-card__label">
                Career Advancement
              </div>
              <div className="stat-card__description">
                Promotions or better job offers
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-card__value">
                <StatsCounter endValue={95} duration={2000} suffix="%" />
              </div>
              <div className="stat-card__label">
                Course Completion
              </div>
              <div className="stat-card__description">
                Higher than industry average
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-card__value">
                <StatsCounter endValue={1.3} duration={2000} suffix="M+" />
              </div>
              <div className="stat-card__label">
                Community Earnings
              </div>
              <div className="stat-card__description">
                Generated through our strategies
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="testimonials-cta">
        <div className="container">
          <div className="testimonials-cta__content">
            <h2 className="testimonials-cta__title">
              Ready to Write Your
              <span className="gradient-text"> Success Story?</span>
            </h2>
            
            <p className="testimonials-cta__description">
              Join thousands of investors who have transformed their financial futures. 
              Start your journey with a 7-day free trial and experience the difference.
            </p>
            
            <div className="testimonials-cta__actions">
              <Button variant="primary" size="lg">
                <FaRocket className="btn-icon-left" />
                Start Free Trial
                <FaChevronRight className="btn-icon-right" />
              </Button>
              
              <Button variant="outline" size="lg">
                <FaPlay className="btn-icon-left" />
                Watch Stories
              </Button>
            </div>
            
            <div className="testimonials-cta__guarantee">
              <BsShieldCheck className="guarantee-icon" />
              7-Day Free Trial • 30-Day Money-Back Guarantee
            </div>
          </div>
        </div>
        
        <div className="testimonials-cta__background">
          <div className="testimonials-cta__gradient"></div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;