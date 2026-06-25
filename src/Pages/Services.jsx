import infosysSummit from '../assets/infosys_summit.png'
import { services } from '../Data/services.jsx'

export default function Services({ navigateTo, activeCategory, setActiveCategory, highlightedServiceId }) {
  return (
    <div className="services-page">
      {/* Services Header Banner */}
      <div className="services-header-banner" style={{ backgroundImage: `url(${infosysSummit})` }}>
        <div className="services-header-overlay"></div>
        <div className="services-header-content">
          <div className="breadcrumbs">
            <span className="breadcrumb-link" onClick={() => navigateTo('home')}>HOME</span>
            <span className="breadcrumb-separator">&gt;</span>
            <span className="breadcrumb-active">OUR SERVICES</span>
          </div>
          <span className="services-subtitle">OUR SERVICES</span>
          <h1 className="services-title">End-to-End Event Excellence</h1>
          <p className="services-lead">
            From concept to confetti — every service you need for an extraordinary event.
          </p>
        </div>
      </div>

      {/* Category Filter Section */}
      <div className="services-filter-section">
        <div className="filter-tabs-container">
          {['ALL', 'WEDDINGS', 'CORPORATE', 'SOCIAL', 'DECORATION', 'COORDINATION'].map(cat => (
            <button
              key={cat}
              className={`filter-tab-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Services Page Grid */}
      <section className="services-page-grid-section">
        <div className="services-page-grid">
          {services
            .filter(service => {
              if (activeCategory === 'ALL') return true;
              return service.categories && service.categories.includes(activeCategory);
            })
            .map(service => (
              <div
                key={service.id}
                id={service.id}
                className={`services-page-card ${highlightedServiceId === service.id ? 'highlight' : ''}`}
              >
                <div className="card-top-meta">
                  <div className="card-meta-icon">{service.icon}</div>
                  <span className="card-category-tag">{service.displayTag}</span>
                </div>
                <h3 className="services-page-card-title">{service.title}</h3>
                <p className="services-page-card-desc">{service.desc}</p>
                <a
                  href={service.link}
                  className="services-page-card-link"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo('service-detail', service.id);
                  }}
                >
                  View Service <span className="arrow">→</span>
                </a>
              </div>
            ))}
        </div>
      </section>

      {/* Features Bar Section */}
      <section className="services-features-bar">
        <div className="feature-card-item">
          <div className="feature-card-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <h4 className="feature-card-title">DEDICATED TEAM</h4>
          <p className="feature-card-desc">A personal planner + coordinator assigned to every event.</p>
        </div>
        <div className="feature-card-item">
          <div className="feature-card-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              <path d="M2 12h20" />
            </svg>
          </div>
          <h4 className="feature-card-title">PAN-INDIA REACH</h4>
          <p className="feature-card-desc">Vendor network across 15 cities, zero geographic limitation.</p>
        </div>
        <div className="feature-card-item">
          <div className="feature-card-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h4 className="feature-card-title">TRANSPARENT PRICING</h4>
          <p className="feature-card-desc">Detailed quotes, no hidden costs, real-time budget tracking.</p>
        </div>
        <div className="feature-card-item">
          <div className="feature-card-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="8" r="7" />
              <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
            </svg>
          </div>
          <h4 className="feature-card-title">AWARD-WINNING</h4>
          <p className="feature-card-desc">Recognised by India's top event and hospitality bodies.</p>
        </div>
      </section>

      {/* Consultation Section */}
      <section className="services-consultation-section">
        <h2 className="consultation-heading">NOT SURE WHICH SERVICE YOU NEED?</h2>
        <p className="consultation-subheading">Book a free consultation and our senior planners will guide you to the perfect package.</p>
        <div className="consultation-buttons">
          <button className="btn-filled" onClick={() => navigateTo('get-quote')}>BOOK FREE CONSULTATION</button>
          <button className="btn-outline" onClick={() => navigateTo('get-quote')}>REQUEST A QUOTE</button>
        </div>
      </section>
    </div>
  )
}
