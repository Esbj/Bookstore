import { useMemo, useState } from 'react'
import { Author, Book } from '../data/BookInterface'
import { Order } from '../data/OrderInterface'

export default function useFetch(url: string) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [data, setData] = useState<Book[] | Order[] | Author[] | null>(null)

  useMemo(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => setData(data))
      .catch(error => setError(error))
      .finally(() => setIsLoading(false))
  }, [url])
  return { data, error, isLoading }
}
