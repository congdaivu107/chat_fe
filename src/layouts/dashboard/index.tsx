import React, { useEffect } from "react";
import { Stack } from "@mui/material";
import { Navigate, Outlet } from "react-router-dom";
import useResponsive from "../../hooks/useResponsive";
import SideNav from "./SideNav";

const DashboardLayout = () => {
  const isDesktop = useResponsive("up", "md");
  const isLoggedIn = true;
  // const dispatch = useDispatch();
  // const { user_id } = useSelector((state) => state.auth);
  // const { open_audio_notification_dialog, open_audio_dialog } = useSelector(
  //   (state) => state.audioCall
  // );
  // const { open_video_notification_dialog, open_video_dialog } = useSelector(
  //   (state) => state.videoCall
  // );
  // const { isLoggedIn } = useSelector((state) => state.auth);
  // const { conversations, current_conversation } = useSelector(
  //   (state) => state.conversation.direct_chat
  // );

  // useEffect(() => {
  //   dispatch(FetchUserProfile());
  // }, []);

  // const handleCloseAudioDialog = () => {
  //   dispatch(UpdateAudioCallDialog({ state: false }));
  // };
  // const handleCloseVideoDialog = () => {
  //   dispatch(UpdateVideoCallDialog({ state: false }));
  // };

  if (!isLoggedIn) {
    return <Navigate to={"/auth/login"} />;
  }

  return (
    <>
      <Stack direction="row">
        {isDesktop && (
          // SideBar
          <SideNav />
        )}

        <Outlet />
      </Stack>
      {/* {open_audio_notification_dialog && (
        <AudioCallNotification open={open_audio_notification_dialog} />
      )}
      {open_audio_dialog && (
        <AudioCallDialog
          open={open_audio_dialog}
          handleClose={handleCloseAudioDialog}
        />
      )}
      {open_video_notification_dialog && (
        <VideoCallNotification open={open_video_notification_dialog} />
      )}
      {open_video_dialog && (
        <VideoCallDialog
          open={open_video_dialog}
          handleClose={handleCloseVideoDialog}
        />
      )} */}
    </>
  );
};

export default DashboardLayout;
