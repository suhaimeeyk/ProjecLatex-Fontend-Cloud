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
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { mainListItems, secondaryListItems } from './listItems';
import Container from '@mui/material/Container';
// import LineChartComponent from './DashBoard/LineChart';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


import { experimentalStyled as muiStyled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import moment from 'moment';
import 'moment/locale/th';

import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Label,
    ReferenceArea,
    ComposedChart,
    Area,
    ReferenceLine, BarChart, Bar, PieChart, Pie, Sector, Cell
} from "recharts";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));




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

    const [open, setOpen] = React.useState(true); // nacbar
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const [users_name, setusers_name] = useState('');

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

                    setusers_name(data.decoded['users_name'])
                    // console.log(data.decoded['users_name'])

                } else {
                    alert('authen failed')
                    localStorage.removeItem('token');
                    window.location = '../login'
                    // console.log('asdasdasd')


                }

            })


            .catch((error) => {
                console.error('Error:', error);
            });


    }, [])


    const handleLogout = (event) => {
        event.preventDefault();
        localStorage.removeItem('token');
        window.location = '/login'
    }

    const colorsCustomShapeBarChart = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF0000', '#FF00DC', '#001FFF', '#00B148'];



    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;

        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };


    const data3 = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
    ];

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF0000', '#FF00DC', '#001FFF', '#00B148'];


    const RADIAN = Math.PI / 180;

    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>


        );
    };

    const data2 = [
        {
            name: "Page A",
            uv: 4000,
            pv: 2400,
            amt: 2400
        },
        {
            name: "Page B",
            uv: 3000,
            pv: 1398,
            amt: 2210
        },
        {
            name: "Page C",
            uv: 2000,
            pv: 9800,
            amt: 2290
        },
        {
            name: "Page D",
            uv: 2780,
            pv: 3908,
            amt: 2000
        },
        {
            name: "Page E",
            uv: 1890,
            pv: 4800,
            amt: 2181
        },
        {
            name: "Page F",
            uv: 2390,
            pv: 3800,
            amt: 2500
        },
        {
            name: "Page G",
            uv: 3490,
            pv: 4300,
            amt: 2100
        }
    ];



 

    const [db_manure_date, setdb_manure_date] = useState('');


    const [manuredisplayALL, setmanuredisplayALL] = useState('');

    // useEffect(() => {
    //     var requestOptions = {
    //         method: 'GET',
    //         redirect: 'follow'
    //     };

    //     fetch("https://latexplatform-api.coecore.com/db_paydailyALL/", requestOptions)
    //         .then(response => response.json())
    //         .then(result => {
    //             if (result['status'] === 'Ok') {

    //                 setmanuredisplayALL(result['data'])

    //             }
    //         })
    //         .catch(error => console.log('error', error));
    // }, [])

    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };


        fetch("https://latexplatform-api.coecore.com/db_paydailyALL/" + users_id, requestOptions)
            .then(res => res.json())
            .then((result) => {
                if (result['status'] === 'Ok') {

                    setmanuredisplayALL(result['data'])

                }
            })
            .catch(error => console.log('error', error));
    }, [users_id])

    const dateFormat = 'DD/MM/YYYY';


    const [db_dataALL, setdb_dataALL] = useState([]);


    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };


        fetch("https://latexplatform-api.coecore.com/db_dataALL/" + users_id, requestOptions)
            .then(res => res.json())
            .then((result) => {
                if (result['status'] === 'Ok') {

                    setdb_dataALL(result['data'])

                }
            })
            .catch(error => console.log('error', error));
    }, [users_id])


    const [revealdisplayALL, setrevealdisplayALL] = useState([]);

    const UserrevealdisplayALL = () => {
        fetch("https://latexplatform-api.coecore.com/revealdisplayALL")
            .then(res => res.json())
            .then(
                (result) => {
                    setrevealdisplayALL(result['data']);
                    // console.log(result['data'])

                }
            )
    }

    useEffect(() => {
        UserrevealdisplayALL()
    }, [])

    const [db_profittoSelectmouth, setdb_profittoSelectmouth] = useState('');

    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };


        fetch("https://latexplatform-api.coecore.com/db_profittoSelectmouth/" + users_id, requestOptions)
            .then(res => res.json())
            .then((result) => {
                if (result['status'] === 'Ok') {

                    setdb_profittoSelectmouth(result['result'])

                }
            })
            .catch(error => console.log('error', error));
    }, [users_id])

    const [db_profittoSelectyear, setdb_profittoSelectyear] = useState('');

    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };


        fetch("https://latexplatform-api.coecore.com/db_profittoSelectyear/" + users_id, requestOptions)
            .then(res => res.json())
            .then((result) => {
                if (result['status'] === 'Ok') {

                    setdb_profittoSelectyear(result['result'])

                }
            })
            .catch(error => console.log('error', error));
    }, [users_id])




    const data = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];

    const data4 = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];



    const initialData = [
        { name: 1, cost: 4.11, impression: 100 },
        { name: 2, cost: 2.39, impression: 120 },
        { name: 3, cost: 1.37, impression: 150 },
        { name: 4, cost: 1.16, impression: 180 },
        { name: 5, cost: 2.29, impression: 200 },
        { name: 6, cost: 3, impression: 499 },
        { name: 7, cost: 0.53, impression: 50 },
        { name: 8, cost: 2.52, impression: 100 },
        { name: 9, cost: 1.79, impression: 200 },
        { name: 10, cost: 2.94, impression: 222 },
        { name: 11, cost: 4.3, impression: 210 },
        { name: 12, cost: 4.41, impression: 300 },
        { name: 13, cost: 2.1, impression: 50 },
        { name: 14, cost: 8, impression: 190 },
        { name: 15, cost: 0, impression: 300 },
        { name: 16, cost: 9, impression: 400 },
        { name: 17, cost: 3, impression: 200 },
        { name: 18, cost: 2, impression: 50 },
        { name: 19, cost: 3, impression: 100 },
        { name: 20, cost: 7, impression: 100 },
    ];

    const getAxisYDomain = (from, to, ref, offset) => {
        const refData = initialData.slice(from - 1, to);
        let [bottom, top] = [refData[0][ref], refData[0][ref]];
        refData.forEach((d) => {
            if (d[ref] > top) top = d[ref];
            if (d[ref] < bottom) bottom = d[ref];
        });

        return [(bottom | 0) - offset, (top | 0) + offset];
    };

    const initialState = {
        data: initialData,
        left: 'dataMin',
        right: 'dataMax',
        refAreaLeft: '',
        refAreaRight: '',
        top: 'dataMax+1',
        bottom: 'dataMin-1',
        top2: 'dataMax+20',
        bottom2: 'dataMin-20',
        animation: true,
    };


    moment.locale('th');


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
                                    variant="contained" onClick={handleLogout}> {users_name} | Logout</Button>
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

                    {/* เพิ่มเติมตรงนี้ */}
                    <Container>
                        <br></br>
                        <br></br>
                        <br></br>


                        <Grid container spacing={2}>

                            <Grid item xs={12} >
                                <Item>
                                    <Typography variant="h6" gutterBottom >
                                        ยอดรายการขายน้ำยาง
                                    </Typography>
                                    <ResponsiveContainer width="100%" aspect={2}>
                                        <BarChart
                                            width={600}
                                            height={300}
                                            data={db_dataALL}
                                            margin={{
                                                top: 20,
                                                right: 30,
                                                left: 20,
                                                bottom: 5,
                                            }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="customer_name" />
                                            <YAxis dataKey="data_pricetotal"/>
                                            <Bar dataKey="data_pricetotal" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                                                {data.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={colorsCustomShapeBarChart[index % 20]} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </Item>
                            </Grid>

                            {/* <Grid item xs={12} sm={8} md={4}>
                                <Item>
                                    <Typography variant="h6" gutterBottom >
                                        เปอร์เซ็นรายการขายน้ำยาง
                                    </Typography>
                                    <ResponsiveContainer width="100%" aspect={1}>
                                        <PieChart width={400} height={100}>
                                            <Pie
                                                data={db_dataALL}
                                                cx="50%"
                                                cy="50%"
                                                labelLine={false}
                                                label={renderCustomizedLabel}
                                                outerRadius={170}
                                                fill="#8884d8"
                                                dataKey="data_pricetotal"
                                            >

                                                {data.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                        </PieChart>
                                    </ResponsiveContainer>
                                </Item>
                            </Grid>
                             */}

                            <Grid item xs={12} sm={12}>
                                <Item>
                                    <Typography variant="h6" gutterBottom >
                                        กราฟสรุปกำไร/วัน
                                    </Typography>
                                    <ResponsiveContainer width="100%" aspect={2}>
                                        <ComposedChart width={300} height={100} data={manuredisplayALL}>

                                            <XAxis dataKey="ชื่อโน็ต"
                                            />
                                            <YAxis />
                                            <YAxis orientation="right" yAxisId="2" />
                                            <Tooltip />
                                            <CartesianGrid stroke="#f5f5f5" />
                                            <Legend />
                                            <Area label="" type="monotone" dataKey="กำไร" fill="#8884d8" stroke="#8884d8" />

                                            <Bar dataKey="ผลร่วมรายจ่าย" stackId="a" barSize={20} fill="#FF0000" />
                                            <Bar dataKey="ผลร่วมรายรับ" stackId="b" barSize={20} fill="#0FFF00" /> // ผลร่วมค่าปุ๋ย ตัวแปร


                                        </ComposedChart>

                                    </ResponsiveContainer>
                                </Item>
                            </Grid>

                            <Grid item xs={12} sm={12}>
                                <Item>
                                    <Typography variant="h6" gutterBottom >
                                        กราฟสรุปกำไร/เดือน
                                    </Typography>
                                    <ResponsiveContainer width="100%" aspect={2}>
                                        <ComposedChart width={300} height={100} data={db_profittoSelectmouth}>
                                            {/* <XAxis dataKey="db_manure_date" /> */}
                                            <XAxis dataKey="month"
                                            />
                                            <YAxis />
                                            <YAxis orientation="right" yAxisId="2" />
                                            <Tooltip />
                                            <CartesianGrid stroke="#f5f5f5" />
                                            <Legend />
                                            <Area label="" type="monotone" dataKey="กำไรต่อเดือน" fill="#8884d8" stroke="#8884d8" />

                                            <Bar dataKey="รายจ่ายต่อเดือน" stackId="a" barSize={20} fill="#FF0000" />
                                            <Bar dataKey="รายรับต่อเดือน" stackId="b" barSize={20} fill="#0FFF00" /> // ผลร่วมค่าปุ๋ย ตัวแปร


                                        </ComposedChart>

                                    </ResponsiveContainer>
                                </Item>
                            </Grid>

                            {/* <Grid item xs={12} sm={6}>
                                <Item>
                                    <Typography variant="h6" gutterBottom >
                                        กราฟรายการเบิก/จ่าย
                                    </Typography>
                                    <ResponsiveContainer width="100%" aspect={1}>
                                        <BarChart
                                            width={400}
                                            height={300}
                                            data={revealdisplayALL}
                                            margin={{
                                                top: 20,
                                                right: 30,
                                                left: 20,
                                                bottom: 5
                                            }}
                                            fullWidth
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="ชื่อ" barSize={20} />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="ค่าที่จ่าย" stackId="a" barSize={20} fill="#E20000" />
                                            <Bar dataKey="ค่าหลังจ่าย" stackId="b" barSize={20} fill="#00D83B" />
                                            <Bar dataKey="ผลรวมค่ารายการเบิก" stackId="c" barSize={20} fill="#00B2EA" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </Item>
                            </Grid> */}

                            <Grid item xs={12} sm={12}>
                                <Item>
                                    <Typography variant="h6" gutterBottom >
                                        กราฟสรุปกำไร/ปี
                                    </Typography>
                                    <ResponsiveContainer width="100%" aspect={2}>
                                        <ComposedChart width={300} height={100} data={db_profittoSelectyear}>
                                            {/* <XAxis dataKey="db_manure_date" /> */}
                                            <XAxis dataKey="year"
                                            />
                                            <YAxis />
                                            <YAxis orientation="right" yAxisId="2" />
                                            <Tooltip />
                                            <CartesianGrid stroke="#f5f5f5" />
                                            <Legend />
                                            {/* <Area label="" type="monotone" dataKey="กำไรปี" fill="#8884d8" stroke="#8884d8" /> */}

                                            <Bar dataKey="รายจ่ายต่อปี" stackId="a" barSize={20} fill="#FF0000" />
                                            <Bar dataKey="รายรับต่อปี" stackId="b" barSize={20} fill="#0FFF00" /> // ผลร่วมค่าปุ๋ย ตัวแปร
                                            <Bar dataKey="กำไรต่อปี" stackId="c" barSize={20} fill="#8884d8" /> // ผลร่วมค่าปุ๋ย ตัวแปร


                                        </ComposedChart>

                                    </ResponsiveContainer>
                                </Item>
                            </Grid>




                        </Grid>





                    </Container>


                </Box>

            </Box>


        </ThemeProvider>
    );

}

export default function Dashboard() {
    return <DashboardContent />;
}








