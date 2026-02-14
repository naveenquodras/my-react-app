import React from 'react';
import Link from '../../components/Link';
import './menu.css';

export default function Menu() {
    return (
        <div className="menu">
            <div className="menu-item">
                <a className="menu-item-link" href="/">Home</a>
            </div>
            <div className="menu-item">
                <a className="menu-item-link" href="/notes">Notes</a>
            </div>
            <div className="menu-item">
                <a className="menu-item-link" href="/photos">Photos</a>
            </div>
            <div className="menu-item">
                <a className="menu-item-link" href="/about">About</a>
            </div>
            <div className="menu-item">
                <a className="menu-item-link" href="/contact">Contact</a>
            </div>
        </div>
    );
}