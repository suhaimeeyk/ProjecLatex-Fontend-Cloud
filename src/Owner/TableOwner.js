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

import { TextField } from '@material-ui/core';




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

                    setusers_id(data.decoded['customer_id'])
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
                // console.log(result)
            }
            )
    }, [users_id])


    const [items, setItems] = useState([]);;

    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };


        fetch("https://latexplatform-api.coecore.com/ownerdisplayCostomerOwner/" + users_id, requestOptions)
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


    //     fetch("https://latexplatform-api.coecore.com/mownerdisplay", requestOptions)
    //         .then(res => res.json())
    //         .then((result) => {
    //             setItems(result);
    //             console.log(result);
    //         }
    //         )
    // }, [])





    const Mownerdisplay_detail = mowner_id => {
        window.location = '/Owner/Ownerdisplay_detailUser/' + mowner_id
    }
    const Mownereditform = mowner_id => {
        window.location = '/Owner/Manureeditform/' + mowner_id
    }



    const UserDelete = mowner_id => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "mowner_id": mowner_id
        });

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://latexplatform-api.coecore.com/db_owner_id", requestOptions)
            .then(response => response.json())
            .then((data) => {
                console.log(data)
                if (data.status === 'Ok') {
                    window.location = '/user/MownerdisplayUser'
                    alert('ลบรายการเรียบร้อย')
                } else {
                    console.log(data.status)
                    alert('เกิดข้อผิดพลาด!!')
                }
            })
            .catch(error => console.log('error', error));
    }
    const [searchQuery, setSearchQuery] = useState("");

    const filteredData = items.results?.filter((results, index) => {
        const customer_name = results.customer_name.toLowerCase();
        const owner_total = typeof results.owner_total === 'string' ? results.owner_total.toLowerCase() : '';
        const db_owner_date = typeof results.db_owner_date === 'string' ? results.db_owner_date.toLowerCase() : '';

        return (
            customer_name.includes(searchQuery.toLowerCase()) ||
            owner_total.includes(searchQuery.toLowerCase()) ||
            db_owner_date.includes(searchQuery.toLowerCase())
        );
    });

    const [db_dataALLPrice, setdb_dataALLPrice] = useState([]);


    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };


        fetch("https://latexplatform-api.coecore.com/cumulative_tire_price_Owner/" + users_id, requestOptions)
            .then(res => res.json())
            .then((result) => {
                if (result['status'] === 'Ok') {

                    setdb_dataALLPrice(result['data'][0]['ยอดเงินสะสมของเจ้าของสวน'])
console.log(result['data'][0]['ยอดเงินสะสมของเจ้าของสวน'])
                }
            })
            .catch(error => console.log('error', error));
    }, [users_id])


    return (
        <React.Fragment>
            <CssBaseline />

            <Container maxWidth="xl" sx={{ mt: 10, p: 5 }}>
                <Paper sx={{ p: 2 }}>
                   <Box align="center" display="flex">
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" gutterBottom >
                            รายการเงินสะสมของเจ้าของสวน
                            </Typography>
                            <Typography variant="h7" gutterBottom >
                            เงินสะสมตอนนี้คือ : {db_dataALLPrice}
                            </Typography>
                            <Box>
                                <br></br>
                            <Link href="/Owner/CreateOwner">
                                <Button variant="contained">สร้างรายการถอน</Button>
                            </Link>
                        </Box>
                        </Box>
                        
                    </Box>
                    <TextField
                        fullWidth
                        label="Search"
                        value={searchQuery}
                        onChange={(event) => setSearchQuery(event.target.value)}
                    />
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                                    <TableCell align="center">ลำดับ</TableCell>
                                    <TableCell align="lift">ชื่อคนตัดยาง</TableCell>
                                    <TableCell align="lift">ยอดการถอน</TableCell>
                                    <TableCell align="lift">ยอดคงเหลือ</TableCell>
                                    <TableCell align="lift">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {filteredData?.map((results, index) => {
                                    return (
                                        <TableRow
                                            key={results.mowner_id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row" align="center">
                                                {index + 1}
                                            </TableCell>

                                            <TableCell align="lift">{results.customer_name}</TableCell>


                                            <TableCell align="lift">{results.owner_total}</TableCell>
                                            {/* <TableCell align="lift">{results.db_mowner_date}</TableCell>  */}
                                            <TableCell align="lift" >
                                                {(new Date(results.db_owner_date)).toLocaleTimeString('th-TH', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    weekday: 'long',
                                                })}
                                            </TableCell>

                                            {/* <TableCell align="lift">{results.mowner_pay}</TableCell>       */}

                                            {/* <TableCell align="lift">
                                                {results.mowner_sumtotal === 0 ?
                                                     <p><Button > ไม่มียอดการจ่าย </Button></p>
                                                    : null}
                                                {results.mowner_sumtotal !== 0 ? <p>{results.mowner_sumtotal}</p> : null}
                                            </TableCell>                                       */}

<TableCell align="lift">
                                                <PopupState variant="popover" popupId="demo-popup-menu">
                                                    {(popupState) => (
                                                        <React.Fragment>
                                                            <Button variant="contained" {...bindTrigger(popupState)}>
                                                                ทำรายการ
                                                            </Button>
                                                            <Menu {...bindMenu(popupState)}>
                                                                <MenuItem onClick={() => Mownerdisplay_detail(results.owner_id)}>ดูรายการ</MenuItem>
                                                                <MenuItem onClick={() => Mownereditform(results.owner_id)}>ถอนเงิน</MenuItem>
                                                                {/* <MenuItem onClick={() => UserDelete(results.mowner_id)}>ลบ</MenuItem> */}
                                                                <MenuItem onClick={() => { if (window.confirm("คุณต้องการลบรายการนี้ใช่หรือไม่?")) { UserDelete(results.mowner_id); }}}>ลบ</MenuItem>
                                                            </Menu>
                                                        </React.Fragment>
                                                    )}
                                                </PopupState>

                                            </TableCell>


                                        </TableRow>
                                    )
                                })}

                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Container>
        </React.Fragment>
    );
}
