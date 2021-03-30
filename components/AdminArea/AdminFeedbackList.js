import { useState } from 'react';
import { AdminPostsContext } from '@/lib/context';
import { getPosts } from '@/lib/dbUtils';
import FeedbackItemList from '../Feedback/FeedbackItemList';

const AdminFeedbackList = () => {
  const [posts, setPosts] = useState([]);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <>
      <AdminPostsContext.Provider value={{ posts, setPosts, isEnd, setIsEnd }}>
        <FeedbackItemList
          getMore={getPosts}
          context={AdminPostsContext}
          trigger
        />
      </AdminPostsContext.Provider>
    </>
  );
};

export default AdminFeedbackList;
