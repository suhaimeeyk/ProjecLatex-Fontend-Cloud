import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Background from "./img/1.png";
import Logo from "./img/LOGO.png";
import Swal from 'sweetalert2'



const theme = createTheme();

export default function SignInSide() {

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  
    const jsonData = {
      users_usersname: data.get('users_usersname'),
      users_password: data.get('users_password'),
    };
  
    fetch('https://latexplatform-api.coecore.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => response.json())
      .then((data) => {

        if (data.level === '1') {
          Swal.fire({
            title: 'Login Admin Success..',
            text: 'กำลังเดินการเข้าสู่ระบบ',
            icon: 'success',
            timer: 3000, // Display time increased to 8 seconds
            showConfirmButton: false
          });
          localStorage.setItem('token', data.token);
          setTimeout(() => {
            window.location = '/Dashboard';
          }, 3000); // Wait 8 seconds before redirecting

        } else if (data.level === '2') {

          Swal.fire({
            title: 'Login User Success..',
            text: 'กำลังเดินการเข้าสู่ระบบ',
            icon: 'success',
            timer: 3000, // Display time increased to 8 seconds
            showConfirmButton: false
          });
          localStorage.setItem('token', data.token);
          setTimeout(() => {
            window.location = '/user/DashboardUser';
          }, 3000); // Wait 8 seconds before redirecting
          
        } else {

          Swal.fire({
            title: 'Login Error!',
            text: 'รหัสผ่านไม่ถูกต้อง!! กรุณาตรวจสอบ',
            icon: 'error',
            confirmButtonText: 'OK'
          });
          
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  





  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${Background})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box
              component="img"
              sx={{
                height: 150,
              }}
              alt="Your logo."
              src={Logo}
            />
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="users_usersname"
                label="Email Address"
                name="users_usersname"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="users_password"
                label="Password"
                type="password"
                id="users_password"
                autoComplete="current-password"
              />
              {/* <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>

              <Grid container>
                <Grid item xs>
                  <Link href="/" variant="body2">
                    Back
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/Register" variant="body2">
                    {"Create Register"}
                  </Link>
                </Grid>
              </Grid>


            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}