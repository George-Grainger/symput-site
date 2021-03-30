import FeedbackItem from './FeedbackItem';
import ButtonEllipsis from '@/components/Loading/ButtonEllipsis';
import uuid from 'react-uuid';
import { useAsync } from '@/lib/useAsync';
import { useContext, useEffect } from 'react';
import FeedbackPlaceholder from '../Loading/FeedbackPlaceHolder';
import { FeedbackItemListContext } from '@/lib/context';
import { FaRegFrown } from 'react-icons/fa';

const FeedbackItemList = ({ getMore, context, trigger = false }) => {
  const { posts, setPosts, isEnd, setIsEnd } = useContext(context);
  const { loadMore_i18n, reachedEnd_i18n, error_i18n } = useContext(
    FeedbackItemListContext
  );

  const getMoreFeedback = async (last) => {
    const [newPosts, nowIsEnd] = await getMore(last);
    setPosts(posts.concat(newPosts));
    setIsEnd(nowIsEnd);
    return;
  };

  useEffect(() => {
    if (trigger) {
      execute();
    }
  }, []);

  const { loading, error, execute } = useAsync({
    asyncFunction: () => getMoreFeedback(posts[posts.length - 1] || -1)
  });
  if (posts?.length === 0 && loading) {
    return (
      <>
        <FeedbackPlaceholder />
      </>
    );
  } else if (posts?.length === 0) {
    return (
      <div className="prose prose-xl dark:prose-dark my-8">
        <FaRegFrown className="mx-auto h-16 w-16" />
        <p>Yet to provide feedback</p>
      </div>
    );
  } else {
    return (
      <>
        {posts?.map((post) => (
          <FeedbackItem key={uuid()} post={post} />
        ))}
        {!isEnd && (
          <button
            onClick={execute}
            disabled={loading}
            className={`btn-lg ${
              error ? 'btn btn-red' : 'btn-black dark:btn-yellow'
            } my-4`}
          >
            {error ? (
              error_i18n
            ) : loading ? (
              <ButtonEllipsis color="bg-white" />
            ) : (
              loadMore_i18n
            )}
          </button>
        )}
        {posts.length > 0 && isEnd && (
          <div className="font-bold py-3 px-6 rounded shadow-md cursor-default bg-green-500 text-white my-4">
            {reachedEnd_i18n}
          </div>
        )}
      </>
    );
  }
};

export default FeedbackItemList;
