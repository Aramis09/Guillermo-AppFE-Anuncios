import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/home";
import useLoaderManage from "./hooks/useLoader";
import Navbar from "./components/navbar/navbar";
import Events from "./pages/events/events";
import UsefulInformation from "./pages/useful-information/useful-information";
import Login from "./pages/login/login";
import Presentation from "./components/presentation/presentation";
import Create from "./pages/create/create";
import CreateCategory from "./pages/createCategory/createCategory";
import CreateSection from "./pages/createSection/createSection";
import CreatePost from "./pages/createPost/createPost";
import Contact from "./pages/contact/contact";

function App() {
  const { LoaderAllViewport } = useLoaderManage({ turnOnAllPage: true });
  return (
    <>
      <Navbar />
      <Presentation />
      {LoaderAllViewport}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/create-categories" element={<CreateCategory />} />
        <Route path="/create-sections" element={<CreateSection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/events" element={<Events />} />
        <Route path="/useful-info" element={<UsefulInformation />} />
      </Routes>
    </>
  );
}

export default App;
