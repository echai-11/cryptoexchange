import React from "react";
import { Grid } from "@material-ui/core";
import CryptoTable from "../components/CryptoTable";
const HomePage = (props) => {
  return (
    <Grid container>
      <h1>Directory of Cryptocurrency Exchanges</h1>
      <CryptoTable />
    </Grid>
  );
};

export default HomePage;
