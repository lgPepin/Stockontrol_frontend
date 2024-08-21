import React from "react";
import Button from "react-bootstrap/Button";
import { BsArrowLeftCircle } from "react-icons/bs";
import Typography from "../../common/Typography/Typography";
import { Link } from "react-router-dom";

const UpdateHeader = ({ text, pathSearch, backButtonName }) => {
  return (
    <div className="p-4 bg-warning">
      <div className="row">
        <div className="col-2">
          <Link to={pathSearch}>
            <Button
              variant="secondary"
              size="lg"
              className="text-black border-dark"
            >
              <BsArrowLeftCircle className="me-2" size={"1.4em"} />
              {backButtonName}
            </Button>
          </Link>
        </div>

        <div className="offset-3 col-4">
          <Typography level={"h1"} text={text} />
        </div>
      </div>
    </div>
  );
};

export default UpdateHeader;
