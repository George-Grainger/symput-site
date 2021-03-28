import Link from 'next/link';
import { useRouter } from 'next/router';
import ReactMarkdown from 'react-markdown';
import { useContext } from 'react';
import { FeedbackItemContext } from '@/lib/context';

// UI component for main post content
export default function FeedbackContent({ post }) {
  const { writtenBy_i18n, on_i18n } = useContext(FeedbackItemContext);
  const { locale } = useRouter();
  const updatedDate =
    typeof post?.updatedAt === 'number'
      ? new Date(post.updatedAt)
      : post.updatedAt?.toDate();

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
        <>
          <span>{writtenBy_i18n}&nbsp;</span>
          <Link href={`/${post.username}/`}>
            <a className="link-standard p-1">@{post.username}</a>
          </Link>
          <span>{` ${on_i18n} ${localisedDate}`}</span>
        </>
      );
    }
  };
  return (
    <article className="w-full">
      <h1 className="text-4xl text-center">{post?.title}</h1>
      <hr className="my-8" />
      <ReactMarkdown className="mx-auto max-w-markdown sm:max-w-prose">
        {post?.content}
      </ReactMarkdown>
      <hr className="my-8" />
      <p className="text-center">{getWrittenOnString()}</p>
    </article>
  );
}
