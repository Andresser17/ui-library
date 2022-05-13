import PropTypes from "prop-types";
import { ReactComponent as LoadingIcon } from "./icons/loading-icon.svg";
import { ReactComponent as PlusIcon } from "./icons/plus-icon.svg";

function IconCircle({ children, palette, disabled, styles }) {
  return (
    <button
      className={`w-10 h-10 rounded-[50%] ${styles} ${
        palette ? palette : "primary"
      }`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

function Icon({ children, palette, rounded, disabled, styles }) {
  return (
    <button
      className={`px-4 py-2 flex items-center focus:border-[0.125rem] ${
        rounded ? "rounded-lg" : "rounded-sm"
      } ${styles} ${palette ? palette : "primary"}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

function LabelIcon({ children, palette, rounded, disabled, styles }) {
  return (
    <button
      className={`px-4 py-2 flex items-center focus:border-[0.125rem] ${
        rounded ? "rounded-lg" : "rounded-sm"
      } ${styles} ${palette ? palette : "primary"}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

function Label({ palette, rounded, disabled, styles, children }) {
  return (
    <button
      className={`px-4 py-2 focus:border-[0.125rem] ${
        rounded ? "rounded-lg" : "rounded-sm"
      } ${styles} ${palette ? palette : "primary"}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

function Button({ text = "Enter", loading, border, icon, ...restProps }) {
  const styles = `bg-bg text-text ${
    border && "border-2"
  } focus:border-[0.125rem] px-4 py-2 flex items-center border-border hover:bg-hover active:bg-active focus:bg-focus focus:border-focus-border disabled:bg-bg disabled:opacity-[var(--disabled-opacity)]`;

  const loadingIcon = (
    <span className={`inline-block w-5`}>
      <LoadingIcon />
    </span>
  );
  const customIcon = (
    <span className={`${text && "mr-2"} inline-block w-5`}>
      <PlusIcon />
    </span>
  );

  // Icon Inside Perfect circle
  if (icon && restProps.rounded && !text)
    return (
      <IconCircle styles={styles} {...restProps}>
        {loading ? loadingIcon : customIcon}
      </IconCircle>
    );

  // Square Icon without text
  if (icon && !text)
    return (
      <Icon styles={styles} {...restProps}>
        {loading ? loadingIcon : customIcon}
      </Icon>
    );

  // Label with Icon
  if (icon && text)
    return (
      <LabelIcon styles={styles} {...restProps}>
        {loading ? (
          loadingIcon
        ) : (
          <>
            {customIcon}
            {text}
          </>
        )}
      </LabelIcon>
    );

  return (
    <Label styles={styles} {...restProps}>
      {loading ? loadingIcon : text}
    </Label>
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
