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
      <a
        aria-label={accessibleLabel}
        className={`${linkClasses} p-1`}
        target="_blank"
        rel="noreferrer"
      >
        <span
          className={`${buttonClasses} ${size} shadow-lg rounded-full text-white items-center justify-center flex`}
        >
          {icon}
        </span>
      </a>
    </Link>
  );
};

export default Icon;
