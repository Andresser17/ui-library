import { useState, useEffect, useRef, useReducer } from "react";
import PropTypes from "prop-types";
import filesStyle from "./Files.module.css";
// Icons
import { ReactComponent as FileIcon } from "./icons/file-icon.svg";

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_MODE":
      return { ...state, mode: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_DROP_DEPTH":
      return { ...state, dropDepth: action.dropDepth };
    case "SET_IN_DROP_ZONE":
      return { ...state, inDropZone: action.inDropZone };
    case "ADD_FILE_TO_LIST":
      return {
        ...state,
        fileList: state.fileList.concat(action.payload),
      };
    case "ADD_ONE_FILE_TO_LIST":
      return { ...state, fileList: action.payload };
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

function ListFiles({ files, multipleFiles, uploadFiles, fileInput, dispatch }) {
  if (files.length === 0) return;

  const deleteFile = (index) =>
    dispatch({ type: "DELETE_FILE_FROM_LIST", index });

  const single = (
    <>
      <span className="block col-span-8 justify-self-start row-start-1">
        {files[0].name}{" "}
        <span className="text-gray-400">{convertToUnit(files[0].size)}</span>
      </span>
      <span className="text-sm text-bg block col-span-8 justify-self-start self-end row-start-2">
        <button onClick={() => fileInput.current.click()}>Select file</button>
        <button onClick={uploadFiles} className="ml-3">
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
    <div className="w-full, h-full grid grid-cols-12 grid-rows-2">
      {multipleFiles ? multiple : single}
    </div>
  );
}

function DragAndDrop({ dispatch, data, handleFileInput, palette, children }) {
  // If palette is not provided, is equal primary
  const optPalette = palette ? palette : "primary";
  const styles = `${
    data.inDropZone ? "bg-bg" : "bg-gray-100"
  } flex flex-col justify-center items-center rounded-md shadow-md relative hover:shadow-xl w-[40rem] h-20 p-4 ${optPalette}`;
  // Manage file drag and drop
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "copy";
    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: true });
  };
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: "SET_DROP_DEPTH", dropDepth: data.dropDepth + 1 });
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (data.dropDepth === 0) return;
    dispatch({ type: "SET_DROP_DEPTH", dropDepth: data.dropDepth - 1 });
    dispatch({ type: "SET_IN_DROP_ZONE", inDropZone: false });
  };

  const handleDrop = (e) => {
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

  return (
    <div
      className={`${filesStyle["drop-zone"]} ${styles}`}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {data.inDropZone ? (
        <FileIcon className="h-6 w-6 block text-text" />
      ) : (
        children
      )}
    </div>
  );
}

function Files({
  handleUpload,
  palette,
  maxFileSize,
  accept,
  multipleFiles,
  progressEvent,
}) {
  // Drag and Drop state
  const [data, dispatch] = useReducer(reducer, {
    mode: 0,
    dropDepth: 0,
    inDropZone: false,
    error: { code: 0, message: "" },
    fileList: [],
  });
  // Refs
  const fileInputRef = useRef();

  // Read file
  const handleFileInput = (files) => {
    if (files.length === 0) return;

    const existingFiles = data.fileList.map((f) => f.name);
    const filteredFiles = files.filter((f) => {
      // Compare maxFileSize with new input file size
      if (f.size > calcFileSize(maxFileSize)) {
        dispatch({
          type: "SET_ERROR",
          payload: {
            code: 1,
            message: `The file weight more than ${maxFileSize}`,
          },
        });
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
      dispatch({ type: "ADD_FILE_TO_LIST", payload: filteredFiles });
    } else {
      dispatch({ type: "ADD_ONE_FILE_TO_LIST", payload: filteredFiles });
    }

    // Update component mode
    dispatch({ type: "SET_MODE", payload: 1 });
  };

  // Upload File
  const uploadFiles = () => {
    const files = data.fileList[0];
    const formData = new FormData();
    formData.set("file", files);

    // Update component mode
    dispatch({ type: "SET_MODE", payload: 2 });

    // Pass file to handle prop
    handleUpload(formData);
  };

  // Convert type/extension to .extension
  const printTypes = accept.map((type, i) => {
    let toPrint = type.match(/\/\w+/g)[0].replace("/", ".");

    if (i === accept.length - 1) return toPrint + " ";

    return toPrint + ", ";
  });

  const modes = () => {
    // List Files
    if (data.mode === 1)
      return (
        <ListFiles
          files={data.fileList}
          multipleFiles={multipleFiles}
          uploadFiles={uploadFiles}
          fileInput={fileInputRef}
          dispatch={dispatch}
        />
      );

    // Uploading
    if (data.mode === 2)
      return (
        <div className="grid grid-cols-12 grid-rows-4 w-full h-full">
          <span className="col-span-8 justify-self-start row-start-1 block text-bg">
            Uploading
          </span>
          <span
            className={`col-span-8 justify-self-start row-start-3 block text-sm ${
              data.error.code === 2 ? "text-bg danger" : "text-gray-400"
            }`}
          >
            {data.error.code === 2
              ? data.error.message
              : `${printTypes} files up to ${maxFileSize} in size`}
          </span>
          <span className="col-start-12 row-start-2 self-start text-bg text-xl font-bold opacity-50 right-0">
            66%
          </span>
          <span className="bg-bg w-full absolute bottom-0 left-0 rounded-b-md h-1"></span>
        </div>
      );

    return (
      <div className="grid grid-cols-12 grid-rows-4 w-full h-full">
        <span className="col-span-8 justify-self-start row-start-1 block text-bg">
          Select or drag a file
        </span>
        <span
          className={`col-span-8 justify-self-start row-start-3 block text-sm ${
            data.error.code === 1 ? "text-bg danger" : "text-gray-400"
          }`}
        >
          {data.error.code === 1
            ? data.error.message
            : `${printTypes} files up to ${maxFileSize} in size`}
        </span>
      </div>
    );
  };

  // Reset mode
  useEffect(() => {
    if (data.fileList.length === 0 && data.mode > 0) {
      dispatch({ type: "SET_MODE", payload: 0 });
    }
  }, [data.fileList, data.mode]);

  // Reset error state
  useEffect(() => {
    if (data.error.code > 0) {
      setTimeout(() => {
        dispatch({ type: "SET_ERROR", payload: { code: 0, message: "" } });
      }, 1000 * 5);
    }
  }, [data.error]);

  return (
    <DragAndDrop {...{ dispatch, data, handleFileInput, palette }}>
      {modes()}
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
    </DragAndDrop>
  );
}
Files.propTypes = {
  handleUpload: PropTypes.func,
  palette: PropTypes.string,
  maxFileSize: PropTypes.string,
  accept: PropTypes.array,
  multipleFiles: PropTypes.bool,
  progressEvent: PropTypes.object,
};

export default Files;
