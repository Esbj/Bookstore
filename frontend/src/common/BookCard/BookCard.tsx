import { Book } from '../../data/BookInterface'
import { Typography } from '@mui/material'
import './BookCard.scss'
type Props = {
  book: Book
}
export default function BookCard({ book }: Props) {
  return (
    <div className='book-card'>
      <img src={book.imageUrl} />
      <Typography className='title' variant='h4'>{book.title}</Typography>
      <Typography variant='h5'>{book.author}</Typography>
    </div>
  )
}
