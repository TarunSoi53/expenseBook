import React from 'react';
import { Link } from 'react-router-dom';
import TotalBalance from './totalballance';

function Header({transactions, isAuthenticated}) {
  return (
    <header className="bg-gray-800 p-4 shadow-lg">
      <div className='flex justify-between items-center '>
        <h1 className="text-xl font-bold text-white">Expense Tracker</h1>
        <nav className="container mx-auto flex justify-between items-end">
          <div className="flex space-x-4">
            <Link 
              to="/" 
              className="text-gray-300 hover:text-white transition duration-200"
            >
              Home
            </Link>
            <Link 
              to="/login" 
              className="text-gray-300 hover:text-white transition duration-200"
            >
              Login
            </Link>
            <Link 
              to="/register" 
              className="text-gray-300 hover:text-white transition duration-200"
            >
              Register
            </Link> 
          </div>
        </nav> 
        {isAuthenticated && <TotalBalance transactions={transactions}/>}
      </div>
    </header>
  );
}


export default Header;
