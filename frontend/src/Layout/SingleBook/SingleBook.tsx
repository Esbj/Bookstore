
import { useParams } from 'react-router-dom';
import useFetch from '../../customHooks/useFetch';
import useFetchBook from '../../customHooks/useFetchSingleBook';
import Logo from '../../common/Logo';
import { Typography, Button, Divider } from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';
import "./SingleBook.scss"
import { Book } from '../../data/BookInterface';
import BookCard from '../../common/BookCard/BookCard';
import { useEffect } from 'react';
import Grid from '@mui/material/Unstable_Grid2';

export default function SingleBook() {
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])
  const { book, author } = useFetchBook(`http://localhost:3000/books/${id}`)
  const { data } = useFetch(`http://localhost:3000/books/${id}/same-author`)
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
          <Typography variant='h4'>More titles by {author?.name}</Typography>
          <Grid container spacing={4} className="booksByAuthor">
            {booksByAuthor?.map((book, index) => (
              <Grid xs={12} md={4} key={index}>
                {
                  book._id !== id ?
                    <BookCard book={book} />
                    : ''
                }
              </Grid>
            ))}
          </Grid>
        </div>
      }
    </main>
  )
}