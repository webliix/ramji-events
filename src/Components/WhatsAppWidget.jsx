import { useState, useEffect, useRef } from 'react';
import './WhatsAppWidget.css';

const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(() => {
    return localStorage.getItem('ramji_whatsapp_closed') !== 'true';
  });
  const [userMessage, setUserMessage] = useState('');
  const [selectedQuickInquiry, setSelectedQuickInquiry] = useState('');
  const widgetRef = useRef(null);

  const phoneNumber = '916392956850';

  // Toggle widget window
  const toggleWidget = () => {
    setIsOpen(!isOpen);
    if (showNotification) {
      setShowNotification(false);
      localStorage.setItem('ramji_whatsapp_closed', 'true');
    }
  };

  // Close widget window
  const closeWidget = (e) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  // Close widget if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (widgetRef.current && !widgetRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Show a welcome tooltip notification after 4 seconds
  useEffect(() => {
    const isClosed = localStorage.getItem('ramji_whatsapp_closed') === 'true';
    if (isClosed) {
      setShowNotification(false);
      return;
    }
    const timer = setTimeout(() => {
      // Only show if the user hasn't opened the widget yet
      if (!isOpen) {
        setShowNotification(true);
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, [isOpen]);

  // Quick inquiry selections
  const quickInquiries = [
    {
      label: '💍 Wedding Event Planning',
      text: 'Hi, I would like to inquire about wedding event planning and catering services.',
    },
    {
      label: '🍱 Birthday & Social Catering',
      text: 'Hi, I would like to inquire about catering services for a birthday or social event.',
    },
    {
      label: '💼 Corporate Events',
      text: 'Hi, I am interested in booking your services for a corporate conference/event.',
    },
    {
      label: '📞 General Consultation',
      text: 'Hello Ramji Events, I would like to schedule a consultation call.',
    },
  ];

  // Send message redirecting to WhatsApp
  const handleSendMessage = (e, textMessage) => {
    if (e) e.preventDefault();
    const finalMessage = textMessage || userMessage || 'Hello! I am interested in your events and catering services.';
    const encodedMessage = encodeURIComponent(finalMessage);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    
    // Reset/close states
    setIsOpen(false);
    setUserMessage('');
    setSelectedQuickInquiry('');
  };

  return (
    <div className="whatsapp-widget-container" ref={widgetRef}>
      {/* 1. Welcoming Tooltip (Notification Bubble) */}
      {showNotification && !isOpen && (
        <div className="whatsapp-tooltip-bubble">
          <div className="tooltip-header">
            <span>Ramji Events</span>
            <button className="tooltip-close" onClick={(e) => { 
              e.stopPropagation(); 
              setShowNotification(false); 
              localStorage.setItem('ramji_whatsapp_closed', 'true');
            }}>×</button>
          </div>
          <p>Namaste! Chat with us for quick bookings & quotes. 📞</p>
        </div>
      )}

      {/* 2. Floating Circular Button */}
      <button 
        className={`whatsapp-floating-trigger ${isOpen ? 'active' : ''}`} 
        onClick={toggleWidget}
        aria-label="Contact us on WhatsApp"
      >
        <span className="whatsapp-icon-wrapper">
          <svg viewBox="0 0 24 24" className="whatsapp-svg">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.003 5.324 5.328 0 11.859 0c3.166.001 6.141 1.23 8.378 3.469 2.237 2.239 3.465 5.216 3.464 8.384-.003 6.536-5.328 11.86-11.859 11.86-2.007-.001-3.98-.51-5.733-1.482L0 24zm6.59-4.846c1.62.962 3.208 1.47 4.793 1.47 5.175 0 9.386-4.209 9.388-9.385.001-2.507-.975-4.864-2.747-6.638C16.309 2.827 13.96 1.85 11.859 1.85c-5.177 0-9.389 4.211-9.39 9.387-.001 1.693.463 3.344 1.341 4.796l-.99 3.616 3.737-.98c1.47.801 2.923 1.258 4.43 1.258zm9.833-7.142c-.27-.135-1.597-.788-1.845-.878-.247-.09-.427-.135-.607.135-.18.27-.697.878-.855 1.058-.158.18-.315.202-.585.067-.27-.135-1.14-.42-2.172-1.341-.803-.715-1.344-1.6-1.502-1.87-.158-.27-.017-.417.118-.552.122-.121.27-.315.405-.472.135-.158.18-.27.27-.45.09-.18.045-.337-.022-.472-.068-.135-.607-1.463-.833-2.003-.22-.53-.44-.457-.607-.466-.157-.008-.337-.01-.517-.01s-.472.067-.72.337c-.247.27-.945.923-.945 2.248s.967 2.599 1.103 2.78c.135.18 1.902 2.904 4.609 4.072.644.278 1.147.444 1.54.568.647.206 1.237.177 1.703.107.519-.078 1.597-.653 1.822-1.283.225-.63.225-1.17.158-1.283-.068-.112-.248-.18-.518-.315z" />
          </svg>
          {showNotification && <span className="whatsapp-notification-badge">1</span>}
        </span>
        <span className="whatsapp-btn-text">WhatsApp Us</span>
      </button>

      {/* 3. Interactive Chat Window Box */}
      <div className={`whatsapp-chat-window ${isOpen ? 'show' : ''}`}>
        {/* Chat Window Header */}
        <div className="whatsapp-chat-header">
          <div className="chat-avatar-info">
            <div className="chat-avatar-wrapper">
              <span className="chat-avatar-initials">RE</span>
              <span className="chat-status-dot"></span>
            </div>
            <div className="chat-header-text">
              <h4>Ramji Events</h4>
              <span className="chat-status-text">Online (Replies in minutes)</span>
            </div>
          </div>
          <button className="chat-close-btn" onClick={closeWidget} aria-label="Close chat window">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Chat Window Body */}
        <div className="whatsapp-chat-body">
          <div className="chat-welcome-bubble">
            <div className="chat-welcome-meta">Ramji Events Team</div>
            <p>Namaste! 🙏 Welcome to Ramji Events & Caterers. How can we help you plan your perfect event today? Select a service or type your query below.</p>
            <span className="chat-bubble-time">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>

          <div className="quick-inquiries-title">Quick Inquiries:</div>
          <div className="quick-inquiries-list">
            {quickInquiries.map((inquiry, index) => (
              <button 
                key={index} 
                className={`quick-inquiry-item ${selectedQuickInquiry === inquiry.text ? 'selected' : ''}`}
                onClick={() => {
                  setSelectedQuickInquiry(inquiry.text);
                  setUserMessage(inquiry.text);
                }}
              >
                {inquiry.label}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Window Footer / Send Field */}
        <form className="whatsapp-chat-footer" onSubmit={(e) => handleSendMessage(e, userMessage)}>
          <input 
            type="text" 
            className="whatsapp-input-field" 
            placeholder="Type your message..." 
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
          />
          <button type="submit" className="whatsapp-send-btn" aria-label="Send WhatsApp message">
            <svg viewBox="0 0 24 24" width="20" height="20">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" fill="currentColor" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default WhatsAppWidget;
