import whyRamjiDining from '../assets/why_ramji_dining.png'
import rameshJoshi from '../assets/ramesh_joshi.png'
import ananyaSharma from '../assets/ananya_sharma.png'
import vikramMalhotra from '../assets/vikram_malhotra.png'

export default function About({ navigateTo }) {
  return (
    <div className="about-page">
      {/* About Header Banner */}
      <div className="about-header-banner">
        <div className="about-header-content">
          <div className="breadcrumbs">
            <span className="breadcrumb-link" onClick={() => navigateTo('home')}>HOME</span>
            <span className="breadcrumb-separator">&gt;</span>
            <span className="breadcrumb-active">ABOUT US</span>
          </div>
          <span className="about-subtitle">6 YEARS OF EXTRAORDINARY EVENTS</span>
          <h1 className="about-title">About Us</h1>
          <p className="about-lead">
            From a two-person studio in Noida to India's most trusted event company — this is our story.
          </p>
        </div>
      </div>

      {/* Our Story Section */}
      <section className="about-story-section">
        <div className="about-story-container">
          <div className="about-story-content-grid">
            {/* Left: Text Content */}
            <div className="about-story-left">
              <span className="about-story-badge">OUR STORY</span>
              <h2 className="about-story-heading">BORN FROM A PASSION FOR PERFECTION</h2>
              <p className="about-story-desc">
                In 2020, Ramesh Joshi had one conviction: every celebration deserves to be extraordinary. Starting with a small team of Noida, Ramji Events grew organically — client by client, memory by memory.
              </p>
              <p className="about-story-desc">
                Today, our 120-member team brings that same founding conviction to every event, from an intimate anniversary dinner to a 2000-guest corporate summit. We don't simply plan events — we architect experiences.
              </p>
              
              {/* Stats counters */}
              <div className="about-story-stats">
                <div className="about-stat-item">
                  <span className="about-stat-number">500+</span>
                  <span className="about-stat-label">EVENTS</span>
                </div>
                <div className="about-stat-item">
                  <span className="about-stat-number">120</span>
                  <span className="about-stat-label">TEAM MEMBERS</span>
                </div>
                <div className="about-stat-item">
                  <span className="about-stat-number">15</span>
                  <span className="about-stat-label">CITIES</span>
                </div>
              </div>
            </div>

            {/* Right: Image */}
            <div className="about-story-right">
              <div className="about-story-image-wrapper">
                <img src={whyRamjiDining} alt="Ramji Events Team and Setup" className="about-story-image" loading="lazy" />
                <div className="about-story-image-decor"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Foundation (Mission, Vision, Values) Section */}
      <section className="about-foundation-section">
        <div className="about-foundation-container">
          <div className="about-foundation-header">
            <span className="about-foundation-badge">OUR FOUNDATION</span>
            <h2 className="about-foundation-title">MISSION, VISION &amp; VALUES</h2>
          </div>

          <div className="about-foundation-grid">
            {/* Mission Card */}
            <div className="foundation-card">
              <div className="foundation-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <h3 className="foundation-card-title">MISSION</h3>
              <p className="foundation-card-desc">
                To transform every client's vision into a flawlessly executed celebration that exceeds expectations and creates lasting memories.
              </p>
            </div>

            {/* Vision Card */}
            <div className="foundation-card">
              <div className="foundation-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <h3 className="foundation-card-title">VISION</h3>
              <p className="foundation-card-desc">
                To be South Asia's most trusted luxury event company — known for creativity, reliability, and an unwavering commitment to excellence.
              </p>
            </div>

            {/* Values Card */}
            <div className="foundation-card">
              <div className="foundation-card-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 className="foundation-card-title">VALUES</h3>
              <p className="foundation-card-desc">
                Integrity in every interaction. Creativity without compromise. Precision in execution. Empathy in service. Joy as the ultimate deliverable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="about-team-section">
        <div className="about-team-container">
          <div className="about-team-header">
            <span className="about-team-badge">OUR TEAM</span>
            <h2 className="about-team-title">TEAM</h2>
            <p className="about-team-subtitle">Meet the visionaries directing our signature events.</p>
          </div>

          <div className="about-team-grid">
            {/* Member 1 */}
            <div className="team-card">
              <div className="team-card-image-wrapper">
                <img src={rameshJoshi} alt="Ramesh Joshi" className="team-card-img" loading="lazy" />
              </div>
              <div className="team-card-info">
                <h3 className="team-member-name">Ramesh Joshi</h3>
                <span className="team-member-role">Founder &amp; MD</span>
                <p className="team-member-bio">
                  "Every celebration is a canvas of memories. We design with soul."
                </p>
              </div>
            </div>

            {/* Member 2 */}
            <div className="team-card">
              <div className="team-card-image-wrapper">
                <img src={ananyaSharma} alt="Ananya Sharma" className="team-card-img" loading="lazy" />
              </div>
              <div className="team-card-info">
                <h3 className="team-member-name">Ananya Sharma</h3>
                <span className="team-member-role">Creative Director</span>
                <p className="team-member-bio">
                  "We weave elegance, drama, and personal stories into breathtaking designs."
                </p>
              </div>
            </div>

            {/* Member 3 */}
            <div className="team-card">
              <div className="team-card-image-wrapper">
                <img src={vikramMalhotra} alt="Vikram Malhotra" className="team-card-img" loading="lazy" />
              </div>
              <div className="team-card-info">
                <h3 className="team-member-name">Vikram Malhotra</h3>
                <span className="team-member-role">Head of Production</span>
                <p className="team-member-bio">
                  "Execution is everything. We turn complex logistics into seamless magic."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
