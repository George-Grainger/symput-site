import Image from 'next/image';
import { FaFacebook } from 'react-icons/fa';
import {
  AiFillGoogleCircle,
  AiFillInstagram,
  AiFillTwitterCircle
} from 'react-icons/ai';
import Link from 'next/link';

const Member = ({ name, image, slug, socials = {}, children }) => {
  const availableSocials = Object.keys(socials);
  return (
    <div className="flex flex-col items-center w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
      <Link href={`/team/${slug}`}>
        <Image
          alt={name}
          src={image || '/hacker.png'}
          className="rounded-full max-w-full cursor-pointer"
          width="120"
          height="120"
        />
      </Link>
      <div className="pt-6 text-center">
        <Link href={`/team/${slug}`}>
          <h5 className="text-xl font-bold cursor-pointer hover:text-yellow-500">
            {name}
          </h5>
        </Link>
        <p className="mt-1 text-sm text-gray-500 uppercase font-semibold">
          {children}
        </p>
        <div className="mt-6 flex justify-center gap-2">
          {availableSocials.includes('twitter') && (
            <Link href={socials.twitter}>
              <AiFillTwitterCircle className="text-blue-400 h-6 w-6" />
            </Link>
          )}
          {availableSocials.includes('facebook') && (
            <Link href={socials.facebook}>
              <FaFacebook className="text-blue-600 h-6 w-6" />
            </Link>
          )}
          {availableSocials.includes('instagram') && (
            <Link bg="" href={socials.instagram}>
              <AiFillInstagram className="text-gray-800 h-6 w-6" />
            </Link>
          )}
          {availableSocials.includes('google') && (
            <Link href={socials.google}>
              <AiFillGoogleCircle className="text-red-600 h-6 w-6" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Member;
