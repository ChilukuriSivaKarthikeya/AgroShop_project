import React,{useContext, useEffect,useState} from "react";
import {
  MDBContainer,
  MDBRow,
} from "mdb-react-ui-kit";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import axios from "axios";
import ItemCard from "./ItemCard";
import UserContext from "../context/userContext";

function ProductList() {
  const {query,location}=useContext(UserContext)
  const [products, setProducts] = useState([]);
  const [value, setValue] = React.useState("1");

  const handleChange = (event,newValue) => {
    setValue(newValue);
  }
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get('http://localhost:8000/products/'); 
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    fetchProducts();
  }, []);
  const keys=['name','category']
  const filteredProducts = products.filter((item) => item.location.includes(location));
  const items=filteredProducts.filter((item)=>
    keys.some((key)=>item[key].toLowerCase().includes(query)))
  const vegetableItems = filteredProducts.filter(product => product.category === 'Vegetable');
  const fruitItems = filteredProducts.filter(product => product.category === 'Fruit');
  const flowerItems = filteredProducts.filter(product => product.category === 'Flower');
  const grainItems = filteredProducts.filter(product => product.category === 'Grain');
  return (
    
    <MDBContainer fluid className="my-5 text-center">
      {! filteredProducts.length ?<h4 className="text-danger">No seller on your location</h4> :(!items.length ?<h4 className="text-danger">No item found</h4>:<>
      <h4 className="my-2">
        <strong>Featured Products</strong>
      </h4>
      <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" centered>
            <Tab label="ALL" value="1" />
            <Tab label="VEGETABLES" value="2" />
            <Tab label="FRUITS" value="3" />
            <Tab label="FLOWERS" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <MDBRow>
            {items.map(product => (
            <ItemCard  key={product.id} product={product} />
            ))}
          </MDBRow>
        </TabPanel>
        <TabPanel value="2">
          <MDBRow>
            {
            vegetableItems.map(product => (
              <ItemCard key={product.id} product={product} />
            ))}
          </MDBRow>
        </TabPanel>
        <TabPanel value="3">
        <MDBRow>
          {
            fruitItems.map(product => (
              <ItemCard key={product.id} product={product} />
            ))
          }
         </MDBRow>
        </TabPanel>
        <TabPanel value="4">
        <MDBRow>
          {
            flowerItems.map(product => (
              <ItemCard key={product.id} product={product} />
            ))
          }
          </MDBRow>
        </TabPanel>
      </TabContext>
    </Box>
    </>)}
    </MDBContainer>
    
  );
}
export default ProductList;