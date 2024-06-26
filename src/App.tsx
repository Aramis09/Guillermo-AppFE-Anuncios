import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/home";
// import useLoaderManage from "./hooks/useLoader";
import Navbar from "./components/navbar/navbar";
// import Events from "./pages/events/events";
// import UsefulInformation from "./pages/useful-information/useful-information";
import Login from "./pages/login/login";
import Presentation from "./components/presentation/presentation";
import Create from "./pages/create/create";
import CreateCategory from "./pages/createCategory/createCategory";
import CreateSection from "./pages/createSection/createSection";
import CreatePost from "./pages/createPost/createPost";
import Contact from "./pages/contact/contact";
import EditPost from "./pages/editPost/editPost";
import SearchPost from "./pages/search/searchPost";
import { useContextLoader } from "./contexts/hooks/useContextLoader";
import useBlockAccesPrivteRoutes from "./hooks/useBlockAccesPrivteRoutes";
import NotFound from "./components/notFound/notFound";
import useUpScroll from "./hooks/useUpScroll";

function App() {
  const contextLoader = useContextLoader();
  const { isBlockPage } = useBlockAccesPrivteRoutes();
  useUpScroll();
  if (isBlockPage)
    return (
      <div className="home">
        <Navbar />
        <NotFound />
      </div>
    );
  return (
    <div className="home">
      <Navbar />
      <Presentation />
      {contextLoader?.LoaderAllViewport}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/create-categories" element={<CreateCategory />} />
        <Route path="/create-sections" element={<CreateSection />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/events" element={<Home />} />
        <Route path="/useful-info" element={<Home />} />
        <Route path="/search" element={<SearchPost />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
