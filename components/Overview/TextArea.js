import Link from 'next/link';
import { HiChevronDoubleRight } from 'react-icons/hi';
import { GiProgression } from 'react-icons/gi';
import Icon from '../Icons/Icon';

const TextArea = ({ title, linkText, children }) => {
  return (
    <>
      <Icon
        icon={<GiProgression className="h-6 w-6" />}
        className="h-16 w-16 bg-white p-4 rounded-full text-gray-900 shadow-lg flex items-center justify-center"
      />
      <h3 className="text-3xl my-4 font-semibold leading-normal">{title}</h3>
      <div className="prose prose-lg dark:prose-dark font-light">
        {children}
        <Link href="/">
          <a className="link">
            {linkText} <HiChevronDoubleRight className="ml-1 inline" />
          </a>
        </Link>
      </div>
    </>
  );
};

export default TextArea;
