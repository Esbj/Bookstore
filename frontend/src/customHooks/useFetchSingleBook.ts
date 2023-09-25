import { useEffect as useMemo, useState } from "react";
import { Author, Book } from "../data/BookInterface";

export default function useFetchBooks(url: string) {
  type SingleBook = {
    book: Book;
    author: Author;
  };
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [book, setBook] = useState<SingleBook | null>(null);

  useMemo(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setBook(data))
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  }, [url]);
  return { data: book, error, isLoading };
}
