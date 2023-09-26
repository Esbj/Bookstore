import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';


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
    <>
      <h2 className="add-author">Add new author</h2>
      <div style={{ width: '400px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                value={name}
                onChange={e => setName(e.target.value)}
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

export default AddAuthor;
