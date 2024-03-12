import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/home";
import useLoaderManage from "./hooks/useLoader";
import Navbar from "./components/navbar/navbar";
import Events from "./pages/events/events";
import UsefulInformation from "./pages/useful-information/useful-information";

function App() {
  const { LoaderAllViewport } = useLoaderManage({ turnOnAllPage: true });
  return (
    <>
      {/* <Navbar /> */}
      {LoaderAllViewport}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/useful-info" element={<UsefulInformation />} />
      </Routes>
    </>
  );
}

export default App;
