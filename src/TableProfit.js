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



export default function Users() {


    const [users_id, setusers_id] = useState('');

    useEffect(() => {

        const token = localStorage.getItem('token')
        fetch('http://localhost:3333/authen', {
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


        fetch("http://localhost:3333/db_dataSelect/" + users_id, requestOptions)
            .then(res => res.json())
            .then((result) => {
                setUser(result);
                console.log(result)
            }
            )
    }, [users_id])


    const [items, setItems] = useState([]);



    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };


        fetch("http://localhost:3333/Revealdisplay", requestOptions)
            .then(res => res.json())
            .then((result) => {
                setItems(result);
                console.log(result);
            }
            )
    }, [])


    const UserUpdate = reveal_id => {
        window.location = '/Editdb_data/' + reveal_id
    }

    const Process_owner = reveal_id => {
        window.location = '/Revealdisplay_detail/' + reveal_id
    }
    const Process_divide = reveal_id => {
        window.location = '/Revealditform/' + reveal_id
    }


    const UserDelete = reveal_id => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "reveal_id": reveal_id
        });

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:3333/db_reveal_id", requestOptions)
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

    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },
    });

    function createData(name, calories, fat, carbs, protein, iron) {
        return { name, calories, fat, carbs, protein, iron };
    }

    const rows = [
        createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 1.0),
        createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 1.2),
        createData('Eclair', 262, 16.0, 24, 6.0, 0.7),
        createData('Cupcake', 305, 3.7, 67, 4.3, 0.8),
        createData('Gingerbread', 356, 16.0, 49, 3.9, 0.4),
    ];

    const classes = useStyles();

    const [db_data, setdb_data] = useState([]);

    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };


        fetch("http://localhost:3333/db_data/" + users_id, requestOptions)
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
                <Paper sx={{ p: 2 }}>
                    <Box align="center" display="flex">
                        <Box sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" gutterBottom >
                                ข้อมูลรายรับและรายจ่าย
                            </Typography>
                        </Box>
                        <Box>
                            <Link href="CreateRevealdisplay">
                                <Button variant="contained">Create</Button>
                            </Link>
                        </Box>
                    </Box>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>วันที่</TableCell>
                                    <TableCell align="right">จ่ายค่าปุ๋ย / วัน</TableCell>
                                    <TableCell align="right">จ่ายเบิกล่วงหน้า / วัน</TableCell>
                                    <TableCell align="right">จ่ายค่าน้ำยาง / วัน</TableCell>
                                    <TableCell align="right">จ่ายค่าจ้างลูกน้อง / วัน</TableCell>
                                    <TableCell align="right">รวมยอดรายจ่ายทั้งหมด / วัน </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow key={row.name}>
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">{row.calories}</TableCell>
                                        <TableCell align="right">{row.fat}</TableCell>
                                        <TableCell align="right">{row.carbs}</TableCell>
                                        <TableCell align="right">{row.protein}</TableCell>
                                        <TableCell align="right">{row.iron}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Container>
        </React.Fragment>
    );
}
