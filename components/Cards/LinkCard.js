import Link from 'next/link';
import Icon from '../Icons/Icon';

const LinkCard = ({
  className,
  icon,
  title,
  children,
  bgColor = 'bg-white',
  btnClass = 'btn btn-black-inverted',
  link = '/',
  lightText,
  responsive
}) => {
  let textColor = lightText ? 'text-white' : 'text-black';
  if (responsive) {
    textColor = `md:${textColor} ${lightText ? 'text-black' : 'text-white'}`;
  }
  const btnTextColor = lightText ? 'text-black' : 'text-white';
  return (
    <div
      className={`${bgColor} ${textColor} ${className} shadow-lg rounded-lg text-center p-8`}
    >
      {icon && <Icon icon={icon} height="16" width="16" />}
      <p className="text-lg mt-4 font-semibold">{title}</p>
      <p className="text-base opacity-75 mt-2">{children}</p>
      <Link href={link}>
        <button
          className={`${btnClass} ${btnTextColor} btn mt-6 cursor-pointer`}
        >
          Learn more
        </button>
      </Link>
    </div>
  );
};

export default LinkCard;
