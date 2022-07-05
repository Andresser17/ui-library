import { useState } from "react";
import PropTypes from "prop-types";
// Helpers
import formatKey from "./helpers/key";

function Tab({ text, size, id, horizontal, selected, onSelected }) {
  const font =
    size === "sm" ? "text-sm" : size === "md" ? "text-md" : "text-lg";

  return (
    <span
      onClick={onSelected}
      className={`inline-block text-zinc-500 hover:border-zinc-500 cursor-pointer ${
        selected === id ? "border-bg" : "border-black/0"
      } ${font} ${
        horizontal ? "border-l-2 pl-5 py-2" : "border-b-2 px-4 py-3"
      }`}
    >
      {text}
    </span>
  );
}

function Tabs({
  palette = "primary",
  tabs,
  size = "sm",
  horizontal,
  getSelected,
}) {
  const [selected, setSelected] = useState("");

  // if one tab is clicked, update selected
  const handleSelected = (key) => {
    setSelected(key);
    // pass selected tab to parent
    getSelected(key);
  };

  return (
    <div className={`${palette} ${horizontal ? "flex flex-col" : ""}`}>
      {tabs &&
        tabs.map((t, i) => {
          const key = formatKey(t);

          // select the first tab by default
          if (i === 0 && selected.length === 0) setSelected(key);

          return (
            <Tab
              key={key}
              id={key}
              size={size}
              text={t}
              selected={selected}
              onSelected={() => handleSelected(key)}
              horizontal={horizontal}
            />
          );
        })}
    </div>
  );
}
Tabs.propTypes = {
  palette: PropTypes.string,
  tabs: PropTypes.array,
  size: PropTypes.string,
  horizontal: PropTypes.bool,
  getSelected: PropTypes.func,
};

export default Tabs;
