import { X } from "lucide-react";
import { useRef } from "react";
import useClickOutside from "../../hooks/useClickOutside";
import Instructions from "../../pages/Instructions";

const Modal = ({ onClose }) => {
  const modalRef = useRef();

  useClickOutside(modalRef, () => {
    onClose();
  });

  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-50 z-50 flex items-start justify-center pt-32">
      <div
        ref={modalRef}
        className="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl  relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => {
            onClose();
          }}
          className="absolute top-4 right-4 text-gray-500 hover:text-black transition-colors"
        >
          <X size={24} className="cursor-pointer" />
        </button>
        <Instructions />
      </div>
    </div>
  );
};

export default Modal;
