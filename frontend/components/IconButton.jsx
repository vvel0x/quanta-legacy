const IconButton = ({ title, handleClick, children }) => {
  return (
    <button
      title={title}
      className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100"
      onClick={() => handleClick()}
    >
      {children}
    </button>
  );
};

export default IconButton;
