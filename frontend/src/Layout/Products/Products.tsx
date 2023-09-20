import { useContext } from "react";
import { MockedProducts } from "../../data/MockedProducts";
import { CartContext } from "../../CartContext";
import Cart from "../Cart";

export default function Products() {
    const { addToCart } = useContext(CartContext);
    return (
        <div style={{ padding: "2rem" }}>
            <Cart />
            {MockedProducts.map((book) => (
                <div key={book._id}>
                    <p>{book.title}</p>
                    <p>{book.author}</p>
                    <p>
                        {book.price} {" $"}
                    </p>
                    <button onClick={() => addToCart(book)}>Add to cart</button>
                </div>
            ))}
        </div>
    );
}
