import { useState } from 'react'
import heroImg from '../assets/hero.png'
import { contactDetails } from '../Data/contact.jsx'

export default function ContactPage({ navigateTo }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    inquiryType: 'Wedding Planning',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": "contact",
          ...formData
        }).toString()
      });

      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            inquiryType: 'Wedding Planning',
            message: ''
          });
        }, 2000);
      } else {
        alert("Error sending message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error sending your message. Please try again later.");
    }
  }

  return (
    <div className="services-page contact-page">
      {/* Contact Header Banner */}
      <div className="services-header-banner contact-header-banner" style={{ backgroundImage: `url(${heroImg})` }}>
        <div className="services-header-overlay"></div>
        <div className="services-header-content">
          <div className="breadcrumbs">
            <span className="breadcrumb-link" onClick={() => navigateTo('home')}>HOME</span>
            <span className="breadcrumb-separator">&gt;</span>
            <span className="breadcrumb-active">CONTACT</span>
          </div>
          <span className="services-subtitle">CONTACT</span>
          <h1 className="services-title">Let's Start a Conversation</h1>
          <p className="services-lead">
            Our team is ready to help you plan something extraordinary.
          </p>
        </div>
      </div>

      {/* Main Contact Section (Grid Layout) */}
      <div className="contact-grid-container">
        <div className="contact-grid">
          {/* Left Column: Contact Cards */}
          <div className="contact-info-col">
            {/* Card 1: Phone */}
            <div className="contact-info-card">
              <div className="contact-info-card-header">
                <div className="contact-info-icon-wrapper">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <h3 className="contact-info-card-title">PHONE</h3>
              </div>
              <div className="contact-info-card-content">
                <a href={contactDetails.phone.href}>{contactDetails.phone.label}</a>
              </div>
            </div>

            {/* Card 2: Email */}
            <div className="contact-info-card">
              <div className="contact-info-card-header">
                <div className="contact-info-icon-wrapper">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <h3 className="contact-info-card-title">EMAIL</h3>
              </div>
              <div className="contact-info-card-content">
                {contactDetails.emails.map((email, idx) => (
                  <a key={idx} href={email.href}>{email.label}</a>
                ))}
              </div>
            </div>

            {/* Card 3: Head Office */}
            <div className="contact-info-card">
              <div className="contact-info-card-header">
                <div className="contact-info-icon-wrapper">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <h3 className="contact-info-card-title">HEAD OFFICE</h3>
              </div>
              <div className="contact-info-card-content">
                <span>{contactDetails.headOffice.address}</span>
              </div>
            </div>

            {/* Card 4: Hours */}
            <div className="contact-info-card">
              <div className="contact-info-card-header">
                <div className="contact-info-icon-wrapper">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <h3 className="contact-info-card-title">HOURS</h3>
              </div>
              <div className="contact-info-card-content">
                <span>{contactDetails.hours}</span>
              </div>
            </div>

            {/* Card 5: Regional Offices */}
            <div className="contact-info-card regional-offices-card">
              <div className="contact-info-card-header">
                <div className="contact-info-icon-wrapper">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 21h18M9 21V9a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v12M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16"/>
                  </svg>
                </div>
                <h3 className="contact-info-card-title">REGIONAL OFFICES</h3>
              </div>
              <div className="contact-info-card-content regional-offices-list">
                {contactDetails.regionalOffices.map((office, idx) => (
                  <div key={idx} className="regional-office-item">
                    <span className="office-city">{office.city}</span>
                    <span className="office-phone">{office.phone}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* WhatsApp Card under Regional Offices */}
            <a 
              href={contactDetails.whatsApp.href} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="contact-whatsapp-banner"
            >
              <div className="whatsapp-banner-content">
                <div className="whatsapp-banner-icon-wrapper">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003 5.324 5.328 0 11.859 0c3.166.001 6.141 1.23 8.378 3.469 2.237 2.239 3.465 5.216 3.464 8.384-.003 6.536-5.328 11.86-11.859 11.86-2.007-.001-3.98-.51-5.733-1.482L0 24zm6.59-4.846c1.62.962 3.208 1.47 4.793 1.47 5.175 0 9.386-4.209 9.388-9.385.001-2.507-.975-4.864-2.747-6.638C16.309 2.827 13.96 1.85 11.859 1.85c-5.177 0-9.389 4.211-9.39 9.387-.001 1.693.463 3.344 1.341 4.796l-.99 3.616 3.737-.98c1.47.801 2.923 1.258 4.43 1.258zm9.833-7.142c-.27-.135-1.597-.788-1.845-.878-.247-.09-.427-.135-.607.135-.18.27-.697.878-.855 1.058-.158.18-.315.202-.585.067-.27-.135-1.14-.42-2.172-1.341-.803-.715-1.344-1.6-1.502-1.87-.158-.27-.017-.417.118-.552.122-.121.27-.315.405-.472.135-.158.18-.27.27-.45.09-.18.045-.337-.022-.472-.068-.135-.607-1.463-.833-2.003-.22-.53-.44-.457-.607-.466-.157-.008-.337-.01-.517-.01s-.472.067-.72.337c-.247.27-.945.923-.945 2.248s.967 2.599 1.103 2.78c.135.18 1.902 2.904 4.609 4.072.644.278 1.147.444 1.54.568.647.206 1.237.177 1.703.107.519-.078 1.597-.653 1.822-1.283.225-.63.225-1.17.158-1.283-.068-.112-.248-.18-.518-.315z" fill="currentColor" />
                  </svg>
                </div>
                <div className="whatsapp-banner-texts">
                  <span className="whatsapp-banner-title">WhatsApp for Instant Response</span>
                  <span className="whatsapp-banner-desc">Average response time: 15 minutes</span>
                </div>
              </div>
            </a>
          </div>

          {/* Right Column: Send Us A Message Form */}
          <div className="contact-form-col">
            <div className="contact-form-card">
              <h2 className="contact-form-title">Send Us A Message</h2>
              {isSubmitted ? (
                <div className="form-success-alert">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="success-checkmark">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <h3>Thank You!</h3>
                  <p>Your inquiry has been sent successfully. Our team will contact you shortly.</p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit} name="contact" method="POST" data-netlify="true">
                  <input type="hidden" name="form-name" value="contact" />
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label" htmlFor="firstName">FIRST NAME *</label>
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        className="form-input"
                        placeholder="First name"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label" htmlFor="lastName">LAST NAME *</label>
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        className="form-input"
                        placeholder="Last name"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="email">EMAIL ADDRESS *</label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="form-input"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="phone">PHONE NUMBER</label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      className="form-input"
                      placeholder="+91 00000 00000"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="inquiryType">INQUIRY TYPE *</label>
                    <select
                      name="inquiryType"
                      id="inquiryType"
                      className="form-input form-select"
                      value={formData.inquiryType}
                      onChange={handleChange}
                      required
                    >
                      <option value="Wedding Planning">Wedding Planning</option>
                      <option value="Corporate Event">Corporate Event</option>
                      <option value="Catering Service">Catering Service</option>
                      <option value="Venue Booking">Venue Booking</option>
                      <option value="Social Event">Social Event</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="message">MESSAGE *</label>
                    <textarea
                      name="message"
                      id="message"
                      className="form-input form-textarea"
                      placeholder="Tell us about your event, preferred dates, and any specific requirements..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="btn-filled form-submit-btn">
                    SEND MESSAGE
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="contact-map-section">
        <a 
          href={contactDetails.headOffice.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="map-placeholder"
        >
          <div className="map-pin-icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          </div>
          <span className="map-placeholder-text">
            Interactive map — Head Office: {contactDetails.headOffice.address}
          </span>
        </a>
      </div>
    </div>
  )
}
