import PropTypes from "prop-types";
import { ReactComponent as LoadingIcon } from "./icons/loading-icon.svg";
import { ReactComponent as PlusIcon } from "./icons/plus-icon.svg";

function Button({
  text = "Enter",
  palette = "primary",
  icon,
  rounded,
  border,
  loading,
  disabled,
}) {
  const styles = `bg-bg text-text border-border hover:bg-hover active:bg-active focus:bg-focus focus:border-focus-border disabled:bg-disabled disabled:border-disabled-border disabled:text-disabled-text`;

  const loadingIcon = (
    <span className="mr-1 block w-5">
      <LoadingIcon />
    </span>
  );
  const customIcon = (
    <span className="mr-1 block w-5">
      <PlusIcon />
    </span>
  );

  // const palettes = {
  //   primary: "primary",
  //   "primary-white": "primary-white",
  //   "primary-dark": "primary-dark",
  //   secondary: "secondary",
  //   success: "success",
  //   danger: "danger",
  //   warning: "warning",
  //   info: "info",
  //   light: "light",
  //   dark: "dark",
  // };

  return (
    <button
      className={`px-4 py-2 flex items-center focus:border-[0.125rem] rounded-sm ${
        rounded && "rounded-full"
      } ${border && "border-2"} ${styles} ${
        palette.length > 0 ? palette : "primary"
      }`}
      disabled={disabled}
    >
      {loading ? loadingIcon : icon && customIcon}
      {text}
    </button>
  );
}
Button.propTypes = {
  text: PropTypes.string,
  palette: PropTypes.string,
  icon: PropTypes.bool,
  rounded: PropTypes.bool,
  border: PropTypes.bool,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Button;
