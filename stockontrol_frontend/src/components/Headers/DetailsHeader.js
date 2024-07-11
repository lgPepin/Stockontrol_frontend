import React from "react";
import Button from "react-bootstrap/Button";
import { BsPlusCircle } from "react-icons/bs";
import { BsArrowLeftCircle } from "react-icons/bs";
import { BsFillPencilFill } from "react-icons/bs";
import Typography from "../../common/Typography/Typography";

const DetailsHeader = ({ text }) => {
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

      <div className="col-2">
        <Button
          variant="secondary"
          size="lg"
          className="text-black border-dark"
        >
          Editar Producto
          <BsFillPencilFill className="ms-2" size={"1.4em"} />
        </Button>
      </div>

      <div className="col-2">
        <Button
          variant="secondary"
          size="lg"
          className="text-black border-dark"
        >
          Crear Producto
          <BsPlusCircle className="ms-2 text-black " size={"1.4em"} />
        </Button>
      </div>
    </div>
  );
};

export default DetailsHeader;
