import React, { useState,useEffect } from 'react';
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

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const theme = createTheme();


export default function SignUp() {


    const [items, setItems] = useState([]);
        

      useEffect(() => {
        UserGet()
      }, [])


    const UserGet = () => {
        fetch("http://localhost:3333/db_level")
        .then(res => res.json())
        .then(
          (result) => {
            setItems(result);
            // console.log(result)
          }
        )
    }




  const handleSubmit = (event) => {


    event.preventDefault();

    const data = new FormData(event.currentTarget);
    

    const  jsonData = {
      users_usersname: data.get('users_usersname'),
      users_password: data.get('users_password'),
      users_name : data.get('users_name'),
      users_tel : data.get('users_tel'),
      level : data.get('level'),
    }

    
    if ( (jsonData.users_usersname && jsonData.users_name && jsonData.users_password && jsonData.users_tel && jsonData.level ) ==='') {
        alert('เกิดข้อผิดพลาด!! กรุณาเช็คข้อมูลข้อมูล')
      }else{

    fetch('http://localhost:3333/register', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      })
        .then((response) => response.json())
        .then((data) => {

        if(data.status === 'Ok' ) {
            window.location ='/Album'
            alert('สร้างบัญชีเรียบร้อย')
        }else{
            alert('เกิดข้อผิดพลาด failed!')

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
            Create Users
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} >

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="users_name"
                  required
                  fullWidth
                  id="users_name"
                  label="Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="users_tel"
                  label="Tell"
                  name="users_tel"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="users_usersname"
                  label="Email Address"
                  name="users_usersname"
                  autoComplete="email"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="users_password"
                  label="Password"
                  type="password"
                  id="users_password"
                  autoComplete="new-password"
                />
              </Grid>

              <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel  name="level" id="level">ประเภทลูกค้า</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="level"
                            label="สถานะ"
                            name="level"
                            >
                        {items.results?.map((results,index) => (

                                <MenuItem value={results.id}>{results.name}</MenuItem>
                         ))}

                            </Select>
                        </FormControl>
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
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/Album" variant="body2">
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