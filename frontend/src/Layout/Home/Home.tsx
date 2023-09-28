import { Link } from "react-router-dom";
import "./Home.scss";
import Button from '@mui/material/Button';
import bookImage from './bookimage.jpeg';
import secondBook from './saga.jpg';
import bookIcon from '../../assets/books-logo.svg';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import Grid from '@mui/material/Unstable_Grid2';
import useFetch from "../../customHooks/useFetch";
import { Book } from "../../data/BookInterface";
import { Typography } from "@mui/material";
import { useContext } from "react";
import { CartContext } from "../../CartContext";
import { AddShoppingCart } from '@mui/icons-material';
function Home() {
  const { addToCart } = useContext(CartContext)
  // const fetchBooks = useMemo(() => useFetch("http://localhost:3000/books"), [])
  const { data } = useFetch("http://localhost:3000/books")
  const books = data as Book[]

  return (
    <div className='round-corner'>
      <div className="header">

        <div className="bookIcon">
          <img src={bookIcon} alt="book-logo" className="book-icon" />
        </div>
        <Link to={"/admin"}><LoginRoundedIcon /></Link>
      </div>
      <div className="content">

        <div className="text">
          <h2 className='title'>New & <br />Trending</h2>
          <p className="desc">Explore new worlds from authors</p>

          <Link className="button" to="/products" style={{ textDecoration: 'none' }}>
            <Button variant="text" style={{
              borderRadius: '50px',
              width: '200px', backgroundColor: '#FFFFFF', color: '#9D918B'
            }}>
              Browse all books
            </Button>
          </Link>
        </div>

        <div className="bookshelf">
          <img src={bookImage} alt="Book" className="book-image" />
          <img src={secondBook} alt="Another Image" className="another-image" />
        </div>
      </div>
      <Grid container mt={12} justifyContent={"center"} className="frontpage-books">
        {books?.map(book => (
          <Grid key={book._id} className="frontpage-book-card">
            <img src={book.imageUrl} alt={book.title} />
            <Typography variant="subtitle1" >{book.title}</Typography>
            <Button onClick={() => addToCart(book)}>ADD TO CART <AddShoppingCart /></Button>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Home;

