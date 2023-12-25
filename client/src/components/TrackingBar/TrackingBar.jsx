import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import "./TrackingBar.scss"
import TrackingModal from '../TrackingModal/TrackingModal';
import axios from 'axios';

const TrackingBar = ({ setMsg }) => {
    const [code, setCode] = useState('');
    const [trackOpen, setTrackOpen] = useState(false);
    const [orderData, setOrderData] = useState();
    const [billStatus, setBillStatus] = useState();

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response1 = await axios.get("http://localhost:2504/order/ofbill", {
                params: {
                    id: code
                }
            });

            const response2 = await axios.get(`http://localhost:2504/bill/${code}`);

            setBillStatus(response2.data.status);
            setOrderData(response1.data);
            setTrackOpen(true);
        } catch (err) {
            setMsg("Invalid code");
        }
    }

    return (
        <div className='container'>
            <form className='form'>
                <p>Tracking</p>
                <div className="form-container">
                    <input className='search-bar' type='search' placeholder='Enter your code' value={code} onChange={(e) => setCode(e.target.value)}
                    ></input>
                    <button className='search-btn' onClick={handleSearch}>
                        <SearchIcon />
                    </button>
                </div>
            </form>
            {trackOpen && <TrackingModal trackOpen={trackOpen} setTrackOpen={setTrackOpen} orderData={orderData} billId={code} billStatus={billStatus} />}
        </div>
    );
}

export default TrackingBar;