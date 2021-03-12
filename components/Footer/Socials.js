import { FaFacebook, FaGoogle, FaInstagram, FaTwitter } from 'react-icons/fa';
import IconLink from '../Icons/IconLink';

const Socials = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col md:flex-auto gap-6 md:col-span-3 lg:col-span-2">
      <h4 className="text-3xl font-semibold">{title}</h4>
      <h5 className="text-lg text-gray-700 dark:text-gray-300">{subtitle}</h5>
      <div className="flex gap-4 justify-between">
        <IconLink
          accessibleLabel="Twitter"
          icon={<FaTwitter />}
          buttonClasses="bg-blue-400 dark:yellow-ring-on-hover"
        />
        <IconLink
          accessibleLabel="Facebook"
          icon={<FaFacebook />}
          buttonClasses="bg-blue-600 dark:yellow-ring-on-hover"
        />
        <IconLink
          accessibleLabel="Instagram"
          icon={<FaInstagram />}
          buttonClasses="bg-gray-900 dark:yellow-ring-on-hover"
        />
        <IconLink
          accessibleLabel="Google"
          icon={<FaGoogle />}
          buttonClasses="bg-red-600 dark:yellow-ring-on-hover"
        />
      </div>
    </div>
  );
};

export default Socials;
