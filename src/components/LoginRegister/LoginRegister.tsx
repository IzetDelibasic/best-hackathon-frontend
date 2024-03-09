import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { backgroundImage } from '../../constants/ImagesConstants';

const LoginRegister: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState(1);
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLoginSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const userData = { email, password };
      const response = await fetch('http://localhost:5214/api/User/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      // Sačuvaj podatke u localStorage
      const userDataJson = await response.json();
      localStorage.setItem('loggedInUserData', JSON.stringify(userDataJson));
      navigate('/teach-room');
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  const handleRegisterSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const userData = { email, password, firstName, lastName, role };
      const response = await fetch('http://localhost:5214/api/User/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      setIsLogin(true);
      setErrorMessage('Registration successful. Please log in.');

      // Sačuvaj podatke u localStorage
      const userDataJson = await response.json();
      localStorage.setItem('loggedInUserData', JSON.stringify(userDataJson));
      navigate('/teach-room');
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  const handleToggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="font-quicksand">
      <div className="min-h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="bg-white rounded-lg shadow-lg p-8 w-96">
          {isLogin ? (
            <>
              <h1 className="text-2xl font-bold text-red-500 uppercase mb-4 text-center">Login</h1>
              <form className="flex flex-col items-center" onSubmit={handleLoginSubmit}>
                <div className="mb-4">
                  <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-gray-800 text-white border-none rounded-lg px-4 py-3" />
                </div>
                <div className="mb-4">
                  <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-gray-800 text-white border-none rounded-lg px-4 py-3" />
                </div>
                <button type="submit" className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors duration-300">Login</button>
              </form>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-red-500 uppercase mb-4 text-center">Register</h1>
              <form className="flex flex-col items-center" onSubmit={handleRegisterSubmit}>
                <div className="mb-4">
                  <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full bg-gray-800 text-white border-none rounded-lg px-4 py-3" />
                </div>
                <div className="mb-4">
                  <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full bg-gray-800 text-white border-none rounded-lg px-4 py-3" />
                </div>
                <div className="mb-4">
                  <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-gray-800 text-white border-none rounded-lg px-4 py-3" />
                </div>
                <div className="mb-4">
                  <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-gray-800 text-white border-none rounded-lg px-4 py-3" />
                </div>
                <div className="mb-4">
                  <select value={role} onChange={(e) => setRole(parseInt(e.target.value))} className="w-full bg-gray-800 text-white border-none rounded-lg px-4 py-3">
                    <option value="1">Teacher</option>
                    <option value="2">Parent</option>
                  </select>
                </div>
                <button type="submit" className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors duration-300">Register</button>
              </form>
            </>
          )}
          <div className="mt-4 flex justify-center">
            <button className="text-blue-500 hover:text-blue-700" onClick={handleToggleForm}>
              {isLogin ? "Don't have an account? Register here." : "Already have an account? Login here."}
            </button>
          </div>
          {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
