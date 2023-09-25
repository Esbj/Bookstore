
import { useParams } from 'react-router-dom';
import useFetchBooks from '../../customHooks/useFetchBooks';
import useFetchBook from '../../customHooks/useFetchSingleBook';
import Logo from '../Logo';
import { Typography, Button, Divider } from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';
import "./SingleBook.scss"
import { Book } from '../../data/BookInterface';
import BookCard from '../BookCard/BookCard';

export default function SingleBook() {
  const { id } = useParams<{ id: string }>();
  const { book, author } = useFetchBook(`http://localhost:3000/books/${id}`)
  console.log(book, author)
  const { data } = useFetchBooks(`http://localhost:3000/author/${id}`)
  console.log(id)
  console.log(data)
  // return (
  //   <>
  //     {id}
  //     {book?.title}
  //   </>
  // )
  const books = data as Book[]
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
      <div className="moreBooks">
        <Divider><Typography variant='h4'>More titles by {author?.name}</Typography></Divider>
        <div className="booksByAuthor">
          {books?.map(book => <BookCard book={book} />)}
        </div>
      </div>
    </main>
  )
}