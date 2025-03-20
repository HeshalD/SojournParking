
import './App.css';
import ChooseParking from './Components/ChooseParking/ChooseParking';
import LandingPage from './Components/LandingPage/LandingPage';
import MadeReservations from './Components/MadeReservations/MadeReservations';
import React from 'react';
import {Routes,Route} from "react-router"
import UpdateReservations from './Components/UpdateReservations/UpdateReservations';
import FindMyLocation from './Components/FindMyLocation/FindMyLocation';
import RealTimeReservations from './Components/RealTimeReservations/RealTimeReservations';
import RealTimeReservationMade from './Components/RealTimeReservationMade/RealTimeReservationMade';
import EndStay from './Components/EndStay/EndStay';
import EndStayConfirmation from './EndStayConfirmation/EndStayConfirmation';

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
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
