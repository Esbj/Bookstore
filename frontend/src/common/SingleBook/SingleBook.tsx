import { CartContext } from "../../CartContext";
import { useParams, useNavigate } from "react-router-dom";
import useFetchBooks from "../../customHooks/useFetchBooks";
import useFetchBook from "../../customHooks/useFetchSingleBook";
import Logo from "../Logo";
import { Typography, Button, Divider } from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import "./SingleBook.scss";
import { Book } from "../../data/BookInterface";
import BookCard from "../BookCard/BookCard";
import { useEffect, useContext } from "react";
import Cart from "../../Layout/CartPage/Cart";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";

export default function SingleBook() {
  const { addToCart, toggleCart, isCartOpen } = useContext(CartContext);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  useEffect(() => {
    navigate(`/products/${id}`);
    window.scrollTo(0, 0);
  }, [id, navigate]);
  const { book, author } = useFetchBook(`http://localhost:3000/books/${id}`);
  const { data } = useFetchBooks(
    `http://localhost:3000/books/${id}/same-author`
  );
  const booksByAuthor = data as Book[];
  return (
    <div>
      {isCartOpen && <Cart />}

      <main>
        <nav className="navbar">
          <Logo />
          <ShoppingCartRoundedIcon onClick={toggleCart}>
            {" "}
          </ShoppingCartRoundedIcon>
        </nav>

        <div className="bookInfo">
          <img src={book?.imageUrl} alt={book?.title} />
          <div className="purchaseInfo">
            <Typography variant="h4">{book?.title}</Typography>
            <Typography variant="subtitle2">Author: {author?.name}</Typography>
            <Typography variant="subtitle1">Price: €{book?.price}</Typography>
            <Button variant="outlined" onClick={() => book && addToCart(book)}>
              ADD TO CART <AddShoppingCart />
            </Button>
          </div>
          <div className="description">
            <Typography variant="h4">Description</Typography>
            <Typography variant="body1">{book?.description}</Typography>
          </div>
        </div>
        {booksByAuthor?.length > 1 && (
          <div className="moreBooks">
            <Divider>
              <Typography variant="h4">
                More titles by {author?.name}
              </Typography>
            </Divider>
            <div className="booksByAuthor">
              {booksByAuthor?.map((book, index) => (
                <div key={index}>
                  {book._id !== id ? <BookCard book={book} /> : ""}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
