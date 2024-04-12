import Image from "next/image";
// import NavBar from "./components/navbar";
import SearchBar from "./components/search-bar";

// import { useClient } from "next/client";
// import { useEffect, useState } from "react";

// import { ThemeProvider, createTheme } from "@mui/material/styles";
// import Button from "@mui/material/Button";

export default function Home() {
  // const client = useClient();
  // const theme = createTheme();

  // useEffect(() => {
  //   setTheme(createTheme());
  // }, []);

  // if (!theme) {
  //   return null;
  // }

  return (
    // <main>
    //   <h1>hello world</h1>
    // </main>
    // <NavBar />
    <SearchBar />
  );
}
