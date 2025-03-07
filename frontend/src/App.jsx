import { HashRouter, Route, Routes } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Create from "./pages/Create";
import Result from "./pages/Result";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="create" element={<Create />} />
        <Route path="result" element={<Result />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
