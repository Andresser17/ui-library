import { useRef, useEffect } from "react";
import PropTypes from "prop-types";
// Icons
import { ReactComponent as DefaultIcon } from "./icons/division-icon.svg";
import { ReactComponent as ParamIcon1 } from "./icons/graduation-hat-icon.svg";
import { ReactComponent as ParamIcon2 } from "./icons/pencil-icon.svg";

function Island({
  palette,
  title,
  head,
  description,
  children,
  mode = "stop",
  percent = 0,
}) {
  // If palette is not provided, is equal primary
  const optPalette = palette ? palette : "primary";
  const optPadding = mode === "stop" ? "p-5" : "p-5 pt-10";
  // refs
  const progressBarRef = useRef();

  // progress bar width
  useEffect(() => {
    const progressBar = () => {
      progressBarRef.current.style.width = `${percent}%`;
    };
    progressBar();
  }, [percent]);

  return (
    <div
      className={`relative bg-bg text-text w-96 ${optPadding} rounded-md flex items-start flex-col ${optPalette}`}
    >
      <div className="w-28 h-28 rounded-bl-[100%] bg-white/20 top-0 flex place-content-center right-0 absolute">
        {children?.icon ? (
          children.icon
        ) : (
          <DefaultIcon className="w-8 text-text ml-6 mb-4" />
        )}
      </div>
      {/* Progress bar */}
      {mode !== "stop" && (
        <span
          ref={progressBarRef}
          className={`absolute top-0 left-0 block w-full px-5 py-1 text-[0.8rem] text-left rounded-tl-md ${
            percent >= 99 ? "rounded-tr-md" : ""
          } bg-bg success`}
        >
          {mode === "completed"
            ? "Completed"
            : percent <= 33
            ? `${percent}%`
            : `Progress ${percent}%`}
        </span>
      )}
      {/* Title */}
      <span className="text-sm text-bg bg-text px-2 py-0.5 mb-2 font-semibold rounded-xl">
        {title}
      </span>
      {/* Head */}
      <span className="text-2xl block text-left">{head}</span>
      {/* Description */}
      <p className="text-md mt-1">{description}</p>
      {/* Buttons and params */}
      <div className="mt-5 flex">
        <button className="border-2 rounded mr-6 py-2 px-4 border-text hover:bg-white/10">
          Open
        </button>
        {children?.params ? (
          children.params.map((p) => (
            <span className="mr-2 flex items-center">
              {p.icon} {p.text}
            </span>
          ))
        ) : (
          <>
            <span className="mr-3 flex items-center">
              <ParamIcon1 className="w-6 mr-1 text-text" /> Params
            </span>
            <span className="mr-3 flex items-center">
              <ParamIcon2 className="w-5 mr-1 text-text" /> Params
            </span>
          </>
        )}
      </div>
    </div>
  );
}
Island.propTypes = {
  palette: PropTypes.string,
  title: PropTypes.string,
  head: PropTypes.string,
  description: PropTypes.string,
  mode: PropTypes.string,
  percent: PropTypes.number,
};

export default Island;
