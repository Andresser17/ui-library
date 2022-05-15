import PropTypes from "prop-types";
import { ReactComponent as LoadingIcon } from "./icons/loading-icon.svg";
import { ReactComponent as PlusIcon } from "./icons/plus-icon.svg";

function IconCircle({ children, disabled, styles, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-10 h-10 flex justify-center items-center rounded-[50%] ${styles}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

function Icon({ children, rounded, disabled, styles, onClick }) {
  const optRounded = rounded ? "rounded-lg" : "rounded-sm";
  return (
    <button
      onClick={onClick}
      className={`px-2 h-9 flex items-center ${optRounded} ${styles}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

function LabelIcon({ children, rounded, disabled, styles, onClick }) {
  const optRounded = rounded ? "rounded-lg" : "rounded-sm";
  return (
    <button
      onClick={onClick}
      className={`flex items-center ${optRounded} ${styles}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

function Label({ rounded, disabled, styles, children, onClick }) {
  const optRounded = rounded ? "rounded-lg" : "rounded-sm";
  return (
    <button
      onClick={onClick}
      className={`flex items-center ${optRounded} ${styles}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

function Button({
  text,
  palette,
  loading,
  border,
  icon,
  children,
  ...restProps
}) {
  // If palette is not provided, is equal primary
  const optPalette = palette ? palette : "primary";
  // If icon is true and text is empty
  const optPadding = !text && icon ? "" : "px-4 py-2";
  // If border is active
  const optBorder = border && "border-2";
  const styles = `bg-bg ${optPalette} text-text ${optBorder} focus:border-[0.125rem] ${optPadding} border-border hover:bg-hover active:bg-active focus:bg-focus focus:border-focus-border disabled:bg-bg disabled:opacity-[var(--disabled-opacity)]`;

  // Default icons
  const loadingIcon = (
    <span className={`inline-block w-6 h-6`}>
      <LoadingIcon className="animate-spin" />
    </span>
  );
  // If user provide a new icon like children replace customIcon
  const customIcon = (
    <span className={`${text && "mr-2"} block w-6 h-6`}>
      {children ? children : <PlusIcon className="align-middle w-6 h-6" />}
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
  onClick: PropTypes.func,
  text: PropTypes.string,
  palette: PropTypes.string,
  icon: PropTypes.bool,
  rounded: PropTypes.bool,
  border: PropTypes.bool,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  children: PropTypes.element,
};

export default Button;
