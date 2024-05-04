import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCardText,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBRow,
    MDBTypography,
    } from "mdb-react-ui-kit";
    import React, { useContext } from "react";
    import '../App.css';
    import { Player } from '@lottiefiles/react-lottie-player';
    import ProductContext from "../context/ProductContext";
    import Spinner from "../components/Spinner";

    export default function Cart() {
    const {isLoading,wishlist,removeWishlist,addCart}=useContext(ProductContext);
    if(isLoading){
      return <Spinner/>;
    }
    return (
      <div>
      {!wishlist.length>0? <section>
        <h1 className="d-flex justify-content-center align-items-center mt-5 text-danger">No item is wishlisted</h1>
      <MDBCol md='12'>
        <Player
          src='https://lottie.host/719a3e34-6c94-4880-90e0-08d8d2c8c49c/4OoOEiZbkf.json'
          className="player"
          loop
          autoplay
    style={{ height: '400px'}}
        />
        </MDBCol>
      </section>:
    <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol size="12">
            <MDBCard className="card-registration card-registration-2" style={{ borderRadius: "15px" }}>
              <MDBCardBody className="p-0">
                <MDBRow className="g-0">
                  <MDBCol lg="12">
                    <div className="p-5">
                      <div className="d-flex justify-content-between align-items-center mb-5">
                        <MDBTypography tag="h1" className="fw-bold mb-0 text-black">
                          WishList
                        </MDBTypography>
                        <MDBTypography className="mb-0 text-muted">
                          {wishlist.length} items
                        </MDBTypography>
                      </div>
                      {wishlist.map(x=>(
                      < ><hr className="my-6" />
                      <MDBRow key={x.id} className="mx-3 mb-4 d-flex justify-content-between align-items-center" >
                          <MDBCol md="2" lg="2" xl="2">
                            <MDBCardImage
                              src={"http://localhost:8000"+x?.product.image}
                              fluid className="rounded-3" alt="Cotton T-shirt" />
                          </MDBCol>
                          <MDBCol md="3"  className="text-center mb-1">
                            <MDBTypography tag="h6" className="text-muted">
                              {x.product.category}
                            </MDBTypography>
                            <MDBTypography tag="h6" className="text-black mb-0">
                              {x.product.name}
                            </MDBTypography>
                          </MDBCol>

                          <MDBCol md="3"  className="text-center mb-1">
                            <MDBTypography tag="h6" className="text-muted">
                              Price
                            </MDBTypography>
                            <MDBTypography tag="h6" className="mb-0">
                            {x.product.price}
                            </MDBTypography>
                          </MDBCol>
                          <MDBCol md="4"  className="text-center px-5">
                            <div className="d-grid gap-3">
                              <MDBBtn outline color="danger" onClick={()=>removeWishlist(x.product.id)}>Remove</MDBBtn>
                              <MDBBtn  outline onClick={()=>addCart(x.product.id)}>Add to cart</MDBBtn>
                            </div>
                          </MDBCol>
                        </MDBRow></>
                       ))}
                      <hr className="my-4" />

                      <div className="pt-5">
                        <MDBTypography tag="h6" className="mb-0">
                          <MDBCardText tag="a" href="#!" className="text-body">
                            <MDBIcon fas icon="long-arrow-alt-left me-2" /><a href='/user'> Back
                            to shop</a>
                          </MDBCardText>
                        </MDBTypography>
                      </div>
                    </div>
                  </MDBCol>
                  
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
    }</div>
    );
    }