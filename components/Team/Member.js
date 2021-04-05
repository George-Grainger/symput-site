import Link from 'next/link';
import Image from 'next/image';
import TeamSocialsLinks from './TeamSocialsLinks';

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
        <a className="flex items-center rounded-lg link-dark-bg">
          <Image
            alt={name}
            src={image || '/images/hacker.png'}
            className="rounded-full max-w-full cursor-pointer"
            width="64"
            height="64"
          />
        </a>
      </Link>
      <div className="pt-6 text-center prose prose-dark prose-lg">
        <Link href={`/team/${slug}`}>
          <a className="prose-2xl link link-dark-bg">{name}</a>
        </Link>
        <p className="font-semibold prose prose-dark">{children}</p>
        <TeamSocialsLinks availableSocials={availableSocials} darkbg={true} />
      </div>
    </div>
  );
};

export default Member;
