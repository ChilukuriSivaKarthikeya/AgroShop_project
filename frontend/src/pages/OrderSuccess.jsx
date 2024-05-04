import React from 'react';
import '../App.css'
import {
    MDBBtn,
    MDBCard,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBTypography,
    } from "mdb-react-ui-kit";

function OrderSuccess() {
    return ( 
        <MDBContainer className='d-flex justify-content-center align-items-center py-5'>
  <MDBCol md='6'>
    <MDBCard className='success-card p-5 mt-3' style={{ borderRadius: "15px" }}>
      <div className="success-mark mb-4">&#10004;</div>
      <h2 className='my-3'>Order is placed successfully!</h2>
      <h5>Thank you for ordering!</h5>
      <MDBRow className='mt-5'>
         <MDBBtn href='/user' outline color='success' className='w-100'>Continue Shopping</MDBBtn>
      </MDBRow>
    </MDBCard>
  </MDBCol>
</MDBContainer>

     );
}

export default OrderSuccess;
