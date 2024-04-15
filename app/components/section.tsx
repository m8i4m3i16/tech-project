"use client";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Chart as chartJS } from "chart.js/auto";
import { Bar, Line } from "react-chartjs-2";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import { yellow } from "@mui/material/colors";

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
  marginRight: "20px",
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
  display: "flex",
  justifyContent: "space-between",
  width: "700px",
  height: "500px",
  backgroundColor: "white",
  borderRadius: theme.shape.borderRadius,
  border: "1px solid lightgray",
  marginBottom: "10px",
}));

const SectionTable = styled("div")(({ theme }) => ({
  width: "700px",
  height: "200px",
  backgroundColor: "white",
  borderRadius: theme.shape.borderRadius,
  border: "1px solid lightgray",
  marginBottom: "10px",
}));

const StyledTdName = styled("td")(({ theme }) => ({
  width: "220px",
  fontWeight: "400",
  color: "#666666",
}));

const StyledTdValue = styled("td")(({ theme }) => ({
  width: "140px",
  fontWeight: "200",
  color: "#666666",
  textAlign: "center",
}));

//Graph
const data = {
  labels: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023],
  datasets: [
    {
      type: "bar",
      label: "每月營收",
      data: [200, 300, 400, 200, 600, 800, 450, 500],
      backgroundColor: "rgba(250, 192, 19, 0.6)",
      borderColor: "rgba(250, 192, 19)",
      borderWidth: 2,
    },
    {
      type: "line",
      label: "月均價",
      data: [100, 200, 300, 400, 500, 600, 700, 800],
      fill: false,
      borderColor: "rgba(250, 99, 132, 1)",
      tension: 0.7,
    },
  ],
};

const options = {
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: "千元",
      },
    },
  },
};

const Section = ({ stockIds, stockNames, searchResults }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [foundStockName, setFoundStockName] = useState(null);
  const [foundStockId, setfoundStockId] = useState(null);
  const [monthlyStockData, setMonthlyStockData] = useState([]);

  const handleClick = (index) => {
    setActiveIndex(index); //讓畫面初始為0
    // setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRlIjoiMjAyNC0wNC0xNCAwOToxODo0MyIsInVzZXJfaWQiOiJjaGVyaXNoeW8iLCJpcCI6IjExNi4yNDEuMjEzLjE1OSJ9.K8mb247sGALJthXOhcgkVtWPI_Yx-d_ggi87pfwVieE";
        const parameter = {
          dataset: "TaiwanStockMonthRevenue",
          data_id: "id",
          start_date: "2023-01-01",
          end: "2023-12-31",
        };
        const response = await fetch(
          `https://api.finmindtrade.com/api/v4/data?dataset=${parameter.dataset}&start_date=${parameter.start_date}&end=${parameter.end}`,
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

  //echarts

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
          <StyledPrimary>每月營收</StyledPrimary>
          {/* 篩選條件 */}
          <StyledSelect>
            <option value="3">近3年</option>
            <option value="5" selected>
              近5年
            </option>
            <option value="8">近8年</option>
          </StyledSelect>
          {/* 圖表 */}
          {/* <Bar
            data={{
              labels: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023],
              datasets: [
                {
                  label: "每月營收",
                  data: [200, 300, 400, 200, 600, 800, 450, 500],
                  backgroundColor: "rgba(250, 192, 19, 0.6)",
                  border: "3px solid rgba(250, 192, 19)",
                },
              ],
            }}
          /> */}
          {/* <Bar data={data} options={options} />
          <Line data={data} options={options} /> */}
          <Bar data={data} options={options} />
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
                    borderTop: "1.5px solid lightgray",
                    borderBottom: "1.5px solid lightgray",
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
              <tr>
                <StyledTdValue style={{ fontWeight: "400" }}>
                  Mark
                </StyledTdValue>
              </tr>
              <tr>
                <StyledTdValue
                  style={{
                    borderTop: "1.5px solid lightgray",
                    borderBottom: "1.5px solid lightgray",
                  }}
                >
                  Mark
                </StyledTdValue>
              </tr>
              <tr>
                <StyledTdValue>Jacob</StyledTdValue>
              </tr>
            </tbody>
          </Table>
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
        </SectionTable>
      </StyledSection>
    </StyledContainer>
  );
};

export default Section;
