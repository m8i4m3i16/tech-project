"use client";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import { color } from "@mui/system";

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

const Section = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <div>
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
      </div>
    </>
  );
};

export default Section;
