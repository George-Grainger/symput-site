const Icon = ({
  icon,
  height = '16',
  width = '16',
  iconColor = 'text-black'
}) => {
  return (
    <div
      className={`${iconColor} h-${height} w-${width} p-3 text-center inline-flex items-center justify-center shadow-lg rounded-full bg-white`}
    >
      {icon}
    </div>
  );
};

export default Icon;
