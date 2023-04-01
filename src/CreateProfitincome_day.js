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
import Logo from "./img/LOGO.png";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useParams } from 'react-router-dom';


function fncSum() {

    const total_price = parseFloat(document.frmMain.total_price.value);

    const Manuredb_income = parseFloat(document.frmMain.Manuredb_income.value);
    const Revealdb_income = parseFloat(document.frmMain.Revealdb_income.value);
    const pay_for_all_latex_db_income = parseFloat(document.frmMain.pay_for_all_latex_db_income.value);

    if (isNaN(Manuredb_income) || Manuredb_income === "") {
        document.frmMain.Manuredb_income.focus();
        return;
    }

    if (isNaN(Revealdb_income) || Revealdb_income === "") {
        document.frmMain.Revealdb_income.focus();
        return;
    }
    if (isNaN(pay_for_all_latex_db_income) || pay_for_all_latex_db_income === "") {
        document.frmMain.pay_for_all_latex_db_income.focus();
        return;
    }
    if (total_price === 0) {
        document.frmMain.total_price.value = Manuredb_income + Revealdb_income + pay_for_all_latex_db_income ;
    } else {
        document.frmMain.total_price.value = Manuredb_income + Revealdb_income + pay_for_all_latex_db_income ;
    }
}


const theme = createTheme();

export default function SignUp() {

    const [users_id, setusers_id] = useState('');

    useEffect(() => {

        const token = localStorage.getItem('token')
        fetch('http://localhost:3333/authen', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 'ok') {

                    setusers_id(data.decoded['users_id'])
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


    // const [items, setItems] = useState([]);

    // useEffect(() => {
    //     var requestOptions = {
    //         method: 'GET',
    //         redirect: 'follow'
    //     };


    //     fetch("http://localhost:3333/db_manure_detail/", requestOptions)
    //         .then(res => res.json())
    //         .then((result) => {
    //             setItems(result);
    //             // console.log(result)
    //         }
    //         )
    // },)

    const [items, setItems] = useState([]);

    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };


        fetch("http://localhost:3333/db_manure_detail/" + users_id, requestOptions)
            .then(res => res.json())
            .then((result) => {
                setItems(result);
                console.log(result)
            }
            )
    }, [users_id])

    const [Users, setUsers] = useState([]);

    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };


        fetch("http://localhost:3333/db_reveal_detail/" + users_id, requestOptions)
            .then(res => res.json())
            .then((result) => {
                setUsers(result);
                console.log(result)
            }
            )
    }, [users_id])

    // const [selectedOption,setSelectedOption] = useState(0);

    // const [Users, setUsers] = useState([]);


    // useEffect(() => {
    //     UserGetUsers()
    // }, [])


    // const UserGetUsers = () => {
    //     fetch("http://localhost:3333/db_reveal_detail")
    //         .then(res => res.json())
    //         .then(
    //             (result) => {
    //                 setUsers(result);
    //                 // console.log(result)
    //             }
    //         )
    // }


    const [db_pricerubbers, setdb_pricerubbers] = useState([]);

    const UserGetdb_pricerubbers = () => {
        fetch("http://localhost:3333/pay_for_all_latex_db_income")
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
            Manuredb_income: data.get('Manuredb_income'),
            Revealdb_income: data.get('Revealdb_income'),
            pay_for_all_latex_db_income: data.get('pay_for_all_latex_db_income'),
            total_price: data.get('total_price'),
            note: data.get('note'),
            users_id: users_id,
        }
        // console.log(jsonData)


        if ((jsonData.Manuredb_income && jsonData.Revealdb_income && jsonData.pay_for_all_latex_db_income && jsonData.pay_for_all_latex_db_income && jsonData.note && jsonData.total_price) === '') {
            alert('เกิดข้อผิดพลาด!! กรุณาเช็คข้อมูลข้อมูล')
        } else {

            fetch('http://localhost:3333/Createdatadb_income', {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jsonData),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.status === 'Ok') {
                        window.location = '/Profit'
                        alert('สร้างรายการขายน้ำยางเรียบร้อย')
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
                        สร้างข้อมูลรายรับต่อวัน
                    </Typography>
                    <Box component="form" name="frmMain" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>

                        <Grid container spacing={2}>

                            <Grid item xs={12} >
                                <FormControl fullWidth>
                                    <InputLabel name="Manuredb_income" id="Manuredb_income">ผลร่วมรายรับค่าปุ๋ยต่อวัน</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="Manuredb_income"
                                        label="ผลร่วมค่าปุ๋ยต่อวัน"
                                        name="Manuredb_income"
                                        onChange={fncSum} aria-describedby="emailHelp" placeholder=""

                                    >
                                        <MenuItem value="0">ค่าเท่ากับ 0</MenuItem>
                                        {items.data?.map((data, index) => (

                                            <MenuItem value={data.ผลรวมรายรับค่าปุ๋ยต่อวัน}>วันที่ {data.วันที่} ผลร่วมค่าปุ๋ย {data.ผลรวมรายรับค่าปุ๋ยต่อวัน}</MenuItem>
                                        ))}



                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}  >
                                <FormControl fullWidth>
                                    <InputLabel name="Revealdb_income" id="Revealdb_income">ผลร่วมรายการรับเบิกล่วงหน้าต่อวัน</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="Revealdb_income"
                                        label="ผลร่วมรายการเบิกล่วงหน้าต่อวัน"
                                        name="Revealdb_income"
                                        onChange={fncSum} aria-describedby="emailHelp" placeholder=""

                                    >
                                        <MenuItem value="0">ค่าเท่ากับ 0</MenuItem>

                                        {Users.data?.map((data, index) => (

                                            <MenuItem value={data.ผลร่วมรายการรับเบิกล่วงหน้าต่อวัน}>วันที่ {data.วันที่} ผลร่วมรายการเบิก {data.ผลร่วมรายการรับเบิกล่วงหน้าต่อวัน}</MenuItem>
                                        ))}

                                    </Select>
                                </FormControl>
                            </Grid>



                            <Grid item xs={12} >

                                <TextField
                                    fullWidth
                                    id="pay_for_all_latex_db_income"
                                    label="รับค่าน้ำยางทั้งหมดต่อวัน"
                                    name="pay_for_all_latex_db_income"
                                    type="number"
                                    onChange={fncSum} aria-describedby="emailHelp" placeholder=""
                                />

                            </Grid>


                            <Grid item xs={12}>

                                <TextField
                                    id="total_price"
                                    label="จำนวนเงินทั้งหมด"
                                    name="total_price"
                                    defaultValue="บวกยอดทั้งหมด "
                                    variant="filled"
                                    InputProps={{
                                        shrink: true,
                                        readOnly: true,
                                    }}
                                    fullWidth
                                    onChange={fncSum} aria-describedby="emailHelp" placeholder="บวกยอดทั้งหมด"
                                    focused
                                />
                            </Grid>

                            <Grid item xs={12} >

                                <TextField
                                    fullWidth
                                    id="note"
                                    label="ชื่อรายการจด"
                                    name="note"
                                    type="text"
                                    placeholder="ชื่อรายการจด"
                                />

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
                                <Link href="/Profit" variant="body2">
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