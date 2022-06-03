import "./App.css";
// import { useState } from "react";
import InputTag from "./InputTag";
import Input from "./Input";

function App() {
  const handleData = (tags, setData) => {
    if (tags.length <= 3) {
      setData(undefined, tags)
    }
  };

  return (
    <div className="App p-4 h-screen bg-blue-600 flex items-start justify-center">
      <div className="w-96">
        <InputTag
          getData={handleData}
          type="text"
          placeholder="Your name"
          description="You can put your name"
          palette="success"
        />
        <div className="mt-10">
          <Input
            getData={handleData}
            type="text"
            placeholder="Your name"
            readOnly
            description="You can put your name"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
