// pages/edit/[id].js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Select,
  InputLabel,
  MenuItem
} from '@mui/material';

export default function EditVendor() {
  const router = useRouter();
  const { id } = router.query;
  const [vendor, setVendor] = useState({
    name: '',
    category: '',
    contact: '',
    email: '',
    phone: '',
    address: '',
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    category: '',
    contact: '',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    if (id) {
      fetch(`/api/vendors/${id}`)
        .then((res) => {
          if (res.ok) return res.json();
          throw new Error('Vendor not found');
        })
        .then((data) => setVendor(data))
        .catch((error) => {
          console.error(error);
          router.push('/');
        });
    }
  }, [id]);

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
    const res = await fetch(`/api/vendors/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(vendor),
    });
    if (res.ok) {
      router.push('/');
      alert('Vendor successfully updated!');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: '75px' }}>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Name"
          name="name"
          value={vendor.name}
          onChange={handleChange}
        />
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <InputLabel id="vendor-category">Category</InputLabel>
          <Select
            style={{ width: '50%' }}
            labelId="vendor-category"
            name="category"
            value={vendor.category}
            onChange={handleChange}
            required
          >
            <MenuItem value={'Utensils'}>Utensils</MenuItem>
            <MenuItem value={'Packaging'}>Packaging</MenuItem>
            <MenuItem value={'Containers'}>Containers</MenuItem>
          </Select>
        </Box>
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
          Update Vendor
        </Button>
      </Box>
    </Container>
  );
}
