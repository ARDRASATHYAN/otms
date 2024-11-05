import './App.css'
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import PinVerify from './components/PinVerify';
import LoginPage from './components/Login';
import Layout from './components/Layout';

function App() {
  const token = localStorage.getItem('token');
  return (
    <div >
      <BrowserRouter>
        <Routes>

          <Route path="/" element={token ? <Layout /> : <Navigate to="/login" replace />} />
          <Route path="/" element={<Layout />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/pin" element={<PinVerify />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
