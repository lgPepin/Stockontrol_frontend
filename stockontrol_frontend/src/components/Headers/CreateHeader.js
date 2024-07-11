import React from "react";
import Button from "react-bootstrap/Button";
import { BsArrowLeftCircle } from "react-icons/bs";
import Typography from "../../common/Typography/Typography";

const CreateHeader = ({ text }) => {
  return (
    <div className="row p-4 bg-primary">
      <div className="col-2">
        <Button
          variant="secondary"
          size="lg"
          className="text-black border-dark"
        >
          <BsArrowLeftCircle className="me-2" size={"1.4em"} />
          Regresar
        </Button>
      </div>

      <div className="col-4 offset-2">
        <Typography level={"h1"} text={text} />
      </div>
    </div>
  );
};

export default CreateHeader;
