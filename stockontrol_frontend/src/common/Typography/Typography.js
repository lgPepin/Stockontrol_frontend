import React from "react";

const Typography = ({ level, text, className }) => {
  if (level === "h1") {
    return (
      <h1 className={className}>
        <center>{text}</center>
      </h1>
    );
  }
  if (level === "h2") {
    return (
      <h2>
        <center>{text}</center>
      </h2>
    );
  }
};
export default Typography;
