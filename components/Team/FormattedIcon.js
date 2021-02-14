import Link from 'next/link';

const FormattedIcon = ({ bg, link, children }) => {
  return (
    <Link href="/">
      <button>{children}</button>
    </Link>
  );
};

export default FormattedIcon;
