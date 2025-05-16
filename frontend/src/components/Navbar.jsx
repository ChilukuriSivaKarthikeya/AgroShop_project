import React, { useState,useContext, useEffect } from 'react';
import '../App.css'
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBBadge,
  MDBInput,
} from 'mdb-react-ui-kit';
import {Box,Button,Dialog,DialogActions,DialogContent,DialogTitle,InputLabel,OutlinedInput} from '@mui/material';
import {MenuItem,FormControl,Select} from '@mui/material';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import UserContext from '../context/userContext';
import ProductContext from '../context/ProductContext';

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

export default function Navbar() {
  const {getUser,buyer,logoutUser,query,setQuery,location,setLocation,isLoading} = useContext(UserContext);
  const {wishlist,cart}=useContext(ProductContext)

  const [open, setOpen] = React.useState(false);

  useEffect(()=>{
    getUser()
  },[]);

  function handleChange(event) {
    setLocation(event.target.value || '');
    localStorage.setItem('location', event.target.value);
    setOpen(false);
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };
  if(isLoading){
    <h1 className='text-center'>loading</h1>
  }
  return (
    <>
      <MDBNavbar expand='lg' light sticky style={{ backgroundColor: '#e8e6e6',borderBottom:'1px solid #bdbdbd'}}>
        <MDBContainer fluid>
          <MDBNavbarNav className="d-flex flex-row align-items-center w-auto">
            <MDBNavbarBrand  style={ {fontFamily:  "Times New Roman ,Times ,serif",color: '#333',fontWeight: 'bold', fontSize: '22px',marginLeft:"50px",letterSpacing: '2px'  }}>
             AGROSHOP
            </MDBNavbarBrand>
              <Button onClick={handleClickOpen} style={{color:'black',marginLeft:'20px'}}><PlaceOutlinedIcon className='mx-1 mb-2'/>{location? location:'select location'}</Button>
              <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
              <DialogTitle>Fill the form</DialogTitle>
              <DialogContent>
              <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-name-label">select</InputLabel>
                <Select
                  labelId="demo-multiple-name-label"
                  value={location}
                  onChange={handleChange}
                  input={<OutlinedInput label="Name" />}
                  MenuProps={MenuProps}
                >
                  {names.map((name) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Ok</Button>
            </DialogActions>
          </Dialog>
          </MDBNavbarNav>
          
          <MDBNavbarNav className="d-flex flex-row justify-content-end w-auto">
          <MDBNavbarItem className='mr-4'>
          <div className="search-container">
          
            <input
              className="Search expandright"
              id="searchright"
              type="search"
              placeholder="Search...."
              value={query}
              onChange={(e) => setQuery(e.target.value.toLowerCase())}
            />
            
            <label className="button searchbutton" htmlFor="searchright" >
              <i className="myglass fas fa-search" style={{ color: 'black' }} />
            </label>
          </div> 
            </MDBNavbarItem>
            
            <MDBNavbarItem className='mr-4'>
                <MDBNavbarLink href="/user/wishlist" >
                  <MDBIcon fas icon="heart" style={{ fontSize:'20px' }}/>
                  {wishlist.length>0 &&
                  <MDBBadge color='danger' notification pill>
                    {wishlist.length}
                  </MDBBadge>}
                </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem className='mr-4'>
              <MDBNavbarLink href='/user/cart'>
                <MDBIcon fas icon='shopping-cart' style={{ fontSize:'20px' }}/>
                {cart.length>0 &&
                <MDBBadge color='danger' notification pill>
                    {cart.length}
                  </MDBBadge>}
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem className='mr-3'>
              <MDBDropdown>
                <MDBDropdownToggle tag="a" className="hidden-arrow nav-link">
                  <img src={"http://localhost:8000"+buyer?.image} className="rounded-circle" height="28px" width="28px" alt="" loading="lazy" />
                </MDBDropdownToggle>

                <MDBDropdownMenu style={{padding:'10px'}}>
                  <MDBDropdownItem style={{paddingTop:'10px'}}>
                  <MDBIcon fas icon="user" /><a href="/user/profile">Profile</a>
                  </MDBDropdownItem>
                  <MDBDropdownItem style={{paddingTop:'10px'}}>
                  <MDBIcon fas icon="edit" /><a href="/user/editprofile">Edit Profile</a>
                  </MDBDropdownItem>
                  <MDBDropdownItem style={{paddingTop:'10px'}}>
                  <MDBIcon fas icon="shopping-bag" /><a href="/user/MyOrders">MyOrders</a>
                  </MDBDropdownItem>
                  <hr/>
                  <MDBDropdownItem>
                  <MDBIcon fas icon="sign-out-alt" /><a onClick={logoutUser}>Logout</a>
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBContainer>
      </MDBNavbar>
  </>
  );
}