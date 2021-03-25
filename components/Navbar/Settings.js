import { useModalState } from '@/lib/useModalState';
import { FaCog } from 'react-icons/fa';
import LanguageChanger from './LanguageChanger';
import Modal from '../Modal';
import ThemeChanger from './ThemeChanger';

const Settings = ({
  settingsTitle,
  exitButtonText,
  darkModeTitle,
  languagesTitle
}) => {
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
        title={settingsTitle}
        button1={exitButtonText}
        handleClose={onClose}
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
