import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export type ErrorComponentProps = {
  message?: string | unknown;
};

export const ErrorComponent = ({ message = "" }: ErrorComponentProps) => {
  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center vh-container-100"
    >
      <div className="text-center">
        <h1 className="display-1 fw-bold">Error</h1>
        <p className="fs-3">
          {" "}
          {message !== "" ? (
            <>
              <span className="text-danger">Oops!</span> {message}
            </>
          ) : (
            <>
              <span className="text-danger">Oops!</span> Something went wrong..
            </>
          )}
        </p>
        <p className="lead">Please try again later.</p>
        <Link to="." className="btn btn-primary">
          Go Home
        </Link>
      </div>
    </Container>
  );
};
