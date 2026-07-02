import { useState, useEffect, useRef } from 'react';
import { videoReels } from '../Data/videos.jsx';
import './VideoReelsSection.css';

const VideoReelsSection = ({ navigateTo }) => {
  const [activeReel, setActiveReel] = useState(null);
  const [isMuted, setIsMuted] = useState(true);
  const modalVideoRef = useRef(null);

  // Close on ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveReel(null);
      }
    };
    if (activeReel) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Lock page scrolling
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = ''; // Restore page scrolling
    };
  }, [activeReel]);

  // Adjust volume when mute state changes
  useEffect(() => {
    if (modalVideoRef.current) {
      modalVideoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Programmatically trigger load and play on activeReel changes to support autoplay policies
  useEffect(() => {
    if (activeReel && modalVideoRef.current) {
      modalVideoRef.current.load();
      const playPromise = modalVideoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Autoplay prevented, playing muted instead:", error);
          setIsMuted(true);
          // Try playing muted
          if (modalVideoRef.current) {
            modalVideoRef.current.muted = true;
            modalVideoRef.current.play().catch(e => console.log("Muted autoplay also failed:", e));
          }
        });
      }
    }
  }, [activeReel]);

  return (
    <section className="video-reels-section" id="event-reels">
      <div className="video-reels-container">
        {/* Section Header */}
        <div className="video-reels-header">
          <div className="reels-badge">
            <span className="badge-line">—</span>
            <span className="badge-text">Visual Stories</span>
          </div>
          <h2 className="reels-title">Event Highlights &amp; Reels</h2>
          <p className="reels-description">
            Experience the atmosphere of our celebrations. Hover over a card to preview, or click to watch in full-screen.
          </p>
        </div>

        {/* Reels Cards Grid */}
        <div className="reels-grid">
          {videoReels.map((reel) => (
            <div 
              key={reel.id} 
              className="reel-card"
              onClick={() => {
                setActiveReel(reel);
                setIsMuted(false); // Unmute by default when full screen opens
              }}
            >
              {/* Card Media Wrapper */}
              <div className="reel-card-media">
                <video 
                  className="reel-card-video-preview" 
                  src={reel.videoUrl}
                  autoPlay 
                  loop 
                  muted 
                  playsInline
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 }}
                />
                
                <div className="reel-card-overlay">
                  <div className="reel-play-button">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                  <span className="reel-card-category">{reel.category}</span>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="reel-card-info">
                <h3 className="reel-card-title">{reel.title}</h3>
                <p className="reel-card-desc">{reel.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full-Screen Vertical Mobile Reel Player Modal */}
      {activeReel && (
        <div className="reel-modal-overlay" onClick={() => setActiveReel(null)}>
          <div className="reel-modal-content" onClick={(e) => e.stopPropagation()}>
            
            {/* Close Button Outside the Phone */}
            <button className="reel-modal-close" onClick={() => setActiveReel(null)} aria-label="Close video">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Smartphone Mockup Container */}
            <div className="phone-mockup-wrapper">
              <div className="phone-screen-container">
                {/* Active Video Element */}
                <video 
                  ref={modalVideoRef}
                  className="phone-video-player" 
                  src={activeReel.videoUrl}
                  autoPlay 
                  loop 
                  playsInline
                  muted={isMuted}
                />

                {/* Top Controls Overlay */}
                <div className="phone-top-overlay">
                  <span className="phone-brand-title">Ramji Events</span>
                  <button 
                    className="phone-mute-btn" 
                    onClick={() => setIsMuted(!isMuted)}
                    aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                  >
                    {isMuted ? (
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
                        <line x1="23" y1="9" x2="17" y2="15"></line>
                        <line x1="17" y1="9" x2="23" y2="15"></line>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                      </svg>
                    )}
                  </button>
                </div>

                {/* Bottom Details Overlay */}
                <div className="phone-bottom-overlay">
                  <span className="phone-reel-tag">{activeReel.category.toUpperCase()}</span>
                  <h4 className="phone-reel-title">{activeReel.title}</h4>
                  <p className="phone-reel-desc">{activeReel.description}</p>
                  
                  {/* Fake Interaction Likes bar to complete Reel Mockup */}
                  <div className="phone-reel-engagement">
                    <div className="engagement-item">
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                      </svg>
                      <span>Love</span>
                    </div>
                    <span className="engagement-separator">·</span>
                    <button className="reel-consult-cta" onClick={() => { setActiveReel(null); if (navigateTo) navigateTo('contact'); }}>
                      Inquire Now
                    </button>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};

export default VideoReelsSection;
