import { useState, useEffect, useRef } from 'react'
import './App.css'
import { useTheme } from './Theme/ThemeContext.jsx'
import { services } from './Data/services.jsx'
import { galleryItems } from './Data/gallery.jsx'

// Import page components
import Home from './Pages/Home.jsx'
import About from './Pages/About.jsx'
import Services from './Pages/Services.jsx'
import ServiceDetail from './Pages/ServiceDetail.jsx'
import Portfolio from './Pages/Portfolio.jsx'
import Venues from './Pages/Venues.jsx'
import Gallery from './Pages/Gallery.jsx'
import Blog from './Pages/Blog.jsx'
import ContactPage from './Pages/Contact.jsx'
import GetQuote from './Pages/GetQuote.jsx'
import BookConsultation from './Pages/BookConsultation.jsx'
import Testimonials from './Pages/Testimonials.jsx'
import FAQ from './Pages/FAQ.jsx'
import WhatsAppWidget from './Components/WhatsAppWidget.jsx'

function App() {
  const { theme, toggleTheme } = useTheme()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeMobileDropdown, setActiveMobileDropdown] = useState(null) // 'services' | 'portfolio' | null
  const [currentPage, setCurrentPage] = useState('home') // 'home' | 'about' | 'services' | 'service-detail' | 'portfolio' | 'venues' | 'gallery' | 'blog' | 'contact' | 'testimonials' | 'faq'
  const [selectedServiceId, setSelectedServiceId] = useState('wedding-planning')
  const [galleryCategory, setGalleryCategory] = useState('ALL')
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [blogCategory, setBlogCategory] = useState('ALL')
  const [activePost, setActivePost] = useState(null)
  const shouldScrollToTop = useRef(true)

  useEffect(() => {
    if (shouldScrollToTop.current) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    shouldScrollToTop.current = true
  }, [currentPage, selectedServiceId])

  useEffect(() => {
    if (activePost === null) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActivePost(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePost]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev === 0 ? galleryItems.length - 1 : prev - 1));
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev === galleryItems.length - 1 ? 0 : prev + 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  const [visibleProjects, setVisibleProjects] = useState(6)
  const [activeCategory, setActiveCategory] = useState('ALL')
  const [highlightedServiceId, setHighlightedServiceId] = useState(null)
  const [activeFaq, setActiveFaq] = useState(null)
  const [portfolioCategory, setPortfolioCategory] = useState('ALL')
  const [portfolioSearch, setPortfolioSearch] = useState('')
  const [venueCapacityFilter, setVenueCapacityFilter] = useState('Any')
  const [venueTypeFilter, setVenueTypeFilter] = useState('All')
  const [venueViewMode, setVenueViewMode] = useState('grid')

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
    if (isMobileMenuOpen) {
      setActiveMobileDropdown(null)
    }
  }

  const toggleMobileDropdown = (menuName) => {
    if (activeMobileDropdown === menuName) {
      setActiveMobileDropdown(null)
    } else {
      setActiveMobileDropdown(menuName)
    }
  }

  const navigateTo = (page, anchor = null) => {
    if (anchor) {
      shouldScrollToTop.current = false
    } else {
      shouldScrollToTop.current = true
    }

    setCurrentPage(page)
    setIsMobileMenuOpen(false)
    setActiveMobileDropdown(null)
    
    if (page === 'services') {
      setActiveCategory('ALL')
      if (anchor) {
        setHighlightedServiceId(anchor)
        setTimeout(() => {
          setHighlightedServiceId(null)
        }, 2200)
      }
    }

    if (page === 'service-detail') {
      if (anchor) {
        setSelectedServiceId(anchor)
      } else {
        setSelectedServiceId('wedding-planning')
      }
    }
    
    if (anchor && page !== 'service-detail') {
      setTimeout(() => {
        const element = document.getElementById(anchor)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 100)
    }
  }

  const showHeaderFooter = currentPage !== 'get-quote' && currentPage !== 'book-consultation';

  return (
    <>
      {/* 1. Top Contact & Info Bar */}
      {showHeaderFooter && (
        <div className="top-bar">
          <div className="top-bar-left">
            <a href="tel:+916392956850" className="top-bar-item">
              <svg viewBox="0 0 24 24">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              +91 63929 56850
            </a>
            <a href="mailto:info@ramjievents.com" className="top-bar-item">
              <svg viewBox="0 0 24 24">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              info@ramjievents.com
            </a>
          </div>

          <a href="https://www.google.com/maps/search/?api=1&query=Ramji+events+%26+Caterers+Galaxy+Blue+Sapphire+Plaza" target="_blank" rel="noopener noreferrer" className="top-bar-item top-bar-center">
            <svg viewBox="0 0 24 24">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>Galaxy Blue Sapphire Plaza, Greater Noida W Rd, Haibatpur, Sector 4, Greater Noida, Ghaziabad, Uttar Pradesh 201301</span>
          </a>

          <div className="top-bar-right">
            <div className="social-icons">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
                <svg viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="none" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
                <svg viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" fill="currentColor" />
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="YouTube">
                <svg viewBox="0 0 24 24">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" fill="currentColor"/>
                  <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#0d0b0a"/>
                </svg>
              </a>
            </div>
            <span className="hours">24 X 7</span>
          </div>
        </div>
      )}

      {/* 2. Main Navigation Header */}
      {showHeaderFooter && (
        <header className="main-header">
          <div className="logo-container" onClick={() => navigateTo('home')} style={{ cursor: 'pointer' }}>
            <span className="logo-main">Ramji</span>
            <span className="logo-sub">Events &amp; Caterers</span>
          </div>

          {/* Desktop Navigation Links */}
          <ul className="nav-menu">
            <li className="nav-item">
              <button onClick={() => navigateTo('about')} className={`nav-link-btn ${currentPage === 'about' ? 'active' : ''}`}>About</button>
            </li>
            <li className="nav-item">
              <span className={`nav-link ${currentPage === 'services' ? 'active' : ''}`} onClick={() => navigateTo('services')} style={{ cursor: 'pointer' }}>
                Services
                <svg viewBox="0 0 24 24">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </span>
              <ul className="dropdown-menu">
                {services
                  .filter(service => service.inDropdown)
                  .map(service => (
                    <li key={service.id} className="dropdown-item">
                      <a
                        href={service.link}
                        onClick={(e) => {
                          e.preventDefault()
                          navigateTo('service-detail', service.id)
                        }}
                      >
                        {service.dropdownTitle || service.title}
                      </a>
                    </li>
                  ))}
              </ul>
            </li>
            <li className="nav-item">
              <span className="nav-link" onClick={() => { navigateTo('portfolio'); setPortfolioCategory('ALL'); }} style={{ cursor: 'pointer' }}>
                Portfolio
                <svg viewBox="0 0 24 24">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </span>
              <ul className="dropdown-menu">
                <li className="dropdown-item"><a href="#all" onClick={(e) => { e.preventDefault(); navigateTo('portfolio'); setPortfolioCategory('ALL'); }}>All Projects</a></li>
                <li className="dropdown-item"><a href="#weddings" onClick={(e) => { e.preventDefault(); navigateTo('portfolio'); setPortfolioCategory('WEDDING PLANNING'); }}>Weddings</a></li>
                <li className="dropdown-item"><a href="#corporate" onClick={(e) => { e.preventDefault(); navigateTo('portfolio'); setPortfolioCategory('CORPORATE CONFERENCE'); }}>Corporate Events</a></li>
                <li className="dropdown-item"><a href="#social" onClick={(e) => { e.preventDefault(); navigateTo('portfolio'); setPortfolioCategory('BIRTHDAY CELEBRATION'); }}>Social Events</a></li>
                <li className="dropdown-item"><a href="#luxury" onClick={(e) => { e.preventDefault(); navigateTo('portfolio'); setPortfolioCategory('LUXURY EVENT'); }}>Luxury Events</a></li>
              </ul>
            </li>
            <li className="nav-item">
              <a href="#venues" className={`nav-link ${currentPage === 'venues' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); navigateTo('venues'); }}>Venues</a>
            </li>
            <li className="nav-item">
              <a href="#gallery" className={`nav-link ${currentPage === 'gallery' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); navigateTo('gallery'); }}>Gallery</a>
            </li>
            <li className="nav-item">
              <a href="#blog" className={`nav-link ${currentPage === 'blog' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); navigateTo('blog'); }}>Blog</a>
            </li>
            <li className="nav-item">
              <a href="#testimonials" className={`nav-link ${currentPage === 'testimonials' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); navigateTo('testimonials'); }}>Testimonials</a>
            </li>
            <li className="nav-item">
              <a href="#contact" className={`nav-link ${currentPage === 'contact' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); navigateTo('contact'); }}>Contact</a>
            </li>
          </ul>

          {/* Action Buttons */}
          <div className="header-actions">
            <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle Theme">
              {theme === 'dark' ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>
            <button className="btn-outline" onClick={() => navigateTo('get-quote')}>Get Quote</button>
            <button className="btn-filled" onClick={() => navigateTo('book-consultation')}>Book Consultation</button>
          </div>

          {/* Hamburger Toggle */}
          <button 
            className={`menu-toggle ${isMobileMenuOpen ? 'active' : ''}`} 
            onClick={toggleMobileMenu}
            aria-label="Toggle Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </header>
      )}

      {/* 3. Mobile Navigation Drawer */}
      {showHeaderFooter && (
        <>
          <div className={`mobile-nav-overlay ${isMobileMenuOpen ? 'active' : ''}`} onClick={toggleMobileMenu}></div>
          <nav className={`mobile-nav ${isMobileMenuOpen ? 'active' : ''}`}>
            <ul className="mobile-nav-list">
              <li>
                <button className="mobile-nav-link-btn" onClick={() => navigateTo('about')}>About</button>
              </li>
              <li>
                <div className={`mobile-nav-link ${activeMobileDropdown === 'services' ? 'open' : ''}`} onClick={() => toggleMobileDropdown('services')}>
                  <div className="mobile-nav-link-header">
                    Services
                    <svg viewBox="0 0 24 24">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </div>
                  {activeMobileDropdown === 'services' && (
                    <ul className="mobile-dropdown">
                      {services
                        .filter(service => service.inDropdown)
                        .map(service => (
                          <li key={service.id}>
                            <a
                              href={service.link}
                              onClick={(e) => {
                                e.preventDefault()
                                navigateTo('service-detail', service.id)
                              }}
                            >
                              {service.dropdownTitle || service.title}
                            </a>
                          </li>
                        ))}
                      <li>
                        <a
                          href="#view-all-services"
                          onClick={(e) => {
                            e.preventDefault()
                            navigateTo('services')
                          }}
                          style={{ fontWeight: 'bold', color: 'var(--gold-color)', display: 'block', paddingTop: '10px' }}
                        >
                          View All Services &rarr;
                        </a>
                      </li>
                    </ul>
                  )}
                </div>
              </li>
              <li>
                <div className={`mobile-nav-link ${activeMobileDropdown === 'portfolio' ? 'open' : ''}`} onClick={() => toggleMobileDropdown('portfolio')}>
                  <div className="mobile-nav-link-header">
                    Portfolio
                    <svg viewBox="0 0 24 24">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </div>
                  {activeMobileDropdown === 'portfolio' && (
                    <ul className="mobile-dropdown">
                      <li><a href="#all" onClick={(e) => { e.preventDefault(); navigateTo('portfolio'); setPortfolioCategory('ALL'); }}>All Projects</a></li>
                      <li><a href="#weddings" onClick={(e) => { e.preventDefault(); navigateTo('portfolio'); setPortfolioCategory('WEDDING PLANNING'); }}>Weddings</a></li>
                      <li><a href="#corporate" onClick={(e) => { e.preventDefault(); navigateTo('portfolio'); setPortfolioCategory('CORPORATE CONFERENCE'); }}>Corporate Events</a></li>
                      <li><a href="#social" onClick={(e) => { e.preventDefault(); navigateTo('portfolio'); setPortfolioCategory('BIRTHDAY CELEBRATION'); }}>Social Events</a></li>
                      <li><a href="#luxury" onClick={(e) => { e.preventDefault(); navigateTo('portfolio'); setPortfolioCategory('LUXURY EVENT'); }}>Luxury Events</a></li>
                    </ul>
                  )}
                </div>
              </li>
              <li>
                <a href="#venues" className={`mobile-nav-link ${currentPage === 'venues' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); navigateTo('venues'); }}>Venues</a>
              </li>
              <li>
                <a href="#gallery" className={`mobile-nav-link ${currentPage === 'gallery' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); navigateTo('gallery'); }}>Gallery</a>
              </li>
              <li>
                <a href="#blog" className={`mobile-nav-link ${currentPage === 'blog' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); navigateTo('blog'); }}>Blog</a>
              </li>
              <li>
                <a href="#testimonials" className={`mobile-nav-link ${currentPage === 'testimonials' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); navigateTo('testimonials'); }}>Testimonials</a>
              </li>
              <li>
                <a href="#contact" className={`mobile-nav-link ${currentPage === 'contact' ? 'active' : ''}`} onClick={(e) => { e.preventDefault(); navigateTo('contact'); }}>Contact</a>
              </li>
            </ul>

            <div className="mobile-nav-actions">
              <button className="btn-outline" onClick={() => navigateTo('get-quote')}>Get Quote</button>
              <button className="btn-filled" onClick={() => navigateTo('book-consultation')}>Book Consultation</button>
              <button className="theme-toggle-btn mobile-theme-btn" onClick={toggleTheme} aria-label="Toggle Theme">
                {theme === 'dark' ? (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="5" />
                      <line x1="12" y1="1" x2="12" y2="3" />
                      <line x1="12" y1="21" x2="12" y2="23" />
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                      <line x1="1" y1="12" x2="3" y2="12" />
                      <line x1="21" y1="12" x2="23" y2="12" />
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                    </svg>
                    <span>Light Theme</span>
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                    </svg>
                    <span>Dark Theme</span>
                  </>
                )}
              </button>
            </div>
          </nav>
        </>
      )}

      {/* Pages Navigation */}
      {currentPage === 'home' && (
        <Home navigateTo={navigateTo} />
      )}

      {currentPage === 'about' && (
        <About navigateTo={navigateTo} />
      )}

      {currentPage === 'services' && (
        <Services
          navigateTo={navigateTo}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          highlightedServiceId={highlightedServiceId}
        />
      )}

      {currentPage === 'service-detail' && (
        <ServiceDetail
          navigateTo={navigateTo}
          selectedServiceId={selectedServiceId}
          activeFaq={activeFaq}
          toggleFaq={toggleFaq}
        />
      )}

      {currentPage === 'portfolio' && (
        <Portfolio
          navigateTo={navigateTo}
          portfolioCategory={portfolioCategory}
          setPortfolioCategory={setPortfolioCategory}
          portfolioSearch={portfolioSearch}
          setPortfolioSearch={setPortfolioSearch}
          visibleProjects={visibleProjects}
          setVisibleProjects={setVisibleProjects}
        />
      )}

      {currentPage === 'venues' && (
        <Venues
          navigateTo={navigateTo}
          venueCapacityFilter={venueCapacityFilter}
          setVenueCapacityFilter={setVenueCapacityFilter}
          venueTypeFilter={venueTypeFilter}
          setVenueTypeFilter={setVenueTypeFilter}
          venueViewMode={venueViewMode}
          setVenueViewMode={setVenueViewMode}
        />
      )}

      {currentPage === 'gallery' && (
        <Gallery
          navigateTo={navigateTo}
          galleryCategory={galleryCategory}
          setGalleryCategory={setGalleryCategory}
          lightboxIndex={lightboxIndex}
          setLightboxIndex={setLightboxIndex}
        />
      )}

      {currentPage === 'blog' && (
        <Blog
          navigateTo={navigateTo}
          blogCategory={blogCategory}
          setBlogCategory={setBlogCategory}
          activePost={activePost}
          setActivePost={setActivePost}
        />
      )}

      {currentPage === 'contact' && (
        <ContactPage navigateTo={navigateTo} />
      )}

      {currentPage === 'get-quote' && (
        <GetQuote navigateTo={navigateTo} />
      )}

      {currentPage === 'book-consultation' && (
        <BookConsultation navigateTo={navigateTo} />
      )}

      {currentPage === 'testimonials' && (
        <Testimonials navigateTo={navigateTo} />
      )}

      {currentPage === 'faq' && (
        <FAQ navigateTo={navigateTo} />
      )}

      {/* 10.5. Return to Top Button */}
      {showHeaderFooter && (
        <div className="return-to-top-container">
          <button 
            className="return-to-top-btn" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <span>Return to Top</span>
            <svg viewBox="0 0 24 24" className="return-icon">
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
          </button>
        </div>
      )}

      {/* 11. Footer Section */}
      {showHeaderFooter && (
        <footer className="footer-section">
          <div className="footer-container">
            {/* Column 1: Brand Info */}
            <div className="footer-col brand-col">
              <div className="footer-logo">
                <span className="logo-main">Ramji</span>
                <span className="logo-sub">Events &amp; Caterers</span>
              </div>
              <p className="footer-desc">
                Crafting extraordinary celebrations since 2020. 500+ events. 15 cities. One unwavering standard of excellence.
              </p>
              <div className="footer-socials">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-box" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <circle cx="17.5" cy="6.5" r="1"/>
                  </svg>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-box" aria-label="Facebook">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-box" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-box" aria-label="YouTube">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
                    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Column 2: Services Links */}
            <div className="footer-col">
              <h4 className="footer-title">Services</h4>
              <ul className="footer-links">
                {services
                  .map(service => (
                    <li key={service.id}>
                      <a
                        href={service.link}
                        onClick={(e) => {
                          e.preventDefault()
                          navigateTo('service-detail', service.id)
                        }}
                      >
                        {service.footerTitle || service.title}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>

            {/* Column 3: Navigation Links */}
            <div className="footer-col">
              <h4 className="footer-title">Navigate</h4>
              <ul className="footer-links">
                <li><a href="#about" onClick={(e) => { e.preventDefault(); navigateTo('about'); }}>About Us</a></li>
                <li><a href="#portfolio" onClick={(e) => { e.preventDefault(); navigateTo('portfolio'); }}>Portfolio</a></li>
                <li><a href="#venues" onClick={(e) => { e.preventDefault(); navigateTo('venues'); }}>Venues</a></li>
                <li><a href="#gallery" onClick={(e) => { e.preventDefault(); navigateTo('gallery'); }}>Gallery</a></li>
                <li><a href="#testimonials" onClick={(e) => { e.preventDefault(); navigateTo('testimonials'); }}>Testimonials</a></li>
                <li><a href="#blog" onClick={(e) => { e.preventDefault(); navigateTo('blog'); }}>Blog</a></li>
                <li><a href="#faq" onClick={(e) => { e.preventDefault(); navigateTo('faq'); }}>FAQ</a></li>
                <li><a href="#contact" onClick={(e) => { e.preventDefault(); navigateTo('contact'); }}>Contact</a></li>
              </ul>
            </div>

            {/* Column 4: Contact Details */}
            <div className="footer-col contact-col">
              <h4 className="footer-title">Contact</h4>
              <div className="footer-contact-info">
                {/* Phone */}
                <div className="contact-item">
                  <svg viewBox="0 0 24 24" className="contact-icon" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                  <div className="contact-texts">
                    <a href="tel:+916392956850">+91 63929 56850</a>
                  </div>
                </div>

                {/* Email */}
                <div className="contact-item">
                  <svg viewBox="0 0 24 24" className="contact-icon" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                  <div className="contact-texts">
                    <a href="mailto:info@ramjievents.com">info@ramjievents.com</a>
                    <a href="mailto:bookings@ramjievents.com">bookings@ramjievents.com</a>
                  </div>
                </div>

                {/* Address */}
                <div className="contact-item">
                  <svg viewBox="0 0 24 24" className="contact-icon" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <div className="contact-texts">
                    <a href="https://www.google.com/maps/search/?api=1&query=Ramji+events+%26+Caterers+Galaxy+Blue+Sapphire+Plaza" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', transition: 'color var(--transition-fast)' }} className="footer-address-link">
                      <span>Galaxy Blue Sapphire Plaza, Greater Noida W Rd, Haibatpur, Sector 4, Greater Noida, Ghaziabad, Uttar Pradesh 201301</span>
                    </a>
                  </div>
                </div>

                {/* Hours */}
                <div className="contact-item">
                  <svg viewBox="0 0 24 24" className="contact-icon" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  <div className="contact-texts">
                    <span>Mon–Sun: 24 Hours Open</span>
                  </div>
                </div>
              </div>

              <button className="footer-consult-btn" onClick={() => navigateTo('book-consultation')}>Book Consultation</button>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; {new Date().getFullYear()} Ramji Events &amp; Caterers. All Rights Reserved.</p>
          </div>
        </footer>
      )}

      {/* 10. Floating Quick Actions (WhatsApp & Get Quote) */}
      {showHeaderFooter && (
        <div className="floating-actions">
          <WhatsAppWidget />
          <button className="floating-btn quote-btn" onClick={() => navigateTo('get-quote')}>
            <svg viewBox="0 0 24 24">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
            Get Quote
          </button>
        </div>
      )}
    </>
  )
}

export default App
