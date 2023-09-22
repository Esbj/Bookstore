import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import "./AdminPage.scss";
import { Order } from '../../data/OrderInterface';
import { Book } from '../../data/BookInterface';
import Tables from '../Tables/Tables';

function AdminPage() {
  const [activeTab, setActiveTab] = React.useState('Orders');
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [books, setBooks] = React.useState<Book[]>([]);
  const [selectedStatus] = React.useState('');

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
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  const filteredOrders = selectedStatus ? orders.filter(order => order.status === selectedStatus) : orders;

  return (
    <React.Fragment>
      <CssBaseline />
      <div className="container">
        <Container fixed>
          <Box className="box">
            <div className="toggleWrapper">
              <Typography
                variant="h2" sx={{ margin: '40px' }}
                className={activeTab === 'Orders' ? 'selected' : ''}
                onClick={() => setActiveTab('Orders')}
              >
                Orders
              </Typography>
              <Typography
                variant="h2" sx={{ margin: '40px'}}
                className={activeTab === 'Books' ? 'selected' : ''}
                onClick={() => setActiveTab('Books')}
              >
                Books
              </Typography>
            </div>
            <Tables activeTab={activeTab} orders={filteredOrders} books={books} />
          </Box>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default AdminPage;
