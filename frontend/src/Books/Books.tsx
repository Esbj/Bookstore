import './Books.scss';
import useFetch from "../customHooks/useFetch";
import { useMemo } from "react";
import BookCard from "../common/BookCard/BookCard";
import { Book } from "../data/BookInterface";

export const Books = () => {
  const url = "http://localhost:3000/books"
  const fetchResult = useFetch(url)
  const { data, isLoading, error } = useMemo(() => fetchResult, [fetchResult]);
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  const books = data as Book[]



  return (
    <div className="books-grid">
      {books?.map((book: Book) => (
        <BookCard book={book} />
      ))}
    </div>
  )
};
