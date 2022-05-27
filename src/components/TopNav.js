import React, { useState } from 'react';

function TopNav(props) {
    return (
        <li tabIndex="1" className="top-nav-item" id={props.id} onClick={() => props.setFilter(props.name)}>{props.name}</li>
    )
}

export default TopNav;
