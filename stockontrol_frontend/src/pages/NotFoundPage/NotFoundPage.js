import { Button } from "react-bootstrap";
import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="text-center">
      <div className="mb-3">404 Not Found</div>

      <Link to="/">
        <Button>Home</Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
