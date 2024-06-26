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

const Section = ({ stockIds, stockNames, searchResults }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [foundStockName, setFoundStockName] = useState(null);
  const [foundStockId, setfoundStockId] = useState(null);
  const [monthlyStockData, setMonthlyStockData] = useState([]);

  const monthlyLabels = monthlyStockData.map((monthData) => {
    if (monthData && monthData.revenue_year && monthData.revenue_month) {
      return `${monthData.revenue_year}${monthData.revenue_month
        .toString()
        .padStart(2, "0")}`;
    }
    return "";
  });

  //計算股票月均價
  const averagePriceData = monthlyStockData.map((monthData) => {
    const totalRevenue = monthData.revenue; //月收
    const tradingDays = 20; //假設每月交易天數為20
    const averagePrice = totalRevenue / tradingDays; //月均價格
    return averagePrice;
  });

  //Graph
  const data = {
    labels: monthlyStockData.map((monthData) => monthData.revenue_year),
    datasets: [
      {
        type: "line",
        label: "月均價",
        data: averagePriceData,
        backgroundColor: "rgba(178, 34, 34, 1)",
        borderColor: "rgba(178, 34, 34)",
        tension: 0.1,
        pointRadius: 0.5,
      },
      {
        type: "bar",
        label: "每月營收",
        data: monthlyStockData.map((monthData) => monthData.revenue),
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

  //篩選
  const [timeRange, setTimeRange] = useState("5");
  const [chartData, setChartData] = useState(data); //存儲圖表數據

  //處理時間範圍變化的函數
  const handleTimeRangeChange = (value) => {
    setTimeRange(value);
  };

  useEffect(() => {
    let newData = {};
    const currentYear = new Date().getFullYear();

    switch (timeRange) {
      case "3":
        newData = {
          labels: [currentYear - 2, currentYear - 1, currentYear],
          datasets: data.datasets,
        };
        break;
      case "5":
        newData = {
          labels: [
            currentYear - 4,
            currentYear - 3,
            currentYear - 2,
            currentYear - 1,
            currentYear,
          ],
          datasets: data.datasets,
        };
        break;
      case "8":
        newData = {
          labels: [
            currentYear - 7,
            currentYear - 6,
            currentYear - 5,
            currentYear - 4,
            currentYear - 3,
            currentYear - 2,
            currentYear - 1,
            currentYear,
          ],
          datasets: data.datasets,
        };
        break;
      default:
        newData = data;
        break;
    }
    setChartData(newData);
  }, [timeRange]);

  const handleClick = (index) => {
    setActiveIndex(index); //讓side-bar畫面初始為每月營收
    // setActiveIndex(activeIndex === index ? null : index);
  };

  //串接每月營收API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const axiosConfig = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
        }

        const parameter = {
          dataset: "TaiwanStockMonthRevenue",
          data_id: 2330,
          start_date: "2016-01-01",
          end: "2023-12-31",
        };
        const response = await fetch(
          `https://api.finmindtrade.com/api/v4/data?dataset=${parameter.dataset}&start_date=${parameter.start_date}&end=${parameter.end}&data_id=${parameter.data_id}`
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
            {foundStockName ? (
              <>
                <Bar data={data} options={options} />
              </>
            ) : (
              <Bar data={chartData} options={options} />
            )}
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
                {foundStockName &&
                Array.isArray(monthlyStockData) &&
                monthlyStockData.length > 0 ? (
                  <>
                    {monthlyStockData.map((monthData, index) => (
                      <StyledTrValue key={index}>
                        {monthData.revenue_year}
                        {monthData.revenue_month.toString().padStart(2, "0")}
                      </StyledTrValue>
                    ))}
                  </>
                ) : null}
              </tr>

              {/* map營收 */}
              <tr style={{ display: "flex" }}>
                {foundStockName &&
                Array.isArray(monthlyStockData) &&
                monthlyStockData.length > 0 ? (
                  <>
                    {monthlyStockData.map((monthData, index) => (
                      <StyledTrValue key={index}>
                        {monthData.revenue.toLocaleString()}
                      </StyledTrValue>
                    ))}
                  </>
                ) : null}
              </tr>

              {/* map單月營收年增率（%） */}
              <tr style={{ display: "flex" }}>
                {foundStockName &&
                Array.isArray(monthlyStockData) &&
                monthlyStockData.length > 0 ? (
                  <>
                    {monthlyStockData.map((monthData, index) => (
                      <StyledTrValue key={index}>
                        {calculateRevenueGrowthRate(monthlyStockData, index)}
                      </StyledTrValue>
                    ))}
                  </>
                ) : null}
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
