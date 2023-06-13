import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { HelmetProvider } from "react-helmet-async";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@/lib/ReactQuery";
import { Spinner } from "@/components/elements/spinner";
import { AuthLoader } from "@/lib/Auth";
import { QueryClientProvider } from "@tanstack/react-query";
import { Button, Container } from "react-bootstrap";
import { ExclamationTriangle } from "react-bootstrap-icons";
import AuthPage from "@/pages/auth/AuthPage";

const ErrorFallback = () => {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <Container className="text-center">
        <ExclamationTriangle size={72} />
        <h2 className="text-lg font-semibold mt-3">
          <strong>Oops!</strong>
        </h2>
        <h3 className="">Something went wrong.</h3>
        <Button
          type="button"
          variant="info"
          className="mt-4 primary"
          onClick={() => window.location.assign(window.location.origin)}
        >
          Refresh
        </Button>
      </Container>
    </div>
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
            {process.env.NODE_ENV !== "test" && <ReactQueryDevtools />}
            <Router>
              <AuthLoader
                renderLoading={() => <Spinner />}
                renderUnauthenticated={() => <AuthPage />}
              >
                <Container className="p-3">{children}</Container>
              </AuthLoader>
            </Router>
          </QueryClientProvider>
        </HelmetProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
