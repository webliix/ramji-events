import { SERVICE_DETAILS } from '../Data/serviceDetails.jsx'
import { services } from '../Data/services.jsx'

export default function ServiceDetail({ navigateTo, selectedServiceId, activeFaq, toggleFaq }) {
  const details = SERVICE_DETAILS[selectedServiceId] || SERVICE_DETAILS['wedding-planning'];

  return (
    <div className="services-page">
      {/* Services Header Banner */}
      <div className="services-header-banner" style={{ backgroundImage: `url(${details.bannerImg})` }}>
        <div className="services-header-overlay"></div>
        <div className="services-header-content">
          <div className="breadcrumbs">
            <span className="breadcrumb-link" onClick={() => navigateTo('home')}>HOME</span>
            <span className="breadcrumb-separator">&gt;</span>
            <span className="breadcrumb-link" onClick={() => navigateTo('services')}>SERVICES</span>
            <span className="breadcrumb-separator">&gt;</span>
            <span className="breadcrumb-active">{details.title.toUpperCase()}</span>
          </div>
          <span className="services-subtitle">{details.subtitle}</span>
          <h1 className="services-title">{details.title}</h1>
          <p className="services-lead">{details.lead}</p>
        </div>
      </div>

      {/* Service Detail Layout */}
      <div className="wedding-detail-layout">
        {/* Left Column */}
        <div className="wedding-main-col">
          {/* Overview Section */}
          <section id="overview">
            <span className="detail-section-badge">OVERVIEW</span>
            <h2 className="detail-section-title">{details.overview.title}</h2>
            <p className="detail-section-desc">{details.overview.desc}</p>
            <div className="includes-checklist">
              {details.overview.checklist.map((item, idx) => (
                <div key={idx} className="checklist-item">
                  <svg className="checklist-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Packages Section */}
          <section id="packages">
            <span className="detail-section-badge">PACKAGES</span>
            <h2 className="detail-section-title">Choose Your Experience</h2>
            <div className="packages-grid">
              {details.packages.map((pkg, idx) => (
                <div key={idx} className={`package-card ${pkg.popular ? 'popular' : ''}`}>
                  {pkg.popular && <span className="package-popular-tag">MOST POPULAR</span>}
                  <h3 className="package-name">{pkg.name}</h3>
                  {pkg.price !== 'Custom' ? (
                    <div className="package-price">
                      <span className="currency">₹</span>{pkg.price.replace('₹', '')}
                    </div>
                  ) : (
                    <div className="package-price">{pkg.price}</div>
                  )}
                  {pkg.capacity && <div className="package-capacity">{pkg.capacity}</div>}
                  <ul className="package-features">
                    {pkg.features.map((feat, fIdx) => (
                      <li key={fIdx}>
                        <svg className="feature-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {feat}
                      </li>
                    ))}
                  </ul>
                  <button className={pkg.popular ? 'btn-filled' : 'btn-outline'} onClick={() => navigateTo('get-quote')}>GET STARTED</button>
                </div>
              ))}
            </div>
          </section>

          {/* Gallery Section */}
          {details.gallery && details.gallery.length > 0 && (
            <section id="gallery">
              <span className="detail-section-badge">OUR WORK</span>
              <h2 className="detail-section-title">Showcase</h2>
              <div className="detail-gallery-grid">
                {details.gallery.map((imgSrc, idx) => (
                  <img
                    key={idx}
                    src={imgSrc}
                    alt={`${details.title} showcase ${idx + 1}`}
                    className="detail-gallery-img"
                  />
                ))}
              </div>
            </section>
          )}

          {/* FAQs Section */}
          {details.faqs && details.faqs.length > 0 && (
            <section id="faqs">
              <span className="detail-section-badge">QUESTIONS</span>
              <h2 className="detail-section-title">Frequently Asked Questions</h2>
              <div className="detail-faqs">
                {details.faqs.map((faq, idx) => (
                  <div key={idx} className="faq-item">
                    <div className="faq-question-row" onClick={() => toggleFaq(idx)}>
                      <h4 className="faq-question">{faq.q}</h4>
                      <span className="faq-toggle">
                        {activeFaq === idx ? '−' : '+'}
                      </span>
                    </div>
                    {activeFaq === idx && (
                      <p className="faq-answer">{faq.a}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Client Stories Section */}
          {details.story && (
            <section id="client-stories">
              <span className="detail-section-badge">CLIENT STORIES</span>
              <div className="client-stories-grid">
                <div className="client-story-card">
                  <div className="star-rating">{details.story.rating}</div>
                  <p className="story-text">{details.story.text}</p>
                  <div className="story-divider"></div>
                  <h4 className="story-author">{details.story.author}</h4>
                  <span className="story-sub">{details.story.sub}</span>
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Right Column (Sticky Sidebar) */}
        <div className="wedding-sidebar-col">
          <div className="wedding-sidebar">
            <h3 className="sidebar-title">Start Planning Today</h3>
            <button className="btn-filled" onClick={() => navigateTo('get-quote')}>BOOK FREE CONSULTATION</button>
            <div className="sidebar-or">or</div>
            <button className="btn-outline" onClick={() => navigateTo('get-quote')}>REQUEST A QUOTE</button>
            <div className="sidebar-divider"></div>
            <div className="sidebar-contact-info">
              <a href="tel:+916392956850" className="sidebar-contact-link">+91 63929 56850</a>
              <span className="sidebar-contact-sub">WhatsApp Available</span>
              <a href="mailto:events@ramjievents.com" className="sidebar-contact-link">events@ramjievents.com</a>
            </div>
            <div className="sidebar-divider"></div>
            <h3 className="sidebar-related-title" style={{ fontSize: '16px', fontWeight: 'bold', letterSpacing: '1px', marginBottom: '15px' }}>RELATED SERVICES</h3>
            {services
              .filter(s => s.id !== selectedServiceId && s.id !== 'event-decoration')
              .slice(0, 3)
              .map(s => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="sidebar-related-link"
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo('service-detail', s.id);
                  }}
                >
                  <span>{s.title}</span>
                  <span>&rarr;</span>
                </a>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
