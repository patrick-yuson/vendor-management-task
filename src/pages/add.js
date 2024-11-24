// pages/add.js
import { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
} from '@mui/material';

export default function AddVendor() {
  const [vendor, setVendor] = useState({
    name: '',
    contact: '',
    email: '',
    phone: '',
    address: '',
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    contact: '',
    email: '',
    phone: '',
    address: ''
  });

  const router = useRouter();

  const handleChange = (e) => {
    const field = e.target.name;
    const containsNumbersRegex = /\d/;
    switch(field) {
      case 'contact':
        if (containsNumbersRegex.test(e.target.value)) {
          setFormErrors({
            contact: 'Contact Name may not contain numbers'
          });
        } else {
          setFormErrors({
            contact: ''
          });
        }
        break;
      case 'email':
        // Checks for the pattern: any-case string + '@' + any-case string + '.' + any-case string
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(e.target.value)) {
          setFormErrors({
            email: 'Invalid email address'
          });
        } else {
          setFormErrors({
            email: ''
          });
        }
        break;
      case 'phone':
        const phoneRegex = /^\d{3}-\d{4}$/;
        if (!phoneRegex.test(e.target.value)) {
          setFormErrors({
            phone: 'Invalid phone number'
          });
        } else {
          setFormErrors({
            phone: ''
          });
        }
    }
    setVendor({ ...vendor, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/vendors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(vendor),
    });
    if (res.ok) {
      router.push('/');
    }
  };

  return (
    <Container maxWidth="sm">
      {/* <Typography variant="h4" component="h1" gutterBottom>
        Add New Vendor
      </Typography> */}
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: '75px' }}>
        <Typography />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Name"
          name="name"
          value={vendor.name}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Contact"
          name="contact"
          value={vendor.contact}
          onChange={handleChange}
          error={!!formErrors.contact}
          helperText={formErrors.contact || ''}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={vendor.email}
          onChange={handleChange}
          error={!!formErrors.email}
          helperText={formErrors.email || ''}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Phone"
          name="phone"
          value={vendor.phone}
          onChange={handleChange}
          error={!!formErrors.phone}
          helperText={formErrors.phone || ''}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Address"
          name="address"
          value={vendor.address}
          onChange={handleChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
        >
          Add Vendor
        </Button>
      </Box>
    </Container>
  );
}
