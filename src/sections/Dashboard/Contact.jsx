import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
  Slide,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { faker } from '@faker-js/faker';
import {
  Bell,
  CaretRight,
  Phone,
  Prohibit,
  Star,
  Trash,
  VideoCamera,
  X,
} from 'phosphor-react';
import useResponsive from '../../hooks/useResponsive';
import AntSwitch from '../../components/AntSwitch';
// import { useDispatch, useSelector } from "react-redux";
// import { ToggleSidebar, UpdateSidebarType } from "../../redux/slices/app";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BlockDialog = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Chặn liên hệ này</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Bạn có chắc chắn muốn chặn liên hệ này?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Hủy</Button>
        <Button onClick={handleClose}>Đồng ý</Button>
      </DialogActions>
    </Dialog>
  );
};

const DeleteChatDialog = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>Xóa cuộc trò chuyện này</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Bạn có chắc chắn muốn xóa cuộc trò chuyện này không?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Hủy</Button>
        <Button onClick={handleClose}>Đồng ý</Button>
      </DialogActions>
    </Dialog>
  );
};

const Contact = () => {
  // const dispatch = useDispatch();

  // const {current_conversation} = useSelector((state) => state.conversation.direct_chat);

  const theme = useTheme();

  const isDesktop = useResponsive('up', 'md');

  const [openBlock, setOpenBlock] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleCloseBlock = () => {
    setOpenBlock(false);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const sideBar = {
    open: true,
    type: 'CONTACT',
  };
  return (
    <Box sx={{ width: !isDesktop ? '100vw' : 320, maxHeight: '100vh' }}>
      <Stack sx={{ height: '100%' }}>
        <Box
          sx={{
            boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.25)',
            width: '100%',
            backgroundColor:
              theme.palette.mode === 'light'
                ? '#F8FAFF'
                : theme.palette.background,
          }}
        >
          <Stack
            sx={{ height: '100%', p: 2 }}
            direction="row"
            alignItems={'center'}
            justifyContent="space-between"
            spacing={3}
          >
            <Typography variant="subtitle2">Thông tin liên lạc</Typography>
            <IconButton
            // onClick={() => {
            //   // dispatch(ToggleSidebar());
            // }}
            >
              <X />
            </IconButton>
          </Stack>
        </Box>
        <Stack
          sx={{
            height: '100%',
            position: 'relative',
            flexGrow: 1,
            overflow: 'scroll',
          }}
          p={3}
          spacing={3}
        >
          <Stack alignItems="center" direction="row" spacing={2}>
            <Avatar
              src={current_conversation?.img}
              alt={current_conversation?.name}
              sx={{ height: 64, width: 64 }}
            />
            <Stack spacing={0.5}>
              <Typography variant="article" fontWeight={600}>
                {current_conversation?.name}
              </Typography>
              <Typography variant="body2" fontWeight={500}>
                {'+91 62543 28 739'}
              </Typography>
            </Stack>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent={'space-evenly'}
          >
            <Stack alignItems={'center'} spacing={1}>
              <IconButton>
                <Phone />
              </IconButton>

              <Typography variant="overline">Ghi âm</Typography>
            </Stack>
            <Stack alignItems={'center'} spacing={1}>
              <IconButton>
                <VideoCamera />
              </IconButton>
              <Typography variant="overline">Video</Typography>
            </Stack>
          </Stack>
          <Divider />
          <Stack spacing={0.5}>
            <Typography variant="article" fontWeight={600}>
              Về
            </Typography>
            <Typography variant="body2" fontWeight={500}>
              {current_conversation?.about}
            </Typography>
          </Stack>
          <Divider />
          <Stack
            direction="row"
            alignItems="center"
            justifyContent={'space-between'}
          >
            <Typography variant="subtitle2">Media, Links & Docs</Typography>
            <Button
              // onClick={() => {
              //   dispatch(UpdateSidebarType("SHARED"));
              // }}
              endIcon={<CaretRight />}
            >
              401
            </Button>
          </Stack>
          <Stack direction={'row'} alignItems="center" spacing={2}>
            {[1, 2, 3].map((el) => (
              <Box>
                <img src={faker.image.city()} alt={faker.internet.userName()} />
              </Box>
            ))}
          </Stack>
          <Divider />
          <Stack
            direction="row"
            alignItems="center"
            justifyContent={'space-between'}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <Star size={21} />
              <Typography variant="subtitle2">
                Tin nhắn được gắn dấu sao
              </Typography>
            </Stack>

            <IconButton
            // onClick={() => {
            //   dispatch(UpdateSidebarType("STARRED"));
            // }}
            >
              <CaretRight />
            </IconButton>
          </Stack>
          <Divider />
          <Stack
            direction="row"
            alignItems="center"
            justifyContent={'space-between'}
          >
            <Stack direction="row" alignItems="center" spacing={2}>
              <Bell size={21} />
              <Typography variant="subtitle2">Tắt tiếng thông báo</Typography>
            </Stack>

            <AntSwitch />
          </Stack>
          <Divider />
          <Typography variant="body2">1 nhóm chung</Typography>
          <Stack direction="row" alignItems={'center'} spacing={2}>
            <Avatar src={faker.image.imageUrl()} alt={faker.name.fullName()} />
            <Stack direction="column" spacing={0.5}>
              <Typography variant="subtitle2">Camel’s Gang</Typography>
              <Typography variant="caption">
                Owl, Parrot, Rabbit , Bạn
              </Typography>
            </Stack>
          </Stack>
          <Divider />
          <Stack direction="row" alignItems={'center'} spacing={2}>
            <Button
              onClick={() => {
                setOpenBlock(true);
              }}
              fullWidth
              startIcon={<Prohibit />}
              variant="outlined"
            >
              Chặn
            </Button>
            <Button
              onClick={() => {
                setOpenDelete(true);
              }}
              fullWidth
              startIcon={<Trash />}
              variant="outlined"
            >
              Xóa
            </Button>
          </Stack>
        </Stack>
      </Stack>
      {openBlock && (
        <BlockDialog open={openBlock} handleClose={handleCloseBlock} />
      )}
      {openDelete && (
        <DeleteChatDialog open={openDelete} handleClose={handleCloseDelete} />
      )}
    </Box>
  );
};

export default Contact;
