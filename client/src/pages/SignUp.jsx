import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SignUp() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [successMsg, setSuccessMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/signup', formData);
      setSuccessMsg('Account created successfully! Redirecting...');
      setTimeout(() => navigate('/sign-in'), 2000);
    } catch (err) {
      setSuccessMsg('Signup failed. Try again.');
    }
  };

  return (
    <div className='p-4 max-w-md mx-auto'>
      <h1 className='text-2xl font-bold mb-4'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type='text' id='username' placeholder='Username' className='border p-2' onChange={handleChange} />
        <input type='email' id='email' placeholder='Email' className='border p-2' onChange={handleChange} />
        <input type='password' id='password' placeholder='Password' className='border p-2' onChange={handleChange} />
        <button className='bg-blue-500 text-white p-2 rounded'>Sign Up</button>
      </form>
      {successMsg && <p className='text-green-600 mt-4'>{successMsg}</p>}
    </div>
  );
}
