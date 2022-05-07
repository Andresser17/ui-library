import PropTypes from "prop-types";
import { ReactComponent as LoadingIcon } from "./icons/loading-icon.svg";
import { ReactComponent as PlusIcon } from "./icons/plus-icon.svg";

function Button({ text = "Enter", icon, rounded, border, loading, disabled }) {
  const primary =
    "bg-primary-bg text-primary-color hover:bg-primary-hover active:bg-primary-active focus:bg-primary-focus focus:border-primary-focusBorder disabled:bg-primary-disabled disabled:border-primary-disabledBorder disabled:text-primary-disabledColor";
  const secondary =
    "bg-secondary-bg text-secondary-color hover:bg-secondary-hover active:bg-secondary-active focus:bg-secondary-focus focus:border-secondary-focusBorder disabled:bg-secondary-disabled disabled:border-secondary-disabledBorder disabled:text-secondary-disabledColor";
  const tertiary =
    "bg-tertiary-bg text-tertiary-color hover:bg-tertiary-hover active:bg-tertiary-active focus:bg-tertiary-focus focus:border-tertiary-focusBorder disabled:bg-tertiary-disabled disabled:border-tertiary-disabledBorder disabled:text-tertiary-disabledColor";

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
      className={`px-4 py-2 flex items-centen focus:border-[0.125rem] rounded-sm ${
        rounded && "rounded-full"
      } ${primary} ${border && "border-2"}`}
      disabled={disabled}
    >
      {loading ? loadingIcon : icon && customIcon}
      {text}
    </button>
  );
}
Button.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.bool,
  rounded: PropTypes.bool,
  border: PropTypes.bool,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Button;