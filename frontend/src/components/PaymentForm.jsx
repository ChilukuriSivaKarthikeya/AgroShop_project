import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function ControlledRadioButtonsGroup({payment,setPayment}) {
  
  const handleChange = (event) => {
    event.preventDefault();
    setPayment(event.target.value);
  };

  return (
    <FormControl>
      <FormLabel>Payment Method</FormLabel>
      <RadioGroup
        aria-labelledby="payment"
        name="payment"
        value={payment}
        onChange={handleChange}
      >
        <FormControlLabel value="Online Payment" control={<Radio />} label="Online Payment" />
        <FormControlLabel value="Cash On Delivery" control={<Radio />} label="Cash on Delivery" />
      </RadioGroup>
    </FormControl>
  );
}