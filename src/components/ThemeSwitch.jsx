import React, { useEffect, useState } from 'react';

const ThemeSwitcher = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    // Load theme preference from localStorage
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = savedTheme === 'dark';
    setIsDarkTheme(prefersDark);
    document.body.classList.toggle('dark', prefersDark);
  }, []);

  const handleThemeChange = (event) => {
    const isDark = event.target.checked;
    setIsDarkTheme(isDark);
    document.body.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  };

  return (
    <div>
      <input type="checkbox" id="theme-toggle" hidden checked={isDarkTheme} onChange={handleThemeChange} />
      <label htmlFor="theme-toggle" className="theme-toggle mx-2"></label>
    </div>
  );
};

export default ThemeSwitcher;
