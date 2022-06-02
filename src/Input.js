import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function Input({
  palette,
  getData,
  placeholder,
  disabled,
  readOnly,
  type = "text",
  description,
  defaultValue,
  required,
  id,
}) {
  const [data, setData] = useState("");
  const [status, setStatus] = useState({ code: 0, message: "" });
  // If palette is not provided, is equal primary
  const optPalette = palette ? palette : "primary";
  const notEmptyStyle = "text-[0.7rem] top-[0.125rem]";
  const styles = `${optPalette} ${
    status.code === 1
      ? "bg-green-200"
      : status.code === 2
      ? "bg-red-200"
      : "bg-gray-100"
  } py-4 px-4 w-full shadow-md rounded-sm hover:shadow-lg active:shadow-xl focus:outline-none disabled:opacity-90 disabled:shadow-md placeholder:text-black/0`;

  useEffect(() => {
    if (defaultValue && defaultValue.length > 0) {
      setData(defaultValue);
    }
  }, [defaultValue]);

  const handleChange = (e) => {
    const mergeStatus = (newStatus) =>
      setStatus((prev) => ({ ...prev, ...newStatus }));

    getData(e.target.value, mergeStatus);
    setData(e.target.value);
  };

  if (type !== "text" && type !== "password")
    throw new Error("type property only accept text and password");

  return (
    <label className="flex flex-col items-start relative text-sm" htmlFor={id}>
      <input
        value={data}
        onChange={handleChange}
        className={styles}
        {...{
          disabled,
          type,
          readOnly,
          required,
          placeholder,
          id,
        }}
      />
      {/* Description */}
      <span
        className={`text-gray-400 absolute ${
          data.length > 0 ? notEmptyStyle : "top-[0.9rem]"
        } pointer-events-none duration-500 left-4`}
      >
        {placeholder}
      </span>
      <span
        className={`${
          status.code === 1 && status.message.length > 0
            ? "text-bg success"
            : status.code === 2 && status.message.length > 0
            ? "text-bg danger"
            : "text-gray-400"
        } mt-1`}
      >
        {status.code > 0 && status.message.length > 0
          ? status.message
          : description}
      </span>
    </label>
  );
}
Input.propTypes = {
  palette: PropTypes.string,
  getData: PropTypes.func,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  defaultValue: PropTypes.string,
  readOnly: PropTypes.bool,
  type: PropTypes.string,
  required: PropTypes.bool,
  id: PropTypes.string,
  description: PropTypes.string,
};

export default Input;
