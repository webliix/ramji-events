import { useState } from 'react'
import heroImg from '../assets/hero.png'

export default function BookConsultation({ navigateTo }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    service: 'Wedding Planning',
    preferredDate: '',
    timeSlot: '02:00 PM',
    fullName: '',
    email: '',
    phone: '',
    eventOverview: ''
  })
  
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formErrors, setFormErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear validation error when changed
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const selectOption = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const validateStep = (step) => {
    const errors = {}
    if (step === 2) {
      if (!formData.preferredDate) {
        errors.preferredDate = 'Please select a preferred date'
      } else {
        const day = new Date(formData.preferredDate).getDay()
        if (day === 0) { // Sunday is 0
          errors.preferredDate = 'Consultations are only available Monday through Saturday'
        }
      }
    } else if (step === 4) {
      if (!formData.fullName.trim()) errors.fullName = 'Full name is required'
      if (!formData.email.trim()) {
        errors.email = 'Email address is required'
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = 'Please enter a valid email address'
      }
      if (!formData.phone.trim()) {
        errors.phone = 'Phone number is required'
      }
    }
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1)
      window.scrollTo({ top: 400, behavior: 'smooth' })
    }
  }

  const handleBack = () => {
    setCurrentStep(prev => prev - 1)
    window.scrollTo({ top: 400, behavior: 'smooth' })
  }

  const resetForm = () => {
    setFormData({
      service: 'Wedding Planning',
      preferredDate: '',
      timeSlot: '02:00 PM',
      fullName: '',
      email: '',
      phone: '',
      eventOverview: ''
    })
    setIsSubmitted(false)
    setCurrentStep(1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateStep(4)) return

    setIsSubmitting(true)

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": "consultation",
          ...formData
        }).toString()
      })

      if (response.ok) {
        setIsSubmitted(true)
        setCurrentStep(5)
      } else {
        alert("There was an error booking your consultation. Please try again.")
      }
    } catch (error) {
      console.error("Booking error:", error)
      alert("Something went wrong. Please check your network connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStepIndicator = () => {
    const steps = [
      { num: 1, label: 'SERVICE' },
      { num: 2, label: 'DATE' },
      { num: 3, label: 'TIME' },
      { num: 4, label: 'DETAILS' },
      { num: 5, label: 'CONFIRM' }
    ]

    return (
      <div className="quote-step-indicator-wrapper consult-indicator-wrapper">
        <div className="quote-step-progress-bar">
          <div 
            className="quote-step-progress-fill" 
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
        <div className="quote-step-indicator-nodes">
          {steps.map(step => {
            const isCompleted = step.num < currentStep || (step.num === 5 && isSubmitted)
            const isActive = step.num === currentStep && !(step.num === 5 && isSubmitted)
            return (
              <div key={step.num} className={`quote-step-node-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
                <div className="quote-step-node-circle">
                  {isCompleted ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="node-checkmark">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  ) : (
                    <span>{step.num}</span>
                  )}
                </div>
                <span className="quote-step-node-label">{step.label}</span>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="services-page quote-page consult-page">
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
            <span className="breadcrumb-active">BOOK CONSULTATION</span>
          </div>
          <span className="services-subtitle">FREE CONSULTATION</span>
          <h1 className="services-title">Book Your Consultation</h1>
          <p className="services-lead">
            45-minute session with a senior planner — no obligations, just clarity.
          </p>
        </div>
      </div>

      <div className="quote-form-wizard-container">
        <div className="quote-form-wizard-card">
          
          {/* Step indicators */}
          {renderStepIndicator()}

          {/* Form Content */}
          <form className="quote-wizard-form" onSubmit={handleSubmit} name="consultation" method="POST" data-netlify="true">
            <input type="hidden" name="form-name" value="consultation" />

            {/* STEP 1: SERVICE SELECTION */}
            {currentStep === 1 && (
              <div className="quote-step-view animate-fade-in">
                <h3 className="quote-step-title">Step 1 — What service are you interested in?</h3>
                <p className="quote-step-subtitle-hint">Select the primary service you'd like to discuss.</p>

                <div className="quote-budget-cards-grid consult-services-grid">
                  {[
                    'Wedding Planning',
                    'Destination Wedding',
                    'Corporate Event',
                    'Conference / Summit',
                    'Product Launch',
                    'Birthday Celebration',
                    'Luxury Event',
                    'Venue Management'
                  ].map(srv => (
                    <div
                      key={srv}
                      className={`quote-budget-card consult-service-card ${formData.service === srv ? 'selected' : ''}`}
                      onClick={() => selectOption('service', srv)}
                    >
                      <div className="budget-card-amount consult-service-name">{srv}</div>
                    </div>
                  ))}
                </div>

                <div className="quote-form-actions">
                  <div></div>
                  <button type="button" className="btn-filled quote-nav-btn next-btn" onClick={handleNext}>
                    CONTINUE &rarr; CHOOSE DATE
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: CHOOSE DATE */}
            {currentStep === 2 && (
              <div className="quote-step-view animate-fade-in">
                <h3 className="quote-step-title">Step 2 — Choose a preferred date</h3>
                <p className="quote-step-subtitle-hint">Consultations are available Monday through Saturday.</p>

                <div className="form-group date-picker-group">
                  <input
                    type="date"
                    name="preferredDate"
                    id="preferredDate"
                    className={`form-input form-date-picker ${formErrors.preferredDate ? 'input-error' : ''}`}
                    value={formData.preferredDate}
                    onChange={handleChange}
                    required
                  />
                  {formErrors.preferredDate && <span className="error-message-text">{formErrors.preferredDate}</span>}
                </div>

                <div className="quote-form-actions">
                  <button type="button" className="btn-outline quote-nav-btn back-btn" onClick={handleBack}>
                    &larr; BACK
                  </button>
                  <button type="button" className="btn-filled quote-nav-btn next-btn" onClick={handleNext}>
                    CONTINUE &rarr; CHOOSE TIME
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: CHOOSE TIME SLOT */}
            {currentStep === 3 && (
              <div className="quote-step-view animate-fade-in">
                <h3 className="quote-step-title">Step 3 — Choose a time slot</h3>
                <p className="quote-step-subtitle-hint">All times are in Indian Standard Time (IST).</p>

                <div className="quote-budget-cards-grid consult-time-grid">
                  {[
                    '09:00 AM', '10:00 AM', '11:00 AM',
                    '12:00 PM', '02:00 PM', '03:00 PM',
                    '04:00 PM', '05:00 PM', '06:00 PM'
                  ].map(time => (
                    <div
                      key={time}
                      className={`quote-budget-card consult-time-card ${formData.timeSlot === time ? 'selected' : ''}`}
                      onClick={() => selectOption('timeSlot', time)}
                    >
                      <div className="budget-card-amount consult-time-value">{time}</div>
                    </div>
                  ))}
                </div>

                <div className="quote-form-actions">
                  <button type="button" className="btn-outline quote-nav-btn back-btn" onClick={handleBack}>
                    &larr; BACK
                  </button>
                  <button type="button" className="btn-filled quote-nav-btn next-btn" onClick={handleNext}>
                    CONTINUE &rarr; YOUR DETAILS
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: CONTACT DETAILS */}
            {currentStep === 4 && (
              <div className="quote-step-view animate-fade-in">
                <h3 className="quote-step-title">Step 4 — Your Contact Details</h3>
                <p className="quote-step-subtitle-hint">You will receive a call within 2hrs.</p>

                <div className="form-group">
                  <label className="form-label" htmlFor="fullName">FULL NAME *</label>
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    className={`form-input ${formErrors.fullName ? 'input-error' : ''}`}
                    placeholder="Your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                  />
                  {formErrors.fullName && <span className="error-message-text">{formErrors.fullName}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="email">EMAIL ADDRESS *</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className={`form-input ${formErrors.email ? 'input-error' : ''}`}
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  {formErrors.email && <span className="error-message-text">{formErrors.email}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="phone">PHONE NUMBER *</label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    className={`form-input ${formErrors.phone ? 'input-error' : ''}`}
                    placeholder="+91 00000 00000"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                  {formErrors.phone && <span className="error-message-text">{formErrors.phone}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="eventOverview">EVENT OVERVIEW (OPTIONAL)</label>
                  <textarea
                    name="eventOverview"
                    id="eventOverview"
                    className="form-input form-textarea"
                    placeholder="Briefly describe your event — location, guest count, date if known..."
                    value={formData.eventOverview}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="quote-form-actions">
                  <button type="button" className="btn-outline quote-nav-btn back-btn" onClick={handleBack} disabled={isSubmitting}>
                    &larr; BACK
                  </button>
                  <button type="submit" className="btn-filled quote-nav-btn submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? 'BOOKING...' : 'REVIEW BOOKING \u2192'}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: SUCCESS & SUMMARY SCREEN */}
            {currentStep === 5 && isSubmitted && (
              <div className="quote-step-view quote-success-view consult-success-view animate-fade-in">
                <div className="quote-success-icon-wrapper consult-success-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="success-checkmark">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                
                <h2 className="success-headline">CONSULTATION CONFIRMED!</h2>
                <p className="success-copy consult-success-copy">
                  You will receive a call within 2hrs. We look forward to hearing your vision.
                </p>

                {/* Summary Box */}
                <div className="consultation-summary-card">
                  <div className="summary-row">
                    <span className="summary-label">Service</span>
                    <span className="summary-value">{formData.service}</span>
                  </div>
                  <div className="summary-row">
                    <span className="summary-label">Date</span>
                    <span className="summary-value">{formData.preferredDate}</span>
                  </div>
                  <div className="summary-row">
                    <span className="summary-label">Time</span>
                    <span className="summary-value">{formData.timeSlot}</span>
                  </div>
                  <div className="summary-row">
                    <span className="summary-label">Name</span>
                    <span className="summary-value">{formData.fullName}</span>
                  </div>
                </div>

                <div className="success-actions consult-success-actions">
                  <button type="button" className="btn-outline return-home-btn" onClick={resetForm}>
                    BOOK ANOTHER
                  </button>
                  <button type="button" className="btn-filled return-home-btn" onClick={() => navigateTo('home')}>
                    RETURN TO HOME
                  </button>
                </div>
              </div>
            )}

          </form>
        </div>
      </div>
    </div>
  )
}
