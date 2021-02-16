import Link from 'next/link';

export default function LoggedOut({ loginText }) {
  return (
    <ul>
      <li>
        <Link href="/enter">
          <button className="btn btn-yellow md:block hidden">
            {loginText}
          </button>
        </Link>
      </li>
    </ul>
  );
}
