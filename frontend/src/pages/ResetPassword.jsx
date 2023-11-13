import React, { useState } from 'react';
import {MDBBtn,MDBContainer,MDBCard,MDBCardBody} from 'mdb-react-ui-kit';
import {FormControl,TextField,Alert,Stack} from '@mui/material';
import axios from 'axios';

function ResetPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage]=useState('')
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/passwordreset/', { email });
            setMessage(response.data.message);
        } catch (error) {
            alert('Password reset failed.');
        }
    };

    return (
        <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image p-5' style={{backgroundImage: 'url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)',minHeight:'100vh'}}>
      <div className='mask gradient-custom-3'></div>
      <MDBCard className='m-5' style={{ maxWidth: '500px', width: '100%',padding:'30px',borderRadius: '25px' }}>
        <MDBCardBody className='px-5'>
          <h2 className="text-uppercase fw-bold text-center mb-5">Forgot Password</h2>
         <p>Enter the email address associated with your account, then click "Submit".We will email you a link to reset your password.</p>
          <FormControl sx={{marginBottom:'25px',width: '55ch' }} variant="outlined">
          <TextField
          id="outlined-textarea"
          label="Email"
          placeholder="Enter your register email"
          multiline
          value={email}
          onChange={(e)=> setEmail(e.target.value)}
        />
            
        
        </FormControl>
        {message && <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert variant="outlined" severity="success">
            {message}
          </Alert>
        </Stack>}
          <MDBBtn className='my-4 w-100 gradient-custom-4' onClick={handleSubmit} size='lg'>Submit</MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
    );
}
export default ResetPassword;