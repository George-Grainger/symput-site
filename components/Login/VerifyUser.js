import { UserContext } from '@/lib/context';
import { useContext } from 'react';
import toast from 'react-hot-toast';

const VerifyUser = () => {
  const { user, username, loading } = useContext(UserContext);

  const sendEmail = async () => {
    if (!loading) {
      toast.promise(user?.sendEmailVerification(), {
        loading: 'Sending email',
        success: 'Email Sent',
        error: 'Email failed to send, please try again.'
      });
    }
  };

  return (
    <div className="grid md:grid-cols-5 w-full h-full">
      <h1 className="md:col-span-5 text-3xl font-semibold w-full">
        Please verify your email {username}
      </h1>
      <hr className="md:col-span-5 my-6 border-b-1 border-gray-200" />

      <div className="md:col-span-6 grid mt-6 gap-y-6 max-w-prose mx-auto">
        <h2 className="text-xl font-semibold">
          If you signed up through Facebook, Twitter, GitHub or Google
        </h2>
        <p>
          The link will be sent to the email address associated with the account
          you signed in with.
        </p>
        <h2 className="text-xl font-semibold mt-12">
          If you signed up through credentials
        </h2>
        <p>
          The link will be sent to the email you registered the account with.
        </p>
      </div>
      <button
        onClick={() => sendEmail(false)}
        className="btn btn-yellow md:col-start-2 md:col-span-3 mt-12"
      >
        Resend the verification email
      </button>
    </div>
  );
};

export default VerifyUser;
