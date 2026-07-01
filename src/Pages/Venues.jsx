import whyRamjiDining from '../assets/why_ramji_dining.png'
import { venuesList } from '../Data/venues.jsx'

export default function Venues({
  navigateTo,
  venueCapacityFilter,
  setVenueCapacityFilter,
  venueTypeFilter,
  setVenueTypeFilter,
  venueViewMode,
  setVenueViewMode
}) {
  return (
    <div className="services-page venues-page">
      {/* Venues Header Banner */}
      <div className="services-header-banner" style={{ backgroundImage: `url(${whyRamjiDining})` }}>
        <div className="services-header-overlay"></div>
        
        {/* Back Button */}
        <button className="wizard-back-home-btn" onClick={() => navigateTo('home')}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span>Back to Home</span>
        </button>

        <div className="services-header-content">
          <div className="breadcrumbs">
            <span className="breadcrumb-link" onClick={() => navigateTo('home')}>HOME</span>
            <span className="breadcrumb-separator">&gt;</span>
            <span className="breadcrumb-active">VENUES</span>
          </div>
          <span className="services-subtitle">VENUES</span>
          <h1 className="services-title">Extraordinary Spaces For Extraordinary Events</h1>
          <p className="services-lead">
            50+ partner venues across India — curated for elegance, functionality, and memorability.
          </p>
        </div>
      </div>

      {/* Venues Controls Section */}
      <div className="venues-controls-container">
        <div className="venues-filters-group">
          {/* Capacity Filter */}
          <div className="venues-filter-section">
            <span className="venues-filter-label">Capacity:</span>
            <div className="venues-filter-buttons">
              {['Any', '< 500', '500-1000', '1000+'].map((cap) => (
                <button
                  key={cap}
                  onClick={() => setVenueCapacityFilter(cap)}
                  className={`venues-filter-btn ${venueCapacityFilter === cap ? 'active' : ''}`}
                >
                  {cap}
                </button>
              ))}
            </div>
          </div>

          {/* Type Filter */}
          <div className="venues-filter-section">
            <span className="venues-filter-label">Type:</span>
            <div className="venues-filter-buttons">
              {['All', 'Indoor', 'Outdoor', 'Heritage', 'Resort'].map((type) => (
                <button
                  key={type}
                  onClick={() => setVenueTypeFilter(type)}
                  className={`venues-filter-btn ${venueTypeFilter === type ? 'active' : ''}`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* View Toggle */}
        <div className="venues-view-toggle">
          <button 
            className={`venues-toggle-btn ${venueViewMode === 'grid' ? 'active' : ''}`} 
            onClick={() => setVenueViewMode('grid')}
            aria-label="Grid View"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
          </button>
          <button 
            className={`venues-toggle-btn ${venueViewMode === 'map' ? 'active' : ''}`} 
            onClick={() => setVenueViewMode('map')}
            aria-label="Map View"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
              <line x1="8" y1="2" x2="8" y2="18"></line>
              <line x1="16" y1="6" x2="16" y2="22"></line>
            </svg>
          </button>
        </div>
      </div>

      {/* Venues Grid / Content */}
      <div className="venues-grid-container">
        {venueViewMode === 'grid' ? (
          <div className="venues-grid">
            {venuesList
              .filter(venue => {
                // Capacity Filter logic
                let matchesCapacity = true;
                if (venueCapacityFilter === '< 500') {
                  matchesCapacity = venue.capacity < 500;
                } else if (venueCapacityFilter === '500-1000') {
                  matchesCapacity = venue.capacity >= 500 && venue.capacity <= 1000;
                } else if (venueCapacityFilter === '1000+') {
                  matchesCapacity = venue.capacity > 1000;
                }

                // Type Filter logic
                const matchesType = venueTypeFilter === 'All' || venue.type.toLowerCase() === venueTypeFilter.toLowerCase();

                return matchesCapacity && matchesType;
              })
              .map((venue, idx) => (
                <div key={idx} className="venue-card">
                  <div className="venue-card-img-wrapper">
                    <img src={venue.image} alt={venue.title} className="venue-card-img" loading="lazy" />
                  </div>
                  <div className="venue-card-content">
                    <div className="venue-card-header">
                      <span className="venue-type">{venue.type}</span>
                      <span className="venue-capacity">{venue.capacityText}</span>
                    </div>
                    <h3 className="venue-title">{venue.title}</h3>
                    <div className="venue-location">
                      <svg viewBox="0 0 24 24" className="venue-location-icon" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                      <span>{venue.location}</span>
                    </div>
                    <div className="venue-tags">
                      {venue.tags.slice(0, 3).map((tag, tagIdx) => (
                        <span key={tagIdx} className="venue-tag">{tag}</span>
                      ))}
                      {venue.tags.length > 3 && (
                        <span className="venue-tag-more">+{venue.tags.length - 3}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className="map-view-placeholder" style={{
            border: '1px solid var(--border-color)',
            padding: '80px 20px',
            textAlign: 'center',
            background: 'var(--header-bg)'
          }}>
            <svg viewBox="0 0 24 24" width="48" height="48" stroke="var(--gold-color)" strokeWidth="1.5" fill="none" style={{ marginBottom: '20px' }}>
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--text-primary)', marginBottom: '10px', fontSize: '22px' }}>INTERACTIVE MAP VIEW</h3>
            <p style={{ color: 'var(--text-muted)', maxWidth: '500px', margin: '0 auto 20px', fontSize: '14px', lineHeight: '1.6' }}>
              Explore our premium venue locations across Delhi, Mumbai, Udaipur, Jaipur, Hyderabad, and Goa.
            </p>
            <button className="btn-outline" onClick={() => setVenueViewMode('grid')}>SWITCH TO GRID VIEW</button>
          </div>
        )}
      </div>

      {/* Consultation CTA Banner */}
      <div className="portfolio-cta-section venues-cta-section" style={{ borderTop: 'none' }}>
        <div className="portfolio-cta-content">
          <h2 className="portfolio-cta-title">CAN'T FIND THE PERFECT VENUE?</h2>
          <p className="portfolio-cta-desc">Our venue scouts have access to 200+ unlisted spaces. Tell us your vision and we'll find the perfect match.</p>
          <div className="portfolio-cta-buttons">
            <button className="btn-filled" onClick={() => navigateTo('get-quote')}>DISCUSS VENUE REQUIREMENTS</button>
          </div>
        </div>
      </div>
    </div>
  )
}
