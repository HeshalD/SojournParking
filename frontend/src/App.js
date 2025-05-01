
import './App.css';
import ChooseParking from './Components/ChooseParking/ChooseParking';
import LandingPage from './Components/LandingPage/LandingPage';
import MadeReservations from './Components/MadeReservations/MadeReservations';
import React from 'react';
import {Routes,Route, Router} from "react-router"
import UpdateReservations from './Components/UpdateReservations/UpdateReservations';
import FindMyLocation from './Components/FindMyLocation/FindMyLocation';
import RealTimeReservations from './Components/RealTimeReservations/RealTimeReservations';
import RealTimeReservationMade from './Components/RealTimeReservationMade/RealTimeReservationMade';
import EndStay from './Components/EndStay/EndStay';
import EndStayConfirmation from './Components/EndStayConfirmation/EndStayConfirmation';
import Register from './Components/RegisterUser/RegisterUser';
import Login from './Components/UserLogin/UserLogin';
import UserDashboard from './Components/UserDashboard/UserDashboard';
import AddServiceProvider from './Components/AddServiceProvider/AddServiceProvider';
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
import Complaint from './Components/AddCompliant/AddComplant';
import UpdateComplaint from './Components/UpdateComplaint/UpdateComplaint';
import DisplayComplaint from './Components/DisplayComplaint/DisplayComplaint';
import EmployeeLandingPage from './Components/EmployeeLandingPage/EmployeeLandingPage';
import AddReview from './Components/AddReview/AddReview';
import DisplayReview from './Components/DisplayReview/DisplayReview';
import UpdateReview from './Components/UpdateReview/UpdateReview';
import ReservationTable from './Components/ReservationTable/ReservationTable';
import ComplaintTable from './Components/ComplaintTable/ComplaintTable';
import ReviewTable from './Components/ReviewTable/ReviewTable';


function App() {
  return (
    <div className="App">
      <React.Fragment>
        <Routes>
          
          <Route path="/landingPage" element={<LandingPage/>}/>
          <Route path="/chooseParking" element={<ChooseParking/>}/>
          <Route path="/madeReservations" element={<MadeReservations/>}/>
          <Route path="/madeReservations/:id" element={<UpdateReservations/>}/>
          <Route path="/findMyLocation/:id" element={<FindMyLocation/>}/>
          <Route path="/realTimeReservations" element={<RealTimeReservations/>}/>
          <Route path="/realTimeReservationMade" element={<RealTimeReservationMade/>}/>
          <Route path="/endStay" element={<EndStay/>}/>
          <Route path="/endStayConfirmation/:licensePlate" element={<EndStayConfirmation/>}/>
          <Route path="/user/register" element={<Register/>}/>
          <Route path="/" element={<Login/>}/>
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
          <Route path="/addComplaint" element={<Complaint/>}/>
          <Route path="/displayComplaint" element={<DisplayComplaint/>}/>
          <Route path="/updateComplaint/:id" element={<UpdateComplaint/>}/>
          <Route path="/employeeLandingPage" element={<EmployeeLandingPage/>}/>
          <Route path="/addReview" element={<AddReview/>}/>
          <Route path="/displayReview" element={<DisplayReview/>}/>
          <Route path="/updateReview/:id" element={<UpdateReview/>}/>
          <Route path="/reservationTable" element={<ReservationTable/>}/>
          <Route path="/complaintTable" element={<ComplaintTable/>}/>
          <Route path="/reviewTable" element={<ReviewTable/>}/>
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
