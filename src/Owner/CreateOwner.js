import React, { useState, useEffect } from 'react';
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
import Logo from "../img/LOGO.png";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useParams } from 'react-router-dom';


function fncSum() {

    const totalprofittoday = parseFloat(document.frmMain.totalprofittoday.value);

    const income = parseFloat(document.frmMain.income.value);

    if (isNaN(income) || income === "") {
        document.frmMain.income.focus();
        return;
    }



    if (totalprofittoday === 0) {
        document.frmMain.totalprofittoday.value = income;
    } else {
        document.frmMain.totalprofittoday.value = income;
    }
}

const theme = createTheme();

export default function SignUp() {

    const [users_id, setusers_id] = useState('');

    useEffect(() => {

        const token = localStorage.getItem('token')
        fetch('https://latexplatform-api.coecore.com/authen', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 'ok') {

                    setusers_id(data.decoded['customer_id'])
                    //   console.log(data.decoded['users_name'])

                } else {
                    alert('authen failed')
                    localStorage.removeItem('token');
                    window.location = '/login'
                    // console.log('asdasdasd')


                }

            })


            .catch((error) => {
                console.error('Error:', error);
            });


    }, [])


    const [items, setItems] = useState([]);

    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };


        fetch("https://latexplatform-api.coecore.com/db_dataALLOwner/" + users_id, requestOptions)
            .then(res => res.json())
            .then((result) => {
                setItems(result);
                console.log(result)
            }
            )
    }, [users_id])

    // const [selectedOption,setSelectedOption] = useState(0);


    const [db_pricerubbers, setdb_pricerubbers] = useState([]);

    const UserGetdb_pricerubbers = () => {
        fetch("https://latexplatform-api.coecore.com/db_pricerubbersSelect")
            .then(res => res.json())
            .then(
                (result) => {
                    setdb_pricerubbers(result);
                    // console.log(result)
                }
            )
    }

    useEffect(() => {
        UserGetdb_pricerubbers()
    }, [])





    const handleSubmit = (event) => {


        event.preventDefault();

        const data = new FormData(event.currentTarget);


        const jsonData = {
            owner_userid: users_id,
            users_id: data.get('users_id'),
            owner_total: data.get('owner_total'),
        }
        console.log(users_id)


        if ((jsonData.users_id && jsonData.owner_total&& jsonData.owner_userid) === '') {
            alert('เกิดข้อผิดพลาด!! กรุณาเช็คข้อมูลข้อมูล')
        } else {

            fetch('https://latexplatform-api.coecore.com/CreateOwner', {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jsonData),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.status === 'Ok') {
                        window.location = '/Owner/OwnerData'
                        alert('สร้างรายการถอนเรียบร้อย')
                        console.log(data)
                    } else {
                        alert('register failed')
                        console.log(data)


                    }


                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }

    };

    // DATE_FORMAT(data_date, '%d/%m/%Y')


    const [selectedCustomerId, setSelectedCustomerId] = useState('');

    const handleCustomerSelect = (event) => {
        setSelectedCustomerId(event.target.value);
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
                        สร้างรายการถอนเงิน
                    </Typography>
                    <Box component="form" name="frmMain" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>

                        <Grid container spacing={2}>





                            <Grid item xs={12} >
                                <FormControl fullWidth>
                                    <InputLabel name="users_id" id="users_id">
                                        ชื่อลูกค้า
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="users_id"
                                        label="ชื่อลูกค้า"
                                        name="users_id"
                  
                                        onChange={handleCustomerSelect}
                                    >
                                        {items.data
                                        ?.map((data, index) => (
                                            <MenuItem value={data.customer_id}>
                                                ชื่อ: {data.customer_name} 
                                            </MenuItem>
                                        ))}

                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>

                                {/* <TextField
                                    id="owner_total"
                                    label="ยอดถอน"
                                    name="owner_total"
                                    type="number"
                                    fullWidth
                                    aria-describedby="emailHelp" placeholder=""
                                /> */}

                                <FormControl fullWidth>
                                    <InputLabel name="owner_total" id="owner_total">
                                        ยอดเงิน
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="owner_total"
                                        label="ยอดเงิน"
                                        name="owner_total"
                                        
                                    >
                                        {items.data
                                            ?.filter((data) => data.customer_id === selectedCustomerId)
                                            .map((data, index) => (
                                                <MenuItem value={data.เงินส่วนคนตัด}>
                                                     ยอดเงิน :{data.เงินส่วนคนตัด} วันที่:{' '}
                                                    {data.data_date}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>

                            </Grid>

                            {/* <Grid item xs={12}>
                    <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="เพิ่มข้อมูล."
                    />
                </Grid> */}
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
                                <Link href="/Owner/OwnerData" variant="body2">
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