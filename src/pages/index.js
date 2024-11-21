import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useMobile } from '@/contexts/MobileContext';
import {
  Container,
  Typography,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Home() {
  const [vendors, setVendors] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedVendorId, setSelectedVendorId] = useState(null);
  const { isMobileView, isMediumView } = useMobile(); 

  useEffect(() => {
    fetch('/api/vendors')
      .then((res) => res.json())
      .then((data) => setVendors(data));
  }, []);

  const handleClickOpen = (id) => {
    setSelectedVendorId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedVendorId(null);
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/vendors/${selectedVendorId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        // Remove the deleted vendor from the state
        setVendors(vendors.filter((vendor) => vendor.id !== selectedVendorId));
        handleClose();
      } else {
        console.error('Failed to delete the vendor.');
        // Optionally, handle error states here
      }
    } catch (error) {
      console.error('An error occurred while deleting the vendor:', error);
      // Optionally, handle error states here
    }
  };

  return (
    <Container style={{ padding: '0px', marginTop: '75px' }}>
      {/* <Link href="/add" passHref>
        <Button variant="contained" color="primary" style={{ marginBottom: '20px' }}>
          Add Vendor
        </Button>
      </Link> */}
      {isMobileView ?
        vendors.map((vendor) => (
          <Box 
            key={vendor.id} 
            sx={{ 
              border: '1px solid #ddd', 
              borderRadius: 1, 
              mb: 2, 
              p: 2,
            }}
            component={Paper}
          >
            {/* <Box sx={{ textAlign: 'center' }}> */}
            <Box>
              <Typography variant="h6"><strong>{vendor.name}</strong></Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <Typography><strong>Contact:</strong></Typography>
              <Typography>{vendor.contact}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <Typography><strong>Email:</strong></Typography>
              <Typography>{vendor.email}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <Typography><strong>Phone:</strong></Typography>
              <Typography>{vendor.phone}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
              <Typography><strong>Address:</strong></Typography>
              <Typography>{vendor.address}</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'right', alignItems: 'center', mt: '10px' }}>
              <Link href={`/edit/${vendor.id}`} passHref>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  style={{ marginRight: '10px' }}
                >
                  Edit
                </Button>
              </Link>
              <IconButton
                color="secondary"
                onClick={() => handleClickOpen(vendor.id)}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        )) : (
          <TableContainer component={Paper} sx={{ overflowX: 'scroll' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>ID</strong></TableCell>
                  <TableCell><strong>Name</strong></TableCell>
                  <TableCell><strong>Contact</strong></TableCell>
                  <TableCell><strong>Email</strong></TableCell>
                  <TableCell><strong>Phone</strong></TableCell>
                  <TableCell><strong>Address</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {vendors.map((vendor) => (
                  <TableRow key={vendor.id}>
                    <TableCell>{vendor.id}</TableCell>
                    <TableCell>{vendor.name}</TableCell>
                    <TableCell>{vendor.contact}</TableCell>
                    <TableCell>{vendor.email}</TableCell>
                    <TableCell>{vendor.phone}</TableCell>
                    <TableCell>{vendor.address}</TableCell>
                    <TableCell>
                      <Link href={`/edit/${vendor.id}`} passHref>
                        <Button
                          variant="outlined"
                          color="primary"
                          size="small"
                          style={{ marginRight: '10px' }}
                        >
                          Edit
                        </Button>
                      </Link>
                      <IconButton
                        color="secondary"
                        onClick={() => handleClickOpen(vendor.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {vendors.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      No vendors available.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Confirmation Dialog */}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Delete Vendor"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this vendor? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDelete} color="secondary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
    </Container>
  );
}
