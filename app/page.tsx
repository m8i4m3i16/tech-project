"use client";
import { useEffect, useState } from "react";

import SearchBar from "./components/search-bar";
import SideBar from "./components/side-bar";
import Section from "./components/section";

export default function Home() {
  const [apiData, setApiData] = useState(null);
  const [stockNames, setStockNames] = useState([]);
  const [stockIds, setStockIds] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  //更新搜尋結果狀態
  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.finmindtrade.com/api/v4/data?dataset=TaiwanStockInfo"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        setApiData(jsonData);

        if (jsonData && jsonData.data) {
          const names = jsonData.data.map((i) => i.stock_name);
          const ids = jsonData.data.map((i) => i.stock_id);
          setStockNames(names);
          setStockIds(ids);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <SearchBar
        stockIds={stockIds}
        stockNames={stockNames}
        handleSearchResults={handleSearchResults}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <SideBar style={{ flexDirection: "column" }} />
        {/* <Section stockIds={stockIds} stockNames={stockNames} /> */}
        <Section
          stockIds={searchResults.length > 0 ? searchResults : stockIds} // 使用搜尋結果或原始股票資料
          stockNames={searchResults.length > 0 ? searchResults : stockNames}
        />
      </div>
    </>
  );
}
