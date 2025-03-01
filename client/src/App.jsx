import React,{ useState,useEffect } from 'react'
import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Header from './components/header';
import ProtectedRoute from './security/ProtectedRoute';
import fetchTransactions from './data/featchdata';
import BackgroundGrid from './components/background';

function App() {
  const [transactions, setTransactions] = useState([]);
  const[localTranscations, setLocalTransactions] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
     {/* <BackgroundGrid/> */}
      <div className='background-pattern z-20 fixed  h-screen w-screen '></div>
      <div className="min-h-screen bg-[#00000000]  text-white">
          


        <Header  isAuthenticated={isAuthenticated} transactions={transactions}/>
       

     
        <Routes>
            <Route path="/" element={
              <ProtectedRoute>

                <Home transactions={transactions} setTransactions={setTransactions} />
               { console.log("Rendering Home with transactions:", transactions)}              </ProtectedRoute>
              }/>
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />}/>
            <Route path="/register" element={<Register />}/>
      

        </Routes>
        </div>
      
    </Router>
  )
}

export default App
