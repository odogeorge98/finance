// src/pages/Courses/Courses.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Courses.css';

// React Icons
import {
  FaPlay,
  FaClock,
  FaUser,
  FaStar,
  FaRegStar,
  FaBookOpen,
  FaChartLine,
  FaChevronRight,
  FaFire,
  FaGraduationCap,
  FaCertificate,
  FaUsers,
  FaSearch,
  FaLayerGroup,
  FaRocket,
  FaBolt,
  FaDollarSign,
  FaBitcoin,
  FaEthereum
} from 'react-icons/fa';
import {
  BsGraphUp,
  BsCurrencyExchange,
  BsPlayCircle,
  BsFillLightningFill
} from 'react-icons/bs';
import { GiTakeMyMoney, GiMoneyStack, GiCircuitry, GiCash, GiGoldBar } from 'react-icons/gi';
import { IoDiamond } from 'react-icons/io5';
import { SiBitcoincash } from 'react-icons/si';

export const Courses: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const gridRef = useRef<HTMLDivElement | null>(null);
  const courseCardsRef = useRef<Array<HTMLDivElement | null>>([]);

  const courses = [
    {
      id: '1',
      title: 'Quantum Wealth Fundamentals',
      description: 'Master personal budgeting, debt management, and financial goal setting with AI-powered tools',
      duration: 120,
      difficulty: 'Beginner' as const,
      thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      instructor: 'Moses Mfon Udofia',
      rating: 4.9,
      category: 'Personal Finance',
      students: 342,
      price: 299,
      discountPrice: 199,
      modules: 12,
      isFeatured: true,
      icon: <GiTakeMyMoney />,
      videoId: 'wealth-fundamentals',
      tags: ['AI', 'Automation', 'Blockchain']
    },
    {
      id: '2',
      title: 'Neural Stock Market Pro',
      description: 'Technical analysis, options trading, and portfolio management with neural networks',
      duration: 180,
      difficulty: 'Advanced' as const,
      thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      instructor: 'Moses Mfon Udofia',
      rating: 4.8,
      category: 'Stock Trading',
      students: 287,
      price: 499,
      discountPrice: 349,
      modules: 16,
      isFeatured: true,
      icon: <FaChartLine />,
      videoId: 'stock-market-pro',
      tags: ['Neural Networks', 'AI', 'Real-time']
    },
    {
      id: '3',
      title: 'Crypto & DeFi Nexus',
      description: 'Blockchain fundamentals, cryptocurrency trading, and DeFi strategies for Web3',
      duration: 150,
      difficulty: 'Intermediate' as const,
      thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      instructor: 'Moses Mfon Udofia',
      rating: 4.7,
      category: 'Cryptocurrency',
      students: 415,
      price: 399,
      discountPrice: 299,
      modules: 14,
      isFeatured: false,
      icon: <BsCurrencyExchange />,
      videoId: 'crypto-defi',
      tags: ['Blockchain', 'Web3', 'Smart Contracts']
    },
    {
      id: '4',
      title: 'Smart Real Estate AI',
      description: 'Property analysis, rental income strategies, and REIT investing with AI predictions',
      duration: 160,
      difficulty: 'Intermediate' as const,
      thumbnail: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      instructor: 'Moses Mfon Udofia',
      rating: 4.8,
      category: 'Real Estate',
      students: 198,
      price: 349,
      discountPrice: 249,
      modules: 10,
      isFeatured: true,
      icon: <GiMoneyStack />,
      videoId: 'real-estate-ai',
      tags: ['AI', 'Predictive', 'Automation']
    },
    {
      id: '5',
      title: 'Quantum Day Trading',
      description: 'Intensive day trading course covering scalping and risk management with quantum principles',
      duration: 200,
      difficulty: 'Advanced' as const,
      thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      instructor: 'Moses Mfon Udofia',
      rating: 4.6,
      category: 'Stock Trading',
      students: 189,
      price: 599,
      discountPrice: 449,
      modules: 18,
      isFeatured: false,
      icon: <BsGraphUp />,
      videoId: 'quantum-trading',
      tags: ['Quantum', 'High-Frequency', 'AI']
    },
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const filteredCourses = courses.filter(course => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = activeFilter === 'all' || course.category === activeFilter;

    return matchesSearch && matchesFilter;
  });

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

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return '#00ff88';
      case 'intermediate':
        return '#00d4ff';
      case 'advanced':
        return '#ff0080';
      default:
        return '#6b7280';
    }
  };

  const categories = ['all', ...Array.from(new Set(courses.map(course => course.category)))];

  return (
    <div className="courses-page">
      {/* Animated Background Elements */}
      <div className="grid-background"></div>
      <div className="floating-orb orb-1"></div>
      <div className="floating-orb orb-2"></div>
      <div className="floating-orb orb-3"></div>

      {/* Enhanced Hero Section */}
      <section className="courses-hero">
        {/* Advanced Hero Background */}
        <div className="hero-background">
          {/* Neural Network Grid */}
          <div className="neural-grid"></div>
          
          {/* Animated Crypto Charts */}
          <div className="crypto-charts">
            <div className="chart-line"></div>
            <div className="chart-line"></div>
            <div className="chart-line"></div>
            <div className="chart-line"></div>
          </div>
          
          {/* Money Falling Animation */}
          <div className="money-fall">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="money-item">
                <FaDollarSign />
              </div>
            ))}
          </div>
          
          {/* 3D Money Icons */}
          <div className="money-3d">
            <div className="money-3d-item">
              <FaBitcoin />
            </div>
            <div className="money-3d-item">
              <FaEthereum />
            </div>
            <div className="money-3d-item">
              <GiCash />
            </div>
            <div className="money-3d-item">
              <GiGoldBar />
            </div>
          </div>
        </div>

        <div className="container">
          <div className="hero-content">
            <div className="hero-badge animate-glow">
              <div className="badge-icon">
                <IoDiamond />
              </div>
              <span>Neural Finance Academy</span>
              <div className="badge-sparkle"></div>
            </div>

            <h1 className="hero-title">
              <span className="title-gradient">Master Your</span>
              <span className="title-gradient">Financial Future</span>
            </h1>

            <p className="hero-description">
              AI-powered courses designed to transform your investment knowledge
              and build wealth through quantum financial strategies.
            </p>

            {/* Futuristic Search */}
            <div className="hero-search-container">
              <div className="search-wrapper">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search quantum courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                <div className="search-border"></div>
              </div>
            </div>

            {/* Category Filters */}
            <div className="category-filters">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`category-filter ${activeFilter === category ? 'active' : ''}`}
                  onClick={() => setActiveFilter(category)}
                >
                  <span className="filter-text">{category.charAt(0).toUpperCase() + category.slice(1)}</span>
                  <div className="filter-glow"></div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="courses-grid">
        <div className="container">
          <div className="grid-header">
            <div className="header-left">
              <h2 className="grid-title">
                <span className="title-text">Quantum Courses</span>
                <div className="title-line"></div>
              </h2>
              <p className="grid-subtitle">Powered by AI & Blockchain Technology</p>
            </div>
            <div className="header-stats">
              <div className="stat">
                
                <div className="stat-content">
                  <span className="stat-value">{filteredCourses.length}</span>
                  <span className="stat-label">Courses</span>
                </div>
                <div className="stat-icon"><FaBolt /></div>
              </div>
              <div className="stat">
                
                <div className="stat-content">
                  <span className="stat-value">{courses.reduce((acc, course) => acc + course.students, 0).toLocaleString()}</span>
                  <span className="stat-label">Students</span>
                </div>
                <div className="stat-icon"><FaUsers /></div>
              </div>
            </div>
          </div>

          {/* Courses Grid */}
          <div
            className="course-grid"
            ref={gridRef}
          >
            {filteredCourses.map((course, index) => (
              <div
                key={course.id}
                ref={(el) => { courseCardsRef.current[index] = el; }}
                className={`course-card ${hoveredCard === course.id ? 'hovered' : ''}`}
                onMouseEnter={() => setHoveredCard(course.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={
                  {
                    '--mouse-x': `${mousePosition.x}px`,
                    '--mouse-y': `${mousePosition.y}px`
                  } as React.CSSProperties
                }
              >
                {/* Card Glow Effect */}
                <div className="card-glow"></div>

                {/* Card Header with Video Preview */}
                <div className="card-header">
                  <div className="card-badges">
                    {course.isFeatured && (
                      <div className="badge featured">
                        <FaFire />
                        <span>Featured</span>
                      </div>
                    )}
                    <div className="badge category">
                      {course.icon}
                      <span>{course.category}</span>
                    </div>
                  </div>

                  {/* Video Container */}
                  <div className="video-container">
                    <div className="video-wrapper">
                      <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="video-thumbnail"
                      />
                      <div className="video-overlay">
                        <div className="play-button">
                          <BsPlayCircle />
                          <div className="play-ring"></div>
                          <div className="play-ring play-ring-delay"></div>
                        </div>
                        <div className="video-info">
                          <span>AI-Powered</span>
                          <span>Interactive</span>
                        </div>
                      </div>
                      <div className="video-time">
                        <FaClock />
                        <span>{Math.floor(course.duration / 60)}h {course.duration % 60}m</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="card-content">
                  <div className="course-meta">
                    <div className="difficulty">
                      <div
                        className="difficulty-dot"
                        style={{ backgroundColor: getDifficultyColor(course.difficulty) }}
                      ></div>
                      <span>{course.difficulty}</span>
                    </div>
                    <div className="meta-item">
                      <FaLayerGroup />
                      <span>{course.modules} Modules</span>
                    </div>
                  </div>

                  <h3 className="course-title">{course.title}</h3>
                  <p className="course-description">{course.description}</p>

                  {/* Tags */}
                  <div className="course-tags">
                    {course.tags?.map((tag, i) => (
                      <span key={i} className="tag">{tag}</span>
                    ))}
                  </div>

                  {/* Instructor */}
                  <div className="instructor-info">
                    <div className="instructor-avatar">
                      <FaUser />
                      <div className="avatar-glow"></div>
                    </div>
                    <div className="instructor-details">
                      <div className="instructor-name">{course.instructor}</div>
                      <div className="instructor-rating">
                        {renderStars(course.rating)}
                        <span>{course.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="course-stats">
                    <div className="stat-item">
                      <div className="stat-icon-small">
                        <FaGraduationCap />
                      </div>
                      <div className="stat-text">
                        <div className="stat-number">{course.students.toLocaleString()}</div>
                        <div className="stat-label">Enrolled</div>
                      </div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-icon-small">
                        <FaBookOpen />
                      </div>
                      <div className="stat-text">
                        <div className="stat-number">{course.modules}</div>
                        <div className="stat-label">Modules</div>
                      </div>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="card-footer">
                    <div className="pricing">
                      {course.discountPrice ? (
                        <>
                          <div className="original-price">
                            {formatPrice(course.price)}
                          </div>
                          <div className="current-price">
                            {formatPrice(course.discountPrice)}
                            <div className="discount-badge">Save {Math.round((1 - course.discountPrice! / course.price) * 100)}%</div>
                          </div>
                        </>
                      ) : (
                        <div className="current-price">
                          {formatPrice(course.price)}
                        </div>
                      )}
                    </div>
                    <button className="enroll-button">
                      <span>Enroll Now</span>
                      <div className="button-icon">
                        <FaRocket />
                      </div>
                      <div className="button-glow"></div>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="cta-section">
            <div className="cta-card">
              <div className="cta-content">
                <h3 className="cta-title">Ready to Master Quantum Finance?</h3>
                <p className="cta-description">
                  Join thousands of elite traders and investors who are already
                  mastering the future of finance with our AI-powered curriculum.
                </p>
                <button className="cta-button">
                  <span>Start Free Trial</span>
                  <FaChevronRight />
                  <div className="cta-glow"></div>
                </button>
              </div>
              <div className="cta-visual">
                <div className="visual-element">
                  <GiCircuitry />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mouse Follower Glow */}
      <div
        className="mouse-follower"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`
        }}
      ></div>
    </div>
  );
};

export default Courses;