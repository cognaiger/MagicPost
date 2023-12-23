import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import "./TrackingBar.scss"

const TrackingBar = () => {
    return (
        <div className='container'>
            <form className='form'>
                <p>Tracking</p>
                <div className="form-container">
                    <input className='search-bar' type='search' placeholder='Enter your code'></input>
                    <button className='search-btn'><SearchIcon/></button>
                </div>
            </form>
        </div>
    );
}

export default TrackingBar;