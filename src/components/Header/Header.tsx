// src/components/Header/Header.tsx
import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';

// React Icons
import {
  FaHome,
  FaBookOpen,
  FaStar,
  FaCreditCard,
  FaInfoCircle,
  FaEnvelope,
  FaRocket,
  FaBrain,
} from 'react-icons/fa';
import { HiOutlineLightningBolt, HiOutlineChip } from 'react-icons/hi';
import { MdOutlineScience } from 'react-icons/md';

interface NavItem {
  label: string;
  to: string;
  icon: React.ReactNode;
  gradient?: string;
}

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeItem, setActiveItem] = useState<string>('Home');

  // useRef object (correct type) — pass directly to `ref={headerRef}`
  const headerRef = useRef<HTMLElement | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      setIsLoading(true);
      const t = setTimeout(() => setIsLoading(false), 260);
      return () => {
        clearTimeout(t);
        document.body.style.overflow = '';
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) setIsMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isMobileMenuOpen]);

  const navItems: NavItem[] = [
    { label: 'Home', to: '/', icon: <FaHome />, gradient: 'linear-gradient(135deg, #64ffda 0%, #00b4d8 100%)' },
    { label: 'Courses', to: '/courses', icon: <FaBookOpen />, gradient: 'linear-gradient(135deg, #9d4edd 0%, #560bad 100%)' },
   // { label: 'Features', to: '/features', icon: <FaStar />, gradient: 'linear-gradient(135deg, #ffd166 0%, #ef476f 100%)' },
    //{ label: 'Pricing', to: '/pricing', icon: <FaCreditCard />, gradient: 'linear-gradient(135deg, #06d6a0 0%, #118ab2 100%)' },
    { label: 'About Us', to: '/about', icon: <FaBrain />, gradient: 'linear-gradient(135deg, #8338ec 0%, #3a86ff 100%)' },
    { label: 'Contact', to: '/contact', icon: <FaEnvelope />, gradient: 'linear-gradient(135deg, #ff9e00 0%, #ff0054 100%)' },
    { label: 'Testimonials', to: '/testimonials', icon: <FaInfoCircle /> },
  ];

  // maintain active item based on pathname (works for nested routes)
  useEffect(() => {
    const path = location.pathname;
    const matching = navItems.find((n) => {
      if (n.to === '/') return path === '/';
      return path === n.to || path.startsWith(n.to + '/');
    });
    setActiveItem(matching?.label ?? '');
  }, [location.pathname]);

  // scroll to element id for hash anchors
  const scrollToHash = (hash: string) => {
    const id = hash.startsWith('#') ? hash.slice(1) : hash;
    if (!id) return;
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    // retry a few times in case the element renders after navigation
    let attempts = 0;
    const interval = setInterval(() => {
      attempts += 1;
      const found = document.getElementById(id);
      if (found || attempts >= 10) {
        if (found) found.scrollIntoView({ behavior: 'smooth', block: 'start' });
        clearInterval(interval);
      }
    }, 80);
  };

  // unified navigation helper: navigate and then ensure top-of-page
  const navigateAndScrollTop = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // primary click handler used by mobile buttons and hash-aware desktop links
  const handleNavigate = (to: string, label?: string) => {
    setActiveItem(label ?? '');
    setIsMobileMenuOpen(false);

    // hash-only anchor on same page
    if (to.startsWith('#')) {
      scrollToHash(to);
      return;
    }

    const [pathnamePart, hashPart] = to.split('#');

    // If same page or omitted path with hash -> scroll to hash
    if (hashPart && (location.pathname === pathnamePart || pathnamePart === '')) {
      scrollToHash('#' + hashPart);
      if (pathnamePart && pathnamePart !== location.pathname) {
        // if path differs, navigate then ensure top
        navigateAndScrollTop(pathnamePart);
      }
      return;
    }

    // Normal route navigation (path only) — navigate and scroll to top
    if (pathnamePart) {
      navigateAndScrollTop(pathnamePart);
    } else {
      navigateAndScrollTop(to);
    }

    // If hash exists in the target, attempt to scroll after a short delay to let content mount
    if (hashPart) {
      setTimeout(() => scrollToHash('#' + hashPart), 220);
    }
  };

  const handleLogoClick = () => {
    navigateAndScrollTop('/');
    setActiveItem('Home');
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`header ${isScrolled ? 'header--scrolled' : ''} ${isMobileMenuOpen ? 'header--mobile-open' : ''}`}
      >
        <div className="header__container">
          <div
            className="header__logo"
            onClick={handleLogoClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleLogoClick()}
            aria-label="Go to homepage"
          >
            <span className="header__logo-text">FINANCE</span>
            <span className="header__logo-dot"> </span>
          </div>

          <nav className="header__desktop-nav" aria-label="Main navigation">
            <ul className="header__desktop-nav-list">
              {navItems.map((item) => (
                <li key={item.label} className="header__desktop-nav-item">
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      `header__desktop-nav-link ${isActive || activeItem === item.label ? 'header__desktop-nav-link--active' : ''}`
                    }
                    onClick={(e) => {
                      // prevent default so we control scroll behavior and always land at top for routes
                      e.preventDefault();
                      if (item.to.includes('#')) {
                        handleNavigate(item.to, item.label);
                      } else {
                        navigateAndScrollTop(item.to);
                        setActiveItem(item.label);
                        setIsMobileMenuOpen(false);
                      }
                    }}
                    aria-current={activeItem === item.label ? 'page' : undefined}
                  >
                    <span className="header__desktop-nav-icon" aria-hidden>
                      {item.icon}
                    </span>
                    <span className="header__desktop-nav-label">{item.label}</span>
                    <div className="header__desktop-nav-hover-line" />
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <button
            className={`header__menu-toggle ${isMobileMenuOpen ? 'header__menu-toggle--open' : ''}`}
            onClick={() => setIsMobileMenuOpen((s) => !s)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            <span className="header__menu-icon" />
          </button>

          <nav
            className={`header__mobile-nav ${isMobileMenuOpen ? 'header__mobile-nav--open' : ''} ${isLoading ? 'header__mobile-nav--loading' : ''}`}
            id="mobile-navigation"
            aria-label="Mobile navigation"
            aria-hidden={!isMobileMenuOpen}
          >
            <div className="header__mobile-nav-wrapper">
              <ul className="header__mobile-nav-list">
                {navItems.map((item) => (
                  <li key={item.label} className="header__mobile-nav-item">
                    <button
                      className={`header__mobile-nav-link ${activeItem === item.label ? 'header__mobile-nav-link--active' : ''}`}
                      onClick={() => handleNavigate(item.to, item.label)}
                      aria-current={activeItem === item.label ? 'page' : undefined}
                    >
                      <span className="header__mobile-nav-icon" aria-hidden>
                        {item.icon}
                      </span>
                      <span className="header__mobile-nav-label">{item.label}</span>
                    </button>
                  </li>
                ))}
              </ul>

              <div
                style={{
                  marginTop: 'auto',
                  paddingTop: '2rem',
                  borderTop: '1px solid rgba(100, 255, 218, 0.08)',
                  textAlign: 'center',
                }}
              >
                <small style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', opacity: 0.85 }}>
                  Powered by Advanced AI • Real-time Analytics
                </small>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '1rem',
                    marginTop: '1rem',
                    fontSize: '1.2rem',
                    color: 'var(--accent-color)',
                  }}
                >
                  <FaRocket />
                  <HiOutlineLightningBolt />
                  <HiOutlineChip />
                  <MdOutlineScience />
                </div>
              </div>
            </div>
          </nav>
        </div>
      </header>

      <div
        className={`header__mobile-overlay ${isMobileMenuOpen ? 'header__mobile-overlay--open' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
        onKeyDown={(e) => e.key === 'Enter' && setIsMobileMenuOpen(false)}
        role="button"
        tabIndex={0}
        aria-label="Close menu"
        aria-hidden={!isMobileMenuOpen}
      />
    </>
  );
};

export default Header;
