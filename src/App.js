import "./App.css";
// Font Icons
// import "./icons/checkmark/styles.css";
// import { ReactComponent as LoadingIcon } from "./icons/loading-icon.svg";
// import Button from "./Button";
// import Badge from "./Badge";
import Files from "./Files";

const handleUpload = (formData) => {
  fetch("http://localhost:3001/upload-single-file", {
    method: "POST",
    body: formData,
  }).then((res) => res.json())
  .then(data => {
    console.log(data)
    console.log(data.url)
  })
};

function App() {
  return (
    <div className="App p-4 h-screen bg-green-400 flex items-start justify-center">
      <Files maxFileSize="3MB" accept={["image/png", "image/jpeg", "image/gif"]} handleUpload={handleUpload} palette="primary" />
    </div>
  );
}

export default App;
