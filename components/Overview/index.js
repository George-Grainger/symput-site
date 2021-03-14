import LinkCard from '../Cards/LinkCard';
import { GiArcheryTarget } from 'react-icons/gi';
import { AiOutlineTeam } from 'react-icons/ai';
import { BiCommentCheck } from 'react-icons/bi';
import { BsCalendar } from 'react-icons/bs';
import TextArea from './TextArea';
import Triangle from '../Triangle';

const Overview = ({
  card1Title,
  card1Content,
  card2Title,
  card2Content,
  card3Title,
  card3Content,
  card4Title,
  card4Content,
  learnMore,
  sideTextTitle,
  sideTextP1,
  sideTextP2,
  sideTextP3,
  sideTextLink
}) => (
  <section className="py-24 px-8 bg-white dark:bg-gray-900 dark:text-white relative transition-darkmode">
    <Triangle color="text-white dark:text-gray-900" />
    <div className="max-w-screen-lg xl:max-w-screen-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-x-8 mx-auto">
      <div className="flex flex-col col-span-1 lg:col-span-3">
        <LinkCard
          title={card1Title}
          learnMore={learnMore}
          className="card-black dark:card-gray"
          link="/"
          icon={<GiArcheryTarget className="h-full w-full" />}
        >
          {card1Content}
        </LinkCard>
        <LinkCard
          title={card2Title}
          learnMore={learnMore}
          className="card-yellow"
          link="/"
          icon={<AiOutlineTeam className="h-full w-full" />}
        >
          {card2Content}
        </LinkCard>
      </div>
      <div className="flex flex-col col-span-1 lg:col-span-3 md:mt-16">
        <LinkCard
          title={card3Title}
          learnMore={learnMore}
          className="card-black dark:card-gray md:card-yellow md:dark:card-yellow"
          link="/"
          icon={<BsCalendar className="h-full w-full" />}
        >
          {card3Content}
        </LinkCard>
        <LinkCard
          title={card4Title}
          learnMore={learnMore}
          className="card-yellow dark:card-yellow md:card-black md:dark:card-gray"
          link="/"
          icon={<BiCommentCheck className="h-full w-full" />}
        >
          {card4Content}
        </LinkCard>
      </div>
      <div className="flex flex-col col-span-1 md:col-span-2 lg:col-span-4 m-auto lg:ml-16 xl:ml-24 max-w-prose">
        <TextArea title={sideTextTitle} linkText={sideTextLink}>
          <p>{sideTextP1}</p>
          <p>{sideTextP2}</p>
          <p>{sideTextP3}</p>
        </TextArea>
      </div>
    </div>
  </section>
);
export default Overview;
