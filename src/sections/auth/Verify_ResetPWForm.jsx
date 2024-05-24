import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack, Button } from '@mui/material';
import FormProvider, { RHFTextField } from '../../components/hook-form';
import { useNavigate } from 'react-router-dom';
import { RecaptchaVerifier } from 'firebase/auth';
import { auth, signInWithPhoneNumber } from '../../firebaseConfig';
import localStorageService from '../../services/localStorageService.js';
import { notification } from 'antd';
import authService from '../../services/authService.js';
import { APP_KEY } from '../../common/constant';

export default function OTPVerifyForm() {
  const navigate = useNavigate();
  const [confirmationResult, setConfirmationResult] = useState(null);

  useEffect(() => {
    const phoneNumber = localStorageService.getValue('phoneNumber');

    if (!phoneNumber) {
      navigate('/forgot-password');
    } else {
      sendOtp(phoneNumber);
    }
  }, []);

  const sendOtp = (phoneNumber) => {
    const appVerifier = new RecaptchaVerifier('recaptcha-container', {
      size: 'invisible',
    });

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        setConfirmationResult(confirmationResult);
      })
      .catch((error) => {
        console.error('Error during sign-in:', error);
      });
  };

  const VerifySchema = Yup.object().shape({
    otp: Yup.string()
      .required('Yêu cầu nhập mã OTP')
      .length(6, 'OTP phải có 6 kí tự'),
  });

  const methods = useForm({
    resolver: yupResolver(VerifySchema),
    defaultValues: { otp: '' },
  });

  const { handleSubmit } = methods;

  const onVerifyCodeSubmit = (data) => {
    if (confirmationResult) {
      confirmationResult
        .confirm(data.otp)
        .then((result) => {
          console.log('Người dùng xác minh thành công:', result);
          localStorageService.setValue('verificationId', result.verificationId);
          navigate('/new-password');
        })
        .catch((error) => {
          notification.error({ message: 'Lỗi xác minh mã OTP:', error });
        });
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onVerifyCodeSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="otp" label="OTP" />
        <div id="recaptcha-container"></div>
        <Button
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          sx={{
            mt: 3,
            bgcolor: 'text.primary',
            color: (theme) =>
              theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
            '&:hover': {
              bgcolor: 'text.primary',
              color: (theme) =>
                theme.palette.mode === 'light' ? 'common.white' : 'grey.800',
            },
          }}
        >
          Xác minh
        </Button>
      </Stack>
    </FormProvider>
  );
}
