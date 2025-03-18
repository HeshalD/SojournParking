import Header from './Components/Header/Header'
import './App.css';
import ChooseParking from './Components/ChooseParking/ChooseParking';
import Footer from './Components/Footer/Footer'
import LandingPage from './Components/LandingPage/LandingPage';
import MadeReservations from './Components/MadeReservations/MadeReservations';
import React from 'react';
import {Routes,Route} from "react-router"
import UpdateReservations from './Components/UpdateReservations/UpdateReservations';

function App() {
  return (
    <div className="App">
      <React.Fragment>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/chooseParking" element={<ChooseParking/>}/>
          <Route path="/madeReservations" element={<MadeReservations/>}/>
          <Route path="/madeReservations/:lp" element={<UpdateReservations/>}/>
        </Routes>
      </React.Fragment>
    </div>
  );
}

export default App;
