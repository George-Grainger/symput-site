import Triangle from '../Triangle';
import LinkColumn from './LinkColumn';
import Socials from './Socials';
import uuid from 'react-uuid';

const Footer = () => {
  const links = [
    {
      title: 'Useful links',
      links: {
        Aims: '/aims',
        'The Team': '/team',
        'Release date': 'release',
        Feedback: '/feedback'
      }
    },
    {
      title: 'Useful links',
      links: {
        Updates: '/updates',
        Licence: '/licence',
        Languages: '/Languages',
        Accessibility: '/accessibility'
      }
    },
    {
      title: 'Other Rescources',
      links: {
        'Contact Us': '/contact-us',
        'Privacy Policy': '/privacy-policy',
        Cookies: '/cookies',
        'CC licencing': '/cc-licence'
      }
    }
  ];
  return (
    <footer className="relative bg-gray-300 pt-8 pb-6">
      <Triangle color="text-gray-300" top />
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-y-8 justify-items-center text-center lg:text-left">
        <Socials />
        {links.map((column) => {
          return <LinkColumn key={uuid()} column={column} />;
        })}
      </div>
      <hr className="my-6 border-gray-400" />
      <div className="flex flex-wrap items-center md:justify-between justify-center">
        <div className="w-full md:w-4/12 px-4 mx-auto text-center">
          <div className="text-sm text-gray-600 font-semibold py-1">
            Copyright © {new Date().getFullYear()} Symput
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
