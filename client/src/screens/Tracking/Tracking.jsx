import React, { useState } from 'react';
import "./Tracking.scss";
import TrackingBar from '../../components/TrackingBar/TrackingBar';

function Tracking() {
  const [msg, setMsg] = useState("");

  return (
    <div className='tracking'>
      <TrackingBar setMsg={setMsg} />
      {msg && (
        <div className='msg'>
          {msg}
        </div>
      )}
    </div>
  )
}

export default Tracking;