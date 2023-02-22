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
import Logo from "./img/LOGO.png";
import { useParams } from 'react-router-dom';


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
    const [data_pricetotal45, setdata_pricetotal45] = useState('');
    const [data_pricetotal55, setdata_pricetotal55] = useState('');
    const [data_pricetotalAll, setdata_pricetotalAll] = useState('');
    const [data_date, setdata_date] = useState('');

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
                    setdata_pricetotal45(result['data']['data_pricetotal']*45/100)
                    setdata_pricetotal55(result['data']['data_pricetotal']*55/100)
                    setdata_pricetotalAll(result['data']['data_pricetotal'])
                    setdata_date(result['data']['data_date'])
                }
            })
            .catch(error => console.log('error', error));
    }, [data_id])


    const handleSubmit = (event) => {
        event.preventDefault();
      
        var data = new FormData(event.currentTarget);
        
        var  jsonData = {
            data_id: data_id,
            data_shareprice: data.get('data_shareprice'),
            data_depositprice: data.get('data_depositprice'),
            status_id: 3,
        }
      
        if ( (jsonData.data_shareprice && jsonData.data_depositprice && jsonData.status_id ) ==='') {
            alert('เกิดข้อผิดพลาด!! กรุณาเช็คข้อมูลข้อมูล')
          }else{
      
        
        fetch('http://localhost:3333/Editdb_data2', {
            method: 'PUT', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonData),
          })
            .then((response) => response.json())
            .then((data) => {
                console.log(jsonData)
            if(data.status === 'Ok' ) {
                window.location ='/datadisplay'
                alert('ทำรายการเรียบร้อย')
            }else{
                alert('เกิดข้อผิดพลาด!! กรุณาเช็คข้อมูลข้อมูล')
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
                                    ลูกจ้าง%2
                                    </Typography>

                                    {/* <Typography component="h1" variant="h5">
                                        เลขที่รายการ : {data_id}
                                    </Typography> */}
                                    <Typography component="h1" variant="h6">
                                        {(new Date(data_date)).toLocaleTimeString('th-TH', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                            weekday: 'long',
                                        })}
                                    </Typography>


                                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>

                                        <Grid container spacing={2}>

                                            <Grid item xs={12} >
                                                <TextField
                                                    label="ชื่อ"
                                                    variant="filled"
                                                    value={customer_name}
                                                    fullWidth
                                                />
                                            </Grid>

                                            <Grid item xs={12}>
                                                <TextField
                                                    label="จำนวนเงินทั้งหมด"
                                                    variant="filled"
                                                    value={data_pricetotalAll}
                                                    fullWidth
                                                />
                                            </Grid>


                                            <Grid item xs={12} >
                                                <TextField
                                                    label="ช่องแบ่งเอา"
                                                    id='data_shareprice'
                                                    name='data_shareprice'
                                                    onChange={ (e) => setdata_pricetotal45(e.target.value)}
                                                    value={data_pricetotal45}
                                                    type="number"
                                                    color="warning"
                                                    focused
                                                    fullWidth
                                                />
                                            </Grid>

                                            <Grid item xs={12} >
                                                <TextField
                                                    id="data_depositprice"
                                                    name="data_depositprice"
                                                    label="ช่องฝากเอา"
                                                    color="warning"
                                                    onChange={ (e) => setdata_pricetotal55(e.target.value)}
                                                    focused
                                                    fullWidth
                                                    value={data_pricetotal55}
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
                                                <Link href="/datadisplay" variant="body2">
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

