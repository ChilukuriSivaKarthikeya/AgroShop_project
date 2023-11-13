import React,{useState} from 'react';
import axios from 'axios';
import {
  MDBBtn,MDBContainer,MDBRow,MDBCol,MDBCard,
  MDBCardBody,MDBCardImage,MDBInput,MDBIcon
}from 'mdb-react-ui-kit';
import { MuiOtpInput } from 'mui-one-time-password-input';
import Alert from '@mui/material/Alert';

function Register() {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [otp,setOtp]=useState("");
  const [confirmpassword,setConfirmpassword]=useState("");
  const [message,setMessage]=useState("")
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [otpError, setOtpError] = useState('');

  const sendotp = async () => {
      try {
        const response = await axios.post('http://localhost:8000/sendOTP/', {email});
        setMessage("OTP has send to "+email)
        console.log('success'); 
      } catch (error) {
        if (error.response) {
          console.log('Response data:', error.response.data.error);
        }
      }
    }
    
  const handleClick = async (event) => {
    setNameError('');
    setEmailError('');
    setPasswordError('');
    setConfirmPasswordError('');
    event.preventDefault();
    if (name.length==0 || !name.trim()) {
      setNameError("Please enter the valid Name.");
    }
    if(email.length==0 || !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))){
      setEmailError("Please enter the valid email.")
    }
    if(password.length==0){
      setPasswordError("Please enter the Password.")
    }
    else if(password.length>=6){
      setPasswordError("Password must be at least 6 characters.")
    }
    if(confirmpassword.length==0){
      setConfirmPasswordError("Please enter the ConfirmPassword.")
    }
    else if(password !== confirmpassword) {
      setConfirmPasswordError('Passwords do not match.');
    }
    if(otp.length==4){
      setOtpError('Invalid OTP')
    }
    
    if(nameError==='' && emailError==='' && passwordError==='' && confirmPasswordError==='' && otpError===''){
      try {
        const response = await axios.post('http://localhost:8000/register/', {
          "name":name,
          "email":email,
          "password":password,
          "otp":otp
        });
        console.log('success');
      } catch (error) {
        if (error.response) {
          console.log('Response data:', error.response.data.error);
        }
      }
    } 
  };
  return (
    <MDBContainer fluid>
      <MDBCard className='text-black m-5' style={{borderRadius: '25px',padding:'50px'}}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center' >
            <h2 className="text-uppercase fw-bold text-center mb-4">sign up</h2>
              <div className="mb-4">
                <div className='d-flex flex-row align-items-center mb-1'>
                  <MDBIcon fas icon="user me-3" size='lg'/>
                  <MDBInput label='Your Name' id='form1' type='text' value={name} onChange={(e)=> setName(e.target.value)} size='lg' style={{ width: '300px',height:"40px" }}  required/>
                </div>
                  {nameError &&<span className="text-danger ml-5"><MDBIcon fas icon="exclamation-circle" /> {nameError}</span>}
              </div>
              <div className="mb-4 has-error" >
                <div className='d-flex flex-row align-items-center mb-1 '>
                  <MDBIcon fas icon="envelope me-3" size='lg'/>
                  <MDBInput label='Your Email' id='form2' type='email' value={email} onChange={(e)=> setEmail(e.target.value)} size='lg' style={{ width: '300px',height:"40px" }}  required/>
                </div>
                  {emailError &&<span className="text-danger ml-5"><MDBIcon fas icon="exclamation-circle" /> {emailError}</span>}
              </div>
              <div className="mb-4">
                <div className='d-flex flex-row align-items-center mb-1'> 
                  <MDBIcon fas icon="lock me-3" size='lg'/>
                  <MDBInput label='Password' id='form3' background type='password' value={password} onChange={(e)=> setPassword(e.target.value)}  size='lg' style={{ width: '300px',height:"40px"}}  required/>
                  </div>
                  {passwordError &&<span className="text-danger ml-5"><MDBIcon fas icon="exclamation-circle" /> {passwordError}</span>}
              </div>
              <div className="mb-3">
                <div className='d-flex flex-row align-items-center mb-1'>
                  <MDBIcon fas icon="key me-3" size='lg'/>
                  <MDBInput label='Repeat your password' id='form4' type='password' value={confirmpassword} onChange={(e)=> setConfirmpassword(e.target.value)} size='lg' style={{ width: '300px',height:"40px"}}  required/>
                  </div>
                  {confirmPasswordError &&<span className="text-danger ml-5"><MDBIcon fas icon="exclamation-circle" /> {confirmPasswordError}</span>}
                </div>
              <div className="d-flex flex-row align-items-center mb-3">
                <MDBBtn className='ml-4' onClick={sendotp} size='lg' color='info'>Send otp</MDBBtn>
                {message && <Alert severity="success">{message}</Alert>}
              </div>
              <div className="d-flex flex-row align-items-center mb-3">
                <MuiOtpInput value={otp} length={4} required TextFieldsProps={{placeholder: '-',variant: 'outlined', size: 'small' }} style={{ width: '200px',marginLeft:'5px'}}  onChange={(newValue) => setOtp(newValue)} separator={<span>-</span>} isInputNum={true}/>
              </div>
              <MDBBtn className='mb-4 ml-3' onClick={handleClick} size='lg' style={{width:'60%'}}>Register</MDBBtn>
              <p className='d-flex flex-row justify-content-center mb-4'>Already had Account? <a href="/login">Login</a></p>
            </MDBCol>

            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid/>
            </MDBCol>
              
          </MDBRow>
        </MDBCardBody>
      </MDBCard>

    </MDBContainer>
  );
}

export default Register;