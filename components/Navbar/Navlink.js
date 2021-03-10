import Link from 'next/link';

const Navlink = ({ href, children, sidebar = false }) => {
  return (
    <li>
      <Link href={href}>
        <a
          className={` ${
            sidebar ? 'text-2xl' : 'text-lg'
          } lg:p6 p-4 flex items-center justify-center font-semibold link-standard`}
        >
          {children}
        </a>
      </Link>
    </li>
  );
};

export default Navlink;
