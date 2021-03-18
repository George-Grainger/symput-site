import AuthCheck from '@/components/AuthCheck';
import PostFeed from '@/components/Feedback/FeedbackFeed';
import { UserContext } from '@/lib/context';
import { firestore, auth, serverTimestamp } from '@/lib/firebase';

import { useContext, useState } from 'react';
import { useRouter } from 'next/router';

import { useCollection } from 'react-firebase-hooks/firestore';
import kebabCase from 'lodash.kebabcase';
import toast from 'react-hot-toast';
import { getFooterData, getNavbarData } from '@/lib/pageContent';
import Layout from 'layout/Layout';
import FeedbackItem from '@/components/Feedback/FeedbackItem';

export const getStaticProps = async ({ locale }) => {
  const navbarData = getNavbarData(locale);
  const footerData = getFooterData(locale);
  return {
    props: {
      navbarData,
      footerData
    }
  };
};

export default function AdminPostsPage({ navbarData, footerData }) {
  return (
    <Layout navbarData={navbarData} footerData={footerData}>
      <AuthCheck>
        <PostList />
        <CreateNewPost />
      </AuthCheck>
    </Layout>
  );
}

function PostList() {
  const ref = firestore
    .collection('users')
    .doc(auth.currentUser.uid)
    .collection('posts');
  const query = ref.orderBy('createdAt');
  const [querySnapshot] = useCollection(query);

  //TODO add abilitiy to delete posts
  const posts = querySnapshot?.docs.map((doc) => doc.data());
  console.log(posts);

  return (
    <section className="section-default section-default-padding">
      {posts &&
        posts.map((post) => (
          <FeedbackItem key={uuid()} post={post} key={post.slug} admin={true} />
        ))}
    </section>
  );
}

function CreateNewPost() {
  const router = useRouter();
  const { user, username } = useContext(UserContext);
  const [title, setTitle] = useState('');

  // Ensure slug is URL safe
  const slug = encodeURI(kebabCase(title));

  // Validate length
  const isValid = title.length > 3 && title.length < 100;

  // Create a new post in firestore
  const createPost = async (e) => {
    e.preventDefault();
    const uid = auth.currentUser.uid;
    const ref = firestore
      .collection('users')
      .doc(uid)
      .collection('posts')
      .doc(slug);

    // Tip: give all fields a default value here
    const data = {
      title,
      slug,
      uid,
      username,
      photoURL: user.photoURL,
      published: false,
      content: '# hello world!',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      heartCount: 0
    };

    await ref.set(data);

    toast.success('Post created!');

    // Imperative navigation after doc is set
    router.push(`/admin/${slug}`);
  };

  return (
    <form onSubmit={createPost}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="My Awesome Article!"
      />
      <p>
        <strong>Slug:</strong> {slug}
      </p>
      <button type="submit" disabled={!isValid} className="btn-green">
        Create New Post
      </button>
    </form>
  );
}
