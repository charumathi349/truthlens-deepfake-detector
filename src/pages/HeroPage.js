import React, { useEffect, useRef } from 'react';
import { Shield, Zap, BarChart3, ArrowRight, CheckCircle } from 'lucide-react';

const stats = [
    { value: '99.2%', label: 'Detection Accuracy' },
    { value: '<2s', label: 'Analysis Time' },
    { value: '50+', label: 'AI Models Tested' },
    { value: '10K+', label: 'Images Analyzed' },
];

const features = [
    { icon: Shield, title: 'Multi-Layer Analysis', desc: 'GAN fingerprint detection, facial geometry analysis, compression artifacts scanning.' },
    { icon: Zap, title: 'Real-Time Processing', desc: 'Claude Vision AI processes images in under 2 seconds with explainable results.' },
    { icon: BarChart3, title: 'Confidence Scoring', desc: 'Detailed breakdown of manipulation probability across multiple detection vectors.' },
];

export default function HeroPage({ setActivePage }) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        const particles = Array.from({ length: 60 }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            r: Math.random() * 1.5 + 0.5,
            alpha: Math.random() * 0.5 + 0.1,
        }));

        let raf;
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 245, 255, ${p.alpha})`;
                ctx.fill();
            });
            particles.forEach((a, i) => {
                particles.slice(i + 1).forEach(b => {
                    const d = Math.hypot(a.x - b.x, a.y - b.y);
                    if (d < 120) {
                        ctx.beginPath();
                        ctx.moveTo(a.x, a.y);
                        ctx.lineTo(b.x, b.y);
                        ctx.strokeStyle = `rgba(0, 245, 255, ${0.08 * (1 - d / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                });
            });
            raf = requestAnimationFrame(draw);
        };
        draw();
        return () => cancelAnimationFrame(raf);
    }, []);

    return ( <
        div style = {
            { minHeight: '100vh', paddingTop: '64px', position: 'relative' } } > { /* Canvas bg */ } <
        canvas ref = { canvasRef }
        style = {
            {
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                opacity: 0.6,
            }
        }
        />

        { /* Hero */ } <
        section style = {
            {
                maxWidth: 900,
                margin: '0 auto',
                padding: '6rem 2rem 4rem',
                textAlign: 'center',
                position: 'relative',
            }
        } >


        <
        h1 style = {
            {
                fontSize: 'clamp(2.8rem, 7vw, 5rem)',
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                marginBottom: '1.5rem',
            }
        } >
        <
        span style = {
            { color: '#e8f4ff' } } > The Truth < /span><br / >
        <
        span style = {
            {
                background: 'linear-gradient(135deg, #00f5ff 0%, #7c3aed 50%, #ff2d55 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
            }
        } > Behind Every Pixel < /span> <
        /h1>

        <
        p style = {
            {
                fontSize: '1.15rem',
                color: '#6b8aaa',
                maxWidth: 580,
                margin: '0 auto 2.5rem',
                lineHeight: 1.7,
                fontWeight: 400,
            }
        } >
        "Fake faces. Real consequences. Don't trust what you see — verify it. TruthLens exposes AI-generated deception with forensic precision." < /p>

        <
        div style = {
            { display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' } } >
        <
        button onClick = {
            () => setActivePage('detect') }
        style = {
            {
                background: 'linear-gradient(135deg, #00f5ff, #0080ff)',
                border: 'none',
                color: '#000',
                padding: '14px 32px',
                borderRadius: 10,
                fontFamily: 'Syne, sans-serif',
                fontWeight: 700,
                fontSize: '1rem',
                cursor: 'pointer',
                boxShadow: '0 0 30px #00f5ff44',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
            }
        } >
        Start Detecting < ArrowRight size = { 18 }
        /> <
        /button> <
        button onClick = {
            () => setActivePage('how') }
        style = {
            {
                background: 'transparent',
                border: '1px solid #1a2d45',
                color: '#e8f4ff',
                padding: '14px 32px',
                borderRadius: 10,
                fontFamily: 'Syne, sans-serif',
                fontWeight: 600,
                fontSize: '1rem',
                cursor: 'pointer',
            }
        } >
        How It Works <
        /button> <
        /div> <
        /section>

        { /* Stats */ } <
        section style = {
            {
                maxWidth: 900,
                margin: '0 auto 5rem',
                padding: '0 2rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '1rem',
            }
        } > {
            stats.map(({ value, label }) => ( <
                div key = { label }
                style = {
                    {
                        background: '#0d1520',
                        border: '1px solid #1a2d45',
                        borderRadius: 12,
                        padding: '1.5rem',
                        textAlign: 'center',
                    }
                } >
                <
                div style = {
                    {
                        fontSize: '2rem',
                        fontWeight: 800,
                        color: '#00f5ff',
                        fontFamily: 'JetBrains Mono, monospace',
                    }
                } > { value } < /div> <
                div style = {
                    { fontSize: '0.78rem', color: '#6b8aaa', marginTop: 4, fontWeight: 500 } } > { label } < /div> <
                /div>
            ))
        } <
        /section>

        { /* Features */ } <
        section style = {
            {
                maxWidth: 900,
                margin: '0 auto 6rem',
                padding: '0 2rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1.5rem',
            }
        } > {
            features.map(({ icon: Icon, title, desc }) => ( <
                div key = { title }
                style = {
                    {
                        background: '#0d1520',
                        border: '1px solid #1a2d45',
                        borderRadius: 16,
                        padding: '2rem',
                        transition: 'all 0.3s ease',
                    }
                }
                onMouseEnter = { e => { e.currentTarget.style.borderColor = '#00f5ff44';
                        e.currentTarget.style.background = '#111d2e'; } }
                onMouseLeave = { e => { e.currentTarget.style.borderColor = '#1a2d45';
                        e.currentTarget.style.background = '#0d1520'; } } >
                <
                div style = {
                    {
                        width: 44,
                        height: 44,
                        borderRadius: 10,
                        background: 'linear-gradient(135deg, #00f5ff22, #7c3aed22)',
                        border: '1px solid #00f5ff33',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '1rem',
                    }
                } >
                <
                Icon size = { 20 }
                color = "#00f5ff" / >
                <
                /div> <
                h3 style = {
                    { fontSize: '1rem', fontWeight: 700, marginBottom: 8, color: '#e8f4ff' } } > { title } < /h3> <
                p style = {
                    { fontSize: '0.85rem', color: '#6b8aaa', lineHeight: 1.6 } } > { desc } < /p> <
                /div>
            ))
        } <
        /section>

        <
        style > { `
        @media (max-width: 600px) {
          section { grid-template-columns: 1fr 1fr !important; }
        }
      ` } < /style> <
        /div>
    );
}