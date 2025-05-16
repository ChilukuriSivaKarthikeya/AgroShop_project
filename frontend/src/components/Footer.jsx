import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

export default function Footer() {
  return (
    <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>

      <section className='pt-1'>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="6" xl="5" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon icon="bag" className="me-3" />
                AgroShop
              </h6>
              <p>
              AgroShop is an online platform that allows customers to buy fresh organic vegetables, fruits, 
              and flowers directly from farmers. The app ensures a seamless experience with home delivery, 
              bringing farm-fresh produce to your doorstep.
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
              <p>
                <a href='/' className='text-reset'>
                  Home
                </a>
              </p>
              <p>
                <a href='/register' className='text-reset'>
                  Register
                </a>
              </p>
              <p>
                <a href='/signin' className='text-reset'>
                  sell products
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                Hitech city, Hyderabad, India
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                team@AgroShop.com
              </p>
              
              
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        Copyright © {new Date().getFullYear()} :
        <a className='text-reset fw-bold' href=''>
          AgroShop.com
        </a>
      </div>
    </MDBFooter>
  );
}