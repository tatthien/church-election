import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Calculator from "./pages/Calculator";

function App() {
  return (
    <Routes>
      <Route index path="/" element={<Home />} />
      <Route path="/calculator" element={<Calculator />} />
    </Routes>
  );
}

export default App;
