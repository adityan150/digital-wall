import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";
import Board from "./components/board/Board";
import Bookmark from "./components/bookmark/Bookmark";
import NotFound from "./components/notfound/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/board/:id" element={<Board />} />
        <Route path="/bookmarks" element={<Bookmark />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
