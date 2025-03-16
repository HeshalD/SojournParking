import Header from './Components/Header/Header'
import './App.css';
import ChooseParking from './Components/ChooseParking/ChooseParking';
import Footer from './Components/Footer/Footer'
import LandingPage from './Components/LandingPage/LandingPage';
import MadeReservations from './Components/MadeReservations/MadeReservations';

function App() {
  return (
    <div className="App">
      <Header/>
      <MadeReservations/>
      <Footer/>
    </div>
  );
}

export default App;
