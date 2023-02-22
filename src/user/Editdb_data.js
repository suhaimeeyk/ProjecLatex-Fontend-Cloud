import React, { useState, useEffect } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Logo from "../img/LOGO.png";
import { useParams } from 'react-router-dom';


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


const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const mdTheme = createTheme();



function DashboardContent() {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };


    const { data_id } = useParams();

    const [customer_name, setcustomer_name] = useState('');
    const [catwithdraw_name, setcatwithdraw_name] = useState('');
    const [data_totalgallon, setdata_totalgallon] = useState('');
    const [data_wgallon, setdata_wgallon] = useState('');
    const [data_disgallon, setdata_disgallon] = useState('');

    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("http://localhost:3333/Editdb_data/" + data_id, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result['status'] === 'Ok') {

                    setcustomer_name(result['data']['customer_name'])
                    setcatwithdraw_name(result['data']['catwithdraw_name'])
                    setdata_totalgallon(result['data']['data_totalgallon'])
                    setdata_wgallon(result['data']['data_wgallon'])
                    setdata_disgallon(result['data']['data_disgallon'])
                }
            })
            .catch(error => console.log('error', error));
    }, [data_id])


    const handleSubmit = (event) => {
        event.preventDefault();

        var data = new FormData(event.currentTarget);

        var jsonData = {
            data_id: data_id,
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

        if ((jsonData.data_usersid && jsonData.cat_id && jsonData.inputpercent && jsonData.data_totalgallon && jsonData.data_wgallon && jsonData.data_disgallon && jsonData.data_dryrubber && jsonData.data_price && jsonData.data_pricetotal) === '') {
            alert('เกิดข้อผิดพลาด!! กรุณาเช็คข้อมูลข้อมูล')
        } else {


            fetch('http://localhost:3333/EditUserdb_data', {
                method: 'PUT', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jsonData),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(jsonData)
                    if (data.status === 'Ok') {
                        window.location = '/user/datadisplay'
                        alert('แก้ไขรายการเรียบร้อย')
                    } else {
                        alert('เกิดข้อผิดพลาด!! กรุณาเช็คข้อมูลข้อมูล')
                    }

                })
                .catch((error) => {
                    console.error('Error:', error);
                });
                console.log(jsonData)
        }
    };

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

    const [db_customer, setdb_customer] = useState([]);


    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };


        fetch("http://localhost:3333/db_dataSelect/" + users_id, requestOptions)
            .then(res => res.json())
            .then((result) => {
                setdb_customer(result);
                // console.log(result)
            }
            )
    }, [users_id])


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


    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            Dashboard
                        </Typography>
                        <IconButton color="inherit">
                            <Badge badgeContent={4} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                    </Toolbar>
                </AppBar>

                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav">
                        {mainListItems}
                        <Divider sx={{ my: 1 }} />
                        {secondaryListItems}
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >

                    <Container maxWidth="lg" sx={{ mt: 11, mb: 5 }}>
                        <Paper >
                            {/* EditUser */}
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
                                        {/* <LockOutlinedIcon /> */}
                                    </Avatar>
                                    <Typography component="h1" variant="h5">
                                        แก้ไขรายการขายน้ำยาง
                                    </Typography>

                                    <Box component="form" name="frmMain" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>

                                        <Grid container spacing={2}>

                                            <Grid item xs={12} sm={6} >

                                                <TextField
                                                    label="ชื่อ"
                                                    variant="filled"
                                                    value={customer_name}
                                                    InputProps={{
                                                        shrink: true,
                                                        readOnly: true,
                                                    }}
                                                    fullWidth
                                                />
                                            </Grid>

                                            <Grid item xs={12} sm={6} >

                                                <FormControl
                                                    fullWidth
                                                    color="warning"
                                                    focused>
                                                    <InputLabel
                                                        name="data_usersid"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        id="data_usersid"
                                                    >แก้ชื่อ</InputLabel>
                                                    <Select
                                                        id="data_usersid"
                                                        label="แก้ไขชื่อ"
                                                        name="data_usersid"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}

                                                    >
                                                        {db_customer.data?.map((results, index) => (

                                                            <MenuItem value={results.customer_id}>{results.customer_name}</MenuItem>
                                                        ))}

                                                    </Select>
                                                </FormControl>
                                            </Grid>

                                            <Grid item xs={12} sm={6} >
                                                <TextField
                                                    label="ประเภทการเบิก"
                                                    variant="filled"
                                                    value={catwithdraw_name}
                                                    InputProps={{
                                                        shrink: true,
                                                        readOnly: true,
                                                    }}
                                                    fullWidth
                                                />
                                            </Grid>

                                            <Grid item xs={12} sm={6} >

                                                <FormControl
                                                    fullWidth
                                                    color="warning"
                                                    focused>
                                                    <InputLabel
                                                        name="cat_id"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        id="cat_id"
                                                    >แก้ไขประเภทการเบิก</InputLabel>
                                                    <Select
                                                        id="cat_id"
                                                        label="แก้ไขประเภทการเบิก"
                                                        name="cat_id"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}

                                                    >
                                                        {Users.results?.map((results, index) => (

                                                            <MenuItem value={results.catwithdraw_id} placeholder={catwithdraw_name}>{results.catwithdraw_name}</MenuItem>
                                                        ))}

                                                    </Select>
                                                </FormControl>
                                            </Grid>

                                            <Grid item xs={12} sm={6} >
                                                <TextField
                                                    label="น้ำหนักรวมทั้งหมด"
                                                    variant="filled"
                                                    value={data_totalgallon}
                                                    InputProps={{
                                                        shrink: true,
                                                        readOnly: true,
                                                    }}
                                                    fullWidth
                                                />
                                            </Grid>

                                            <Grid item xs={12} sm={6} >
                                                <TextField
                                                    color="warning"
                                                    focused
                                                    id="data_totalgallon"
                                                    label="แก้ไขน้ำหนักรวมทั้งหมด"
                                                    name="data_totalgallon"
                                                    type="number"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    onChange={fncSum} aria-describedby="emailHelp" placeholder=""
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6} >
                                                <TextField
                                                    label="น้ำหนักแกลลอน"
                                                    variant="filled"
                                                    value={data_wgallon}
                                                    InputProps={{
                                                        shrink: true,
                                                        readOnly: true,
                                                    }}
                                                    fullWidth
                                                />
                                            </Grid>

                                            <Grid item xs={12} sm={6} >
                                                <TextField
                                                    id="data_wgallon"
                                                    label="แก้ไขน้ำหนักแกลลอน"
                                                    name="data_wgallon"
                                                    type="number"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    onChange={fncSum} aria-describedby="emailHelp" placeholder=""
                                                    color="warning"
                                                    focused
                                                />
                                            </Grid>

                                            <Grid item xs={12} sm={6} >
                                                <TextField
                                                    label="แก้ไขน้ำหนักหักลบแกลลอน"
                                                    variant="filled"
                                                    value={data_disgallon}
                                                    InputProps={{
                                                        shrink: true,
                                                        readOnly: true,
                                                    }}
                                                    fullWidth
                                                />
                                            </Grid>

                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    id="data_disgallon"
                                                    label="แก้ไขน้ำหนักหักลบแกลลอน"
                                                    name="data_disgallon"
                                                    // defaultValue="น้ำหนักรวมทั้งหมด - น้ำหนักแกลลอน"
                                                    fullWidth
                                                    onChange={fncSum} aria-describedby="emailHelp" placeholder="น้ำหนักรวมทั้งหมด - น้ำหนักแกลลอน"
                                                    color="warning"
                                                    InputProps={{
                                                        shrink: true,
                                                    }}
                                                    focused
                                                />
                                            </Grid>


                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    id="inputpercent"
                                                    label="แก้ไขกรอกเปอร์เซ็น"
                                                    name="inputpercent"
                                                    type="number"
                                                    fullWidth
                                                    color="warning"
                                                    focused
                                                    onChange={fncSum2} aria-describedby="emailHelp" placeholder=""
                                                />
                                            </Grid>

                                            <Grid item xs={12} sm={6}>
                                                <FormControl fullWidth color="warning"
                                                    focused>
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

                                            <Grid item xs={12} >
                                                <TextField
                                                    readOnly="true"
                                                    label="น้ำยาแห้ง"
                                                    id="data_dryrubber"
                                                    name="data_dryrubber"
                                                    type="number"
                                                    color="warning"
                                                    focused
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    fullWidth
                                                    onChange={fncSum3}
                                                    aria-describedby="emailHelp" placeholder="น้ำหนักหักลบแกลลอน * กรอกเปอร์เซ็น / 100"

                                                />
                                            </Grid>

                                            <Grid item xs={12} >
                                                <TextField
                                                    id="data_pricetotal"
                                                    label="จำนวนเงินทั้งหมด"
                                                    name="data_pricetotal"
                                                    InputProps={{
                                                        shrink: true,
                                                        readOnly: true,
                                                    }}
                                                    color="warning"
                                                    focused
                                                    fullWidth
                                                    onChange={fncSum3} aria-describedby="emailHelp" placeholder="เปอร์เซ็น * น้ำยาแห้ง"
                                                />
                                            </Grid>

                                        </Grid>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                        >
                                            ยืนยันการแก้ไข
                                        </Button>
                                        <Grid container justifyContent="flex-end">
                                            <Grid item>
                                                <Link href="/user/datadisplay" variant="body2">
                                                    BACK
                                                </Link>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                    <hr />
                                </Box>

                            </Container>
                            {/* EndEditUser */}

                        </Paper>
                    </Container>




                </Box>
            </Box>

        </ThemeProvider>
    );
}

export default function Dashboard() {
    return <DashboardContent />;
}

