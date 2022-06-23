import LinkCard from '../Cards/LinkCard';
import { GiArcheryTarget } from 'react-icons/gi';
import { AiOutlineTeam } from 'react-icons/ai';
import { BiCommentCheck } from 'react-icons/bi';
import { BsCalendar } from 'react-icons/bs';
import TextArea from './TextArea';
import { useContext } from 'react';
import { LandingConext } from '@/lib/context';
import Link from 'next/link';

const Overview = () => {
  const { overview_i18n } = useContext(LandingConext);
  const {
    card1Title_i18n,
    card1Content_i18n,
    card2Title_i18n,
    card2Content_i18n,
    card3Title_i18n,
    card3Content_i18n,
    card4Title_i18n,
    card4Content_i18n,
    learnMore_i18n,
    sideTextTitle_i18n,
    sideTextP1_i18n,
    sideTextP2_i18n,
    sideTextP3_i18n,
    sideTextLink_i18n,
    otherLinks_i18n,
    updates_i18n,
    license_i18n,
    languages_i18n,
    accessibility_i18n,
    contactUs_i18n,
    privacyPolicy_i18n,
    termsOfService_i18n,
    credits_i18n
  } = overview_i18n;
  return (
    <section className="pb-20 px-8 bg-white dark:bg-gray-900 dark:text-white relative transition-darkmode clip-triangle-top">
      <div className="max-w-screen-lg xl:max-w-screen-xl grid md:grid-cols-2 lg:grid-cols-10 gap-x-8 mx-auto">
        <div className="flex flex-col col-span-1 lg:col-span-3">
          <LinkCard
            title={card1Title_i18n}
            learnMore={learnMore_i18n}
            className="card-black dark:card-gray"
            btnClass="btn-yellow-inverted dark:btn-black-inverted"
            link="/aims"
            icon={<GiArcheryTarget className="h-full w-full" />}
          >
            {card1Content_i18n}
          </LinkCard>
          <LinkCard
            title={card2Title_i18n}
            learnMore={learnMore_i18n}
            className="card-yellow"
            btnClass="btn-black-inverted focus:ring-4 focus:ring-black ring-offset-2"
            link="/team"
            icon={<AiOutlineTeam className="h-full w-full" />}
          >
            {card2Content_i18n}
          </LinkCard>
        </div>
        <div className="flex flex-col col-span-1 lg:col-span-3 md:mt-16">
          <LinkCard
            title={card3Title_i18n}
            learnMore={learnMore_i18n}
            className="card-black dark:card-gray md:card-yellow md:dark:card-yellow"
            btnClass="btn-yellow-inverted focus:ring-4 md:ring-black ring-offset-2 dark:btn-black-inverted md:btn-black-inverted md:dark:btn-black-inverted"
            link="/release"
            icon={<BsCalendar className="h-full w-full" />}
          >
            {card3Content_i18n}
          </LinkCard>
          <LinkCard
            title={card4Title_i18n}
            learnMore={learnMore_i18n}
            className="card-yellow dark:card-yellow md:card-black md:dark:card-gray"
            btnClass="btn-black-inverted focus:ring-4 focus:ring-black md:ring-yellow-400 ring-offset-2 dark:btn-black-inverted md:btn-yellow-inverted md:btn-yellow-inverted"
            link="/feedback"
            icon={<BiCommentCheck className="h-full w-full" />}
          >
            {card4Content_i18n}
          </LinkCard>
        </div>
        <div className="flex flex-col col-span-1 md:col-span-2 lg:col-span-4 m-auto lg:ml-16 xl:ml-24 max-w-prose">
          <TextArea title={sideTextTitle_i18n} linkText={sideTextLink_i18n}>
            <p>{sideTextP1_i18n}</p>
            <p>{sideTextP2_i18n}</p>
            <p>{sideTextP3_i18n}</p>
          </TextArea>
        </div>
      </div>
      <hr />
      <nav
        aria-label="other links"
        className="max-w-screen-lg xl:max-w-screen-xl grid md:grid-cols-2 lg:grid-cols-4 gap-8 mx-auto pb-12 text-center"
      >
        <h3 className="text-3xl my-4 font-semibold leading-normal col-span-full">
          {otherLinks_i18n}
        </h3>
        <Link href="/updates">
          <a className="animation-btn animation-to-yellow">{updates_i18n}</a>
        </Link>
        <Link href="/license">
          <a className="animation-btn animation-to-black">{license_i18n}</a>
        </Link>
        <Link href="/languages">
          <a className="animation-btn animation-to-yellow md:animation-to-black lg:animation-to-yellow">
            {languages_i18n}
          </a>
        </Link>
        <Link href="/accessibility">
          <a className="animation-btn animation-to-black md:animation-to-yellow lg:animation-to-black">
            {accessibility_i18n}
          </a>
        </Link>
        <Link href="/contact-us">
          <a className="animation-btn animation-to-yellow lg:animation-to-black">
            {contactUs_i18n}
          </a>
        </Link>
        <Link href="/privacy-policy">
          <a className="animation-btn animation-to-black lg:animation-to-yellow">
            {privacyPolicy_i18n}
          </a>
        </Link>
        <Link href="/terms">
          <a className="animation-btn animation-to-yellow md:animation-to-black">
            {termsOfService_i18n}
          </a>
        </Link>
        <Link href="/credits">
          <a className="animation-btn animation-to-black md:animation-to-yellow">
            {credits_i18n}
          </a>
        </Link>
      </nav>
    </section>
  );
};
export default Overview;
