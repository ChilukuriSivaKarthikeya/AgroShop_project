import React,{useContext, useState} from 'react';
import {MDBBtn,MDBContainer,MDBCard,MDBCardBody} from 'mdb-react-ui-kit';
import {FormControl,IconButton,OutlinedInput,InputAdornment,InputLabel,Alert,Stack,AlertTitle} from '@mui/material';
import {Visibility,VisibilityOff} from '@mui/icons-material';
import UserContext from '../context/userContext';

function SignIn() {
  const {loginSeller,error}=useContext(UserContext)
  const [showPassword, setShowPassword] = React.useState(false);
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = async (event) => {    
    event.preventDefault();
    loginSeller(username,password)
  };

  return (
    <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image p-5' style={{backgroundImage: 'url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)'}}>
      <div className='mask gradient-custom-3'></div>
      <MDBCard className='m-5' style={{ maxWidth: '500px', width: '100%',padding:'30px',borderRadius: '25px' }}>
        <MDBCardBody className='px-5'>
          <h2 className="text-uppercase fw-bold text-center mb-5">LOGIN</h2>
          <div className='mb-5'>
          {error && <Stack sx={{ width: '100%' }} spacing={2}>
             <Alert severity="error">
             <AlertTitle>Failed login</AlertTitle>{error.detail}!</Alert>
            </Stack>}
          </div>
          <FormControl sx={{marginBottom:'25px',width: '38ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Email</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type='email'
            required
            label="email"
            value={username}
            onChange={(e)=> setUsername(e.target.value)}
          /></FormControl>
          <FormControl sx={{marginBottom:'25px',width: '38ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            required
            label="Password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
          />
        </FormControl>
        <p className="forgot-password text-left">
          Forgot <a href="/resetpassword">password?</a>
        </p>
          <MDBBtn className='mb-4 w-100 gradient-custom-4' onClick={handleSubmit} size='lg'>Login</MDBBtn>
          <p className='d-flex flex-row justify-content-center mb-4'>Not a member? <a href="/register">Register</a></p>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default SignIn;