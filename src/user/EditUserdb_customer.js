import React,{ useState,useEffect } from 'react';
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
import Stack from '@mui/material/Stack';



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

const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem('token');
    window.location ='/login'
    }



function DashboardContent() {


    const [users_name,setusers_name] = useState('');
  
  useEffect(() => {
    const token = localStorage.getItem('token')
    fetch('http://localhost:3333/authen', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ token
        },
      })
        .then((response) => response.json())
        .then((data) => {
            if(data.status === 'ok' ) {

                setusers_name(data.decoded['users_name'])
       


            }else{
                alert('authen failed')
                localStorage.removeItem('token');
                window.location ='../login'
                // console.log('asdasdasd')

                
            }
            
        })

        
        .catch((error) => {
          console.error('Error:', error);
        });


}, [])





  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  
  const { customer_id } = useParams();

  const [customer_name,setcustomer_name] = useState('');
  const [customer_tel,setcustomer_tel] = useState('');
 
  useEffect( () => {
      var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };
        
        fetch("http://localhost:3333/EditUserdb_customer/"+customer_id, requestOptions)
          .then(response => response.json())
          .then(result => {
              if (result['status'] === 'Ok') {
                  
                setcustomer_name(result['data']['customer_name'])
                setcustomer_tel(result['data']['customer_tel'])
              }
          })
          .catch(error => console.log('error', error));
  }, [customer_id])


const handleSubmit = (event) => {
  event.preventDefault();

  var data = new FormData(event.currentTarget);
  
  var  jsonData = {
    customer_id: customer_id,
    customer_name: data.get('customer_name'),
    customer_tel: data.get('customer_tel'),
    catcustomer_id: data.get('catcustomer_id'),
    db_users_id: data.get('db_users_id'),
  }

  if ( (jsonData.customer_name && jsonData.customer_tel && jsonData.catcustomer_id && jsonData.customer_id ) ==='') {
      alert('เกิดข้อผิดพลาด!! กรุณาเช็คข้อมูลข้อมูล')
    }else{

  
  fetch('http://localhost:3333/EditUserdb_customer', {
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
          window.location ='/user/Alldb_customer'
          alert('แก้ไขรายการเรียบร้อย')
      }else{
          alert('เกิดข้อผิดพลาด!! กรุณาเช็คข้อมูลข้อมูล')
      }

      })
      .catch((error) => {
        console.error('Error:', error);
      });

  }
};

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
              Latex Purchasing Platfrom
            </Typography>
            <IconButton color="inherit">
                
            <Stack direction="row" spacing={2}>
             <Button 
               style={{
                borderRadius: 35,
                backgroundColor: "#d50000"
            }}
             variant="contained"  onClick={handleLogout}> {users_name} | Logout</Button>
            </Stack>

              {/* <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge> */}
              
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

            <Container  maxWidth="lg" sx={{ mt: 11, mb: 5 }}> 
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
            แก้ไขรายการสมาชิกลูกค้า
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
                  label="Name"
                  onChange={ (e) => setcustomer_name(e.target.value)}
                  value={customer_name}
                />
              </Grid>
          

           
              <Grid item xs={12} sm={6} >
                <TextField
                  autoComplete="given-name"
                  name="customer_tel"
                  required
                  fullWidth
                  id="customer_tel"
                  label="เบอร์โทร"
                  onChange={ (e) => setcustomer_tel(e.target.value)}
                  value={customer_tel}
                />
              </Grid>
            

            <Grid item xs={12} sm={6} >
                        <FormControl fullWidth>
                            <InputLabel  name="catcustomer_id" id="catcustomer_id">ประเภทลูกค้า</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="catcustomer_id"
                            label="ประเภทลูกค้า"
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
                                <InputLabel name="db_users_id" id="db_users_id">ผุู้ดูแล</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="db_users_id"
                                label="ผุู้ดูแล"
                                name="db_users_id"

                                >
                            {Users.results?.map((results,index) => (

                                    <MenuItem value={results.users_id}>{results.users_name}</MenuItem>
                            ))}

                                </Select>
                        </FormControl>
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
                <Link href="/user/Alldb_customer" variant="body2">
                  BACK 
                </Link>
              </Grid>
            </Grid>
          </Box>
          <hr/>
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

