import Link from 'next/link';
import uuid from 'react-uuid';

const LinkColumn = ({ column }) => {
  return (
    <div className="flex-auto ">
      <span className="block text-lg md:text-base font-semibold mb-2">
        {column.title_i18n}
      </span>
      <ul>
        {column?.links_i18n?.map(({ link_i18n, text_i18n }) => {
          return (
            <li key={uuid()}>
              <Link href={link_i18n}>
                <a className="text-gray-700 dark:text-gray-200 font-semibold block p-1 mb-1 text-base md:text-sm link-standard transition-darkmode">
                  {text_i18n}
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default LinkColumn;
