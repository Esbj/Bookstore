import { Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import Products from "./Products/Products";
import Shipping from "./Layout/Shipping";
import AdminPage from "./Layout/AdminPage/AdminPage";
import Payment from "./Layout/Payment";
import CompletedOrderPage from "./Layout/Checkout/CompletedOrderPage";
import Cart from "./Layout/Cart";
import SingleBook from "./common/SingleBook/SingleBook";
import AddBookPage from "./Layout/BookForm/BookForm";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/products" element={<Products />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/payment" element={<Payment />} />
        <Route
          path="/ordercompleted/:orderId"
          element={<CompletedOrderPage />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="products/:id" element={<SingleBook />} />
        <Route path="/add-book" element={<AddBookPage />} />
      </Routes>
    </>
  );
}

export default App;
