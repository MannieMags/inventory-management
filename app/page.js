'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { Button, Typography, Box, Container } from '@mui/material';
import Link from 'next/link';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/dashboard');
      }
    });

    return () => unsubscribe();
  }, [router]);

  return (
    <Box
      sx={{
        height: '100vh',
        backgroundImage: 'url("/kitchen-background.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            padding: 4,
            borderRadius: 2,
            textAlign: 'center',
          }}
        >
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to Pantry Pal
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            Manage your kitchen inventory with ease
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Button
              component={Link}
              href="/signin"
              variant="contained"
              color="primary"
              size="large"
              sx={{ mr: 2 }}
            >
              Sign In
            </Button>
            <Button
              component={Link}
              href="/register"
              variant="outlined"
              color="primary"
              size="large"
            >
              Register
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}



