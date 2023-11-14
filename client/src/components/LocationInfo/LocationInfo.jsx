import React from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import './LocationInfo.scss';

const LocationInfo = ({ name, location, head, type }) => {
    return (
        <div className='detail'>
            <div className='name'>{name}</div>
            <div className='info'>
                <div className='prop'>
                    <div className='key'>Location</div>
                    <div className='value'>{location}</div>
                </div>
                <div className='prop'>
                    <div className='key'>Head</div>
                    <div className='value'>{head}</div>
                </div>
                <div className='prop'>
                    <div className='key'>Type</div>
                    <div className='value'>{type === 'TPoint' ? "Transaction Point" : "Collection Point"}</div>
                </div>
            </div>
            <MoreVertIcon />
        </div>
    )
}

export default LocationInfo;