import { useState, useEffect } from 'react';
import { PizzaContext } from './context';

const initialPosts = [
  {
    id: 1,
    title: "BEST PIZZA IN TOWN - Joe's Slice Palace",
    author: "PizzaLover99",
    content: "OMG you GOTTA try Joe's on 5th street! Their pepperoni is absolutely FIRE 🔥🔥🔥 The cheese pull is legendary!",
    rating: 5,
    weirdTopping: "Jalapeño Ranch Drizzle",
    timestamp: Date.now() - 86400000,
    comments: [
      { id: 1, author: "CheeseFanatic", content: "YESSSS Joe's is the GOAT! Been going there since forever!", timestamp: Date.now() - 43200000 },
      { id: 2, author: "DOM_THE_CLOWN", content: "🤡🍕 HONK HONK! DOM APPROVES THIS SLICE! 🍕🤡", timestamp: Date.now() - 21600000 }
    ]
  },
  {
    id: 2,
    title: "CONTROVERSIAL TAKE: Pineapple Pizza RULES",
    author: "HawaiianDreamer",
    content: "Fight me!! Hawaiian pizza is the SUPERIOR pizza! Sweet + savory = PERFECTION. Anyone who disagrees has never truly LIVED!",
    rating: 4,
    weirdTopping: "Extra Pineapple + Bacon",
    timestamp: Date.now() - 172800000,
    comments: [
      { id: 1, author: "PizzaPurist", content: "This is a crime against humanity 😤", timestamp: Date.now() - 86400000 },
      { id: 2, author: "TropicalVibes", content: "FINALLY someone with TASTE! 🍍🍕", timestamp: Date.now() - 60000000 },
      { id: 3, author: "DOM_THE_CLOWN", content: "🤡 DOM SAYS ALL PIZZA IS GOOD PIZZA! HONK! 🤡", timestamp: Date.now() - 30000000 }
    ]
  },
  {
    id: 3,
    title: "I put PICKLES on my pizza and I'm not sorry",
    author: "PickleEnthusiast",
    content: "Everyone looked at me weird at Vinny's Pizzeria but guess what?? PICKLE PIZZA SLAPS! The tangy crunch with the melty cheese is *chef's kiss*",
    rating: 3,
    weirdTopping: "Dill Pickles + Hot Honey",
    timestamp: Date.now() - 259200000,
    comments: [
      { id: 1, author: "DOM_THE_CLOWN", content: "🤡🥒 PICKLE POWER! DOM IS INTRIGUED! HONK HONK! 🥒🤡", timestamp: Date.now() - 200000000 }
    ]
  }
];

export function PizzaProvider({ children }) {
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem('pizzaPosts');
    return saved ? JSON.parse(saved) : initialPosts;
  });
  
  const [cringeMode, setCringeMode] = useState(() => {
    const saved = localStorage.getItem('cringeMode');
    return saved === 'true';
  });

  const [isAdmin, setIsAdmin] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    localStorage.setItem('pizzaPosts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('cringeMode', cringeMode.toString());
  }, [cringeMode]);

  // Random popup timer
  useEffect(() => {
    const triggerPopup = () => {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 8000);
    };

    // Initial popup after 5-10 seconds
    const initialTimer = setTimeout(triggerPopup, 5000 + Math.random() * 5000);
    
    // Recurring popups every 30-60 seconds
    const interval = setInterval(() => {
      if (Math.random() > 0.3) {
        triggerPopup();
      }
    }, 30000 + Math.random() * 30000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  const addPost = (post) => {
    const newPost = {
      ...post,
      id: Date.now(),
      timestamp: Date.now(),
      comments: []
    };
    setPosts([newPost, ...posts]);
  };

  const deletePost = (postId) => {
    if (isAdmin) {
      setPosts(posts.filter(p => p.id !== postId));
    }
  };

  const addComment = (postId, comment) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, {
            id: Date.now(),
            ...comment,
            timestamp: Date.now()
          }]
        };
      }
      return post;
    }));
  };

  const toggleCringeMode = () => {
    setCringeMode(!cringeMode);
  };

  const toggleAdmin = (password) => {
    // DEMO ONLY: This is an intentionally simple "admin" feature for a parody website.
    // The password is purposely easy to guess and there's a hint in the UI.
    // This is NOT meant to be secure - it's part of the joke aesthetic.
    // For a real application, use proper server-side authentication.
    if (password === 'pizza123') {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <PizzaContext.Provider value={{
      posts,
      addPost,
      deletePost,
      addComment,
      cringeMode,
      toggleCringeMode,
      isAdmin,
      toggleAdmin,
      showPopup,
      closePopup
    }}>
      {children}
    </PizzaContext.Provider>
  );
}
