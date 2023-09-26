import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditBook.scss';

interface Book {
    isbn: string;
    title: string;
    author: string;
    price: number;
    description: string;
    imageUrl: string;
    _id: number;
}

function EditBook() {
    const { isbn } = useParams<{ isbn: string }>();
    const [book, setBook] = useState<Book | null>(null);
    const navigate = useNavigate();
    const [deleteSuccessMessage, setDeleteSuccessMessage] = useState<string>('');
    const [isEditing, setIsEditing] = useState(false); // State to track editing mode
    const [editedBook, setEditedBook] = useState<Partial<Book>>({});


    useEffect(() => {
        fetch('http://localhost:3000/books')
            .then((response) => response.json())
            .then((data: Book[]) => {

                const foundBook = data.find((b) => b.isbn === isbn);

                if (foundBook) {

                    setBook(foundBook);
                } else {
                    console.error(`Book with ISBN ${isbn} not found.`);

                }
            })
            .catch((error) => console.error('Error fetching books:', error));
    }, [isbn]);


    const handleEditSubmit = async () => {
        try {
            if (!book) {
                console.error('Book not found');
                return;
            }

            const updatedBook = { ...book, ...editedBook };

            const response = await fetch(`http://localhost:3000/books`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    bookId: book._id,
                    ...updatedBook,
                }),
            });

            if (response.ok) {
                console.log('Book updated successfully');
                setIsEditing(false);
                setBook(updatedBook);
                navigate(`/edit-book/${isbn}`);
            } else {
                throw new Error('Failed to update book');
            }
        } catch (error) {
            console.error('Failed to update book:', error);
        }
    };


    const handleRemoveBook = async () => {
        try {
            if (!book) {
                console.error('Book not found');
                return;
            }

            const response = await fetch(`http://localhost:3000/books`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    bookId: book._id,
                }),
            });

            if (response.ok) {
                console.log('Book deleted successfully');


                setDeleteSuccessMessage('Book deleted successfully');


                setTimeout(() => {
                    setDeleteSuccessMessage('');
                    navigate('/admin');


                }, 2000);
            } else {
                throw new Error('Failed to delete book');
            }
        } catch (error) {
            console.error('Failed to delete book:', error);
        }
    };


    if (!book) {
        return <div>Loading...</div>;
    }

    const handleBack = () => {
        navigate('/admin');
    };

    return (
        <div>
            <div className="form-container">
                <h2>Edit Book Details</h2>
                {book ? (
                    <div>
                        <p>ISBN: {book.isbn}</p>
                        <div>
                            <label>Title:</label>
                            <input
                                type="text"
                                value={book.title}
                                onChange={(e) => setBook({ ...book, title: e.target.value })}
                                disabled={!isEditing}
                            />
                        </div>
                        <div>
                            <label>Author:</label>
                            <input
                                type="text"
                                value={book.author}
                                onChange={(e) => setBook({ ...book, author: e.target.value })}
                                disabled={!isEditing}
                            />
                        </div>
                        <div>
                            <label>Price:</label>
                            <input
                                type="number"
                                value={book.price.toString()}
                                onChange={(e) => setBook({ ...book, price: +e.target.value })}
                                disabled={!isEditing}
                            />
                        </div>
                        <div>
                            <label>Description:</label>
                            <input
                                type="text"
                                value={book.description}
                                onChange={(e) => setBook({ ...book, description: e.target.value })}
                                disabled={!isEditing}
                            />
                        </div>

                        <div>
                            <input
                                type="text"
                                value={editedBook.imageUrl || ''}
                                onChange={(e) => setEditedBook({ ...editedBook, imageUrl: e.target.value })}
                                disabled={!isEditing}
                            />
                            <img src={book.imageUrl} alt="Book Cover" />
                        </div>

                        <button onClick={handleBack}>Back</button>
                        {isEditing ? (
                            <button onClick={handleEditSubmit}>Save</button>
                        ) : (
                            <button onClick={() => setIsEditing(true)}>Edit</button>
                        )}
                        <button onClick={handleRemoveBook}>Remove</button>
                        {deleteSuccessMessage && <div>{deleteSuccessMessage}</div>}

                    </div>
                ) : (
                    <div>Loading...</div>
                )}

            </div>
        </div>

    );

}

export default EditBook;