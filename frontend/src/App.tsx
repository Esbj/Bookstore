import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import Products from "./Layout/Products/Products";
import Home from "./Layout/Home/Home";
import Shipping from "./Layout/Shipping";
import Payment from "./Layout/Payment";

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />} />
                <Route path="/products" element={<Products />} />
                <Route path="/shipping" element={<Shipping />} />
                <Route path="/payment" element={<Payment />} />
            </Routes>
            {/* <Home /> */}
        </>
    );
}

export default App;
