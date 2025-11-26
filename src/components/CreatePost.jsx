import { useState } from 'react';
import { usePizza } from '../context/usePizza';
import './CreatePost.css';

function CreatePost({ onClose }) {
  const { addPost } = usePizza();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    content: '',
    rating: 5,
    weirdTopping: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim() && formData.author.trim() && formData.content.trim()) {
      addPost(formData);
      onClose();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) : value
    }));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="create-post-modal" onClick={e => e.stopPropagation()}>
        <button className="close-modal" onClick={onClose}>✖</button>
        
        <h2 className="modal-title">
          🍕 SHARE YOUR PIZZA WISDOM! 🍕
        </h2>
        
        <form onSubmit={handleSubmit} className="create-post-form">
          <div className="form-group">
            <label htmlFor="author">YOUR PIZZA NAME:</label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="e.g., PepperoniKing420"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="title">POST TITLE:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., BEST PIZZA IN MY CITY!"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="content">YOUR HOT TAKE:</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Tell us about that amazing (or terrible) pizza experience..."
              required
            />
          </div>
          
          <div className="form-row">
            <div className="form-group rating-group">
              <label htmlFor="rating">PIZZA RATING:</label>
              <div className="rating-selector">
                {[1, 2, 3, 4, 5].map(num => (
                  <button
                    key={num}
                    type="button"
                    className={`rating-btn ${formData.rating >= num ? 'active' : ''}`}
                    onClick={() => setFormData(prev => ({ ...prev, rating: num }))}
                  >
                    🍕
                  </button>
                ))}
              </div>
              <span className="rating-display">{formData.rating}/5 SLICES!</span>
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="weirdTopping">WEIRD TOPPING (optional):</label>
            <input
              type="text"
              id="weirdTopping"
              name="weirdTopping"
              value={formData.weirdTopping}
              onChange={handleChange}
              placeholder="e.g., Gummy Bears + Ranch"
            />
            <span className="form-hint">Got a controversial topping? Share it!</span>
          </div>
          
          <button type="submit" className="submit-post-btn">
            🚀 POST IT! 🚀
          </button>
        </form>
        
        <div className="dom-says">
          <span className="dom-icon">🤡</span>
          <p>DOM SAYS: "Every pizza opinion is VALID! Even the weird ones!"</p>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
