import React,{useState} from 'react';
import api from '../axios/api';
import { useNavigate } from 'react-router-dom'; 

function Login(setIsAuthenticated) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.post('/api/auth/login', { email, password });
      console.log(response.data);

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        setSuccess(true);
        setIsAuthenticated(true);
        setMessage('Login successful');
        setTimeout(() => {
          setSuccess(false);
        }, 3000);
        setLoading(false);
        setPassword("")
        setLoading(false);
        setEmail("")
        navigate('/');
      } else {
        setError(response.data.message);
       
      }
    } catch (error) {
      console.error(error);
      setError('Failed to login');
    } finally {
      setLoading(false);
      setPassword("")
      setLoading(false);
      setEmail("")
      setMessage('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg backdrop-blur-sm bg-opacity-50 border border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-white">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">Email</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-semibold transition duration-200"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <a href="/register" className="text-blue-500 hover:text-blue-600">
            Register now
          </a>
          {loading && <p className="text-yellow-500">Loading...</p>}
          {success && <p className="text-green-500">{message}</p>}
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default Login;
