import React from 'react';
import './LoginPage.module.css';
import Form from '../components/Form/Form';
import Input from '../components/Input/Input';
import { Box, Typography, Container } from '@mui/material';
import TextLink from '../components/TextLink/TextLink';
import Button from '../components/Button/Button';
/**
 * LoginPage component.
 *
 * Renders a centered box with a form containing username and password fields.
 * The form also contains a Sign In button, a Forgot Password link, and a Need
 * a account? Sign Up link.
 *
 * @return {ReactElement} The rendered component.
 */
const LoginPage = () => {
  return (
    <Container maxWidth="sm">
      <Typography
        variant="h4"
        align="center"
        sx={{ color: '#333333', marginBottom: '30px' }}
      >
        Sign In
      </Typography>
      <Form>
        <Box
          sx={{
            padding: '30px',
            borderRadius: '12px',
            boxShadow: 10,
            backgroundColor: '#fff',
          }}
        >
          <Input
            type="text"
            label="Username"
            variant="outlined"
            fullWidth
            required
            sx={{ marginBottom: '20px' }}
          />
          <Input
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            sx={{ marginBottom: '20px' }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ padding: '10px 30px' }}
            btnName="Sign In"
          />
          <Box
            sx={{
              marginTop: '20px',
              display: 'flex',
              justifyContent: 'right',
            }}
          >
            <TextLink text="Forgot Password?" />
          </Box>
          <Box
            sx={{
              marginTop: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TextLink text="Need a account? Sign Up" link="/signup" />
          </Box>
        </Box>
      </Form>
    </Container>
  );
};

export default LoginPage;
