import { useContext } from "react";
import { CartContext } from "../../CartContext";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import "./Cart.scss";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export default function Cart() {
  const { cart, decreaseQuantity, increaseQuantity, totalPrice, toggleCart } =
    useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div className="cartContainer">
      <div className="cartContent">
        <div className="cartTab">
          <Typography className="tabItem" variant="h5">
            Your cart
          </Typography>
          <CancelRoundedIcon
            onClick={toggleCart}
            className="tabItem"
            sx={{
              fontSize: "large",
            }}
          ></CancelRoundedIcon>
        </div>

        {cart.length === 0 ? (
          <h4>Your cart is empty</h4>
        ) : (
          <>
            {cart.map((book, index) => (
              <div
                style={{
                  width: "100%",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div key={index} className="cartItemInfo">
                  <img
                    src={book.imageUrl}
                    style={{ width: "4rem", marginBottom: "1px" }}
                  />
                  <Typography sx={{ alignSelf: "center", marginLeft: "1rem" }}>
                    {book.title} á {book.price} $
                  </Typography>
                </div>
                <div className="buttonsForItem">
                  <IconButton aria-label="remove">
                    <RemoveIcon onClick={() => decreaseQuantity(book)} />
                  </IconButton>
                  <Typography variant="h6">{book.quantity} pcs</Typography>
                  <IconButton aria-label="add">
                    <AddIcon onClick={() => increaseQuantity(book)} />
                  </IconButton>
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
        )}
      </div>
    </div>
  );
}
