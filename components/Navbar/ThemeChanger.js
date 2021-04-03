import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { FaMoon, FaSun } from 'react-icons/fa';

const ThemeChanger = ({ title }) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const handleToggle = (e) => {
    if (!e.target.checked) {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  return (
    <>
      <p className="prose-lg w-full">{title}</p>
      <label
        htmlFor="toogleButton"
        className="flex justify-center items-center cursor-pointer py-4"
      >
        <FaSun
          className={`${
            theme === 'light' ? 'text-yellow-400' : 'text-gray-400'
          } h-6 w-6 mx-4 transition duration-300`}
        />
        <div className="relative focus-within:ring-2 ring-yellow-400 ring-offset-4 dark:ring-offset-gray-800 rounded-full">
          <input
            id="toogleButton"
            type="checkbox"
            className="absolute opacity-0"
            onChange={handleToggle}
            checked={theme === 'dark' ? 'checked' : ''}
          />
          <div className="toggle-path bg-gray-200 dark:bg-black w-18 h-9 rounded-full shadow-inner transform transition duration-300"></div>
          <div className="toggle-circle absolute w-8 h-8 bg-white rounded-full shadow top-0.5 left-1 transition duration-300"></div>
        </div>
        <FaMoon
          className={`${
            theme === 'dark' ? 'text-yellow-400' : 'text-gray-400'
          } h-6 w-6 mx-4 transition duration-300`}
        />
      </label>
    </>
  );
};

export default ThemeChanger;
