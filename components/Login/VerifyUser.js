import { UserContext, SignInContext } from '@/lib/context';
import { useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

const VerifyUser = () => {
  const { verifyPage_i18n } = useContext(SignInContext);
  const {
    heading_i18n,
    p1Subtitle_i18n,
    p1Content_i18n,
    p2Subtitle_i18n,
    p2Content_i18n,
    button_i18n,
    toast_i18n
  } = verifyPage_i18n;
  const { user, username, loading, handleVerification } = useContext(
    UserContext
  );

  const sendEmail = async (firstLoad = false) => {
    if (firstLoad) {
      handleVerification();
    } else if (!loading) {
      toast.promise(user?.sendEmailVerification(), toast_i18n);
    }
  };

  useEffect(() => sendEmail(true), []);

  return (
    <div className="grid md:grid-cols-5 w-full h-full">
      <h1 className="md:col-span-5 text-3xl font-semibold w-full">
        {heading_i18n} {username}
      </h1>
      <hr className="md:col-span-5 my-6 border-b-1 border-gray-200" />

      <div className="md:col-span-6 grid mt-6 gap-y-6 max-w-prose mx-auto">
        <h2 className="text-xl font-semibold">{p1Subtitle_i18n}</h2>
        <p>{p1Content_i18n}</p>
        <h2 className="text-xl font-semibold mt-12">{p2Subtitle_i18n}</h2>
        <p>{p2Content_i18n}</p>
      </div>
      <button
        onClick={sendEmail}
        className="btn btn-yellow md:col-start-2 md:col-span-3 mt-12"
      >
        {button_i18n}
      </button>
    </div>
  );
};

export default VerifyUser;
