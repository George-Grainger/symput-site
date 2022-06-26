import { FeedbackItemListContext, UserPostsContext } from '@/lib/context';
import { getMoreUserPublishedPosts, getUserByUid } from '@/lib/dbUtils';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { FaInfoCircle } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import FeedbackItemList from '../Feedback/FeedbackItemList';
import { useState, useEffect } from 'react';
import { useAsync } from '@/lib/useAsync';
import { useRouter } from 'next/router';
import ButtonEllipsis from '../Loading/ButtonEllipsis';

const UserCard = ({
  user,
  uid,
  itemListData,
  info_i18n,
  feedbackGiven_i18n,
  noInfo_i18n,
  moderatedP1_i18n,
  moderatedP2_i18n,
  lastUpdated_i18n,
  unknown_i18n
}) => {
  const { locale } = useRouter();
  const generateDateNow = () =>
    new Date().toLocaleString(locale, {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit'
    });

  const { loading, result, execute } = useAsync({
    asyncFunction: () => getUserByUid(uid)
  });

  const [lastUpdate, setLastUpdate] = useState(generateDateNow());
  const [posts, setPosts] = useState([]);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    setLastUpdate(generateDateNow());
  }, [posts, locale]);

  const handleMore = async (last) => {
    return getMoreUserPublishedPosts(uid, last);
  };

  useEffect(() => {
    if (user?.moderated) {
      toast(
        <span>
          <>
            {moderatedP1_i18n}
            <Link href="/terms">
              <a className="link link-light-bg underline">{moderatedP2_i18n}</a>
            </Link>
          </>
        </span>,
        { icon: <FaInfoCircle size={50} /> }
      );
    }
  }, [user?.moderated]);

  useEffect(() => {
    execute();
  }, [user?.aboutInfo]);

  return (
    <section className="section-default pt-24 pb-36 px-4 sm:px-8">
      <div className="w-fs-card px-4 sm:px-8 bg-white dark:bg-gray-900 flex flex-col items-center rounded-lg relative transition-darkmode">
        <div className="absolute transform-gpu -translate-y-1/2">
          <Image
            alt="Profile Image"
            className="object-cover rounded-full"
            height="100px"
            width="100px"
            src={user.photoURL || '/images/hacker.png'}
          />
        </div>
        <h1 className="pt-16 prose text-5xl dark:prose-dark font-semibold leading-normal">
          {user.moderatedUsername}
        </h1>
        <span className="text-sm font-weight-light text-gray-700 dark:text-white lang-switch">
          {`${lastUpdated_i18n} ${lastUpdate || unknown_i18n}`}
        </span>
        <div className="prose prose-lg dark:prose-dark mt-10 py-10 border-t border-gray-300 dark:border-gray-600 min-w-feedback text-center transition-darkmode">
          <h2>{info_i18n}</h2>
          {loading ? (
            <ButtonEllipsis color="bg-gray-900 dark:bg-white" />
          ) : (
            <ReactMarkdown
              className="m-auto"
              unwrapDisallowed={true}
              allowedElements={['root', 'text', 'paragraph']}
            >
              {result?.aboutInfo || noInfo_i18n}
            </ReactMarkdown>
          )}
        </div>
        <div className="flex flex-col items-center py-10 border-t border-gray-300 dark:border-gray-600 min-w-feedback transition-darkmode">
          <h2 className="prose dark:prose-dark max-w-none text-center text-3xl font-semibold mb-8">
            {feedbackGiven_i18n}
          </h2>
          <UserPostsContext.Provider
            value={{ posts, setPosts, isEnd, setIsEnd }}
          >
            <FeedbackItemListContext.Provider value={itemListData}>
              <FeedbackItemList
                getMore={handleMore}
                context={UserPostsContext}
                trigger
              />
            </FeedbackItemListContext.Provider>
          </UserPostsContext.Provider>
        </div>
      </div>
    </section>
  );
};

export default UserCard;
