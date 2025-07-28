import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const Loader = ({ children }) => {
  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '16px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        maxWidth: '600px',
        margin: '20px auto',
      }}
    >
      <CircularProgress size={36} thickness={5} />
      <h2
        style={{
          margin: 0,
          fontWeight: '500',
          fontSize: '1.25rem',
          color: '#555',
        }}
      >
        {children}
      </h2>
    </div>
  );
};

export default Loader;
