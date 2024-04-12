import SearchBar from "./components/search-bar";
import SideBar from "./components/side-bar";
import Section from "./components/section";

export default function Home() {
  return (
    <>
      <SearchBar />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <SideBar style={{ flexDirection: "column" }} />
        <Section />
      </div>
    </>
  );
}
