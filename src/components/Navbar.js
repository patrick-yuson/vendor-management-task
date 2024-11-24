import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMobile } from '@/contexts/MobileContext';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import StoreIcon from '@mui/icons-material/Store';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';

const drawerWidth = 240;

export default function Navbar({ mainComponent }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const { isMobileView, isMediumView } = useMobile(); 
  const router = useRouter();

  useEffect(() => {
    if (router.pathname === '/add') {
      setSelectedIndex(1);
    } else if (router.pathname.includes('edit')) {
      setSelectedIndex(2);
    }
  }, [router]);

  const handleItemClick = (index, path) => {
    setSelectedIndex(index);
    router.push(path);
  }

  const handleDrawerClose = () => {
    setIsOpen(false);
  }
  const handleDrawerOpen = () => {
    setIsOpen(true);
  }

  const navItems = [
    {
      text: 'All Vendors',
      path: '/',
      display: true
    },
    {
      text: 'Add Vendor',
      path: '/add',
      display: true
    },
    {
      text: 'Edit Vendor',
      path: '/edit',
      display: false
    }
  ];

  const getIcon = (type) => {
    switch(type) {
      case 'All Vendors':
        // Set icon
        return (
            <StoreIcon />
        );
      case 'Add Vendor':
        return (
            <AddBusinessIcon />
        );
    }
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        sx={{ width: { md: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` } }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerOpen}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {navItems[selectedIndex].text}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        anchor="left"
        variant={isMediumView ? "temporary" : "permanent"}
        open={isOpen}
        onClose={handleDrawerClose}
      >
        <Toolbar>
            <Typography variant="h6" noWrap component="div">
                <strong>EcoWare</strong>
            </Typography>
        </Toolbar>
        <Divider />
        <List>
          {navItems.map((item, index) => (
            <ListItem key={item.text} disablePadding sx={{ display: item.display ? '' : 'none' }}>
              <ListItemButton
                selected={selectedIndex === index}
                onClick={() => handleItemClick(index, item.path)}
              >
                <ListItemIcon>
                  {getIcon(item.text)}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        {/* If mainComponent exists, display it within the bounds of the MUI Drawer */}
        { mainComponent && <div>{mainComponent}</div>}
      </Box>
    </Box>
  );
}
