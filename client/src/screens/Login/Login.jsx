import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.scss';

function Login() {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [msg, setMsg] = useState('');

    const handleLogin = () => {

    }

    return (
        <div className="login">
          <div className="card">
            <div className="left">
              <h1>Welcome Back</h1>
              <p>
                Please enter your credentials to access your account and manage your shipments with ease. 
                We're here to make your shipping experience as simple as possible.
              </p>
              <span>Don't you have an account?</span>
              <button>
                <Link to="/register" style={{ textDecoration: "none" }}>Register</Link>
              </button>
            </div>

            <div className="right">
              <h1>Login</h1>
              <form>
                <input type="text" placeholder="Email" value={email} 
                onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={pass}
                onChange={(e) => setPass(e.target.value)} />
                <button onClick={handleLogin}>Login</button>
              </form>
              {msg}
            </div>
          </div>
        </div>
    );
}

export default Login;