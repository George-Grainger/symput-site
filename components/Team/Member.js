import { FaFacebook, FaGoogle, FaInstagram, FaTwitter } from 'react-icons/fa';
import IconLink from '@/components/Icons/IconLink';
import Link from 'next/link';
import LinkableAvatar from '../LinkableAvatar';
import GoogleIcon from '../Icons/GoogleIcon';

const Member = ({
  name,
  image,
  slug,
  socials = {},
  className = '',
  children
}) => {
  const availableSocials = Object.keys(socials);
  return (
    <div
      className={`${className} flex flex-col items-center card card-black lg:card-hexagon col-span-2`}
    >
      <Link href={`/team/${slug}`}>
        <LinkableAvatar
          alt={name}
          src={image || '/images/hacker.png'}
          className="rounded-full max-w-full cursor-pointer"
          width="64"
          height="64"
        />
      </Link>
      <div className="pt-6 text-center prose prose-dark prose-lg">
        <Link href={`/team/${slug}`}>
          <a className="prose-2xl link link-dark-bg">{name}</a>
        </Link>
        <p className="font-semibold prose prose-dark">{children}</p>
        <div className="flex justify-center">
          {availableSocials.includes('twitter') && (
            <IconLink
              accessibleLabel="Twitter"
              size="h-8 w-8"
              icon={<FaTwitter className="h-5 w-5" />}
              buttonClasses="bg-red-400 mx-2"
            />
          )}
          {availableSocials.includes('facebook') && (
            <IconLink
              accessibleLabel="Facebook"
              size="h-8 w-8"
              icon={<FaFacebook className="h-5 w-5" />}
              buttonClasses="bg-blue-600"
              linkClasses="link link-dark-bg mx-2"
            />
          )}
          {availableSocials.includes('instagram') && (
            <IconLink
              accessibleLabel="Instagram"
              size="h-8 w-8"
              icon={<FaInstagram className="h-5 w-5 text-gray-900" />}
              buttonClasses="bg-white"
              linkClasses="link link-dark-bg mx-2 mt-0"
            />
          )}
          {availableSocials.includes('google') && (
            <IconLink
              accessibleLabel="Google"
              size="h-8 w-8"
              icon={<GoogleIcon className="h-5 w-5" />}
              linkClasses="link link-dark-bg mx-2"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Member;
