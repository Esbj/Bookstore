import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import "./AdminPage.scss";
import { Order } from '../../data/OrderInterface';
import { Book } from '../../data/BookInterface';


function AdminPage() {
    const [activeButton, setActiveButton] = React.useState('Orders');
    const [orders, setOrders] = React.useState<Order[]>([]);
    const [books, setBooks] = React.useState<Book[]>([]);
    const handleButtonClick = (button: React.SetStateAction<string>) => {
        setActiveButton(button);
    };

    React.useEffect(() => {
        fetch('http://localhost:3000/orders') 
            .then(response => response.json())
            .then(data => setOrders(data))
            .catch(error => console.error('Error fetching orders:', error));
    }, []);


    React.useEffect(() => {
        fetch('http://localhost:3000/books')
        .then(response => response.json())
        .then(data => setBooks(data))
        .catch(error => console.error('Error fetching books:', error))
    }, []);

    return (
        <React.Fragment>
            <CssBaseline />
            <div style={{ backgroundColor: '#F3E5D0', minHeight: '100vh' }}>
                <Container fixed>
                    <Box sx={{ bgcolor: '#F7F3EE', height: '100vh' }}>
                        <div className="toggle-buttons">
                            <Button
                                variant={activeButton === 'Orders' ? 'text' : 'outlined'}
                                onClick={() => handleButtonClick('Orders')}
                            >
                                Orders
                            </Button>
                            <Button
                                variant={activeButton === 'Books' ? 'text' : 'outlined'}
                                onClick={() => handleButtonClick('Books')}
                            >
                                Books
                            </Button>
                        </div>
                        {activeButton === 'Orders' && orders.map(order => (
                            <div key={order._id}>
                                <p>{order._id} {order.firstName} {order.lastName} {order.status}</p>
                                
                            </div>
                        ))}
                        {activeButton === 'Books' && books.map(book => (
                            <div key={book.isbn}>
                                <p>{book.isbn} Title: {book.title} Author: {book.author} Price: {book.price} SEK </p>
                            </div>
                        ))}
                    </Box>
                </Container>
            </div>
        </React.Fragment>
    );
}

export default AdminPage;
