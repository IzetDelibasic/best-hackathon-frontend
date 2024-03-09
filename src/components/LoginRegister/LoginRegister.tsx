import { useState } from 'react';
import { backgroundImage } from '../../constants/ImagesConstants';

const LoginRegister = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5214/api/User/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData);
      }

      const responseData = await response.json();
      // Ovdje možete obraditi odgovor s backenda, npr. prikazati poruku korisniku
      console.log(responseData);
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="font-quicksand">
      <div className="min-h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="bg-white rounded-lg shadow-lg p-8 w-96">
          <h1 className="text-2xl font-bold text-red-500 uppercase mb-4">Login</h1>
          <form className="flex flex-col items-center" onSubmit={handleSubmit}>
            <div className="mb-4">
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-gray-800 text-white border-none rounded-lg px-4 py-3" />
            </div>
            <div className="mb-4">
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-gray-800 text-white border-none rounded-lg px-4 py-3" />
            </div>
            <button type="submit" className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors duration-300">Login</button>
            {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginRegister;
