import React from 'react';
import './Button.scss';

function Button({ content, onClick }) {
    return (
        <button className="frame" onClick={onClick}>
          <div className="text-wrapper">{content}</div>
        </button>
    );
}

export default Button;