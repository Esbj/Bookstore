import { useEffect, useState } from 'react'
type Props = {
  url: string
}
export default function useBooks({ url }: Props) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => setData(data))
      .catch(error => setError(error))
      .finally(() => setIsLoading(false))
  }, [url])
  return { data, error, isLoading }
}
