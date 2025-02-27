import React,{ useState,useEffect } from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/home';
import Header from './components/header';
import ProtectedRoute from './security/ProtectedRoute';
import fetchTransactions from './data/featchdata';

function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const getTransactions = async () => {
        const transactionsFromServer = await fetchTransactions();
        setTransactions(transactionsFromServer);
    };
    getTransactions();
}, []);
  console.log("Transactions state:", transactions); // Log transactions state for debugging


 

 
  return (
    <Router>
        <div className="min-h-screen bg-[#000000] text-white">
          

        <Header transactions={transactions}/>
     
        <Routes>
            <Route path="/" element={
              <ProtectedRoute>

                <Home transactions={transactions} setTransactions={setTransactions} />
                console.log("Rendering Home with transactions:", transactions); // Log transactions being passed to Home

              </ProtectedRoute>
              }/>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
      

        </Routes>
        </div>
      
    </Router>
  )
}

export default App
