import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Link from '@mui/material/Link';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

import { makeStyles } from '@material-ui/core/styles';
import { experimentalStyled as muiStyled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';

import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { mainListItems, secondaryListItems } from './listItems';
// import LineChartComponent from './DashBoard/LineChart';
import Stack from '@mui/material/Stack';

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


export default function Users() {


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

    const [db_profittoSelectmouth, setdb_profittoSelectmouth] = useState('');

    // useEffect(() => {
    //     var requestOptions = {
    //         method: 'GET',
    //         redirect: 'follow'
    //     };

    //     fetch("https://latexplatform-api.coecore.com/db_profittoSelectmouth/", requestOptions)
    //         .then(response => response.json())
    //         .then(result => {
    //             if (result['status'] === 'Ok') {

    //                 setdb_profittoSelectmouth(result['data'])

    //             }
    //         })
    //         .catch(error => console.log('error', error));
    // }, [])
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

    // useEffect(() => {
    //     var requestOptions = {
    //         method: 'GET',
    //         redirect: 'follow'
    //     };

    //     fetch("https://latexplatform-api.coecore.com/db_profittoSelectyear/", requestOptions)
    //         .then(response => response.json())
    //         .then(result => {
    //             if (result['status'] === 'Ok') {

    //                 setdb_profittoSelectyear(result['data'])

    //             }
    //         })
    //         .catch(error => console.log('error', error));
    // }, [])

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





    const [User, setUser] = useState([]);

    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };


        fetch("https://latexplatform-api.coecore.com/db_dataSelect/" + users_id, requestOptions)
            .then(res => res.json())
            .then((result) => {
                setUser(result);
                console.log(result)
            }
            )
    }, [users_id])


    // const [items, setItems] = useState([]);



    // useEffect(() => {
    //     var requestOptions = {
    //         method: 'GET',
    //         redirect: 'follow'
    //     };


    //     fetch("https://latexplatform-api.coecore.com/Profit", requestOptions)
    //         .then(res => res.json())
    //         .then((result) => {
    //             setItems(result);
    //             console.log(result);
    //         }
    //         )
    // }, [])

    const [items, setItems] = useState([]);;
        
    useEffect(() => {
      var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };
  
  
      fetch("https://latexplatform-api.coecore.com/Profit/"+users_id , requestOptions)
      .then(res => res.json())
      .then((result) => {
          setItems(result);
          console.log(result)
        }
      )
    }, [users_id])


    const [profit, setprofit] = useState([]);



    // useEffect(() => {
    //     var requestOptions = {
    //         method: 'GET',
    //         redirect: 'follow'
    //     };


    //     fetch("https://latexplatform-api.coecore.com/Profittoday", requestOptions)
    //         .then(res => res.json())
    //         .then((result) => {
    //             setprofit(result);
    //             console.log(result);
    //         }
    //         )
    // }, [])

        
    useEffect(() => {
      var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };
  
  
      fetch("https://latexplatform-api.coecore.com/Profittoday/"+users_id , requestOptions)
      .then(res => res.json())
      .then((result) => {
        setprofit(result);
          console.log(result)
        }
      )
    }, [users_id])

    const [Selectmouth, setSelectmouth] = useState([]);



    // useEffect(() => {
    //     var requestOptions = {
    //         method: 'GET',
    //         redirect: 'follow'
    //     };


    //     fetch("https://latexplatform-api.coecore.com/db_profittoSelectmouth", requestOptions)
    //         .then(res => res.json())
    //         .then((data) => {
    //             setSelectmouth(data);
    //             // console.log(data);
    //         }
    //         )
    // }, [])

    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
    
    
        fetch("https://latexplatform-api.coecore.com/db_profittoSelectmouth/"+users_id , requestOptions)
        .then(res => res.json())
        .then((result) => {
            setSelectmouth(result);
            console.log(result)
          }
        )
      }, [users_id])


    const [SelectYear, setSelectYear] = useState([]);



    // useEffect(() => {
    //     var requestOptions = {
    //         method: 'GET',
    //         redirect: 'follow'
    //     };


    //     fetch("https://latexplatform-api.coecore.com/db_profittoSelectyear", requestOptions)
    //         .then(res => res.json())
    //         .then((data) => {
    //             setSelectYear(data);
    //             // console.log(data);
    //         }
    //         )
    // }, [])
    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
    
    
        fetch("https://latexplatform-api.coecore.com/db_profittoSelectyear/"+users_id , requestOptions)
        .then(res => res.json())
        .then((result) => {
            setSelectYear(result);
            console.log(result)
          }
        )
      }, [users_id])

    // const [db_income, setdb_income] = useState([]);



    // useEffect(() => {
    //     var requestOptions = {
    //         method: 'GET',
    //         redirect: 'follow'
    //     };


    //     fetch("https://latexplatform-api.coecore.com/db_income", requestOptions)
    //         .then(res => res.json())
    //         .then((result) => {
    //             setdb_income(result);
    //             console.log(result);
    //         }
    //         )
    // }, [])

    const [db_income, setdb_income] = useState([]);;
        
    useEffect(() => {
      var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };
  
  
      fetch("https://latexplatform-api.coecore.com/db_income/"+users_id , requestOptions)
      .then(res => res.json())
      .then((result) => {
        setdb_income(result);
          console.log(result)
        }
      )
    }, [users_id])


    const UserUpdate = reveal_id => {
        window.location = '/Editdb_data/' + reveal_id
    }

    const Process_owner = reveal_id => {
        window.location = '/Revealdisplay_detail/' + reveal_id
    }
    const Process_divide = reveal_id => {
        window.location = '/Revealditform/' + reveal_id
    }


    const UserDeleteitems = paydaily_id => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "paydaily_id": paydaily_id
        });

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://latexplatform-api.coecore.com/paydaily_id", requestOptions)
            .then(response => response.json())
            .then((data) => {
                console.log(data)
                if (data.status === 'Ok') {
                    window.location = '/user/ProfitUser'
                    alert('ลบรายการเรียบร้อย')
                } else {
                    console.log(data.status)
                    alert('เกิดข้อผิดพลาด!!')
                }
            })
            .catch(error => console.log('error', error));
    }

    const UserDeletedb_income = db_income_id => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "db_income_id": db_income_id
        });

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://latexplatform-api.coecore.com/db_income_id", requestOptions)
            .then(response => response.json())
            .then((data) => {
                console.log(data)
                if (data.status === 'Ok') {
                    window.location = '/Profit'
                    alert('ลบรายการเรียบร้อย')
                } else {
                    console.log(data.status)
                    alert('เกิดข้อผิดพลาด!!')
                }
            })
            .catch(error => console.log('error', error));
    }
    const UserDeletedb_profittoday = profittoday_id => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "profittoday_id": profittoday_id
        });

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://latexplatform-api.coecore.com/profittoday_id", requestOptions)
            .then(response => response.json())
            .then((data) => {
                console.log(data)
                if (data.status === 'Ok') {
                    window.location = '/Profit'
                    alert('ลบรายการเรียบร้อย')
                } else {
                    console.log(data.status)
                    alert('เกิดข้อผิดพลาด!!')
                }
            })
            .catch(error => console.log('error', error));
    }


    const [db_data, setdb_data] = useState([]);

    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };


        fetch("https://latexplatform-api.coecore.com/db_data/" + users_id, requestOptions)
            .then(res => res.json())
            .then((result) => {
                setdb_data(result);
                console.log(result)
            }
            )
    }, [users_id])


    return (

        <React.Fragment>
            <CssBaseline />

            <Container maxWidth="xl" sx={{ mt: 10, p: 5 }}>
                <h1 align="center">รายรับและรายจ่าย/วัน</h1>
                <Paper sx={{ p: 2, backgroundColor: '#EDECEC' }}>


                    <Box align="center" display="flex">
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" gutterBottom  >
                                ตารางสรุปข้อมูลรายจ่าย/วัน
                            </Typography>
                        </Box>
                        <Box>
                            <Link href="/user/CreateProfitfor_dayUser">
                                <Button variant="contained">Create</Button>
                            </Link>
                        </Box>
                    </Box>

                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                                    <TableCell align="center">ลำดับ</TableCell>
                                    <TableCell align="lift">วันที่ทำรายการ</TableCell>
                                    <TableCell align="lift">ชื่อรายการจด</TableCell>
                                    <TableCell align="lift">จ่ายค่าปุ๋ย</TableCell>
                                    <TableCell align="lift">จ่ายค่าเบิกล่วงหน้า</TableCell>
                                    <TableCell align="lift">จ่ายค่าน้ำยางทั้งหมด</TableCell>
                                    <TableCell align="lift">จ่ายค่าจ้างลูกน้อง</TableCell>

                                    <TableCell align="lift" >รวมยอดรายจ่ายทั้งหมด</TableCell>
                                    <TableCell align="lift" >Action</TableCell>
                                    {/* <TableCell align="lift"><span style="color:red;">รวมยอดรายจ่ายทั้งหมด</span></TableCell> */}


                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {items.results?.map((results, index) => {
                                    return (
                                        <TableRow
                                            key={results.reveal_id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row" align="center">
                                                {index + 1}
                                            </TableCell>


                                            <TableCell align="lift" >
                                                {(new Date(results.DateProfit)).toLocaleTimeString('th-TH', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    weekday: 'long',
                                                })}
                                            </TableCell>

                                            <TableCell align="lift">{results.note}</TableCell>
                                            <TableCell align="center">{results.ManureProfit}</TableCell>
                                            <TableCell align="center">{results.RevealProfit}</TableCell>
                                            <TableCell align="center">{results.pay_for_all_latex_Profit}</TableCell>
                                            <TableCell align="center">{results.pay_subordinates_wages}</TableCell>
                                            <TableCell align="center" >{results.total_price}</TableCell>
                                            <TableCell align="lift">
                                                <ButtonGroup variant="outlined" aria-label="outlined button group">
                                                    {/* <Button onClick={() => UserUpdate(results.catwithdraw_id)} > Edit </Button> */}
                                                    <Button onClick={() => { if (window.confirm("คุณต้องการลบรายการนี้ใช่หรือไม่?")) { UserDeleteitems(results.paydaily_id) } }}> Delete </Button>
                                                </ButtonGroup>
                                            </TableCell>






                                        </TableRow>
                                    )
                                })}

                            </TableBody>
                        </Table>

                    </TableContainer>

                    <br></br>


                    <Box align="center" display="flex">
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" gutterBottom  >
                                ตารางสรุปข้อมูลรายรับ/วัน
                            </Typography>
                        </Box>
                        <Box>
                            <Link href="/user/CreateProfitincome_dayUser">
                                <Button variant="contained">Create</Button>
                            </Link>
                        </Box>
                    </Box>

                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                                    <TableCell align="center">ลำดับ</TableCell>
                                    <TableCell align="lift">วันที่ทำรายการ</TableCell>
                                    <TableCell align="lift">ชื่อรายการจด</TableCell>
                                    <TableCell align="lift">รับค่าปุ๋ย</TableCell>
                                    <TableCell align="lift">รับค่าเบิกล่วงหน้า</TableCell>
                                    <TableCell align="lift">รับค่าน้ำยางทั้งหมด</TableCell>

                                    <TableCell align="lift" >รวมยอดรายจ่ายทั้งหมด</TableCell>
                                    <TableCell align="lift" >Action</TableCell>

                                    {/* <TableCell align="lift"><span style="color:red;">รวมยอดรายจ่ายทั้งหมด</span></TableCell> */}


                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {db_income.results?.map((results, index) => {
                                    return (
                                        <TableRow
                                            key={results.reveal_id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row" align="center">
                                                {index + 1}
                                            </TableCell>


                                            <TableCell align="lift" >
                                                {(new Date(results.Datedb_income)).toLocaleTimeString('th-TH', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    weekday: 'long',
                                                })}
                                            </TableCell>

                                            <TableCell align="lift">{results.note}</TableCell>
                                            <TableCell align="center">{results.Manuredb_income}</TableCell>
                                            <TableCell align="center">{results.Revealdb_income}</TableCell>
                                            <TableCell align="center">{results.pay_for_all_latex_db_income}</TableCell>
                                            <TableCell align="center" >{results.total_price}</TableCell>
                                            <TableCell align="lift">
                                                <ButtonGroup variant="outlined" aria-label="outlined button group">
                                                    {/* <Button onClick={() => UserUpdate(results.catwithdraw_id)} > Edit </Button> */}
                                                    <Button onClick={() => { if (window.confirm("คุณต้องการลบรายการนี้ใช่หรือไม่?")) { UserDeletedb_income(results.db_income_id) } }}> Delete </Button>
                                                </ButtonGroup>
                                            </TableCell>

                                        </TableRow>
                                    )
                                })}

                            </TableBody>
                        </Table>
                    </TableContainer>

                    <br></br>

                    <Box align="center" display="flex">
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" gutterBottom  >
                                ตารางสรุปกำไร/วัน
                            </Typography>
                        </Box>
                        <Box>
                            <Link href="/user/CreateProfitUser">
                                <Button variant="contained">Create</Button>
                            </Link>
                        </Box>
                    </Box>

                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                                    <TableCell align="center">ลำดับ</TableCell>
                                    <TableCell align="lift">ชื่อรายการจด</TableCell>
                                    <TableCell align="lift">รายรับต่อวัน</TableCell>
                                    <TableCell align="lift">รายจ่ายต่อวัน</TableCell>
                                    <TableCell align="lift">กำไรต่อวัน</TableCell>

                                    <TableCell align="lift" >Action</TableCell>

                                    {/* <TableCell align="lift"><span style="color:red;">รวมยอดรายจ่ายทั้งหมด</span></TableCell> */}


                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {profit.results?.map((results, index) => {
                                    return (
                                        <TableRow
                                            key={results.reveal_id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row" align="center">
                                                {index + 1}
                                            </TableCell>

                                            <TableCell align="lift" >กำไรวันที่ {(
                                                new Date(results.note).toLocaleDateString('th-TH', {
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                    year: 'numeric'
                                                }).replace(/\//g, '-')
                                            )}
                                            </TableCell>

                                            <TableCell align="lift">{results.income}</TableCell>
                                            <TableCell align="lift">{results.paydaily}</TableCell>
                                            <TableCell align="lift" >{results.totalprofittoday}</TableCell>
                                            <TableCell align="lift">
                                                <ButtonGroup variant="outlined" aria-label="outlined button group">
                                                    {/* <Button onClick={() => UserUpdate(results.catwithdraw_id)} > Edit </Button> */}
                                                    <Button onClick={() => { if (window.confirm("คุณต้องการลบรายการนี้ใช่หรือไม่?")) { UserDeletedb_profittoday(results.profittoday_id) } }} > Delete </Button>
                                                </ButtonGroup>
                                            </TableCell>






                                        </TableRow>
                                    )
                                })}

                            </TableBody>

                        </Table>
                    </TableContainer>

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

                </Paper>
            </Container>



            <Container maxWidth="xl" sx={{ mt: 10, p: 5 }}>
                <h1 align="center">รายรับและรายจ่าย/เดือน</h1>
                <Paper sx={{ p: 2, backgroundColor: '#EDECEC' }}>


                    <Box align="center" display="flex">
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" gutterBottom  >
                                ตารางสรุปกำไร/เดือน
                            </Typography>
                        </Box>
                        {/* <Box>
                            <Link href="CreateProfitfor_month">
                                <Button variant="contained">Create</Button>
                            </Link>
                        </Box> */}
                    </Box>

                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                                    <TableCell align="center">ลำดับ</TableCell>
                                    <TableCell align="lift">เดือน-ปี</TableCell>
                                    <TableCell align="lift">รายจ่ายต่อเดือน</TableCell>
                                    <TableCell align="lift">รายรับต่อเดือน</TableCell>
                                    <TableCell align="lift">กำไรต่อเดือน</TableCell>


                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {Selectmouth.result?.map((result, index) => {
                                    return (
                                        <TableRow
                                            key={result.reveal_id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row" align="center">
                                                {index + 1}
                                            </TableCell>
                                            <TableCell align="lift">{result.month}</TableCell>
                                            <TableCell align="lift">{result.รายจ่ายต่อเดือน}</TableCell>
                                            <TableCell align="lift">{result.รายรับต่อเดือน}</TableCell>
                                            <TableCell align="lift" >{result.กำไรต่อเดือน}</TableCell>

                                           




                                        </TableRow>
                                    )
                                })}

                            </TableBody>

                        </Table>
                    </TableContainer>

                    <br></br>



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

                </Paper>
            </Container>

            <Container maxWidth="xl" sx={{ mt: 10, p: 5 }}>
                <h1 align="center">รายรับและรายจ่าย/ปี</h1>
                <Paper sx={{ p: 2, backgroundColor: '#EDECEC' }}>


                    <Box align="center" display="flex">
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" gutterBottom  >
                                ตารางสรุปกำไร/ปี
                            </Typography>
                        </Box>
                        {/* <Box>
                            <Link href="CreateProfitfor_month">
                                <Button variant="contained">Create</Button>
                            </Link>
                        </Box> */}
                    </Box>

                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                                    <TableCell align="center">ลำดับ</TableCell>
                                    <TableCell align="lift">ปี</TableCell>
                                    <TableCell align="lift">รายจ่ายต่อปี</TableCell>
                                    <TableCell align="lift">รายรับต่อปี</TableCell>
                                    <TableCell align="lift">กำไรต่อปี</TableCell>


                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {SelectYear.result?.map((result, index) => {
                                    return (
                                        <TableRow
                                            key={result.reveal_id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row" align="center">
                                                {index + 1}
                                            </TableCell>
                                            <TableCell align="lift">{result.year}</TableCell>
                                            <TableCell align="lift">{result.รายจ่ายต่อปี}</TableCell>
                                            <TableCell align="lift">{result.รายรับต่อปี}</TableCell>
                                            <TableCell align="lift" >{result.กำไรต่อปี}</TableCell>

                                           




                                        </TableRow>
                                    )
                                })}

                            </TableBody>

                        </Table>
                    </TableContainer>

                    <br></br>



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

                </Paper>
            </Container>



        </React.Fragment>
    );
}
