import React,{useEffect,useState,useContext,useRef} from 'react';
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
import axios from 'axios';
import UserContext from '../context/userContext';

export default function EditProfile() {
  const { buyer,setBuyer} = useContext(UserContext);
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [village, setVillage] = useState('');
  const [pincode, setPincode] = useState('');
  
  useEffect(() => {
    if (buyer) {
      setName(buyer.user.first_name || '');
      setMobile(buyer.mobile || '');
      setVillage(buyer.village || '');
      setPincode(buyer.pincode || '');
    }
  }, [buyer]);
  const token = localStorage.getItem('access_token');
  const inputRef = useRef(null);

  const handleClick = () => {inputRef.current.click();};

  const handleFileChange =async (e) => {
    const formData = new FormData();
    formData.append('image',e.target.files[0]);  
    try {
      const response = await axios.put(`http://localhost:8000/updateimage/${buyer.id}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setBuyer(response.data)
      
    } catch (error) {
      if (error.response) {
        console.log('Response data:', error.response.data);
      }
    }
  }
  const handleSave =async (e) => { 
    try {
      const response = await axios.put(`http://localhost:8000/update/${buyer.id}`,{name,mobile,village,pincode}, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }); 
      setBuyer(response.data)

    } catch (error) {
      if (error.response) {
        console.log('Response data:', error.response.data);
      }
    }
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
              <MDBBreadcrumbItem>
                <a href="/user/profile">User</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem active>User Profile</MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>

        <MDBRow>
          
          <MDBCol>
            <MDBCard className="mb-4">
              <MDBCardBody  style={{ padding: '60px' }}>
              <div className="text-center">
                <MDBCardImage
                  src={"http://localhost:8000"+buyer?.image}
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: '150px',height: '150px',border:'5px solid gray' }}
                  fluid />
                <div className="d-flex justify-content-center mb-5">
                <input
                  style={{display: 'none'}}
                  ref={inputRef}
                  type="file"
                  onChange={handleFileChange}
                />
                  <MDBBtn onClick={handleClick}>Change Profile</MDBBtn>
                </div>
              </div>
                <MDBRow >
                  <MDBCol sm="3">
                    <MDBCardText className="font-weight-bold">Full Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                  <input value={name} onChange={(e)=>setName(e.target.value)} className='p-3 w-75' style={{borderRadius:'8px',border:'1px solid gray'}}/>
                  </MDBCol>
                </MDBRow>
                
                <hr />
                
                <MDBRow style={{padding:'10px 0'}}>
                  <MDBCol sm="3">
                    <MDBCardText className="font-weight-bold">Mobile</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                  <input value={mobile} onChange={(e)=>setMobile(e.target.value)} className='p-3 w-75' style={{borderRadius:'8px',border:'1px solid gray'}}/>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow style={{padding:'10px 0'}}>
                  <MDBCol sm="3">
                    <MDBCardText className="font-weight-bold">Address</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                  <input value={village} onChange={(e)=>setVillage(e.target.value)} className='p-3 w-75' style={{borderRadius:'8px',border:'1px solid gray'}}/>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow style={{padding:'10px 0'}}>
                  <MDBCol sm="3">
                    <MDBCardText className="font-weight-bold">Pincode</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                  <input value={pincode} onChange={(e)=>setPincode(e.target.value)} className='p-3 w-75' style={{borderRadius:'8px',border:'1px solid gray'}}/>
                  </MDBCol>
                </MDBRow>
                <hr />
                <div className="d-flex justify-content-center">
                  <MDBBtn onClick={handleSave}>save</MDBBtn>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}