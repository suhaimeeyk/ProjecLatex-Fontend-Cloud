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
import { TextField } from '@mui/material';





export default function Users() {

//   const { users_id } = useParams(users_id);
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
                // console.log(data.decoded['users_name'])

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

const [items, setItems] = useState([]);
        
      useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };


        fetch("http://localhost:3333/db_customer_user/"+users_id , requestOptions)
        .then(res => res.json())
        .then((result) => {
            setItems(result);
            console.log(result)
          }
        )
      }, [users_id])

 
      const UserUpdate = customer_id =>{
        window.location = 'EditUserdb_customer/' + customer_id
    }

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

        fetch("http://localhost:3333/db_customer_id", requestOptions)
        .then(response => response.json())
        .then((data) => {
            console.log(data)
            if (data.status === 'Ok' ) {
                window.location ='/user/Alldb_customer'
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
            <Box align="center" display="flex">
                <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom >
                    รายการสมาชิกลูกค้า
                </Typography>
                </Box>
                    <Box>
                        <Link href="Createdb_customer">
                            <Button variant="contained">Create</Button>
                        </Link>
                    </Box>
            </Box>
        <TableContainer component={Paper}>

                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell align="center">ลำดับ</TableCell>
                        <TableCell align="lift">ชื่อลูกค้า</TableCell>
                        <TableCell align="lift">เบอร์โทร</TableCell>
                        <TableCell align="lift">ประเภทลูกค้า</TableCell>
                        <TableCell align="lift">ผุู้ดูแล</TableCell>
                        <TableCell align="lift">Action</TableCell>

                    </TableRow>
                    </TableHead>
                    
                    <TableBody>
                    { items.data?.map((data,index) => (
                        <TableRow
                            key={data.customer_id} 
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                    <TableCell component="th" scope="row" align="center">
                                        {index + 1 }
                                    </TableCell>
                                    <TableCell align="lift">{data.customer_name}</TableCell>
                                    <TableCell align="lift">{data.customer_tel}</TableCell>
                                    <TableCell align="lift">{data.catusers_name}</TableCell>
                                    <TableCell align="lift">{data.users_name}</TableCell>

                                    <TableCell align="lift">
                                        <ButtonGroup variant="outlined" aria-label="outlined button group">
                                            <Button onClick={ () => UserUpdate(data.customer_id) } > Edit </Button>
                                            <Button onClick={ () => UserDelete(data.customer_id) } > Delete </Button>
                                        </ButtonGroup>
                                    </TableCell>
                                    
                        
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
