import React from 'react';
import { Stack, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ResetPasswordForm from '../../sections/auth/ResetPasswordForm';

const ResetPasswordPage = () => {
  return (
    <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
      <Typography variant="h3" paragraph>
        Quên mật khẩu?
      </Typography>
      <Typography sx={{ color: 'text.secondary', mb: 5 }}>
        Hãy nhập số điện thoại của bạn
      </Typography>
      <ResetPasswordForm />

      {/* Đường dẫn quay lại trang đăng nhập */}
      <Link component={RouterLink} to="/login" variant="subtitle2">
        Quay lại đăng nhập
      </Link>
    </Stack>
  );
};

export default ResetPasswordPage;
