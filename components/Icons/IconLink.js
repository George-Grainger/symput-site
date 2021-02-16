import Link from 'next/link';
const Icon = ({
  icon,
  height = '16',
  width = '16',
  buttonColor = 'bg-white',
  href = '/'
}) => {
  return (
    <Link href={href}>
      <button
        className={`text-white ${buttonColor} h-${height} w-${width} p-3 text-center inline-flex items-center justify-center shadow-lg rounded-full hover:opacity-80`}
      >
        {icon}
      </button>
    </Link>
  );
};

export default Icon;
