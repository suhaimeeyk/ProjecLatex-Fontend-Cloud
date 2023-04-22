import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AddCardIcon from '@mui/icons-material/AddCard';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import Link from '@mui/material/Link';



export const mainListItems = (
    <React.Fragment>

        <Link href="/Costomer/DashboarCostomer" underline="none">
            <ListItemButton>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItemButton>
        </Link>

        <Link href="/Costomer/datadisplay" underline="none">
            <ListItemButton>
                <ListItemIcon>
                    <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="ข้อมูลการขายยางพารา" />
            </ListItemButton>
        </Link>

        {/* <Link href="/Costomer/ManuredisplayUser" underline="none">
            <ListItemButton>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="ค่าปุ๋ย" />
            </ListItemButton>
        </Link> */}

        <Link href="/Costomer/RevealdisplayUser" underline="none">
            <ListItemButton>
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="เบิกล่วงหน้า" />
            </ListItemButton>
        </Link>

    

    </React.Fragment >
);

export const secondaryListItems = (
    <React.Fragment>
        <ListSubheader component="div" align="lift" inset>
            รายการส่วนตัว
        </ListSubheader>

        <Link href="/Costomer/Userindex" underline="none">
            <ListItemButton>
                <ListItemIcon>
                    <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="แก้ไขประวัติส่วนตัว" />
            </ListItemButton>
        </Link>

        {/* <Link href="/Costomer/Alldb_customer" underline="none">
            <ListItemButton>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="รายการสมาชิกลูกค้า" />
            </ListItemButton>
        </Link> */}

        <Link href="/Costomer/Alldb_pricerubbers" underline="none">
            <ListItemButton>
                <ListItemIcon>
                    <MonetizationOnIcon />
                </ListItemIcon>
                <ListItemText primary="รายการราคาน้ำยาง" />
            </ListItemButton>
        </Link>



    </React.Fragment>
);
