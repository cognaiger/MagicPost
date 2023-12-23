import React from 'react';
import "./Intro.scss";
import map from "../../img/mapbig3.png";

function Intro() {
    return (
        <div className='intro'>
            <div className="left">
                <div className="ti1">Your lighting-fast delivery partner</div>
                <div className="ti2">MagicPost is a logistic company providing courier, package delivery and express mail service. It helps everyone to send
                    documents, packages, parcels and letter to desired destination
                </div>
                <div className="line"></div>
                <div className="statistic">
                    <div className='number'>24/7 
                        <div>Expedition</div>
                    </div>
                    <div className='number'>5M+ 
                        <div>Packages Delivered</div>
                    </div>
                </div>
            </div>
            <div className="right">
                <img src={map} alt="map" />
            </div>
        </div>
    )
}

export default Intro;