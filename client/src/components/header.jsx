import React from 'react';
import { Link } from 'react-router-dom';
import TotalBalance from './totalballance';
import ProtectedRoute from '.././security/ProtectedRoute';

function Header({transactions, isAuthenticated}) {
  return (
    
    <div className="z-20 fixed w-screen text-white bg-opacity-50 bg-[#807c7c1f] backdrop-blur-sm p-4 shadow-lg shadow-[#7b9abc]">
      <div className='flex justify-between items-center '>
        <h1 className="text-xl font-bold text-white">Expense Tracker</h1>
        <nav className="container mx-auto flex justify-between items-end">
          <div className="flex space-x-4">
            <Link 
              to="/" 
              className=" hover:text-white transition duration-200"
            >
              Home
            </Link>
            <Link 
              to="/login" 
              className=" hover:text-white transition duration-200"
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
        <div>
       
          </div> 
      </div>
    </div>
              
  );
}


export default Header;
