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
          <h1>Dịch vụ quốc tế</h1>
        </div>
        <div className="bot">
          <h1>Dịch vụ Logistics</h1>
        </div>
      </div>
    </div>
  )
}

export default Service;