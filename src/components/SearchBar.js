import React, { useState } from 'react';
import { Box, TextField } from '@mui/material';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Box 
        sx={{ 
            display: 'flex',
            alignItems: 'center',
            width: '100%',
        }}
    >
        <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
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