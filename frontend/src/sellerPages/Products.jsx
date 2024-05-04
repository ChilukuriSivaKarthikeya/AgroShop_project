import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { initialState, Action_Request, Action_Success, Action_Fail, ProductReducer } from '../reducers/ProductReducer';

export default function MyProducts() {
  const [data, dispatch] = useReducer(ProductReducer, initialState);
  var num=1;
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: Action_Request });
        const response = await axios.get('http://localhost:8000/seller/products/', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
        dispatch({ type: Action_Success, payload: response.data });
      } catch (error) {
        dispatch({ type: Action_Fail, payload: error });
      }
    };

    fetchData();
  }, []);
  const deleteProduct = async (id) => {
    try {
        dispatch({ type: Action_Request });
        await axios.delete(`http://localhost:8000/deleteproduct/${id}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            },
        });
        dispatch({ type: Action_Success, payload: data.products.filter(product => product.id !== id) });

    } catch (error) {
        dispatch({ type: Action_Fail, payload: error });
    }
}
  if (data.loading) {
    return <Spinner />;
  }
  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align='center'>S.No</TableCell>
            <TableCell align='center'>Name</TableCell>
            <TableCell align='center'>Price&nbsp;(Rs)</TableCell>
            <TableCell align='center'>Quantity&nbsp;(kg)</TableCell>
            <TableCell align='center'>Edit</TableCell>
            <TableCell align='center'>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.products.map((product) => (
            <TableRow
              key={product.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align='center'>{num++}</TableCell>
              <TableCell align='center'>{product.name}</TableCell>
              <TableCell align='center'>{product.price}</TableCell>
              <TableCell align='center'>{product.quantity}</TableCell>
              <TableCell align='center'><Button variant="outlined" color="info" startIcon={<UpdateIcon/>} href={`/seller/update/${product.id}`}>Update</Button></TableCell>
              <TableCell align='center'><Button variant="outlined" color="error" startIcon={<DeleteIcon/>} onClick={() => deleteProduct(product.id)}>Delete</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
