import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
// Icons
import { ReactComponent as CloseIcon } from "./icons/error-icon.svg";

function PopUpModal({ palette, mode = "stop", children }) {
  // If palette is not provided, is equal primary
  const optPalette = palette ? palette : "primary-white";

  const closeModal = () => {};

  return (
    <div
      className={`relative bg-bg text-text min-w-[20rem] min-h-[4rem] rounded ${optPalette}`}
    >
      <button onClick={closeModal} className="w-6 block absolute top-1 right-1 rounded bg-text text-gray-100">
        <CloseIcon className="w-full" />
      </button>
    </div>
  );
}
PopUpModal.propTypes = {
  palette: PropTypes.string,
  mode: PropTypes.string,
};

export default PopUpModal;
