import "./App.css";
// import { useState } from "react";
import InputTag from "./InputTag";
import Input from "./Input";

function App() {
  const handleInput = (data, setData) => {
    setData({ code: 1 }, data);
  };

  return (
    <div className="App p-4 h-screen bg-blue-600 flex items-start justify-center">
      <div className="w-96">
        <InputTag
          getInput={handleInput}
          type="text"
          placeholder="Your name"
          description="You can put your name"
          palette="success"
        />
        <div className="mt-10">
          <Input
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
