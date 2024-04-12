"use client";
import { useState } from "react";
import { styled } from "@mui/material/styles";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faB,
  faF,
  faC,
  faD,
  faE,
  faQ,
  faJ,
  faG,
  faH,
  faI,
} from "@fortawesome/free-solid-svg-icons";

const StyledLink = styled("div")(({ theme, active }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: "15px",
  lineHeight: "35px",
  paddingLeft: "0px",
  "&:active": {
    paddingLeft: "0px",
    borderLeft: `3px solid ${theme.palette.primary.main}`,
  },
  ...(active && {
    borderLeft: `3px solid ${theme.palette.primary.main}`,
    paddingLeft: "0px",
  }),
}));

const StyledParagraph = styled("p")(({ theme, active }) => ({
  color: active ? theme.palette.primary.main : "#666666",
  fontWeight: active ? 500 : 300,
}));

const SideBar = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <>
      <StyledLink active={activeIndex === 0} onClick={() => handleClick(0)}>
        <FontAwesomeIcon icon={faB} style={{ color: "darkslategray" }} />
        <StyledParagraph active={activeIndex === 0}>最新動態</StyledParagraph>
      </StyledLink>

      <StyledLink active={activeIndex === 1} onClick={() => handleClick(1)}>
        <FontAwesomeIcon icon={faF} style={{ color: "darkslategray" }} />
        <StyledParagraph active={activeIndex === 1}>股票健診</StyledParagraph>
      </StyledLink>

      <StyledLink active={activeIndex === 2} onClick={() => handleClick(2)}>
        <FontAwesomeIcon icon={faC} style={{ color: "darkslategray" }} />
        <StyledParagraph active={activeIndex === 2}>財務報表</StyledParagraph>
      </StyledLink>

      <StyledLink active={activeIndex === 3} onClick={() => handleClick(3)}>
        <FontAwesomeIcon icon={faD} style={{ color: "firebrick" }} />
        <StyledParagraph active={activeIndex === 3}>獲利能力</StyledParagraph>
      </StyledLink>

      <StyledLink active={activeIndex === 4} onClick={() => handleClick(4)}>
        <FontAwesomeIcon icon={faE} style={{ color: "green" }} />
        <StyledParagraph active={activeIndex === 4}>安全性分析</StyledParagraph>
      </StyledLink>

      <StyledLink active={activeIndex === 5} onClick={() => handleClick(5)}>
        <FontAwesomeIcon icon={faQ} style={{ color: "darkorange" }} />
        <StyledParagraph active={activeIndex === 5}>成長力分析</StyledParagraph>
      </StyledLink>

      <StyledLink active={activeIndex === 6} onClick={() => handleClick(6)}>
        <FontAwesomeIcon icon={faJ} style={{ color: "darkblue" }} />
        <StyledParagraph active={activeIndex === 6}>價值評估</StyledParagraph>
      </StyledLink>

      <StyledLink active={activeIndex === 7} onClick={() => handleClick(7)}>
        <FontAwesomeIcon icon={faG} style={{ color: "darkslategray" }} />
        <StyledParagraph active={activeIndex === 7}>董監與籌碼</StyledParagraph>
      </StyledLink>

      <StyledLink active={activeIndex === 8} onClick={() => handleClick(8)}>
        <FontAwesomeIcon icon={faH} style={{ color: "purple" }} />
        <StyledParagraph active={activeIndex === 8}>關鍵指標</StyledParagraph>
      </StyledLink>

      <StyledLink active={activeIndex === 9} onClick={() => handleClick(9)}>
        <FontAwesomeIcon icon={faI} style={{ color: "blue" }} />
        <StyledParagraph active={activeIndex === 9}>產品組合</StyledParagraph>
      </StyledLink>
    </>
  );
};

export default SideBar;
