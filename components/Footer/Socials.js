import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import GoogleIcon from '../Icons/GoogleIcon';
import IconLink from '../Icons/IconLink';
import { useContext } from 'react';
import { FooterContext } from '@/lib/context';

const Socials = () => {
  const { title_i18n, subtitle_i18n } = useContext(FooterContext);
  return (
    <div className="flex flex-col md:flex-auto md:col-span-3 lg:col-span-2">
      <h4 className="text-3xl font-semibold mb-6">{title_i18n}</h4>
      <h5 className="text-lg text-gray-700 dark:text-gray-300 mb-6 transition-darkmode">
        {subtitle_i18n}
      </h5>
      <div className="flex justify-between">
        <IconLink
          accessibleLabel="Twitter"
          icon={<FaTwitter className="h-6 w-6" />}
          buttonClasses="bg-blue-400 dark:yellow-ring-on-hover"
        />
        <IconLink
          accessibleLabel="Facebook"
          icon={<FaFacebook className="h-6 w-6" />}
          buttonClasses="bg-blue-600 dark:yellow-ring-on-hover"
        />
        <IconLink
          accessibleLabel="Instagram"
          icon={<FaInstagram className="h-6 w-6" />}
          buttonClasses="bg-gray-900 dark:yellow-ring-on-hover"
        />
        <IconLink
          accessibleLabel="Google"
          icon={<GoogleIcon className="h-6 w-6" />}
          buttonClasses="bg-white dark:yellow-ring-on-hover"
        />
      </div>
    </div>
  );
};

export default Socials;
