import Link from 'next/link';
import { UserContext } from '@/lib/context';
import { useState, useEffect, useContext } from 'react';
import ReactMarkdown from 'react-markdown';
import LinkableAvatar from '../LinkableAvatar';

export default function FeedbackItem({ post, initialAdmin = false }) {
  const [admin, setAdmin] = useState(initialAdmin);
  const { user, loading } = useContext(UserContext);

  useEffect(() => {
    if (user?.uid === post.uid) {
      setAdmin(true);
    }
  }, [loading]);
  console.log('admin - ', admin);

  const wordCount = post?.content.trim().split(/\s+/g).length;
  const minutesToRead = (wordCount / 100 + 1).toFixed(0);

  return (
    <Link href={`/${post.username}/${post.slug}`}>
      <div className="min-w-feedback px-10 my-4 py-6 bg-white rounded-lg shadow-md cursor-pointer">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl sm:text-2xl text-black font-bold">
            <a>{post.title}</a>
          </h2>
          <span className="text-gray-800">
            {wordCount} words. {minutesToRead} min read
          </span>
        </div>
        <p className="mt-2 text-black">
          <ReactMarkdown>
            {post.content.length < 100
              ? post.content
              : post.content.substr(0, 100)}
          </ReactMarkdown>
        </p>
        <div className="flex justify-between items-center">
          <span>💗 {post.heartCount || 0}</span>
          <Link href={`/${post.username}`} passHref>
            <a className="flex items-center mt-4">
              <LinkableAvatar
                height="40px"
                width="40px"
                className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
                src={post.photoURL || '/hacker.png'}
                alt="avatar"
              />
              <strong className="sm:ml-4 text-gray-800 font-superbold">
                By @{post.username}
              </strong>
            </a>
          </Link>
        </div>
        {admin && (
          <Link href={`/admin/${post.slug}`}>
            <a className="btn-sm btn-yellow w-full sm:auto order-2 mt-4">
              Edit your post
            </a>
          </Link>
        )}
      </div>
    </Link>
  );
}
