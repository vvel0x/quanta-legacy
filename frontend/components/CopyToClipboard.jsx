import { useState } from "react";

const CopyToClipboard = ({ data }) => {
  const [isCopied, setisCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard
      .writeText(data)
      .then(() => {
        setisCopied(true);
        setTimeout(() => {
          setisCopied(false);
        }, 3000);
      })
      .catch("Unable to copy to clipboard!");
  };

  return (
    <button
      title="Copy to Clipboard"
      onClick={handleCopy}
      className={`p-2 ${
        isCopied
          ? "text-pink-500 hover:text-pink-800"
          : "text-gray-500 hover:text-gray-800"
      }  hover:bg-gray-100 rounded-md`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
        />
      </svg>
    </button>
  );
};

export default CopyToClipboard;
