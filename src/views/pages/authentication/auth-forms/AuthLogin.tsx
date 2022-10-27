// third party
import * as Yup from "yup";

import { Box, Button, Divider, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// project imports
import AnimateButton from "@ui-component/extended/AnimateButton";
import { Formik } from "formik";
// assets
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import useScriptRef from "../../../../hooks/useScriptRef";
// material-ui
import { useAppDispatch, useAppSelector } from "@hooks/useReduxToolKit";
import { useTheme } from "@mui/material/styles";
import { doLoginRequest, ILoginPayload } from "@store/actions/auth-action";
import { getAuthSelector } from "@store/selector/auth-selectors";

// ============================|| FIREBASE - LOGIN ||============================ //

const FirebaseLogin = ({ ...others }) => {
  const theme: any = useTheme();
  const scriptedRef = useScriptRef();
  const { isLoading, authChecked, loggedIn, currentUser } = useAppSelector(getAuthSelector);
  const dispatch = useAppDispatch();
  const history = useNavigate();
  // const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  // const customization = useSelector((state: any) => state.themes);
  // const [checked, setChecked] = useState(true);

  // const googleHandler = async () => {
  //   console.error("Login");
  // };
  React.useEffect(() => {
    if (isLoading === false) {
      if (authChecked && loggedIn && currentUser !== null) history("/dashboard/default");
    }
  }, [authChecked, currentUser, history, isLoading, loggedIn]);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };
  const handleSubmit = async (values: any, { setErrors, setStatus, setSubmitting }: any) => {
    try {
      if (scriptedRef.current) {
        const payload: ILoginPayload = {
          username: values.username,
          password: values.password,
        };
        dispatch(doLoginRequest(payload));
        setStatus({ success: true });
        setSubmitting(false);
      }
    } catch (err: any) {
      console.error(err);
      if (scriptedRef.current) {
        setStatus({ success: false });
        setErrors({ submit: err.message });
        setSubmitting(false);
      }
    }
  };
  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12}></Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />

            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
          </Box>
        </Grid>
        <Grid item xs={12} container alignItems="center" justifyContent="center">
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Sign in </Typography>
          </Box>
        </Grid>
      </Grid>

      <Formik
        initialValues={{
          username: "cliff",
          password: "esca888",
          submit: null,
        }}
        validationSchema={Yup.object().shape({
          username: Yup.string().max(255).required("username is required"),
          password: Yup.string().max(255).required("Password is required"),
        })}
        onSubmit={handleSubmit}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
          <form noValidate onSubmit={handleSubmit} {...others}>
            <FormControl fullWidth error={Boolean(touched.username && errors.username)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-username-login">Username</InputLabel>
              <OutlinedInput id="outlined-adornment-username-login" type="text" value={values.username} name="username" onBlur={handleBlur} onChange={handleChange} label="Username" inputProps={{}} />
              {touched.username && errors.username && (
                <FormHelperText error id="standard-weight-helper-text-username-login">
                  {errors.username}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth error={Boolean(touched.password && errors.password)} sx={{ ...theme.typography.customInput }}>
              <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password-login"
                type={showPassword ? "text" : "password"}
                value={values.password}
                name="password"
                onBlur={handleBlur}
                onChange={handleChange}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end" size="large">
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                inputProps={{}}
              />
              {touched.password && errors.password && (
                <FormHelperText error id="standard-weight-helper-text-password-login">
                  {errors.password}
                </FormHelperText>
              )}
            </FormControl>

            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button disableElevation disabled={isLoading} fullWidth size="large" type="submit" variant="contained" color="secondary">
                  Sign in
                </Button>
              </AnimateButton>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default FirebaseLogin;
