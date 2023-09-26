import { useContext, useState } from "react";
import HeadingToggle from "../../common/HeadingToggle/HeadingToggle";
import { ProductBooks } from "../../Products/ProductBooks";
import { MockedProducts } from "../../data/MockedProducts";
import Cart from "../Cart";
import { CartContext } from "../../CartContext";

export default function Products() {
  const [selectedTab, setSElectedTab] = useState("Books");
  const updateSelectedTab = (value: string) => {
    setSElectedTab(value);
  };
  const { addToCart } = useContext(CartContext);
  return (
    <>
      <div className="frame-container">
        <div className="round-corner">
          <HeadingToggle
            selectedTab={selectedTab}
            updateSelectedTab={updateSelectedTab}
          />
          {selectedTab === "Books" && <ProductBooks />}
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
        </div>
      </div>
    </>
  );
}
