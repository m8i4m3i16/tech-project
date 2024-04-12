import Image from "next/image";
import SearchBar from "./components/search-bar";
import SideBar from "./components/side-bar";

export default function Home() {
  return (
    <>
      <SearchBar />
      <SideBar />
    </>
  );
}
