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
  const styles =
    `bg-${palette}-bg text-${palette}-color hover:bg-${palette}-hover active:bg-${palette}-active focus:bg-${palette}-focus focus:border-${palette}-focusBorder disabled:bg-${palette}-disabled disabled:border-${palette}-disabledBorder disabled:text-${palette}-disabledColor`;

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

  return (
    <button
      className={`px-4 py-2 flex items-center focus:border-[0.125rem] rounded-sm ${
        rounded && "rounded-full"
      } ${border && "border-2"} bg-bg text-text border-2 border-border secondary`}
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
