import Link from 'next/link';
import uuid from 'react-uuid';

const LinkColumn = ({ column }) => {
  return (
    <div className="flex-auto">
      <span className="block uppercase text-gray-600 text-sm font-semibold mb-2">
        {column.title}
      </span>
      <ul>
        {Object.entries(column.links).map(([key, value]) => {
          return (
            <li
              key={uuid()}
              className="text-gray-700 hover:text-yellow-900 font-semibold block pb-2 text-sm"
            >
              <Link href={value}>{key}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LinkColumn;
