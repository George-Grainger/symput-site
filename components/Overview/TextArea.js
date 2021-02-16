import Link from 'next/link';
import { HiChevronDoubleRight } from 'react-icons/hi';
import { GiProgression } from 'react-icons/gi';
import Icon from '../Icons/Icon';

const TextArea = ({ title, linkText, children }) => {
  return (
    <>
      <Icon icon={<GiProgression />} height="16" width="16" />
      <h3 className="text-3xl mb-4 font-semibold leading-normal">{title}</h3>
      <div className="text-lg font-light leading-relaxed text-gray-700 flex flex-col gap-4">
        {children}
        <Link href="/">
          <a className="font-bold hover:text-yellow-400">
            {linkText} <HiChevronDoubleRight className="ml-1 inline" />
          </a>
        </Link>
      </div>
    </>
  );
};

export default TextArea;
