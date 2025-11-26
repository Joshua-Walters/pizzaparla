import { PizzaProvider } from './context/PizzaContext';
import { usePizza } from './context/usePizza';
import Header from './components/Header';
import DomIntro from './components/DomIntro';
import BlogFeed from './components/BlogFeed';
import FakeAdPopup from './components/FakeAdPopup';
import Footer from './components/Footer';
import './App.css';

function AppContent() {
  const { cringeMode } = usePizza();

  return (
    <div className={`app ${cringeMode ? 'cringe-mode' : ''}`}>
      <Header />
      <main>
        <DomIntro />
        <BlogFeed />
      </main>
      <Footer />
      <FakeAdPopup />
    </div>
  );
}

function App() {
  return (
    <PizzaProvider>
      <AppContent />
    </PizzaProvider>
  );
}

export default App;
