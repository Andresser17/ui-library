import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import checkStyle from "./Checkbox.module.css";

function Checkbox({ onClick, value, palette, disabled, error, indeterminate }) {
  // If palette is not provided, is equal primary
  const optPalette = palette ? palette : "primary";
  const styles = `${checkStyle.Checkbox} shadow-md rounded-sm w-5 h-5 disabled:opacity-[var(--disabled-opacity)]`;
  // Unselected State
  const unselected =
    "bg-gray-100 hover:bg-gray-200 active:bg-gray-300 focus:bg-gray-100 focus:border focus:border-gray-400";
  // Selected State
  const selected =
    "checked:bg-bg checked:hover:bg-hover checked:active:bg-active checked:focus:bg-focus checked:focus:border-focus-border";
  // Indeterminate State
  const inputIndeter =
    "indeterminate:bg-bg indeterminate:hover:bg-hover indeterminate:active:bg-active indeterminate:focus:bg-focus indeterminate:focus:border-focus-border";
  // Error state
  const inputError = "bg-red-300";
  const labelError = "text-red-300";
  // Checkmark icon
  const before = "before:bg-text";
  const checkbox = useRef();

  // Toggle indeterminate property
  useEffect(() => {
    checkbox.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <div className={`flex justify-center items-center ${optPalette}`}>
      <input
        onClick={onClick}
        ref={checkbox}
        className={`${styles} ${before} ${
          error ? inputError : `${unselected} ${inputIndeter} ${selected}`
        }`}
        value={value}
        type="checkbox"
        disabled={disabled}
      />
      <label
        className={`ml-2 text-text ${
          disabled ? "opacity-[var(--disabled-opacity)]" : ""
        } ${error ? labelError : ""}`}
      >
        Hello
      </label>
    </div>
  );
}
Checkbox.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string,
  palette: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  indeterminate: PropTypes.bool,
};

export default Checkbox;
