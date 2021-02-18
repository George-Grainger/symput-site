import Link from 'next/link';

const Navlink = ({ href, children, sidebar = false }) => {
  return (
    <li>
      <Link href={href}>
        <a
          className={` ${
            sidebar ? 'p-8 text-2xl' : 'lg:p6 p-4 text-lg'
          } flex items-center font-semibold hover:text-yellow-400`}
        >
          {children}
        </a>
      </Link>
    </li>
  );
};

export default Navlink;
