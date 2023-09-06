import React from 'react';
import {NavLink} from "react-router-dom";

export const NavBar = () => {
    return (
        <div>
            <ul>
                <li><NavLink to={'/profile'}>Profile</NavLink></li>
                <li><NavLink to={'/users'}>Users</NavLink></li>
                <li><NavLink to={'/users'}>Dialogs</NavLink></li>
                <li><NavLink to={'/users'}>Music</NavLink></li>
                <li><NavLink to={'/users'}>Settings</NavLink></li>

            </ul>
        </div>
    );
};

