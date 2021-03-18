import AuthCheck from '@/components/AuthCheck';
import FeedbackManager from '@/components/AdminArea/FeedbackManager';

export default function AdminPostEdit() {
  return (
    <AuthCheck>
      <FeedbackManager />
    </AuthCheck>
  );
}
