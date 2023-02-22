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



function fncSum() {

    if (isNaN(
        document.frmMain.data_totalgallon.value) || document.frmMain.data_totalgallon
            .value === "") {
        document.frmMain.data_totalgallon.focus();
        return;
    }

    if (isNaN(document.frmMain.data_wgallon.value) || document.frmMain.data_wgallon.value ===
        "") {
        document.frmMain.data_wgallon.focus();
        return;
    }

    document.frmMain.data_disgallon.value = parseFloat(document.frmMain.data_totalgallon
        .value) - parseFloat(document.frmMain.data_wgallon.value);
}

function fncSum2() {
    if (isNaN(document.frmMain.data_disgallon.value) || document.frmMain.data_disgallon.value ===
        "") {
        document.frmMain.data_disgallon.focus();
        return;
    }

    if (isNaN(document.frmMain.inputpercent.value) || document.frmMain.inputpercent.value ===
        "") {
        document.frmMain.inputpercent.focus();
        return;
    }

    document.frmMain.data_dryrubber.value = parseFloat(document.frmMain.data_disgallon.value) *
        parseFloat(document.frmMain.inputpercent.value) / 100;
}

function fncSum3() {
    if (isNaN(document.frmMain.data_dryrubber.value) || document.frmMain.data_dryrubber.value ===
        "") {
        document.frmMain.data_dryrubber.focus();
        console.log('test1');
        return;
    }

    if (isNaN(
        document.frmMain.data_price.value) || document.frmMain.data_price
            .value === "") {
        document.frmMain.data_price.focus();
        console.log(parseFloat(document.frmMain.data_price.value));

        return;
    }

    document.frmMain.data_pricetotal.value = parseFloat(document.frmMain.data_price.value) * parseFloat(document.frmMain.data_dryrubber.value);

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
                    // console.log(data.decoded['users_name'])

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


        fetch("http://localhost:3333/db_dataSelect/" + users_id, requestOptions)
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
        UserGetUsers()
    }, [])


    const UserGetUsers = () => {
        fetch("http://localhost:3333/db_catwithdraw")
            .then(res => res.json())
            .then(
                (result) => {
                    setUsers(result);
                    // console.log(result)
                }
            )
    }


    const [db_pricerubbers, setdb_pricerubbers] = useState([]);

    const UserGetdb_pricerubbers = () => {
        fetch("http://localhost:3333/db_pricerubbersSelect")
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
            data_usersid: data.get('data_usersid'),
            cat_id: data.get('cat_id'),
            inputpercent: data.get('inputpercent'),
            data_totalgallon: data.get('data_totalgallon'),
            data_wgallon: data.get('data_wgallon'),
            data_disgallon: data.get('data_disgallon'),
            data_dryrubber: data.get('data_dryrubber'),
            data_price: data.get('data_price'),
            data_pricetotal: data.get('data_pricetotal'),
        }
        console.log(jsonData)


        if ((jsonData.data_usersid && jsonData.cat_id && jsonData.inputpercent && jsonData.data_totalgallon && jsonData.data_wgallon && jsonData.data_disgallon && jsonData.data_dryrubber && jsonData.data_price && jsonData.data_pricetotal) === '') {
            alert('เกิดข้อผิดพลาด!! กรุณาเช็คข้อมูลข้อมูล')
        } else {

            fetch('http://localhost:3333/Createdatadisplay', {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jsonData),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.status === 'Ok') {
                        window.location = '/datadisplay'
                        alert('สร้างรายการขายน้ำยางเรียบร้อย')
                        console.log(data)
                    } else {
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
                        สร้างรายการขายน้ำยาง
                    </Typography>
                    <Box component="form" name="frmMain" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>

                        <Grid container spacing={2}>

                            <Grid item xs={12} sm={6} >
                                <FormControl fullWidth>
                                    <InputLabel name="data_usersid" id="data_usersid">ชื่อลูกค้า</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="data_usersid"
                                        label="ชื่อลูกค้า"
                                        name="data_usersid"
                                    >
                                        {items.data?.map((data, index) => (

                                            <MenuItem value={data.customer_id}>{data.customer_name}</MenuItem>
                                        ))}

                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={6} >
                                <FormControl fullWidth>
                                    <InputLabel name="cat_id" id="cat_id">ประเภทการเบิก</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="cat_id"
                                        label="ประเภทการเบิก"
                                        name="cat_id"

                                    >
                                        {Users.results?.map((results, index) => (

                                            <MenuItem value={results.catwithdraw_id}>{results.catwithdraw_name}</MenuItem>
                                        ))}

                                    </Select>
                                </FormControl>
                            </Grid>


                            <Grid item xs={12} sm={6} >

                                <TextField
                                    id="data_totalgallon"
                                    label="น้ำหนักรวมทั้งหมด"
                                    name="data_totalgallon"
                                    type="number"
                                    onChange={fncSum} aria-describedby="emailHelp" placeholder=""
                                />

                            </Grid>

                            <Grid item xs={12} sm={6} >

                                <TextField
                                    id="data_wgallon"
                                    label="น้ำหนักแกลลอน"
                                    name="data_wgallon"
                                    type="number"
                                    // InputLabelProps={{
                                    //     shrink: true,
                                    // }}
                                    onChange={fncSum} aria-describedby="emailHelp" placeholder=""
                                />


                            </Grid>

                            <Grid item xs={12}>

                                <TextField
                                    id="data_disgallon"
                                    label="น้ำหนักหักลบแกลลอน"
                                    name="data_disgallon"
                                    defaultValue="น้ำหนักรวมทั้งหมด - น้ำหนักแกลลอน"
                                    variant="filled"
                                    InputProps={{
                                        shrink: true,
                                        readOnly: true,
                                    }}
                                    fullWidth
                                    onChange={fncSum} aria-describedby="emailHelp" placeholder="น้ำหนักรวมทั้งหมด - น้ำหนักแกลลอน"
                                    focused
                                />
                            </Grid>

                            <Grid item xs={12}>

                                <TextField
                                    id="inputpercent"
                                    label="กรอกเปอร์เซ็น"
                                    name="inputpercent"
                                    type="number"
                                    fullWidth
                                    onChange={fncSum2} aria-describedby="emailHelp" placeholder=""
                                />
                            </Grid>


                            <Grid item xs={12}>
                                <FormControl fullWidth>
                                    <InputLabel name="data_price" id="data_price">เปอร์เซ็น</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        label="เปอร์เซ็น"
                                        id="data_price"
                                        name="data_price"
                                        onChange={fncSum3}
                                    >
                                        {db_pricerubbers.results?.map((results, index) => (

                                            <MenuItem value={results.price}>{results.percent} ราคา {results.price}</MenuItem>
                                        ))}

                                    </Select>
                                </FormControl>
                            </Grid>


                            <Grid item xs={12}>

                                <TextField
                                    readOnly="true"
                                    label="น้ำยาแห้ง"
                                    id="data_dryrubber"
                                    name="data_dryrubber"
                                    // value="data_dryrubber"
                                    type="number"
                                    variant="filled"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    fullWidth
                                    onChange={fncSum3}
                                    aria-describedby="emailHelp" placeholder="น้ำหนักหักลบแกลลอน * กรอกเปอร์เซ็น / 100"
                                    focused
                                />

                            </Grid>



                            <Grid item xs={12}>


                                <TextField
                                    id="data_pricetotal"
                                    label="จำนวนเงินทั้งหมด"
                                    name="data_pricetotal"
                                    defaultValue=""
                                    variant="filled"
                                    InputProps={{
                                        shrink: true,
                                        readOnly: true,
                                    }}
                                    fullWidth
                                    onChange={fncSum3} aria-describedby="emailHelp" placeholder="เปอร์เซ็น * น้ำยาแห้ง"
                                    
                                    focused
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
                                <Link href="/user/datadisplay" variant="body2">
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