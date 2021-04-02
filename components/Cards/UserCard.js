import { FeedbackItemListContext, UserPostsContext } from '@/lib/context';
import { getMoreUserPublishedPosts, getUserWithUsername } from '@/lib/dbUtils';
import Image from 'next/image';
import FeedbackItemList from '../Feedback/FeedbackItemList';

const UserCard = ({ user, itemListData, info_i18n, feedbackGiven_i18n }) => {
  const handleMore = async (last) => {
    const userDoc = await getUserWithUsername(user.username);
    return getMoreUserPublishedPosts(userDoc, last);
  };

  return (
    <section className="section-default pt-24 pb-36 px-4 sm:px-8">
      <div className="w-fs-card px-4 sm:px-8 bg-white dark:bg-gray-900 flex flex-col items-center rounded-lg relative transition-darkmode">
        <div className="absolute transform-gpu -translate-y-1/2">
          <Image
            className="object-cover rounded-full"
            height="100px"
            width="100px"
            src={user.photoURL || '/images/hacker.png'}
          />
        </div>
        <h1 className="pt-16 prose text-5xl dark:prose-dark font-semibold leading-normal">
          {user.username}
        </h1>
        <div className="prose prose-lg dark:prose-dark mt-10 py-10 border-t border-gray-300 dark:border-gray-600 min-w-feedback text-center transition-darkmode">
          <h2>{info_i18n}</h2>
          <p className="m-auto">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda
            ullam voluptatem fugit vel esse doloremque id nesciunt aliquid rem,
            necessitatibus earum. Animi, consequuntur quo doloribus expedita
            incidunt nemo pariatur amet.
          </p>
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
