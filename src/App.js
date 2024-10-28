import './App.css'
import { BrowserRouter,  Route, Routes}from"react-router-dom"
import PinVerify from './components/PinVerify';
import LoginPage from './components/Login';

function App() {
  return (
    <div >
      <BrowserRouter>
     <Routes>  
          
     <Route path="/" element={<LoginPage/>} />
          <Route path="/pin" element={<PinVerify/>} />
          </Routes>
          </BrowserRouter>
    </div>
  );
}

export default App;
