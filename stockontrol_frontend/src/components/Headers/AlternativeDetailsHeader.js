import React from "react";
import Button from "react-bootstrap/Button";
import {
  BsArrowLeftCircle,
  BsFillPencilFill,
  BsPlusCircle,
} from "react-icons/bs";
import Typography from "../../common/Typography/Typography";
import { Link } from "react-router-dom";

const AlternativeDetailsHeader = ({
  text,
  pathSearch,
  // pathCreate,
  onClick,
  backButtonName,
  // editButtonName,
  // createButtonName,
}) => {
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

        <div className="offset-3 col-3 ">
          <Typography level={"h1"} text={text} />
        </div>

        {/* <div className="col-2">
          <Button
            variant="secondary"
            size="lg"
            className="text-black border-dark"
            onClick={onClick}
          >
            {editButtonName}
            <BsFillPencilFill className="ms-2" size={"1.4em"} />
          </Button>
        </div> */}

        {/* <div className="col-2">
          <Link to={pathCreate}>
            <Button
              variant="secondary"
              size="lg"
              className="text-black border-dark"
            >
              {createButtonName}
              <BsPlusCircle className="ms-2 text-black " size={"1.4em"} />
            </Button>
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default AlternativeDetailsHeader;
