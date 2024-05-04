import React, {useEffect,useState } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

function MyOrders() {
    const [orders, setOrders] = React.useState([]);
    let num=1;
    React.useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:8000/seller/orders/', {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            },
          });
          setOrders(response.data);  
          console.log(response.data) 
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };     
      fetchData();
    }, []);
    const updatestatus=async(e,id)=>{
      const status = e.target.value;
      try {
        const token = localStorage.getItem('access_token');
        const {data}=await axios.put(`http://localhost:8000/seller/orderupdate/${id}`, {'status':status}, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        console.log(data);
      } catch (error) {
        console.error('Error updating product:', error);
      }
    }
    return ( 
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell>S.No</TableCell>
            <TableCell align="center">Product Name</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="right">Payment Method</TableCell>
            <TableCell align="center">Delivery Address</TableCell>
            <TableCell align="center">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
  {orders.map((row, index) => (
    <TableRow key={index}>
      <TableCell align="center">{num++}</TableCell>
      <TableCell align="center">
        {row.orderItems.map((item, itemIndex) => (
          <div className='mb-1'  key={itemIndex}>{item.product.name}</div>
        ))}
      </TableCell>
      <TableCell align="center">
        {row.orderItems.map((item, itemIndex) => (
          <div className='mb-1' key={itemIndex}>{item.quantity} kg</div>
        ))}
      </TableCell>
      <TableCell align="right">{row.paymentmethod}</TableCell>
      <TableCell align="center">{row.shippingAddress[0].firstName+" "+row.shippingAddress[0].lastName}<br/>{row.shippingAddress[0].addressLine+','+row.shippingAddress[0].city}<br />Mobile No:-{row.shippingAddress[0].mobile}</TableCell>
      <TableCell align="center">
        <Select
          value={row.status}
          onChange={(e)=>updatestatus(e,row.id)}
        >
          <MenuItem value={'pending'}>Pending</MenuItem>
          <MenuItem value={'placed'}>Placed</MenuItem>
          <MenuItem value={'shipped'}>Shipped</MenuItem>
          <MenuItem value={'delivered'}>Delivered</MenuItem>
        </Select>
      </TableCell>
    </TableRow>
  ))}
</TableBody>
      </Table>
    </TableContainer>
     );
}

export default MyOrders;