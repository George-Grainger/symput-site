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
      {icon && (
        <Icon
          icon={icon}
          className="h-16 w-16 bg-white p-4 rounded-full text-gray-900"
        />
      )}
      <p className="text-2xl font-semibold">{title}</p>
      <p className="leading-7">{children}</p>
      <Link href={link}>
        <button className="btn">{learnMore}</button>
      </Link>
    </div>
  );
};

export default LinkCard;
