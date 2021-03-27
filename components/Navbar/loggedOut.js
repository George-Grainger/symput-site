import Link from 'next/link';

export default function LoggedOut({
  loginText,
  className = 'btn hidden lg:block md:mx-3'
}) {
  return (
    <li className="flex justify-center">
      <Link href="/sign-in">
        <a className={`${className} btn-yellow lg:my-0 my-6`}>{loginText}</a>
      </Link>
    </li>
  );
}
