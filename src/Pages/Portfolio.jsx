import infosysSummit from '../assets/infosys_summit.png'
import { portfolioProjects } from '../Data/portfolio.jsx'

export default function Portfolio({
  navigateTo,
  portfolioCategory,
  setPortfolioCategory,
  portfolioSearch,
  setPortfolioSearch,
  visibleProjects,
  setVisibleProjects
}) {
  return (
    <div className="services-page portfolio-page">
      {/* Portfolio Header Banner */}
      <div className="services-header-banner" style={{ backgroundImage: `url(${infosysSummit})` }}>
        <div className="services-header-overlay"></div>
        <div className="services-header-content">
          <div className="breadcrumbs">
            <span className="breadcrumb-link" onClick={() => navigateTo('home')}>HOME</span>
            <span className="breadcrumb-separator">&gt;</span>
            <span className="breadcrumb-active">PORTFOLIO</span>
          </div>
          <span className="services-subtitle">PORTFOLIO</span>
          <h1 className="services-title">Events That Tell Stories</h1>
          <p className="services-lead">
            A curated selection of our finest work — each one a unique vision brought to life.
          </p>
        </div>
      </div>

      {/* Portfolio Controls Section */}
      <div className="portfolio-controls-container">
        <div className="portfolio-search-wrapper">
          <svg className="portfolio-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Search projects..."
            value={portfolioSearch}
            onChange={(e) => {
              setPortfolioSearch(e.target.value);
              setVisibleProjects(6);
            }}
            className="portfolio-search-input"
          />
        </div>

        <div className="portfolio-filters-wrapper">
          {['ALL', 'DESTINATION WEDDING', 'CORPORATE CONFERENCE', 'LUXURY EVENT', 'PRODUCT LAUNCH', 'WEDDING PLANNING', 'BIRTHDAY CELEBRATION'].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setPortfolioCategory(cat);
                setVisibleProjects(6);
              }}
              className={`portfolio-filter-btn ${portfolioCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Portfolio Grid Section */}
      <div className="portfolio-grid-container">
        <div className="portfolio-grid">
          {portfolioProjects
            .filter(project => {
              const matchesCategory = portfolioCategory === 'ALL' || project.category === portfolioCategory;
              const matchesSearch = project.title.toLowerCase().includes(portfolioSearch.toLowerCase()) ||
                                    project.category.toLowerCase().includes(portfolioSearch.toLowerCase()) ||
                                    project.location.toLowerCase().includes(portfolioSearch.toLowerCase());
              return matchesCategory && matchesSearch;
            })
            .slice(0, visibleProjects)
            .map((project, idx) => (
              <div key={idx} className="portfolio-card">
                <div className="portfolio-card-img-wrapper">
                  <img src={project.image} alt={project.title} className="portfolio-card-img" loading="lazy" />
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

        {/* Load More Button */}
        {portfolioProjects.filter(project => {
          const matchesCategory = portfolioCategory === 'ALL' || project.category === portfolioCategory;
          const matchesSearch = project.title.toLowerCase().includes(portfolioSearch.toLowerCase()) ||
                                project.category.toLowerCase().includes(portfolioSearch.toLowerCase()) ||
                                project.location.toLowerCase().includes(portfolioSearch.toLowerCase());
          return matchesCategory && matchesSearch;
        }).length > visibleProjects && (
          <div className="portfolio-load-more-container">
            <button className="btn-outline portfolio-load-more-btn" onClick={() => setVisibleProjects(prev => prev + 3)}>
              LOAD MORE PROJECTS
            </button>
          </div>
        )}
      </div>

      {/* Footer Call to Action */}
      <div className="portfolio-cta-section">
        <div className="portfolio-cta-content">
          <h2 className="portfolio-cta-title">INSPIRED? LET'S CREATE YOUR STORY.</h2>
          <p className="portfolio-cta-desc">Every project in this portfolio started with a conversation. Let's start yours.</p>
          <div className="portfolio-cta-buttons">
            <button className="btn-filled" onClick={() => navigateTo('book-consultation')}>BOOK CONSULTATION</button>
            <button className="btn-outline" onClick={() => navigateTo('get-quote')}>GET QUOTE</button>
          </div>
        </div>
      </div>
    </div>
  )
}
