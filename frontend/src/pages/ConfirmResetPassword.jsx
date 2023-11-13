import React,{useState} from 'react';
import {MDBBtn,MDBContainer,MDBCard,MDBCardBody} from 'mdb-react-ui-kit';
import {FormControl,IconButton,OutlinedInput,InputAdornment,InputLabel} from '@mui/material';
import {Visibility,VisibilityOff} from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ConfirmResetPassword() {
  const { uid, token } = useParams();
  const [showPassword, setShowPassword] = React.useState(false);
  const [password,setPassword]=useState("");
  const [confirmPassword,setConfirmPassword]=useState("");
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleClick = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
        setError("Passwords don't match.");
    }
    try {
        const response = await axios.post(`http://localhost:8000/passwordresetconfirm/${uid}/${token}/`, {
          password,
        });
  
        setMessage(response.data.message);
      } catch (err) {
        setError('Password reset failed. Please try again.');
      }
  };

  return (
    <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image p-5' style={{backgroundImage: 'url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)',minHeight:'100vh'}}>
      <div className='mask gradient-custom-3'></div>
      <MDBCard className='m-5' style={{ maxWidth: '500px', width: '100%',padding:'30px',borderRadius: '25px' }}>
        <MDBCardBody className='px-5'>
          <h2 className="text-uppercase fw-bold text-center mb-5">Reset your Password</h2>
         {error && <div className="error p-5">{error}</div>}
         {message && <div className="success">{message}</div>}
          <FormControl sx={{marginBottom:'25px',width: '55ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password" sx={{ background: 'white' }}>Enter new Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type='text'
            label="Password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
          />
        </FormControl>
          <FormControl sx={{marginBottom:'25px',width: '55ch' }} >
          <InputLabel htmlFor="outlined-adornment-password" sx={{ background: 'white' }}>Confirm new Password</InputLabel>
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
            label="Password"
            value={confirmPassword}
            onChange={(e)=> setConfirmPassword(e.target.value)}
          />
        </FormControl>
          <MDBBtn className='mb-4 w-100 gradient-custom-4' onClick={handleClick} size='lg'>Reset Password</MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
}

export default ConfirmResetPassword;
