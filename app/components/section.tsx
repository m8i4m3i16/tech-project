"use client";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";

import { Chart as ChartJS, registerables } from "chart.js/auto";
import { Bar, Line } from "react-chartjs-2";
ChartJS.register(...registerables);

//UI樣式
const StyledContainer = styled("div")(({ theme }) => ({
  display: "flex",
  marginBottom: "400px",
}));

const StyledPrimary = styled("div")(({ theme }) => ({
  width: "75px",
  height: "35px",
  backgroundColor: `${theme.palette.primary.main}`,
  borderRadius: theme.shape.borderRadius,
  fontSize: "11.5px",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  top: "15px",
  left: "15px",
}));

//下拉選單
const StyledSelect = styled("select")(({ theme }) => ({
  width: "80px",
  height: "35px",
  backgroundColor: `${theme.palette.primary.main}`,
  borderRadius: theme.shape.borderRadius,
  fontSize: "11.5px",
  color: "white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  top: "15px",
  right: "15px",
  padding: "10px",
  //   appearance: "none", // 移除下拉箭頭
}));

//左側
const StyledSide = styled("div")(({ theme }) => ({
  marginRight: "40px",
}));

const StyledWrap = styled("div")(({ theme }) => ({
  marginTop: "10px",
}));

const StyledParagraph = styled("p")(({ theme, active }) => ({
  padding: "10px",
  fontSize: "14px",
  color: active ? theme.palette.primary.main : "#000",
  fontWeight: active ? 500 : 400,
  paddingLeft: "30px",
  borderLeft: active ? `3px solid ${theme.palette.primary.main}` : "none",
}));

//Section
const StyledSection = styled("div")(({ theme }) => ({}));

const SectionTop = styled("div")(({ theme }) => ({
  width: "700px",
  height: "50px",
  backgroundColor: "white",
  borderRadius: theme.shape.borderRadius,
  border: "1px solid lightgray",
  marginBottom: "10px",
  padding: "13px",
  color: "#000",
}));

const SectionGraph = styled("div")(({ theme }) => ({
  width: "700px",
  height: "500px",
  backgroundColor: "white",
  borderRadius: theme.shape.borderRadius,
  border: "1px solid lightgray",
  marginBottom: "10px",
}));

const SectionTable = styled("div")(({ theme }) => ({
  width: "700px",
  height: "240px",
  backgroundColor: "white",
  borderRadius: theme.shape.borderRadius,
  border: "1px solid lightgray",
  marginBottom: "10px",
  overflow: "auto",
}));

const StyledTdName = styled("div")(({ theme }) => ({
  width: "220px",
  fontWeight: "400",
  color: "#666666",
}));

const StyledTrValue = styled("tr")(({ theme }) => ({
  width: "180px",
  fontWeight: "200",
  color: "#666666",
  textAlign: "center",
}));

//Graph
const data = {
  labels: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023],
  datasets: [
    {
      type: "line",
      label: "月均價",
      data: [400, 250, 300, 750, 500, 920, 680, 800],
      fill: false,
      backgroundColor: "rgba(178, 34, 34, 1)",
      borderColor: "rgba(178, 34, 34)",
      tension: 0.1,
      pointRadius: 0.5,
    },
    {
      type: "bar",
      label: "每月營收",
      data: [200, 300, 400, 200, 600, 800, 450, 500],
      backgroundColor: "rgba(250, 192, 19, 0.6)",
      borderColor: "rgba(250, 192, 19)",
      borderWidth: 1,
      barThickness: 10,
    },
  ],
};

const options = {
  plugins: {
    title: {
      display: true,
      text: "千元",
      align: "start",
    },
  },
};

const Section = ({ stockIds, stockNames, searchResults }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [foundStockName, setFoundStockName] = useState(null);
  const [foundStockId, setfoundStockId] = useState(null);
  const [monthlyStockData, setMonthlyStockData] = useState([]);

  //篩選----
  const [timeRange, setTimeRange] = useState("5");
  const [chartData, setChartData] = useState(data); //存儲圖表數據

  //處理時間範圍變化的函數
  const handleTimeRangeChange = (value) => {
    setTimeRange(value);
  };

  // 根據所選擇的時間範圍更新圖表數據
  useEffect(() => {
    // 根據timeRange更新圖表數據
    // 這裡可以根據不同的時間範圍從後端獲取不同的數據，或者根據已有數據進行篩選
    // 示範：根據timeRange從data中篩選相應的數據
    let newData = {};
    switch (timeRange) {
      case "3":
        newData = {
          labels: [2021, 2022, 2023],
          datasets: data.datasets,
        };
        break;
      case "5":
        newData = {
          labels: [2019, 2020, 2021, 2022, 2023],
          datasets: data.datasets,
        };
        break;
      case "8":
        newData = {
          labels: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023],
          datasets: data.datasets,
        };
        break;
      default:
        newData = data;
        break;
    }
    setChartData(newData); //更新圖表數據
  }, [timeRange]);
  //篩選----

  const handleClick = (index) => {
    setActiveIndex(index); //讓side-bar畫面初始為每月營收
    // setActiveIndex(activeIndex === index ? null : index);
  };

  //串接每月營收API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRlIjoiMjAyNC0wNC0xNSAyMTo1MDowMyIsInVzZXJfaWQiOiJjaGVyaXNoeW8iLCJpcCI6IjExNi4yNDEuMjEzLjE1OSJ9.lQvheRS_nKp6NruDqGymlBY4l8MSP3GWgdiMD4F9-30";
        const parameter = {
          dataset: "TaiwanStockMonthRevenue",
          data_id: 2330,
          start_date: "2016-01-01",
          end: "2023-12-31",
        };
        const response = await fetch(
          `https://api.finmindtrade.com/api/v4/data?dataset=${parameter.dataset}&start_date=${parameter.start_date}&end=${parameter.end}&data_id=${parameter.data_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const jsonData = await response.json();
        setMonthlyStockData(jsonData.data || []);
      } catch (error) {
        console.error("Error fetching stock data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (searchResults.length > 0 && stockIds.length > 0) {
      const foundIndex = stockIds.indexOf(searchResults[0]);
      const foundStockId = searchResults;
      if (foundIndex !== -1 && foundStockId !== -1) {
        setFoundStockName(stockNames[foundIndex]);
        setfoundStockId(foundStockId);
      } else {
        setFoundStockName(null);
        setfoundStockId(null);
      }
    }
  }, [searchResults, stockIds, stockNames]);

  //計算單月營收年增率
  const calculateRevenueGrowthRate = (monthlyStockData, currentIndex) => {
    //確定有數據進行計算
    if (currentIndex <= 0 || currentIndex >= monthlyStockData.length) {
      return 0;
    }

    const currentMonthRevenue = monthlyStockData[currentIndex].revenue; //當前月份營收
    const previousMonthRevenue = monthlyStockData[currentIndex - 1].revenue; //前一個月份營收

    if (previousMonthRevenue === 0) {
      return 0;
    }

    //計算單月營收年增率（套公式）
    const growthRate = (currentMonthRevenue / previousMonthRevenue - 1) * 100;

    return growthRate.toFixed(2); //四捨五入取到第二位
  };

  return (
    <StyledContainer>
      <StyledSide>
        <StyledWrap onClick={() => handleClick(0)}>
          <StyledParagraph active={activeIndex === 0}>每月營收</StyledParagraph>
        </StyledWrap>
        <StyledWrap onClick={() => handleClick(1)}>
          <StyledParagraph active={activeIndex === 1}>每股盈餘</StyledParagraph>
        </StyledWrap>
        <StyledWrap onClick={() => handleClick(2)}>
          <StyledParagraph active={activeIndex === 2}>每股淨值</StyledParagraph>
        </StyledWrap>
        <StyledWrap onClick={() => handleClick(3)}>
          <StyledParagraph active={activeIndex === 3}>損益表</StyledParagraph>
        </StyledWrap>
        <StyledWrap onClick={() => handleClick(4)}>
          <StyledParagraph active={activeIndex === 4}>總資產</StyledParagraph>
        </StyledWrap>
        <StyledWrap onClick={() => handleClick(5)}>
          <StyledParagraph active={activeIndex === 5}>
            負債和股東權益
          </StyledParagraph>
        </StyledWrap>
        <StyledWrap onClick={() => handleClick(6)}>
          <StyledParagraph active={activeIndex === 6}>
            現金流量表
          </StyledParagraph>
        </StyledWrap>
        <StyledWrap onClick={() => handleClick(7)}>
          <StyledParagraph active={activeIndex === 7}>股利政策</StyledParagraph>
        </StyledWrap>
        <StyledWrap onClick={() => handleClick(8)}>
          <StyledParagraph active={activeIndex === 8}>電子書</StyledParagraph>
        </StyledWrap>
      </StyledSide>
      <StyledSection>
        {/* 顯示當前的股票名稱+代碼 */}
        <SectionTop>
          <p>
            {foundStockName ? `${foundStockName}（${foundStockId[0]}）` : ""}
          </p>
        </SectionTop>

        {/* 股票圖表 */}
        <SectionGraph>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <StyledPrimary>每月營收</StyledPrimary>
            {/* 篩選條件 */}
            <StyledSelect
              onChange={(e) => handleTimeRangeChange(e.target.value)}
            >
              <option value="3">近3年</option>
              <option value="5" selected>
                近5年
              </option>
              <option value="8">近8年</option>
            </StyledSelect>
          </div>

          {/* 圖表 */}
          <div style={{ padding: "20px" }}>
            <Bar data={chartData} options={options} />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <label style={{ marginRight: "10px" }}>
              <input
                style={{ marginRight: "3px" }}
                type="checkbox"
                name="revenue"
              />
              每月營收
            </label>
            <label>
              <input
                style={{ marginRight: "3px" }}
                type="checkbox"
                name="averagePrice"
              />
              月均價
            </label>
          </div>
        </SectionGraph>

        {/* 表格 */}
        <SectionTable>
          <StyledPrimary>詳細數據</StyledPrimary>
          <Table
            striped
            bordered
            style={{ marginTop: "35px", display: "flex" }}
          >
            <tbody style={{ marginRight: "5px" }}>
              <tr>
                <StyledTdName>年度月份</StyledTdName>
              </tr>

              <tr>
                <StyledTdName
                  style={{
                    borderTop: "1px solid lightgray",
                    borderBottom: "1px solid lightgray",
                  }}
                >
                  每月營收
                </StyledTdName>
              </tr>
              <tr>
                <StyledTdName>單月營收年增率（%）</StyledTdName>
              </tr>
            </tbody>

            <tbody>
              {/* map月份 */}
              <tr style={{ display: "flex", fontWeight: "600" }}>
                {monthlyStockData.map((monthData, index) => (
                  <StyledTrValue key={index}>
                    {monthData.revenue_year}
                    {monthData.revenue_month.toString().padStart(2, "0")}
                  </StyledTrValue>
                ))}
              </tr>

              {/* map營收 */}
              <tr style={{ display: "flex" }}>
                {monthlyStockData.map((monthData, index) => (
                  <StyledTrValue key={index}>
                    {monthData.revenue.toLocaleString()}
                  </StyledTrValue>
                ))}
              </tr>

              {/* map單月營收年增率（%） */}
              <tr style={{ display: "flex" }}>
                {monthlyStockData.map((monthData, index) => (
                  <StyledTrValue key={index}>
                    {calculateRevenueGrowthRate(monthlyStockData, index)}
                  </StyledTrValue>
                ))}
              </tr>
            </tbody>
          </Table>
        </SectionTable>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            color: "#000",
            fontSize: "11px",
            fontWeight: "200",
          }}
        >
          <div>
            <p
              style={{
                display: "flex",
                justifyContent: "flex-end",
                margin: "0",
              }}
            >
              圖表單位：千元，數據來自公開資訊觀測站
            </p>
            <p>網頁圖表歡迎轉貼引用，請註明出處為財報狗</p>
          </div>
        </div>
      </StyledSection>
    </StyledContainer>
  );
};

export default Section;
