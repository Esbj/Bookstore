import { useContext } from "react";
import { CartContext } from "../CartContext";
import { useNavigate } from "react-router-dom";

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
            <h3>Your Cart</h3>
            {cart.length === 0 ? (
                <h4>Your cart is empty</h4>
            ) : (
                <>
                    {cart.map((book, index) => (
                        <div key={index}>
                            <p>
                                {book.title} á {book.price} $
                            </p>
                            <div style={{ display: "flex" }}>
                                <button onClick={() => decreaseQuantity(book)}>
                                    -
                                </button>
                                <p>{book.quantity} pcs</p>
                                <button onClick={() => increaseQuantity(book)}>
                                    +
                                </button>
                            </div>
                        </div>
                    ))}
                    <h4>Total: {totalPrice()} $</h4>
                    <h4>Shipping excluded</h4>

                    <button onClick={() => navigate("/shipping")}>
                        Checkout
                    </button>
                </>
            )}
        </div>
    );
}
