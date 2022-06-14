import { FeedbackItemListContext, UserPostsContext } from '@/lib/context';
import { getMoreUserPublishedPosts } from '@/lib/dbUtils';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { FaInfoCircle } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import FeedbackItemList from '../Feedback/FeedbackItemList';
import { useEffect } from 'react';

const UserCard = ({
  user,
  itemListData,
  info_i18n,
  feedbackGiven_i18n,
  noInfo_i18n,
  moderatedP1_i18n,
  moderatedP2_i18n
}) => {
  const handleMore = async (last) => {
    return getMoreUserPublishedPosts(user, last);
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
        { icon: <FaInfoCircle /> }
      );
    }
  }, []);

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
        <div className="prose prose-lg dark:prose-dark mt-10 py-10 border-t border-gray-300 dark:border-gray-600 min-w-feedback text-center transition-darkmode">
          <h2>{info_i18n}</h2>
          <ReactMarkdown
            className="m-auto"
            unwrapDisallowed={true}
            allowedElements={['root', 'text', 'paragraph']}
          >
            {user?.aboutInfo || noInfo_i18n}
          </ReactMarkdown>
        </div>
        <div className="flex flex-col items-center py-10 border-t border-gray-300 dark:border-gray-600 min-w-feedback transition-darkmode">
          <h2 className="prose dark:prose-dark max-w-none text-center text-3xl font-semibold mb-8">
            {feedbackGiven_i18n}
          </h2>
          <FeedbackItemListContext.Provider value={itemListData}>
            <FeedbackItemList getMore={handleMore} context={UserPostsContext} />
          </FeedbackItemListContext.Provider>
        </div>
      </div>
    </section>
  );
};

export default UserCard;
