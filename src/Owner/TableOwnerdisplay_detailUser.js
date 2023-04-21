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
import { useParams } from 'react-router-dom';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';


export default function Users() {

    const { owner_id } = useParams();

//   const [items, setItems] = useState([]);
        
        
//       useEffect(() => {
//         var requestOptions = {
//             method: 'GET',
//             redirect: 'follow'
//           };


//         fetch("https://latexplatform-api.coecore.com/ownerdisplay_detail/"+owner_id , requestOptions)
//         .then(res => res.json())
//         .then((data) => {
//             setItems(data.data);
//             // console.log(data.data)
//           }
//         )
//       }, [owner_id])


        // const [customer_name, setcustomer_name] = useState('');
        // const [owner_sumtotal, setowner_sumtotal] = useState('');
    //     const [owner_pay, setowner_pay] = useState('');
    //     const [owner_sumtotal, setowner_sumtotal] = useState('');
    //     const [owner_detail_date, setowner_detail_date] = useState('');

    // var index = 0 ;

    // useEffect(() => {
    //     var requestOptions = {
    //         method: 'GET',
    //         redirect: 'follow'
    //     };

    //     fetch("https://latexplatform-api.coecore.com/ownerdisplay_detail/" + owner_id, requestions)
    //         .then(response => response.json())
    //         .then(result => {
    //             if (result['status'] === 'Ok') {

    //                 setcustomer_name(result['data']['customer_name'])
    //                 setowner_sumtotal(result['data']['owner_sumtotal'])
    //                 console.log(result['data']['owner_sumtotal'])
    //             }
    //         })
    //         .catch(error => console.log('error', error));
    // }, [owner_id])

    //   console.log(items);
    const [owner_sumtotal, setowner_sumtotal] = useState('');
    const [owner_total, setmowner_total] = useState('');

    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("https://latexplatform-api.coecore.com/ownereditformdetail/" + owner_id, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result['status'] === 'Ok') {

                    setowner_sumtotal(result['data']['owner_sumtotal'])
                    setmowner_total(result['data']['owner_total'])
                }
            })
            .catch(error => console.log('error', error));
    }, [owner_id])



    const [items, setItems] = useState([]);
        
    useEffect(() => {
      var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };


      fetch("https://latexplatform-api.coecore.com/ownerdisplay_detail/"+owner_id , requestOptions)
      .then(res => res.json())
      .then((result) => {
          setItems(result.results);
          console.log(result.results)
        }
      )
    }, [owner_id])


    const UserDelete = owner_id => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "owner_id": owner_id
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
                    window.location = '/datadisplay'
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
                            ยอดทั้งหมด : {owner_total} ยอดคงเหลือ : {owner_sumtotal}
                            </Typography>
                          
                        </Box>
                        <Box>
                            <Link href="/Owner/OwnerData">
                                <Button variant="contained">BACK</Button>
                            </Link>
                        </Box>
                    </Box>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 500 }} aria-label="simple table">
                            <TableHead>
                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                                    <TableCell align="center">ลำดับ</TableCell>
                                    {/* <TableCell align="center"></TableCell> */}
                                    <TableCell align="lift">ชื่อลูกค้า</TableCell>
                                    <TableCell align="lift">ยอดชำระ</TableCell>
                                    <TableCell align="lift">ยอดคงเหลือ</TableCell>
                                    <TableCell align="lift">วันที่จ่าย</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {items?.map((results, index) => {
                                    return (
                                        <TableRow
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row" align="center">
                                                {index + 1}
                                            </TableCell>
                                            

                                            <TableCell align="lift">{results.customer_name}</TableCell>
                                            <TableCell align="lift">{results.owner_pay}</TableCell>
                                            <TableCell align="lift">{results.owner_sumtotal}</TableCell>

                                            <TableCell align="lift" >
                                                {(new Date(results.owner_detail_date)).toLocaleTimeString('th-TH', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    weekday: 'long',
                                                })}
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
