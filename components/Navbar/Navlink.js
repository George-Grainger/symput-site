import Link from 'next/link';

const Navlink = ({ href, children }) => {
  return (
    <Link href={href}>
      <a className="lg:p6 p-4 flex items-center text-s uppercase font-bold hover:text-yellow-400">
        {children}
      </a>
    </Link>
  );
};

export default Navlink;
