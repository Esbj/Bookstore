import { Link } from "react-router-dom";
import "./Home.scss";
import Button from '@mui/material/Button';
import bookImage from './bookimage.jpeg';
import secondBook from './saga.jpg';
import bookIcon from '../../assets/books-logo.svg';

function Home() {
  return (
    <div className='round-corner'>
      <div className="bookIcon">
        <img src={bookIcon} alt="book-logo" className="book-icon" />
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
    </div>
  );
}

export default Home;

