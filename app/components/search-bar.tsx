"use client";
import { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

//UI樣式
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  margin: "0 auto",
  borderRadius: theme.shape.borderRadius,
  border: "1px solid lightgray",
  backgroundColor: alpha(theme.palette.grey[300], 0.8),
  width: "360px",
  display: "flex",
  justifyContent: "end",
}));

const StyledButton = styled("button")(({ theme }) => ({
  position: "absolute",
  paddingRight: "6px",
  height: "100%",
  color: "grey",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "black",
  fontWeight: 500,
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: "10px",
  },
}));

export default function SearchBar({
  stockIds,
  stockNames,
  handleSearchResults,
}) {
  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: "white",
        boxShadow: "none",
        borderBottom: "1px solid lightgray",
      }}
    >
      <Toolbar>
        <Search>
          <StyledButton>
            <SearchIcon />
          </StyledButton>
          <StyledInputBase
            placeholder="輸入台／美股代號，查看公司價值"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
        <h1></h1>
      </Toolbar>
    </AppBar>
  );
}
