import React, { useState,useEffect, useContext} from 'react';
import {
    MDBCard,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBTypography,
    } from "mdb-react-ui-kit";
import ProductContext from "../context/ProductContext";

function OrderSummary({setAmount}) {
    const {cart}=useContext(ProductContext)
    const [total,setTotal]=useState(0)
    const [discount, setDiscount] = useState(0);

useEffect(() => {
    let calculatedTotal = 0;
    let calculatedDiscount = 0;
    cart.forEach(element => {
      calculatedTotal += parseInt(element.product.price*element.quantity);
      calculatedDiscount += (element.product.price*(element.product.discount/100)*element.quantity) ;
    });
    setTotal(calculatedTotal);
    setDiscount(calculatedDiscount);
    setAmount(calculatedTotal-calculatedDiscount);
}, [cart]); 
    return ( 
    <MDBContainer >
    <MDBRow className="justify-content-center align-items-center">  
    <MDBCol>
            <MDBCard className='p-5' style={{ borderRadius: "15px" }}>
              
                <MDBRow className="g-0">
                  <MDBCol lg="12">
                    <div>
                      <div className="d-flex justify-content-between align-items-center mb-5">
                      <MDBTypography tag="h5" className="text-muted">
                          Product Details
                      </MDBTypography>
                        <MDBTypography className="mb-0 text-muted">
                          {cart.length} items
                        </MDBTypography>
                      </div>
                      
                      <MDBRow className="mb-4 d-flex justify-content-between align-items-center">
                        <MDBCol md="5" className="text-center">
                          <MDBTypography tag="h6" className="text-muted mb-1">
                            Product
                          </MDBTypography>  
                        </MDBCol>
                        <MDBCol md="2" lg="2" xl="2" className="text-center">
                          <MDBTypography tag="h6" className="text-muted mb-1">
                            Price
                          </MDBTypography>
                        </MDBCol>
                        <MDBCol md="2"  className="text-center">
                          <MDBTypography tag="h6" className="text-muted mb-1">
                           Kgs
                          </MDBTypography>
                        </MDBCol>
                        <MDBCol md="2"  className="text-center">
                          <MDBTypography tag="h6" className="text-muted mb-1">
                            Total
                          </MDBTypography>
                        </MDBCol>  
                      </MDBRow>
                      {cart.map(item=>(<>
                      <hr className="my-4" />
                      <MDBRow className="mb-4 d-flex justify-content-between align-items-center">
                        <MDBCol md="3" className="text-center">
                          <MDBCardImage
                            src={"http://localhost:8000"+item?.product.image}
                            fluid className="rounded-3"  alt="Cotton T-shirt" />
                        </MDBCol>
                        <MDBCol md="2" className="text-center">
                          <MDBTypography tag="h6" className="text-black mb-1">
                            {item.product.name}
                          </MDBTypography>
                        </MDBCol>
                        <MDBCol md="2" className="text-center">
                          {item.product.price}
                        </MDBCol>
                        <MDBCol md="2" className="text-center">
                          {item.quantity}
                        </MDBCol>
                        <MDBCol md="2" className="text-center">
                           {item.product.price * item.quantity}.00
                        </MDBCol>
                        
                      </MDBRow>
                      </>))}
                      <hr className="my-4" />
                     
                    </div>
                  </MDBCol>
                   
                  </MDBRow>
                  </MDBCard>
                  <MDBCard className='p-5 mt-3' style={{ borderRadius: "15px" }}>
                  <MDBTypography tag="h5" className="text-muted">
                          Price Details
                  </MDBTypography>
                  <hr className="my-3" />
                  <div className="d-flex justify-content-between mb-3">
                        <MDBTypography tag="h6" className="text-uppercase">
                          Price(items {cart.length})
                        </MDBTypography>
                         <MDBTypography tag="h6">₹{total.toFixed(2)}</MDBTypography>
                      </div>
                      <div className="d-flex justify-content-between mb-3">
                        <MDBTypography tag="h6" className="text-uppercase">
                          Discount
                        </MDBTypography>
                        <strong className="ms-2 text-success">-₹{discount.toFixed(2)}</strong>
                      </div>
                      <div className="d-flex justify-content-between">
                        <MDBTypography tag="h6" className="text-uppercase">
                        Delivery charges
                        </MDBTypography>
                        <strong className="ms-2 text-success">Free Delivery</strong>
                      </div>
                      <hr className="my-4" />
    
                      <div className="d-flex justify-content-between mb-3">
                        <MDBTypography tag="h5" className="text-uppercase">
                          Total price
                        </MDBTypography>
                        <MDBTypography tag="h5">₹{(total-discount).toFixed(2)}</MDBTypography>
                      </div>
                      <div className="d-flex justify-content-between mb-3">
                      <strong className=" text-success">You will save ₹{discount} on this order</strong>
                      </div>
                      </MDBCard>
                  
                  </MDBCol>
                  </MDBRow>
                  </MDBContainer>
     );
}

export default OrderSummary;