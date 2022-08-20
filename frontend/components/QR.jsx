import Modal from "./Modal";
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

const QR = ({ data: url }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  return (
    <button
      className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-md"
      onClick={() => handleToggle()}
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
          d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
        />
      </svg>

      <Modal show={isOpen} toggle={handleToggle} title="QR Code">
        <div className="p-4 max-w-xs border border-slate-300 rounded flex flex-col gap-2">
          <QRCodeSVG value={url} size={156} />
          <span className="w-full text-center text-sm">{url}</span>
        </div>
      </Modal>
    </button>
  );
};

export default QR;
