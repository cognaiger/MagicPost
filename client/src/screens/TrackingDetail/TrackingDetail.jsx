import React from 'react';
import "./TrackingDetail.scss";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const TrackingDetail = () => {
  const data = [
    {
      content: "start",
      time: "21-12-2018"
    },
    {
      content: "start",
      time: "21-12-2018"
    }
  ]

  return (
    <div className='trackDetail'>
      <div className='header'>
        Bill #123455
      </div>
      <div className='content'>
        {data.map((el, i) => (
          <div className='milestone' key={i}>
            <CheckCircleIcon fontSize='large' />
            <div className='info'>
              <div className='content'>
                {el.content}
              </div>
              <div className='time'>
                {el.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TrackingDetail;