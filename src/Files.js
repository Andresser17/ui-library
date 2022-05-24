import { useState, useEffect, useRef, useReducer } from "react";
import PropTypes from "prop-types";
import filesStyle from "./Files.module.css";
// Icons
import { ReactComponent as FileIcon } from "./icons/file-icon.svg";

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_DROP_DEPTH":
      return { ...state, dropDepth: action.dropDepth };
    case "SET_IN_DROP_ZONE":
      return { ...state, inDropZone: action.inDropZone };
    case "ADD_FILE_TO_LIST":
      return { ...state, fileList: state.fileList.concat(action.files) };
    case "ADD_ONE_FILE_TO_LIST":
      return { ...state, fileList: action.files };
    default:
      return state;
  }
};

function ListFiles({ files, multipleFiles }) {
  return (
    <ol className="bg-red-600 w-full">
      {files.map((f) => {
        return <li key={f.name}>{f.name}</li>;
      })}
    </ol>
  );
}

function DragAndDrop({ dispatch, data, multipleFiles, setHandlers }) {
  // Manage file drag and drop
  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    let files = [...e.dataTransfer.files];

    if (files && files.length > 0) {
      const existingFiles = data.fileList.map((f) => f.name);
      files = files.filter((f) => !existingFiles.includes(f.name));

      // Toggle between one file or multiple files at once
      if (multipleFiles) {
        dispatch({ type: "ADD_FILE_TO_LIST", files });
      } else {
        dispatch({ type: "ADD_ONE_FILE_TO_LIST", files });
      }
      e.dataTransfer.clearData();
      dispatch({ type: "SET_DROP_DEPTH", dropDepth: 0 });
      dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false });
    }
  };
  const onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "copy";
    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: true });
  };
  const onDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: "SET_DROP_DEPTH", dropDepth: data.dropDepth + 1 });
  };
  const onDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: "SET_DROP_DEPTH", dropDepth: data.dropDepth - 1 });
  };

  // If data.dropDepth is, 0 inDropZone is equal false
  useEffect(() => {
    if (data.dropDepth === 0)
      dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false });
  }, [data.dropDepth]);

  // Pass handlers to parent component
  useEffect(() => {
    setHandlers({ onDrop, onDragOver, onDragEnter, onDragLeave });
  }, []);

  return (
    <>
      {/* If not are a file in drop zone */}
      {!data.inDropZone ? (
        <>
          <span className="block text-bg">Select or drag a file</span>
          <span className="block text-sm text-gray-400">
            PNG, jpg, gif files up to 10 MB in size
          </span>
        </>
      ) : (
        <FileIcon className="h-6 w-6 text-text" />
      )}
    </>
  );
}

function Files({
  onClick,
  palette,
  error,
  maxFileSize,
  accept,
  multipleFiles,
}) {
  const [handlers, setHandlers] = useState({});
  // Dispatch
  const [data, dispatch] = useReducer(reducer, {
    dropDepth: 0,
    inDropZone: false,
    fileList: [],
  });
  // If palette is not provided, is equal primary
  const optPalette = palette ? palette : "primary";
  const styles = `flex ${
    data.inDropZone ? "items-center" : "items-start"
  } justify-center flex-col cursor-pointer shadow-md rounded-md p-4 relative hover:shadow-xl w-[40rem] h-20`;
  // Drag and Drop styles
  const outDropZoneStyles = "bg-gray-100";
  const inDropZoneStyles = "bg-bg";
  // Error state

  // Assign id from label prop
  // useEffect(() => {
  //   const newId = label.replaceAll(" ", "-");
  //   checkboxRef.current.id = newId;
  // }, [label]);
  const handleFileInput = (e) => {
    const newFile = e.target.files;
    console.log(newFile)
  }

  return (
    <div
      className={`${
        data.inDropZone ? inDropZoneStyles : outDropZoneStyles
      } ${styles} ${optPalette}`}
      {...handlers}
    >
      <DragAndDrop {...{ dispatch, data, multipleFiles, setHandlers }} />
      <ListFiles files={data.fileList} multipleFiles={multipleFiles} />
      <input
        onChange={handleFileInput}
        className={filesStyle["custom-file-input"]}
        type="file"
        id="myFile"
        name="filename"
      />
    </div>
  );
}
Files.propTypes = {
  onClick: PropTypes.func,
  palette: PropTypes.string,
  error: PropTypes.bool,
  maxFileSize: PropTypes.string,
  accept: PropTypes.string,
  multipleFiles: PropTypes.bool,
};

export default Files;
