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
import React,{useContext, useEffect,useState} from "react";
import '../App.css';
import ProductContext from "../context/ProductContext";
import { Player } from '@lottiefiles/react-lottie-player';
import Aleart from "../components/Aleart";
import Spinner from "../components/Spinner";

export default function Cart() {
  const {isLoading,cart,messageAlert,color,removeCart,handleIncrement,handleDecrement}=useContext(ProductContext)
  const [total, setTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
useEffect(() => {
    let calculatedTotal = 0;
    let calculatedDiscount = 0;
    cart.forEach(element => {
      calculatedTotal += parseInt(element.product.price*element.quantity);
      calculatedDiscount += (element.product.price*element.quantity) * 0.1;
    });
    setTotal(calculatedTotal);
    setDiscount(calculatedDiscount);
  
}, [cart]);

if(isLoading) {
  return <Spinner/>
} 
return (
    <div>
       {messageAlert &&  <Aleart message={messageAlert} color={color} />}
       {!cart.length>0? (<section>
      <h1 className="d-flex justify-content-center align-items-center mt-5 text-danger">Empty Cart</h1>
      <MDBCol md='12'>
      <Player
        src='https://lottie.host/48677c96-bae5-4e83-8045-c776a90d4f5d/uBoJNnB5QC.json'
        className="player"
        loop
        autoplay
        style={{ height: '400px' }}
      />
      </MDBCol>
    </section>
    ):(
    <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center">
          <MDBCol size="12">
            <MDBCard className="card-registration card-registration-2" style={{ borderRadius: "15px" }}>
              <MDBCardBody className="p-0">
                <MDBRow className="g-0">
                  <MDBCol lg="8">
                    <div className="p-5">
                      <div className="d-flex justify-content-between align-items-center mb-5">
                        <MDBTypography tag="h1" className="fw-bold mb-0 text-black">
                          Shopping Cart
                        </MDBTypography>
                        <MDBTypography className="mb-0 text-muted">
                          {cart.length} items
                        </MDBTypography>
                      </div>
                      {cart.map(item=>(<>
                      <hr className="my-4" />
                      <MDBRow  key={item.id} className="mb-4 d-flex flex-row justify-content-between align-items-center">
                        <MDBCol className="text-center">
                          <MDBCardImage
                            src={"http://localhost:8000"+item?.product.image}
                            style={{height:"10vh",width:"7vw"}} className="rounded-3"  alt="Cotton T-shirt" />
                        </MDBCol>
                        <MDBCol  className="text-center">
                          <MDBTypography tag="h6" className="text-muted">
                            {item.product.category}
                          </MDBTypography>
                          <MDBTypography tag="h6" className="text-black mb-0">
                            {item.product.name}
                          </MDBTypography>
                        </MDBCol>
                        <MDBCol className="text-center">
                        <MDBTypography tag="h6" className="text-muted">
                            Price
                          </MDBTypography>
                          <MDBTypography tag="h6" className="mb-0">
                           {item.product.price}
                          </MDBTypography>
                        </MDBCol>
                        <MDBCol className="d-flex align-items-center">
                          <MDBBtn color="link" onClick={() => item.quantity >=2 && handleDecrement(item.product.id)} className="px-2">
                            <MDBIcon fas icon="minus" />
                          </MDBBtn>
                          <MDBInput type="text" className="text-center" value={item.quantity} style={{width:'40px'}}/>
                          <MDBBtn color="link" onClick={() => item.quantity >=1 && handleIncrement(item.product.id) } className="px-2">
                            <MDBIcon fas icon="plus" />
                          </MDBBtn>
                        </MDBCol>
                        <MDBCol  className="text-center">
                          <MDBTypography tag="h6" className="text-muted">
                            Total
                          </MDBTypography>
                          <MDBTypography tag="h6" className="mb-0">
                          {item.product.price*item.quantity}
                          </MDBTypography>
                        </MDBCol>
                        <MDBCol className="text-center">
                          <span className="text-danger" onClick={()=>removeCart(item.product.id)}>
                            <MDBBtn outline color="danger"><MDBIcon fas icon="trash" />  Remove</MDBBtn>
                            </span>
                        </MDBCol>
                      </MDBRow>
                      </>))}
                      <hr className="my-4" />
                      <div className="pt-5">
                        <MDBTypography tag="h6" className="mb-0">
                          <MDBCardText tag="a" href="/user" className="text-body">
                            <MDBIcon fas icon="long-arrow-alt-left me-2" /> Back
                            to shop
                          </MDBCardText>
                        </MDBTypography>
                      </div>
                    </div>
                  </MDBCol>
                  <MDBCol lg="4" className="bg-grey">
                    <div className="p-5">
                      <MDBTypography tag="h3" className="fw-bold mb-5 mt-2 pt-1">
                        Summary
                      </MDBTypography>
                      <hr className="my-4" />
                      <div className="d-flex justify-content-between mb-4">
                        <MDBTypography tag="h6" className="text-uppercase">
                          Price(items {cart.length})
                        </MDBTypography>
                         <MDBTypography tag="h6">₹ {total}</MDBTypography>
                      </div>
                      <div className="d-flex justify-content-between mb-4">
                        <MDBTypography tag="h6" className="text-uppercase">
                          Discount
                        </MDBTypography>
                        <strong className="ms-2 text-success">-₹ {discount}</strong>
                      </div>
                      <div className="d-flex justify-content-between mb-4">
                        <MDBTypography tag="h6" className="text-uppercase">
                        Delivery charges
                        </MDBTypography>
                        <strong className="ms-2 text-success">Free Delivery</strong>
                      </div>
                      <hr className="my-4" />
    
                      <div className="d-flex justify-content-between mb-5">
                        <MDBTypography tag="h5" className="text-uppercase">
                          Total price
                        </MDBTypography>
                        <MDBTypography tag="h5">₹ {total-discount}</MDBTypography>
                      </div>
    
                      <MDBBtn href="/user/order" color="dark" block size="lg">
                        Place order
                      </MDBBtn>
                    </div>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  )}
  </div>
);}