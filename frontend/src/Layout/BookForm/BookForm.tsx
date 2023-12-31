import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Snackbar, Typography } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import './BookForm.scss';



type Author = {
  authorId: string;
  name: string;
};

const AddBookPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [authors, setAuthors] = useState<Author[]>([]);


  useEffect(() => {
    async function fetchAuthors() {
      try {
        const response = await fetch('http://localhost:3000/author');
        if (response.ok) {
          const data = await response.json();
          setAuthors(data);
        } else {
          console.log('Failed to fetch authors');
        }
      } catch (error) {
        console.error('Network error:', error);
      }
    }

    fetchAuthors();
  }, []);

  const resetForm = () => {
    setTitle("");
    setAuthor("");
    setIsbn("");
    setDescription("");
    setPrice("");
    setImageUrl("");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const newBook = { title, author: author, isbn, description, price, imageUrl };
    const response = await fetch('http://localhost:3000/books/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBook),
    });

    if (response.ok) {
      setSuccessMessage('Book added successfully');
      resetForm();
    } else {
      console.log('Failed to add book');
    }
  };
  const handleChangeAuthor = (event: SelectChangeEvent) => {
    // const matchingAuth = authors.find(a => a.name = event.target.value)
    setAuthor(event.target.value as string)
  };
  return (
    <main>
      <Typography variant='h4' className="add-book">Add new book</Typography>
      <div style={{ margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                label="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="author-select-id">Author</InputLabel>
                <Select
                  labelId='author-select-id'
                  value={author}
                  onChange={handleChangeAuthor}
                >
                  {authors.map((author) => (
                    <MenuItem value={author.name}>
                      {author.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                label="ISBN"
                value={isbn}
                onChange={e => setIsbn(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                label="Price"
                value={price}
                onChange={e => setPrice(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                label="Image URL"
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                label="Description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                multiline
                rows={4}
                fullWidth
              />
            </Grid>
            <div className="grid-action-buttons">

              <Link to="/admin">
                <Button variant="contained" color="secondary">
                  Cancel
                </Button>
              </Link>

              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
            </div>
          </Grid>
        </form>
        <Snackbar open={!!successMessage} autoHideDuration={3000} onClose={() => setSuccessMessage("")}>
          <MuiAlert severity="success" onClose={() => setSuccessMessage("")}>
            {successMessage}
          </MuiAlert>
        </Snackbar>
      </div>
    </main>
  );
};

export default AddBookPage;
