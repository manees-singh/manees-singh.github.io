import { useState, useEffect } from 'react';
import styles from './App.module.css';
import {Navbar} from './components/Navbar/Navbar';
import { Front  } from './components/Front/Front';
import { About } from './components/About/About';
import { Experience } from './components/Experience/Experience';
import { Projects } from './components/Projects/Projects';
import { Contact } from './components/Contact/Contact';

function App() {
  // Initialize theme from localStorage or system preference
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  // Apply theme on mount and when it changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Toggle between dark and light
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };
  
  return <div className={styles.App} data-theme={theme}>
    <Navbar toggleTheme={toggleTheme} currentTheme={theme} />
    <Front />
    <About />
    <Experience />
    <Projects />
    <Contact />
  </div>;
}

export default App;
