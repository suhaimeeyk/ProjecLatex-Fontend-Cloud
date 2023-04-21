import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Login from './Login'
import Testing from './Testting'
import Costomerindex from './Costomer/index'
import Album from './Album'
import Register from './Register'
import CreateUsers from './CreateUsers'
import EditUser from './EditUser'
import Navbar from './Navbar'
import Alldb_catusers from './Alldb_catusers'
import EditUserdb_catusers from './EditUserdb_catusers'
import Createdb_catusers from './Createdb_catusers'
import Alldb_catwithdraw from './Alldb_catwithdraw'
import Createdb_catwithdraw from './Createdb_catwithdraw'
import Editdb_catwithdraw from './Editdb_catwithdraw'
import Alldb_pricerubbers from './Alldb_pricerubbers'
import UserAlldb_pricerubbers from './user/Alldb_pricerubbers'
import UserAlldb_pricerubbersCostomer from './Costomer/Alldb_pricerubbers'
import EditUserdb_pricerubbers from './EditUserdb_pricerubbers'
import UserEditUserdb_pricerubbers from './user/EditUserdb_pricerubbers'
import Createdb_pricerubbers from './Createdb_pricerubbers'
import UserCreatedb_pricerubbers from './user/Createdb_pricerubbers'
import Alldb_customer from './Alldb_customer'
import Createdb_customer from './Createdb_customer'
import UserCreatedb_customer from './user/Createdb_customer'
import Userindex from './user/Userindex'
import UserindexCostomer from './Costomer/Userindex'
import UserAlldb_customer from './user/Alldb_customer'
import EditUserdb_customer from './EditUserdb_customer'
import UserEditUserdb_customer from './user/EditUserdb_customer'
import UserDatadisplay from './user/datadisplay'
import UserDatadisplayOwner from './Owner/datadisplay'
import CostomerDatadisplay from './Costomer/datadisplay'
import Datadisplay from './datadisplay'
import Createdatadisplay from './Createdatadisplay'
import CreateManuredisplay from './CreateManuredisplay'
import CreateManuredisplayUser from './user/CreateManuredisplayUser'
import CreateRevealdisplay from './CreateRevealdisplay'
import CreateRevealdisplayUser from './user/CreateRevealdisplayUser'
import UserCreatedatadisplay from './user/Createdatadisplay'
import Editdb_data from './Editdb_data'
import CostomerEditdb_data from './Costomer/Editdb_data'
import Process_owner from './Process_owner'
import CostomerProcess_owner from './Costomer/Process_owner'
import Process_divide from './Process_divide'
import CostomerProcess_divide from './Costomer/Process_divide'
import Process_percent from './Process_percent'
import CostomerProcess_percent from './Costomer/Process_percent'
import UserEditdb_data from './user/Editdb_data'
import UserProcess_owner from './user/Process_owner'
import UserProcess_divide from './user/Process_percent'
import UserProcess_percent from './user/Process_divide'
import Manuredisplay from './Manuredisplay'
import ManuredisplayUser from './user/ManuredisplayUser'
import ManuredisplayOwner from './Owner/ManuredisplayUser'
import ManuredisplayCostomer from './Costomer/ManuredisplayUser'
import Manuredisplay_detail from './Manuredisplay_detail'
import Manuredisplay_detailUser from './user/Manuredisplay_detailUser'
import Manuredisplay_detailUserOwner from './Owner/Manuredisplay_detailUser'
import Manuredisplay_detailCostomer from './Costomer/Manuredisplay_detailUser'
import Revealdisplay from './Revealdisplay'
import RevealdisplayUser from './user/RevealdisplayUser'
import RevealdisplayUserOwner from './Owner/RevealdisplayUser'
import RevealdisplayCostomer from './Costomer/RevealdisplayUser'
import Manureeditform from './Manureeditform'
import ManureeditformUser from './user/ManureeditformUser'
import Revealditform from './Revealditform'
import RevealditformUser from './user/RevealditformUser'
import Revealdisplay_detail from './Revealdisplay_detail'
import Revealdisplay_detailUser from './user/Revealdisplay_detailUser'
import Revealdisplay_detailCostomer from './Costomer/Revealdisplay_detailUser'
import Dashboard from './Dashboard'
import DashboardUser from './user/DashboardUser'
import Profit from './Profit'
import ProfitUser from './user/ProfitUser'
import CreateProfitfor_day from './CreateProfitfor_day'
import CreateProfitfor_dayUser from './user/CreateProfitfor_dayUser'
import CreateProfitfor_month from './CreateProfitfor_month'
import CreateProfitincome_day from './CreateProfitincome_day'
import CreateProfitincome_dayUser from './user/CreateProfitincome_dayUser'
import CreateProfit from './CreateProfit'
import CreateProfitUser from './user/CreateProfitUser'
import CustomerLogin from './Costomer/CustomerLogin'
import DashboarCostomer from './Costomer/DashboarCostomer'
import Cumulative_balanceDisplay from './Cumulative_balanceDisplay'
import Cumulative_balanceDisplayUser from './user/Cumulative_balanceDisplay'
import Cumulative_balanceDisplay_detail from './Cumulative_balanceDisplay_detail'
import Cumulative_balanceDisplay_detailUser from './user/Cumulative_balanceDisplay_detail'
import DashboarCostomerOwner from './Owner/DashboarCostomer'
import OwnerData from './Owner/OwnerData'
import CreateOwner from './Owner/CreateOwner'
import ManureeditformOwner from './Owner/Manureeditform'
import Ownerdisplay_detailUser from './Owner/Ownerdisplay_detailUser'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
        <Route path="/" element={<Costomerindex />} />
        {/* <Route path="/Costomer/index" element={<Costomerindex />} /> */}
        <Route path="/testing" element={<Testing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/album" element={<Album />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Costomer/CustomerLogin" element={<CustomerLogin />} />
        <Route path="/Costomer/DashboarCostomer" element={<DashboarCostomer />} />
        <Route path="/CreateUsers" element={<CreateUsers />} />
        <Route path="/Createdb_catusers" element={<Createdb_catusers />} />
        <Route path="/user/Userindex" element={<Userindex />} />
        <Route path="/Costomer/Userindex" element={<UserindexCostomer />} />
        <Route path="/EditUser/:users_id" element={<EditUser />} />
        <Route path="/Navbar" element={<Navbar />} />
        <Route path="/Alldb_catusers" element={<Alldb_catusers />} />
        <Route path="/EditUserdb_catusers/:catusers_id" element={<EditUserdb_catusers />} />
        <Route path="/Editdb_catwithdraw/:catwithdraw_id" element={<Editdb_catwithdraw />} />
        <Route path="/EditUserdb_pricerubbers/:pricerubbers_id" element={<EditUserdb_pricerubbers />} />
        <Route path="/user/EditUserdb_pricerubbers/:pricerubbers_id" element={<UserEditUserdb_pricerubbers />} />
        <Route path="/Alldb_catwithdraw" element={<Alldb_catwithdraw />} />
        <Route path="/Createdb_catwithdraw" element={<Createdb_catwithdraw />} />
        <Route path="/Alldb_pricerubbers" element={<Alldb_pricerubbers />} />
        <Route path="/user/Alldb_pricerubbers" element={<UserAlldb_pricerubbers />} />
        <Route path="/Costomer/Alldb_pricerubbers" element={<UserAlldb_pricerubbersCostomer />} />
        <Route path="/Createdb_pricerubbers" element={<Createdb_pricerubbers />} />
        <Route path="/user/Createdb_pricerubbers" element={<UserCreatedb_pricerubbers />} />
        <Route path="/Alldb_customer" element={<Alldb_customer />} />
        <Route path="/Createdb_customer" element={<Createdb_customer />} />
        <Route path="/user/Createdb_customer" element={<UserCreatedb_customer />} />

        <Route path="/user/Alldb_customer" element={<UserAlldb_customer />} />
        <Route path="/EditUserdb_customer/:customer_id" element={<EditUserdb_customer />} />
        <Route path="/user/EditUserdb_customer/:customer_id" element={<UserEditUserdb_customer />} />
        <Route path="/user/datadisplay" element={<UserDatadisplay />} />
        <Route path="/Owner/datadisplay" element={<UserDatadisplayOwner />} />
        <Route path="/Costomer/datadisplay" element={<CostomerDatadisplay />} />
        <Route path="/datadisplay" element={<Datadisplay />} />
        <Route path="/Createdatadisplay" element={<Createdatadisplay />} />
        <Route path="/CreateManuredisplay" element={<CreateManuredisplay />} />
        <Route path="/user/CreateManuredisplayUser" element={<CreateManuredisplayUser />} />
        <Route path="/CreateRevealdisplay" element={<CreateRevealdisplay />} />
        <Route path="/user/CreateRevealdisplayUser" element={<CreateRevealdisplayUser />} />
        <Route path="/user/Createdatadisplay" element={<UserCreatedatadisplay />} />
        <Route path="/Editdb_data/:data_id" element={<Editdb_data />} />
        <Route path="/Costomer/Editdb_data/:data_id" element={<CostomerEditdb_data />} />
        <Route path="/Process_owner/:data_id" element={<Process_owner />} />
        <Route path="/Costomer/Process_owner/:data_id" element={<CostomerProcess_owner />} />
        <Route path="/Process_divide/:data_id" element={<Process_divide />} />
        <Route path="/Costomer/Process_divide/:data_id" element={<CostomerProcess_divide />} />
        <Route path="/Process_percent/:data_id" element={<Process_percent />} />
        <Route path="/Costomer/Process_percent/:data_id" element={<CostomerProcess_percent />} />
        <Route path="/user/Editdb_data/:data_id" element={<UserEditdb_data />} />
        <Route path="/user/Process_owner/:data_id" element={<UserProcess_owner />} />
        <Route path="/user/Process_divide/:data_id" element={<UserProcess_divide />} />
        <Route path="/user/Process_percent/:data_id" element={<UserProcess_percent />} />
        <Route path="/Manuredisplay" element={<Manuredisplay />} />
        <Route path="/user/ManuredisplayUser" element={<ManuredisplayUser />} />
        <Route path="/Owner/ManuredisplayUser" element={<ManuredisplayOwner />} />
        <Route path="/Costomer/ManuredisplayUser" element={<ManuredisplayCostomer />} />
        <Route path="/Manuredisplay_detail/:manure_id" element={<Manuredisplay_detail />} />
        <Route path="/Cumulative_balanceDisplay_detail/:customer_id" element={<Cumulative_balanceDisplay_detail />} />
        <Route path="/user/Manuredisplay_detailUser/:manure_id" element={<Manuredisplay_detailUser />} />
        <Route path="/Owner/Manuredisplay_detailUser/:manure_id" element={<Manuredisplay_detailUserOwner />} />
        <Route path="/Costomer/Manuredisplay_detailUser/:manure_id" element={<Manuredisplay_detailCostomer />} />
        <Route path="/Revealdisplay_detail/:reveal_id" element={<Revealdisplay_detail />} />
        <Route path="/user/Revealdisplay_detailUser/:reveal_id" element={<Revealdisplay_detailUser />} />
        <Route path="/Costomer/Revealdisplay_detailUser/:reveal_id" element={<Revealdisplay_detailCostomer />} />
        <Route path="/Revealdisplay" element={<Revealdisplay />} />
        <Route path="/user/RevealdisplayUser" element={<RevealdisplayUser />} />
        <Route path="/Owner/RevealdisplayUser" element={<RevealdisplayUserOwner />} />
        <Route path="/Costomer/RevealdisplayUser" element={<RevealdisplayCostomer />} />
        <Route path="/Manureeditform/:manure_id" element={<Manureeditform />} />
        <Route path="/user/ManureeditformUser/:manure_id" element={<ManureeditformUser />} />
        <Route path="/Revealditform/:reveal_id" element={<Revealditform />} />
        <Route path="/user/RevealditformUser/:reveal_id" element={<RevealditformUser />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/user/DashboardUser" element={<DashboardUser />} />
        <Route path="/Profit" element={<Profit />} />
        <Route path="/user/ProfitUser" element={<ProfitUser />} />
        <Route path="/CreateProfitfor_day" element={<CreateProfitfor_day />} />
        <Route path="/user/CreateProfitfor_dayUser" element={<CreateProfitfor_dayUser />} />
        <Route path="/CreateProfitfor_month" element={<CreateProfitfor_month />} />
        <Route path="/CreateProfitincome_day" element={<CreateProfitincome_day />} />
        <Route path="/user/CreateProfitincome_dayUser" element={<CreateProfitincome_dayUser />} />
        <Route path="/CreateProfit" element={<CreateProfit />} />
        <Route path="/user/CreateProfitUser" element={<CreateProfitUser />} />
        <Route path="/Cumulative_balanceDisplay" element={<Cumulative_balanceDisplay />} />
        <Route path="/user/Cumulative_balanceDisplay" element={<Cumulative_balanceDisplayUser />} />
        <Route path="/user/Cumulative_balanceDisplay_detail/:customer_id" element={<Cumulative_balanceDisplay_detailUser />} />
        <Route path="/Owner/DashboarCostomer" element={<DashboarCostomerOwner />} />
        <Route path="/Owner/OwnerData" element={<OwnerData />} />
        <Route path="/Owner/CreateOwner" element={<CreateOwner />} />
        <Route path="/Owner/Manureeditform/:owner_id" element={<ManureeditformOwner />} />
        <Route path="/Owner/Ownerdisplay_detailUser/:owner_id" element={<Ownerdisplay_detailUser />} />




 
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
