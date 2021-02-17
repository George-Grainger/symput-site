import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { FaMoon } from 'react-icons/fa';

const ThemeChanger = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  if (theme === 'light') {
    return (
      <button
        ariaLabel="Set theme to dark"
        onClick={() => setTheme('dark')}
        className="hover:text-orange-600 dark:hover:text-pink-500"
      >
        <FaMoon />
      </button>
    );
  } else {
    return (
      <button
        ariaLabel="Set theme to light"
        onClick={() => setTheme('light')}
        className="hover:text-orange-600 dark:hover:text-pink-500"
      >
        <FaSun />
      </button>
    );
  }
};

export default ThemeChanger;
