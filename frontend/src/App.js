import Header from './Components/Header/Header'
import './App.css';
import ChooseParking from './Components/ChooseParking/ChooseParking';
import Footer from './Components/Footer/Footer'
import UserDashboard from './Components/UserDashboard/UserDashboard';

function App() {
  return (
    <div className="App">
      <Header/>
      <UserDashboard/>
    </div>
  );
}

export default App;
