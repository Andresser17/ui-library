import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import checkStyle from "./Checkbox.module.css";

function Checkbox({
  onClick,
  value,
  label,
  palette,
  disabled,
  error,
  indeterminate,
}) {
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
  const checkboxRef = useRef();
  const labelRef = useRef();

  // Toggle indeterminate property
  useEffect(() => {
    checkboxRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  // Assign id from label prop
  useEffect(() => {
    const newId = label.replaceAll(" ", "-");
    labelRef.current.htmlFor = newId;
    checkboxRef.current.id = newId;
  }, [label]);

  return (
    <div
      id={`cont-${label}`}
      className={`flex justify-center items-center ${optPalette}`}
    >
      <input
        id={label}
        onClick={onClick}
        ref={checkboxRef}
        className={`${styles} ${before} ${
          error ? inputError : `${unselected} ${inputIndeter} ${selected}`
        }`}
        value={value}
        type="checkbox"
        disabled={disabled}
      />
      <label
        ref={labelRef}
        className={`ml-2 ${
          disabled ? "opacity-[var(--disabled-opacity)]" : ""
        } ${error ? labelError : "text-text"}`}
      >
        {label}
      </label>
    </div>
  );
}
Checkbox.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string,
  label: PropTypes.string,
  palette: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  indeterminate: PropTypes.bool,
};

export default Checkbox;
