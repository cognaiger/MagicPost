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
      } else if (response.status === 400) {
        console.log("error");
        setMsg(response.message);
      }
    } catch (err) {
      console.log(err);
      setMsg("Password must be longer than 8 characters");
    }
  }

  return (
    <div className="register">
      <div className="card">
        <div className="left"></div>
        <div className="right">
          <h1>MagicPost</h1>
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
          <span>Do you have an account?&nbsp; <a href="/login" className="Login"> Login</a></span>
        </div>
      </div>
    </div>
  );
}

export default Register;