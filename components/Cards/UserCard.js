import Image from 'next/image';
import FeedbackItem from '../Feedback/FeedbackItem';

const UserCard = ({ user, posts }) => {
  return (
    <section className="section-default pt-36 pb-24 px-4 sm:px-8">
      <div className="min-w-fs-card px-4 sm:px-8 bg-white dark:bg-gray-300 flex flex-col items-center rounded-lg relative">
        <div className="absolute transform-gpu -translate-y-1/2">
          <Image
            className="object-cover rounded-full"
            height="100px"
            width="100px"
            src={user.photoURL || '/hacker.png'}
          />
        </div>
        <h1 className="pt-16 text-4xl font-semibold leading-normal">
          {user.username}
        </h1>
        <div className="mt-10 py-10 border-t border-gray-300 dark:border-gray-700 min-w-feedback text-center">
          <h2 className="text-2xl leading-relaxed font-semibold mb-6">Info</h2>
          <p className="prose prose-lg leading-relaxed mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda
            ullam voluptatem fugit vel esse doloremque id nesciunt aliquid rem,
            necessitatibus earum. Animi, consequuntur quo doloribus expedita
            incidunt nemo pariatur amet.
          </p>
        </div>
        <div className="py-10 border-t border-gray-300 dark:border-gray-700 min-w-feedback text-center">
          <h2 className="text-2xl leading-relaxed font-semibold mb-6">
            Feedback given
          </h2>
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
