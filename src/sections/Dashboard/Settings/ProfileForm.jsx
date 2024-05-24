import React from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import userService from '../../../services/userService';

const ProfileForm = ({ user, onUserUpdate }) => {
  const handleUpdate = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    try {
      const response = await userService.updateUserNameAndAvatar(formData);
      onUserUpdate({
        ...user,
        displayName: formData.get('displayName'),
        avatar: formData.get('avatar'),
      });
      console.log('User info updated successfully');
    } catch (error) {
      console.error('Failed to update user info', error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleUpdate}
      sx={{
        mt: 4,
        p: 3,
        borderRadius: 2,
        backgroundColor: '#f0dcf4',
        boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',
      }}
    >
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
        Cập nhật thông tin cá nhân
      </Typography>
      <TextField
        fullWidth
        label="Tên hiển thị"
        variant="outlined"
        name="displayName"
        defaultValue={user.displayName}
        margin="normal"
      />
      <input
        accept="image/*"
        type="file"
        name="avatar"
        style={{ display: 'none' }}
        id="avatar-upload"
      />
      <label htmlFor="avatar-upload">
        <Button
          variant="contained"
          color="primary"
          component="span"
          sx={{ mt: 2 }}
        >
          Tải lên ảnh đại diện
        </Button>
      </label>
      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
          Số điện thoại: {user.phoneNumber}
        </Typography>
      </Box>
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
        Lưu thay đổi
      </Button>
    </Box>
  );
};

export default ProfileForm;
