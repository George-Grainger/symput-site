import { FaHeart } from 'react-icons/fa';

const FeedbackPlaceholder = () => {
  return (
    <div className="flex flex-wrap bg-white dark:bg-gray-900 w-full max-w-3xl px-5 py-4 transition-darkmode mb-6">
      <div className="rounded-full animate-pulse h-14 w-14 overflow-hidden relative bg-gray-300 dark:bg-gray-700 transition-darkmode"></div>
      <div className=" ml-4">
        <div className="animate-pulse h-6 w-32 overflow-hidden relative bg-gray-300 dark:bg-gray-700 transition-darkmode"></div>
        <div className="animate-pulse h-6 w-32 overflow-hidden relative bg-gray-300 dark:bg-gray-700 transition-darkmode mt-2"></div>
      </div>
      <div className="animate-pulse h-8 w-8 overflow-hidden relative bg-gray-300 dark:bg-gray-700 transition-darkmode ml-auto"></div>
      <div className="animate-pulse h-5 overflow-hidden relative bg-gray-300 dark:bg-gray-700 transition-darkmode w-full mt-5"></div>
      <div className="animate-pulse h-5 overflow-hidden relative bg-gray-300 dark:bg-gray-700 transition-darkmode w-full mt-3"></div>
      <div className="animate-pulse h-5 overflow-hidden relative bg-gray-300 dark:bg-gray-700 transition-darkmode w-full mt-3"></div>
      <div className="animate-pulse h-5 overflow-hidden relative bg-gray-300 dark:bg-gray-700 transition-darkmode w-full mt-3"></div>
      <div className="animate-pulse h-5 overflow-hidden relative bg-gray-300 dark:bg-gray-700 transition-darkmode w-1/3 mt-3"></div>
      <div className="w-2/3"></div>
      <FaHeart className="animate-pulse h-4 w-4 overflow-hidden relative text-gray-300 dark:text-gray-700 transition-darkmode mt-5 inline" />
      <div className="animate-pulse h-4 w-5 overflow-hidden relative bg-gray-300 dark:bg-gray-700 transition-darkmode mt-5 ml-2"></div>
      <div className="animate-pulse h-5 w-32 overflow-hidden relative bg-gray-300 dark:bg-gray-700 transition-darkmode mt-5 ml-auto"></div>
    </div>
  );
};

export default FeedbackPlaceholder;
