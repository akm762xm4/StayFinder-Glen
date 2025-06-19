import { X } from "lucide-react";
import { useEffect, useState } from "react";
import * as ReactDOM from "react-dom";

interface AddModalProps {
  title: string;
  isOpen?: boolean;
  setIsOpen: (value: boolean) => void;
  child: React.ReactNode;
  data?: any;
}

export const Modal: React.FC<AddModalProps> = ({ title, setIsOpen, child }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    setShow(true); // trigger entrance animation
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  const closeModal = () => {
    // trigger exit animation first
    setShow(false);
    setTimeout(() => setIsOpen(false), 150); // delay unmount for animation
  };

  return ReactDOM.createPortal(
    <>
      {/* Backdrop */}
      <div
        onClick={closeModal}
        className={`fixed top-0 right-0 left-0 bottom-0 bg-black/85 z-40 transition-all duration-150 ${
          show ? "backdrop-blur" : ""
        }`}
      ></div>

      {/* Modal Box */}
      <div
        className={`fixed z-50 flex flex-col justify-center min-w-[18rem] md:min-w-[30rem] max-w-[20rem] md:max-w-[30rem] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-primary p-6 rounded-xl gap-2 shadow-2xl shadow-accent/60
        transition-all duration-150 ease-out 
        ${show ? "scale-100 opacity-100" : "scale-0 opacity-0"}
        `}
      >
        {/* Close Button */}
        <button
          title="Close"
          className="absolute right-2.5 top-2.5 p-2 text-[1rem] border-none rounded-lg cursor-pointer"
          onClick={closeModal}
        >
          <X />
        </button>

        {/* Modal Title */}
        <div className="md:text-3xl text-2xl font-semibold">{title}</div>

        {/* Modal Content */}
        {child}
      </div>
    </>,
    document.querySelector(".portalModalDiv") as HTMLDivElement
  );
};
