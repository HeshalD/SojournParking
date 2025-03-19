import Header from './Components/Header/Header'
import './App.css';
import ChooseParking from './Components/ChooseParking/ChooseParking';
import Footer from './Components/Footer/Footer'
import MembershipRenewal from './Components/MembershipRenewal/MembershipRenewal';
import DownloadReport from './Components/DownloadReport/DownloadReport';
import PaymentGateway from './Components/PaymentGateway/PaymentGateway';
import ReportPreveiw from './Components/ReportPreveiw/ReportPreveiw';
import MembershipPreveiw from './Components/MembershipPreveiw/MembershipPreveiw';
import DisplayMembership from './Components/DisplayMembership/DisplayMembership';
import UpdateMember from './Components/UpdateMember/UpdateMember';
import {Route,Routes} from "react-router";

function App() {
  return (
    <div className="App">  
      <DisplayMembership/>
      <Routes>
      <Route path ="/DisplayMembership/:id" element = {<UpdateMember/>} />
      </Routes>
    </div>
  );
}

export default App;
