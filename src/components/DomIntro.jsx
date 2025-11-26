import { useState } from 'react';
import { usePizza } from '../context/usePizza';
import './DomIntro.css';

function DomIntro() {
  const { cringeMode } = usePizza();
  const [showFullIntro, setShowFullIntro] = useState(true);

  const domQuotes = [
    "HONK HONK! WELCOME TO THE GREATEST PIZZA COMMUNITY!",
    "🍕 I'm DOM, your friendly neighborhood PIZZA CLOWN! 🤡",
    "Share your WILDEST pizza opinions! No topping is TOO weird!",
    "Rate shops! Leave comments! EMBRACE THE CHAOS!",
    "Remember: ALL PIZZA IS GOOD PIZZA! (except for that one time...)"
  ];

  return (
    <section className={`dom-intro ${cringeMode ? 'cringe' : ''}`}>
      <div className="dom-character">
        <div className="dom-face">
          <div className="dom-hat">🎪</div>
          <div className="dom-emoji">🤡</div>
          <div className="dom-pizzas">
            <span className="floating-pizza">🍕</span>
            <span className="floating-pizza delay-1">🍕</span>
            <span className="floating-pizza delay-2">🍕</span>
          </div>
        </div>
        
        <div className="speech-bubble">
          {showFullIntro ? (
            <div className="intro-full">
              <h2>🎉 HEY THERE, PIZZA PAL! 🎉</h2>
              <ul className="dom-quotes">
                {domQuotes.map((quote, index) => (
                  <li key={index} style={{ animationDelay: `${index * 0.2}s` }}>
                    {quote}
                  </li>
                ))}
              </ul>
              <button 
                className="dismiss-btn"
                onClick={() => setShowFullIntro(false)}
              >
                GOT IT, DOM! 🍕
              </button>
            </div>
          ) : (
            <div className="intro-mini" onClick={() => setShowFullIntro(true)}>
              <p>
                <span className="honk">HONK!</span> Click me for DOM's wisdom! 
                <span className="click-icon">👆</span>
              </p>
            </div>
          )}
        </div>
      </div>
      
      <div className="pizza-splatter">
        <span>🍕</span>
        <span>🧀</span>
        <span>🍅</span>
        <span>🫑</span>
        <span>🍄</span>
        <span>🥓</span>
      </div>
    </section>
  );
}

export default DomIntro;
