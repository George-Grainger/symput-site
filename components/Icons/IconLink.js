import Link from 'next/link';
const Icon = ({
  icon,
  accessibleLabel,
  size = 'h-16 w-16',
  buttonColor = ' bg-white',
  href = '/'
}) => {
  return (
    <Link href={href}>
      <button
        aria-label={accessibleLabel}
        className={`${buttonColor} ${size} text-white p-3 text-center inline-flex items-center justify-center shadow-lg rounded-full hover:opacity-80`}
      >
        {icon}
      </button>
    </Link>
  );
};

export default Icon;
