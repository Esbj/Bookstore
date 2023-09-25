import { Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import Products from "./Products/Products";
import Shipping from "./Layout/Shipping";
import AdminPage from "./Layout/AdminPage/AdminPage";
import Payment from "./Layout/Payment";
import SingleBook from "./common/SingleBook/SingleBook";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/products" element={<Products />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="products/:id" element={<SingleBook />} />
      </Routes>
    </>
  );
}

export default App;
