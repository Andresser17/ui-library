import { useEffect, useRef, useReducer } from "react";
import PropTypes from "prop-types";
import filesStyle from "./SingleFile.module.css";
// Icons
import { ReactComponent as FileIcon } from "./icons/file-icon.svg";

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_MODE":
      return { ...state, mode: action.payload };
    case "SET_RESPONSE":
      return { ...state, response: { ...state.response, ...action.payload } };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_DROP_DEPTH":
      return { ...state, dropDepth: action.dropDepth };
    case "SET_IN_DROP_ZONE":
      return { ...state, inDropZone: action.inDropZone };
    case "ADD_FILE":
      return { ...state, file: action.payload };
    case "DELETE_FILE":
      return {
        ...state,
        file: undefined,
      };
    default:
      return state;
  }
};

// Take a file size in Bytes, KB, MB or GB
export const calcFileSize = (str) => {
  if (str === undefined)
    throw new Error("argument provided can't be undefined");
  if (typeof str !== "string")
    throw new Error("argument provided can only be an string");

  const myRegex = /(\d*\.*\d+)(.b)/gi;
  const match = myRegex.exec(str);
  const onlyNum = match[1];
  const unit = match[2].toUpperCase();
  const units = { KB: 1, MB: 2, GB: 3, TB: 4 };

  const convertFunc = (size, n) => {
    if (n === 0) return size;

    return convertFunc(size * 1024, n - 1);
  };

  return convertFunc(onlyNum, units[unit]);
};

// Take a number in bytes
export const convertToUnit = (bytes) => {
  if (bytes === undefined)
    throw new Error("argument provided can't be undefined");
  if (typeof bytes !== "number")
    throw new Error("argument provided can only be a number");

  const units = { 1: "KB", 2: "MB", 3: "GB", 4: "TB" };
  const convertFunc = (size, n) => {
    if (size < 1) {
      const finalCalc = Number.isInteger(size * 1024)
        ? size * 1024
        : (size * 1024).toFixed(2);
      return String(finalCalc) + units[n - 2];
    }

    return convertFunc(size / 1024, n + 1);
  };

  return convertFunc(bytes, 1);
};

// Convert type/extension to .extension
export const printTypes = (accept) => {
  if (!accept) return `"Provide valid file formats"`;
  if (typeof accept !== "object")
    return `"this function only accept an array like argument"`;

  const mapped = accept.map((type, i) => {
    let toPrint = type.match(/\/\w+/g)[0].replace("/", ".");

    if (i === accept.length - 1) return toPrint + " ";

    return toPrint + ", ";
  });

  return mapped.join("");
};

function ListFiles({ data, uploadFiles, deleteFiles, fileInput, dispatch }) {
  const handleDeleteFile = (fileUploaded) => {
    if (fileUploaded) deleteFiles(data.file);
    dispatch({ type: "DELETE_FILE" });
  };

  if (!data.file) return;

  return (
    <div className="w-full h-full relative grid grid-cols-12 grid-rows-2">
      <span className="block col-span-8 justify-self-start row-start-1">
        {data.file.name}{" "}
        <span className="text-gray-400">{convertToUnit(data.file.size)}</span>
      </span>
      <span className="text-sm text-bg block col-span-8 justify-self-start self-end row-start-2">
        {/* File Uploaded */}
        {data.response?.data?.status === 200 ? (
          <button onClick={() => handleDeleteFile(true)} className="text-bg">
            Delete File
          </button>
        ) : (
          <>
            <button onClick={() => fileInput.current.click()}>
              Select file
            </button>
            <button onClick={uploadFiles} className="ml-3">
              Upload
            </button>
            <button
              onClick={() => handleDeleteFile()}
              className="text-bg ml-3 danger"
            >
              Delete
            </button>
          </>
        )}
      </span>
      <span className="w-10 p-3 flex justify-center row-span-2 col-start-12 mr-6 items-center rounded-[50%] bg-black/5 block h-10">
        <FileIcon className="text-bg" />
      </span>
    </div>
  );
}

function Uploading({ dispatch, data, accept, maxFileSize }) {
  const loadingBarRef = useRef();

  useEffect(() => {
    if (data.response.percent <= 100) {
      loadingBarRef.current.style = `width: ${String(data.response.percent)}%;`;
    }
  }, [data.response.percent]);

  // Response is completed, update mode
  useEffect(() => {
    const status = data.response?.data?.status;
    if (status === 200) dispatch({ type: "SET_MODE", payload: 1 });
  }, [data.response, dispatch]);

  return (
    <div className="grid grid-cols-12 grid-rows-4 w-full h-full">
      <span className="col-span-8 justify-self-start row-start-1 block text-bg">
        Uploading
      </span>
      <span
        className={`col-span-8 justify-self-start row-start-3 block text-sm ${
          data.response.err ? "text-bg danger" : "text-gray-400"
        }`}
      >
        {data.response.err
          ? "An error has occurred, upload the file again"
          : `${printTypes(accept)} files up to ${maxFileSize} in size`}
      </span>
      <span className="col-start-12 row-start-2 text-bg text-xl font-bold opacity-50 right-0">
        {data.response.percent}%
      </span>
      <span
        ref={loadingBarRef}
        className={`bg-bg absolute bottom-0 left-0 ${
          data.response.percent === 100 ? "rounded-br-md" : "rounded-r-md"
        } rounded-bl-md h-1`}
      ></span>
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
    // If file is being uploaded or is completed
    if (
      data.response.percent > 0 ||
      data.response.data?.status ||
      data.response.data?.err
    )
      return;

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

    // If file is being uploaded or is completed
    if (
      data.response.percent > 0 ||
      data.response.data?.status ||
      data.response.data?.err
    )
      return;

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

function Files({ palette, maxFileSize, accept, onUpload, onDelete }) {
  const [data, dispatch] = useReducer(reducer, {
    file: undefined,
    mode: 0,
    dropDepth: 0,
    inDropZone: false,
    error: { code: 0, message: "" },
    response: { percent: 0, data: undefined, err: undefined },
  });
  // Refs
  const fileInputRef = useRef();

  // Read file
  const handleFileInput = (files) => {
    const [file] = files;
    if (!file) return;

    // Compare maxFileSize with new input file size
    if (file.size > calcFileSize(maxFileSize)) {
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
    if (!accept.includes(file.type)) {
      dispatch({
        type: "SET_ERROR",
        payload: {
          code: 1,
          message: `${file.type} file type is not accepted`,
        },
      });
      return false;
    }

    if (data.file?.name === file.name) return;

    // Update data.file
    dispatch({ type: "ADD_FILE", payload: file });

    // Update component mode
    dispatch({ type: "SET_MODE", payload: 1 });
  };

  // Upload File
  const uploadFiles = () => {
    const formData = new FormData();
    formData.set("file", data.file);

    // Update component mode
    dispatch({ type: "SET_MODE", payload: 2 });

    // Pass file to handle prop
    onUpload(formData, (response) => {
      dispatch({
        type: "SET_RESPONSE",
        payload: response,
      });
    });
  };

  const modes = () => {
    // List Files
    if (data.mode === 1)
      return (
        <ListFiles
          dispatch={dispatch}
          data={data}
          uploadFiles={uploadFiles}
          deleteFiles={onDelete}
          fileInput={fileInputRef}
        />
      );

    // Uploading
    if (data.mode === 2)
      return (
        <Uploading
          {...{ dispatch, data }}
          accept={accept}
          maxFileSize={maxFileSize}
        />
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
            : `${printTypes(accept)} files up to ${maxFileSize} in size`}
        </span>
      </div>
    );
  };

  const resetComponent = () => {
    dispatch({
      type: "SET_RESPONSE",
      payload: { percent: 0, data: undefined, err: undefined },
    });
    dispatch({ type: "SET_MODE", payload: 0 });
    dispatch({ type: "SET_ERROR", payload: { code: 0, message: "" } });
  };

  // Reset mode
  useEffect(() => {
    if (!data.file && data.mode > 0) resetComponent();
  }, [data.file, data.mode]);

  // Reset error state
  useEffect(() => {
    if (data.error.code > 0 || data.response.err) {
      setTimeout(resetComponent, 1000 * 5);
    }
  }, [data.error, data.response.err]);

  return (
    <DragAndDrop {...{ dispatch, data, handleFileInput, palette }}>
      {modes()}
      <input
        data-testid="upload-input"
        ref={fileInputRef}
        onChange={(e) => handleFileInput([...e.target.files])}
        className={`${filesStyle["custom-file-input"]} ${
          data.file ? "hidden" : ""
        }`}
        type="file"
        id="myFile"
        name="filename"
      />
    </DragAndDrop>
  );
}
Files.propTypes = {
  palette: PropTypes.string,
  maxFileSize: PropTypes.string,
  accept: PropTypes.array,
  onUpload: PropTypes.func,
  onDelete: PropTypes.func,
};

export default Files;
