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

import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';



export const mainListItems = (


    <React.Fragment>

        <Link href="/Dashboard" underline="none">
            <ListItemButton>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItemButton>
        </Link>

        <Link href="/datadisplay" underline="none">
            <ListItemButton>
                <ListItemIcon>
                    <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary="ข้อมูลการขายยางพารา" />
            </ListItemButton>
        </Link>

        <Link href="/Manuredisplay" underline="none">
            <ListItemButton>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="ค่าปุ๋ย" />
            </ListItemButton>
        </Link>

        <Link href="/Revealdisplay" underline="none">
            <ListItemButton>
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="เบิกล่วงหน้า" />
            </ListItemButton>
        </Link>

        <Link href="/Profit" underline="none">
            <ListItemButton>
                <ListItemIcon>
                    <LayersIcon />
                </ListItemIcon>
                <ListItemText primary="ข้อมูลรายรับและรายจ่าย" />
            </ListItemButton>
        </Link>

        <Link href="/Cumulative_balanceDisplay" underline="none">
            <ListItemButton>
                <ListItemIcon>
                    <LayersIcon />
                </ListItemIcon>
                <ListItemText primary="ยอดเงินสะสมของผู้ขาย" />
            </ListItemButton>
        </Link>






    </React.Fragment>
);

export const secondaryListItems = (
    <React.Fragment>
        <ListSubheader component="div" align="lift" inset>
            รายการส่วนตัว
        </ListSubheader>

        <Link href="/Album" underline="none">
            <ListItemButton>
                <ListItemIcon>
                    <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="รายการสมาชิกผู้ซื้อ" />
            </ListItemButton>
        </Link>

        <Link href="/Alldb_customer" underline="none">
            <ListItemButton>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="รายการสมาชิกลูกค้า" />
            </ListItemButton>
        </Link>


        <Link href="/Alldb_catusers" underline="none">
            <ListItemButton>
                <ListItemIcon>
                    <ManageAccountsIcon />
                </ListItemIcon>
                <ListItemText primary="ประเภทลูกค้า" />
            </ListItemButton>
        </Link>

        <Link href="/Alldb_catwithdraw" underline="none">
            <ListItemButton>
                <ListItemIcon>
                    <AddCardIcon />
                </ListItemIcon>
                <ListItemText primary="ประเภทการเบิกเงิน" />
            </ListItemButton>
        </Link>

        <Link href="/Alldb_pricerubbers" underline="none">
            <ListItemButton>
                <ListItemIcon>
                    <MonetizationOnIcon />
                </ListItemIcon>
                <ListItemText primary="รายการราคาน้ำยาง" />
            </ListItemButton>
        </Link>



    </React.Fragment>
);
