import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
// Icons
import { ReactComponent as CloseIcon } from "./icons/error-icon.svg";

function PopUpModal({ palette = "primary", countdown = 0, close, children }) {
  // refs
  const modalRef = useRef();

  const closeModal = () => {
    modalRef.current.style.display = "none";
  };

  // close modal after countdown time is over
  useEffect(() => {
    if (countdown > 0) setTimeout(closeModal, 1000 * countdown);
  }, [countdown]);

  // close modal if close is true
  useEffect(() => {
    if (close) closeModal();
  }, [close]);

  return (
    <div
      ref={modalRef}
      className={`relative bg-gray-100 text-gray-800 px-2 py-4 min-w-[20rem] min-h-[4rem] rounded ${palette}`}
    >
      <button
        onClick={closeModal}
        className="w-6 block absolute top-1 right-1 rounded bg-bg text-text p-1"
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
  close: PropTypes.bool,
};

export default PopUpModal;
