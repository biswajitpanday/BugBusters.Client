import React from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { HelmetProvider } from "react-helmet-async";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@/lib/ReactQuery";
import { AuthLoader } from "@/lib/Auth";
//import { QueryClientProvider } from "react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { Container } from "react-bootstrap";
import { ExclamationTriangle } from "react-bootstrap-icons";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "@/components/elements/spinner";

export const ErrorFallback = () => {
  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center vh-100"
    >
      <div className="text-center">
        <ExclamationTriangle size={72} />
        <p className="fs-3">
          {" "}
          <span className="text-danger">Opps!</span> Something went wrong.
        </p>
        <p className="lead">Please Reload or try again later.</p>
        <Link to="." className="btn btn-primary">
          Reload
        </Link>
      </div>
    </Container>
  );
};

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense fallback={<Spinner />}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            {process.env.NODE_ENV === "development" && <ReactQueryDevtools />}
            <ToastContainer theme="dark" limit={5} />
            <AuthLoader renderLoading={() => <Spinner />}>
              {" "}
              {/* renderUnauthenticated={() => <AuthPage />} */}
              <Router>{children}</Router>
            </AuthLoader>
          </QueryClientProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
