import React, { useState, useEffect } from "react";
import { Grid, Button } from "@material-ui/core";
import LoadingComponent from "../components/LoadingComponent";

//include back to main page button
const CryptoInfoPage = () => {
  const [dataInfo, setDataInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const getId = () => {
    let urlString = window.location.href.split("?")[1].slice(2);
    console.log(urlString);
    return urlString;
  };
  const id = getId();
  const getData = async (id) => {
    const url = `https://api.coingecko.com/api/v3/exchanges/${id}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setDataInfo(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setDataInfo(null);
        setLoading(false);
      });
  };
  useEffect(() => {
    setLoading(true);
    getData(id);
  }, [id]);

  if (dataInfo === null) {
    return (
      <Grid item xs={12}>
        <span>
          There was an error fetching data. Please try refreshing the page!
        </span>
        <br />
        <span>Thank you for your patience!</span>
      </Grid>
    );
  }

  return (
    <Grid container>
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          <Button>Back to Home</Button>

          <Grid xs={12}>
            <img src={dataInfo.url} alt={`${dataInfo.name} logo`} />
            <h1>{dataInfo.name}</h1>
          </Grid>
          <Grid xs={12}>
            <span>Country:</span> <span>{dataInfo.country}</span>
            <br />
            <span>Trust Rank:</span> <span>{dataInfo.trust_score_rank}</span>
            <br />
            <span>Year Established:</span>{" "}
            <span>{dataInfo.year_established}</span>
            <br />
            <span>Social Media Links:</span>
            <br />
            <span>{dataInfo.description}</span>
          </Grid>
          <Button>Back to Home</Button>
        </>
      )}
    </Grid>
  );
};
export default CryptoInfoPage;
