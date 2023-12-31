import { Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import Products from "./Layout/Products/Products";
import Shipping from "./Layout/Checkout/Shipping";
import AdminPage from "./Layout/AdminPage/AdminPage";
import Payment from "./Layout/Checkout/Payment";
import CompletedOrderPage from "./Layout/Checkout/CompletedOrderPage";
import Cart from "./Layout/CartPage/Cart";
import SingleBook from "./Layout/SingleBook/SingleBook";
import AddBookPage from "./Layout/BookForm/BookForm";
import BooksByAuthor from "./Layout/BooksByAuthor/BooksByAuthor";
import EditBook from "./Layout/EditBook/EditBook";
import AddAuthor from "./Layout/AddAuthor/AddAuthor";


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
        <Route path="author/:id" element={<BooksByAuthor />} />
        <Route path="/add-book" element={<AddBookPage />} />
        <Route path="/add-author" element={<AddAuthor />} />
        <Route path="/edit-book/:isbn" element={<EditBook />} />

      </Routes>
    </>
  );
}

export default App;
