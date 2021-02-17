import Link from 'next/link';

export default function LoggedOut({
  loginText,
  className = 'btn hidden lg:block'
}) {
  return (
    <li>
      <Link href="/enter">
        <button className={`${className} btn-yellow lg:my-0 my-6`}>
          {loginText}
        </button>
      </Link>
    </li>
  );
}
