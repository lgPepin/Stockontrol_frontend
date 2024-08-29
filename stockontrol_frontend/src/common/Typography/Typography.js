import React from "react";

const Typography = ({ level, text, className }) => {
  if (level === "h1") {
    return <h1 className={className}>{text}</h1>;
  }
  if (level === "h2") {
    return <h2 className={className}>{text}</h2>;
  }
  if (level === "h3") {
    return <h3 className={className}>{text}</h3>;
  }
  if (level === "h4") {
    return <h4 className={className}>{text}</h4>;
  }
  if (level === "h5") {
    return <h5 className={className}>{text}</h5>;
  }
  if (level === "h6") {
    return <h6 className={className}>{text}</h6>;
  }
  if (level === "p") {
    return <p className={className}>{text}</p>;
  }
};
export default Typography;
