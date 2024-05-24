import { useTheme } from '@mui/material/styles';
import { Avatar, Box, IconButton, Stack, Divider } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import AntSwitch from '../../components/AntSwitch';
import useSettings from '../../hooks/useSettings';
import { Nav_Buttons, Nav_Setting } from '../../data';
import { useNavigate } from 'react-router-dom';
import userStore from '../../store/userStore.js';
import UpdateInfoDialog from '../../components/UpdateInfoDialog/index.jsx';
import { useState } from 'react';
import { APP_KEY } from '../../common/constant.jsx';
import localStorageService from '../../services/localStorageService.js';

const getPath = (index) => {
  switch (index) {
    case 0:
      return '/conversations';
    case 1:
      return '/friends';
    default:
      return '/';
  }
};

const SideBar = () => {
  const theme = useTheme();
  const { user } = userStore();
  const navigate = useNavigate();
  const { onToggleMode } = useSettings();
  const [selectedTab, setSelectedTab] = useState(0);

  const handleAvatarClick = () => {
    // Navigate to the profile page
    navigate('/profile');
  };

  const handleLogout = (resp) => {
    localStorageService.setValue(APP_KEY.token, resp.access_token);
    localStorageService.setValue(APP_KEY.refreshToken, resp.refresh_token);
    navigate('/auth/login');
  };

  const handleChangeTab = (index) => {
    setSelectedTab(index);
    if (index === 3) {
      handleLogout();
    } else {
      navigate(getPath(index));
    }
  };

  return (
    <Box
      sx={{
        height: '100vh',
        width: 100,
        backgroundColor:
          theme.palette.mode === 'light'
            ? '#F0F4FA'
            : theme.palette.background.paper,
        boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',
      }}
    >
      <Stack
        py={3}
        alignItems="center"
        justifyContent="space-between"
        sx={{ height: '100%' }}
      >
        <Stack alignItems="center" spacing={4}>
          {user.avatar ? (
            <Avatar
              src={user.avatar}
              onClick={handleAvatarClick}
              sx={{ cursor: 'pointer' }}
            />
          ) : (
            <UpdateInfoDialog />
          )}
          <Stack
            sx={{ width: 'max-content' }}
            direction="column"
            alignItems="center"
            spacing={3}
          >
            {Nav_Buttons.map((el) => (
              <IconButton
                key={el.index}
                onClick={() => handleChangeTab(el.index)}
                sx={{
                  width: 'max-content',
                  color:
                    el.index === selectedTab
                      ? '#ffffff'
                      : theme.palette.mode === 'light'
                      ? '#080707'
                      : theme.palette.text.primary,
                  backgroundColor:
                    el.index === selectedTab
                      ? theme.palette.primary.main
                      : 'transparent',
                  borderRadius: 1.5,
                }}
              >
                {el.icon}
              </IconButton>
            ))}
            <Divider sx={{ width: 48 }} />
            {/* {Nav_Setting.map((el) => (
              <IconButton
                key={el.index}
                onClick={() => handleChangeTab(el.index)}
                sx={{
                  width: 'max-content',
                  color:
                    el.index === selectedTab
                      ? '#ffffff'
                      : theme.palette.mode === 'light'
                      ? '#080707'
                      : theme.palette.text.primary,
                  backgroundColor:
                    el.index === selectedTab
                      ? theme.palette.primary.main
                      : 'transparent',
                  borderRadius: 1.5,
                }}
              >
                {el.icon}
              </IconButton>
            ))} */}
          </Stack>
        </Stack>
        <Stack spacing={4}>
          <AntSwitch
            defaultChecked={theme.palette.mode === 'dark'}
            onChange={onToggleMode}
          />
          {/* Logout Button */}
          <IconButton
            onClick={handleLogout}
            sx={{
              color:
                theme.palette.mode === 'light'
                  ? '#080707'
                  : theme.palette.text.primary,
              position: 'absolute',
              bottom: 60,
            }}
          >
            <LogoutIcon />
          </IconButton>
        </Stack>
      </Stack>
    </Box>
  );
};

export default SideBar;
