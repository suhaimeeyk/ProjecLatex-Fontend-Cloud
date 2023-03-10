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
        fetch("http://localhost:3333/db_catusers")
        .then(res => res.json())
        .then(
          (result) => {
            setItems(result);
            // console.log(result)
          }
        )
    }

    const [Users, setUsers] = useState([]);
        

      useEffect(() => {
        UserGetUsers()
      }, [])


    const UserGetUsers = () => {
        fetch("http://localhost:3333/Users")
        .then(res => res.json())
        .then(
          (result) => {
            setUsers(result);
            // console.log(result)
          }
        )
    }





  const handleSubmit = (event) => {


    event.preventDefault();

    const data = new FormData(event.currentTarget);

    

    

    const  jsonData = {
        customer_name: data.get('customer_name'),
        customer_tel: data.get('customer_tel'),
        catcustomer_id: data.get('catcustomer_id'),
        db_users_id: data.get('db_users_id'),
    }
    console.log(jsonData)

    
    if ( (jsonData.customer_name && jsonData.customer_tel && jsonData.catcustomer_id && jsonData.db_users_id) ==='') {
        alert('??????????????????????????????????????????!! ???????????????????????????????????????????????????????????????')
      }else{

    fetch('http://localhost:3333/Createdb_customer', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      })
        .then((response) => response.json())
        .then((data) => {
        if(data.status === 'Ok' ) {
            window.location ='/Alldb_customer'
            alert('??????????????????????????????????????????????????????????????????????????????????????????')
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
            ???????????????????????????????????????????????????????????????
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} >
                    <TextField
                        autoComplete="given-name"
                        name="customer_name"
                        required
                        fullWidth
                        id="customer_name"
                        label="??????????????????????????????"
                        />
                </Grid>
                <Grid item xs={12} sm={6} >
                    <TextField
                        autoComplete="given-name"
                        name="customer_tel"
                        required
                        fullWidth
                        id="customer_tel"
                        label="????????????????????????"
                        />
                </Grid>
                <Grid item xs={12} sm={6} >
                        <FormControl fullWidth>
                            <InputLabel  name="catcustomer_id" id="catcustomer_id">????????????????????????????????????</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="catcustomer_id"
                            label="????????????????????????????????????"
                            name="catcustomer_id"
                            >
                        {items.results?.map((results,index) => (

                                <MenuItem value={results.catusers_id}>{results.catusers_name}</MenuItem>
                         ))}

                            </Select>
                        </FormControl>
                </Grid>
                
                
                <Grid item xs={12} sm={6} >
                        <FormControl fullWidth>
                                <InputLabel name="db_users_id" id="db_users_id">????????????????????????</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="db_users_id"
                                label="????????????????????????"
                                name="db_users_id"

                                >
                            {Users.results?.map((results,index) => (

                                    <MenuItem value={results.users_id}>{results.users_name}</MenuItem>
                            ))}

                                </Select>
                        </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="?????????????????????????????????????????????????????????."
                    />
                </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              ??????????????????
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/Alldb_customer" variant="body2">
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