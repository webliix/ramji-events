import React from 'react'

export const services = [
  {
    id: 'wedding-planning',
    title: 'Wedding Planning',
    dropdownTitle: 'Wedding Planning',
    footerTitle: 'Wedding Planning',
    link: '#wedding-planning',
    desc: 'Full-service wedding coordination from engagement to the grand send-off.',
    inDropdown: true,
    inGrid: true,
    categories: ['WEDDINGS', 'COORDINATION'],
    displayTag: 'Weddings',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 11a4.5 4.5 0 0 1-4.5-4.5c0-1.5.5-3.5 4.5-5.5 4 2 4.5 4 4.5 5.5A4.5 4.5 0 0 1 12 11z" />
        <path d="M12 11v11" />
        <path d="M9 16a3 3 0 0 0 3-3" />
        <path d="M15 17a3 3 0 0 1-3-3" />
      </svg>
    )
  },
  {
    id: 'destination-weddings',
    title: 'Destination Weddings',
    dropdownTitle: 'Destination Weddings',
    footerTitle: 'Destination Weddings',
    link: '#destination-weddings',
    desc: "Seamlessly curated celebrations in India's most iconic locations.",
    inDropdown: true,
    inGrid: true,
    categories: ['WEDDINGS', 'COORDINATION'],
    displayTag: 'Weddings',
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <path d="M12 3a16.5 16.5 0 0 0 0 18M12 3a16.5 16.5 0 0 1 0 18" />
      </svg>
    )
  },
  {
    id: 'corporate-events',
    title: 'Corporate Events',
    dropdownTitle: 'Corporate Events',
    footerTitle: 'Corporate Events',
    link: '#corporate-events',
    desc: 'Board retreats, team milestones, and executive dinners handled with precision.',
    inDropdown: true,
    inGrid: true,
    categories: ['CORPORATE', 'COORDINATION'],
    displayTag: 'Corporate',
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
        <line x1="8" y1="7" x2="8" y2="20" />
        <line x1="16" y1="7" x2="16" y2="20" />
      </svg>
    )
  },
  {
    id: 'conferences',
    title: 'Conferences & Summits',
    dropdownTitle: 'Conferences',
    footerTitle: 'Conferences',
    link: '#conferences',
    desc: 'AV, seating, speakers, catering — managed end-to-end for 50 to 5000 guests.',
    inDropdown: true,
    inGrid: true,
    categories: ['CORPORATE'],
    displayTag: 'Corporate',
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="9" y="2" width="6" height="10" rx="3" />
        <path d="M5 10a7 7 0 0 0 14 0" />
        <line x1="12" y1="17" x2="12" y2="22" />
      </svg>
    )
  },
  {
    id: 'product-launches',
    title: 'Product Launches',
    dropdownTitle: 'Product Launches',
    footerTitle: 'Product Launches',
    link: '#product-launches',
    desc: 'Brand-aligned launches that generate buzz and leave lasting impressions.',
    inDropdown: true,
    inGrid: true,
    categories: ['CORPORATE'],
    displayTag: 'Corporate',
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M10 3L12 8L17 10L12 12L10 17L8 12L3 10L8 8Z" />
        <path d="M18 5L19 7L21 8L19 9L18 11L17 9L15 8L17 7Z" />
      </svg>
    )
  },
  {
    id: 'birthday-events',
    title: 'Birthday Celebrations',
    dropdownTitle: 'Birthday Events',
    footerTitle: 'Birthday Celebrations',
    link: '#birthday-events',
    desc: 'Intimate or lavish — every milestone deserves a bespoke experience.',
    inDropdown: true,
    inGrid: true,
    categories: ['SOCIAL'],
    displayTag: 'Social',
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="4" y="9" width="16" height="12" rx="1.5" />
        <line x1="12" y1="9" x2="12" y2="21" />
        <line x1="4" y1="15" x2="20" y2="15" />
        <path d="M12 9a2.5 2.5 0 0 0-2.5-2.5c-1.5 0-2 1-2 2.5s2 1.5 4.5 0z" />
        <path d="M12 9a2.5 2.5 0 0 1 2.5-2.5c1.5 0 2 1 2 2.5s-2 1.5-4.5 0z" />
      </svg>
    )
  },
  {
    id: 'event-decoration',
    title: 'Event Decoration',
    dropdownTitle: 'Event Decoration',
    footerTitle: 'Event Decoration',
    link: '#event-decoration',
    desc: 'Custom decor, floral design, lighting, and thematic styling for any venue.',
    inDropdown: true,
    inGrid: true,
    categories: ['DECORATION'],
    displayTag: 'Decoration',
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 5a3 3 0 1 0-3 3M12 5a3 3 0 1 1 3 3M12 19a3 3 0 1 0-3-3M12 19a3 3 0 1 1 3-3" />
      </svg>
    )
  }
]
