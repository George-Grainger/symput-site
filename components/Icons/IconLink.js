import Link from 'next/link';
const Icon = ({
  icon,
  accessibleLabel,
  size = 'h-10 w-10',
  buttonClasses = ' bg-white',
  linkClasses = 'link-standard',
  href = '/'
}) => {
  return (
    <Link href={href}>
      <button aria-label={accessibleLabel} className={`${linkClasses} p-1`}>
        <span
          className={`${buttonClasses} ${size} shadow-lg rounded-full text-white items-center justify-center flex`}
        >
          {icon}
        </span>
      </button>
    </Link>
  );
};

export default Icon;
