import React from "react";
import Typography from "../../common/Typography/Typography";

const LoginHeader = ({ text }) => {
  return (
    <div className="p-4 bg-warning">
      <div className="text-center ">
        <Typography level={"h1"} text={text} />
      </div>
    </div>
  );
};

export default LoginHeader;
