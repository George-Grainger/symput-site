import { FaFacebook, FaGoogle, FaInstagram, FaTwitter } from 'react-icons/fa';
import IconLink from '../Icons/IconLink';

const Socials = () => {
  return (
    <div className="flex flex-col md:flex-auto gap-6 md:col-span-3 lg:col-span-2">
      <h4 className="text-3xl font-semibold">Follow our socials!</h4>
      <h5 className="text-lg text-gray-700">
        Find us on any of these platforms to up to date.
      </h5>
      <div className="flex gap-4 justify-between">
        <IconLink
          icon={<FaTwitter />}
          height="10"
          width="10"
          buttonColor="bg-blue-400"
        />
        <IconLink
          icon={<FaFacebook />}
          height="10"
          width="10"
          buttonColor="bg-blue-600"
        />
        <IconLink
          icon={<FaInstagram />}
          height="10"
          width="10"
          buttonColor="bg-gray-800"
        />
        <IconLink
          icon={<FaGoogle />}
          height="10"
          width="10"
          buttonColor="bg-red-600"
        />
      </div>
    </div>
  );
};

export default Socials;
