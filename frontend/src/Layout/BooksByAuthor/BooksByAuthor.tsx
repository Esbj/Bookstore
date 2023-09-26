import { useParams } from "react-router-dom";
import useFetch from "../../customHooks/useFetch";
import { Book } from "../../data/BookInterface";
import BookCard from "../../common/BookCard/BookCard";
import "./BooksByAuthor.scss"
import { Typography } from "@mui/material";
import Logo from "../../common/Logo";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { useEffect, useState } from "react";
export default function BooksByAuthor() {
  const { id } = useParams<{ id: string }>();
  const { data, error, isLoading } = useFetch(`http://localhost:3000/author/${id}/books`)
  const books = data as Book[]
  const [author, setAuthor] = useState("")
  useEffect(() => {
    if (books?.length > 0) {
      setAuthor(books[0].author)
    }

  }, [books, id])
  isLoading && "Loading..."
  error && error.message
  return (
    <div className="booksByAuthorWrapper">
      <Logo />
      <Typography variant="h3">{author}</Typography>
      <Grid xs={12} md={6} container >
        {books?.map((book, index) => (
          <Grid key={index}>
            <BookCard book={book} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}
