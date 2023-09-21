import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Order } from '../../data/OrderInterface';
import { Book } from '../../data/BookInterface';

type TablesProps = {
  activeTab: string;
  orders: Order[];
  books: Book[];
};

function Tables({ activeTab, orders, books }: TablesProps) {
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
                {orders.map(order => (
                  <TableRow key={order._id}>
                    <TableCell>{order._id}</TableCell>
                    <TableCell>{order.firstName}</TableCell>
                    <TableCell>{order.email}</TableCell>
                    <TableCell>{order.status}</TableCell>
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
