import Header from './Components/Header/Header'
import './App.css';
import ChooseParking from './Components/ChooseParking/ChooseParking';
import Footer from './Components/Footer/Footer'
import LandingPage from './Components/LandingPage/LandingPage';
import MadeReservations from './Components/MadeReservations/MadeReservations';
import UserDashboard from './Components/UserDashboard/UserDashboard';
import Admin from './Components/Admin/Admin';


function App() {
  return (
    <div className="App">
      <Header/>
      <Admin/>
      <Footer/>
    </div>
  );
}

export default App;
