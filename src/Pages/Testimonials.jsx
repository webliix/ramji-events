import { useState } from 'react'
import heroImg from '../assets/hero.png'
import rameshJoshi from '../assets/ramesh_joshi.png'
import ananyaSharma from '../assets/ananya_sharma.png'
import vikramMalhotra from '../assets/vikram_malhotra.png'
import sunitaKapoor from '../assets/sunita_kapoor.png'
import deepikaNair from '../assets/deepika_nair.png'

export default function Testimonials({ navigateTo }) {
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

      {/* Testimonials Grid Section */}
      <div className="testimonials-grid-container">
        <div className="testimonials-detail-grid">
          {testimonials.map(item => (
            <div key={item.id} className="testimonial-detail-card animate-fade-in">
              <div className="testimonial-card-profile">
                <div className="testimonial-card-avatar">
                  <img src={item.image} alt={item.name} />
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
      </div>

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
