import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import './App.css';
import ChooseParking from './Components/ChooseParking/ChooseParking';
import Footer from './Components/Footer/Footer';
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
import DisplayMedIssue from './Components/DisplayMedIssue/DisplayMedIssue';
import UpdateMedIssue from './Components/UpdateMedIssue/UpdateMedIssue';
import DisMedIssue from './Components/DisMedIssue/DisMedIssue';
import DisplaySecIssue from './Components/DisplaySecIssue/DisplaySecIssue';
import UpdateSecIssue from './Components/UpdateSecIssue/UpdateSecIssue';
import DisplayMecIssue from './Components/DisplayMecIssue/DisplayMecIssue';
import UpdateMecIssue from './Components/UpdateMecIssue/UpdateMecIssue';
import ResponsePageS from './Components/ResponsePageS/ResponsePageS';
import ResponsePageM from './Components/ResponsePageM/ResponsePageM';
import AddServiceProviderResponse from './Components/AddServiceProviderResponse/AddServiceProviderResponse';
import EmergencyReports from './Components/EmergencyReports/EmergencyReports';

function App() {
  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <Routes>
          {/* Emergency System Routes */}
          <Route path="/" element={<SelectEmergency />} />
          <Route path="/medical-emergency" element={<MedicalIssue />} />
          <Route path="/mechanical-issue" element={<MechanicalIssue />} />
          <Route path="/security-issue" element={<SecurityIssue />} />
          <Route path="/response" element={<ResponsePage />} />
          <Route path="/responseM" element={<ResponsePageM />} />
          <Route path="/responseS" element={<ResponsePageS />} />
          <Route path="/displaymedissue" element={<DisplayMedIssue />} />
          <Route path="/displaymecissue" element={<DisplayMecIssue />} />
          <Route path="/displaysecissue" element={<DisplaySecIssue />} />
          <Route path="/updatemedissue/:id" element={<UpdateMedIssue />} />
          <Route path="/updatemecissue/:id" element={<UpdateMecIssue />} />
          <Route path="/updatesecissue/:id" element={<UpdateSecIssue />} />
          <Route path="/addserviceprovider" element={<AddServiceProvider />} />
          <Route path="/addserviceproviderresponse" element={<AddServiceProviderResponse />} />
          <Route path="/updateserviceprovider/:id" element={<UpdateServiceProvider />} />
          <Route path="/serviceproviderprofile" element={<ServiceProviderProfile />} />
          <Route path="/emergency-reports" element={<EmergencyReports />} />
          <Route path="/listserviceprovider" element={<ListServiceProvider />} />

        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;