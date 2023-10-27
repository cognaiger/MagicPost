import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Register.scss';

function Register() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [pass, setPass] = useState('');
    const [msg, setMsg] = useState('');

    const handleSubmit = () => {

    }

    return (
        <div className="register">
          <div className="card">
            <div className="left">
              <h1>Lama Social.</h1>
              <p>
                Want to ship your package to everywhere in lighting speed? Begin the first step by creating an 
                account
              </p>
              <span>Do you have an account?</span>
              <button>
                <Link to="/login" style={{ textDecoration: "none" }}>Login</Link>
              </button>
            </div>
            <div className="right">
              <h1>Register</h1>
              <form onSubmit={handleSubmit}>
                <input type="email" value={email} 
                onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <input type="text" value={name} 
                onChange={(e) => setName(e.target.value)} placeholder="Full Name" />
                <input type="password" value={pass} 
                onChange={(e) => setPass(e.target.value)} placeholder="Password" />
                <button type="submit">Register</button>
  
                <div className="msg">{msg ? <p>{msg}</p> : null}</div>
              </form>
            </div>
          </div>
        </div>
    );
}

export default Register;