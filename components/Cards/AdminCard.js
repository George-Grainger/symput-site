import { useState } from 'react';
import AdminFeedbackList from '../AdminArea/AdminFeedbackList';
import CreateNewFeedback from '../AdminArea/CreateNewFeedback';

const AdminCard = () => {
  const [openTab, setOpenTab] = useState(0);

  return (
    <section className="section-default section-default-padding ">
      <h1 className="prose dark:prose-dark text-5xl font-semibold text-center mb-12">
        Admin
      </h1>
      <div className="min-w-fs-card p-4 sm:p-8 bg-white dark:bg-gray-900 flex flex-col items-center rounded-lg relative transition-darkmode">
        <h2 className="prose text-3xl dark:prose-dark mb-8 font-semibold">
          Create posts or manage your account below.
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
            Posts
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
            Account
          </button>
        </div>
        <div className={openTab === 0 ? 'block' : 'hidden'}>
          <AdminFeedbackList />
          <CreateNewFeedback />
        </div>
      </div>
    </section>
  );
};

export default AdminCard;
