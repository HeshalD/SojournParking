import './App.css';
import ChooseParking from './Components/ChooseParking/ChooseParking';
import LandingPage from './Components/LandingPage/LandingPage';
import MadeReservations from './Components/MadeReservations/MadeReservations';
import React from 'react';
import { Routes, Route } from "react-router-dom";
import UpdateReservations from './Components/UpdateReservations/UpdateReservations';
import FindMyLocation from './Components/FindMyLocation/FindMyLocation';
import RealTimeReservations from './Components/RealTimeReservations/RealTimeReservations';
import RealTimeReservationMade from './Components/RealTimeReservationMade/RealTimeReservationMade';
import EndStay from './Components/EndStay/EndStay';
import EndStayConfirmation from './Components/EndStayConfirmation/EndStayConfirmation';
import UserDashboard from './Components/UserDashboard/UserDashboard';
import ServiceProviderProfile from './Components/ServiceProviderProfile/ServiceProviderProfile';
import UpdateServiceProvider from './Components/UpdateServiceProvider/UpdateServiceProvider';
import AdminLogin from './Components/AdminLogin/AdminLogin';
import Dashboard from './Components/AdminDashboard/AdminDashboard';
import RegisterEmployee from './Components/RegisterEmployee/RegisterEmployee';
import EmployeeLogin from './Components/EmployeeLogin/EmployeeLogin';
import MembershipRenewal from './Components/AddMembership/AddMembership';
import DisplayMembership from './Components/DisplayMembership/DisplayMembership';
import UpdateMembership from './Components/UpdateMembership/UpdateMembership';
import PaymentForm from './Components/PaymentForm/PaymentForm';
import PaymentReceipt from './Components/PaymentRecipt/PaymentRecipt';
import PaymentGateway from './Components/PaymentGateway/PaymentGateway';
import PaymentConfirmation from './Components/PaymentConfirmation/PaymentConfirmation';
import AddServiceProvider from './Components/AddServiceProvider/AddServiceProvider';
import ListServiceProvider from './Components/ListServiceProvider/ListServiceProvider';
import SecurityIssue from './Components/SecurityIssue/SecurityIssue';
import MedicalIssue from './Components/MedicalIssue/MedicalIssue';
import MechanicalIssue from './Components/MechanicalIssue/MechanicalIssue';
import DisplaySecIssue from './Components/DisplaySecIssue/DisplaySecIssue';
import DisplayMedIssue from './Components/DisplayMedIssue/DisplayMedIssue';
import DisplayMecIssue from './Components/DisplayMecIssue/DisplayMecIssue';
import EmergencyReports from './Components/EmergencyReports/EmergencyReports';
import ForgotPasswordPage from './Components/ForgotPassword/ForgotPasswordPage';
import OAuthSuccess from './Components/AuthLoginReg/OAuthSuccess';
import ForgotPassword from './Components/AuthLoginReg/ForgotPassword';
import ResetPassword from './Components/AuthLoginReg/ResetPassword';
import AuthLoginReg from './Components/AuthLoginReg/AuthLoginReg';
import SelectEmergency from './Components/SelectEmergency/SelectEmergency';
import ResponsePage from './Components/ResponsePage/ResponsePage'
import ResponsePageM from './Components/ResponsePageM/ResponsePageM'
import ResponsePageS from './Components/ResponsePageS/ResponsePageS'




function App() {
  return (
    <div className="App">
      <React.Fragment>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/chooseParking" element={<ChooseParking/>}/>
          <Route path="/madeReservations" element={<MadeReservations/>}/>
          <Route path="/madeReservations/:id" element={<UpdateReservations/>}/>
          <Route path="/findMyLocation/:id" element={<FindMyLocation/>}/>
          <Route path="/realTimeReservations" element={<RealTimeReservations/>}/>
          <Route path="/realTimeReservationMade" element={<RealTimeReservationMade/>}/>
          <Route path="/endStay" element={<EndStay/>}/>
          <Route path="/endStayConfirmation/:licensePlate" element={<EndStayConfirmation/>}/>
          <Route path="/userDashboard" element={<UserDashboard/>}/>
          <Route path="/addServiceProvider" element={<AddServiceProvider/>}/>
          <Route path="/ServiceProviderProfile" element={<ServiceProviderProfile/>}/>
          <Route path="/UpdateServiceProvider/:id" element={<UpdateServiceProvider/>}/>
          <Route path="/adminLogin" element={<AdminLogin/>}/>
          <Route path="/adminDashboard" element={<Dashboard/>}/>
          <Route path="/empRegister" element={<RegisterEmployee/>}/>
          <Route path="/empLogin" element={<EmployeeLogin/>}/>
          <Route path="/renewMembership" element={<MembershipRenewal/>}/>
          <Route path="/displayMembership" element={<DisplayMembership/>}/>
          <Route path="/updateMembership/:id" element={<UpdateMembership/>}/>
          <Route path="/paymentForm" element={<PaymentForm/>}/>
          <Route path="/paymentReceipt" element={<PaymentReceipt/>}/>
          <Route path="/paymentPortal" element={<PaymentGateway/>}/>
          <Route path="/paymentConfirmation" element={<PaymentConfirmation/>}/>
          <Route path="/ListServiceProvider" element={<ListServiceProvider/>}/>
          <Route path="/SecurityIssue" element={<SecurityIssue/>}/>
          <Route path="/MedicalIssue" element={<MedicalIssue/>}/>
          <Route path="/MechanicalIssue" element={<MechanicalIssue/>}/>
          <Route path="/DisplaySecIssue" element={<DisplaySecIssue/>}/>
          <Route path="/DisplayMedIssue" element={<DisplayMedIssue/>}/>
          <Route path="/DisplayMecIssue" element={<DisplayMecIssue/>}/>
          <Route path="/EmergencyReports" element={<EmergencyReports/>}/>
          <Route path="/Login" element={<AuthLoginReg />} />
          <Route path="/ForgotPassword" element={<ForgotPasswordPage />} />
          <Route path="/oauth-success" element={<OAuthSuccess />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/select-emergency" element={<SelectEmergency/>}/>
          <Route path="/medical-emergency" element={<MedicalIssue/>}/>
          <Route path="/response" element={<ResponsePage/>}/>
          <Route path="/mechanical-issue" element={<MechanicalIssue/>}/>
          <Route path="/responseM" element={<ResponsePageM/>}/>
          <Route path="/security-issue" element={<SecurityIssue/>}/>
          <Route path="/responseS" element={<ResponsePageS/>}/>
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;