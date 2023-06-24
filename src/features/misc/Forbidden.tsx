import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Forbidden = () => {
  
  return (
    <Container fluid className="d-flex align-items-center justify-content-center vh-container-100">
      <div className="text-center">
        <h1 className="display-1 fw-bold">403</h1>
        <p className="fs-3">
          {" "}
          <span className="text-danger">Opps!</span> Access Forbidden.
        </p>
        <p className="lead">You don't have the proper permission to view this page.</p>
        <Link to="." className="btn btn-primary">
          Go Home
        </Link>
      </div>
    </Container>
  );
};
