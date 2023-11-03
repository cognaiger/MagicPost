import React from 'react';
import "./MenuBtn.scss";

const MenuBtn = ({ children, onClick, isActive }) => {

    if (isActive) {
        return (
            <button className='active' onClick={onClick}>
                {children}
            </button>
        )
    }

    return (
        <button className='btn' onClick={onClick}>
            {children}
        </button>
    )
}

export default MenuBtn;