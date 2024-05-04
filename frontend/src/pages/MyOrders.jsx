import {
    MDBCard,
    MDBCardBody,
    MDBCardFooter,
    MDBCardHeader,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBRow,
    MDBTypography,
  } from "mdb-react-ui-kit";
  import React,{useEffect, useState} from "react";
  import axios from "axios";
  import '../App.css'
import Spinner from "../components/Spinner";
  
  export default function MyOrder() {
    const [orders,setOrders]=useState([])
    const [loading,setLoading]=useState(true)
    const renderStatus = (status) => {
      switch (status) {
        case 'pending':
          return <span>Pending</span>;
        case 'placed':
          return (<><span className="d-flex justify-content-center align-items-center big-dot  dot"><MDBIcon icon="dolly text-white" /></span>
                 <hr className={`flex-fill track-line1`} />
                 <span className="d-flex justify-content-center align-items-center dot"><MDBIcon fas icon="shipping-fast text-white" /></span>
                 <hr className={`flex-fill track-line2`} />
                 <span className="d-flex justify-content-center align-items-center dot"><MDBIcon icon="home text-white" /></span>
                 </>);
        case 'shipped':
                  return (<><span className="d-flex justify-content-center align-items-center big-dot  dot"><MDBIcon icon="dolly text-white" /></span>
                  <hr className={`flex-fill track-line`} />
                  <span className="d-flex justify-content-center align-items-center big-dot dot"><MDBIcon fas icon="shipping-fast text-white" /></span>
                  <hr className={`flex-fill track-line1`} />
                  <span className="d-flex justify-content-center align-items-center dot"><MDBIcon icon="home text-white" /></span>
                  </>);
        case 'delivered':
                return (<><span className="d-flex justify-content-center align-items-center big-dot  dot"><MDBIcon icon="dolly text-white" /></span>
                <hr className={`flex-fill track-line`} />
                <span className="d-flex justify-content-center align-items-center big-dot dot"><MDBIcon fas icon="shipping-fast text-white" /></span>
                <hr className={`flex-fill track-line`} />
                <span className="d-flex justify-content-center align-items-center big-dot dot"><MDBIcon icon="home text-white" /></span>
                </>);
        default:
          return null;
      }
    };
  
  
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:8000/MyOrders/', {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
              },
            });
            setOrders(response.data)
            setLoading(false)
          } catch (error) {
            setLoading(false)
            console.error('Error:', error);
            if (error.response) {
              console.log('Response data:', error.response.data.error);
            }
          }
        };
        fetchData();
    }, []);
    if(loading){
      return <Spinner/>
    }
    return (
      <>
      { orders.map((order)=>(
         <section
         className="h-100 gradient-custom"
         style={{ backgroundColor: "#eee" }}
       >
         <MDBContainer className="py-5 h-100">
           <MDBRow className="justify-content-center align-items-center h-100">
             <MDBCol lg="10" xl="12">
               <MDBCard style={{ borderRadius: "10px" }}>
                 <MDBCardHeader className="px-4 py-3">
                   <MDBTypography tag="h5" className="text-muted mb-0">
                     Thanks for your Order,{" "}
                     <span style={{ color: "#a8729a" }}>{order.user.first_name}</span>!
                   </MDBTypography>
                 </MDBCardHeader>
                 <MDBCardBody className="p-4">
                   <div className="d-flex justify-content-between align-items-center mb-4">
                     <p
                       className="lead fw-normal mb-0"
                       style={{ color: "#a8729a" }}
                     >
                       Receipt
                     </p>
                     <p className="small text-muted mb-0">
                       Receipt Voucher : 1KAU9-84UIL
                     </p>
                   </div>
                   <MDBCard className="shadow-0 border mb-4">
                    <MDBCardBody>
                  { order.orderItems.map(item=>(
                  
                    <MDBRow className="d-flex flex-row justify-content-between align-items-center my-3" >
                      <MDBCol className="text-center">
                        <MDBCardImage
                          src={"http://localhost:8000"+item?.product.image}
                          fluid className="rounded-5"
                          alt="Phone"
                          style={{height:"10vh",width:"7vw"}}
                        />
                      </MDBCol>
                      <MDBCol className="text-center"> 
                        <p className="text-muted">{item.product.name}</p>
                      </MDBCol>
                      <MDBCol className="text-center">
                        <p className="text-muted small">Qty: {item.quantity} kg</p>
                      </MDBCol>
                      <MDBCol className="text-center">
                        <p className="text-muted small">₹{item.item_price}</p>
                      </MDBCol>
                    </MDBRow>
                  ))}
                   <hr
                      className="mb-4"
                      style={{ backgroundColor: "#e0e0e0", opacity: 1 }}
                    />
                    <MDBRow className="align-items-center">
                      <MDBCol md="3">
                        <p className="fw-bold text-center mb-0 small">Order status</p>
                      </MDBCol>
                      <MDBCol md="8" className="mx-3">
                        <div className="d-flex flex-row justify-content-between align-items-center align-content-center">
                          {renderStatus(order.status)}
                        </div>
                        {order.status!=='pending' &&
                        <div className="d-flex flex-row justify-content-between align-items-center">
                          <div className="d-flex flex-column align-items-start">
                            <span>Order placed</span>
                          </div>
                          <div className="d-flex flex-column align-items-middle">
                            <span>Shipped</span>
                          </div>
                          <div className="d-flex flex-column align-items-end">
                            <span>Delivered</span>
                          </div>
                        </div>}
                      </MDBCol>
                    </MDBRow>                 
                        </MDBCardBody>
                    </MDBCard>
                  <MDBRow className="d-flex justify-content-between align-items-center">
                    <MDBCol md="4" className="ml-5 mx-5">
                    <p className="text-center fw-bold mb-3">Shipping Details</p>
                    <strong className="text-muted mb-0">{order.shippingAddress[0].firstName+" "+order.shippingAddress[0].lastName}</strong>
                    <p className="text-muted mb-0">{order.shippingAddress[0].addressLine+","}</p>
                    <p className="text-muted mb-0">{order.shippingAddress[0].city+","}</p>
                    <p className="text-muted mb-0">{order.shippingAddress[0].state+"-"+order.shippingAddress[0].pincode}</p>
                    <p className="text-muted mb-0">{"Phone number:"+order.shippingAddress[0].mobile}</p>
                    </MDBCol>
                    <MDBCol md="3" className="mr-5">
                    <p className="text-center fw-bold mb-3">Price Details</p>
                     <p className="d-flex justify-content-between text-muted mb-0">
                       <span className="fw-bold me-4">Price ({order.orderItems.length+" "} items)</span> 
                       <span>₹ {order.totalPrice}</span>
                     </p>
                     
                     <p className="d-flex justify-content-between text-muted mb-0">
                       <span className="fw-bold me-4">Delivery Charges</span> 
                       <span className="text-success">Free</span>
                     </p>
                     <hr className="my-2"/>
                     <p className="d-flex justify-content-between text-muted mb-0">
                       <span className="fw-bold me-4">Total Amount</span> 
                       <strong>₹{order.totalPrice}</strong>
                     </p>
                    </MDBCol>
                    </MDBRow>
                 </MDBCardBody>
                 <MDBCardFooter
                   className="border-0 px-4 py-3"
                   style={{
                     backgroundColor: "#5bb304",
                     borderBottomLeftRadius: "10px",
                     borderBottomRightRadius: "10px",
                   }}
                 >
                   <MDBTypography
                     tag="h5"
                     className="d-flex align-items-center justify-content-start text-white text-uppercase mb-0"
                   >
                     ·{" "+order.paymentmethod}: <span className="h5 mb-0 ms-2">₹{order.totalPrice}</span>
                   </MDBTypography>
                 </MDBCardFooter>
               </MDBCard>
             </MDBCol>
           </MDBRow>
         </MDBContainer>
       </section>
      )) }
        
      </>
    );
  }