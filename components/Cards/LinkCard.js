import Link from 'next/link';
import Icon from '../Icons/Icon';

const LinkCard = ({
  className,
  learnMore,
  icon,
  title,
  children,
  link = '/'
}) => {
  return (
    <div className={`${className} shadow-lg rounded-lg text-center p-8`}>
      {icon && <Icon icon={icon} size="h-16 w-16" />}
      <p className="text-lg mt-4 font-semibold">{title}</p>
      <p className="text-base opacity-75 mt-2">{children}</p>
      <Link href={link}>
        <button className={`btn mt-6 cursor-pointer`}>{learnMore}</button>
      </Link>
    </div>
  );
};

export default LinkCard;
