import SimpleCard from '../Cards/SimpleCard';
import { GiArcheryTarget } from 'react-icons/gi';
import { AiOutlineTeam } from 'react-icons/ai';
import { BiCommentCheck } from 'react-icons/bi';
import { BsCalendar } from 'react-icons/bs';

const Overview = () => (
  <section className="py-24 px-8 bg-white">
    <div className="max-w-screen-lg xl:max-w-screen-xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-8 mx-auto">
      <div className="flex flex-col col-span-1 lg:col-span-3 gap-8">
        <SimpleCard
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
        </SimpleCard>
        <SimpleCard
          title="The team"
          bgColor="bg-yellow-400"
          btnClass="btn btn-black-inverted"
          link="/"
          icon={<AiOutlineTeam className="h-full w-full" />}
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt
          incidunt placeat recusandae maxime dolorum repellendus sed minus
          praesentium fugiat officia.
        </SimpleCard>
      </div>
      <div className="flex flex-col col-span-1 lg:col-span-3 md:mt-16 gap-8">
        <SimpleCard
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
        </SimpleCard>
        <SimpleCard
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
        </SimpleCard>
      </div>
      <div className="flex flex-col col-span-1 lg:col-span-4 md:mt-32"></div>
    </div>
  </section>
);
export default Overview;
