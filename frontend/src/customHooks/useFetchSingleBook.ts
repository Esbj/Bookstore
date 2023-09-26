import { useEffect, useState } from "react";
import { Author, Book } from "../data/BookInterface";

export default function useFetchBook(url: string) {
  type SingleBook = {
    book: Book;
    author: Author;
  };
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [data, setBook] = useState<SingleBook | null>(null);

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setBook(data))
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  }, [url]);
  return { book: data?.book, author: data?.author, error, isLoading };
}
