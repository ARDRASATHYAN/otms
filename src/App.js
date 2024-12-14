import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import PinVerify from './components/PinVerify';
import LoginPage from './components/Login';
import Layout from './components/Layout';
import TransactionSummary from './components/TransactionSummary';
import Account_Summery from './components/Account_Summery';
import Cancelled_Summery from './components/Cancelled_Summery';
import Agents from './components/Agents';
import ValidatPin from './components/ValidatPin';
import ChangePassword from './components/ChangePassword';
import TransactionDetails from './components/TransactionDetails';
import CancelledDetails from './components/CancelledDetails';
import TokenRefresh from './components/TokenRefresh';

function App() {
  const token = localStorage.getItem('token');
  return (
    <div>
      <Router>
        <TokenRefresh/>
        <Routes>
         
        <Route path="/pin" element={<PinVerify />} />
       
         
          {token ? (
            <>
           
              {/* <Route path="/home" element={<Layout />} /> */}
              <Route path="/validatepin" element={<Layout><ValidatPin /></Layout>} />
              <Route path="/changepassword" element={<Layout><ChangePassword /></Layout>} />
              <Route path="/home" element={<Layout><Agents /></Layout>} />
              <Route path="/accounts" element={<Layout><Account_Summery /></Layout>} />
              <Route path="/trans" element={<Layout><TransactionSummary /></Layout>} />
              <Route path="/cancel" element={<Layout><Cancelled_Summery /></Layout>} />
              <Route path="/transaction/:id" element={<Layout><TransactionDetails/></Layout>} />
              <Route path="/canceldetail/:id" element={<Layout><CancelledDetails/></Layout>} />
            </>
          ) : (
            <Route path="/" element={<LoginPage />} />
          )}

          {/* Redirect if no matching route */}
          <Route path="*" element={<Navigate to={token ? "/home" : "/"} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
