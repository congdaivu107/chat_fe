import { Stack, Typography } from '@mui/material';
import VerifyForm from '../../sections/auth/VerifyForm';

// ----------------------------------------------------------------------

export default function VerifyPage() {
  return (
    <Stack spacing={2} sx={{ mb: 5, position: 'relative' }}>
      <Typography variant="h4">Vui lòng xác minh OTP</Typography>
      <Stack direction="row" spacing={0.5}>
        <Typography variant="body2">
          Đã gửi đến số điện thoại của bạn
        </Typography>
      </Stack>
      <VerifyForm />
    </Stack>
  );
}
