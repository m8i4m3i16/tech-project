"use client";
import { useEffect, useState } from "react";

import SearchBar from "./components/search-bar";
import SideBar from "./components/side-bar";
import Section from "./components/section";

export default function Home() {
  const [taiwanStockData, setTaiwanStockData] = useState([]);
  const [usStockData, setUsStockData] = useState([]);
  const [stockNames, setStockNames] = useState([]);
  const [stockIds, setStockIds] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  //更新搜尋結果狀態
  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

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
          setStockNames(names);
          setStockIds(ids);
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
          setStockNames(names);
          setStockIds(ids);
        }
      } catch (error) {
        console.error("Error fetching US stock data:", error);
      }
    };

    fetchTaiwanStockData();
    fetchUsStockData();
  }, []);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         "https://api.finmindtrade.com/api/v4/data?dataset=TaiwanStockInfo"
  //       );
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch data");
  //       }
  //       const jsonData = await response.json();
  //       setApiData(jsonData);

  //       if (jsonData && jsonData.data) {
  //         const names = jsonData.data.map((i) => i.stock_name);
  //         const ids = jsonData.data.map((i) => i.stock_id);
  //         setStockNames(names);
  //         setStockIds(ids);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  //搜尋結果中的股票名稱或股票代碼，轉換成對應的股票代碼和股票名稱
  const getStockInfoFromResults = () => {
    const filteredIds = [];
    const filteredNames = [];

    searchResults.forEach((result) => {
      //檢查結果是否為股票代碼
      const isId = stockIds.includes(result);
      if (isId) {
        filteredIds.push(result);
      } else {
        //如果不是股票代碼，則檢查是否為股票名稱
        const index = stockNames.indexOf(result);
        if (index !== -1) {
          //如果找到對應的股票名稱，則將其對應的股票代碼添加到 filteredIds 陣列中
          filteredIds.push(stockIds[index]);
          filteredNames.push(result);
        }
      }
    });
    return { stockIds: filteredIds, stockNames: filteredNames };
  };

  return (
    <body style={{ backgroundColor: "#f2f2f2" }}>
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
        <Section
          stockIds={stockIds}
          stockNames={stockNames}
          searchResults={searchResults}
        />
      </div>
    </body>
  );
}
