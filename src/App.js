import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Education from './components/Education';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Gallery from './components/Gallery';
import Projects from './components/Projects';
import AnimatedBackground from './components/AnimatedBackground';
import Admin from './components/Admin';

function App() {
  const sectionIds = ['hero', 'about', 'experience', 'education', 'skills', 'projects', 'gallery', 'contact', 'admin'];
  const getInitialSection = () => {
    const hash = window.location.hash?.replace('#', '');
    return sectionIds.includes(hash) ? hash : 'hero';
  };

  const [activeSection, setActiveSection] = useState(getInitialSection());

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash?.replace('#', '');
      if (sectionIds.includes(hash)) {
        setActiveSection(hash);
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigateTo = (id) => {
    if (!sectionIds.includes(id)) return;
    if (window.location.hash !== `#${id}`) {
      window.location.hash = id;
    } else {
      setActiveSection(id);
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'about':
        return <About />;
      case 'experience':
        return <Experience />;
      case 'education':
        return <Education />;
      case 'skills':
        return <Skills />;
      case 'projects':
        return <Projects />;
      case 'gallery':
        return <Gallery />;
      case 'contact':
        return <Contact />;
      case 'admin':
        return <Admin />;
      case 'hero':
      default:
        return <Hero />;
    }
  };

  return (
    <div className="App">
      <AnimatedBackground />
      <Header onNavigate={navigateTo} />
      {renderSection()}
      <Footer />
    </div>
  );
}

export default App;
