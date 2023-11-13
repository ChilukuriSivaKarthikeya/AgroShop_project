import React,{useContext} from 'react';
import {
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBIcon,
    MDBBtn,
    MDBRipple,
  } from "mdb-react-ui-kit";
  import ProductContext from "../context/ProductContext";

function ItemCard({product}){
    const {wishlist,addWishlist,removeWishlist,addCart}=useContext(ProductContext)
    const isWishlist = (product) => {
        return wishlist.some((item) => item.product.id === product);
      };
  return(
    <MDBCol md="12" lg="4" className="mb-4" key={product.id} >
    <MDBCard>
      <MDBRipple
        rippleColor="light"
        rippleTag="div"
        className="bg-image rounded hover-zoom"
      >
        <MDBCardImage
          src={product && "http://localhost:8000"+product.image}
          fluid
          className="w-100" style={{ height: "250px" }} 
        />
        <div className="mask">
            <div className="d-flex justify-content-end align-items-end m-2">
            <div
          className="bg-light rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
          style={{ width: "35px", height: "35px",cursor: "pointer"}}
        >
        {isWishlist(product.id)?<MDBIcon fas icon="heart" onClick={() => removeWishlist(product.id)} size="lg" style={{ color:'red'}}/>
        :<MDBIcon far icon="heart" size="lg" onClick={() => addWishlist(product.id)}/>}
        </div>
            </div>
          </div>
      </MDBRipple>
      <MDBCardBody>
        <div className="text-reset">
          <h5 className="card-title mb-3">{product.name}</h5>
        </div>
        <div className="text-reset">
          <p>{product.category}</p>
        </div>
        <h6 className="mb-3">
          <strong className="me-2">₹{product.price-product.price*(product.discount/100)}/kg</strong>
          <s>₹{product.price}</s>
          <strong className="ms-2 text-success">{product.discount}% off </strong>
        </h6>
          <MDBBtn className="w-75" onClick={() => addCart(product.id)}>Add to cart</MDBBtn>
          
      </MDBCardBody>
    </MDBCard>
  </MDBCol>
  );
}

export default ItemCard;