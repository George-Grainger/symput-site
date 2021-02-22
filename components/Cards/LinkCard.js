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
    <div className={`${className} card`}>
      {icon && <Icon icon={icon} size="h-16 w-16" />}
      <p className="text-2xl mt-4 font-semibold">{title}</p>
      <p className="text-base opacity-75 mt-4">{children}</p>
      <Link href={link}>
        <button className="btn mt-6 cursor-pointer">{learnMore}</button>
      </Link>
    </div>
  );
};

export default LinkCard;
