import { useMemo } from "react"
import useFetch from "../../customHooks/useFetch"
import "./Authors.scss"
import Grid from '@mui/material/Unstable_Grid2';
import { Author } from "../../data/BookInterface"
export default function Authors() {
  const url = "http://localhost:3000/author"
  const fetchAuthors = useFetch(url)
  const { data, isLoading, error } = useMemo(() => fetchAuthors, [fetchAuthors])
  const authors = data as Author[]


  error && error.message
  isLoading && "Loading..."

  return (
    <Grid container spacing={3}>
      {authors?.map((author, index) => (
        <Grid xs={2} md={4} key={index} className="authorCard">
          {author.name}
        </Grid>
      ))}
    </Grid>
  )
}
