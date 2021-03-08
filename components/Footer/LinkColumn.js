import Link from 'next/link';
import uuid from 'react-uuid';

const LinkColumn = ({ column }) => {
  return (
    <div className="flex-auto ">
      <span className="block text-lg md:text-base font-semibold mb-2">
        {column.title}
      </span>
      <ul>
        {column.links.map(({ link, text }) => {
          return (
            <li
              key={uuid()}
              className="text-gray-700 dark:text-gray-200 dark:hover:text-yellow-400 hover:text-yellow-900 font-semibold block pb-2 text-base md:text-sm  transition-darkmode"
            >
              <Link href={link}>{text}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LinkColumn;
