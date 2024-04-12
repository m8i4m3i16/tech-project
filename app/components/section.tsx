"use client";
import { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";

const StyledContainer = styled("div")(({ theme }) => ({
  display: "flex",
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

// section
const StyledSection = styled("div")(({ theme }) => ({}));

const SectionTop = styled("div")(({ theme }) => ({
  width: "700px",
  height: "50px",
  backgroundColor: "white",
  borderRadius: theme.shape.borderRadius,
  border: "1px solid lightgray",
  marginBottom: "10px",
  padding: "13px",
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
  // padding: "13px",
}));

const SectionTable = styled("div")(({ theme }) => ({
  width: "700px",
  height: "200px",
  backgroundColor: "white",
  borderRadius: theme.shape.borderRadius,
  border: "1px solid lightgray",
  marginBottom: "10px",
  // padding: "13px",
}));

const Section = () => {
  const theme = useTheme();
  const [activeIndex, setActiveIndex] = useState(null);
  const handleClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
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
          <p style={{ color: "#000" }}>台積電（2330）</p>
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
        </SectionTable>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            color: "#000",
            fontSize: "11px",
            fontWeight: "200",
            marginBottom: "200px",
          }}
        >
          <div>
            <p
              style={{
                display: "flex",
                justifyContent: "flex-end",
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