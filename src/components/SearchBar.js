import React, { useState } from 'react';
import { Box, TextField } from '@mui/material';

const SearchBar = ({ onSearch, vendors }) => {
  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();

    // Filter results
    const filteredVendors = vendors.filter((vendor) => 
        vendor.name.toLowerCase().includes(query) ||
        vendor.contact.toLowerCase().includes(query) ||
        vendor.email.toLowerCase().includes(query) ||
        vendor.id.toString().includes(query) ||
        vendor.phone.toString().includes(query) ||
        vendor.address.toString().toLowerCase().includes(query)
    )

    onSearch(filteredVendors);
  };

  return (
    <Box 
        sx={{ 
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            justifyContent: { xs: 'center', sm: 'left' }
        }}
    >
        <TextField
        label="Search"
        variant="outlined"
        onChange={handleSearch}
        sx={{
            width: '400px',
            marginBottom: '20px',
        }}
        />
    </Box>
  );
};

export default SearchBar;