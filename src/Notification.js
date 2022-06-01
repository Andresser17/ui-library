import { useEffect } from "react";
import PropTypes from "prop-types";
// Icons
import { ReactComponent as InfoIcon } from "./icons/info-icon.svg";
import { ReactComponent as ErrorIcon } from "./icons/error-icon.svg";
import { ReactComponent as SuccessIcon } from "./icons/success-icon.svg";

function Notification({
  palette,
  header,
  buttons,
  description,
  mode,
  onClose,
  onHelp,
}) {
  // If palette is not provided, is equal primary
  const optPalette = palette ? palette : "primary";
  const styles = `${optPalette} flex items-start flex-col relative bg-gray-100 p-4 w-72 rounded-sm shadow-md`;

  const deviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return "tablet";
    }

    if (
      /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
        ua
      )
    ) {
      return "mobile";
    }

    return "desktop";
  };

  useEffect(() => {
    setTimeout(onClose, 1000 * 5);
  }, [onClose]);

  return (
    <div className={styles}>
      {mode === "success" && (
        <SuccessIcon
          role="success-icon"
          className="w-8 w-8 top-[10%] right-[5%] absolute block text-bg success"
        />
      )}
      {mode === "error" && (
        <ErrorIcon
          role="error-icon"
          className="w-8 w-8 top-[10%] right-[5%] absolute block text-bg danger"
        />
      )}
      {mode === "info" && (
        <InfoIcon
          role="info-icon"
          className="w-8 w-8 top-[10%] right-[5%] absolute opacity-100 block text-bg"
        />
      )}
      {header?.length > 0 && <span className="font-bold">{header}</span>}
      {description?.length > 0 && (
        <p
          className={`${buttons ? "mb-4" : ""} ${
            header?.length > 0 ? "mt-2" : ""
          }`}
        >
          {description}
        </p>
      )}
      {buttons && deviceType() !== "mobile" && (
        <div
          className={`${mode === "success" ? "success" : ""} ${
            mode === "error" ? "danger" : ""
          }`}
        >
          <button
            onClick={onClose}
            className="rounded-sm px-4 py-2 text-bg border-2 border-bg hover:border-hover hover:text-hover active:border-active active:text-active focus:border-focus focus:text-focus"
          >
            Close
          </button>
          <button
            onClick={onHelp}
            className="ml-6 text-bg hover:border-hover hover:text-hover active:text-active focus:text-focus"
          >
            Help
          </button>
        </div>
      )}
    </div>
  );
}
Notification.propTypes = {
  palette: PropTypes.string,
  header: PropTypes.string,
  buttons: PropTypes.bool,
  description: PropTypes.string,
  mode: PropTypes.string,
  onClose: PropTypes.func,
  onHelp: PropTypes.func,
};

export default Notification;
