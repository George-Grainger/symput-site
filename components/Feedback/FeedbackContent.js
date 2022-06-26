import Link from 'next/link';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';
import { useContext, useEffect } from 'react';
import { FeedbackItemContext } from '@/lib/context';
import toast from 'react-hot-toast';
import { FaInfoCircle } from 'react-icons/fa';

// UI component for main post content
export default function FeedbackContent({ post }) {
  const { writtenBy_i18n, on_i18n, moderatedP1_i18n, moderatedP2_i18n } =
    useContext(FeedbackItemContext);
  const { locale } = useRouter();
  const updatedDate =
    typeof post?.updatedAt === 'number'
      ? new Date(post.updatedAt)
      : post.updatedAt?.toDate();

  useEffect(() => {
    if (post?.moderated) {
      toast(
        <span>
          {moderatedP1_i18n}
          <Link href="/terms">
            <a className="link link-light-bg underline">{moderatedP2_i18n}</a>
          </Link>
        </span>,
        { icon: <FaInfoCircle size={50} /> }
      );
    }
  }, [post?.moderated]);

  const localisedDate = updatedDate?.toLocaleString(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });

  const getWrittenOnString = () => {
    if (!updatedDate) {
      return 'Just updated';
    } else {
      return (
        <span className="lang-switch">
          {writtenBy_i18n}
          <Link href={`/${post.username}/`}>
            <a className="link-standard p-1">@{post.moderatedUsername}</a>
          </Link>
          {`${on_i18n} ${localisedDate}`}
        </span>
      );
    }
  };
  return (
    <article className="w-full">
      <h1 className="text-4xl text-center">{post?.title}</h1>
      <hr className="my-8" />
      <ReactMarkdown
        className="mx-auto max-w-[100vw-4rem] sm:max-w-prose"
        components={{
          link: ({ children, href }) => {
            return (
              <Link href={href}>
                <a>{children}</a>
              </Link>
            );
          }
        }}
      >
        {post?.content}
      </ReactMarkdown>
      <hr className="my-8" />
      <p className="text-center">{getWrittenOnString()}</p>
    </article>
  );
}
