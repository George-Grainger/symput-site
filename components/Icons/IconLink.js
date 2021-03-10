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
      <button aria-label={accessibleLabel} className="p-1 link link-standard">
        <span
          className={`${buttonColor} ${size} shadow-lg rounded-full text-white items-center justify-center flex dark:hover:ring-2 ring-yellow-400 transition duration-150`}
        >
          {icon}
        </span>
      </button>
    </Link>
  );
};

export default Icon;
