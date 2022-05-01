import { useState } from "react";

function Button({ text }) {
  const [mode, setMode] = useState("def");
  // Modes
  const def = "bg-[#6E41E2]";
  const hover = "bg-[#5835B0]";
  const active = "bg-[#472C8A]";
  const focus = "bg-[#6E41E2] border-[#412A7E]";
  const disabled = "bg-[#E3DAF9]";
  // const loader = "bg-[#6E41E2]";
  // Styles
  const label = "";
  // Designs
  const primary = "bg-[#6E41E2] text-white";

  return (
    <button
      className={`bg-buttonDef text-white px-4 py-2 rounded-md hover:bg-buttonHover active:${active} focus:${focus} disabled:${disabled}`}
    >
      {text}
    </button>
  );
}

export default Button;
