import React,{useContext, useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import {Paper,Stepper,Step,StepLabel,Button,Typography } from '@mui/material';
import AddressForm from '../components/AddressForm';
import PaymentForm from '../components/PaymentForm';
import OrderSummary from '../components/orderSummary';
import UserContext from '../context/userContext';
import axios from 'axios';

const steps = ['Shipping address', 'Order Summary', 'Payment'];

function getStepContent(step,handleAddressDataChange,addressData,paymentmethod,setPaymentmethod,setTotal) {
  switch (step) {
    case 0:
      return <AddressForm onAddressDataChange={handleAddressDataChange} data={addressData}/>;
    case 1:
      return <OrderSummary  setAmount={setTotal}/>;
    case 2:
      return <PaymentForm payment={paymentmethod} setPayment={setPaymentmethod}/>;
    default:
      throw new Error('Unknown step');
  }
}

export default function Checkout() {
  const navigate=useNavigate()
  const {buyer, isLoading, error } = useContext(UserContext);
  const [activeStep, setActiveStep] = React.useState(0);
  const [total,setTotal]=useState(0);
  const [paid,setPaid]=useState(false)
  const [paymentmethod,setPaymentmethod]=useState('');
  const [orderId, setOrderId] = useState(null);
  const [addressData, setAddressData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    address: '',
    village: '',
    state: '',
    pincode: '',
  });
  useEffect(() => {
    if (buyer) {
      setAddressData((prevData) => ({
        ...prevData,
        firstName: buyer.user.first_name || '',
        lastName: buyer.user.last_name || '',
        mobile: buyer.mobile || '',
        village: buyer.village || '',
        pincode: buyer.pincode || '',
      }));
    }
  }, [buyer]);

  const handleAddressDataChange = (data) => {
    setAddressData(data);
  };
  
  const handleAddressAction = (e) => {
    e.preventDefault()
    if (
      !addressData.firstName ||
      !addressData.lastName ||
      !addressData.mobile ||
      !addressData.address ||
      !addressData.village ||
      !addressData.state ||
      !addressData.pincode
    ) {
      
      alert('Please fill in all address fields');
      return; 
    }
    setActiveStep(activeStep + 1);
    console.log(addressData)
  };

  const handleOrderSummaryAction = () => {
    setActiveStep(activeStep + 1);
  };
  const key='rzp_test_aZ9Ne3kcPV0i6o';

  const handlePaymentAction = () => {
    axios.get('http://localhost:8000/create_order/', {
        params: {
            amount: total,
        },
    })
    .then((response) => {
        setOrderId(response.data.id);
        
        const options = {
            key: key,
            currency: 'INR',
            name: 'FarmShop',
            description: 'Payment for your service',
            order_id: response.data.id, 
            handler: function (response) {
                if (response.razorpay_payment_id) {
                    setPaid(true)
                    setPaymentmethod('Online Payment')
                    handlePlaceOrderAction();
                } else {
                    alert('payment failure');
                }
            },
        };
        
        const rzp = new window.Razorpay(options);
        rzp.open();
    })
    .catch((error) => {
        console.log(error);
    });
};
const handlePlaceOrderAction = async () => {
  try {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('Access token is missing.');
    }

    await axios.post(
      'http://localhost:8000/placeOrder/',
      { addressData, paid, paymentmethod, total },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }
    );
    navigate('/user/orderplaced');
  } catch (error) {
    if (error.response) {
      console.log('Response data:', error.response.data.error);
    } else {
      console.error('Error:', error);
    }
  }
};


  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  return (
    <React.Fragment>
      <CssBaseline />
      
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>

              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep, handleAddressDataChange,addressData,paymentmethod,setPaymentmethod,setTotal)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

        {activeStep === 0 && (
          <Button variant="contained" onClick={handleAddressAction} sx={{ mt: 3, ml: 1 }}>
            Continue
          </Button>
        )}

        {activeStep === 1 && (
          <Button variant="contained" onClick={handleOrderSummaryAction} sx={{ mt: 3, ml: 1 }}>
            Proceed
          </Button>
        )}

        {activeStep === 2 && (paymentmethod==='Cash On Delivery'?
          <>
          <Button variant="contained" onClick={handlePlaceOrderAction} sx={{ mt: 3, ml: 1 }}>
            Place Order
          </Button></>:
          <Button variant="contained" onClick={handlePaymentAction} sx={{ mt: 3, ml: 1 }}>
          Continue
         </Button>
        )}

          </Box>
        </React.Fragment>
          )}
        </Paper>
      </Container>
    </React.Fragment>
  );
}