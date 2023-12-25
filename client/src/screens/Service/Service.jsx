import React from 'react';
import "./Service.scss";


function Service() {
  return (
    <div className="service">
      <div className="card">
        <div className="top">
          <h1>DỊCH VỤ TRONG NƯỚC</h1>
            <ul className="submenu">
              <li>Chuyển phát hỏa tốc</li>
              <li>Chuyển phát nhanh</li>
              <li>Chuyển phát tiết kiệm</li>
            </ul>
        </div>
        <div className="mid">
          <h2>Dịch vụ quốc tế</h2>
        </div>
        <div className="bot">
          <h2>Dịch vụ Logistics</h2>
        </div>
      </div>
    </div>
  )
}

export default Service;