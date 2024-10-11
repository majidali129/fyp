"use client";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function RTE({
  value,
  setValue,
}: {
  value: string;
  setValue: (value: string) => void;
}) {
  return (
    <ReactQuill
      placeholder="Enter your course description..."
      theme="snow"
      value={value}
      onChange={setValue}
      className="border-none"
    />
  );
}

export default RTE;
