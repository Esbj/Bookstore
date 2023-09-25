import './Books.scss';
import useFetch from "../customHooks/useFetch";
import { useMemo } from "react";
import BookCard from "../common/BookCard/BookCard";
import { Book } from "../data/BookInterface";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2

export const Books = () => {
  const url = "http://localhost:3000/books"
  const fetchResult = useFetch(url)
  const { data, isLoading, error } = useMemo(() => fetchResult, [fetchResult]);
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  const books = data as Book[]



  return (
    <Grid container spacing={3}>
      {books.map((book: Book) => (
        <Grid xs={6} md={4}>
          <BookCard book={book} />
        </Grid>
      ))}
    </Grid>
  )
};
