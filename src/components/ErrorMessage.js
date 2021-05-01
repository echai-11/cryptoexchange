import React from "react";
import Grid from "@material-ui/core/Grid";
const ErrorMessage = () => {
  <Grid item xs={12}>
    <span className="error-message">
      There was an error fetching data. Please try refreshing the page!
    </span>
    <br />
    <span className="error-message">Thank you for your patience!</span>
  </Grid>;
};
export default ErrorMessage;
