import React,{useState,useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
}
from 'mdb-react-ui-kit';
import axios from 'axios';
import {FormControl,MenuItem,OutlinedInput,Select,InputAdornment,InputLabel,Checkbox,ListItemText}from '@mui/material';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'Akividu',
  'Bhimadole',
  'Bhimavaram',
  'Chintalapudi',
  'Dwaraka Tirumala',
  'Eluru',
  'Gopalapuram',
  'Ganapavaram',
  'Kovvur',
  'Penumantra',
  'Polavaram',
  'Poduru',
  'Tadepalligudem',
  'Tanuku',
  'Narsapur',
];

function UpdateProduct() {
    const { id } = useParams();
    const [product, setProduct] = useState({
      name: '',
      category: '',
      price: '',
      discount: '',
      quantity: '',
      location: [],
    });
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/product/${id}`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('seller_access_token')}`,
            },
          });
          setProduct(response.data);
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      };
      fetchData();
    }, [id]);
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
      }));
    };
  
    const handleLocationChange = (event) => {
      setProduct((prevProduct) => ({
        ...prevProduct,
        location: event.target.value,
      }));
    };
  
    const handleImageChange = (event) => {
      setProduct((prevProduct) => ({
        ...prevProduct,
        image: event.target.files[0],
      }));
    };
  
    const handleClick = async (event) => {
      event.preventDefault();
      const formData = new FormData();
      formData.append('name', product.name);
      formData.append('category', product.category);
      formData.append('price', product.price);
      formData.append('discount', product.discount);
      formData.append('quantity', product.quantity);
      product.location.forEach((loc) => {
        formData.append('location', loc);
      });

      try {
        const token = localStorage.getItem('access_token');
        await axios.put(`http://localhost:8000/updateproduct/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        });
        console.log('Product updated successfully');
      } catch (error) {
        console.error('Error updating product:', error);
      }
    };
  return (
    <MDBContainer fluid>
      
      <MDBRow className='d-flex justify-content-center align-items-center'>
        <MDBCol lg='12'>
          <MDBCard>
          <MDBRow className='d-flex justify-content-center align-items-center'>
            <h2 className="text-uppercase fw-bold text-center mt-5">Add product</h2>
          </MDBRow>
            <MDBCardBody className='px-4'>

              <MDBRow className='align-items-center pt-4 pb-3'>

                <MDBCol md='3' className='ps-5'>
                  <h5 className="mb-0">Name</h5>
                </MDBCol>

                <MDBCol md='9'  className='pe-5'>
                <FormControl sx={{ width: '100%' }}  variant="outlined">
                  <OutlinedInput
                    name="name"
                    id="outlined-adornment-weight"
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                      'aria-label': 'weight',
                    }}
                    value={product.name} onChange={handleChange}
                  /> 
                </FormControl>
               </MDBCol>

              </MDBRow>

              <hr className="mx-n3" />

              <MDBRow className='align-items-center pt-4 pb-3'>

                <MDBCol md='3' className='ps-5'>
                  <h5 className="mb-0">Category</h5>
                </MDBCol>

                <MDBCol md='9' className='pe-5'>
                <FormControl sx={{  minWidth:'100%' }}>
                  <Select
                    name="category"
                    value={product.category}
                    onChange= {handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                   
                  >
                    <MenuItem value={'Vegetable'}>Vegetable</MenuItem>
                    <MenuItem value={'Fruit'}>Fruit</MenuItem>
                    <MenuItem value={'Grain'}>Grain</MenuItem>
                    <MenuItem value={'Flower'}>Flower</MenuItem>
                  </Select>
        
                </FormControl>
                </MDBCol>

              </MDBRow>

              <hr className="mx-n3" />
              <MDBRow className='align-items-center pt-4 pb-3'>

                <MDBCol md='3' className='ps-5'>
                  <h5 className="mb-0">Quantity</h5>
                </MDBCol>

                <MDBCol md='9' className='pe-5'>
                <FormControl sx={{ width: '100%' }}  variant="outlined">
                  <OutlinedInput
                    name="quantity"
                    id="outlined-adornment-weight"
                    endAdornment={<InputAdornment position="end">kg</InputAdornment>}
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                      'aria-label': 'weight',
                    }}
                    value={product.quantity} onChange={handleChange}
                  /> 
                </FormControl>
                </MDBCol>

              </MDBRow>
              <hr className="mx-n3" />
              <MDBRow className='align-items-center pt-4 pb-3'>

                <MDBCol md='3'  className='ps-5'>
                  <h5 className="mb-0">Price</h5>
                </MDBCol>

                <MDBCol md='9' className='pe-5'>
                <FormControl sx={{ width: '100%' }}  variant="outlined">
                  <OutlinedInput
                    name="price"
                    id="outlined-adornment-weight"
                    startAdornment={<InputAdornment position="start">₹</InputAdornment>}
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                      'aria-label': 'weight',
                    }}
                    value={product.price} onChange={handleChange}
                  /> 
                </FormControl>
                </MDBCol>
              </MDBRow>
              <hr className="mx-n3" />
              <MDBRow className='align-items-center pt-4 pb-3'>

                <MDBCol md='3' className='ps-5'>
                  <h5 className="mb-0">Discount</h5>
                </MDBCol>

                <MDBCol md='9' className='pe-5'>
                <FormControl sx={{ width: '100%' }} variant="outlined">
                  <OutlinedInput
                    name="discount"
                    id="outlined-adornment-weight"
                    endAdornment={<InputAdornment position="end">%</InputAdornment>}
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                      'aria-label': 'weight',
                    }}
                    value={product.discount} onChange={handleChange}
                  /> 
                </FormControl>
                </MDBCol>

              </MDBRow>
              <hr className="mx-n3" />
              <MDBRow className='align-items-center pt-4 pb-3'>

                <MDBCol md='3' className='ps-5'>
                  <h5 className="mb-0">Locations to sell</h5>
                </MDBCol>

                <MDBCol md='9' className='pe-5'>
                <FormControl sx={{ width: '100%' }} >
                  <InputLabel id="demo-multiple-checkbox-label">select</InputLabel>
                  <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={product.location}
                    onChange={handleLocationChange}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                  >
                    {names.map((name) => (
                      <MenuItem key={name} value={name}>
                        <Checkbox checked={product.location.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                </MDBCol>

              </MDBRow>
              <hr className="mx-n3" />
              <MDBBtn className='my-4' onClick={handleClick} size='lg'>Update</MDBBtn>

            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
}

export default UpdateProduct;