import { useState } from "react";
import Button from "./Button";
import Modal from "./Modal";
import Router from "next/router";

export const SettingsButton = ({ prefix }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [domain, setDomain] = useState(prefix);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [errors, setErrors] = useState({});

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    const applySettings = await fetch("/api/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prefix: domain }),
    });

    if (!applySettings.ok) setErrors({ ...errors, submit: true });
    setIsSubmitting(false);
    setIsOpen(false);
    Router.reload();
  };

  const style =
    "w-full leading-tight focus:outline-none focus:shadow-outline border border-blue-200 rounded-md whitespace-nowrap text-gray-700 py-2 px-3 text-sm";

  return (
    <>
      <Button handleClick={handleToggle}>Settings</Button>
      <Modal show={isOpen} toggle={handleToggle} title="Settings">
        <div className="flex flex-col w-64">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="prefix"
            >
              Domain Prefix
            </label>
            <input
              name="prefix"
              className={style}
              onChange={(e) => setDomain(e.target.value)}
              type="text"
              value={domain}
              placeholder="vvel0x.net"
            />
            {errors?.submit && (
              <p className="text-red-600 text-xs">
                Error setting domain prefix!
              </p>
            )}
          </div>
          <div className="ml-auto flex gap-x-2">
            <button
              disabled={isSubmitting}
              onClick={handleSubmit}
              className={`px-3 py-2 bg-white border border-gray-300 hover:border-pink-300 hover:text-pink-600 text-sm font-semibold rounded-sm transition ease-in-out duration-100`}
            >
              {isSubmitting ? "Saving" : "Save"}
            </button>
            <Button handleClick={() => setIsOpen(false)}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
