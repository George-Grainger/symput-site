import LinkColumn from './LinkColumn';
import Socials from './Socials';
import uuid from 'react-uuid';
import { useContext } from 'react';
import { FooterContext } from '@/lib/context';

const Footer = () => {
  const { columns_i18n } = useContext(FooterContext);
  return (
    <footer className="relative bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white pb-6 transition-darkmode clip-triangle-top">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-y-8 justify-items-center text-center lg:text-left">
        <Socials />
        {columns_i18n &&
          columns_i18n?.map((column) => {
            return <LinkColumn key={uuid()} column={column} />;
          })}
      </div>
      <hr className="my-6 border-gray-400" />
      <div className="flex flex-wrap items-center md:justify-between justify-center">
        <div className="w-full md:w-4/12 px-4 mx-auto text-center">
          <div className="text-sm font-semibold py-1">
            Copyright © {new Date().getFullYear()} Symput
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
