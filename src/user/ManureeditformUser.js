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

function fncSum() {

    const manure_total = parseFloat(document.frmMain.manure_total.value);
    const manurePayValue = parseFloat(document.frmMain.manure_pay.value);
    const manurePayNowValue = parseFloat(document.frmMain.manure_payNow.value);

    if (isNaN(manurePayValue) || manurePayValue === "") {
        document.frmMain.manure_pay.focus();
        return;
    }

    if (isNaN(manurePayNowValue) || manurePayNowValue === "") {
        document.frmMain.manure_payNow.focus();
        return;
    }

    if (manurePayValue === 0) {
        document.frmMain.manure_totalNow.value = manure_total - manurePayNowValue;
    } else {
        document.frmMain.manure_totalNow.value = manurePayValue - manurePayNowValue;
    }
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


    const { manure_id } = useParams();

    const [customer_name, setcustomer_name] = useState('');
    const [manure_total, setmanure_total] = useState('');
    const [users_id, setusers_id] = useState('');

    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("http://localhost:3333/Manureeditform/" + manure_id, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result['status'] === 'Ok') {

                    setcustomer_name(result['data']['customer_name'])
                    setmanure_total(result['data']['manure_total'])
                    setusers_id(result['data']['users_id'])
                }
            })
            .catch(error => console.log('error', error));
    }, [manure_id])


    
    const [manure_sumtotal, setmanure_sumtotal] = useState('');

    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("http://localhost:3333/Manureeditformdetail/" + manure_id, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result['status'] === 'Ok') {

                    setmanure_sumtotal(result['data']['manure_sumtotal'])
           
                }
            })
            .catch(error => console.log('error', error));
    }, [manure_id])


    




    const handleSubmit = (event) => {


        event.preventDefault();

        const data = new FormData(event.currentTarget);


        const jsonData = {
            users_id: users_id,
            manure_total: data.get('manure_totalNow'),
            manure_id	: manure_id ,
            manure_sumtotal	: data.get('manure_totalNow'),
            manure_pay	: data.get('manure_payNow'),
            manure_total:manure_total,
        }
        // console.log(jsonData)


        if ((jsonData.manure_id && jsonData.manure_pay ) === '') {
            alert('เกิดข้อผิดพลาด!! กรุณาเช็คข้อมูลข้อมูล')
        } else {

            fetch('http://localhost:3333/editmanure', {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jsonData),
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.status === 'Ok') {
                        window.location = '/Manuredisplay_detailUser/' + manure_id
                        alert('ทำรายการเรียบร้อย')
                        console.log(data)
                    } else {
                        alert('เกิดข้อผิดพลาด')
                        console.log(data)


                    }


                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }






    };

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
                                    ฟอร์มรายการค่าปุ๋ย
                                    </Typography>

                                    {/* <Typography component="h1" variant="h5">
                                        เลขที่รายการ : {manure_id}
                                    </Typography> */}


                                    <Box component="form" name="frmMain" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>

                                        <Grid container spacing={2}>

                                            <Grid item xs={12} >
                                                <TextField
                                                    label="ชื่อ"
                                                    variant="filled"
                                                    value={customer_name}
                                                    fullWidth
                                                />
                                            </Grid>


                                            <Grid item xs={12} >
                                                <TextField
                                                    label="ยอดทั้งหมด"
                                                    variant="filled"
                                                    id='manure_total'
                                                    name='manure_total'
                                                    value={manure_total}
                                                    type="number"
                                                    focused
                                                    fullWidth
                                                />

                                            </Grid>

                                            <Grid item xs={12} >
                                                <TextField
                                                    label="ยอดปัจจุบันทั้งหมด"
                                                    variant="filled"
                                                    id='manure_pay'
                                                    name='manure_pay'
                                                    value={manure_sumtotal ? manure_sumtotal : 0}
                                                    type="number"
                                                    focused
                                                    fullWidth
                                                />

                                            </Grid>

                                            <Grid item xs={12} >

                                                <TextField
                                                fullWidth
                                                    id="manure_payNow"
                                                    label="ยอดที่จ่าย"
                                                    name="manure_payNow"
                                                    type="number"
                                                    onChange={fncSum} aria-describedby="emailHelp" placeholder=""
                                                />

                                            </Grid>

                                            <Grid item xs={12}>

                                                <TextField
                                                    id="manure_totalNow"
                                                    label="ยอดทั้งหมดหลังจ่าย"
                                                    name="manure_totalNow"
                                                    defaultValue="ยอดทั้งหมด - ยอดที่จ่าย"
                                                    variant="filled"
                                                    InputProps={{
                                                        shrink: true,
                                                        readOnly: true,
                                                    }}
                                                    fullWidth
                                                    onChange={fncSum} aria-describedby="emailHelp" placeholder="ยอดทั้งหมด - ยอดที่จ่าย"
                                                    focused
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
                                                <Link href="/user/ManuredisplayUser" variant="body2">
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
