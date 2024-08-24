import React from "react";
import Typography from "../../common/Typography/Typography";

const ActiveHeader = ({ text }) => {
  return (
    <div className="p-4 bg-warning">
      <div className="row">
        <div className="offset-5 col-3 ">
          <Typography level={"h1"} text={text} />
        </div>
      </div>
    </div>
  );
};

export default ActiveHeader;
