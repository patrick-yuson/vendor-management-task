import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const MobileContext = createContext();

export const useMobile = () => useContext(MobileContext);

export const MobileProvider = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMedium = useMediaQuery(theme.breakpoints.down('md'));

  const [state, setState] = useState({
    isMobileView: isMobile,
    isMediumView: isMedium
  });

  useEffect(() => {
    setState({
        isMobileView: isMobile,
        isMediumView: isMedium
    });
  }, [isMobile, isMedium])

  return (
    <MobileContext.Provider value={state}>
      {children}
    </MobileContext.Provider>
  );
};
