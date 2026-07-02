import { useState } from 'react'
import heroImg from '../assets/hero.png'

export default function GetQuote({ navigateTo }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    eventType: 'Wedding Planning',
    expectedGuests: '100 - 250',
    eventDate: '',
    eventDuration: '1 Day',
    hasVenue: 'Undecided',
    preferredVenueType: 'Banquet Hall',
    preferredLocation: '',
    budgetRange: '₹15L – ₹30L',
    budgetFlexibility: 'Flexible',
    servicesNeeded: [],
    specialNotes: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
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

  const handleCheckboxChange = (serviceName) => {
    setFormData(prev => {
      const current = prev.servicesNeeded
      const updated = current.includes(serviceName)
        ? current.filter(item => item !== serviceName)
        : [...current, serviceName]
      return { ...prev, servicesNeeded: updated }
    })
  }

  const selectOption = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // Validate the current step before proceeding
  const validateStep = (step) => {
    const errors = {}
    if (step === 1) {
      if (!formData.eventDate) errors.eventDate = 'Event date is required'
    } else if (step === 5) {
      if (!formData.firstName.trim()) errors.firstName = 'First name is required'
      if (!formData.lastName.trim()) errors.lastName = 'Last name is required'
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateStep(5)) return

    setIsSubmitting(true)

    // Convert checkboxes array to comma-separated string for Netlify submission
    const submissionData = {
      ...formData,
      servicesNeeded: formData.servicesNeeded.join(', ')
    }

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": "quote",
          ...submissionData
        }).toString()
      })

      if (response.ok) {
        setIsSubmitted(true)
        setCurrentStep(6)
      } else {
        alert("There was an error submitting your request. Please try again.")
      }
    } catch (error) {
      console.error("Submission error:", error)
      alert("Something went wrong. Please check your network connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderStepIndicator = () => {
    const steps = [
      { num: 1, label: 'EVENT' },
      { num: 2, label: 'VENUE' },
      { num: 3, label: 'BUDGET' },
      { num: 4, label: 'SERVICES' },
      { num: 5, label: 'CONTACT' },
      { num: 6, label: 'FINISH' }
    ]

    return (
      <div className="quote-step-indicator-wrapper">
        <div className="quote-step-progress-bar">
          <div 
            className="quote-step-progress-fill" 
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          ></div>
        </div>
        <div className="quote-step-indicator-nodes">
          {steps.map(step => {
            const isCompleted = step.num < currentStep || (step.num === 6 && isSubmitted)
            const isActive = step.num === currentStep && !(step.num === 6 && isSubmitted)
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
    <div className="services-page quote-page">
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
            <span className="breadcrumb-active">GET QUOTE</span>
          </div>
          <span className="services-subtitle">TAILORED EXPERIENCES</span>
          <h1 className="services-title">Request a Custom Quote</h1>
          <p className="services-lead">
            Complete this form and receive a detailed, bespoke proposal within 24 hours.
          </p>
        </div>
      </div>

      <div className="quote-form-wizard-container">
        <div className="quote-form-wizard-card">
          
          {/* Step indicators */}
          {renderStepIndicator()}

          {/* Form Content */}
          <form className="quote-wizard-form" onSubmit={handleSubmit} name="quote" method="POST" data-netlify="true">
            <input type="hidden" name="form-name" value="quote" />

            {/* STEP 1: EVENT INFORMATION */}
            {currentStep === 1 && (
              <div className="quote-step-view animate-fade-in">
                <h3 className="quote-step-title">Step 1 — Event Information</h3>
                
                <div className="form-group">
                  <label className="form-label" htmlFor="eventType">EVENT TYPE *</label>
                  <select
                    name="eventType"
                    id="eventType"
                    className="form-input form-select"
                    value={formData.eventType}
                    onChange={handleChange}
                    required
                  >
                    <option value="Wedding Planning">Wedding Planning</option>
                    <option value="Corporate Event">Corporate Event</option>
                    <option value="Catering Service">Catering Service</option>
                    <option value="Venue Booking">Venue Booking</option>
                    <option value="Social Event">Social Event</option>
                    <option value="Other">Other / Custom</option>
                  </select>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="expectedGuests">EXPECTED GUESTS *</label>
                    <select
                      name="expectedGuests"
                      id="expectedGuests"
                      className="form-input form-select"
                      value={formData.expectedGuests}
                      onChange={handleChange}
                      required
                    >
                      <option value="Under 50">Under 50</option>
                      <option value="50 - 100">50 - 100</option>
                      <option value="100 - 250">100 - 250</option>
                      <option value="250 - 500">250 - 500</option>
                      <option value="500 - 1000">500 - 1000</option>
                      <option value="1000+">1000+ Guests</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label" htmlFor="eventDate">EVENT DATE *</label>
                    <input
                      type="date"
                      name="eventDate"
                      id="eventDate"
                      className={`form-input form-date-picker ${formErrors.eventDate ? 'input-error' : ''}`}
                      value={formData.eventDate}
                      onChange={handleChange}
                      required
                    />
                    {formErrors.eventDate && <span className="error-message-text">{formErrors.eventDate}</span>}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="eventDuration">EVENT DURATION *</label>
                  <select
                    name="eventDuration"
                    id="eventDuration"
                    className="form-input form-select"
                    value={formData.eventDuration}
                    onChange={handleChange}
                    required
                  >
                    <option value="1 Day">1 Day</option>
                    <option value="2 Days">2 Days</option>
                    <option value="3 Days">3 Days</option>
                    <option value="More than 3 Days">More than 3 Days</option>
                  </select>
                </div>

                <div className="quote-form-actions">
                  <div></div>
                  <button type="button" className="btn-filled quote-nav-btn next-btn" onClick={handleNext}>
                    NEXT &rarr; VENUE INFORMATION
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: VENUE INFORMATION */}
            {currentStep === 2 && (
              <div className="quote-step-view animate-fade-in">
                <h3 className="quote-step-title">Step 2 — Venue Information</h3>

                <div className="form-group">
                  <label className="form-label">DO YOU HAVE A VENUE IN MIND? *</label>
                  <div className="quote-selection-buttons-row">
                    {['Yes, I have a venue', 'No, help me find one', 'Undecided'].map(val => (
                      <button
                        key={val}
                        type="button"
                        className={`quote-pill-btn ${formData.hasVenue === val ? 'selected' : ''}`}
                        onClick={() => selectOption('hasVenue', val)}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="preferredVenueType">PREFERRED VENUE TYPE</label>
                  <select
                    name="preferredVenueType"
                    id="preferredVenueType"
                    className="form-input form-select"
                    value={formData.preferredVenueType}
                    onChange={handleChange}
                  >
                    <option value="Banquet Hall">Banquet Hall</option>
                    <option value="Lawn / Garden">Lawn / Garden</option>
                    <option value="Hotel / Resort">Hotel / Resort</option>
                    <option value="Poolside">Poolside</option>
                    <option value="Beachside">Beachside</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="preferredLocation">PREFERRED LOCATION / CITY</label>
                  <input
                    type="text"
                    name="preferredLocation"
                    id="preferredLocation"
                    className="form-input"
                    placeholder="e.g. Udaipur, Mumbai, Noida, Delhi..."
                    value={formData.preferredLocation}
                    onChange={handleChange}
                  />
                </div>

                <div className="quote-form-actions">
                  <button type="button" className="btn-outline quote-nav-btn back-btn" onClick={handleBack}>
                    &larr; BACK
                  </button>
                  <button type="button" className="btn-filled quote-nav-btn next-btn" onClick={handleNext}>
                    NEXT &rarr; BUDGET
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: BUDGET INFORMATION */}
            {currentStep === 3 && (
              <div className="quote-step-view animate-fade-in">
                <h3 className="quote-step-title">Step 3 — Budget Information</h3>

                <div className="form-group">
                  <label className="form-label">ESTIMATED BUDGET RANGE *</label>
                  <div className="quote-budget-cards-grid">
                    {[
                      { value: '₹5L – ₹15L', label: '₹5 Lakhs – ₹15 Lakhs' },
                      { value: '₹15L – ₹30L', label: '₹15 Lakhs – ₹30 Lakhs' },
                      { value: '₹30L – ₹75L', label: '₹30 Lakhs – ₹75 Lakhs' },
                      { value: '₹75L – ₹1.5Cr', label: '₹75 Lakhs – ₹1.5 Crore' },
                      { value: '₹1.5Cr – ₹3Cr', label: '₹1.5 Crore – ₹3 Crore' },
                      { value: '₹3Cr+', label: '₹3 Crore +' }
                    ].map(card => (
                      <div
                        key={card.value}
                        className={`quote-budget-card ${formData.budgetRange === card.value ? 'selected' : ''}`}
                        onClick={() => selectOption('budgetRange', card.value)}
                      >
                        <div className="budget-card-amount">{card.value}</div>
                        <div className="budget-card-range">{card.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">BUDGET FLEXIBILITY *</label>
                  <div className="quote-selection-buttons-row">
                    {['Strict', 'Somewhat flexible', 'Flexible'].map(flex => (
                      <button
                        key={flex}
                        type="button"
                        className={`quote-pill-btn ${formData.budgetFlexibility === flex ? 'selected' : ''}`}
                        onClick={() => selectOption('budgetFlexibility', flex)}
                      >
                        {flex}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="quote-form-actions">
                  <button type="button" className="btn-outline quote-nav-btn back-btn" onClick={handleBack}>
                    &larr; BACK
                  </button>
                  <button type="button" className="btn-filled quote-nav-btn next-btn" onClick={handleNext}>
                    NEXT &rarr; SERVICES
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: ADDITIONAL REQUIREMENTS */}
            {currentStep === 4 && (
              <div className="quote-step-view animate-fade-in">
                <h3 className="quote-step-title">Step 4 — Additional Requirements</h3>

                <div className="form-group">
                  <label className="form-label">WHICH ADDITIONAL SERVICES DO YOU NEED?</label>
                  <div className="quote-services-checkboxes-grid">
                    {[
                      'Catering & F&B',
                      'Event Decoration',
                      'Entertainment',
                      'Photography & Video',
                      'Guest Transport'
                    ].map(service => {
                      const isChecked = formData.servicesNeeded.includes(service)
                      return (
                        <div
                          key={service}
                          className={`quote-service-checkbox-card ${isChecked ? 'checked' : ''}`}
                          onClick={() => handleCheckboxChange(service)}
                        >
                          <div className={`checkbox-custom-box ${isChecked ? 'active' : ''}`}>
                            {isChecked && (
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            )}
                          </div>
                          <span className="checkbox-card-label">{service}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="specialNotes">SPECIAL REQUIREMENTS OR NOTES</label>
                  <textarea
                    name="specialNotes"
                    id="specialNotes"
                    className="form-input form-textarea"
                    placeholder="Dietary restrictions, theme preferences, special guests, unique requests..."
                    value={formData.specialNotes}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="quote-form-actions">
                  <button type="button" className="btn-outline quote-nav-btn back-btn" onClick={handleBack}>
                    &larr; BACK
                  </button>
                  <button type="button" className="btn-filled quote-nav-btn next-btn" onClick={handleNext}>
                    NEXT &rarr; YOUR DETAILS
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: CONTACT INFORMATION */}
            {currentStep === 5 && (
              <div className="quote-step-view animate-fade-in">
                <h3 className="quote-step-title">Step 5 — Contact Information</h3>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label" htmlFor="firstName">FIRST NAME *</label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      className={`form-input ${formErrors.firstName ? 'input-error' : ''}`}
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                    {formErrors.firstName && <span className="error-message-text">{formErrors.firstName}</span>}
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="lastName">LAST NAME *</label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      className={`form-input ${formErrors.lastName ? 'input-error' : ''}`}
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                    {formErrors.lastName && <span className="error-message-text">{formErrors.lastName}</span>}
                  </div>
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

                <div className="quote-form-actions">
                  <button type="button" className="btn-outline quote-nav-btn back-btn" onClick={handleBack} disabled={isSubmitting}>
                    &larr; BACK
                  </button>
                  <button type="submit" className="btn-filled quote-nav-btn submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? 'SUBMITTING...' : 'SUBMIT QUOTE REQUEST'}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 6: SUCCESS SCREEN */}
            {currentStep === 6 && isSubmitted && (
              <div className="quote-step-view quote-success-view animate-fade-in">
                <div className="quote-success-icon-wrapper">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="success-checkmark">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <h2 className="success-headline">Thank You!</h2>
                <h3 className="success-subheadline">Your custom quote request has been received.</h3>
                <p className="success-copy">
                  Our event planning team will review your requirements and compile a custom, detailed proposal. We will email this to you at <strong>{formData.email}</strong> within 24 hours.
                </p>
                <div className="success-actions">
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
