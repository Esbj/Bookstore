import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Snackbar, Typography } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import "./AddAuthor.scss"

const AddAuthor: React.FC = () => {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const resetForm = () => {
    setName("");
    setImageUrl("");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const newAuthor = { name, imageUrl };
    const response = await fetch('http://localhost:3000/author/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAuthor),
    });

    if (response.ok) {
      setSuccessMessage('Author added successfully');
      resetForm();
    } else {
      console.log('Failed to add author');
    }
  };

  return (
    <main>
      <Typography className='new-author-title' variant='h4' >Add new author</Typography>
      <div style={{ width: '400px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid xs={12}>
              <TextField
                label="Name"
                value={name}
                onChange={e => setName(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                label="Image URL"
                value={imageUrl}
                onChange={e => setImageUrl(e.target.value)}
                fullWidth
              />
            </Grid>
            <div className='grid-action-buttons'>
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

export default AddAuthor;
