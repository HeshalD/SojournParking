import React from 'react';
import { Route,Routes } from 'react-router-dom';
import Header from './Components/Header/Header'
import './App.css';
import ChooseParking from './Components/ChooseParking/ChooseParking';
import Footer from './Components/Footer/Footer'
import SelectEmergency from './Components/SelectEmergency/SelectEmergency';
import AddServiceProvider from './Components/AddServiceProvider/AddServiceProvider';
import ListServiceProvider from './Components/ListServiceProvider/ListServiceProvider';
import ListServiceProviderCustomer from './Components/ListServiceProviderCustomer/ListServiceProviderCustomer';
import MechanicalIssue from './Components/MechanicalIssue/MechanicalIssue';
import MedicalIssue from './Components/MedicalIssue/MedicalIssue';
import SecurityIssue from './Components/SecurityIssue/SecurityIssue';
import ResponsePage from './Components/ResponsePage/ResponsePage';
import ServiceProviderProfile from './Components/ServiceProviderProfile/ServiceProviderProfile';
import Provider from './Components/Provider/Provider';
import UpdateServiceProvider from './Components/UpdateServiceProvider/UpdateServiceProvider';


function App() {
  return (
    <div className="App">
    <React.Fragment>
     <Routes>
     <Route path="/" element={<AddServiceProvider/>}/>
     <Route path="/ServiceProviderProfile" element={<ServiceProviderProfile/>}/>
     <Route path="/UpdateServiceProvider/:id" element={<UpdateServiceProvider/>}/>
     </Routes>
     </React.Fragment>
     
     
    
     
    </div>
  );
}

export default App;
