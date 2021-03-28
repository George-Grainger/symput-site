import LinkCard from '../Cards/LinkCard';
import { GiArcheryTarget } from 'react-icons/gi';
import { AiOutlineTeam } from 'react-icons/ai';
import { BiCommentCheck } from 'react-icons/bi';
import { BsCalendar } from 'react-icons/bs';
import TextArea from './TextArea';
import Triangle from '../Triangle';
import { useContext } from 'react';
import { LandingConext } from '@/lib/context';

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
    sideTextLink_i18n
  } = overview_i18n;
  return (
    <section className="py-24 px-8 bg-white dark:bg-gray-900 dark:text-white relative transition-darkmode">
      <Triangle color="text-white dark:text-gray-900" />
      <div className="max-w-screen-lg xl:max-w-screen-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-x-8 mx-auto">
        <div className="flex flex-col col-span-1 lg:col-span-3">
          <LinkCard
            title={card1Title_i18n}
            learnMore={learnMore_i18n}
            className="card-black dark:card-gray"
            link="/aims"
            icon={<GiArcheryTarget className="h-full w-full" />}
          >
            {card1Content_i18n}
          </LinkCard>
          <LinkCard
            title={card2Title_i18n}
            learnMore={learnMore_i18n}
            className="card-yellow"
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
            link="/release"
            icon={<BsCalendar className="h-full w-full" />}
          >
            {card3Content_i18n}
          </LinkCard>
          <LinkCard
            title={card4Title_i18n}
            learnMore={learnMore_i18n}
            className="card-yellow dark:card-yellow md:card-black md:dark:card-gray"
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
    </section>
  );
};
export default Overview;
