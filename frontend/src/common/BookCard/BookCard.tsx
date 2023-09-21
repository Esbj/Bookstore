import { Book } from '../../data/book'
import { Card, CardContent, Grid, Paper, Typography } from '@mui/material'
type Props = {
  book: Book
}
export default function BookCard({ book }: Props) {
  return (
    <Grid>
      <Typography variant='h4'>{book.title}</Typography>
      <Typography variant='h5'>{book.author}</Typography>
    </Grid>
  )
}
