import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import "./TrackingBar.scss"
import { useNavigate } from 'react-router-dom';

const TrackingBar = () => {
    const [code, setCode] = useState('');
    const naviagate = useNavigate();

    const handleSearch = () => {
        naviagate("detail");
    }

    return (
        <div className='container'>
            <form className='form'>
                <p>Tracking</p>
                <div className="form-container">
                    <input className='search-bar' type='search' placeholder='Enter your code' value={code} onChange={(e) => setCode(e.target.value)}
                    ></input>
                    <button className='search-btn' onClick={handleSearch}><SearchIcon/></button>
                </div>
            </form>
        </div>
    );
}

export default TrackingBar;