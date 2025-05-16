import React, { useState } from 'react';
import axios from 'axios';
import {
  MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard,
  MDBCardBody, MDBCardImage, MDBInput, MDBIcon
} from 'mdb-react-ui-kit';
import { MuiOtpInput } from 'mui-one-time-password-input';
import Alert from '@mui/material/Alert';

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [otpError, setOtpError] = useState('');

  const sendotp = async () => {
    try {
      const response = await axios.post('http://localhost:8000/sendOTP/', { email });
      setMessage("OTP has been sent to " + email);
    } catch (error) {
      if (error.response) {
        console.log('Response data:', error.response.data.error);
        setMessage(error.response.data.error);
      }
    }
  };

  const handleClick = async (event) => {
    setNameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    setOtpError('');

    let valid = true;

    if (!name.trim()) {
      setNameError("Please enter a valid Name.");
      valid = false;
    }
    if (!email || !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
      setEmailError("Please enter a valid email.");
      valid = false;
    }
    if (!password) {
      setPasswordError("Please enter the Password.");
      valid = false;
    } else if (password.length <= 6) {
      setPasswordError("Password must be at least 6 characters.");
      valid = false;
    }
    if (!confirmpassword) {
      setConfirmPasswordError("Please enter the Confirm Password.");
      valid = false;
    } else if (password !== confirmpassword) {
      setConfirmPasswordError('Passwords do not match.');
      valid = false;
    }
    if (!otp || otp.length < 4) {
      setOtpError('Invalid OTP.');
      valid = false;
    }

    if (!valid) return;

    try {
      const response = await axios.post('http://localhost:8000/seller/register/', {
        name,
        email,
        password,
        otp
      });
      setSuccess(true);
    } catch (error) {
      if (error.response) {
        console.log('Response data:', error.response.data.error);
        setMessage(error.response.data.error);
      }
    }
  };

  if (success) {
    return (
      <MDBContainer fluid>
        <MDBCard className="text-black m-5" style={{ borderRadius: '25px', padding: '50px' }}>
          <MDBCardBody className="text-center">
            <h3 className="text-success">Registration Successful!</h3>
            <p className="mt-3">You can now login to your account.</p>
            <MDBBtn href="/signin" size="lg" color="success">
              Click here to Login
            </MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    );
  }

  return (
    <MDBContainer fluid>
      <MDBCard className='text-black m-5' style={{ borderRadius: '25px', padding: '50px' }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center' >
              <h2 className="text-uppercase fw-bold text-center mb-4">Sign Up</h2>
              <div className="mb-4">
                <div className='d-flex flex-row align-items-center mb-1'>
                  <MDBIcon fas icon="user me-3" size='lg' />
                  <MDBInput label='Your Name' id='form1' type='text' value={name} onChange={(e) => setName(e.target.value)} size='lg' style={{ width: '300px', height: "40px" }} required />
                </div>
                {nameError && <span className="text-danger ml-5"><MDBIcon fas icon="exclamation-circle" /> {nameError}</span>}
              </div>
              <div className="mb-4 has-error" >
                <div className='d-flex flex-row align-items-center mb-1 '>
                  <MDBIcon fas icon="envelope me-3" size='lg' />
                  <MDBInput label='Your Email' id='form2' type='email' value={email} onChange={(e) => setEmail(e.target.value)} size='lg' style={{ width: '300px', height: "40px" }} required />
                </div>
                {emailError && <span className="text-danger ml-5"><MDBIcon fas icon="exclamation-circle" /> {emailError}</span>}
              </div>
              <div className="mb-4">
                <div className='d-flex flex-row align-items-center mb-1'>
                  <MDBIcon fas icon="lock me-3" size='lg' />
                  <MDBInput label='Password' id='form3' background type='password' value={password} onChange={(e) => setPassword(e.target.value)} size='lg' style={{ width: '300px', height: "40px" }} required />
                </div>
                {passwordError && <span className="text-danger ml-5"><MDBIcon fas icon="exclamation-circle" /> {passwordError}</span>}
              </div>
              <div className="mb-3">
                <div className='d-flex flex-row align-items-center mb-1'>
                  <MDBIcon fas icon="key me-3" size='lg' />
                  <MDBInput label='Repeat your password' id='form4' type='password' value={confirmpassword} onChange={(e) => setConfirmpassword(e.target.value)} size='lg' style={{ width: '300px', height: "40px" }} required />
                </div>
                {confirmPasswordError && <span className="text-danger ml-5"><MDBIcon fas icon="exclamation-circle" /> {confirmPasswordError}</span>}
              </div>
              <div className="d-flex flex-row align-items-center mb-3">
                <MDBBtn className='ml-4' onClick={sendotp} size='lg' color='info'>Send OTP</MDBBtn>
                {message && <Alert severity="success">{message}</Alert>}
              </div>
              <div className="d-flex flex-row align-items-center mb-3">
                <MuiOtpInput value={otp} length={4} required TextFieldsProps={{ placeholder: '-', variant: 'outlined', size: 'small' }} style={{ width: '200px', marginLeft: '5px' }} onChange={(newValue) => setOtp(newValue)} separator={<span>-</span>} isInputNum={true} />
              </div>
              <MDBBtn className='mb-4 ml-3' onClick={handleClick} size='lg' style={{ width: '60%' }}>Register</MDBBtn>
              <p className='d-flex flex-row justify-content-center mb-4'>Already have an account? <a href="/login">Login</a></p>
            </MDBCol>

            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid />
            </MDBCol>

          </MDBRow>
        </MDBCardBody>
      </MDBCard>

    </MDBContainer>
  );
}

export default SignUp;
