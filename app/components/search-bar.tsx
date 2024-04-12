"use client";
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
// import Select from "@mui/material/Select";
// import MenuItem from "@mui/material/MenuItem";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  margin: "0 auto",
  borderRadius: theme.shape.borderRadius,
  border: "1px solid lightgray",
  backgroundColor: alpha(theme.palette.grey[300], 0.8),
  width: "420px",
  display: "flex",
  justifyContent: "end",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  paddingRight: "6px",
  height: "100%",
  position: "absolute",
  color: "grey",
  // pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
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

export default function SearchBar() {
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
          {/* <Search defaultValue="" inputProps={{ "aria-label": "Without label" }}>
          <MenuItem value="" disabled>
            輸入台／美股代號，查看公司價值
          </MenuItem>
          <MenuItem value={10}>蘋果(Apple)</MenuItem>
          <MenuItem value={20}>谷歌(Google)</MenuItem>
          <MenuItem value={30}>微軟(Microsoft)</MenuItem> */}
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="輸入台／美股代號，查看公司價值"
            inputProps={{ "aria-label": "search" }}
            sx={{ color: "black" }}
          />
        </Search>
      </Toolbar>
    </AppBar>
  );
}
