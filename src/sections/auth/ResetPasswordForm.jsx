import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField, Button, Stack } from '@mui/material';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import localStorageService from '../../services/localStorageService.js';
import authService from '../../services/authService.js';

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

  const ResetPasswordSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .required('Yêu cầu nhập số điện thoại')
      .matches(/^\d{10}$/, 'Số điện thoại phải có 10 chữ số'),
  });

  const methods = useForm({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: { phoneNumber: '' },
  });

  const { handleSubmit, register } = methods;

  const onSubmit = async (data) => {
    setLoading(true);
    const appVerifier = new RecaptchaVerifier('recaptcha-container', {
      size: 'invisible',
    });

    try {
      await authService.login(data);
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        `+84${data.phoneNumber}`,
        appVerifier,
      );
      localStorageService.setValue('phoneNumber', data.phoneNumber);
      localStorageService.setValue(
        'verificationId',
        confirmationResult.verificationId,
      );
      navigate('/auth/verify-otp');
    } catch (error) {
      console.error('Error sending OTP', error);
      // Xử lý lỗi nếu số điện thoại không tồn tại
      if (error.response && error.response.status === 404) {
        alert('Số điện thoại chưa được đăng ký');
      } else {
        alert('Đã xảy ra lỗi. Vui lòng thử lại sau');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <TextField {...register('phoneNumber')} label="Số điện thoại" />
        <div id="recaptcha-container"></div>
        <Button
          variant="contained"
          fullWidth
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Đang gửi...' : 'Gửi yêu cầu'}
        </Button>
      </Stack>
    </form>
  );
};

export default ResetPasswordForm;
