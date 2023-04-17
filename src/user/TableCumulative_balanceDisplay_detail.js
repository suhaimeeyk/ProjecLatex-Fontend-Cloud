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

    const { customer_id } = useParams();

//   const [items, setItems] = useState([]);
        
        
//       useEffect(() => {
//         var requestOptions = {
//             method: 'GET',
//             redirect: 'follow'
//           };


//         fetch("https://latexplatform-api.coecore.com/manuredisplay_detail/"+customer_id , requestOptions)
//         .then(res => res.json())
//         .then((data) => {
//             setItems(data.data);
//             // console.log(data.data)
//           }
//         )
//       }, [customer_id])


        // const [customer_name, setcustomer_name] = useState('');
        // const [manure_sumtotal, setmanure_sumtotal] = useState('');
    //     const [manure_pay, setmanure_pay] = useState('');
    //     const [manure_sumtotal, setmanure_sumtotal] = useState('');
    //     const [manure_detail_date, setmanure_detail_date] = useState('');

    // var index = 0 ;

    // useEffect(() => {
    //     var requestOptions = {
    //         method: 'GET',
    //         redirect: 'follow'
    //     };

    //     fetch("https://latexplatform-api.coecore.com/manuredisplay_detail/" + customer_id, requestions)
    //         .then(response => response.json())
    //         .then(result => {
    //             if (result['status'] === 'Ok') {

    //                 setcustomer_name(result['data']['customer_name'])
    //                 setmanure_sumtotal(result['data']['manure_sumtotal'])
    //                 console.log(result['data']['manure_sumtotal'])
    //             }
    //         })
    //         .catch(error => console.log('error', error));
    // }, [customer_id])

    //   console.log(items);
    // const [manure_sumtotal, setmanure_sumtotal] = useState('');
    const [manure_total, setmmanure_total] = useState('');

    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch("https://latexplatform-api.coecore.com/Manureeditformdetail/" + customer_id, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result['status'] === 'Ok') {

                    // setmanure_sumtotal(result['data']['manure_sumtotal'])
                    setmmanure_total(result['data']['manure_total'])
                    
                }
            })
            .catch(error => console.log('error', error));
    }, [customer_id])



    const [items, setItems] = useState([]);
        
    useEffect(() => {
      var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };


      fetch("https://latexplatform-api.coecore.com/cumulative_tire_price_customer/"+customer_id , requestOptions)
      .then(res => res.json())
      .then((result) => {
          setItems(result.results);
          console.log(result.results)
        }
      )
    }, [customer_id])


    const UserDelete = customer_id => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "customer_id": customer_id
        });

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://latexplatform-api.coecore.com/db_customer_id", requestOptions)
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
                        {/* <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" gutterBottom >
                            ยอดทั้งหมด : {manure_total}
                            </Typography>
                          
                        </Box> */}
                        <Box>
                            <Link href="/user/Cumulative_balanceDisplay">
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
                                    <TableCell align="lift">ผลร่วมจ่ายค่าน้ำยางต่อวัน</TableCell>
                                    {/* <TableCell align="lift">ยอดหลังชำระ</TableCell> */}
                                    <TableCell align="lift">วันที่</TableCell>

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
                                            <TableCell align="lift">{results.ผลร่วมจ่ายค่าน้ำยางต่อวัน}</TableCell>
                                            <TableCell align="lift">{results.วันที่}</TableCell>
                                            {/* <TableCell align="lift">{results.manure_sumtotal}</TableCell> */}

                                            {/* <TableCell align="lift" >
                                                {(new Date(results.วันที่)).toLocaleTimeString('th-TH', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    weekday: 'long',
                                                })}
                                            </TableCell> */}
                                         

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