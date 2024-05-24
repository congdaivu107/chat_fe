import React, { useEffect, useState } from 'react';
import { Box, CircularProgress, Typography, Container } from '@mui/material';
import userService from '../../../services/userService';
import ProfileForm from '../../../sections/Dashboard/Settings/ProfileForm';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await userService.getUserInfo();
        setUser(userInfo);
      } catch (error) {
        console.error('Failed to fetch user info', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserInfo();
  }, []);

  const handleUserUpdate = (updatedUser) => {
    setUser(updatedUser);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm">
      {user ? (
        <>
          <Box
            sx={{
              my: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <img
              src={user.avatar}
              alt="User Avatar"
              style={{ width: '140px', height: '140px', borderRadius: '50%' }}
            />
            <Typography variant="h5" sx={{ mt: 2, fontWeight: 'bold' }}>
              {user.displayName}
            </Typography>
          </Box>
          <ProfileForm user={user} onUserUpdate={handleUserUpdate} />
        </>
      ) : (
        <Typography variant="h6" color="error">
          Không tải được thông tin người dùng.
        </Typography>
      )}
    </Container>
  );
}
