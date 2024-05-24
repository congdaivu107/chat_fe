// NewPasswordPage.js
import React from 'react';
import { Stack, Typography } from '@mui/material';
import NewPasswordForm from './NewPasswordForm';

const NewPasswordPage = () => {
  return (
    <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
      <Typography variant="h3" paragraph>
        Đặt mật khẩu mới
      </Typography>
      <Typography sx={{ color: 'text.secondary', mb: 5 }}>
        Hãy nhập mật khẩu mới của bạn
      </Typography>
      <NewPasswordForm />
    </Stack>
  );
};

export default NewPasswordPage;
