import { Book } from '../../data/BookInterface'
import { Typography } from '@mui/material'
import './BookCard.scss'
import { Link } from 'react-router-dom'
type Props = {
  book: Book
}

export default function BookCard({ book }: Props) {
  return (
    <div className='book-card'>
      <img src={book.imageUrl} />
      <Link to={`/products/${book._id}`}><Typography className='title' variant='h4'>{book.title}</Typography></Link>
      <Typography variant='h5'>{book.author}</Typography>
    </div >
  )
}
