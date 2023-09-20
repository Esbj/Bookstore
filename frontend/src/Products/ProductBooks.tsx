import useFetch from "../customHooks/useFetch";
import { useMemo } from "react";
import BookCard from "../common/BookCard/BookCard";
import { experimentalStyled as styled } from '@mui/material/styles';
import { Box, Container, Grid, Paper } from "@mui/material";

export const ProductBooks = () => {
  const url = "http://localhost:3000/books"
  const fetchResult = useFetch(url)
  const { data, isLoading, error } = useMemo(() => fetchResult, [fetchResult]);
  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>


  // Code from mui.com
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <Container>
      <Grid container spacing={12} >
        {data && data.map((book, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <Item>{book.title}</Item>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
};
