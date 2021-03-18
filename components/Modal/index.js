import { FaTimes } from 'react-icons/fa';

export default function Modal({
  hidden,
  title,
  children,
  button1,
  button2,
  handleClose
}) {
  return (
    <>
      <div
        className={`${
          hidden ? 'hidden' : 'flex'
        } justify-center pointer-events-none items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50`}
      >
        <div className="relative w-auto m-6 max-w-xl pointer-events-auto">
          <div className="border-4 rounded-lg shadow-lg relative flex flex-col w-full bg-white dark:bg-gray-900 dark:border-gray-700 text-black dark:text-white transition-darkmode">
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
              <h3 className="text-3xl font-semibold">{title}</h3>
              <button
                aria-label="Close sidebar"
                onClick={handleClose}
                className="p-3 absolute top-4 right-4 link-standard button-on-bg"
              >
                <FaTimes className="h-6 w-6" />
              </button>
            </div>
            <div className="relative p-6 flex-auto">{children}</div>
            <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
              {button1 && (
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm mr-1 mb-1 link link-light-bg dark:link-dark-bg-no-text"
                  onClick={handleClose}
                >
                  {button1}
                </button>
              )}
              {button2 && (
                <button
                  className="bg-green-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg mr-1 mb-1"
                  onClick={handleClose}
                >
                  {button2}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
