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
import UserContext from '../context/userContext';
import Spinner from '../components/Spinner';

export default function Profile() {
  const {buyer, isLoading, error } = useContext(UserContext);

if (isLoading) {
  return <Spinner/>
}

if (error) {
  return <p>Error: {error.message}</p>;
}
if (!buyer || !buyer.user) {
  return <p>Buyer information not available.</p>;
}
  return (
    <section style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol>
            <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
              <MDBBreadcrumbItem>
                <a href='/'>Home</a>
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
                  src={"http://localhost:8000"+buyer?.image}
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px',height: '150px' }}
                  fluid />
                <p className="text-muted mt-2">{buyer.user.first_name}</p>
                <div className="d-flex justify-content-center mb-1">
                  <MDBBtn href='\editprofile'>Edit Profile</MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mb-4 mb-lg-0">
              <MDBCardBody className="p-1">
                <MDBListGroup flush className="rounded-3">
                  <a href='\wishlist'><MDBBtn outline className="ms-1" style={{width:"98%"}}>
                     <FavoriteBorderOutlinedIcon className="me-4" />Wishlist</MDBBtn></a>
                     <a href='\cart'><MDBBtn outline className="ms-1" style={{width:"98%"}}>
                     <ShoppingCartOutlinedIcon className="me-4"/>Cart</MDBBtn></a>
                     <a href='\MyOrders'><MDBBtn outline className="ms-1" style={{width:"98%"}}>
                     <ShoppingBagOutlinedIcon className="me-4"/>Orders</MDBBtn></a>
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody  style={{ padding: '50px' }}>
                <MDBRow >
                  <MDBCol sm="3">
                    <MDBCardText className="font-weight-bold fs-4">Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted fs-5">{buyer.user.first_name}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow style={{padding:'10px 0'}}>
                  <MDBCol sm="3">
                    <MDBCardText className="font-weight-bold fs-4">Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted fs-5">{buyer.user.email}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                
                <MDBRow style={{padding:'10px 0'}}>
                  <MDBCol sm="3">
                    <MDBCardText className="font-weight-bold fs-4">Mobile</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted fs-5">{buyer.mobile}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow style={{padding:'10px 0'}}>
                  <MDBCol sm="3">
                    <MDBCardText className="font-weight-bold fs-4">City</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted fs-5">{buyer.village}</MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow style={{padding:'10px 0'}}>
                  <MDBCol sm="3">
                    <MDBCardText className="font-weight-bold fs-4">Pincode</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted fs-5">{buyer.pincode}</MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}