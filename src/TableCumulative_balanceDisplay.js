import React, { useState, useEffect, useRef } from 'react';
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

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';



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


        fetch("https://latexplatform-api.coecore.com/cumulative_tire_price/" + users_id, requestOptions)
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


    //     fetch("https://latexplatform-api.coecore.com/manuredisplay", requestOptions)
    //         .then(res => res.json())
    //         .then((result) => {
    //             setItems(result);
    //             console.log(result);
    //         }
    //         )
    // }, [])





    const UserUpdate = manure_id => {
        window.location = '/Editdb_data/' + manure_id
    }

    const Manuredisplay_detail = manure_id => {
        window.location = '/Cumulative_balanceDisplay_detail/' + manure_id
    }
    const Manureeditform = manure_id => {
        window.location = '/Manureeditform/' + manure_id
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

        fetch("https://latexplatform-api.coecore.com/db_manure_id", requestOptions)
            .then(response => response.json())
            .then((data) => {
                console.log(data)
                if (data.status === 'Ok') {
                    window.location = '/Manuredisplay'
                    alert('ลบรายการเรียบร้อย')
                } else {
                    console.log(data.status)
                    alert('เกิดข้อผิดพลาด!!')
                }
            })
            .catch(error => console.log('error', error));
    }


    const [searchQuery, setSearchQuery] = useState("");

    const filteredData = items.data?.filter((results, index) => {
        const customer_name = results.customer_name.toLowerCase();
        const ผลร่วมจ่ายค่าน้ำยางต่อวัน = typeof results.ผลร่วมจ่ายค่าน้ำยางต่อวัน === 'string' ? results.ผลร่วมจ่ายค่าน้ำยางต่อวัน.toLowerCase() : '';
        const customer_id = typeof results.customer_id === 'string' ? results.customer_id.toLowerCase() : '';

        return (
            customer_name.includes(searchQuery.toLowerCase()) ||
            ผลร่วมจ่ายค่าน้ำยางต่อวัน.includes(searchQuery.toLowerCase()) ||
            customer_id.includes(searchQuery.toLowerCase())
        );
    });

    const pageRef = useRef();

    const capturePage = () => {
        // Get the dimensions of the page
        const pageWidth = 8.27; // A4 paper width in inches
        const pageHeight = 11.69; // A4 paper height in inches
      
        // Get the table element
        const tableElement = document.getElementById('table-container');
      
        // Use html2canvas to capture a screenshot of the table element
        html2canvas(tableElement, { scrollY: -window.scrollY, backgroundColor: 'rgba(0, 0, 0, 0)' }).then(canvas => {
          // `canvas` now contains a rendered image of the table element with a transparent background
          const imgData = canvas.toDataURL('image/png');
      
          // Calculate the scale factor to fit the image on an A4 page
          const scaleFactor = Math.min(pageWidth / canvas.width, pageHeight / canvas.height);
      
          // Calculate the width and height of the image after scaling
          const imgWidth = canvas.width * scaleFactor;
          const imgHeight = canvas.height * scaleFactor;
      
          // Create a new jsPDF instance with A4 page size
          const pdf = new jsPDF('p', 'in', 'a4');
      
          // Add the image to the PDF and position it at the top of the page
          pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      
          // Save the PDF with a custom name
          pdf.save('example.pdf');
        });
      };

    return (
        <React.Fragment>
            <CssBaseline />

            <Container maxWidth="xl" sx={{ mt: 10, p: 5 }}>
                <div ref={pageRef}>

                    <Paper sx={{ p: 2 }}>

                        <Box align="center" display="flex">
                            <Box sx={{ flexGrow: 1 }}>
                                <Typography variant="h6" gutterBottom >
                                    ยอดเงินสะสมของผู้ขาย
                                </Typography>
                            </Box>

                        </Box>
                        <TextField
                            fullWidth
                            label="Search"
                            value={searchQuery}
                            onChange={(event) => setSearchQuery(event.target.value)}
                        />
                        <TableContainer component={Paper}>
                        <div  id="table-container">

                            <Table sx={{
                                minWidth: 650, 
                                border: '1px solid',
                                borderColor: 'grey.300',
                                borderRadius: '8px',
                                overflow: 'hidden',
                            }} aria-label="simple table">
                                <TableHead>
                                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>

                                        <TableCell align="center">ลำดับ</TableCell>
                                        {/* <TableCell align="center"></TableCell> */}
                                        <TableCell align="lift">ชื่อสมาชิก</TableCell>
                                        <TableCell align="lift">ยอดรวมทั้งหมด</TableCell>
                                        {/* <TableCell align="lift">วันที่</TableCell> */}
                                        <TableCell align="lift">Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredData?.map((results, index) => {
                                        return (
                                            <TableRow
                                                key={results.manure_id}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row" align="center">
                                                    {index + 1}
                                                </TableCell>

                                                <TableCell align="lift">{results.customer_name}</TableCell>


                                                <TableCell align="lift">{results.ผลร่วมจ่ายค่าน้ำยางต่อวัน} บาท</TableCell>
                                                {/* <TableCell align="lift">{results.db_manure_date}</TableCell>  */}


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
                                                                    <MenuItem onClick={() => Manuredisplay_detail(results.customer_id)}>ดูรายการ</MenuItem>
                                                                    {/* <MenuItem >

                                                                        <button onClick={capturePage}>Capture and Save as PDF</button>

                                                                    </MenuItem> */}
                                                                    {/* <MenuItem onClick={() => UserDelete(results.manure_id)}>ลบ</MenuItem> */}
                                                                    {/* <MenuItem onClick={() => { if (window.confirm("คุณต้องการลบรายการนี้ใช่หรือไม่?")) { UserDelete(results.manure_id); }}}>ลบ</MenuItem> */}
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
                            </div>
                        </TableContainer>

                    </Paper>
                </div>

            </Container>
        </React.Fragment>
    );
}
