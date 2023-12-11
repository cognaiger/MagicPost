import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.scss';
import axios from 'axios';

function Register() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const [msg, setMsg] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:2504/auth/register", {
        email: email,
        fullName: name,
        password: pass
      });

      if (response.status === 201) {
        console.log("successful");
        navigate("/");
      } else {
        console.log("error");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="register">
      <div className="card">
        <div className="right"></div>
        <div className="left">
          <h1>Magic Post</h1>
          <p>
            Want to ship your package to everywhere in lighting speed? Begin the first step by creating an
            account
          </p>
          {/* <button>
            <Link to="/login" style={{ textDecoration: "none" }}>Login</Link>
          </button> */}
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
          <span>Do you have an account? <a href = "/login" className="login">Login</a></span>
        </div>
      </div>
    </div>
  );
}

export default Register;