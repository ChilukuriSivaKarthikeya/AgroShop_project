import React,{useState} from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
}
from 'mdb-react-ui-kit';
import Aleart from "../components/Aleart";
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

function Product() {
  const [name,setName]=useState("");
  const [category,setCategory]=useState("");
  const [price,setPrice]=useState("");
  const [discount,setDiscount]=useState("");
  const [quantity,setQuantity]=useState("");
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState([]);
  const [messageAlert,setMessageAlert]=useState("");
  const [color,setColor]=useState("");
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setLocation(
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  const handleClick = async (event) => {
    if (!name || !category || !quantity || !price || !discount || location.length === 0 || !image) {
      setMessageAlert('All fields are required');
      setColor("warning")
      setTimeout(() => setMessageAlert(''), 5000);
      return; 
    }
  
    const formData = new FormData();
    formData.append('name', name);
    formData.append('category', category);
    formData.append('quantity', quantity);
    formData.append('price', price);
    formData.append('discount', discount);
    location.forEach((loc) => {
      formData.append('location', loc);
    });
    formData.append('image', image);  
    const token = localStorage.getItem('seller_access_token');
    try {
      const response = await axios.post('http://localhost:8000/createproduct/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', 
          'Authorization': `Bearer ${token}`, 
        },
      });
      
      setMessageAlert('successfully Product added');
      setColor('success')
      setName('');
      setCategory('');
      setQuantity('');
      setPrice('');
      setDiscount('');
      setLocation([]);
      setImage(null);
    } catch (error) {
      if (error.response) {
        console.log('Response data:', error.response.data);
      }
    }
  };
  
  return (
    <div>
    {messageAlert &&  <Aleart message={messageAlert} color={color} />}
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
                    id="outlined-adornment-weight"
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                      'aria-label': 'weight',
                    }}
                    value={name} onChange={(e)=> setName(e.target.value)}
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
                    value={category}
                    onChange= {(e)=> setCategory(e.target.value)}
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
                    id="outlined-adornment-weight"
                    endAdornment={<InputAdornment position="end">kg</InputAdornment>}
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                      'aria-label': 'weight',
                    }}
                    value={quantity} onChange={(e)=> setQuantity(e.target.value)}
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
                    id="outlined-adornment-weight"
                    startAdornment={<InputAdornment position="start">₹</InputAdornment>}
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                      'aria-label': 'weight',
                    }}
                    value={price} onChange={(e)=> setPrice(e.target.value)}
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
                    id="outlined-adornment-weight"
                    endAdornment={<InputAdornment position="end">%</InputAdornment>}
                    aria-describedby="outlined-weight-helper-text"
                    inputProps={{
                      'aria-label': 'weight',
                    }}
                    value={discount} onChange={(e)=> setDiscount(e.target.value)}
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
                    value={location}
                    onChange={handleChange}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                  >
                    {names.map((name) => (
                      <MenuItem key={name} value={name}>
                        <Checkbox checked={location.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                </MDBCol>

              </MDBRow>
              <hr className="mx-n3" />
              <MDBRow className='align-items-center pt-4 pb-3'>

                <MDBCol md='3' className='ps-5'>
                  <h5 className="mb-0">Upload Image</h5>
                </MDBCol>

                <MDBCol md='9' className='pe-5'>
                <FormControl sx={{ width: '100%' }}  variant="outlined">
                  <OutlinedInput
                    id="outlined-adornment-weight"
                    aria-describedby="outlined-weight-helper-text"
                    type='file'
                    inputProps={{
                      'aria-label': 'weight',
                    }}
                    onChange={(e)=> setImage(e.target.files[0])}
                  /> 
                </FormControl>
                </MDBCol>

              </MDBRow>

              <hr className="mx-n3" />

              <MDBBtn className='my-4' onClick={handleClick} size='lg'>save</MDBBtn>

            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
    </div>
  );
}

export default Product;