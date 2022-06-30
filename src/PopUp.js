import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
// Components
import PopUpModal from "./PopUpModal";
// Icons
// import { ReactComponent as DefaultIcon } from "./icons/division-icon.svg";

function PopUp({ palette, mode = "stop" }) {
  // If palette is not provided, is equal primary
  const optPalette = palette ? palette : "primary";

  return (
    <PopUpModal>
      <h2>hello world</h2>
    </PopUpModal>
  );
}
PopUp.propTypes = {
  palette: PropTypes.string,
  mode: PropTypes.string,
};

export default PopUp;
