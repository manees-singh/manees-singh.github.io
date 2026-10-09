import { useState, useEffect } from 'react';
import styles from './App.module.css';
import { MatrixBackground } from './components/MatrixBackground/MatrixBackground';
import {Navbar} from './components/Navbar/Navbar';
import { Front  } from './components/Front/Front';
import { Experience } from './components/Experience/Experience';
import { Projects } from './components/Projects/Projects';
import { Publications } from './components/Publications/Publications';
import { Contact } from './components/Contact/Contact';

function App() {
  // Initialize theme from localStorage or default to dark mode
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    return 'dark';
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
    {theme === 'dark' && <MatrixBackground />}
    <Navbar toggleTheme={toggleTheme} currentTheme={theme} />
    <Front />
    <Experience />
    <Projects />
    <Publications />
    <Contact currentTheme={theme} />
  </div>;
}

export default App;
