import React, { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const Card = styled(Paper)(({ theme }) => ({
  width: 240,
  height: 140,
  padding: theme.spacing(2),
  textAlign: 'center',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '18px',
  fontWeight: 'bold',
  color: '#333',
  backgroundColor: '#fff',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Light shadow for a card effect
  borderRadius: '8px', // Rounded corners
  border: '1px solid #e0e0e0', // Light border for separation
}));

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalOrders: 0,
    deliveredOrders: 0,
    pendingOrders: 0,
    placedOrders: 0,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('seller_access_token');
        const response = await axios.get('http://localhost:8000/dashboard/', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    fetchDashboardData();
  }, []);

  const { totalOrders, deliveredOrders, pendingOrders, placedOrders } = dashboardData;

  return (
    <Stack
      direction="row"
      spacing={3}
      justifyContent="center"
      alignItems="center"
      sx={{ marginTop: 4, padding: 2 }}
    >
      <Card>
        Total Orders
        <div style={{ fontSize: '28px', marginTop: '8px', color: '#1976d2' }}>{totalOrders}</div>
      </Card>
      <Card>
        Delivered Orders
        <div style={{ fontSize: '28px', marginTop: '8px', color: '#4caf50' }}>{deliveredOrders}</div>
      </Card>
      <Card>
        Pending Orders
        <div style={{ fontSize: '28px', marginTop: '8px', color: '#ff9800' }}>{pendingOrders}</div>
      </Card>
      <Card>
        Placed Orders
        <div style={{ fontSize: '28px', marginTop: '8px', color: '#f44336' }}>{placedOrders}</div>
      </Card>
    </Stack>
  );
};

export default Dashboard;
