import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Table from "./Table";
import LoadingComponent from "./LoadingComponent";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

const CryptoTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [dataLength, setDataLength] = useState(0);
  const fetchDataLength = async () => {
    await fetch("https://api.coingecko.com/api/v3/exchanges")
      .then((response) => response.json())
      .then((data) => {
        setDataLength(data.length / 10);
      })
      .catch((error) => {
        console.log(error);
        setData(null);
      });
  };
  const fetchData = async (pageNo) => {
    const url = `https://api.coingecko.com/api/v3/exchanges?per_page=10&page=${pageNo}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.log("Error");
        setData(null);
      });
    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    fetchDataLength();
    setPage(1);
  }, []);

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const columns = [
    {
      Header: "Name",
      id: 0,
      accessor: "name",
      Cell: (value) => {
        return (
          <div className="innerCell">
            <Link
              to={{
                pathname: "/crypto-info",
                search: `?n=${value.row.original.id}`,
              }}
            >
              <img
                src={value.row.original.image}
                alt={`${value.row.original.name} logo`}
                className="logo-image"
              />
              <span>{value.row.original.name}</span>
            </Link>
          </div>
        );
      },
    },
    {
      Header: "Country",
      id: 1,
      accessor: "country",
      Cell: (value) => {
        return (
          <div className="innerCell">
            <span>{value.row.original.country}</span>
          </div>
        );
      },
    },
    {
      Header: "URL",
      id: 2,
      accessor: "url",
      Cell: (value) => {
        return (
          <div className="innerCell">
            <a href={value.row.original.url} target="_blank" rel="noreferrer">
              {value.row.original.url}
            </a>
          </div>
        );
      },
    },
    {
      Header: "Trust Rank",
      id: 3,
      accessor: "trust_score_rank",
      Cell: (value) => {
        return (
          <div className="innerCell">
            <span>{value.row.original.trust_score_rank}</span>
          </div>
        );
      },
    },
  ];

  if (data === null) {
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
    <Grid item xs={12} className="cryptoTable">
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          <Table columns={columns} data={data} />
          <div className="pagination-data">
            <span>Showing 10 of {data.length * 10}</span>
          </div>
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={dataLength}
            initialPage={0}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={(page) => {
              let pageNo = page.selected + 1;
              setPage(pageNo);
            }}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        </>
      )}
    </Grid>
  );
};

export default CryptoTable;
