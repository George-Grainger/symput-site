import Link from 'next/link';

export default function LoggedOut() {
  return (
    <ul>
      <li>
        <Link href="/enter">
          <button className="btn btn-yellow md:block hidden">Log in</button>
        </Link>
      </li>
    </ul>
  );
}
