import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.scss';
import { AuthContext } from '../../context/authContext';

const Login = () => {
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [msg, setMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    login(email, pass);

  }

  return (
    <div className="login">
      <div className="card">
        <div className="left"> </div>
        <div className="right">
          <h1>Welcome back!</h1>
          <p>
            Please enter your details
          </p>
          <form>
            <input type="text" placeholder="Email" value={email}
              onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" value={pass}
              onChange={(e) => setPass(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
          </form>
          {msg}
          <span>Don't you have an account?&nbsp; <a href = "/register" className="signup"> Sign Up</a></span>
        </div>
      </div>
    </div>
  );
}

export default Login;