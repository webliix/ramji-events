import heroImg from '../assets/hero.png'
import { galleryItems } from '../Data/gallery.jsx'

export default function Gallery({
  navigateTo,
  galleryCategory,
  setGalleryCategory,
  lightboxIndex,
  setLightboxIndex
}) {
  return (
    <div className="services-page gallery-page">
      {/* Gallery Header Banner */}
      <div className="services-header-banner" style={{ backgroundImage: `url(${heroImg})` }}>
        <div className="services-header-overlay"></div>
        <div className="services-header-content">
          <div className="breadcrumbs">
            <span className="breadcrumb-link" onClick={() => navigateTo('home')}>HOME</span>
            <span className="breadcrumb-separator">&gt;</span>
            <span className="breadcrumb-active">GALLERY</span>
          </div>
          <span className="services-subtitle">GALLERY</span>
          <h1 className="services-title">Moments We've Made</h1>
          <p className="services-lead">
            A visual journey through our favourite celebrations.
          </p>
        </div>
      </div>

      {/* Gallery Controls Section */}
      <div className="gallery-controls-container">
        <div className="gallery-filters-wrapper">
          {['ALL', 'WEDDINGS', 'CORPORATE', 'VENUES', 'CATERING', 'DÉCOR', 'DESTINATION'].map((cat) => (
            <button
              key={cat}
              onClick={() => setGalleryCategory(cat)}
              className={`gallery-filter-btn ${galleryCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid Section */}
      <div className="gallery-grid-container">
        <div className="gallery-grid">
          {galleryItems
            .filter(item => galleryCategory === 'ALL' || item.category === galleryCategory)
            .map((item) => {
              const originalIndex = galleryItems.findIndex(g => g.id === item.id);
              return (
                <div
                  key={item.id}
                  className="gallery-card"
                  onClick={() => setLightboxIndex(originalIndex)}
                >
                  <div className="gallery-card-img-wrapper">
                    <img src={item.image} alt={item.title} className="gallery-card-img" loading="lazy" />
                    <div className="gallery-overlay">
                      <div className="gallery-overlay-icon">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                          <circle cx="12" cy="13" r="4" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="gallery-lightbox" onClick={() => setLightboxIndex(null)}>
          <button
            className="lightbox-close-btn"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex(null);
            }}
            aria-label="Close"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <button
            className="lightbox-nav-btn prev"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev === 0 ? galleryItems.length - 1 : prev - 1));
            }}
            aria-label="Previous image"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={galleryItems[lightboxIndex].image}
              alt={galleryItems[lightboxIndex].title}
              className="lightbox-img"
            />
            <div className="lightbox-caption">
              <span className="lightbox-category">{galleryItems[lightboxIndex].category}</span>
              <span className="lightbox-counter">{lightboxIndex + 1} / {galleryItems.length}</span>
            </div>
          </div>

          <button
            className="lightbox-nav-btn next"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((prev) => (prev === galleryItems.length - 1 ? 0 : prev + 1));
            }}
            aria-label="Next image"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}
