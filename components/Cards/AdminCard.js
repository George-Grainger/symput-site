import { AdminContext, ErrorsContext } from '@/lib/context';
import { useState, useContext } from 'react';
import AccountSettings from '../AdminArea/AccountSettings';
import AdminFeedbackList from '../AdminArea/AdminFeedbackList';
import CreateNewFeedback from '../AdminArea/CreateNewFeedback';

const AdminCard = ({ errorsData }) => {
  const { title_i18n, subtitle_i18n, posts_i18n, account_i18n } = useContext(
    AdminContext
  );
  const [openTab, setOpenTab] = useState(0);

  return (
    <section className="section-default section-default-padding ">
      <h1 className="prose dark:prose-dark text-5xl font-semibold text-center mb-12">
        {title_i18n}
      </h1>
      <div className="min-w-fs-card p-4 sm:p-8 bg-white dark:bg-gray-900 flex flex-col items-center rounded-lg relative transition-darkmode">
        <h2 className="prose text-3xl dark:prose-dark mb-8 text-center font-semibold">
          {subtitle_i18n}
        </h2>
        <div className="flex w-full md:w-1/2 mb-8">
          <button
            className={
              'btn mr-8 flex-auto ' +
              (openTab === 0
                ? 'btn-black dark:btn-yellow'
                : ' btn-black-inverted dark:btn-yellow-inverted')
            }
            onClick={() => setOpenTab(0)}
          >
            {posts_i18n}
          </button>
          <button
            className={
              'btn flex-auto ' +
              (openTab === 1
                ? 'btn-black dark:btn-yellow'
                : ' btn-black-inverted dark:btn-yellow-inverted')
            }
            onClick={() => setOpenTab(1)}
          >
            {account_i18n}
          </button>
        </div>
        <ErrorsContext.Provider value={errorsData}>
          <div
            className={
              openTab === 0 ? 'flex flex-col items-center w-full' : 'hidden'
            }
          >
            <AdminFeedbackList />

            <CreateNewFeedback />
          </div>
          <div className={openTab === 1 ? 'block w-full' : 'hidden'}>
            <AccountSettings />
          </div>
        </ErrorsContext.Provider>
      </div>
    </section>
  );
};

export default AdminCard;
