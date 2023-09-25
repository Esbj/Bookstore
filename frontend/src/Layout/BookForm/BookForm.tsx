import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import './BookForm.scss';

const AddBookPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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
    const newBook = { title, author, isbn, description, price, imageUrl };
    const response = await fetch('http://localhost:3000/books/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newBook),
    });

    if (response.ok) {
      setSuccessMessage('Book added successfully');
      resetForm(); // Reset the form fields
    } else {
      console.log('Failed to add book');
      
    }
  };

  return (
    <>
      <h2 className="add-book">Add new book</h2>
      <div style={{ width: '400px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Author"
                value={author}
                onChange={e => setAuthor(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="ISBN"
                value={isbn}
                onChange={e => setIsbn(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Price"
                value={price}
                onChange={e => setPrice(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Image URL"
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                multiline
                rows={4}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              <Link to="/admin">
                <Button variant="contained" color="secondary">
                  Cancel
                </Button>
              </Link>
            </Grid>
            <Grid item xs={6}>
              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
        <Snackbar open={!!successMessage} autoHideDuration={3000} onClose={() => setSuccessMessage("")}>
          <MuiAlert severity="success" onClose={() => setSuccessMessage("")}>
            {successMessage}
          </MuiAlert>
        </Snackbar>
      </div>
    </>
  );
};

export default AddBookPage;
