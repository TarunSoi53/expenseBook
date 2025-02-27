import React,{useState } from 'react';
import api from '../axios/api';
function Register() {

  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);



  const handleSubmit = (e)=>{
    e.preventDefault();
    // handle form submission here
    console.log("Form submitted");
    // validate form inputs

    // send form data to the server
    setLoading(true);
    setError('');
    setSuccess(false);
    setMessage('');
    // send form data to the server
    api.post("/api/auth/register", {
     username,
      email,
      password,

    })
    .then((response) => {
      console.log("response", response);
      setLoading(false);
      setSuccess(true);
      setMessage("Registration successful");
    })
    // handle errors
    .catch((error) => {
      console.error("error", error);
      setLoading(false);
      setSuccess(false);
      setError("Registration failed");
    }
    )
    



  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg backdrop-blur-sm bg-opacity-50 border border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-white">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">userName</label>
            <input
              type="text"
              onChange={(e) => setUserName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">ConformPassword</label>
            <input
              type="password"
              onBlur={(e) => {
                if (e.target.value !== password) {
                  setError("Passwords do not match");
                } else {
                  setError("");
                }
              }}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold transition duration-200"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
