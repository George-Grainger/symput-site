import { useState } from 'react';
import { FaCog } from 'react-icons/fa';
import LanguageChanger from '../LanguageChanger';
import Modal from '../Modal';
import ThemeChanger from '../ThemeChanger';

const Settings = ({
  settingsTitle,
  exitButtonText,
  darkModeTitle,
  languagesTitle
}) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button
        aria-label="Open ttings"
        className="cursor-pointer text-xl p-3 focus:outline-none hover:text-yellow-400"
        onClick={() => setShowModal(true)}
      >
        <FaCog className="h-6 w-6" />
      </button>
      <Modal
        hidden={!showModal}
        title={settingsTitle}
        button1={exitButtonText}
        handleClose={() => setShowModal(false)}
      >
        <div className="flex flex-wrap justify-center text-center">
          <ThemeChanger title={darkModeTitle} />
          <LanguageChanger title={languagesTitle} />
        </div>
      </Modal>
    </>
  );
};

export default Settings;
