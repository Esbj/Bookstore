import "./App.css";

import { Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import Products from "./Layout/Products/Products";


function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />} />
            <Route path="/products" element={<Products />} />
        </Routes>
    );
}

export default App;
