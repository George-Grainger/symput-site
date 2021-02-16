const Icon = ({ icon, className = 'h-16 w-16', iconColor = 'text-black' }) => {
  return (
    <div
      className={`${iconColor} ${className} p-3 text-center inline-flex items-center justify-center shadow-lg rounded-full bg-white`}
    >
      {icon}
    </div>
  );
};

export default Icon;
