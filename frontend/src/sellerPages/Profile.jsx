import React,{useContext} from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBListGroup
} from 'mdb-react-ui-kit';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import UserContext from '../context/userContext';
import Spinner from '../components/Spinner';

export default function Profile() {
    
    const {seller, isLoading, error } = useContext(UserContext);
    if (isLoading) {
      return <Spinner />;
    }
  
    if (error) {
      return <p>Error: {error.message}</p>;
    }
    console.log(seller);
    if (!seller || !seller.user) {
      return <p>Seller information not available.</p>;
    }
    
    return (
      <section style={{ backgroundColor: '#eee' }}>
        <MDBContainer className="py-5">
          <MDBRow>
            <MDBCol>
              <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
                <MDBBreadcrumbItem>
                  <a href="/user">Home</a>
                </MDBBreadcrumbItem>
                <MDBBreadcrumbItem active>User Profile</MDBBreadcrumbItem>
              </MDBBreadcrumb>
            </MDBCol>
          </MDBRow>
  
          <MDBRow>
            <MDBCol lg="4">
              <MDBCard className="mb-4">
                <MDBCardBody className="text-center">
                  <MDBCardImage
                    src={`http://localhost:8000${seller.image}`}
                    alt="avatar"
                    className="rounded-circle"
                    style={{ width: '150px', height: '150px' }}
                    fluid
                  />
                  <p className="text-muted mt-2">{seller.user.first_name}</p>
                  <div className="d-flex justify-content-center mb-1">
                    <MDBBtn href="/seller/ProfileUpdate">Edit Profile</MDBBtn>
                  </div>
                </MDBCardBody>
              </MDBCard>
  
              <MDBCard className="mb-4 mb-lg-0">
                <MDBCardBody className="p-1">
                  <MDBListGroup flush className="rounded-3">
                    <a href="/seller/addproduct">
                      <MDBBtn outline className="ms-1" style={{ width: '98%' }}>
                      <AddCircleOutlineIcon className="me-4"/>
                        ADD PRODUCT
                      </MDBBtn>
                    </a>
                    <a href="/seller/orders">
                      <MDBBtn outline className="ms-1" style={{ width: '98%' }}>
                        <ShoppingCartOutlinedIcon className="me-4" />
                        MY ORDERS
                      </MDBBtn>
                    </a>
                    <a href="/seller/products">
                      <MDBBtn outline className="ms-1" style={{ width: '98%' }}>
                        <ShoppingBagOutlinedIcon className="me-4" />
                        MY PRODUCTS
                      </MDBBtn>
                    </a>
                  </MDBListGroup>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol lg="8">
              <MDBCard className="mb-4">
                <MDBCardBody style={{ padding: '50px' }}>
                  {[
                    { label: 'Full Name', value: seller.user.first_name },
                    { label: 'Email', value: seller.user.email },
                    { label: 'Mobile', value: seller.mobile },
                    { label: 'City', value: seller.village },
                    { label: 'Pincode', value: seller.pincode },
                  ].map((item, index) => (
                    <React.Fragment key={index}>
                      <MDBRow style={{ padding: '10px 0' }}>
                        <MDBCol sm="3">
                          <MDBCardText className="font-weight-bold fs-4">
                            {item.label}
                          </MDBCardText>
                        </MDBCol>
                        <MDBCol sm="9">
                          <MDBCardText className="text-muted fs-5">{item.value}</MDBCardText>
                        </MDBCol>
                      </MDBRow>
                      <hr />
                    </React.Fragment>
                  ))}
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    );
  }