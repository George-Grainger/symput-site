import { useModalState } from '@/lib/useModalState';
import { FaCog } from 'react-icons/fa';
import LanguageChanger from './LanguageChanger';
import Modal from '../Modal';
import ThemeChanger from './ThemeChanger';
import { useContext } from 'react';
import { NavContext } from '@/lib/context';

const Settings = () => {
  const {
    settingsTitle_i18n,
    exitButtonText_i18n,
    darkModeTitle_i18n,
    languagesTitle_i18n
  } = useContext(NavContext);
  const { isOpen, onToggle, onClose } = useModalState();
  return (
    <>
      <button
        aria-label="Open setttings"
        className="text-xl p-3 link-standard"
        onClick={onToggle}
      >
        <FaCog className="h-6 w-6" height="1.5rem" width="1.5rem" />
      </button>
      <Modal
        hidden={!isOpen}
        title={settingsTitle_i18n}
        button1={exitButtonText_i18n}
        handleClose={onClose}
      >
        <div className="flex flex-wrap justify-center text-center">
          <ThemeChanger title={darkModeTitle_i18n} />
          <LanguageChanger title={languagesTitle_i18n} />
        </div>
      </Modal>
    </>
  );
};

export default Settings;
