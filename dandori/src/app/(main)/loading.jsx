import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import zIndex from '@mui/material/styles/zIndex';

export default function Loading() {
  return (
    <div style={styles.background}>
      <CircularProgress sx={{ color: '#F71735' }}/>
    </div>
  );
}

const styles = {
    background: {
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 999,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(236, 236, 236, 1)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  };