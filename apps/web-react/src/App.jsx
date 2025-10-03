import {Routes,Route} from 'react-router-dom';
import Events from './pages/Events';
import Developer from './pages/Developer';
import Schedule from './pages/Schedule';
import Teams from './pages/Teams';
import Home from './pages/Home';
import Timer from './components/Home/Timer/CountdownTimer'

const App = () => {
  return (
    <Routes>
      {/* Corrected line below */}
      <Route path="/" element={<><Home/><Timer/></>} />
      
      <Route path='/Events' element={<Events/>}/>
      <Route path='/Developer' element={<Developer/>}/>
      <Route path='/Schedule' element={<Schedule/>}/>
      <Route path='/Teams' element={<Teams/>}/>
    </Routes>
  );
}

export default App;