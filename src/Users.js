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
import { TextField } from '@material-ui/core';



export default function Users() {

  const [items, setItems] = useState([]);


  useEffect(() => {
    UserGet()
  }, [])


  const UserGet = () => {
    fetch("https://latexplatform-api.coecore.com/Users")
      .then(res => res.json())
      .then(
        (result) => {
          setItems(result);
          // console.log(result)
        }
      )
  }

  // console.log(items.results)

  const UserUpdate = users_id => {
    window.location = '/EditUser/' + users_id
  }


  const UserDelete = users_id => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "users_id": users_id
    });

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://latexplatform-api.coecore.com/Users_id", requestOptions)
      .then(response => response.json())
      .then((data) => {
        console.log(data)
        if (data.status === 'Ok') {
          window.location = '/Album'
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
    const users_name = results.users_name.toLowerCase();
    const users_tel = results.users_tel.toLowerCase();
    const users_usersname = results.users_usersname.toLowerCase();
    const name = results.name.toLowerCase();
   
    return (
      users_name.includes(searchQuery.toLowerCase()) ||
      users_tel.includes(searchQuery.toLowerCase()) ||
      users_usersname.includes(searchQuery.toLowerCase()) ||
      name.includes(searchQuery.toLowerCase())
    );
  });



  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ p: 5 }}>
        <Paper sx={{ p: 2 }}>
          <Box display="flex">
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom >
                รายการสมาชิกผู้ซื้อ
              </Typography>
            </Box>
            <Box>
              <Link href="CreateUsers">
                <Button variant="contained">Create</Button>
              </Link>
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
                  <TableCell align="lift">ชื่อ</TableCell>
                  <TableCell align="lift">เบอร์</TableCell>
                  <TableCell align="lift">Email</TableCell>
                  <TableCell align="lift">สถานะ</TableCell>
                  <TableCell align="lift">Action</TableCell>

                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData?.map((results,index) => (
                  <TableRow
                    key={results.users_id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="center">
                      {index + 1}
                    </TableCell>
                    <TableCell align="lift">{results.users_name}</TableCell>
                    <TableCell align="lift">{results.users_tel}</TableCell>
                    <TableCell align="lift">{results.users_usersname}</TableCell>
                    <TableCell align="lift">{results.name}</TableCell>
                    <TableCell align="lift">
                      <ButtonGroup variant="outlined" aria-label="outlined button group">
                        <Button onClick={() => UserUpdate(results.users_id)} > Edit </Button>
                        <Button onClick={() => UserDelete(results.users_id)} > Delete </Button>
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
