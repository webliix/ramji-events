import { useState } from 'react'
import heroImg from '../assets/hero.png'
import whyRamjiDining from '../assets/why_ramji_dining.png'
import { services } from '../Data/services.jsx'
import { portfolioProjects } from '../Data/portfolio.jsx'
import Card from '../Theme/Card.jsx'

export default function Home({ navigateTo }) {
  const [showAllServices, setShowAllServices] = useState(false)

  return (
    <>
      {/* 4. Hero Section */}
      <section className="hero-section" style={{ backgroundImage: `url(${heroImg})` }}>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-subtitle">
            <span className="subtitle-text">Since 2002 · 500+ Events · 15 Cities</span>
            <div className="subtitle-line"></div>
          </div>
          <h1 className="hero-title">
            Crafting Moments,<br />
            Creating<br />
            Memories.
          </h1>
          <p className="hero-description">
            India's premier event planning and catering company. Weddings, corporate galas, destination celebrations — executed with uncompromising elegance.
          </p>
          <div className="hero-actions">
            <button className="btn-filled" onClick={() => navigateTo('book-consultation')}>Book Free Consultation</button>
            <button className="btn-outline" onClick={() => navigateTo('portfolio')}>View Our Work</button>
          </div>
        </div>
      </section>

      {/* 5. Stats Bar Section */}
      <section className="stats-bar">
        <div className="stat-item">
          <span className="stat-number">500+</span>
          <span className="stat-label">Events Delivered</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">22</span>
          <span className="stat-label">Years of Excellence</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">98%</span>
          <span className="stat-label">Client Satisfaction</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">50+</span>
          <span className="stat-label">Partner Venues</span>
        </div>
      </section>

      {/* 6. What We Do (Intro Section) */}
      <section className="what-we-do-section">
        <span className="section-badge">What We Do</span>
        <h2 className="section-title">A Complete Event Universe</h2>
        <p className="section-description">
          From intimate gatherings to grand spectacles, we manage every dimension of your event with artisan precision.
        </p>
      </section>

      {/* 7. Services Grid Section */}
      <section className="services-grid-section">
        <div className="services-grid">
          {services
            .filter(service => service.inGrid)
            .slice(0, showAllServices ? undefined : 6)
            .map(service => (
              <Card
                key={service.id}
                title={service.title}
                desc={service.desc}
                icon={service.icon}
                link={service.link}
                onClick={(e) => {
                  e.preventDefault()
                  navigateTo('service-detail', service.id)
                }}
              />
            ))}
        </div>

        <div className="services-action">
          <button className="btn-outline" onClick={() => setShowAllServices(!showAllServices)}>
            {showAllServices ? 'Show Less' : 'View All Services'}
          </button>
        </div>
      </section>

      {/* 8. Featured Celebrations Portfolio Section */}
      <section className="portfolio-section" id="portfolio">
        <div className="portfolio-header">
          <div className="portfolio-header-left">
            <div className="portfolio-badge">
              <span className="badge-line">—</span>
              <span className="badge-text">Our Work</span>
            </div>
            <h2 className="portfolio-title">Featured Celebrations</h2>
          </div>
          <button className="btn-outline portfolio-action-desktop" onClick={() => navigateTo('portfolio')}>View Full Portfolio</button>
        </div>

        <div className="portfolio-grid">
          {portfolioProjects.slice(0, 3).map((project, idx) => (
            <div key={idx} className="portfolio-card">
              <div className="portfolio-card-img-wrapper">
                <img src={project.image} alt={project.title} className="portfolio-card-img" />
                <div className="portfolio-card-overlay"></div>
              </div>
              <div className="portfolio-card-content">
                <span className="portfolio-card-category">{project.category}</span>
                <h3 className="portfolio-card-title">{project.title}</h3>
                <div className="portfolio-card-meta">
                  <span className="meta-item">
                    <svg viewBox="0 0 24 24" className="meta-icon" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {project.location}
                  </span>
                  <span className="meta-item-separator">·</span>
                  <span className="meta-item">
                    <svg viewBox="0 0 24 24" className="meta-icon" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                    </svg>
                    {project.capacity}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="portfolio-action-mobile">
          <button className="btn-outline" onClick={() => navigateTo('portfolio')}>View Full Portfolio</button>
        </div>
      </section>

      {/* 9. Why Choose Ramji Section */}
      <section className="why-ramji-section" id="why-ramji">
        <div className="why-ramji-container">
          {/* Left Column: Text & Features */}
          <div className="why-ramji-left">
            <div className="why-ramji-badge">
              <span className="badge-text">Why Ramji</span>
            </div>
            <h2 className="why-ramji-title">
              Excellence Is Not A Promise<br />
              — It's Our Standard
            </h2>
            <p className="why-ramji-description">
              Two decades of perfecting the art of celebrations. We don't just coordinate events — we architect memories that endure.
            </p>

            <div className="why-ramji-features">
              {/* Feature 1 */}
              <div className="feature-item">
                <div className="feature-icon-wrapper">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="6" />
                    <path d="M8.21 13.89L7 23l5-3 5 3-1.21-9.12" />
                  </svg>
                </div>
                <div className="feature-text">
                  <h4 className="feature-title">Award-Winning Team</h4>
                  <p className="feature-desc">Recognised by Wedding Sutra, Eventex, and ISES India three years running.</p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="feature-item">
                <div className="feature-icon-wrapper">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <div className="feature-text">
                  <h4 className="feature-title">Dedicated Planners</h4>
                  <p className="feature-desc">Every client gets a lead planner + a dedicated day-of coordinator.</p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="feature-item">
                <div className="feature-icon-wrapper">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <path d="M12 3a16.5 16.5 0 0 0 0 18M12 3a16.5 16.5 0 0 1 0 18" />
                  </svg>
                </div>
                <div className="feature-text">
                  <h4 className="feature-title">Pan-India Network</h4>
                  <p className="feature-desc">Vetted vendor relationships across 15 cities and 6 international destinations.</p>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="feature-item">
                <div className="feature-icon-wrapper">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <div className="feature-text">
                  <h4 className="feature-title">100% Transparency</h4>
                  <p className="feature-desc">Detailed budgets, real time updates, and no hidden charges — ever.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Image & Years Badge */}
          <div className="why-ramji-right">
            <div className="why-ramji-img-wrapper">
              <img src={whyRamjiDining} alt="Luxury Dining Decor" className="why-ramji-img" />
              <div className="years-badge">
                <span className="years-number">22</span>
                <span className="years-text">Years of Excellence</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8.8. Event Planning Process Section */}
      <section className="planning-process-section" id="planning-process">
        <div className="planning-process-container">
          <div className="planning-process-header">
            <span className="planning-badge">How It Works</span>
            <h2 className="planning-title">Our 6-Step Planning Process</h2>
          </div>

          <div className="planning-steps-grid">
            {/* Step 1 */}
            <div className="step-card">
              <span className="step-number">01</span>
              <h3 className="step-title">Consultation</h3>
              <p className="step-desc">
                We understand your vision, guest count, budget, and timeline in a free consultation.
              </p>
            </div>

            {/* Step 2 */}
            <div className="step-card">
              <span className="step-number">02</span>
              <h3 className="step-title">Requirement Analysis</h3>
              <p className="step-desc">
                We analyze your venue, guest requirements, and themed concepts to build a detailed plan.
              </p>
            </div>

            {/* Step 3 */}
            <div className="step-card">
              <span className="step-number">03</span>
              <h3 className="step-title">Proposal &amp; Budget</h3>
              <p className="step-desc">
                We present a tailored event proposal along with a transparent budget outline.
              </p>
            </div>

            {/* Step 4 */}
            <div className="step-card">
              <span className="step-number">04</span>
              <h3 className="step-title">Planning &amp; Design</h3>
              <p className="step-desc">
                Our creative designers craft 3D layouts, floral decor concepts, and visual mood boards.
              </p>
            </div>

            {/* Step 5 */}
            <div className="step-card">
              <span className="step-number">05</span>
              <h3 className="step-title">Execution</h3>
              <p className="step-desc">
                Our on-ground production and logistics teams build and coordinate the setup to perfection.
              </p>
            </div>

            {/* Step 6 */}
            <div className="step-card">
              <span className="step-number">06</span>
              <h3 className="step-title">Event Success</h3>
              <p className="step-desc">
                We manage the live event flow so you can relax and celebrate with your guests.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 9.5. Testimonials Section */}
      <section className="testimonials-section" id="testimonials">
        <div className="testimonials-container">
          <div className="testimonials-header">
            <span className="testimonials-badge">Client Stories</span>
            <h2 className="testimonials-title">What Our Clients Say</h2>
          </div>

          <div className="testimonials-grid">
            {/* Card 1 */}
            <div className="testimonial-card">
              <div className="quote-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.192 15.757c0-.907-.188-1.754-.563-2.54s-.918-1.464-1.658-2.036c-.496-.382-.94-.741-1.332-1.077s-.696-.693-.91-1.072-.321-.83-.321-1.353c0-.853.284-1.505.852-1.956s1.393-.676 2.474-.676c.451 0 .866.045 1.246.135s.743.218 1.089.383l.81-2.115c-.495-.248-1.076-.454-1.742-.619s-1.398-.248-2.196-.248c-1.892 0-3.376.516-4.452 1.549s-1.614 2.433-1.614 4.2c0 1.285.3 2.396.9 3.332s1.431 1.761 2.493 2.475c.42.276.786.536 1.098.78s.553.486.72.726.251.52.251.84c0 .546-.172.936-.516 1.17s-.828.351-1.452.351c-.604 0-1.127-.145-1.569-.435s-.765-.678-.971-1.163l-2.091.78c.39.996.996 1.776 1.817 2.34s1.772.846 2.852.846c1.692 0 3.013-.48 3.96-1.44s1.421-2.145 1.421-3.555zm12.808 0c0-.907-.188-1.754-.563-2.54s-.918-1.464-1.658-2.036c-.496-.382-.94-.741-1.332-1.077s-.696-.693-.91-1.072-.321-.83-.321-1.353c0-.853.284-1.505.852-1.956s1.393-.676 2.474-.676c.451 0 .866.045 1.246.135s.743.218 1.089.383l.81-2.115c-.495-.248-1.076-.454-1.742-.619s-1.398-.248-2.196-.248c-1.892 0-3.376.516-4.452 1.549s-1.614 2.433-1.614 4.2c0 1.285.3 2.396.9 3.332s1.431 1.761 2.493 2.475c.42.276.786.536 1.098.78s.553.486.72.726.251.52.251.84c0 .546-.172.936-.516 1.17s-.828.351-1.452.351c-.604 0-1.127-.145-1.569-.435s-.765-.678-.971-1.163l-2.091.78c.39.996.996 1.776 1.817 2.34s1.772.846 2.852.846c1.692 0 3.013-.48 3.96-1.44s1.421-2.145 1.421-3.555z" />
                </svg>
              </div>
              <div className="stars-wrapper">
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
              </div>
              <p className="testimonial-text">
                "Ramji Events transformed our dream into reality. Every single detail — from the floral mandap to the midnight fireworks — was executed flawlessly. We didn't worry about a thing on our wedding day."
              </p>
              <div className="testimonial-footer">
                <h4 className="client-name">Priya &amp; Arjun Mehra</h4>
                <span className="client-sub">Destination Wedding, Udaipur</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="testimonial-card">
              <div className="quote-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.192 15.757c0-.907-.188-1.754-.563-2.54s-.918-1.464-1.658-2.036c-.496-.382-.94-.741-1.332-1.077s-.696-.693-.91-1.072-.321-.83-.321-1.353c0-.853.284-1.505.852-1.956s1.393-.676 2.474-.676c.451 0 .866.045 1.246.135s.743.218 1.089.383l.81-2.115c-.495-.248-1.076-.454-1.742-.619s-1.398-.248-2.196-.248c-1.892 0-3.376.516-4.452 1.549s-1.614 2.433-1.614 4.2c0 1.285.3 2.396.9 3.332s1.431 1.761 2.493 2.475c.42.276.786.536 1.098.78s.553.486.72.726.251.52.251.84c0 .546-.172.936-.516 1.17s-.828.351-1.452.351c-.604 0-1.127-.145-1.569-.435s-.765-.678-.971-1.163l-2.091.78c.39.996.996 1.776 1.817 2.34s1.772.846 2.852.846c1.692 0 3.013-.48 3.96-1.44s1.421-2.145 1.421-3.555zm12.808 0c0-.907-.188-1.754-.563-2.54s-.918-1.464-1.658-2.036c-.496-.382-.94-.741-1.332-1.077s-.696-.693-.91-1.072-.321-.83-.321-1.353c0-.853.284-1.505.852-1.956s1.393-.676 2.474-.676c.451 0 .866.045 1.246.135s.743.218 1.089.383l.81-2.115c-.495-.248-1.076-.454-1.742-.619s-1.398-.248-2.196-.248c-1.892 0-3.376.516-4.452 1.549s-1.614 2.433-1.614 4.2c0 1.285.3 2.396.9 3.332s1.431 1.761 2.493 2.475c.42.276.786.536 1.098.78s.553.486.72.726.251.52.251.84c0 .546-.172.936-.516 1.17s-.828.351-1.452.351c-.604 0-1.127-.145-1.569-.435s-.765-.678-.971-1.163l-2.091.78c.39.996.996 1.776 1.817 2.34s1.772.846 2.852.846c1.692 0 3.013-.48 3.96-1.44s1.421-2.145 1.421-3.555z" />
                </svg>
              </div>
              <div className="stars-wrapper">
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
              </div>
              <p className="testimonial-text">
                "We've worked with many event companies but none match Ramji's professionalism. They managed 800 senior leaders across three days without a single hiccup. Truly world-class."
              </p>
              <div className="testimonial-footer">
                <h4 className="client-name">Rajesh Kumar, COO</h4>
                <span className="client-sub">Infosys Leadership Summit</span>
              </div>
            </div>

            {/* Card 3 */}
            <div className="testimonial-card">
              <div className="quote-icon">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.192 15.757c0-.907-.188-1.754-.563-2.54s-.918-1.464-1.658-2.036c-.496-.382-.94-.741-1.332-1.077s-.696-.693-.91-1.072-.321-.83-.321-1.353c0-.853.284-1.505.852-1.956s1.393-.676 2.474-.676c.451 0 .866.045 1.246.135s.743.218 1.089.383l.81-2.115c-.495-.248-1.076-.454-1.742-.619s-1.398-.248-2.196-.248c-1.892 0-3.376.516-4.452 1.549s-1.614 2.433-1.614 4.2c0 1.285.3 2.396.9 3.332s1.431 1.761 2.493 2.475c.42.276.786.536 1.098.78s.553.486.72.726.251.52.251.84c0 .546-.172.936-.516 1.17s-.828.351-1.452.351c-.604 0-1.127-.145-1.569-.435s-.765-.678-.971-1.163l-2.091.78c.39.996.996 1.776 1.817 2.34s1.772.846 2.852.846c1.692 0 3.013-.48 3.96-1.44s1.421-2.145 1.421-3.555zm12.808 0c0-.907-.188-1.754-.563-2.54s-.918-1.464-1.658-2.036c-.496-.382-.94-.741-1.332-1.077s-.696-.693-.91-1.072-.321-.83-.321-1.353c0-.853.284-1.505.852-1.956s1.393-.676 2.474-.676c.451 0 .866.045 1.246.135s.743.218 1.089.383l.81-2.115c-.495-.248-1.076-.454-1.742-.619s-1.398-.248-2.196-.248c-1.892 0-3.376.516-4.452 1.549s-1.614 2.433-1.614 4.2c0 1.285.3 2.396.9 3.332s1.431 1.761 2.493 2.475c.42.276.786.536 1.098.78s.553.486.72.726.251.52.251.84c0 .546-.172.936-.516 1.17s-.828.351-1.452.351c-.604 0-1.127-.145-1.569-.435s-.765-.678-.971-1.163l-2.091.78c.39.996.996 1.776 1.817 2.34s1.772.846 2.852.846c1.692 0 3.013-.48 3.96-1.44s1.421-2.145 1.421-3.555z" />
                </svg>
              </div>
              <div className="stars-wrapper">
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
              </div>
              <p className="testimonial-text">
                "I wanted something extraordinary for our 50th anniversary. The team at Ramji didn't just meet the brief — they exceeded it in ways I couldn't have imagined. Breathtaking."
              </p>
              <div className="testimonial-footer">
                <h4 className="client-name">Sunita Kapoor</h4>
                <span className="client-sub">Anniversary Gala, Mumbai</span>
              </div>
            </div>
          </div>

          <div className="testimonials-action">
            <button className="btn-outline" onClick={() => navigateTo('testimonials')}>Read More Stories</button>
          </div>
        </div>
      </section>

      {/* 9.8. Trusted Partners Section */}
      <section className="partners-section" id="partners">
        <div className="partners-container">
          <div className="partners-header">
            <span className="partners-badge">Trusted Partners</span>
            <h2 className="partners-title">Our Associated Network</h2>
          </div>

          <div className="partners-grid">
            {/* Partner 1 */}
            <div className="partner-card">
              <div className="partner-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 21h18" />
                  <path d="M9 21V9a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v12" />
                  <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16" />
                  <path d="M9 7h2" />
                  <path d="M9 11h2" />
                  <path d="M9 15h2" />
                  <path d="M13 13h2" />
                  <path d="M13 17h2" />
                </svg>
              </div>
              <h3 className="partner-name">Royal Estates</h3>
              <span className="partner-category">Venues</span>
            </div>

            {/* Partner 2 */}
            <div className="partner-card">
              <div className="partner-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                  <path d="M22 17l-10 5-10-5" />
                </svg>
              </div>
              <h3 className="partner-name">Floret Decor</h3>
              <span className="partner-category">Decorators</span>
            </div>

            {/* Partner 3 */}
            <div className="partner-card">
              <div className="partner-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
              </div>
              <h3 className="partner-name">Lumiere Photo</h3>
              <span className="partner-category">Photographers</span>
            </div>

            {/* Partner 4 */}
            <div className="partner-card">
              <div className="partner-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <h3 className="partner-name">Ramji Catering</h3>
              <span className="partner-category">Caterers</span>
            </div>

            {/* Partner 5 */}
            <div className="partner-card">
              <div className="partner-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18V5l12-2v13" />
                  <circle cx="6" cy="18" r="3" />
                  <circle cx="18" cy="16" r="3" />
                </svg>
              </div>
              <h3 className="partner-name">Symphony Bands</h3>
              <span className="partner-category">Entertainment Partners</span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
