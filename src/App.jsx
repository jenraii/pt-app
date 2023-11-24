import './App.css';
import CustomerList from './components/CustomerList';
import TrainingList from './components/TrainingList';
import Calendar from './components/Calendar';
import Home from './components/Home';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className='navigation'>
          <Link to="/">Home</Link>{' '}
          <Link to="/customers">Customers</Link>{' '}
          <Link to="/trainings">Trainings</Link>{' '}
          <Link to="/calendar">Calendar</Link>
        </div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/trainings" element={<TrainingList />} />
          <Route path="/calendar" element={<Calendar />} />      
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
