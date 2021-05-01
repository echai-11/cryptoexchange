import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const LoadingComponent = () => {
  return (
    <div className="loading-spinner-wrapper">
      <CircularProgress />
    </div>
  );
};
export default LoadingComponent;
