import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
// Icons
import { ReactComponent as CloseIcon } from "./icons/error-icon.svg";

function PopUpModal({ palette, countdown = 0, children }) {
  // If palette is not provided, is equal primary
  const optPalette = palette ? palette : "primary-white";
  // refs
  const modalRef = useRef();

  const closeModal = () => {
    modalRef.current.style.display = "none";
  };

  // close modal after countdown time is over
  useEffect(() => {
    if (countdown > 0) setTimeout(closeModal, 1000 * countdown);
  }, [countdown]);

  return (
    <div
      ref={modalRef}
      className={`relative bg-bg text-text px-2 py-4 min-w-[20rem] min-h-[4rem] rounded ${optPalette}`}
    >
      <button
        onClick={closeModal}
        className="w-6 block absolute top-1 right-1 rounded bg-text text-gray-100 p-1"
      >
        <CloseIcon className="w-full" />
      </button>
      {/* children */}
      {children}
    </div>
  );
}
PopUpModal.propTypes = {
  palette: PropTypes.string,
  countdown: PropTypes.number,
};

export default PopUpModal;
