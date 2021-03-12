import Triangle from '../Triangle';
import LinkColumn from './LinkColumn';
import Socials from './Socials';
import uuid from 'react-uuid';

const Footer = ({ data }) => {
  const { socialsTitle, columns, socialsSubtitle } = data;
  return (
    <footer className="relative bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-white pt-8 pb-6">
      <Triangle color="text-gray-300 dark:text-gray-700" top />
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-y-8 justify-items-center text-center lg:text-left">
        <Socials title={socialsTitle} subtitle={socialsSubtitle} />
        {columns &&
          columns.map((column) => {
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
