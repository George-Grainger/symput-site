import LinkCard from '../Cards/LinkCard';
import { GiArcheryTarget } from 'react-icons/gi';
import { AiOutlineTeam } from 'react-icons/ai';
import { BiCommentCheck } from 'react-icons/bi';
import { BsCalendar } from 'react-icons/bs';
import TextArea from './TextArea';
import Triangle from '../Triangle';

const Overview = () => (
  <section className="pt-24 pb-36 px-8 bg-white relative">
    <Triangle color="text-white" />
    <div className="max-w-screen-lg xl:max-w-screen-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-8 mx-auto">
      <div className="flex flex-col col-span-1 lg:col-span-3 gap-8">
        <LinkCard
          title="Aims"
          bgColor="bg-gray-800"
          btnClass="btn btn-yellow-inverted"
          link="/"
          lightText
          icon={<GiArcheryTarget className="h-full w-full" />}
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt
          incidunt placeat recusandae maxime dolorum repellendus sed minus
          praesentium fugiat officia.
        </LinkCard>
        <LinkCard
          title="The team"
          bgColor="bg-yellow-400"
          btnClass="btn btn-black-inverted"
          link="/"
          icon={<AiOutlineTeam className="h-full w-full" />}
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt
          incidunt placeat recusandae maxime dolorum repellendus sed minus
          praesentium fugiat officia.
        </LinkCard>
      </div>
      <div className="flex flex-col col-span-1 lg:col-span-3 md:mt-16 gap-8">
        <LinkCard
          title="Release Date"
          bgColor="bg-gray-800 md:bg-yellow-400"
          btnClass="btn btn-yellow-inverted md:btn-black-inverted"
          link="/"
          responsive
          icon={<BsCalendar className="h-full w-full" />}
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt
          incidunt placeat recusandae maxime dolorum repellendus sed minus
          praesentium fugiat officia.
        </LinkCard>
        <LinkCard
          title="Feedback"
          bgColor="bg-yellow-400 md:bg-gray-800"
          btnClass="btn btn-black-inverted md:btn-yellow-inverted"
          link="/"
          lightText
          responsive
          icon={<BiCommentCheck className="h-full w-full" />}
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt
          incidunt placeat recusandae maxime dolorum repellendus sed minus
          praesentium fugiat officia.
        </LinkCard>
      </div>
      <div className="flex flex-col col-span-1 md:col-span-2 lg:col-span-4 md:my-auto lg:ml-16 xl:ml-24">
        <TextArea title="Our Progress">
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum
            repellendus fugiat animi illum nam laudantium quibusdam tempore sunt
            porro incidunt!
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. At,
            deserunt! Nobis accusantium molestiae, recusandae perspiciatis
            aspernatur at id quos sequi?
          </p>
        </TextArea>
      </div>
    </div>
  </section>
);
export default Overview;
