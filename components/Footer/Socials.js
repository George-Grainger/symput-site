import { FaFacebook, FaGoogle, FaInstagram, FaTwitter } from 'react-icons/fa';
import IconLink from '../Icons/IconLink';

const Socials = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col md:flex-auto gap-6 md:col-span-3 lg:col-span-2">
      <h4 className="text-3xl font-semibold">{title}</h4>
      <h5 className="text-lg text-gray-700">{subtitle}</h5>
      <div className="flex gap-4 justify-between">
        <IconLink
          aria-label="Twitter"
          icon={<FaTwitter />}
          size="h-10 w-10"
          buttonColor="bg-blue-400"
        />
        <IconLink
          aria-label="Facebook"
          icon={<FaFacebook />}
          size="h-10 w-10"
          buttonColor="bg-blue-600"
        />
        <IconLink
          aria-label="Instagram"
          icon={<FaInstagram />}
          size="h-10 w-10"
          buttonColor="bg-gray-800"
        />
        <IconLink
          aria-label="Google"
          icon={<FaGoogle />}
          size="h-10 w-10"
          buttonColor="bg-red-600"
        />
      </div>
    </div>
  );
};

export default Socials;
