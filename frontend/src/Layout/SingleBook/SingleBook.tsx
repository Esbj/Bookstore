import { useParams } from "react-router-dom";
import useFetch from "../../customHooks/useFetch";
import useFetchBook from "../../customHooks/useFetchSingleBook";
import Logo from "../../common/Logo";
import { Typography, Button } from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import "./SingleBook.scss";
import { Book } from "../../data/BookInterface";
import BookCard from "../../common/BookCard/BookCard";
import { useContext, useEffect } from "react";

import Grid from "@mui/material/Unstable_Grid2";
import Cart from "../CartPage/Cart";
import { CartContext } from "../../CartContext";
import CartBadge from "../../CartBadge";
import SuccessMessage from "../../common/SuccessMessage/SuccessMessage";
import { useState } from 'react';

export default function SingleBook() {
  const { addToCart, toggleCart, isCartOpen, cart } = useContext(CartContext);
  const { id } = useParams<{ id: string }>();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);


  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  const { book, author } = useFetchBook(`http://localhost:3000/books/${id}`);
  const { data } = useFetch(`http://localhost:3000/books/${id}/same-author`);
  const booksByAuthor = data as Book[];


  const handleAddToCart = (book: Book) => {
    if (book) {
      addToCart(book);

      setSuccessMessage(`${book.title} has been added to your cart.`);
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    }

  }

  return (
    <div>
      {isCartOpen && <Cart />}
      <main>
        <nav className="navbar">
          <Logo />

          <CartBadge cartLength={cart.length} onClick={toggleCart} />
        </nav>

        <div className="bookInfo">
          <img src={book?.imageUrl} alt={book?.title} />
          <div className="purchaseInfo">
            <Typography variant="h4">{book?.title}</Typography>
            <Typography variant="subtitle2">Author: {author?.name}</Typography>
            <Typography variant="subtitle1">Price: €{book?.price}</Typography>
            <Button variant="outlined" onClick={() => book && handleAddToCart(book)}>
              ADD TO CART <AddShoppingCart />
            </Button>
            <SuccessMessage message={successMessage} book={book || null} />
          </div>
          <div className="description">
            <Typography variant="h4">Description</Typography>
            <Typography variant="body1">{book?.description}</Typography>
          </div>
        </div>
        {booksByAuthor?.length > 1 && (
          <div className="moreBooks">
            <Typography variant="h4">More titles by {author?.name}</Typography>

            <Grid container className="booksByAuthor">
              {booksByAuthor?.map((book, index) => (
                <Grid key={index}>
                  {book._id !== id ? <BookCard book={book} /> : ""}
                </Grid>
              ))}
            </Grid>
          </div>
        )}
      </main>
    </div>
  );
}
