import { useContext } from "react";
import { CartContext } from "../../CartContext";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function Cart() {
  const { cart, decreaseQuantity, increaseQuantity, totalPrice } =
    useContext(CartContext);
  const navigate = useNavigate();
  return (
    <div
      style={{
        position: "fixed",
        top: "6rem",
        right: "2rem",
        width: "50rem",
      }}
    >
      <Typography variant="h5">Your Cart</Typography>
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

        <Button variant="contained" onClick={() => navigate("/shipping")}>
          Checkout
        </Button>
      </>
      {/* // )} */}
    </div>
  );
}
