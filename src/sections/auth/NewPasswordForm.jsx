import React, { useState } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TextField, Button, Stack } from '@mui/material';
import { getAuth, updatePassword } from 'firebase/auth';

const NewPasswordForm = () => {
  const [isLoading, setLoading] = useState(false);

  const PasswordSchema = Yup.object().shape({
    password: Yup.string()
      .required('Yêu cầu nhập mật khẩu')
      .min(8, 'Mật khẩu cần dài ít nhất 8 ký tự'),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref('password'), null],
      'Mật khẩu xác nhận không khớp',
    ),
  });

  const methods = useForm({
    resolver: yupResolver(PasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  const { handleSubmit, register } = methods;

  const onSubmit = async (data) => {
    setLoading(true);
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      try {
        await updatePassword(user, data.password);
        alert('Mật khẩu đã được thay đổi thành công');
      } catch (error) {
        console.error('Error updating password', error);
      } finally {
        setLoading(false);
      }
    } else {
      console.error('No authenticated user found');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <TextField
          {...register('password')}
          type="password"
          label="Mật khẩu mới"
        />
        <TextField
          {...register('confirmPassword')}
          type="password"
          label="Xác nhận mật khẩu"
        />
        <Button
          variant="contained"
          fullWidth
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Đang thay đổi...' : 'Thay đổi mật khẩu'}
        </Button>
      </Stack>
    </form>
  );
};

export default NewPasswordForm;
