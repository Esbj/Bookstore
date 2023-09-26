import { useContext } from "react";
import { CartContext } from "../../CartContext";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import "./Cart.scss";

export default function Cart() {
  const {
    cart,
    decreaseQuantity,
    increaseQuantity,
    totalPrice,
    toggleCart,
    isCartOpen,
  } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div className="cartContainer">
      <div className="cartContent">
        <div className="cartTab">
          <Button
            onClick={toggleCart}
            variant="contained"
            className="tabItem"
            sx={{ width: "1rem", marginLeft: "26rem" }}
          >
            {isCartOpen ? "X" : "Öppna kundvagn"}
          </Button>
        </div>
        <Typography className="tabItem" variant="h5">
          Your Cart
        </Typography>

        {/* {cart.length === 0 ? (
                <h4>Your cart is empty</h4>
            ) : ( */}
        <>
          {cart.map((book, index) => (
            <div key={index}>
              <p>
                {book.title} á {book.price} $
              </p>
              <div style={{ display: "flex" }}>
                <button onClick={() => decreaseQuantity(book)}>-</button>
                <p>{book.quantity} pcs</p>
                <button onClick={() => increaseQuantity(book)}>+</button>
              </div>
            </div>
          ))}
          <Typography variant="h6">Subtotal: {totalPrice()} $</Typography>
          <Typography variant="h6">Shipping excluded</Typography>

          <Button
            sx={{ width: "12rem" }}
            variant="contained"
            onClick={() => navigate("/shipping")}
          >
            Checkout
          </Button>
        </>
        {/* // )} */}
      </div>
    </div>
  );
}
