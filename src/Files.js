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
      return {
        ...state,
        fileList: state.fileList.concat(action.filteredFiles),
      };
    case "ADD_ONE_FILE_TO_LIST":
      return { ...state, fileList: action.filteredFiles };
    default:
      return state;
  }
};

// Take a file size in Bytes, KB, MB or GB
const calcFileSize = (str) => {
  const KB = /[. 0-9]+(KB)/g;
  const MB = /[. 0-9]+(MB)/g;
  const GB = /[. 0-9]+(GB)/g;
  const onlyNum = Number(str.match(/\d+/g));
  const convertFunc = (size, n) => {
    if (n === 0) return size;

    return convertFunc(size * 1024, n - 1);
  };

  if (KB.test(str)) {
    return convertFunc(onlyNum, 1);
  }

  if (MB.test(str)) {
    return convertFunc(onlyNum, 2);
  }

  if (GB.test(str)) {
    return convertFunc(onlyNum, 3);
  }

  return Number(str);
};

function ListFiles({ files, multipleFiles }) {
  const multiple = (
    <ol className="bg-red-600 w-full">
      {files.map((f) => {
        return <li key={f.name}>{f.name}</li>;
      })}
    </ol>
  );

  return multiple;
}

function DragAndDrop({
  dispatch,
  data,
  handleFileInput,
  accept,
  maxFileSize,
  setHandlers,
}) {
  // Manage file drag and drop
  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    let files = [...e.dataTransfer.files];

    if (files && files.length > 0) {
      handleFileInput(files);
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

  // If data.dropDepth is, 0 inDropZone is false
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
            {accept} files up to {maxFileSize} in size
          </span>
        </>
      ) : (
        <FileIcon className="h-6 w-6 text-text" />
      )}
    </>
  );
}

function Files({
  handleUpload,
  palette,
  error,
  maxFileSize,
  accept,
  multipleFiles,
  progressEvent,
}) {
  const [handlers, setHandlers] = useState({});
  // Drag and Drop state
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

  // Read file
  const handleFileInput = (files) => {
    const existingFiles = data.fileList.map((f) => f.name);
    const filteredFiles = files.filter((f) => {
      // Compare maxFileSize with new input file size
      if (f.size > calcFileSize(maxFileSize)) {
        // In the future change the component to error state
        return false;
      }

      // Check if input files are in fileList;
      return !existingFiles.includes(f.name);
    });

    // Toggle between one file or multiple files at once
    if (multipleFiles) {
      dispatch({ type: "ADD_FILE_TO_LIST", filteredFiles });
    } else {
      dispatch({ type: "ADD_ONE_FILE_TO_LIST", filteredFiles });
    }
  };

  // Upload File
  const uploadFileInput = () => {
    const files = data.fileList[0];
    const formData = new FormData();
    formData.set("file", files);

    handleUpload(formData);
  };

  return (
    <div
      className={`${
        data.inDropZone ? inDropZoneStyles : outDropZoneStyles
      } ${styles} ${optPalette}`}
      {...handlers}
    >
      <DragAndDrop
        {...{
          dispatch,
          data,
          handleFileInput,
          accept,
          maxFileSize,
          setHandlers,
        }}
      />
      <ListFiles files={data.fileList} multipleFiles={multipleFiles} />
      <input
        onChange={(e) => handleFileInput([...e.target.files])}
        className={filesStyle["custom-file-input"]}
        type="file"
        id="myFile"
        name="filename"
      />
      {/* <button onClick={uploadFileInput} className="bg-red-600 p-4"> */}
      {/*   Hello */}
      {/* </button> */}
    </div>
  );
}
Files.propTypes = {
  handleUpload: PropTypes.func,
  palette: PropTypes.string,
  error: PropTypes.bool,
  maxFileSize: PropTypes.string,
  accept: PropTypes.string,
  multipleFiles: PropTypes.bool,
  progressEvent: PropTypes.object,
};

export default Files;
