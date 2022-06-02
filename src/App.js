import "./App.css";
// import { useState } from "react";
import Input from "./Input";

function App() {
  const handleData = (data, setStatus) => {
    console.log(data);
    setStatus({code: 1})
  };

  return (
    <div className="App p-4 h-screen bg-blue-400 flex items-start justify-center">
      <div className="w-96">
        <Input getData={handleData} type="text" placeholder="Your name" description="You can put your name" />
      </div>
    </div>
  );
}

export default App;
