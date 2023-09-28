import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Order } from '../../data/OrderInterface';
import { Book } from '../../data/BookInterface';
import "./Tables.scss";
import { Link } from 'react-router-dom';
import { Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Logo from '../../common/Logo';



type TablesProps = {
  activeTab: string;
  orders: Order[];
  books: Book[];
};

function Tables({ activeTab, orders, books }: TablesProps) {
  const [ordersState, setOrdersState] = useState<Order[]>(orders);

  useEffect(() => {
    setOrdersState(orders);
  }, [orders]);

  const handleStatusChange = (orderId: number | undefined, newStatus: string) => {
    const updatedOrders = ordersState.map(order => {
      if (order._id === orderId) {
       
        order.status = newStatus;
  
       
        fetch('http://localhost:3000/orders/', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ orderId, status: newStatus }),
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Failed to update status');
            }
          })
          .catch(error => {
            console.error(error);
            
          });
      }
      return order;
    });

    console.log(updatedOrders)
  
    setOrdersState(updatedOrders);
  };
  
  return (
    <React.Fragment>
      {activeTab === 'Orders' && (
        <div className="orders" style={{ marginBottom: '20px' }}>
          
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontSize: '1.2rem', fontWeight: 'bold', backgroundColor: '#E5C6A7' }}>Order ID</TableCell>
                  <TableCell sx={{ fontSize: '1.2rem', fontWeight: 'bold', backgroundColor: '#E5C6A7' }}>Name</TableCell>
                  <TableCell sx={{ fontSize: '1.2rem', fontWeight: 'bold', backgroundColor: '#E5C6A7' }}>Email</TableCell>
                  <TableCell sx={{ fontSize: '1.2rem', fontWeight: 'bold', backgroundColor: '#E5C6A7' }}>Status</TableCell>
                  <TableCell sx={{ fontSize: '1.2rem', fontWeight: 'bold', backgroundColor: '#E5C6A7' }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ordersState.map(order => (
                  <TableRow key={order._id}>
                    <TableCell>{order._id}</TableCell>
                    <TableCell>{order.firstName}</TableCell>
                    <TableCell>{order.email}</TableCell>
                    
                    <TableCell>
                      <select value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className="status-select"
                      >
                      
                        <option value="Processing">Processing</option>
                        <option value="Sent">Sent</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </TableCell>
                  </TableRow>
                ))}


              </TableBody>
              
            </Table>
            <Logo />
          </TableContainer>
        </div>
      )}

      
      {activeTab === 'Books' && (
        <div className="books" style={{ marginBottom: '20px' }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontSize: '1.2rem', fontWeight: 'bold', backgroundColor: '#E5C6A7' }}>ISBN</TableCell>
                  <TableCell sx={{ fontSize: '1.2rem', fontWeight: 'bold', backgroundColor: '#E5C6A7' }}>Title</TableCell>
                  <TableCell sx={{ fontSize: '1.2rem', fontWeight: 'bold', backgroundColor: '#E5C6A7' }}>Author</TableCell>
                  <TableCell sx={{ fontSize: '1.2rem', fontWeight: 'bold', backgroundColor: '#E5C6A7' }}>Price</TableCell>
                  <TableCell sx={{ fontSize: '1.2rem', fontWeight: 'bold', backgroundColor: '#E5C6A7' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {books.map(book => (
                  <TableRow key={book.title}>
                    <TableCell>{book.isbn}</TableCell>
                    <TableCell>{book.title}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>{book.price}$</TableCell>
                    <TableCell>
                      <Link to={`/edit-book/${book.isbn}`}>
                        <IconButton>
                          <EditIcon />
                        </IconButton>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <div className="button-container">
            <Button variant='outlined' className="add-new-button">
              <Link to="/add-book">Add a new book</Link>
            </Button>
            <Button variant='outlined' className="add-new-button">
              <Link to="/add-author">Add a new author</Link>
            </Button>
          </div>
          <Logo />
          
        </div>
      )}
    </React.Fragment>
    
  );
}

export default Tables;