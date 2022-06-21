import { useState, useEffect } from "react";
import PropTypes from "prop-types";
// Icons
import { ReactComponent as ErrorIcon } from "./icons/error-icon.svg";

function Tag({ text, close, readOnly }) {
  return (
    <span className="flex bg-bg text-text px-2 rounded-sm text-sm mr-1">
      {text}
      {/* close tag */}
      {!readOnly && (
        <ErrorIcon onClick={close} className="ml-1 cursor-pointer w-4" />
      )}
    </span>
  );
}

function Tags({ tags, deleteTag, readOnly }) {
  const mapped = tags.map((tag, i) => (
    <Tag
      key={`${tag.replaceAll(" ", "-")}-${i}`}
      text={tag}
      close={() => deleteTag(i)}
      {...{ readOnly }}
    />
  ));

  return <>{mapped}</>;
}

function InputTag({
  palette,
  getInput,
  getTags,
  getRef,
  placeholder,
  disabled,
  defaultTags,
  readOnly,
  type = "text",
  description,
  required,
  id,
}) {
  const [value, setValue] = useState("");
  const [tags, setTags] = useState([]);
  const [status, setStatus] = useState({ code: 0, message: "" });
  // If palette is not provided, is equal primary
  const optPalette = palette ? palette : "primary";
  const disabledStyle = `opacity-90 pointer-events-none`;
  const styles = `${
    status.code === 1
      ? "bg-green-200"
      : status.code === 2
      ? "bg-red-200"
      : "bg-gray-100"
  } p-4 w-full shadow-md ${
    disabled ? disabledStyle : ""
  } rounded-sm hover:shadow-lg active:shadow-xl flex p-4 flex-wrap`;

  useEffect(() => {
    if (defaultTags && defaultTags.length > 0) {
      setTags(defaultTags);
    }
  }, [defaultTags]);

  const handleChange = (e) => {
    getInput(e.target.value, mergeData);
    setValue(e.target.value);
  };

  const handleTagClose = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
    // Delete tag in parent state
    getTags([...newTags], mergeData);
  };

  const mergeData = (newStatus, newValue) => {
    setStatus((prev) => ({ ...prev, ...newStatus }));
    if (!newValue || newValue.length === 0) return;
    setValue([...newValue]);
  };

  // add tag when user click enter
  const addTag = ({ key }) => {
    if (key === "Enter") {
      if (value.length === 0) return;
      if (status.code === 2) return;
      setTags([...tags, value]);
      getTags([...tags, value]);
      setValue("");
    }
  };

  if (type !== "text" && type !== "password")
    throw new Error("type property only accept text and password");

  return (
    <label
      className={`flex flex-col items-start text-sm w-full ${optPalette}`}
      htmlFor={id}
    >
      <div className={styles} aria-disabled={disabled}>
        <Tags readOnly={readOnly} tags={tags} deleteTag={handleTagClose} />
        <input
          onKeyPress={addTag}
          value={value}
          onChange={handleChange}
          className="bg-black/0 w-auto flex-auto inline-block focus:outline-none placeholder:text-gray-400"
          {...{
            disabled,
            type,
            readOnly,
            required,
            placeholder,
            id,
          }}
        />
      </div>
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
InputTag.propTypes = {
  palette: PropTypes.string,
  getInput: PropTypes.func,
  getTags: PropTypes.func,
  getRef: PropTypes.func,
  placeholder: PropTypes.string,
  defaultTags: PropTypes.array,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  type: PropTypes.string,
  required: PropTypes.bool,
  id: PropTypes.string,
  description: PropTypes.string,
};

export default InputTag;
