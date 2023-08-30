import React from 'react';
import style from './NavBar.module.css'
import {NavLink} from "react-router-dom";

export const NavBar = () => {
    return (
        <div className={style.wrapperNav}>
            <ul className={style.navBar}>
                <li className={style.item}><NavLink to={'/profile'}>Profile</NavLink></li>
                <li className={style.item}><NavLink to={'/users'}>Users</NavLink></li>
                <li className={style.item}><NavLink to={'/users'}>Dialogs</NavLink></li>
                <li className={style.item}><NavLink to={'/users'}>Music</NavLink></li>
                <li className={style.item}><NavLink to={'/users'}>Settings</NavLink></li>

            </ul>
        </div>
    );
};

