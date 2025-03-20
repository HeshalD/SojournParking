import Header from './Components/Header/Header';
import './App.css';
import ChooseParking from './Components/ChooseParking/ChooseParking';
import Footer from './Components/Footer/Footer';
import LandingPage from './Components/LandingPage/LandingPage';
import MadeReservations from './Components/MadeReservations/MadeReservations';
import React from 'react';
import { Routes, Route } from 'react-router';
import UpdateReservations from './Components/UpdateReservations/UpdateReservations';
import Review from './Components/Review/Review';
import Complaint from './Components/Complaint/Complaint';
import DisplayComplaint from './Components/DisplayComplaint/DisplayComplaint';
const router = require('./Routes/ComplaintRoutes');

app.use(express.json());
app.use('/complaint', router);

function App() {
	return (
		<div className="App">
			<Complaint />
		</div>
	);
}

export default App;
