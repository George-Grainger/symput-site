import { useState } from 'react';
import { AdminContext } from '@/lib/context';
import { getPosts } from '@/lib/db-utils';
import FeedbackItemList from '../Feedback/FeedbackItemList';

const AdminFeedbackList = () => {
  const [posts, setPosts] = useState([]);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <>
      <AdminContext.Provider value={{ posts, setPosts, isEnd, setIsEnd }}>
        <FeedbackItemList getMore={getPosts} context={AdminContext} trigger />
      </AdminContext.Provider>
    </>
  );
};

export default AdminFeedbackList;
