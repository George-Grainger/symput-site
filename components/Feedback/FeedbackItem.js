import Link from 'next/link';
import { UserContext } from '@/lib/context';
import { useState, useEffect, useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import LinkableAvatar from '../LinkableAvatar';
import { FaEdit, FaHeart } from 'react-icons/fa';

export default function FeedbackItem({ post, initialAdmin = false }) {
  const [admin, setAdmin] = useState(initialAdmin);
  const { user, loading } = useContext(UserContext);

  useEffect(() => {
    if (user?.uid === post.uid) {
      setAdmin(true);
    }
  }, [loading]);

  const wordCount = post?.content.trim().split(/\s+/g).length;
  const minutesToRead = (wordCount / 100 + 1).toFixed(0);
  const updatedDate = new Date(post.updatedAt);

  return (
    <Link href={`/${post.username}/${post.slug}`}>
      <div className="px-5 py-4 bg-white hover:bg-gray-200 text-gray-900 rounded-lg min-w-feedback max-w-3xl mb-6 cursor-pointer">
        <div className="relative flex mb-4 items-start">
          {admin && (
            <Link href={`/admin/${post.slug}`}>
              <FaEdit className="absolute right-0 h-6 w-6 text-gray-700 hover:text-yellow-800" />
            </Link>
          )}
          <Link href={`/${post.username}`} passHref>
            <LinkableAvatar
              height="50px"
              width="50px"
              className="object-cover rounded-full"
              src={post.photoURL || '/hacker.png'}
              alt="avatar"
            />
          </Link>
          <div className="ml-4 mt-0.5">
            <Link href={`/${post.username}`}>
              <a className="block font-medium text-base leading-snug hover:text-yellow-800 mb-1">
                {post.username}
              </a>
            </Link>
            <span className="block text-sm font-light leading-snug text-gray-700">
              {updatedDate.toLocaleString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit'
              })}
            </span>
          </div>
        </div>
        <ReactMarkdown>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </ReactMarkdown>
        <div className="flex justify-between items-center mt-5">
          <div className="flex ml-1 font-light items-center">
            <FaHeart className="text-red-500 inline mr-2" />
            {post.heartCount || 0}
          </div>
          <div className="ml-1 font-light text-gray-700">
            {wordCount} words. {minutesToRead} min read
          </div>
        </div>
      </div>
    </Link>
  );
}
