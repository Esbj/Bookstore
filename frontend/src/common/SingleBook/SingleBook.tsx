
import { useParams, useNavigate } from 'react-router-dom';
import useFetchBooks from '../../customHooks/useFetchBooks';
import useFetchBook from '../../customHooks/useFetchSingleBook';
import Logo from '../Logo';
import { Typography, Button, Divider } from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';
import "./SingleBook.scss"
import { Book } from '../../data/BookInterface';
import BookCard from '../BookCard/BookCard';
import { useEffect } from 'react';

export default function SingleBook() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  useEffect(() => {
    navigate(`/products/${id}`);
    window.scrollTo(0, 0)
  }, [id, navigate])
  const { book, author } = useFetchBook(`http://localhost:3000/books/${id}`)
  const { data } = useFetchBooks(`http://localhost:3000/books/${id}/same-author`)
  const booksByAuthor = data as Book[]
  return (
    <main>
      <Logo />
      <div className="bookInfo">
        <img src={book?.imageUrl} alt={book?.title} />
        <div className="purchaseInfo">
          <Typography variant='h4'>{book?.title}</Typography>
          <Typography variant='subtitle2'>Author: {author?.name}</Typography>
          <Typography variant='subtitle1'>Price: €{book?.price}</Typography>
          <Button variant="outlined">ADD TO CART <AddShoppingCart /></Button>
        </div>
        <div className="description">
          <Typography variant='h4'>Description</Typography>
          <Typography variant='body1'>{book?.description}</Typography>
        </div>
      </div>
      {booksByAuthor?.length > 1 &&
        <div className="moreBooks">
          <Divider><Typography variant='h4'>More titles by {author?.name}</Typography></Divider>
          <div className="booksByAuthor">
            {booksByAuthor?.map((book, index) => (
              <div key={index}>
                {
                  book._id !== id ?
                    <BookCard book={book} />
                    : ''
                }
              </div>
            ))}
          </div>
        </div>
      }
    </main>
  )
}