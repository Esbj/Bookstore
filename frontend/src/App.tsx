import "./App.css";

import { Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import Products from "./Layout/Products/Products";
import Shipping from "./Layout/Shipping";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />} />
            <Route path="/products" element={<Products />} />
            <Route path="/shipping" element={<Shipping />} />
        </Routes>
    );
}

export default App;
