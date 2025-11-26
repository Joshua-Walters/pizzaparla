import { useMemo } from 'react';
import { usePizza } from '../context/usePizza';
import './FakeAdPopup.css';

const fakeAds = [
  {
    id: 1,
    title: "🎉 CONGRATULATIONS! 🎉",
    content: "You are the 1,000,000th PIZZA LOVER! Click to claim your FREE PIZZA!*",
    disclaimer: "*Not a real prize. This is a parody ad. No pizza will be delivered.",
    style: "winner"
  },
  {
    id: 2,
    title: "🍕 HOT SINGLES IN YOUR AREA! 🍕",
    content: "...Single slices of PIZZA that is! Only $1.99! (At participating locations that don't exist)",
    disclaimer: "This is a fake ad parody. No real pizza shop.",
    style: "dating"
  },
  {
    id: 3,
    title: "⚠️ YOUR COMPUTER HAS A VIRUS! ⚠️",
    content: "Just kidding! But you know what's NOT a virus? DOM'S PIZZA LOVE! 🤡🍕",
    disclaimer: "Fake parody ad. Your computer is fine.",
    style: "virus"
  },
  {
    id: 4,
    title: "🎰 SPIN TO WIN FREE PIZZA! 🎰",
    content: "[FAKE SPINNER] You WON... absolutely nothing because this is a joke! 😂",
    disclaimer: "Parody ad - no real prizes or gambling.",
    style: "spinner"
  },
  {
    id: 5,
    title: "📢 DOM NEEDS YOUR HELP! 📢",
    content: "A clown prince in Nigeria has 10,000 pizzas to share! Send your bank details! (OBVIOUSLY A JOKE)",
    disclaimer: "This is satire. Never share bank details online.",
    style: "scam"
  },
  {
    id: 6,
    title: "🔥 DOCTORS HATE THIS ONE TRICK! 🔥",
    content: "Local pizza enthusiast discovers how to eat pizza for EVERY meal! (It's called loving pizza)",
    disclaimer: "Parody ad. Please maintain a balanced diet.",
    style: "clickbait"
  },
  {
    id: 7,
    title: "💊 GROW YOUR... PIZZA COLLECTION! 💊",
    content: "With these 5 simple tips! #1: Order more pizza. That's it. That's the tip.",
    disclaimer: "Fake parody ad. Just a pizza joke.",
    style: "spam"
  },
  {
    id: 8,
    title: "🎮 FREE V-BUCKS... PIZZA BUCKS! 🎮",
    content: "Redeem code: PIZZ4LYFE for 0 (zero) pizza bucks! Worth exactly nothing!",
    disclaimer: "Parody ad. Pizza Bucks is not real currency.",
    style: "gaming"
  }
];

function getRandomAd() {
  return fakeAds[Math.floor(Math.random() * fakeAds.length)];
}

function getRandomPosition() {
  return {
    x: 10 + Math.random() * 60,
    y: 10 + Math.random() * 60
  };
}

function FakeAdPopup() {
  const { showPopup, closePopup, cringeMode } = usePizza();

  // Compute ad and position only when popup is shown
  // Using useMemo with showPopup as key to get new values each time popup opens
  const adData = useMemo(() => {
    if (!showPopup) return null;
    return {
      ad: getRandomAd(),
      position: getRandomPosition()
    };
  }, [showPopup]);

  if (!showPopup || !adData) return null;

  const { ad: currentAd, position } = adData;

  return (
    <div 
      className={`fake-ad-popup ${currentAd.style} ${cringeMode ? 'cringe' : ''}`}
      style={{ left: `${position.x}%`, top: `${position.y}%` }}
    >
      <div className="ad-header">
        <span className="ad-warning">🚨 FAKE AD PARODY 🚨</span>
        <button className="close-ad" onClick={closePopup}>✖</button>
      </div>
      
      <div className="ad-content">
        <h3 className="ad-title">{currentAd.title}</h3>
        <p className="ad-text">{currentAd.content}</p>
        
        <div className="fake-buttons">
          <button className="fake-btn yes" onClick={closePopup}>
            YES! 🍕
          </button>
          <button className="fake-btn no" onClick={closePopup}>
            ALSO YES! 🍕
          </button>
        </div>
      </div>
      
      <p className="ad-disclaimer">{currentAd.disclaimer}</p>
      
      <div className="ad-flashing">
        ⭐ CLICK NOW ⭐ LIMITED TIME ⭐ WOW ⭐ AMAZING ⭐
      </div>
    </div>
  );
}

export default FakeAdPopup;
