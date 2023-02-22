import React,{ useState, useEffect } from 'react';
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


export default function Users() {

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

    // console.log(items.results)

    const UserUpdate = catusers_id =>{
        window.location = '/EditUserdb_catusers/' + catusers_id
    }

 
      const UserDelete = catusers_id => {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
            "catusers_id": catusers_id
            });

            var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };

            fetch("http://localhost:3333/db_catusers_id", requestOptions)
            .then(response => response.json())
            .then((data) => {
                console.log(data)
                if (data.status === 'Ok' ) {
                    window.location ='/Alldb_catusers'
                    alert('ลบรายการเรียบร้อย')
                }else{
                    console.log(data.status)
                    alert('เกิดข้อผิดพลาด!!')
                }
            })
            .catch(error => console.log('error', error));
      }
      

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ p : 5 }}>
        <Paper sx={ { p:2 }}>
            <Box display="flex">
                <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom >
                    ประเภทลูกค้า
                </Typography>
                </Box>
                    <Box>
                        <Link href="Createdb_catusers">
                            <Button variant="contained">Create</Button>
                        </Link>
                    </Box>
            </Box>
        <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell align="center">ลำดับ</TableCell>
                        <TableCell align="lift">ชื่อประเภทสมาชิก</TableCell>
                        <TableCell align="lift">Action</TableCell>

                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {items.results?.map((results,index) => (
                        <TableRow
                            key={results.catusers_id} 
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                    <TableCell component="th" scope="row" align="center">
                                        {index + 1 }
                                    </TableCell>
                                    <TableCell align="lift">{results.catusers_name}</TableCell>
                                    <TableCell align="lift">
                                        <ButtonGroup variant="outlined" aria-label="outlined button group">
                                            <Button onClick={ () => UserUpdate(results.catusers_id) } > Edit </Button>
                                            <Button onClick={ () => UserDelete(results.catusers_id) } > Delete </Button>
                                        </ButtonGroup>
                                    </TableCell>
                        
                        </TableRow>
                    ))}
                    {/* <ul>
          {items.map(results => (
            <li key={results.users_id}>{results.users_name}</li>
          ))}
        </ul> */}
                    </TableBody>
                </Table>
        </TableContainer>
        </Paper>
      </Container>
    </React.Fragment>
  );
}
