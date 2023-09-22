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
        return { ...order, status: newStatus };
      }
      return order;
    });
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
                  <TableCell sx={{ fontSize: '1.2rem', fontWeight: 'bold', backgroundColor: '#E5C6A7'}}>Name</TableCell>
                  <TableCell sx={{ fontSize: '1.2rem', fontWeight: 'bold', backgroundColor: '#E5C6A7'}}>Email</TableCell>
                  <TableCell sx={{ fontSize: '1.2rem', fontWeight: 'bold', backgroundColor: '#E5C6A7'}}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ordersState.map(order => (
                  <TableRow key={order._id}>
                    <TableCell>{order._id}</TableCell>
                    <TableCell>{order.firstName}</TableCell>
                    <TableCell>{order.email}</TableCell>
                    <TableCell>
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className="status-select"
                      >
                        <option value="Cancelled">Cancelled</option>
                        <option value="Processing">Processing</option>
                        <option value="Sent">Sent</option>
                      </select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
      {activeTab === 'Books' && (
        <div className="books" style={{ marginBottom: '20px' }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontSize: '1.2rem', fontWeight: 'bold', backgroundColor: '#E5C6A7'}}>ISBN</TableCell>
                  <TableCell sx={{ fontSize: '1.2rem', fontWeight: 'bold', backgroundColor: '#E5C6A7'}}>Title</TableCell>
                  <TableCell sx={{ fontSize: '1.2rem', fontWeight: 'bold', backgroundColor: '#E5C6A7'}}>Author</TableCell>
                  <TableCell sx={{ fontSize: '1.2rem', fontWeight: 'bold', backgroundColor: '#E5C6A7' }}>Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {books.map(book => (
                  <TableRow key={book.title}>
                    <TableCell>{book.isbn}</TableCell>
                    <TableCell>{book.title}</TableCell>
                    <TableCell>{book.author}</TableCell>
                    <TableCell>{book.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
             
            </Table>
            
          </TableContainer>
          
        </div>
      )}
    </React.Fragment>
  );
}

export default Tables;

