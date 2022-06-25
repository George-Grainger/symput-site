import Link from 'next/link';

const Navlink = ({ href, children, sidebar = false }) => {
  return (
    <li>
      <Link href={href}>
        <a
          className={` ${
            sidebar ? 'text-2xl' : 'text-lg'
          } lg:p6 p-4 flex items-center justify-center font-semibold link-standard mx-2 xl:mx-4 transition-darkmode`}
        >
          {children}
        </a>
      </Link>
    </li>
  );
};

export default Navlink;
