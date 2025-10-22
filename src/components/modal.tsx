import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children?: ReactNode;
  icon?: ReactNode;
  showCloseButton?: boolean;
  showOkButton?: boolean;
  okButtonText?: string;
  size?: "sm" | "md" | "lg" | "xl";
  exClassName?: string;
  exOverlayClassName?: string;
}

export default function Modal({
  isOpen,
  onClose,
  title = "Modal Example",
  children,
  showCloseButton = true,
  size = "md",
  exClassName = "",
  exOverlayClassName = "",
}: ModalProps) {
  // Handle body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Handle escape key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "sm:max-w-sm",
    md: "sm:max-w-md",
    lg: "sm:max-w-lg",
    xl: "sm:max-w-xl",
  };

  return createPortal(
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Background overlay */}
      <div
        className={`fixed inset-0 transition-opacity ${exOverlayClassName}`}
        aria-hidden="true"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      {/* Modal container */}
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* This element is to trick the browser into centering the modal contents */}
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        {/* Modal content */}
        <div
          className={`inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full ${sizeClasses[size]} ${exClassName}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative">
            {/* Close button */}
            {showCloseButton && (
              <button
                onClick={onClose}
                className="absolute right-0 top-0 mt-3 mr-3 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-8 h-8 text-gray-500"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            )}

            {/* Modal body */}
            <div className="p-5 text-center">
              {title && <div className="text-2xl mt-5">{title}</div>}
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}