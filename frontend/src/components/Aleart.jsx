import React, { useState,useEffect} from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Aleart({message}) {
    const [open, setOpen]=useState(false)
    useEffect(() => {
        if (message) {
          setOpen(true);
        }
      }, [message]);

    const handleClose = (reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };
    return ( 
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
     );
}

export default Aleart;