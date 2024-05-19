import React, { useState } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Stack, IconButton, InputAdornment } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import FormProvider, { RHFTextField } from "../../components/hook-form";
import { Eye, EyeSlash } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import authService from "../../services/authService";
import localStorageService from "../../services/localStorageService";
import { APP_KEY } from "../../common/constant";
import {
  auth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "../../firebaseConfig";

export default function RegisterForm() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .required("Phone number is required")
      .matches(/^\d{10}$/, "Phone number must be 10 digits"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
  });

  const defaultValues = {
    phoneNumber: "",
    password: "",
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const resp = await authService.register(data);
      localStorageService.setValue(APP_KEY.token, resp.access_token);
      localStorageService.setValue(APP_KEY.refreshToken, resp.refresh_token);

      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier(
          "recaptcha-container",
          {
            size: "invisible",
            callback: (response) => {
              onSignInSubmit();
            },
          },
          auth
        );
      }

      const phoneNumber = `+84${data.phoneNumber.slice(1)}`;
      const appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          navigate("/auth/verify", { state: { phoneNumber } });
        })
        .catch((error) => {
          console.error("Error during signInWithPhoneNumber", error);
          setError("afterSubmit", { message: error.message });
        });
    } catch (error) {
      console.error("Error during registration", error);
      reset();
      setError("afterSubmit", { message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3} mb={4}>
        <RHFTextField name="phoneNumber" label="Phone number" />
        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <Eye /> : <EyeSlash />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <div id="recaptcha-container"></div>

      <LoadingButton
        fullWidth
        color="inherit"
        size="large"
        type="submit"
        variant="contained"
        loading={isLoading}
        sx={{
          bgcolor: "text.primary",
          color: (theme) =>
            theme.palette.mode === "light" ? "common.white" : "grey.800",
          "&:hover": {
            bgcolor: "text.primary",
            color: (theme) =>
              theme.palette.mode === "light" ? "common.white" : "grey.800",
          },
        }}
      >
        Create Account
      </LoadingButton>
    </FormProvider>
  );
}
