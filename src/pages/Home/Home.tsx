// src/pages/Home/Home.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '../../components/Button/Button';
import { StatsCounter } from '../../components/StatsCounter/StatsCounter';
import { FeatureCard } from '../../components/Card/FeatureCard';
import { TestimonialCard } from '../../components/Card/TestimonialCard';
import './Home.css';

// React Icons Imports
import { 
  FaGem, 
  FaPlay, 
  FaBookOpen, 
  FaRocket, 
  FaBullseye, 
  FaChalkboardTeacher,
  FaMobileAlt,
  FaSyncAlt,
  FaHandshake,
  FaClock,
  FaUser,
  FaStar,
  FaRegStar,
  FaChartLine,
  FaMoneyBillWave,
  FaCoins,
  FaHome,
  FaPiggyBank,
  FaCheck,
  FaChevronRight,
  FaGift
} from 'react-icons/fa';
import { 
  GiTakeMyMoney,
  GiChart,
  GiMoneyStack,
  GiCrystalBars
} from 'react-icons/gi';
import { 
  BsGraphUp,
  BsCurrencyExchange,
  BsShieldCheck
} from 'react-icons/bs';
import { AiOutlinePercentage } from 'react-icons/ai';
import { MdOutlineWorkspacePremium } from 'react-icons/md';

type Stat = {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
};

type Course = {
  id: string;
  title: string;
  description: string;
  duration: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  thumbnail: string;
  videoUrl: string;
  instructor: string;
  rating: number;
  category: string;
  students: number;
  icon?: React.ReactNode;
};

type Feature = {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
};

type Testimonial = {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
};

export const Home: React.FC = () => {
  const [isHeroLoaded, setIsHeroLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const statsData: Stat[] = [
    { value: 5, label: 'Premium Courses', suffix: '+' },
    { value: 1250, label: 'Students Enrolled', suffix: '+' },
    { value: 12, label: 'Hours of Content', suffix: 'h+' },
    { value: 3, label: 'Skill Levels' },
  ];

  const allCourses: Course[] = [
    {
      id: '1',
      title: 'Wealth Fundamentals',
      description: 'Master personal budgeting, debt management, and financial goal setting',
      duration: 120,
      difficulty: 'Beginner',
      thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=600',
      videoUrl: '#',
      instructor: 'Alex Johnson, CFA',
      rating: 4.9,
      category: 'Personal Finance',
      students: 342,
      icon: <GiTakeMyMoney />
    },
    {
      id: '2',
      title: 'Stock Market Pro',
      description: 'Advanced technical analysis, options trading, and portfolio management',
      duration: 180,
      difficulty: 'Advanced',
      thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600',
      videoUrl: '#',
      instructor: 'Maria Chen, MBA',
      rating: 4.8,
      category: 'Stock Trading',
      students: 287,
      icon: <FaChartLine />
    },
    {
      id: '3',
      title: 'Crypto Futures Masterclass',
      description: 'Blockchain fundamentals, cryptocurrency trading, and DeFi strategies',
      duration: 150,
      difficulty: 'Intermediate',
      thumbnail: 'https://images.unsplash.com/photo-1620336655055-bd87c5d1d73f?auto=format&fit=crop&w=600',
      videoUrl: '#',
      instructor: 'David Park, Crypto Analyst',
      rating: 4.7,
      category: 'Cryptocurrency',
      students: 415,
      icon: <BsCurrencyExchange />
    },
    {
      id: '4',
      title: 'Real Estate Investment',
      description: 'Property analysis, rental income strategies, and REIT investing',
      duration: 160,
      difficulty: 'Intermediate',
      thumbnail: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600',
      videoUrl: '#',
      instructor: 'Sarah Williams, RE Investor',
      rating: 4.8,
      category: 'Real Estate',
      students: 198,
      icon: <FaHome />
    },
    {
      id: '5',
      title: 'Retirement Planning',
      description: '401(k) optimization, IRA strategies, and wealth preservation',
      duration: 140,
      difficulty: 'Beginner',
      thumbnail: 'https://images.unsplash.com/photo-1579621970795-87facc2f976d?auto=format&fit=crop&w=600',
      videoUrl: '#',
      instructor: 'Michael Roberts, CFP',
      rating: 4.9,
      category: 'Retirement',
      students: 256,
      icon: <FaPiggyBank />
    },
  ];

  const features: Feature[] = [
    {
      id: 1,
      icon: <FaRocket />,
      title: 'AI-Powered Learning',
      description: 'Personalized course recommendations and progress tracking powered by advanced AI algorithms',
      color: '#6366f1',
    },
    {
      id: 2,
      icon: <FaBullseye />,
      title: 'Real-World Projects',
      description: 'Hands-on projects with actual financial data and market simulations',
      color: '#06b6d4',
    },
    {
      id: 3,
      icon: <FaChalkboardTeacher />,
      title: 'Expert Instructors',
      description: 'Learn from industry professionals with proven track records in finance',
      color: '#8b5cf6',
    },
    {
      id: 4,
      icon: <FaMobileAlt />,
      title: 'Mobile Learning',
      description: 'Access courses anytime, anywhere with our mobile-optimized platform',
      color: '#10b981',
    },
    {
      id: 5,
      icon: <FaSyncAlt />,
      title: 'Continuous Updates',
      description: 'Courses updated regularly with latest market trends and strategies',
      color: '#f59e0b',
    },
    {
      id: 6,
      icon: <FaHandshake />,
      title: 'Community Access',
      description: 'Join our private community of investors and finance enthusiasts',
      color: '#ef4444',
    },
  ];

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'James Wilson',
      role: 'Portfolio Manager',
      company: 'Goldman Sachs',
      content: 'The Stock Market Pro course completely transformed my approach to technical analysis. The AI-powered insights are revolutionary.',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100',
      rating: 5,
    },
    {
      id: 2,
      name: 'Sophia Martinez',
      role: 'Financial Analyst',
      company: 'JP Morgan',
      content: 'As a beginner, Wealth Fundamentals gave me the confidence to manage my own finances. The instructors are exceptional.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=100',
      rating: 5,
    },
    {
      id: 3,
      name: 'Robert Chen',
      role: 'Crypto Trader',
      company: 'Self-Employed',
      content: 'The Crypto Futures course provided insights I never found elsewhere. The DeFi section alone was worth the price.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100',
      rating: 5,
    },
  ];

  // Render star rating component
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} className="star-icon">
        {index < Math.floor(rating) ? (
          <FaStar className="star-filled" />
        ) : (
          <FaRegStar className="star-empty" />
        )}
      </span>
    ));
  };

  useEffect(() => {
    // Trigger hero animations
    const timer = setTimeout(() => {
      setIsHeroLoaded(true);
    }, 100);

    // Add scroll animations
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

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
      <section ref={heroRef} className={`hero ${isHeroLoaded ? 'hero--loaded' : ''}`}>
        <div className="container">
          <div className="hero__content">
            <div className="hero__badge animate-on-scroll">
              <span className="hero__badge-icon">
                <FaGem />
              </span>
              <span className="hero__badge-text">TRUSTED BY 1,250+ INVESTORS</span>
            </div>
            
            <h1 className="hero__title animate-on-scroll">
              Master <span className="hero__title-highlight">Investment</span> & 
              <span className="hero__title-break"> Personal Finance</span>
            </h1>
            
            <p className="hero__description animate-on-scroll">
              Transform your financial future with AI-powered investment education. 
              Learn from top finance experts through interactive courses and real-world projects.
            </p>
            
            <div className="hero__actions animate-on-scroll">
              <Button variant="primary" size="lg" className="hero__cta-primary">
                <span className="hero__action-icon">
                  <FaPlay />
                </span>
                Watch Free Preview
              </Button>
              <Button variant="outline" size="lg" className="hero__cta-secondary">
                <span className="hero__action-icon">
                  <FaBookOpen />
                </span>
                Explore All Courses
              </Button>
            </div>

            <div className="hero__stats-mobile animate-on-scroll">
              {statsData.map((stat, index) => (
                <div key={stat.label} className="hero__stat-mobile">
                  <StatsCounter
                    endValue={stat.value}
                    duration={2000}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                  />
                  <span className="hero__stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="hero__background">
          <div className="hero__orb hero__orb--1"></div>
          <div className="hero__orb hero__orb--2"></div>
          <div className="hero__orb hero__orb--3"></div>
          <div className="hero__grid-overlay"></div>
        </div>

        <div className="hero__floating-elements">
          <div className="hero__floating-element element-1">
            <BsGraphUp />
          </div>
          <div className="hero__floating-element element-2">
            <GiChart />
          </div>
          <div className="hero__floating-element element-3">
            <GiMoneyStack />
          </div>
          <div className="hero__floating-element element-4">
            <GiCrystalBars />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container">
          <div className="stats__grid">
            {statsData.map((stat, index) => (
              <div
                key={stat.label}
                className="stats__item animate-on-scroll"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="stats__icon-container">
                  <div className="stats__icon-bg"></div>
                  <div className="stats__icon">
                    {index === 0 && <MdOutlineWorkspacePremium />}
                    {index === 1 && <FaUser />}
                    {index === 2 && <FaClock />}
                    {index === 3 && <BsGraphUp />}
                  </div>
                </div>
                <StatsCounter
                  endValue={stat.value}
                  duration={2000}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
                <span className="stats__label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="courses" id="courses">
        <div className="container">
          <div className="courses__header animate-on-scroll">
            <div className="courses__badge">Featured Curriculum</div>
            <h2 className="courses__title">Master Your Financial Future</h2>
            <p className="courses__subtitle">
              Comprehensive courses designed by industry experts with AI-powered learning paths
            </p>
          </div>

          <div className="courses__grid">
            {allCourses.map((course, index) => (
              <div
                key={course.id}
                className="course-card animate-on-scroll"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="course-card__header">
                  <div className="course-card__category">
                    <span className="course-card__category-icon">
                      {course.icon}
                    </span>
                    {course.category}
                  </div>
                  <div className="course-card__difficulty">
                    <span className={`difficulty-dot difficulty-${course.difficulty.toLowerCase()}`}></span>
                    {course.difficulty}
                  </div>
                </div>
                
                <div className="course-card__image-wrapper">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="course-card__image"
                    loading="lazy"
                  />
                  <div className="course-card__overlay">
                    <button className="course-card__play-btn" aria-label="Play preview">
                      <FaPlay />
                    </button>
                  </div>
                  <div className="course-card__duration">
                    <FaClock /> {course.duration} min
                  </div>
                </div>
                
                <div className="course-card__content">
                  <div className="course-card__meta">
                    <div className="course-card__instructor">
                      <span className="course-card__instructor-avatar">
                        <FaUser />
                      </span>
                      {course.instructor}
                    </div>
                    <div className="course-card__rating">
                      <span className="course-card__stars">
                        {renderStars(course.rating)}
                      </span>
                      <span className="course-card__rating-value">{course.rating}</span>
                      <span className="course-card__students">({course.students})</span>
                    </div>
                  </div>
                  
                  <h3 className="course-card__title">{course.title}</h3>
                  <p className="course-card__description">{course.description}</p>
                  
                  <div className="course-card__footer">
                    <Button variant="primary" size="sm" fullWidth>
                      Enroll Now
                      <FaChevronRight className="btn-icon-right" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="courses__cta animate-on-scroll">
            <Button variant="outline" size="lg">
              View All 5 Courses
              <FaChevronRight className="btn-icon-right" />
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <div className="container">
          <div className="features__header animate-on-scroll">
            <div className="features__badge">Why Choose Us</div>
            <h2 className="features__title">Transform Your Learning Experience</h2>
            <p className="features__subtitle">
              Our platform combines cutting-edge technology with proven financial education methodologies
            </p>
          </div>

          <div className="features__grid">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.id}
                feature={feature}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <div className="testimonials__header animate-on-scroll">
            <div className="testimonials__badge">Success Stories</div>
            <h2 className="testimonials__title">What Our Students Say</h2>
            <p className="testimonials__subtitle">
              Join thousands of successful investors who transformed their financial journey
            </p>
          </div>

          <div className="testimonials__grid">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="final-cta">
        <div className="container">
          <div className="final-cta__content animate-on-scroll">
            <div className="final-cta__badge">
              <BsShieldCheck /> Limited Time Offer
            </div>
            <h2 className="final-cta__title">
              Start Your Investment Journey Today
            </h2>
            <p className="final-cta__description">
              Join our community of successful investors and get access to all 5 courses 
              with a special launch discount. Your financial transformation begins now.
            </p>
            
            <div className="final-cta__pricing">
              <span className="final-cta__old-price">$299</span>
              <span className="final-cta__new-price">$199</span>
              <span className="final-cta__discount">
                <AiOutlinePercentage /> 33% OFF
              </span>
            </div>
            
            <div className="final-cta__actions">
              <Button variant="primary" size="lg">
                <span className="final-cta__icon">
                  <FaBullseye />
                </span>
                Get Started Now
                <FaChevronRight className="btn-icon-right" />
              </Button>
              <Button variant="outline" size="lg">
                <span className="final-cta__icon">
                  <FaGift />
                </span>
                View Free Preview
              </Button>
            </div>
            
            <div className="final-cta__guarantee">
              <span className="final-cta__guarantee-icon">
                <FaCheck />
              </span>
              30-Day Money-Back Guarantee • Lifetime Access
            </div>
          </div>
        </div>
        
        <div className="final-cta__background">
          <div className="final-cta__particles">
            {[...Array(15)].map((_, i) => (
              <div key={i} className={`final-cta__particle particle-${i + 1}`}></div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
