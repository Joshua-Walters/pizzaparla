import { usePizza } from '../context/usePizza';
import './Footer.css';

function Footer() {
  const { cringeMode } = usePizza();

  return (
    <footer className={`footer ${cringeMode ? 'cringe' : ''}`}>
      <div className="footer-pizza-border"></div>
      
      <div className="footer-content">
        <div className="footer-mascot">
          <span className="footer-dom">🤡</span>
          <span className="footer-pizza">🍕</span>
        </div>
        
        <h3 className="footer-title">DOM'S PIZZA PARLOR</h3>
        
        <p className="footer-tagline">
          "WHERE EVERY SLICE IS A CHAOTIC ADVENTURE!" 🎪
        </p>
        
        <div className="footer-links">
          <span className="fake-link">📜 Terms of Pizza</span>
          <span className="fake-link">🔒 Privacy (LOL)</span>
          <span className="fake-link">📧 Contact DOM</span>
          <span className="fake-link">🤡 About DOM</span>
        </div>
        
        <div className="footer-disclaimer">
          <p>
            ⚠️ <strong>DISCLAIMER:</strong> This is a fictional, parody website created for entertainment purposes only.
            DOM is not a real clown (or is he? 🤡). No real pizza is served here.
            All "ads" are clearly marked fake parodies and contain no real tracking or malicious content.
          </p>
        </div>
        
        <div className="footer-credits">
          <p>Made with 🍕 and chaos • © {new Date().getFullYear()} DOM'S PIZZA PARLOR</p>
          <p className="powered-by">Powered by PIZZA ENERGY™ (not a real thing)</p>
        </div>
        
        <div className="pizza-parade">
          {'🍕'.repeat(20)}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
