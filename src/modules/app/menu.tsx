import React from 'react';
import Link from '../../components/Link';
import './menu.css';

export default function Menu() {

    const onMenuClick = (e, path) =>{
        e.preventDefault();
        
    };

    return (
        <div className="menu">
            <div className="menu-item">
                <a className="menu-item-link" href="/" onClick={(e)=> onMenuClick(e, '/')}>Home</a>
            </div>
            <div className="menu-item">
                <a className="menu-item-link" href="/notes" onClick={(e)=> onMenuClick(e, '/notes')}>Notes</a>
            </div>
            <div className="menu-item">
                <a className="menu-item-link" href="/photos" onClick={(e)=> onMenuClick(e, '/photos')}>Photos</a>
            </div>
            <div className="menu-item">
                <a className="menu-item-link" href="/about" onClick={(e)=> onMenuClick(e, '/about')}>About</a>
            </div>
            <div className="menu-item">
                <a className="menu-item-link" href="/contact" onClick={(e)=> onMenuClick(e, '/contact')}>Contact</a>
            </div>
        </div>
    );
}