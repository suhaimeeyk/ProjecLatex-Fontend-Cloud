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



export default function Users() {


    const [users_id,setusers_id] = useState('');

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
  
                  setusers_id(data.decoded['users_id'])
                //   console.log(data.decoded['users_name'])
  
              }else{
                  alert('authen failed')
                  localStorage.removeItem('token');
                  window.location ='/login'
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


    fetch("http://localhost:3333/db_dataSelect/"+users_id , requestOptions)
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


    fetch("http://localhost:3333/manuredisplay/"+users_id , requestOptions)
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


    //     fetch("http://localhost:3333/manuredisplay", requestOptions)
    //         .then(res => res.json())
    //         .then((result) => {
    //             setItems(result);
    //             console.log(result);
    //         }
    //         )
    // }, [])





    const Manuredisplay_detail = manure_id => {
        window.location = '/user/Manuredisplay_detailUser/' + manure_id
    }
    const Manureeditform = manure_id => {
        window.location = '/user/ManureeditformUser/' + manure_id
    }



    const UserDelete = manure_id => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "manure_id": manure_id
        });

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:3333/db_manure_id", requestOptions)
            .then(response => response.json())
            .then((data) => {
                console.log(data)
                if (data.status === 'Ok') {
                    window.location = '/user/ManuredisplayUser'
                    alert('ลบรายการเรียบร้อย')
                } else {
                    console.log(data.status)
                    alert('เกิดข้อผิดพลาด!!')
                }
            })
            .catch(error => console.log('error', error));
    }




    return (
        <React.Fragment>
            <CssBaseline />

            <Container maxWidth="xl" sx={{ mt: 10, p: 5 }}>
                <Paper sx={{ p: 2 }}>
                    <Box align="center" display="flex">
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" gutterBottom >
                            รายการค่าปุ๋ย
                            </Typography>
                        </Box>
                        <Box>
                            <Link href="CreateManuredisplayUser">
                                <Button variant="contained">Create</Button>
                            </Link>
                        </Box>
                    </Box>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth:650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                                    <TableCell align="center">ลำดับ</TableCell>
                                    {/* <TableCell align="center"></TableCell> */}
                                    <TableCell align="lift">ชื่อสมาชิก</TableCell>
                                    <TableCell align="lift">ยอดรวมทั้งหมด</TableCell>
                                    <TableCell align="lift">วันที่</TableCell>
                                    <TableCell align="lift">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {items.results?.map((results, index) => {
                                    return (
                                        <TableRow
                                            key={results.manure_id}
                                              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row" align="center">
                                                {index + 1}
                                            </TableCell>

                                            <TableCell align="lift">{results.customer_name}</TableCell>
                                            
                                           
                                            <TableCell align="lift">{results.manure_total}</TableCell>        
                                            {/* <TableCell align="lift">{results.db_manure_date}</TableCell>  */}
                                            <TableCell align="lift" >
                                                {(new Date(results.db_manure_date)).toLocaleTimeString('th-TH', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    weekday: 'long',
                                                })}
                                            </TableCell>       

                                            {/* <TableCell align="lift">{results.manure_pay}</TableCell>       */}

                                            {/* <TableCell align="lift">
                                                {results.manure_sumtotal === 0 ?
                                                     <p><Button > ไม่มียอดการจ่าย </Button></p>
                                                    : null}
                                                {results.manure_sumtotal !== 0 ? <p>{results.manure_sumtotal}</p> : null}
                                            </TableCell>                                       */}

                                            <TableCell align="lift">
                                                <PopupState variant="popover" popupId="demo-popup-menu">
                                                    {(popupState) => (
                                                        <React.Fragment>
                                                            <Button variant="contained" {...bindTrigger(popupState)}>
                                                                ทำรายการ
                                                            </Button>
                                                            <Menu {...bindMenu(popupState)}>
                                                                <MenuItem onClick={() => Manuredisplay_detail(results.manure_id)}>ดูรายการ</MenuItem>
                                                                <MenuItem onClick={() => Manureeditform(results.manure_id)}>จ่ายเงิน</MenuItem>
                                                                {/* <MenuItem onClick={() => UserDelete(results.manure_id)}>ลบ</MenuItem> */}
                                                                <MenuItem onClick={() => { if (window.confirm("คุณต้องการลบรายการนี้ใช่หรือไม่?")) { UserDelete(results.manure_id); }}}>ลบ</MenuItem>
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
