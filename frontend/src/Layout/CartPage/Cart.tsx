import { useContext } from "react";
import { CartContext } from "../../CartContext";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import "./Cart.scss";

export default function Cart() {
  const { cart, decreaseQuantity, increaseQuantity, totalPrice } =
    useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div className="cartContainer">
      <div className="cartContent">
        <div className="cartTab">
          <CancelRoundedIcon
            className="tabItem"
            sx={{ fontSize: "large", marginLeft: "26rem" }}
          ></CancelRoundedIcon>
        </div>
        <Typography className="tabItem" variant="h5">
          Your Cart
        </Typography>

        {/* {cart.length === 0 ? (
                <h4>Your cart is empty</h4>
            ) : ( */}
        <>
          {cart.map((book, index) => (
            <div key={index} className="cartItemInfo">
              <Typography variant="h5">
                {book.title} á {book.price} $
              </Typography>
              <div className="buttonsForItem">
                <Button
                  variant="contained"
                  sx={{ width: "0.2rem" }}
                  onClick={() => decreaseQuantity(book)}
                >
                  -
                </Button>
                <Typography variant="h4">{book.quantity} pcs</Typography>
                <Button
                  variant="contained"
                  sx={{ width: "0.2rem" }}
                  onClick={() => increaseQuantity(book)}
                >
                  +
                </Button>
              </div>
              <hr />
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
