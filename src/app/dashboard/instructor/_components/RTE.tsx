"use client";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function RTE({
  value,
  setValue,
  placeholder
}: {
  value: string;
  setValue: (value: string) => void;
  placeholder?: string
}) {
  return (
    <ReactQuill
      placeholder={placeholder}
      theme="snow"
      value={value}
      onChange={setValue}
      className="border-none"
    />
  );
}

export default RTE;
