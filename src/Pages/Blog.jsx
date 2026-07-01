import { useState, useEffect } from 'react'
import { blogPosts } from '../Data/blogs.jsx'
import './Blog.css'

// Import all assets for the visual picker and mapping
import mehraWedding from '../assets/mehra_wedding.png'
import whyRamjiDining from '../assets/why_ramji_dining.png'
import heroImg from '../assets/hero.png'
import weddingMandap from '../assets/wedding_mandap.png'
import kapoorGala from '../assets/kapoor_gala.png'
import weddingReception from '../assets/wedding_reception.png'
import infosysSummit from '../assets/infosys_summit.png'
import floralArch from '../assets/floral_arch.png'
import grandStage from '../assets/grand_stage.png'
import haldiStage from '../assets/haldi_stage.png'
import mehndiDecor from '../assets/mehndi_decor.png'
import sweetSixteen from '../assets/sweet_sixteen.png'
import productLaunch from '../assets/product_launch.png'

// Image Map for mapping string keys to actual imported assets
const IMAGE_MAP = {
  mehraWedding,
  whyRamjiDining,
  heroImg,
  weddingMandap,
  kapoorGala,
  weddingReception,
  infosysSummit,
  floralArch,
  grandStage,
  haldiStage,
  mehndiDecor,
  sweetSixteen,
  productLaunch
};

// Friendly labels for the image picker
const IMAGE_LABELS = {
  mehraWedding: "Udaipur Wedding Setup",
  whyRamjiDining: "Luxury Catering Spread",
  heroImg: "Grand Outdoor Venue",
  weddingMandap: "Floral Mandap Curation",
  kapoorGala: "Kapoor Gala Decor",
  weddingReception: "Grand Reception Stage",
  infosysSummit: "Infosys Corporate Summit",
  floralArch: "Exotic Floral Archway",
  grandStage: "Royal Gold Wedding Stage",
  haldiStage: "Bright Haldi Decor Setup",
  mehndiDecor: "Traditional Mehndi Curation",
  sweetSixteen: "Sweet 16 Theme Party",
  productLaunch: "Immersive Product Launch"
};

export default function Blog({
  navigateTo,
  blogCategory,
  setBlogCategory,
  activePost,
  setActivePost
}) {
  const [posts, setPosts] = useState([]);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  // Form Fields State
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('Weddings');
  const [formExcerpt, setFormExcerpt] = useState('');
  const [formReadTime, setFormReadTime] = useState('5 min read');
  const [formContent, setFormContent] = useState('');
  const [formImage, setFormImage] = useState('mehraWedding');

  // Initialize posts from Local Storage or default blog dataset
  useEffect(() => {
    const savedBlogs = localStorage.getItem('ramji_events_blogs');
    if (savedBlogs) {
      setPosts(JSON.parse(savedBlogs));
    } else {
      // Map initial imported image references to keys for localStorage compatibility
      const initialized = blogPosts.map(post => {
        const matchingKey = Object.keys(IMAGE_MAP).find(key => IMAGE_MAP[key] === post.image);
        return {
          ...post,
          image: matchingKey || 'mehraWedding'
        };
      });
      localStorage.setItem('ramji_events_blogs', JSON.stringify(initialized));
      setPosts(initialized);
    }
  }, []);

  // Helper to resolve image key to imported assets
  const getPostImage = (imageKey) => {
    return IMAGE_MAP[imageKey] || mehraWedding;
  };

  // Open Form for creating new post
  const handleOpenCreateForm = () => {
    setEditingPost(null);
    setFormTitle('');
    setFormCategory('Weddings');
    setFormExcerpt('');
    setFormReadTime('5 min read');
    setFormContent('');
    setFormImage('mehraWedding');
    setIsFormOpen(true);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  // Open Form for editing post
  const handleOpenEditForm = (e, post) => {
    e.stopPropagation();
    setEditingPost(post);
    setFormTitle(post.title);
    setFormCategory(post.category);
    setFormExcerpt(post.excerpt);
    setFormReadTime(post.readTime);
    setFormContent(post.content || '');
    setFormImage(post.image);
    setIsFormOpen(true);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

  // Delete Post Handler
  const handleDeletePost = (e, postId) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this blog post?")) {
      const updated = posts.filter(p => p.id !== postId);
      localStorage.setItem('ramji_events_blogs', JSON.stringify(updated));
      setPosts(updated);
      if (activePost && activePost.id === postId) {
        setActivePost(null);
      }
    }
  };

  // Save/Submit Form Handler
  const handleSavePost = (e) => {
    e.preventDefault();
    if (!formTitle.trim() || !formExcerpt.trim() || !formContent.trim()) {
      alert("Please fill in all the required fields.");
      return;
    }

    let updatedPosts = [...posts];

    if (editingPost) {
      // Edit mode
      updatedPosts = posts.map(p => {
        if (p.id === editingPost.id) {
          return {
            ...p,
            title: formTitle,
            category: formCategory,
            excerpt: formExcerpt,
            readTime: formReadTime,
            content: formContent,
            image: formImage
          };
        }
        return p;
      });
    } else {
      // Create mode
      const nextId = posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1;
      const today = new Date().toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });

      const newPost = {
        id: nextId,
        title: formTitle,
        category: formCategory,
        excerpt: formExcerpt,
        readTime: formReadTime,
        content: formContent,
        image: formImage,
        date: today
      };
      updatedPosts = [newPost, ...posts];
    }

    localStorage.setItem('ramji_events_blogs', JSON.stringify(updatedPosts));
    setPosts(updatedPosts);
    setIsFormOpen(false);
    setEditingPost(null);
  };

  return (
    <div className="services-page blog-page">
      {/* Blog Header Banner */}
      <div className="services-header-banner blog-header-banner" style={{ backgroundImage: `url(${whyRamjiDining})` }}>
        <div className="services-header-overlay"></div>
        <div className="services-header-content">
          <div className="breadcrumbs">
            <span className="breadcrumb-link" onClick={() => navigateTo('home')}>HOME</span>
            <span className="breadcrumb-separator">&gt;</span>
            <span className="breadcrumb-active">JOURNAL</span>
          </div>
          <span className="services-subtitle">JOURNAL</span>
          <h1 className="services-title">Insights & Inspiration</h1>
          <p className="services-lead">
            Event trends, planning advice, and behind-the-scenes stories from our team.
          </p>
        </div>
      </div>

      {/* Admin Panel Bar */}
      <div className="blog-admin-bar">
        <div className="admin-status">
          <span className={`status-indicator ${isAdminMode ? 'active' : ''}`}></span>
          <span>{isAdminMode ? "ADMIN MODE ACTIVE" : "READER MODE"}</span>
        </div>
        <div className="admin-actions">
          <button 
            className="btn-outline btn-admin" 
            onClick={() => {
              setIsAdminMode(!isAdminMode);
              setIsFormOpen(false);
            }}
          >
            {isAdminMode ? "🛠️ DISABLE ADMIN" : "🛠️ ENABLE ADMIN"}
          </button>
          {isAdminMode && (
            <button className="btn-filled btn-admin" onClick={handleOpenCreateForm}>
              ✍️ WRITE NEW POST
            </button>
          )}
        </div>
      </div>

      {/* Create / Edit Form Area */}
      {isFormOpen && (
        <div className="blog-form-container">
          <h2>{editingPost ? "Edit Blog Post" : "Write a New Article"}</h2>
          <form className="blog-form" onSubmit={handleSavePost}>
            <div className="form-group">
              <label>Article Title *</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="e.g. 5 Secrets to Perfect Event Lighting" 
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group-row">
              <div className="form-group">
                <label>Category</label>
                <select 
                  className="form-control"
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                >
                  <option value="Weddings">Weddings</option>
                  <option value="Corporate">Corporate</option>
                  <option value="Behind the Scenes">Behind the Scenes</option>
                  <option value="Tips & Advice">Tips & Advice</option>
                  <option value="Venues">Venues</option>
                </select>
              </div>

              <div className="form-group">
                <label>Read Time</label>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="e.g. 5 min read" 
                  value={formReadTime}
                  onChange={(e) => setFormReadTime(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Short Excerpt *</label>
              <input 
                type="text" 
                className="form-control" 
                placeholder="Summarize the article in one sentence for the grid card..." 
                value={formExcerpt}
                onChange={(e) => setFormExcerpt(e.target.value)}
                required
              />
            </div>

            {/* Visual Image Selector Grid */}
            <div className="form-group image-picker-container">
              <label>Featured Cover Image *</label>
              <span className="image-picker-label-desc">Select a luxury cover visual for your post:</span>
              <div className="image-picker-grid">
                {Object.keys(IMAGE_MAP).map((key) => (
                  <div 
                    key={key} 
                    className={`picker-item ${formImage === key ? 'selected' : ''}`}
                    onClick={() => setFormImage(key)}
                    title={IMAGE_LABELS[key]}
                  >
                    <img src={IMAGE_MAP[key]} alt={IMAGE_LABELS[key]} loading="lazy" />
                    {formImage === key && <span className="selected-check">✓</span>}
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>Rich Content Paragraphs *</label>
              <span className="image-picker-label-desc">Use double enter (blank line) between paragraphs.</span>
              <textarea 
                className="form-control" 
                placeholder="Type your insights here. Detail your thoughts, tips, and event recommendations..." 
                value={formContent}
                onChange={(e) => setFormContent(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="form-actions">
              <button 
                type="button" 
                className="btn-outline" 
                onClick={() => {
                  setIsFormOpen(false);
                  setEditingPost(null);
                }}
              >
                CANCEL
              </button>
              <button type="submit" className="btn-filled">
                {editingPost ? "UPDATE POST" : "PUBLISH POST"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Blog Controls Category Filters Section */}
      <div className="blog-controls-container">
        <div className="blog-filters-wrapper">
          {['ALL', 'WEDDINGS', 'CORPORATE', 'BEHIND THE SCENES', 'TIPS & ADVICE', 'VENUES'].map((cat) => (
            <button
              key={cat}
              onClick={() => setBlogCategory(cat)}
              className={`blog-filter-btn ${blogCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Grid Section */}
      <div className="blog-grid-container">
        {posts.filter(post => blogCategory === 'ALL' || post.category.toUpperCase() === blogCategory).length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
            No articles found in this category. Click "Write New Post" in Admin Mode to create one!
          </div>
        ) : (
          <div className="blog-grid">
            {posts
              .filter(post => blogCategory === 'ALL' || post.category.toUpperCase() === blogCategory)
              .map((post) => (
                <div
                  key={post.id}
                  className="blog-card"
                  onClick={() => setActivePost(post)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Admin actions overlay directly on cards */}
                  {isAdminMode && (
                    <div className="blog-card-admin-overlay">
                      <button 
                        className="btn-card-action edit" 
                        onClick={(e) => handleOpenEditForm(e, post)}
                        title="Edit post"
                        aria-label="Edit post"
                      >
                        <svg viewBox="0 0 24 24" width="16" height="16" strokeWidth="2.5" fill="none">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </button>
                      <button 
                        className="btn-card-action delete" 
                        onClick={(e) => handleDeletePost(e, post.id)}
                        title="Delete post"
                        aria-label="Delete post"
                      >
                        <svg viewBox="0 0 24 24" width="16" height="16" strokeWidth="2.5" fill="none">
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line>
                          <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                      </button>
                    </div>
                  )}

                  <div className="blog-card-img-wrapper">
                    <img src={getPostImage(post.image)} alt={post.title} className="blog-card-img" loading="lazy" />
                  </div>
                  <div className="blog-card-content">
                    <div className="blog-card-meta">
                      <span className="blog-meta-category">{post.category}</span>
                      <span className="blog-meta-dot">·</span>
                      <span className="blog-meta-date">{post.date}</span>
                      <span className="blog-meta-dot">·</span>
                      <span className="blog-meta-readtime">{post.readTime}</span>
                    </div>
                    <h3 className="blog-card-title">{post.title}</h3>
                    <button 
                      className="blog-card-link"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActivePost(post);
                      }}
                    >
                      Read More
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Article Modal */}
      {activePost !== null && (
        <div className="article-modal-overlay" onClick={() => setActivePost(null)}>
          <div className="article-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="article-modal-close"
              onClick={() => setActivePost(null)}
              aria-label="Close article"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <div className="article-modal-hero" style={{ backgroundImage: `url(${getPostImage(activePost.image)})` }}>
              <div className="article-modal-hero-overlay"></div>
              <div className="article-modal-hero-content">
                <span className="article-modal-category">{activePost.category}</span>
                <h2 className="article-modal-title">{activePost.title}</h2>
                <div className="article-modal-meta">
                  <span>{activePost.date}</span>
                  <span>·</span>
                  <span>{activePost.readTime}</span>
                  <span>·</span>
                  <span>By Ramesh Joshi</span>
                </div>
              </div>
            </div>
            <div className="article-modal-body">
              <p className="article-lead">{activePost.excerpt}</p>
              
              {/* Parse and map paragraphs dynamically if custom content is present */}
              {activePost.content ? (
                activePost.content.split('\n\n').map((para, index) => (
                  <p key={index}>{para}</p>
                ))
              ) : (
                <>
                  <p>
                    Planning an event is a beautiful art, requiring careful balance of creative design, venue logistics, and catering choices. At Ramji Events, we believe in crafting every celebration to be unique. Our process is designed to coordinate all pieces together seamlessly.
                  </p>
                  <h3>Key Elements for Event Success</h3>
                  <ul>
                    <li><strong>Concept Development:</strong> Aligning floral theme, colors, and layouts to represent your distinct style.</li>
                    <li><strong>Logistics Masterclass:</strong> Streamlining vendor coordination, technical setups, and lighting to ensure perfect execution on event day.</li>
                    <li><strong>Curated Dining:</strong> Providing exquisite menus and customized drinks selection to wow your guests.</li>
                  </ul>
                  <p>
                    Whether it's an intimate anniversary dinner, a multi-day wedding celebration, or a 1000-guest summit conference, focusing on these fundamentals elevates the entire celebration. Stay tuned for more behind-the-scenes stories and tips from our design team!
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
