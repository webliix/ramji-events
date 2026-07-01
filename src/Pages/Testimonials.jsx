import { useState } from 'react'
import heroImg from '../assets/hero.png'
import rameshJoshi from '../assets/ramesh_joshi.png'
import ananyaSharma from '../assets/ananya_sharma.png'
import vikramMalhotra from '../assets/vikram_malhotra.png'
import sunitaKapoor from '../assets/sunita_kapoor.png'
import deepikaNair from '../assets/deepika_nair.png'

// Import newly generated Google Review ceremony images
import haldiSignpost from '../assets/haldi_signpost.png'
import haldiStage from '../assets/haldi_stage.png'
import haldiSeating from '../assets/haldi_seating.png'
import mehndiDecor from '../assets/mehndi_decor.png'
import floralArch from '../assets/floral_arch.png'
import grandStage from '../assets/grand_stage.png'
import outdoorEntrance from '../assets/outdoor_entrance.png'
import lightedArchway from '../assets/lighted_archway.png'
import rooftopHaldi from '../assets/rooftop_haldi.png'
import kundanHaldi from '../assets/kundan_haldi.png'

export default function Testimonials({ navigateTo }) {
  const [activeTab, setActiveTab] = useState('featured') // 'featured' | 'google'
  const [lightboxImage, setLightboxImage] = useState(null)
  const [writeReviewModalOpen, setWriteReviewModalOpen] = useState(false)
  const [newReviewName, setNewReviewName] = useState('')
  const [newReviewRating, setNewReviewRating] = useState(0)
  const [hoveredStar, setHoveredStar] = useState(0)
  const [newReviewText, setNewReviewText] = useState('')
  const [newReviewPhotos, setNewReviewPhotos] = useState([])

  const testimonials = [
    {
      id: 1,
      name: 'Priya & Arjun Mehra',
      category: 'Destination Wedding, Udaipur',
      text: '"Ramji Events transformed our dream into reality. Every single detail — from the floral mandap to the midnight fireworks — was executed flawlessly. We didn\'t worry about a thing on our wedding day."',
      image: ananyaSharma,
      stars: 5
    },
    {
      id: 2,
      name: 'Rajesh Kumar, COO',
      category: 'Infosys Leadership Summit',
      text: '"We\'ve worked with many event companies but none match Ramji\'s professionalism. They managed 800 senior leaders across three days without a single hiccup. Truly world-class."',
      image: rameshJoshi,
      stars: 5
    },
    {
      id: 3,
      name: 'Sunita Kapoor',
      category: 'Anniversary Gala, Mumbai',
      text: '"I wanted something extraordinary for our 50th anniversary. The team at Ramji didn\'t just meet the brief — they exceeded it in ways I couldn\'t have imagined. Breathtaking."',
      image: sunitaKapoor,
      stars: 5
    },
    {
      id: 4,
      name: 'Vikram & Ananya Joshi',
      category: 'Royal Wedding, Jaipur',
      text: '"From the grand baraat procession to the intimate mehendi evening, every moment was curated with love and precision. Our families still talk about it two years later."',
      image: vikramMalhotra,
      stars: 5
    },
    {
      id: 5,
      name: 'Deepika Nair, CEO',
      category: 'Product Launch, Delhi',
      text: '"The launch event perfectly captured our brand identity. The venue setup, the lighting, the F&B — all on point. Generated incredible media coverage. Thank you Ramji team!"',
      image: deepikaNair,
      stars: 5
    }
  ]

  const [googleReviews, setGoogleReviews] = useState([
    {
      id: 101,
      name: 'Himanshu Sharma',
      avatarBg: '#4caf50',
      initial: 'H',
      meta: '3 reviews • 3 photos',
      time: 'Edited 7 months ago',
      stars: 5,
      text: 'Thank you for providing a high end quality in budget friendly, feels got fan of your service in first sight. These are some of the pictures from my Haldi Ceremony.',
      images: [haldiSignpost, haldiStage, haldiSeating]
    },
    {
      id: 102,
      name: 'Yashika Keswani',
      avatarBg: '#2e7d32',
      initial: 'Y',
      meta: '5 reviews • 2 photos',
      time: '8 months ago',
      stars: 5,
      text: 'Wonderful experience amazing staff Lived there service 🥳✨ ...',
      images: [mehndiDecor]
    },
    {
      id: 103,
      name: 'Sushil Mishra',
      avatarBg: '#ef5350',
      initial: 'S',
      meta: '7 reviews • 2 photos',
      time: 'a year ago',
      stars: 5,
      text: 'Thank you for the wonderful work you do! Organizing these events and working with so many personalities is a special magic. I appreciate you',
      images: [floralArch]
    },
    {
      id: 104,
      name: 'Namaste event',
      avatarBg: '#5c6bc0',
      initial: 'N',
      meta: '1 review',
      time: '5 months ago',
      stars: 5,
      text: 'They are doing really vry good work 👏👏 thanks a lot 👍 ...'
    },
    {
      id: 105,
      name: 'Vinit King',
      avatarBg: '#26a69a',
      initial: 'V',
      meta: '4 reviews',
      time: '7 months ago',
      stars: 5,
      text: 'Best caterers with good hygiene they managed event very well thank you akhil & team for making my day memorable'
    },
    {
      id: 106,
      name: 'Deepu nagar RD',
      avatarBg: '#78909c',
      initial: 'D',
      meta: '6 reviews',
      time: '8 months ago',
      stars: 5,
      text: 'Best & genuine work at reasonable price'
    },
    {
      id: 107,
      name: 'Google Google',
      avatarBg: '#8d6e63',
      initial: 'G',
      meta: '1 review',
      time: 'a month ago',
      stars: 5,
      text: 'Best service provider'
    },
    {
      id: 108,
      name: 'Harshit Pandey',
      avatarBg: '#ab47bc',
      initial: 'H',
      meta: '1 review',
      time: '6 months ago',
      stars: 5,
      text: 'Best services ever'
    },
    {
      id: 109,
      name: 'Manoj sharma',
      avatarBg: '#26c6da',
      initial: 'M',
      meta: 'Local Guide • 10 reviews • 24 photos',
      time: '7 months ago',
      stars: 5,
      text: 'Best & genuine services'
    },
    {
      id: 110,
      name: 'Sultan Ansari',
      avatarBg: '#26a69a',
      initial: 'S',
      meta: '4 reviews',
      time: '7 months ago',
      stars: 5,
      text: 'Hygienic & professional vendor'
    },
    {
      id: 111,
      name: 'abhishek prasad',
      avatarBg: '#7e57c2',
      initial: 'A',
      meta: '3 reviews • 8 photos',
      time: '7 months ago',
      stars: 5,
      text: 'Why not you try 🌺 🌺 😳 ...'
    },
    {
      id: 112,
      name: 'Deepmala Giri',
      avatarBg: '#ec407a',
      initial: 'D',
      meta: '2 reviews',
      time: '9 months ago',
      stars: 5,
      text: 'Very nice decoration'
    },
    {
      id: 113,
      name: 'CBSE REAR KNOWLEDGE',
      avatarBg: '#c2185b',
      initial: 'C',
      meta: '2 reviews',
      time: '7 months ago',
      stars: 4.0,
      text: 'Best & professional'
    },
    {
      id: 114,
      name: 'Mr.Rajjan',
      avatarBg: '#1976d2',
      initial: 'M',
      meta: '2 reviews',
      time: 'a year ago',
      stars: 4.0,
      text: 'Very nice service.'
    },
    {
      id: 115,
      name: 'Pratham Shukla',
      avatarBg: '#0288d1',
      initial: 'P',
      meta: '7 reviews',
      time: 'a year ago',
      stars: 4.0,
      text: 'Good Service'
    },
    {
      id: 116,
      name: 'Nirmal Singh Rajput',
      avatarBg: '#f57c00',
      initial: 'N',
      meta: '2 reviews',
      time: 'a year ago',
      stars: 4.0,
      text: 'Fabulous 🤩 ...'
    },
    {
      id: 117,
      name: 'Ayush',
      avatarBg: '#388e3c',
      initial: 'A',
      meta: 'Local Guide • 11 reviews • 1 photo',
      time: '10 hours ago',
      stars: 4.8,
      text: 'We hired them for our destination wedding, and they exceeded all expectations. The stage setup was grand and beautiful. The catering menu had so many options, and everything tasted fresh and authentic. Truly the best event planners',
      images: [grandStage]
    },
    {
      id: 118,
      name: 'Ritik',
      avatarBg: '#512da8',
      initial: 'R',
      meta: 'Local Guide • 12 reviews • 1 photo',
      time: '10 hours ago',
      stars: 4.8,
      text: 'We booked Ramji Events for my sister\'s Haldi and Mehendi functions. The decor was so vibrant, colorful, and highly aesthetic—perfect for Instagram photos! The snack stalls they set up were a huge hit with the guests',
      images: [outdoorEntrance]
    },
    {
      id: 119,
      name: 'Kartik',
      avatarBg: '#388e3c',
      initial: 'K',
      meta: 'Local Guide • 12 reviews • 1 photo',
      time: 'a day ago',
      stars: 4.8,
      text: 'Akhil did an outstanding job for my Mehndi night! The seating lounge they designed was so comfortable and looked completely luxurious. The lighting was magical as the sun went down',
      images: [lightedArchway]
    },
    {
      id: 120,
      name: 'Rahul Singh',
      avatarBg: '#455a64',
      initial: 'R',
      meta: 'Local Guide • 13 reviews • 1 photo',
      time: 'a day ago',
      stars: 4.8,
      text: 'The energy and styling Ramji Events brought to our Haldi function was incredible. The seating arrangement for the bride and groom was gorgeous and perfect for pictures. Highly professional team',
      images: [rooftopHaldi]
    },
    {
      id: 121,
      name: 'Kundan Kumar',
      avatarBg: '#3949ab',
      initial: 'K',
      meta: 'Local Guide • 26 reviews • 1 photo',
      time: 'a day ago',
      stars: 4.5,
      text: 'We hired Akhil for a Haldi ceremony, and they completely transformed the space. The traditional yet modern aesthetic was exactly what we wanted. The live snack counters kept our guests happy and well-fed throughout the day',
      images: [kundanHaldi]
    },
    {
      id: 122,
      name: 'Shailendra Kumar',
      avatarBg: '#3f51b5',
      initial: 'S',
      meta: '1 review',
      time: '6 months ago',
      stars: 4.2,
      text: 'Great service and management!'
    },
    {
      id: 123,
      name: 'Shyam Rathour',
      avatarBg: '#00bcd4',
      initial: 'S',
      meta: '1 review',
      time: '6 months ago',
      stars: 4.2,
      text: 'Highly recommended for event planning.'
    },
    {
      id: 124,
      name: 'SHIVAM SHARMA',
      avatarBg: '#4caf50',
      initial: 'S',
      meta: '1 review',
      time: '7 months ago',
      stars: 4.2,
      text: 'Very professional team and delicious food.'
    },
    {
      id: 125,
      name: 'Alok Thakur',
      avatarBg: '#ff9800',
      initial: 'A',
      meta: '7 reviews',
      time: '7 months ago',
      stars: 4.2,
    }
  ])

  // Form helper functions
  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map(file => URL.createObjectURL(file));
    setNewReviewPhotos(prev => [...prev, ...urls]);
  }

  const resetForm = () => {
    setNewReviewName('');
    setNewReviewRating(0);
    setHoveredStar(0);
    setNewReviewText('');
    setNewReviewPhotos([]);
  }

  const handlePostReview = () => {
    if (newReviewRating === 0) return;
    const newReview = {
      id: Date.now(),
      name: newReviewName || 'Guest Reviewer',
      avatarBg: '#d32f2f', // Red profile background like in Radhe Radhe
      initial: (newReviewName || 'G')[0].toUpperCase(),
      meta: `${newReviewPhotos.length > 0 ? 'Local Guide • ' : ''}1 review${newReviewPhotos.length > 0 ? ` • ${newReviewPhotos.length} photo${newReviewPhotos.length > 1 ? 's' : ''}` : ''}`,
      time: 'Just now',
      stars: newReviewRating,
      text: newReviewText || 'Excellent service and management by Ramji Events!',
      images: newReviewPhotos.length > 0 ? newReviewPhotos : undefined
    };
    setGoogleReviews([newReview, ...googleReviews]);
    setWriteReviewModalOpen(false);
    resetForm();
  }

  // Calculate dynamic average rating and star percentages
  const totalReviews = googleReviews.length;
  const ratingSum = googleReviews.reduce((sum, item) => sum + item.stars, 0);
  const averageRating = totalReviews > 0 ? (ratingSum / totalReviews).toFixed(1) : '5.0';
  const averageRatingNum = parseFloat(averageRating);
  
  const fifthStarFill = averageRatingNum > 4 && averageRatingNum < 5 
    ? `${(averageRatingNum - 4) * 100}%` 
    : averageRatingNum >= 5 ? '100%' : '0%';

  return (
    <div className="services-page quote-page testimonials-page">
      {/* Header Banner */}
      <div className="services-header-banner quote-header-banner" style={{ backgroundImage: `url(${heroImg})` }}>
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
            <span className="breadcrumb-active">TESTIMONIALS</span>
          </div>
          <span className="services-subtitle">TESTIMONIALS</span>
          <h1 className="services-title">Stories From Our Clients</h1>
          <p className="services-lead">
            Over 500 celebrations, thousands of happy guests, and countless memories made.
          </p>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="testimonials-tabs-wrapper">
        <div className="testimonials-tabs-container">
          <button 
            className={`testimonials-tab-btn ${activeTab === 'featured' ? 'active' : ''}`}
            onClick={() => setActiveTab('featured')}
          >
            Featured Stories
          </button>
          <button 
            className={`testimonials-tab-btn ${activeTab === 'google' ? 'active' : ''}`}
            onClick={() => setActiveTab('google')}
          >
            Google Reviews ({googleReviews.length})
          </button>
        </div>
      </div>

      {/* Testimonials Detail Grid & Google Reviews Section */}
      <div className="testimonials-grid-container">
        {activeTab === 'featured' ? (
          <div className="testimonials-detail-grid">
            {testimonials.map(item => (
              <div key={item.id} className="testimonial-detail-card animate-fade-in">
                <div className="testimonial-card-profile">
                  <div className="testimonial-card-avatar">
                    <img src={item.image} alt={item.name} loading="lazy" />
                  </div>
                  <div className="testimonial-card-meta-info">
                    <h3 className="testimonial-card-name">{item.name}</h3>
                    <span className="testimonial-card-category">{item.category}</span>
                  </div>
                </div>
                
                <div className="testimonial-card-stars">
                  {Array.from({ length: item.stars }).map((_, idx) => (
                    <span key={idx} className="star-gold">★</span>
                  ))}
                </div>

                <p className="testimonial-card-text">{item.text}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="google-reviews-section-wrapper">
            {/* Google Reviews Header Card */}
            <div className="google-reviews-summary-card">
              <div className="google-summary-left">
                <div className="google-logo-large">
                  <svg viewBox="0 0 24 24" width="48" height="48">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                  </svg>
                </div>
                <div className="google-summary-info">
                  <h2 className="google-summary-title">Google Customer Reviews</h2>
                  <div className="google-rating-score">
                    <span className="rating-score-num">4.7</span>
                    <div className="google-stars-row">
                      <span className="star-gold">★</span>
                      <span className="star-gold">★</span>
                      <span className="star-gold">★</span>
                      <span className="star-gold">★</span>
                      <span className="star-gold-container" style={{ position: 'relative', display: 'inline-block' }}>
                        <span className="star-muted">★</span>
                        <span className="star-gold" style={{ 
                          position: 'absolute', 
                          top: 0, 
                          left: 0, 
                          overflow: 'hidden', 
                          width: '70%',
                          display: 'inline-block'
                        }}>★</span>
                      </span>
                    </div>
                    <span className="rating-count">(Based on client feedback)</span>
                  </div>
                </div>
              </div>

              {/* Action to write a review */}
              <div className="google-reviews-action">
                <button 
                  onClick={() => setWriteReviewModalOpen(true)}
                  className="google-write-review-btn"
                >
                  Write a Review
                </button>
              </div>
            </div>

            {/* Google Reviews List */}
            <div className="google-reviews-list">
              {googleReviews.length > 0 ? (
                googleReviews.map(item => (
                  <div key={item.id} className="google-review-card animate-fade-in">
                    <div className="google-review-header">
                      <div className="google-avatar" style={{ backgroundColor: item.avatarBg }}>
                        {item.initial}
                      </div>
                      <div className="google-user-info">
                        <div className="google-user-name-row">
                          <h3 className="google-user-name">{item.name}</h3>
                          <span className="google-verified-badge">Verified Reviewer</span>
                        </div>
                        <span className="google-user-meta">{item.meta} • {item.time}</span>
                      </div>
                      <div className="google-g-logo">
                        <svg viewBox="0 0 24 24" width="18" height="18">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                        </svg>
                      </div>
                    </div>
                    
                    <div className="google-stars-row">
                      <div className="testimonial-card-stars">
                        {Array.from({ length: 5 }).map((_, idx) => {
                          const ratingVal = idx + 1;
                          if (item.stars >= ratingVal) {
                            return <span key={idx} className="star-gold">★</span>;
                          } else if (item.stars > idx && item.stars < ratingVal) {
                            const fillPercentage = (item.stars - idx) * 100;
                            return (
                              <span key={idx} className="star-gold-container" style={{ position: 'relative', display: 'inline-block' }}>
                                <span className="star-muted">★</span>
                                <span className="star-gold" style={{ 
                                  position: 'absolute', 
                                  top: 0, 
                                  left: 0, 
                                  overflow: 'hidden', 
                                  width: `${fillPercentage}%`,
                                  display: 'inline-block'
                                }}>★</span>
                              </span>
                            );
                          } else {
                            return <span key={idx} className="star-muted">★</span>;
                          }
                        })}
                      </div>
                      <span className="google-rating-text">
                        {item.stars % 1 === 0 ? item.stars + '.0' : item.stars} / 5.0 Rating
                      </span>
                    </div>

                    <p className="google-review-text">"{item.text}"</p>

                    {item.images && item.images.length > 0 && (
                      <div className="google-review-gallery">
                        {item.images.map((img, imgIdx) => (
                          <div 
                            key={imgIdx} 
                            className="google-review-img-wrapper"
                            onClick={() => setLightboxImage(img)}
                          >
                            <img src={img} alt={`Ceremony setup photo ${imgIdx + 1}`} loading="lazy" />
                            <div className="google-img-overlay">
                              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                <line x1="11" y1="8" x2="11" y2="14"></line>
                                <line x1="8" y1="11" x2="14" y2="11"></line>
                              </svg>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))
              ) : null}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className="google-lightbox-modal" onClick={() => setLightboxImage(null)}>
          <div className="google-lightbox-content" onClick={e => e.stopPropagation()}>
            <button className="google-lightbox-close" onClick={() => setLightboxImage(null)}>
              &times;
            </button>
            <img src={lightboxImage} alt="Ceremony Backdrop Preview" className="google-lightbox-img" />
          </div>
        </div>
      )}

      {/* Write a Review Modal */}
      {writeReviewModalOpen && (
        <div className="google-write-modal-overlay" onClick={() => { setWriteReviewModalOpen(false); resetForm(); }}>
          <div className="google-write-modal-container" onClick={e => e.stopPropagation()}>
            <div className="google-write-modal-header">
              <h3>Ramji events & Caterers</h3>
            </div>
            
            <div className="google-write-modal-body">
              {/* User info row */}
              <div className="google-write-user-row">
                <div className="google-write-avatar" style={{ backgroundColor: '#d32f2f' }}>
                  {newReviewName ? newReviewName[0].toUpperCase() : 'R'}
                </div>
                <div className="google-write-user-info">
                  <input 
                    type="text" 
                    placeholder="Radhe Radhe" 
                    value={newReviewName} 
                    onChange={e => setNewReviewName(e.target.value)}
                    className="google-write-name-input"
                  />
                  <span className="google-write-subtext">
                    Posting publicly across Google <span className="info-icon">ⓘ</span>
                  </span>
                </div>
              </div>

              {/* Star Rating selector */}
              <div className="google-write-stars-selector">
                {[1, 2, 3, 4, 5].map(starNum => {
                  const isHighlighted = starNum <= (hoveredStar || newReviewRating);
                  return (
                    <span 
                      key={starNum} 
                      className={`write-star-btn ${isHighlighted ? 'star-gold' : 'star-muted'}`}
                      onMouseEnter={() => setHoveredStar(starNum)}
                      onMouseLeave={() => setHoveredStar(0)}
                      onClick={() => setNewReviewRating(starNum)}
                    >
                      ★
                    </span>
                  );
                })}
              </div>

              {/* Review Text Box */}
              <div className="google-write-textbox-wrapper">
                <textarea 
                  placeholder="Share details of your own experience at this place" 
                  value={newReviewText}
                  onChange={e => setNewReviewText(e.target.value)}
                  className="google-write-textarea"
                />
              </div>

              {/* Photo Upload Row */}
              <div className="google-write-photo-upload-wrapper">
                <label className="google-write-photo-btn">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                    <circle cx="12" cy="13" r="4"></circle>
                  </svg>
                  <span>Add photos & videos</span>
                  <input 
                    type="file" 
                    multiple 
                    accept="image/*" 
                    onChange={handlePhotoUpload} 
                    style={{ display: 'none' }}
                  />
                </label>

                {newReviewPhotos.length > 0 && (
                  <div className="google-write-preview-thumbnails">
                    {newReviewPhotos.map((img, idx) => (
                      <div key={idx} className="google-write-thumb-wrapper">
                        <img src={img} alt="Preview thumbnail" loading="lazy" />
                        <button 
                          className="google-write-thumb-remove" 
                          onClick={() => setNewReviewPhotos(prev => prev.filter((_, i) => i !== idx))}
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="google-write-modal-footer">
              <button 
                className="google-write-cancel-btn" 
                onClick={() => {
                  setWriteReviewModalOpen(false);
                  resetForm();
                }}
              >
                Cancel
              </button>
              <button 
                className={`google-write-post-btn ${newReviewRating > 0 ? 'active' : ''}`}
                disabled={newReviewRating === 0}
                onClick={handlePostReview}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Satisfaction Rate Banner */}
      <div className="satisfaction-banner-section">
        <div className="satisfaction-banner-card">
          <span className="satisfaction-percentage">98%</span>
          <h3 className="satisfaction-title">CLIENT SATISFACTION RATE</h3>
          <p className="satisfaction-desc">
            Based on post-event surveys conducted across 500+ events since 2002.
          </p>
        </div>
      </div>
    </div>
  )
}

