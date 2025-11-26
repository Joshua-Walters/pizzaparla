import { useState } from 'react';
import { usePizza } from '../context/usePizza';
import PostCard from './PostCard';
import CreatePost from './CreatePost';
import './BlogFeed.css';

function BlogFeed() {
  const { posts, cringeMode } = usePizza();
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const filteredPosts = posts
    .filter(post => {
      if (filter === 'all') return true;
      if (filter === 'highRated') return post.rating >= 4;
      if (filter === 'weird') return post.weirdTopping;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return b.timestamp - a.timestamp;
      if (sortBy === 'oldest') return a.timestamp - b.timestamp;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'comments') return b.comments.length - a.comments.length;
      return 0;
    });

  return (
    <section className={`blog-feed ${cringeMode ? 'cringe' : ''}`}>
      <div className="feed-header">
        <h2 className="feed-title">
          🍕 PIZZA COMMUNITY POSTS 🍕
        </h2>
        
        <div className="feed-controls">
          <button 
            className="create-post-btn"
            onClick={() => setShowCreatePost(true)}
          >
            ✏️ WRITE A POST!
          </button>
          
          <div className="filters">
            <select 
              value={filter} 
              onChange={(e) => setFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">🍕 All Posts</option>
              <option value="highRated">⭐ High Rated (4+)</option>
              <option value="weird">🤪 Weird Toppings</option>
            </select>
            
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="newest">📅 Newest First</option>
              <option value="oldest">📅 Oldest First</option>
              <option value="rating">⭐ Highest Rated</option>
              <option value="comments">💬 Most Comments</option>
            </select>
          </div>
        </div>
      </div>

      <div className="posts-grid">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <div className="no-posts">
            <span className="no-posts-emoji">😢🍕</span>
            <p>No posts found! Be the first to share your pizza wisdom!</p>
          </div>
        )}
      </div>

      {showCreatePost && (
        <CreatePost onClose={() => setShowCreatePost(false)} />
      )}
    </section>
  );
}

export default BlogFeed;
