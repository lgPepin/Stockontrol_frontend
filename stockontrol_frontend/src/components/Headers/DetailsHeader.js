import React from "react";
import Button from "react-bootstrap/Button";
import {
  BsArrowLeftCircle,
  BsFillPencilFill,
  BsPlusCircle,
} from "react-icons/bs";
import Typography from "../../common/Typography/Typography";
import { Link } from "react-router-dom";

const DetailsHeader = ({ text, pathSearch, pathCreate }) => {
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

        <div className="col-2">
          <Link to={pathCreate}>
            <Button
              variant="secondary"
              size="lg"
              className="text-black border-dark"
            >
              Editar Producto
              <BsFillPencilFill className="ms-2" size={"1.4em"} />
            </Button>
          </Link>
        </div>

        <div className="col-2">
          <Link to={pathCreate}>
            <Button
              variant="secondary"
              size="lg"
              className="text-black border-dark"
            >
              Crear Producto
              <BsPlusCircle className="ms-2 text-black " size={"1.4em"} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DetailsHeader;
