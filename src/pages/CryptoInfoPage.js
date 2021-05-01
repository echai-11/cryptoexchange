import React, { useState, useEffect } from "react";
import { Grid, Button } from "@material-ui/core";
import LoadingComponent from "../components/LoadingComponent";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";

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
    <Grid container className="cryptoInfoPage">
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          <Link
            to={{
              pathname: "/",
              search: "",
            }}
            className="back-button-link"
          >
            <KeyboardBackspaceIcon /> <span>Back</span>
          </Link>

          <Grid xs={12} className="header">
            <img
              src={dataInfo.image}
              alt={`${dataInfo.name} logo`}
              className="logo-image"
            />
            <h1>{dataInfo.name}</h1>
          </Grid>
          <Grid xs={12}>
            <span className="title">Country:</span>{" "}
            <span>{dataInfo.country}</span>
            <br />
            <span className="title">Trust Rank:</span>{" "}
            <span>{dataInfo.trust_score_rank}</span>
            <br />
            <span className="title">Year Established:</span>{" "}
            <span>{dataInfo.year_established}</span>
            <br />
            <span className="title">Social Media Links:</span>
            <br />
            <div className="description">
              <span>{dataInfo.description}</span>
            </div>
          </Grid>
          <Button className="back-button" variant="contained">
            <Link
              to={{
                pathname: "/",
                search: "",
              }}
            >
              <HomeIcon />
              <span>Go Back Home</span>
            </Link>
          </Button>
        </>
      )}
    </Grid>
  );
};
export default CryptoInfoPage;
