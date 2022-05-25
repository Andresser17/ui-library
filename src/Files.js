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

    case "DELETE_FILE_FROM_LIST":
      return {
        ...state,
        fileList: state.fileList.filter((_, i) => i !== action.index),
      };
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

// Take a number in bytes
const convertToUnit = (bytes) => {
  const units = { 1: "KB", 2: "MB", 3: "GB", 4: "TB" };
  const convertFunc = (size, n) => {
    if (size < 1) return String((size * 1024).toFixed(2)) + units[n - 2];

    return convertFunc(size / 1024, n + 1);
  };

  return convertFunc(bytes, 1);
};

function ListFiles({ files, multipleFiles, fileInput, dispatch }) {
  if (files.length === 0) return;

  const deleteFile = (index) =>
    dispatch({ type: "DELETE_FILE_FROM_LIST", index });

  const uploadFile = () => {};

  const single = (
    <>
      <span className="block col-span-8 justify-self-start row-start-1">
        {files[0].name}{" "}
        <span className="text-gray-400">{convertToUnit(files[0].size)}</span>
      </span>
      <span className="text-sm text-bg block col-span-8 justify-self-start self-end row-start-2">
        <button onClick={() => fileInput.current.click()}>Select file</button>
        <button onClick={uploadFile} className="ml-3">
          Upload
        </button>
        <button onClick={() => deleteFile(0)} className="text-bg ml-3 danger">
          Delete
        </button>
      </span>
      <span className="w-10 p-3 flex justify-center row-span-2 col-start-12 mr-6 items-center rounded-[50%] bg-black/5 block h-10">
        <FileIcon className="text-bg" />
      </span>
    </>
  );
  const multiple = (
    <ol className="bg-red-600 w-full">
      {files.map((f) => {
        return <li key={f.name}>{f.name}</li>;
      })}
    </ol>
  );

  return (
    <div className="p-4 grid grid-cols-12 grid-rows-2 relative rounded-md">
      {multipleFiles ? multiple : single}
    </div>
  );
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

  // If data.dropDepth is < 0, inDropZone is false
  useEffect(() => {
    if (data.dropDepth <= 0)
      dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false });
  }, [data.dropDepth]);

  // Pass handlers to parent component
  useEffect(() => {
    setHandlers({ onDrop, onDragOver, onDragEnter, onDragLeave });
  }, []);

  const printTypes = accept.map((type, i) => {
    let toPrint = type.match(/\/\w+/g)[0].replace("/", ".");

    if (i === accept.length - 1) return toPrint + " ";

    return toPrint + ", ";
  });

  return (
    <div
      className={`flex flex-col absolute p-4 justify-center w-full h-full z-10 rounded-md ${
        data.inDropZone ? "bg-bg items-center" : "items-start"
      } ${data.fileList.length > 0 && !data.inDropZone ? "hidden" : ""}`}
    >
      {/* If not are a file in drop zone */}
      {!data.inDropZone ? (
        <>
          <span className="block text-bg">Select or drag a file</span>
          <span className="block text-sm text-gray-400">
            {printTypes} files up to {maxFileSize} in size
          </span>
        </>
      ) : (
        <FileIcon className="h-6 w-6 text-text" />
      )}
    </div>
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
  const styles = `bg-gray-100 rounded-md shadow-md relative hover:shadow-xl w-[40rem] h-20`;
  // Error state

  // Refs
  const fileInputRef = useRef();

  // Assign id from label prop
  // useEffect(() => {
  //   const newId = label.replaceAll(" ", "-");
  //   checkboxRef.current.id = newId;
  // }, [label]);

  // Read file
  const handleFileInput = (files) => {
    if (files.length === 0) return;

    const existingFiles = data.fileList.map((f) => f.name);
    const filteredFiles = files.filter((f) => {
      // Compare maxFileSize with new input file size
      if (f.size > calcFileSize(maxFileSize)) {
        // In the future change the component to error state
        return false;
      }

      // Check if fileType is accepted
      if (!accept.includes(f.type)) {
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
    <div className={`${styles} ${optPalette}`} {...handlers}>
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
      <ListFiles
        files={data.fileList}
        multipleFiles={multipleFiles}
        fileInput={fileInputRef}
        dispatch={dispatch}
      />
      <input
        ref={fileInputRef}
        onChange={(e) => handleFileInput([...e.target.files])}
        className={`${filesStyle["custom-file-input"]} ${
          data.fileList.length > 0 ? "hidden" : ""
        }`}
        type="file"
        id="myFile"
        name="filename"
      />
    </div>
  );
}
Files.propTypes = {
  handleUpload: PropTypes.func,
  palette: PropTypes.string,
  error: PropTypes.bool,
  maxFileSize: PropTypes.string,
  accept: PropTypes.array,
  multipleFiles: PropTypes.bool,
  progressEvent: PropTypes.object,
};

export default Files;
