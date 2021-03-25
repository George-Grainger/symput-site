import { UserContext } from '@/lib/context';
import { useContext } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Completed = () => {
  const router = useRouter();

  const { username } = useContext(UserContext);
  return (
    <div className="grid w-full h-full">
      <h1 className="text-3xl font-semibold w-full">
        Congratulations {username}!
      </h1>
      <hr className="my-6 border-b-1 border-gray-200" />

      <div className="grid gap-y-6 max-w-prose mx-auto">
        <h2 className="text-xl font-semibold">You're fully signed up.</h2>
        <Image src="/images/celebration.svg" height="200px" width="392px" />
        <p>
          Let us know your feedback through the admin area.
          <br />
          We'd love to know what you have to say.
        </p>
        <button
          onClick={() => router.push('/admin')}
          className="btn btn-yellow w-3/4 mx-auto"
        >
          Take a look round
        </button>
      </div>
    </div>
  );
};

export default Completed;
