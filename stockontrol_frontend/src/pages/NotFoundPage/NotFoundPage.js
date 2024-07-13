import { Button } from "react-bootstrap";
import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      404 Not Found
      <Link to="/">
        <Button>Home</Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
