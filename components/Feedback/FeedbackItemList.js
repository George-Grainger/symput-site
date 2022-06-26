import FeedbackItem from './FeedbackItem';
import ButtonEllipsis from '@/components/Loading/ButtonEllipsis';
import uuid from 'react-uuid';
import { useAsync } from '@/lib/useAsync';
import { useContext, useEffect } from 'react';
import FeedbackPlaceholder from '../Loading/FeedbackPlaceHolder';
import { FeedbackItemListContext } from '@/lib/context';
import ThinkingSvg from '../Icons/ThinkingSvg';

const FeedbackItemList = ({
  getMore,
  context,
  trigger = false,
  placeHolders = 1,
  postHeader = <></>,
  noPostMessage = false
}) => {
  const { posts, setPosts, isEnd, setIsEnd } = useContext(context);
  const { loadMore_i18n, reachedEnd_i18n, error_i18n, noPosts_i18n } =
    useContext(FeedbackItemListContext);

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
    return Array.from({ length: placeHolders }, (_) => (
      <FeedbackPlaceholder key={uuid()} />
    ));
  } else if (posts?.length === 0) {
    return (
      noPostMessage || (
        <div className="prose prose-xl dark:prose-dark my-8">
          <ThinkingSvg className="mx-auto h-24 w-24" />
          <p>{noPosts_i18n}</p>
        </div>
      )
    );
  } else {
    return (
      <>
        {postHeader}
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
