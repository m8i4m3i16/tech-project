"use client";
import { useMemo, useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
  stockIds: number[];
  stockNames: string[];
  handleSearchResults: (result: string) => void;
}

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
}: SearchBarProps) {
  const [filterSettings, setFilterSettings] = useState({
    searchKey: "",
  });

  const clearSettings = () => {
    setFilterSettings({
      searchKey: "",
    });
  };

  //初始化時設定一次搜尋結果
  useEffect(() => {
    handleSearchResults([]);
  }, [handleSearchResults]);

  const filteredStocks = useMemo(() => {
    const { searchKey } = filterSettings;

    if (searchKey) {
      const matchedIds = stockIds.filter((id) =>
        id.toString().includes(searchKey)
      );
      const matchedNames = stockNames.filter((name) =>
        name.includes(searchKey)
      );
      const searchResults = [...matchedIds, ...matchedNames];
      return searchResults;
    } else {
      return [];
    }
  }, [stockIds, stockNames, filterSettings]);

  //搜尋關鍵字改變時更新搜尋結果
  useEffect(() => {
    handleSearchResults(filteredStocks);
  }, [filteredStocks, handleSearchResults]);

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
            onChange={(e) =>
              setFilterSettings((c) => ({ ...c, searchKey: e.target.value }))
            }
          />
        </Search>
      </Toolbar>
    </AppBar>
  );
}
