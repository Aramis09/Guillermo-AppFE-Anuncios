import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/home";
import useLoaderManage from "./hooks/useLoader";
import Navbar from "./components/navbar/navbar";

function App() {
  const { LoaderAllViewport } = useLoaderManage({ turnOnAllPage: true });
  return (
    <>
      {/* <Navbar /> */}
      {LoaderAllViewport}
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
