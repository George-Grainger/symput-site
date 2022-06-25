import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import IconLink from '@/components/Icons/IconLink';
import GoogleIcon from '../Icons/GoogleIcon';

const TeamSocialsLinks = ({ socials = {}, darkbg }) => {
  const availableSocials = Object.keys(socials);
  return (
    <div className="flex justify-center">
      {availableSocials.includes('twitter') && (
        <IconLink
          href={socials.twitter}
          accessibleLabel="Twitter"
          size="h-8 w-8"
          icon={<FaTwitter className="h-5 w-5" />}
          buttonClasses="bg-[#1DA1F2]"
          linkClasses={`${darkbg ? 'link-dark-bg' : 'link-standard'} link mx-2`}
        />
      )}
      {availableSocials.includes('facebook') && (
        <IconLink
          href={socials.facebook}
          accessibleLabel="Facebook"
          size="h-8 w-8"
          icon={<FaFacebook className="h-5 w-5" />}
          buttonClasses="bg-[#4267B2]"
          linkClasses={`${darkbg ? 'link-dark-bg' : 'link-standard'} link mx-2`}
        />
      )}
      {availableSocials.includes('instagram') && (
        <IconLink
          href={socials.instagram}
          accessibleLabel="Instagram"
          size="h-8 w-8"
          icon={<FaInstagram className={'text-white h-5 w-5'} />}
          buttonClasses={'bg-instagram'}
          linkClasses={`${darkbg ? 'link-dark-bg' : 'link-standard'} link mx-2`}
        />
      )}
      {availableSocials.includes('google') && (
        <IconLink
          href={socials.google}
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
