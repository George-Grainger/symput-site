import { UserContext, SignInContext } from '@/lib/context';
import { useContext } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Completed = () => {
  const router = useRouter();
  const { completedPage_i18n } = useContext(SignInContext);
  const {
    heading_i18n,
    subheading_i18n,
    p1_i18n,
    p2_i18n,
    button_i18n,
    imgAlt_i18n
  } = completedPage_i18n;
  const { username } = useContext(UserContext);
  return (
    <div className="grid w-full h-full">
      <h1 className="text-3xl font-semibold w-full">
        {heading_i18n} {username}!
      </h1>
      <hr className="my-6 border-b-1 border-gray-200" />

      <div className="grid gap-y-6 max-w-prose mx-auto">
        <h2 className="text-xl font-semibold">{subheading_i18n}</h2>
        <Image
          src="/images/celebration.svg"
          height="200px"
          width="392px"
          alt={imgAlt_i18n}
        />
        <p>
          {p1_i18n}
          <br />
          {p2_i18n}
        </p>
        <button
          onClick={() => router.push('/admin')}
          className="btn btn-yellow w-3/4 mx-auto"
        >
          {button_i18n}
        </button>
      </div>
    </div>
  );
};

export default Completed;
