
import { useParams } from 'react-router-dom';
import useFetch from '../../customHooks/useFetch';
import useFetchBook from '../../customHooks/useFetchSingleBook';
import Logo from '../../common/Logo';
import { Typography, Button } from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';
import "./SingleBook.scss"
import { Book } from '../../data/BookInterface';
import BookCard from '../../common/BookCard/BookCard';
import { useContext, useEffect } from 'react';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import Grid from '@mui/material/Unstable_Grid2';
import Cart from '../CartPage/Cart';
import { CartContext } from '../../CartContext';

export default function SingleBook() {
  const { addToCart, toggleCart, isCartOpen } = useContext(CartContext);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {

    window.scrollTo(0, 0);
  }, [id]);
  const { book, author } = useFetchBook(`http://localhost:3000/books/${id}`);
  const { data } = useFetch(
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

            <Typography variant="h4">
              More titles by {author?.name}
            </Typography>

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
