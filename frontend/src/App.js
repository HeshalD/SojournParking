import Header from './Components/Header/Header'
import './App.css';
import ChooseParking from './Components/ChooseParking/ChooseParking';
import Footer from './Components/Footer/Footer'
import MembershipRenewal from './Components/MembershipRenewal/MembershipRenewal';
import DownloadReport from './Components/DownloadReport/DownloadReport';
import PaymentGateway from './Components/PaymentGateway/PaymentGateway';
import ReportPreveiw from './Components/ReportPreveiw/ReportPreveiw';

function App() {
  return (
    <div className="App">
      <Header/>
      <ReportPreveiw/>
    </div>
  );
}

export default App;
