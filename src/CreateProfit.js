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

    const totalprofittoday = parseFloat(document.frmMain.totalprofittoday.value);

    const income = parseFloat(document.frmMain.income.value);
    const paydaily = parseFloat(document.frmMain.paydaily.value);
    const endAll = parseFloat(document.frmMain.endAll.value);

    if (isNaN(income) || income === "") {
        document.frmMain.income.focus();
        return;
    }

    if (isNaN(paydaily) || paydaily === "") {
        document.frmMain.paydaily.focus();
        return;
    }
    if (isNaN(endAll) || endAll === "") {
        document.frmMain.endAll.focus();
        return;
    }



    if (totalprofittoday === 0) {
        document.frmMain.totalprofittoday.value = income - paydaily - endAll;
    } else {
        document.frmMain.totalprofittoday.value = income - paydaily - endAll;
    }
}


const theme = createTheme();

export default function SignUp() {

    const [income, setIncome] = useState(0);
    const [paydaily, setPayDaily] = useState(0);
    const [totalprofittoday, setTotalProfitToday] = useState(0);

    const handleIncomeChange = (event) => {
        setIncome(parseFloat(event.target.value));
    };

    const handlePayDailyChange = (event) => {
        setPayDaily(parseFloat(event.target.value));
    };

    useEffect(() => {
        if (!isNaN(income) && !isNaN(paydaily)) {
            setTotalProfitToday(income - paydaily);
        }
    }, [income, paydaily]);

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


    const [items, setItems] = useState([]);

    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };


        fetch("https://latexplatform-api.coecore.com/db_incomeSelect/" + users_id, requestOptions)
            .then(res => res.json())
            .then((result) => {
                setItems(result);
                console.log(result)
            }
            )
    }, [users_id])

    // useEffect(() => {
    //     var requestOptions = {
    //         method: 'GET',
    //         redirect: 'follow'
    //     };


    //     fetch("https://latexplatform-api.coecore.com/db_incomeSelect", requestOptions)
    //         .then(res => res.json())
    //         .then((result) => {
    //             setItems(result);
    //             // console.log(result)
    //         }
    //         )
    // },)


    // const [selectedOption,setSelectedOption] = useState(0);

    const [Users, setUsers] = useState([]);


    // useEffect(() => {
    //     UserGetUsers()
    // }, [])


    // const UserGetUsers = () => {
    //     fetch("https://latexplatform-api.coecore.com/db_paydailySelect")
    //         .then(res => res.json())
    //         .then(
    //             (result) => {
    //                 setUsers(result);
    //                 // console.log(result)
    //             }
    //         )
    // }

    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };


        fetch("https://latexplatform-api.coecore.com/db_paydailySelect/" + users_id, requestOptions)
            .then(res => res.json())
            .then((result) => {
                setUsers(result);
                console.log(result)
            }
            )
    }, [users_id])


    const [db_pricerubbers, setdb_pricerubbers] = useState([]);

    const UserGetdb_pricerubbers = () => {
        fetch("https://latexplatform-api.coecore.com/pay_for_all_latex_db_income")
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
            income: data.get('income'),
            paydaily: data.get('paydaily'),
            totalprofittoday: data.get('totalprofittoday'),
            note: data.get('note'),
            users_id: users_id,
        }
        // console.log(jsonData)
        // profittoday_id	date	paydaily	income	totalprofittoday	note


        if ((jsonData.income && jsonData.paydaily && jsonData.note && jsonData.totalprofittoday) === '') {
            alert('เกิดข้อผิดพลาด!! กรุณาเช็คข้อมูลข้อมูล')
        } else {

            fetch('https://latexplatform-api.coecore.com/Createdatdb_profittoday', {
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
                        สร้างข้อมูกำไรต่อวัน
                    </Typography>
                    <Box component="form" name="frmMain" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>

                        <Grid container spacing={2}>




                            <Grid item xs={12} >



                                <FormControl fullWidth>
                                    <InputLabel name="income" id="income">ผลร่วมรายรับค่าปุ๋ยต่อวัน</InputLabel>

                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="income"
                                        label="ผลร่วมค่าปุ๋ยต่อวัน"
                                        name="income"
                                        onChange={fncSum} aria-describedby="emailHelp" placeholder=""

                                    >
                                        <MenuItem value="0">ค่าเท่ากับ 0</MenuItem>
                                        {items.results?.map((results, index) => (

                                            <MenuItem value={results.total_price}>ค่า {results.total_price} {results.note}  </MenuItem>
                                        ))}



                                    </Select>
                                </FormControl>

                            </Grid>

                            <Grid item xs={12}  >
                                <FormControl fullWidth>
                                    <InputLabel name="paydaily" id="paydaily">ผลร่วมรายจ่ายทั้งหมดต่อวัน</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="paydaily"
                                        label="ผลร่วมรายการเบิกล่วงหน้าต่อวัน"
                                        name="paydaily"
                                        onChange={fncSum} aria-describedby="emailHelp" placeholder=""

                                    >
                                        <MenuItem value="0">ค่าเท่ากับ 0</MenuItem>

                                        {Users.results?.map((results, index) => (

                                            <MenuItem value={results.total_price}>ค่า {results.total_price} {results.note}</MenuItem>
                                        ))}

                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} >

                                <TextField
                                    fullWidth
                                    id="endAll"
                                    label="ค่าอื่นๆ"
                                    name="pay_for_all_latex_db_income"
                                    type="number"
                                    onChange={fncSum} aria-describedby="emailHelp" placeholder=""
                                />

                            </Grid>


                            <Grid item xs={12}>

                                <TextField
                                    id="totalprofittoday"
                                    label="กำไร"
                                    name="totalprofittoday"
                                    defaultValue="รายรับ - รายจ่าย "
                                    variant="filled"
                                    InputProps={{
                                        shrink: true,
                                        readOnly: true,
                                    }}
                                    fullWidth
                                    onChange={fncSum} aria-describedby="emailHelp" placeholder="รายรับ - รายจ่าย - ค่าอื่นๆ"
                                    focused
                                />
                            </Grid>

                            <Grid item xs={12} >

                                <TextField
                                   label="กำไรประจำวัน (ตัวอย่าง: กำไรวันที่ 21/02/2023)"
                                    fullWidth
                                    id="note"
                                    name="note"
                                    type="date"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    placeholder="กำไรประวันที่"
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