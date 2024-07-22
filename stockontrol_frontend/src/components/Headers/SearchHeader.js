import React from "react";
import Button from "react-bootstrap/Button";
import { BsPlusCircle } from "react-icons/bs";
import Typography from "../../common/Typography/Typography";
import { Link } from "react-router-dom";

const SearchHeader = ({ text, pathCreate }) => {
  return (
    <div className="p-4 bg-warning">
      <div className="row">
        <div className="offset-5 col-3 ">
          <Typography level={"h1"} text={text} />
        </div>
        <div className="offset-2 col-2">
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

export default SearchHeader;
// <div className="d-flex justify-content-between p-4 bg-primary text-white">
