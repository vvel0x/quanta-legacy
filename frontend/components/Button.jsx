const Button = ({ handleClick, children }) => {
  return (
    <button
      onClick={() => handleClick()}
      className="px-3 py-2 bg-white border border-gray-300 hover:border-pink-300 hover:text-pink-600 text-sm font-semibold rounded-sm transition ease-in-out duration-100"
    >
      {children}
    </button>
  );
};

export default Button;
