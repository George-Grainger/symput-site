import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import IconLink from '@/components/Icons/IconLink';
import GoogleIcon from '../Icons/GoogleIcon';

const TeamSocialsLinks = ({ availableSocials, darkbg }) => {
  return (
    <div className="flex justify-center">
      {availableSocials.includes('twitter') && (
        <IconLink
          accessibleLabel="Twitter"
          size="h-8 w-8"
          icon={<FaTwitter className="h-5 w-5" />}
          buttonClasses="bg-red-400 mx-2"
          linkClasses={`${darkbg ? 'link-dark-bg' : 'link-standard'} link mx-2`}
        />
      )}
      {availableSocials.includes('facebook') && (
        <IconLink
          accessibleLabel="Facebook"
          size="h-8 w-8"
          icon={<FaFacebook className="h-5 w-5" />}
          buttonClasses="bg-blue-600"
          linkClasses={`${darkbg ? 'link-dark-bg' : 'link-standard'} link mx-2`}
        />
      )}
      {availableSocials.includes('instagram') && (
        <IconLink
          accessibleLabel="Instagram"
          size="h-8 w-8"
          icon={
            <FaInstagram
              className={`${
                darkbg ? 'text-gray-900' : 'text-white dark:text-gray-900'
              } h-5 w-5`}
            />
          }
          buttonClasses={darkbg ? 'bg-white' : 'bg-gray-900 dark:bg-white'}
          linkClasses={`${darkbg ? 'link-dark-bg' : 'link-standard'} link mx-2`}
        />
      )}
      {availableSocials.includes('google') && (
        <IconLink
          accessibleLabel="Google"
          size="h-8 w-8"
          icon={<GoogleIcon className="h-5 w-5" />}
          linkClasses={`${darkbg ? 'link-dark-bg' : 'link-standard'} link mx-2`}
        />
      )}
    </div>
  );
};

export default TeamSocialsLinks;
