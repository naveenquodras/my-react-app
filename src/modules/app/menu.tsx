import React from 'react';
import './menu.css';

interface MenuProps {
    onMenuSelect : (moduleName) => void
}

export default function Menu({onMenuSelect}: MenuProps) {

    const onMenuClick = (e, moduleName) =>{
        e.preventDefault();
        onMenuSelect(moduleName);
    };

    return (
        <div className="menu">
            <div className="menu-item">
                <a className="menu-item-link" href="/" onClick={(e)=> onMenuClick(e, 'home')}>Home</a>
            </div>
            <div className="menu-item">
                <a className="menu-item-link" href="/notes" onClick={(e)=> onMenuClick(e, 'notes')}>Notes</a>
            </div>
            <div className="menu-item">
                <a className="menu-item-link" href="/photos" onClick={(e)=> onMenuClick(e, 'photos')}>Photos</a>
            </div>
            <div className="menu-item">
                <a className="menu-item-link" href="/about" onClick={(e)=> onMenuClick(e, 'about')}>About</a>
            </div>
            <div className="menu-item">
                <a className="menu-item-link" href="/contact" onClick={(e)=> onMenuClick(e, 'contact')}>Contact</a>
            </div>
        </div>
    );
}