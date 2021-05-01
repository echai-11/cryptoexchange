import React, { useState, useEffect } from "react";
import { Grid, Button } from "@material-ui/core";
import LoadingComponent from "../components/LoadingComponent";
import ErrorMessage from "../components/ErrorMessage";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import FacebookIcon from "@material-ui/icons/Facebook";
import RedditIcon from "@material-ui/icons/Reddit";
import TelegramIcon from "@material-ui/icons/Telegram";
import TwitterIcon from "@material-ui/icons/Twitter";
import MediaQuery from "react-responsive";

const CryptoInfoPage = () => {
  const [dataInfo, setDataInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const getId = () => {
    let urlString = window.location.href.split("?")[1].slice(2);
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
    return <ErrorMessage />;
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

          <Grid item xs={12} className="header">
            <img
              src={dataInfo.image}
              alt={`${dataInfo.name} logo`}
              className="logo-image"
            />
            <h1>{dataInfo.name}</h1>
          </Grid>
          <Grid item xs={12} className="body">
            <div>
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
              <div className="social-media-links">
                {dataInfo.facebook_url !== "" && (
                  <a
                    href={dataInfo.facebook_url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FacebookIcon />
                    <MediaQuery minWidth={601}>
                      <span>Facebook</span>
                    </MediaQuery>
                  </a>
                )}
                {dataInfo.reddit_url !== "" && (
                  <a
                    href={dataInfo.reddit_url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <RedditIcon />
                    <MediaQuery minWidth={601}>
                      <span>Reddit</span>
                    </MediaQuery>
                  </a>
                )}
                {dataInfo.telegram_url !== "" && (
                  <a
                    href={dataInfo.telegram_url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <TelegramIcon />
                    <MediaQuery minWidth={601}>
                      <span>Telegram</span>
                    </MediaQuery>
                  </a>
                )}
                {dataInfo.twitter_handle !== "" && (
                  <a
                    href={`https://twitter.com/${dataInfo.twitter_handle}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <TwitterIcon />
                    <MediaQuery minWidth={601}>
                      <span>Twitter</span>
                    </MediaQuery>
                  </a>
                )}

                <a
                  href={`https://twitter.com/${dataInfo.twitter_handle}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg
                    viewBox="0 0 40 40"
                    xmlns="http://www.w3.org/2000/svg"
                    id="slack_icon"
                  >
                    <title />
                    <g id="Slack">
                      <path d="M13,23.17a2.52,2.52,0,1,1-2.52-2.53H13Zm1.27,6.31a2.53,2.53,0,0,0,5,0V23.17a2.53,2.53,0,1,0-5,0Zm5-16.44V10.52A2.53,2.53,0,1,0,16.83,13Zm-8.84,1.27a2.53,2.53,0,0,0,0,5h6.31a2.53,2.53,0,1,0,0-5Zm16.44,5h2.52A2.53,2.53,0,1,0,27,16.83Zm-1.27-8.84a2.53,2.53,0,0,0-5.05,0v6.31a2.53,2.53,0,1,0,5.05,0ZM20.64,27v2.52A2.53,2.53,0,1,0,23.17,27Zm8.84-1.27a2.53,2.53,0,0,0,0-5.05H23.17a2.53,2.53,0,1,0,0,5.05Z" />
                    </g>
                  </svg>
                  <MediaQuery minWidth={601}>
                    <span>Slack</span>
                  </MediaQuery>
                </a>
              </div>
              <br />
            </div>
            <div className="description">
              <span>
                {dataInfo.description
                  ? dataInfo.description
                  : "No description here! "}
              </span>
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
