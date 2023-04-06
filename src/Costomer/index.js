import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Carousel from 'react-material-ui-carousel';
import 'react-image-gallery/styles/css/image-gallery.css';
import img1 from '../img/S__30310468.jpg';
import img2 from '../img/S__30310470.jpg';
import img3 from '../img/S__30310471.jpg';
import ImageGallery from 'react-image-gallery';
import Logo from "../img/LOGO.png";


function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'ติดต่อสอบถาม © '}
            <Link color="inherit" href="https://www.facebook.com/suraimee.yk">
                นายซูไฮมี ยะโกะ
            </Link>{'และ'}
            <Link color="inherit" href="https://www.facebook.com/suraimee.yk">
                นางสาวฟาตีเมาะ หะยีมะมิง
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

const images = [
    {
        original: img1,
        thumbnail: img1,
        originalAlt: 'Slide 1',
        thumbnailAlt: 'Slide 1',
    },
    {
        original: img2,
        thumbnail: img2,
        originalAlt: 'Slide 2',
        thumbnailAlt: 'Slide 2',
    },
    {
        original: img3,
        thumbnail: img3,
        originalAlt: 'Slide 3',
        thumbnailAlt: 'Slide 3',
    },
];


function Slideshow() {
    return (
        <ImageGallery
            items={images}
            showPlayButton={false}
            showFullscreenButton={false}
            autoPlay
            slideInterval={5000}
            thumbnailWidth={50}
            thumbnailHeight={50}
            lazyLoad
        />
    );
}


export default function Album() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="relative">
                <Toolbar>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1 }}
                    >
                        Latex Purchasing Platfrom
                    </Typography>

                    <IconButton color="inherit">

                        <Stack direction="row" spacing={2}>
                            <Link href="/Login" variant="body2">
                                <Button
                                    style={{
                                        borderRadius: 35,
                                        backgroundColor: "#00EE20",
                                        color: "#000000"
                                    }}
                                    variant="contained" >
                                    ล็อคอินใช้งานระบบ
                                </Button>
                            </Link>
                        </Stack>

                    </IconButton>

                </Toolbar>
            </AppBar>


            <main>
                {/* Hero unit */}
                <Box
                    sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}
                >
                    <Container maxWidth="xl">
                        <Typography
                            component="h1"
                            variant="h3"
                            align="center"
                            color="text.primary"
                            gutterBottom
                        >
                            <Box sx={{ pb: 2 }}>
                                ยินดีต้อนรับเข้าสู่แพล็ตฟอร์มจัดซื้อน้ำยางพารา
                            </Box>
                            <Stack sx={{ pb: 2 }} direction="row" spacing={2} justifyContent="center">
                                <Button variant="contained" href="/Costomer/CustomerLogin">เช็คข้อมูลซื้อน้ำยางพาราลูกค้า</Button>
                                <Button variant="outlined" href="#footer">ติดต่อสอบถาม</Button>
                            </Stack>
                            <Slideshow />

                        </Typography>

                    </Container>
                </Box>


            </main>
            {/* footer */}

            <footer id="footer">

                <Box sx={{ bgcolor: '#3775bb', p: 3 }} component="footer">
                    <Typography variant="h6" align="center" color="#FFFFFF" gutterBottom>
                        <Box
                            component="img"
                            sx={{
                                height: 50,
                            }}
                            alt="Your logo."
                            src={Logo}
                        />
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        align="center"
                        color="#FFFFFF"
                        component="p"
                    >
                        แพล็ตฟอร์มจัดซื้อน้ำยางพารา
                    </Typography>
                    <Copyright />
                </Box>
            </footer>

            {/* End footer */}
        </ThemeProvider>
    );
}