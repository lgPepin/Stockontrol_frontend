import React from "react";
import Button from "react-bootstrap/Button";
import { BsArrowLeftCircle } from "react-icons/bs";
import Typography from "../../common/Typography/Typography";
import { Link } from "react-router-dom";

const CreateHeader = ({ text, pathSearch }) => {
  return (
    <div className="p-4 bg-primary">
      <div className="row">
        <div className="col-2">
          <Link to={pathSearch}>
            <Button
              variant="secondary"
              size="lg"
              className="text-black border-dark"
            >
              <BsArrowLeftCircle className="me-2" size={"1.4em"} />
              Regresar
            </Button>
          </Link>
        </div>

        <div className="col-4 offset-2">
          <Typography level={"h1"} text={text} />
        </div>
      </div>
    </div>
  );
};

export default CreateHeader;
