"use client";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";

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

const Section = ({ stockIds, stockNames, searchResults }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [foundStockName, setFoundStockName] = useState(null);
  const [foundStockId, setfoundStockId] = useState(null);

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
          data_id: "",
          start_date: "2023-01-01",
          end: "2023-12-31",
        };
        const response = await fetch(
          "https://api.finmindtrade.com/api/v4/data",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(parameter),
          }
        );

        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log("Error fetching data", error);
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
          <StyledSelect>
            <option value="3">近3年</option>
            <option value="5" selected>
              近5年
            </option>
            <option value="8">近8年</option>
          </StyledSelect>
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
