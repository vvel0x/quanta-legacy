import { Dialog, Transition } from "@headlessui/react";
import { QRCodeCanvas } from "qrcode.react";
import { Fragment } from "react";

const Modal = ({ show, toggle, title, children }) => {
  const args = {
    enter: "ease-out duration-300",
    enterFrom: "opacity-0",
    enterTo: "opacity-100",
    leave: "ease-in duration-200",
    leaveFrom: "opacity-100",
    leaveTo: "opacity-0",
  };
  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto "
        onClose={() => toggle()}
      >
        <Transition.Child {...args}>
          {/* The backdrop, rendered as a fixed sibling to the panel container */}
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        </Transition.Child>
        <Transition.Child {...args}>
          {/* Full-screen container to center the panel */}
          <div className="fixed inset-0 flex items-center justify-center p-4">
            {/* The actual dialog panel  */}
            <Dialog.Panel className="mx-auto max-w-sm rounded bg-white px-6 py-4 flex flex-col gap-y-3">
              <Dialog.Title>
                <span className="text-xl font-semibold">{title}</span>
              </Dialog.Title>
              <div className="w-full">{children}</div>
            </Dialog.Panel>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default Modal;
