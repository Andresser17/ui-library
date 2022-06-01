import PropTypes from "prop-types";
import { useState } from "react";

function Filter({ onClick, items, palette }) {
  const [active, setActive] = useState(0);
  // If palette is not provided, is equal primary
  const optPalette = palette ? palette : "primary";
  // If item is active
  const activeBorder = "border-bg hover:border-hover";
  const defaultBorder = "border-gray-300/60 hover:border-gray-500";
  const styles = `${optPalette} flex justify-center items-center block w-20 h-12 text-text border-2 cursor-pointer`;

  const handleClick = (e, index) => {
    setActive(index);

    const text = e.target.textContent.toLowerCase();
    onClick(text);
  };

  return (
    <div className="flex">
      {items.map((item, i) => (
        <span
          onClick={(e) => handleClick(e, i)}
          key={`${item.toLowerCase()}-${i}`}
          className={`${styles} ${
            active === i ? activeBorder : defaultBorder
          } ${i === 0 ? "rounded-l-md" : ""} ${
            i === items.length - 1 ? "rounded-r-md" : ""
          }`}
        >
          {item}
        </span>
      ))}
    </div>
  );
}
Filter.propTypes = {
  onClick: PropTypes.func,
  items: PropTypes.array,
  palette: PropTypes.string,
};

export default Filter;
