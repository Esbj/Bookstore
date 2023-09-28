import { Button } from '@mui/material'

import SuccessMessage from '../SuccessMessage/SuccessMessage'
import { Book } from '../../data/BookInterface'
import { useState } from 'react'
type Props = {
  book: Book
  addToCart: (book: Book) => void
}
export default function PurchaseButton({ book, addToCart }: Props) {
  const [message, setMessage] = useState<string | null>(null)
  const handleClick = () => {
    addToCart(book)
    setMessage(`${book.title} added to cart`)
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }
  return (
    <>
      <Button onClick={handleClick}>ADD TO CART</Button>
      <SuccessMessage message={message} book={book} />
    </>
  )
}
