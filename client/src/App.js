import {Route, Routes } from "react-router-dom";
import Home from "./Home";
import Order from "./Order";
import Admin from "./Admin";

function App() {
  return (
    <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/order/:tableNumber" element={<Order />} />
        <Route path="admin" element={<Admin />} />
    </Routes>
  );
}

export default App;
