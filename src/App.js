import axios from "axios";
import "./App.css";
// Font Icons
// import "./icons/checkmark/styles.css";
// import { ReactComponent as LoadingIcon } from "./icons/loading-icon.svg";
// import Button from "./Button";
// import Badge from "./Badge";
import SingleFile from "./SingleFile";

const handleUpload = (formData, setResponse) => {
  axios
    .post("http://localhost:3001/upload-single-file", formData, {
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setResponse({ percent: percentCompleted });
        console.log(`upload process: ${percentCompleted}%`);
      },
    })
    .then((response) => {
      setResponse({ data: response });
      console.log(response.data.message);
    })
    .catch((err) => {
      setResponse({ err });
      console.log(err);
    });
};

const handleDelete = async (file) => {
  const response = await axios.delete(
    "http://localhost:3001/delete-single-file",
    {
      headers: {
        "Content-type": "application/json",
      },
      data: { filename: file.name },
    }
  );

  console.log(response.data.message);
};

function App() {
  return (
    <div className="App p-4 h-screen bg-green-400 flex items-start justify-center">
      <SingleFile
        maxFileSize="1MB"
        accept={["image/png", "image/jpeg", "image/gif"]}
        onUpload={handleUpload}
        onDelete={handleDelete}
        palette="success"
      />
    </div>
  );
}

export default App;
