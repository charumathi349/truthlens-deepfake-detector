import React, { useState, useEffect } from 'react';
import { Eye, Activity, LayoutDashboard, HelpCircle, Menu, X } from 'lucide-react';

const navItems = [
    { id: 'home', label: 'Home', icon: Eye },
    { id: 'detect', label: 'Detect', icon: Activity },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'how', label: 'How It Works', icon: HelpCircle },
];

export default function Navbar({ activePage, setActivePage }) {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return ( <
        nav style = {
            {
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                padding: '0 2rem',
                background: scrolled ? 'rgba(2,4,8,0.95)' : 'transparent',
                backdropFilter: scrolled ? 'blur(20px)' : 'none',
                borderBottom: scrolled ? '1px solid #1a2d45' : '1px solid transparent',
                transition: 'all 0.3s ease',
                height: '64px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }
        } > { /* Logo */ } <
        div style = {
            { display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' } }
        onClick = {
            () => setActivePage('home') } >
        <
        div style = {
            {
                width: 36,
                height: 36,
                borderRadius: 8,
                background: 'linear-gradient(135deg, #00f5ff, #7c3aed)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 20px #00f5ff44',
            }
        } >
        <
        Eye size = { 18 }
        color = "#000"
        strokeWidth = { 2.5 }
        /> <
        /div> <
        span style = {
            {
                fontFamily: 'Syne, sans-serif',
                fontWeight: 800,
                fontSize: '1.1rem',
                background: 'linear-gradient(90deg, #00f5ff, #fff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.02em',
            }
        } > TruthLens < /span> <
        span style = {
            {
                fontSize: '0.6rem',
                fontFamily: 'JetBrains Mono, monospace',
                color: '#00f5ff',
                border: '1px solid #00f5ff44',
                borderRadius: 4,
                padding: '2px 6px',
                letterSpacing: '0.1em',
            }
        } > AI < /span> <
        /div>

        { /* Desktop Nav */ } <
        div style = {
            { display: 'flex', gap: '0.25rem' } }
        className = "desktop-nav" > {
            navItems.map(({ id, label, icon: Icon }) => ( <
                button key = { id }
                onClick = {
                    () => setActivePage(id) }
                style = {
                    {
                        background: activePage === id ? '#00f5ff15' : 'transparent',
                        border: activePage === id ? '1px solid #00f5ff33' : '1px solid transparent',
                        color: activePage === id ? '#00f5ff' : '#6b8aaa',
                        padding: '8px 16px',
                        borderRadius: 8,
                        cursor: 'pointer',
                        fontFamily: 'Syne, sans-serif',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        transition: 'all 0.2s ease',
                    }
                }
                onMouseEnter = { e => { if (activePage !== id) { e.target.style.color = '#e8f4ff'; } } }
                onMouseLeave = { e => { if (activePage !== id) { e.target.style.color = '#6b8aaa'; } } } >
                <
                Icon size = { 14 }
                /> { label } <
                /button>
            ))
        } <
        /div>

        { /* CTA */ } <
        button onClick = {
            () => setActivePage('detect') }
        style = {
            {
                background: 'linear-gradient(135deg, #00f5ff, #0080ff)',
                border: 'none',
                color: '#000',
                padding: '9px 20px',
                borderRadius: 8,
                fontFamily: 'Syne, sans-serif',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                boxShadow: '0 0 20px #00f5ff44',
                transition: 'all 0.2s ease',
            }
        } >
        Analyze Now <
        /button>

        <
        style > { `
        @media (max-width: 768px) { .desktop-nav { display: none !important; } }
      ` } < /style> <
        /nav>
    );
}