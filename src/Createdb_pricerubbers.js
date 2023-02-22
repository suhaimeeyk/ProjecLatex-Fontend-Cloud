import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Logo from "./img/LOGO.png";


const theme = createTheme();


export default function SignUp() {

  const handleSubmit = (event) => {


    event.preventDefault();

    const data = new FormData(event.currentTarget);

    

    const  jsonData = {
        percent: data.get('percent'),
        price: data.get('price')
    }

    
    if ( (jsonData.percent && jsonData.price) ==='') {
        alert('เกิดข้อผิดพลาด!! กรุณาเช็คข้อมูลข้อมูล')
      }else{

    fetch('http://localhost:3333/Createdb_pricerubbers', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      })
        .then((response) => response.json())
        .then((data) => {

        if(data.status === 'Ok' ) {
            window.location ='/Alldb_pricerubbers'
            alert('สร้างรายการราคาน้ำยางเรียบร้อย')
        }else{
            alert('register failed')

        }

    
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }

  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
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
            สร้างรายการราคาน้ำยาง
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} >
                    <TextField
                        autoComplete="given-name"
                        name="percent"
                        required
                        fullWidth
                        id="percent"
                        label="เปอร์เซ็น"
                        />
                </Grid>
                <Grid item xs={12} sm={6} >
                    <TextField
                        autoComplete="given-name"
                        name="price"
                        required
                        fullWidth
                        id="price"
                        label="ราคา"
                        />
                </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="ยอมรับการสร้างบัญชี."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              ยืนยัน
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/Alldb_pricerubbers" variant="body2">
                  BACK
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>

      </Container>
    </ThemeProvider>
  );
}