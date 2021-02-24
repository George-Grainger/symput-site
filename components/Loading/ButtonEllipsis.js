const ButtonEllipsis = ({ color = 'bg-gray-900' }) => {
  return (
    <div className="m-auto loader-dots block relative w-20 h-5 p-3">
      <div
        className={`${color} absolute top-0 mt-1 w-3 h-3 rounded-full`}
      ></div>
      <div
        className={`${color} absolute top-0 mt-1 w-3 h-3 rounded-full`}
      ></div>
      <div
        className={`${color} absolute top-0 mt-1 w-3 h-3 rounded-full`}
      ></div>
      <div
        className={`${color} absolute top-0 mt-1 w-3 h-3 rounded-full`}
      ></div>
    </div>
  );
};

export default ButtonEllipsis;
