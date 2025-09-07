import React from 'react';
import router from './routes/router';
import { RouterProvider } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

function App() {
  return (
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={3000}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center', // you can change to 'left' or 'right'
      }}
    >
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </SnackbarProvider>
  );
}

export default App;
