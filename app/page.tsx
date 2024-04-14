"use client";
import { useEffect, useState } from "react";

import SearchBar from "./components/search-bar";
import SideBar from "./components/side-bar";
import Section from "./components/section";

export default function Home() {
  const [taiwanStockData, setTaiwanStockData] = useState([]);
  const [usStockData, setUsStockData] = useState([]);
  const [taiwanStockNames, setTaiwanStockNames] = useState([]);
  const [taiwanStockIds, setTaiwanStockIds] = useState([]);
  const [usStockNames, setUsStockNames] = useState([]);
  const [usStockIds, setUsStockIds] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchTaiwanStockData = async () => {
      try {
        const response = await fetch(
          "https://api.finmindtrade.com/api/v4/data?dataset=TaiwanStockInfo"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch Taiwan stock data");
        }
        const jsonData = await response.json();
        setTaiwanStockData(jsonData.data || []);

        if (jsonData && jsonData.data) {
          const names = jsonData.data.map((i) => i.stock_name);
          const ids = jsonData.data.map((i) => i.stock_id);
          setTaiwanStockNames(names);
          setTaiwanStockIds(ids);
        }
      } catch (error) {
        console.error("Error fetching Taiwan stock data:", error);
      }
    };

    const fetchUsStockData = async () => {
      try {
        const response = await fetch(
          "https://api.finmindtrade.com/api/v4/data?dataset=USStockInfo"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch US stock data");
        }
        const jsonData = await response.json();
        setUsStockData(jsonData.data || []);

        if (jsonData && jsonData.data) {
          const names = jsonData.data.map((i) => i.stock_name);
          const ids = jsonData.data.map((i) => i.stock_id);
          setUsStockNames(names);
          setUsStockIds(ids);
        }
      } catch (error) {
        console.error("Error fetching US stock data:", error);
      }
    };

    fetchTaiwanStockData();
    fetchUsStockData();
  }, []);

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  const getStockInfoFromResults = () => {
    const filteredIds = [];
    const filteredNames = [];

    searchResults.forEach((result) => {
      const isId =
        taiwanStockIds.includes(result) || usStockIds.includes(result);
      if (isId) {
        filteredIds.push(result);
      } else {
        const index = taiwanStockNames.indexOf(result);
        if (index !== -1) {
          filteredIds.push(taiwanStockIds[index]);
          filteredNames.push(result);
        } else {
          const usIndex = usStockNames.indexOf(result);
          if (usIndex !== -1) {
            filteredIds.push(usStockIds[usIndex]);
            filteredNames.push(result);
          }
        }
      }
    });
    return { stockIds: filteredIds, stockNames: filteredNames };
  };

  const { stockIds, stockNames } = getStockInfoFromResults();

  return (
    <body style={{ backgroundColor: "#f2f2f2" }}>
      <SearchBar
        stockIds={[...taiwanStockIds, ...usStockIds]}
        stockNames={[...taiwanStockNames, ...usStockNames]}
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
        <Section
          stockIds={[...taiwanStockIds, ...usStockIds]}
          stockNames={[...taiwanStockNames, ...usStockNames]}
          searchResults={searchResults}
        />
      </div>
    </body>
  );
}
