import { auth } from '@/lib/authUtils';
const SignOutButton = () => {
  return <button onClick={() => auth.signOut()}>Sign Out</button>;
};
export default SignOutButton;
