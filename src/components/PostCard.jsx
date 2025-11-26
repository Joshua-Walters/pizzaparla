import { useState } from 'react';
import { usePizza } from '../context/usePizza';
import './PostCard.css';

function PostCard({ post }) {
  const { addComment, deletePost, isAdmin, cringeMode } = usePizza();
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [commentAuthor, setCommentAuthor] = useState('');

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim() && commentAuthor.trim()) {
      addComment(post.id, {
        author: commentAuthor,
        content: newComment
      });
      setNewComment('');
      setCommentAuthor('');
    }
  };

  const renderStars = (rating) => {
    return '🍕'.repeat(rating) + '⚪'.repeat(5 - rating);
  };

  return (
    <article className={`post-card ${cringeMode ? 'cringe' : ''}`}>
      {isAdmin && (
        <button 
          className="delete-post-btn"
          onClick={() => deletePost(post.id)}
          title="Delete Post"
        >
          🗑️
        </button>
      )}
      
      <div className="post-header">
        <span className="post-author">👤 {post.author}</span>
        <span className="post-date">{formatDate(post.timestamp)}</span>
      </div>
      
      <h3 className="post-title">{post.title}</h3>
      
      <div className="post-rating">
        <span className="stars">{renderStars(post.rating)}</span>
        <span className="rating-text">{post.rating}/5 SLICES!</span>
      </div>
      
      <p className="post-content">{post.content}</p>
      
      {post.weirdTopping && (
        <div className="weird-topping">
          <span className="topping-label">🤪 WEIRD TOPPING ALERT:</span>
          <span className="topping-value">{post.weirdTopping}</span>
        </div>
      )}
      
      <div className="post-actions">
        <button 
          className="comments-toggle"
          onClick={() => setShowComments(!showComments)}
        >
          💬 {post.comments.length} COMMENTS
          <span className="toggle-icon">{showComments ? '▲' : '▼'}</span>
        </button>
      </div>
      
      {showComments && (
        <div className="comments-section">
          <div className="comments-list">
            {post.comments.length > 0 ? (
              post.comments.map(comment => (
                <div key={comment.id} className="comment">
                  <div className="comment-header">
                    <span className="comment-author">
                      {comment.author === 'DOM_THE_CLOWN' ? '🤡' : '👤'} {comment.author}
                    </span>
                    <span className="comment-date">{formatDate(comment.timestamp)}</span>
                  </div>
                  <p className="comment-content">{comment.content}</p>
                </div>
              ))
            ) : (
              <p className="no-comments">No comments yet! Be the first! 🎉</p>
            )}
          </div>
          
          <form className="comment-form" onSubmit={handleAddComment}>
            <input
              type="text"
              placeholder="Your pizza name..."
              value={commentAuthor}
              onChange={(e) => setCommentAuthor(e.target.value)}
              className="comment-input author-input"
              required
            />
            <textarea
              placeholder="Drop your hot take! 🔥"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="comment-input content-input"
              required
            />
            <button type="submit" className="submit-comment-btn">
              🍕 POST COMMENT 🍕
            </button>
          </form>
        </div>
      )}
    </article>
  );
}

export default PostCard;
