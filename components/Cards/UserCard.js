import Image from 'next/image';

const UserCard = ({ user }) => {
  return (
    <section className="relative pt-12 pb-24 px-8 w-full min-h-1.1v flex justify-center items-center transition-colors duration-300 bg-gray-200 dark:bg-gray-900">
      <div className="px-6 bg-white">
        <img src={user.photoURL || '/hacker.png'} />
        <p>
          <i>@{user.username}</i>
        </p>
        <h1>{user.displayName || 'Anonymous User'}</h1>
      </div>
    </section>
  );
};

export default UserCard;
