import Image from 'next/image';
import FeedbackItem from '../Feedback/FeedbackItem';

const UserCard = ({ user, posts }) => {
  return (
    <section className="section-default py-24 px-4 sm:px-8">
      <div className="min-w-fs-card px-4 sm:px-8 bg-white dark:bg-gray-900 flex flex-col items-center rounded-lg relative transition-darkmode">
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
          <h2 className="mb-6">Info</h2>
          <p className="m-auto">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda
            ullam voluptatem fugit vel esse doloremque id nesciunt aliquid rem,
            necessitatibus earum. Animi, consequuntur quo doloribus expedita
            incidunt nemo pariatur amet.
          </p>
        </div>
        <div className="prose prose-lg dark:prose-dark py-10 border-t border-gray-300 dark:border-gray-600 min-w-feedback text-center transition-darkmode">
          <h2 className="m-6">Feedback given</h2>
          {posts ? (
            posts.map((post) => (
              <FeedbackItem
                key={uuid()}
                post={post}
                key={post.slug}
                admin={true}
              />
            ))
          ) : (
            <p className="text-lg leading-relaxed text-gray-800">
              No feedback to show
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default UserCard;
