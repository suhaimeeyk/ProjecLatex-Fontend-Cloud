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

    const ManureProfit = parseFloat(document.frmMain.ManureProfit.value);
    const RevealProfit = parseFloat(document.frmMain.RevealProfit.value);
    const pay_for_all_latex_Profit = parseFloat(document.frmMain.pay_for_all_latex_Profit.value);
    const pay_subordinates_wages = parseFloat(document.frmMain.pay_subordinates_wages.value);

    if (isNaN(ManureProfit) || ManureProfit === "") {
        document.frmMain.ManureProfit.focus();
        return;
    }

    if (isNaN(RevealProfit) || RevealProfit === "") {
        document.frmMain.RevealProfit.focus();
        return;
    }
    if (isNaN(pay_for_all_latex_Profit) || pay_for_all_latex_Profit === "") {
        document.frmMain.pay_for_all_latex_Profit.focus();
        return;
    }
    if (isNaN(pay_subordinates_wages) || pay_subordinates_wages === "") {
        document.frmMain.pay_subordinates_wages.focus();
        return;
    }

    if (total_price === 0) {
        document.frmMain.total_price.value = ManureProfit + RevealProfit + pay_for_all_latex_Profit + pay_subordinates_wages;
    } else {
        document.frmMain.total_price.value = ManureProfit + RevealProfit + pay_for_all_latex_Profit + pay_subordinates_wages;
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


    //     fetch("http://localhost:3333/ManureProfit/", requestOptions)
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


        fetch("http://localhost:3333/ManureProfit/" + users_id, requestOptions)
            .then(res => res.json())
            .then((result) => {
                setItems(result);
                console.log(result)
            }
            )
    }, [users_id])

    // const [selectedOption,setSelectedOption] = useState(0);

    const [Users, setUsers] = useState([]);

    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };


        fetch("http://localhost:3333/RevealProfit/" + users_id, requestOptions)
            .then(res => res.json())
            .then((result) => {
                setUsers(result);
                console.log(result)
            }
            )
    }, [users_id])


    // useEffect(() => {
    //     UserGetUsers()
    // }, [])


    // const UserGetUsers = () => {
    //     fetch("http://localhost:3333/RevealProfit")
    //         .then(res => res.json())
    //         .then(
    //             (result) => {
    //                 setUsers(result);
    //                 // console.log(result)
    //             }
    //         )
    // }


    // const [db_pricerubbers, setdb_pricerubbers] = useState([]);

    // const UserGetdb_pricerubbers = () => {
    //     fetch("http://localhost:3333/pay_for_all_latex_Profit")
    //         .then(res => res.json())
    //         .then(
    //             (result) => {
    //                 setdb_pricerubbers(result);
    //                 // console.log(result)
    //             }
    //         )
    // }

    // useEffect(() => {
    //     UserGetdb_pricerubbers()
    // }, [])

    const [db_pricerubbers, setdb_pricerubbers] = useState([]);

    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };


        fetch("http://localhost:3333/pay_for_all_latex_Profit/" + users_id, requestOptions)
            .then(res => res.json())
            .then((result) => {
                setdb_pricerubbers(result);
                console.log(result)
            }
            )
    }, [users_id])




    const handleSubmit = (event) => {


        event.preventDefault();

        const data = new FormData(event.currentTarget);


        const jsonData = {
            ManureProfit: data.get('ManureProfit'),
            RevealProfit: data.get('RevealProfit'),
            pay_for_all_latex_Profit: data.get('pay_for_all_latex_Profit'),
            pay_subordinates_wages: data.get('pay_subordinates_wages'),
            total_price: data.get('total_price'),
            note: data.get('note'),
            users_id: users_id,
        }
        // console.log(jsonData)


        if ((jsonData.ManureProfit && jsonData.RevealProfit && jsonData.pay_for_all_latex_Profit && jsonData.pay_subordinates_wages && jsonData.note && jsonData.total_price) === '') {
            alert('เกิดข้อผิดพลาด!! กรุณาเช็คข้อมูลข้อมูล')
        } else {

            fetch('http://localhost:3333/CreatedataProfit', {
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
                        สร้างข้อมูลรายจ่ายต่อวัน
                    </Typography>
                    <Box component="form" name="frmMain" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>

                        <Grid container spacing={2}>

                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel name="pay_for_all_latex_Profit" id="pay_for_all_latex_Profit">ผลร่วมจ่ายค่าน้ำยางต่อวัน</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        label="ผลร่วมจ่ายค่าน้ำยางต่อวัน"
                                        id="pay_for_all_latex_Profit"
                                        name="pay_for_all_latex_Profit"
                                        onChange={fncSum} aria-describedby="emailHelp" placeholder=""
                                    >
                                        <MenuItem value="0">ค่าเท่ากับ 0</MenuItem>

                                        {db_pricerubbers.data?.map((data, index) => (

                                            <MenuItem value={data.ผลร่วมจ่ายค่าน้ำยางต่อวัน}>วันที่ {data.วันที่} ผลร่วมจ่ายค่าน้ำยางต่อวัน {data.ผลร่วมจ่ายค่าน้ำยางต่อวัน}</MenuItem>
                                        ))}

                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} >
                                <FormControl fullWidth>
                                    <InputLabel name="ManureProfit" id="ManureProfit">ผลร่วมค่าปุ๋ยต่อวัน</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="ManureProfit"
                                        label="ผลร่วมค่าปุ๋ยต่อวัน"
                                        name="ManureProfit"
                                        onChange={fncSum} aria-describedby="emailHelp" placeholder=""

                                    >
                                        <MenuItem value="0">ค่าเท่ากับ 0</MenuItem>
                                        {items.data?.map((data, index) => (

                                            <MenuItem value={data.ผลร่วมจ่ายค่าปุ๋ยต่อวัน}>วันที่ {data.วันที่} ผลร่วมค่าปุ๋ย {data.ผลร่วมจ่ายค่าปุ๋ยต่อวัน}</MenuItem>
                                        ))}



                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}  >
                                <FormControl fullWidth>
                                    <InputLabel name="RevealProfit" id="RevealProfit">ผลร่วมรายการเบิกล่วงหน้าต่อวัน</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="RevealProfit"
                                        label="ผลร่วมรายการเบิกล่วงหน้าต่อวัน"
                                        name="RevealProfit"
                                        onChange={fncSum} aria-describedby="emailHelp" placeholder=""

                                    >
                                        <MenuItem value="0">ค่าเท่ากับ 0</MenuItem>

                                        {Users.data?.map((data, index) => (

                                            <MenuItem value={data.ผลร่วมรายการเบิก}>วันที่ {data.วันที่} ผลร่วมรายการเบิก {data.ผลร่วมรายการเบิก}</MenuItem>
                                        ))}

                                    </Select>
                                </FormControl>
                            </Grid>






                            <Grid item xs={12} >

                                <TextField
                                    fullWidth
                                    id="pay_subordinates_wages"
                                    label="จ่ายค่าจ้างลูกน้องต่อวัน"
                                    name="pay_subordinates_wages"
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