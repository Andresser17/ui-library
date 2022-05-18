import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import "./Checkbox.module.css"

function Checkbox({ value, palette, disabled, error, indeterminate }) {
  const styles = "m-0 bg-white text-inherit grid place-content-center w-6 h-6 border-2 -translate-y-[0.075em] rounded-sm border-black appearance-none checked:scale-1"
  const before = "before:w-2 before:h-2 before:scale-0 before:ease-in-out before:transition-transform before:shadow-inner before:shadow-red-600";
  const checkbox = useRef();

  // toggle indeterminate property
  useEffect(() => {
    checkbox.current.indeterminate = indeterminate
  }, [indeterminate]);

  return (
    <div className="flex justify-center items-center">
      <input ref={checkbox} className="bg-red-600 w-5 h-5 text-text before:bg-gray-100 success" value={value} type="checkbox" disabled={disabled} />
      <label className="ml-2">Hello</label>
    </div>
  );
}
Checkbox.propTypes = {
  value: PropTypes.string,
  palette: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.bool,
  indeterminate: PropTypes.bool,
};

export default Checkbox;
