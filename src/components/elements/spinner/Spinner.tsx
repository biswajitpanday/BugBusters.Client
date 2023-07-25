import { PuffLoader, ScaleLoader } from "react-spinners";
import "./Spinner.style.scss";

const types = {
  page: "page",
  component: "component",
};

export type SpinnerProps  = {
  type?: keyof typeof types;
  size?: number | string;
  color?: string;
};

export const Spinner = ({
  type = "page",
  size = 60,
  color = '#8e44ad'
}: SpinnerProps) => {
  console.log("Spinner Component Loaded...");
  return (
    <div className="spinner d-flex align-items-center justify-content-center vh-100">
      {type === types.page ? (
        <PuffLoader className="loader-container" color={color} loading size={size} speedMultiplier={2} placeholder="Loading..." />
      ) : (
        <ScaleLoader color={color} placeholder="Loading..." />
      )}
    </div>
  );
};
