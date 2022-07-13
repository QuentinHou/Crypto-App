import React, { useState } from "react";
import { useSelector } from "react-redux/es/exports";
import TableLine from "./TableLine";
import TopArrow from "./TopArrow";

const Table = ({ coinsData }) => {
  const [rangeNumber, setRangeNumber] = useState(100);
  const [orderBy, setOrderBy] = useState("");
  const showStable = useSelector((state) => state.stableReducer);
  const showList = useSelector((state) => state.listReducer);
  const tableHeader = [
    "Prix",
    "MarketCap",
    "Volume",
    "1h",
    "1d",
    "1w",
    "1m",
    "6m",
    "1y",
    "ATH",
  ];

  const excludeCoin = (coin) => {
    if (
      coin === "usdt" ||
      coin === "usdc" ||
      coin === "busd" ||
      coin === "dai" ||
      coin === "mim" ||
      coin === "tusd" ||
      coin === "usdp" ||
      coin === "usdn" ||
      coin === "fei" ||
      coin === "tribe" ||
      coin === "gusd" ||
      coin === "frax" ||
      coin === "lusd" ||
      coin === "husd" ||
      coin === "ousd" ||
      coin === "xsgd" ||
      coin === "usdx" ||
      coin === "eurs"
    ) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <div className="table-container">
      <ul className="table-header">
        <div className="range-container">
          <span>
            Top{" "}
            <input
              type="text"
              value={rangeNumber}
              onChange={(e) => setRangeNumber(e.target.value)}
            />
          </span>
          <input
            type="range"
            min="1"
            max="250"
            value={rangeNumber}
            onChange={(e) => setRangeNumber(e.target.value)}
          />
          <TopArrow />
        </div>
        {tableHeader.map((elem) => (
          <li key={elem}>
            <input
              type="radio"
              name="headerElem"
              id={elem}
              defaultChecked={
                elem === orderBy || elem === orderBy + "reverse" ? true : false
              }
              onClick={() => {
                if (orderBy === elem) {
                  setOrderBy(elem + "reverse");
                } else {
                  setOrderBy(elem);
                }
              }}
            />
            <label htmlFor={elem}> {elem}</label>
          </li>
        ))}
      </ul>
      {coinsData &&
        coinsData
          .slice(0, rangeNumber)
          .filter((coin) => {
            if (showList) {
              let list = window.localStorage.coinList.split(",");
              if (list.includes(coin.id)) {
                return coin;
              }
            } else {
              return coin;
            }
          })
          .filter((coin) => {
            if (showStable) {
              return coin;
            } else {
              if (excludeCoin(coin.symbol)) {
                return coin;
              }
            }
          })
          .sort((a, b) => {
            switch (orderBy) {
              case "Prix":
                return b.current_price - a.current_price;
              case "Prixreverse":
                return a.current_price - b.current_price;
              case "MarketCap":
                return b.market_cap - a.market_cap;
              case "MarketCapreverse":
                return a.market_cap - b.market_cap;
              case "Volume":
                return b.total_volume - a.total_volume;
              case "Volumereverse":
                return a.total_volume - b.total_volume;
              case "1h":
                return (
                  b.price_change_percentage_1h_in_currency -
                  a.price_change_percentage_1h_in_currency
                );
              case "1hreverse":
                return (
                  a.price_change_percentage_1h_in_currency -
                  b.price_change_percentage_1h_in_currency
                );
              case "1d":
                return (
                  b.price_change_percentage_24h_in_currency -
                  a.price_change_percentage_24h_in_currency
                );
              case "1dreverse":
                return (
                  a.price_change_percentage_24h_in_currency -
                  b.price_change_percentage_24h_in_currency
                );
              case "1w":
                return (
                  b.price_change_percentage_7d_in_currency -
                  a.price_change_percentage_7d_in_currency
                );
              case "1wreverse":
                return (
                  a.price_change_percentage_7d_in_currency -
                  b.price_change_percentage_7d_in_currency
                );
              case "1m":
                return (
                  b.price_change_percentage_30d_in_currency -
                  a.price_change_percentage_30d_in_currency
                );
              case "1mreverse":
                return (
                  a.price_change_percentage_30d_in_currency -
                  b.price_change_percentage_30d_in_currency
                );
              case "6m":
                return (
                  b.price_change_percentage_200d_in_currency -
                  a.price_change_percentage_200d_in_currency
                );
              case "6mreverse":
                return (
                  a.price_change_percentage_200d_in_currency -
                  b.price_change_percentage_200d_in_currency
                );
              case "1y":
                return (
                  b.price_change_percentage_1y_in_currency -
                  a.price_change_percentage_1y_in_currency
                );
              case "1yreverse":
                return (
                  a.price_change_percentage_1y_in_currency -
                  b.price_change_percentage_1y_in_currency
                );
            }
          })
          .map((coin, index) => (
            <TableLine coin={coin} index={index} key={index} />
          ))}
    </div>
  );
};

export default Table;
