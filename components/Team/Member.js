import { FaFacebook, FaGoogle, FaInstagram, FaTwitter } from 'react-icons/fa';
import IconLink from '@/components/Icons/IconLink';
import Link from 'next/link';
import LinkableAvatar from '../LinkableAvatar';

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
          src={image || '/hacker.png'}
          className="rounded-full max-w-full cursor-pointer"
          width="72"
          height="72"
        />
      </Link>
      <div className="pt-6 text-center prose prose-dark prose-lg">
        <Link href={`/team/${slug}`}>
          <a className="prose-2xl link link-dark-bg">{name}</a>
        </Link>
        <p className="mt-1 font-semibold">{children}</p>
        <div className="mt-6 flex justify-center mb-2">
          {availableSocials.includes('twitter') && (
            <IconLink
              accessibleLabel="Twitter"
              size="h-8 w-8"
              icon={<FaTwitter />}
              buttonClasses="bg-red-400 mx-2"
            />
          )}
          {availableSocials.includes('facebook') && (
            <IconLink
              accessibleLabel="Facebook"
              size="h-8 w-8"
              icon={<FaFacebook />}
              buttonClasses="bg-blue-600"
              linkClasses="link link-dark-bg mx-2"
            />
          )}
          {availableSocials.includes('instagram') && (
            <IconLink
              accessibleLabel="Instagram"
              size="h-8 w-8"
              icon={<FaInstagram />}
              buttonClasses="bg-gray-900"
              linkClasses="link link-dark-bg mx-2"
            />
          )}
          {availableSocials.includes('google') && (
            <IconLink
              accessibleLabel="Google"
              size="h-8 w-8"
              icon={<FaGoogle />}
              buttonClasses="bg-red-600"
              linkClasses="link link-dark-bg mx-2"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Member;
