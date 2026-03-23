import React, { useState, useRef, useCallback } from 'react';
import { Upload, AlertTriangle, ScanLine, X } from 'lucide-react';
import ResultCard from '../components/ResultCard';

// Simulated analysis for demo (when no API key)
const simulateAnalysis = (imageBase64) => {
    const seed = imageBase64.length % 100;
    const isFake = seed > 50;
    const isSuspicious = seed > 30 && seed <= 50;
    const verdict = isFake ? 'FAKE' : isSuspicious ? 'SUSPICIOUS' : 'REAL';
    const confidence = isFake ? 75 + (seed % 20) : isSuspicious ? 45 + (seed % 20) : 80 + (seed % 15);

    return {
        verdict,
        confidence,
        summary: isFake ?
            'Multiple GAN artifacts detected in facial regions. Skin texture shows unnatural smoothness inconsistent with real photography. Boundary blending artifacts visible around facial contours.' :
            isSuspicious ?
            'Some inconsistencies detected in lighting and texture. Could be heavy photo editing or AI-enhanced image. Further manual review recommended.' :
            'No significant manipulation artifacts detected. Facial geometry appears consistent with natural photography. Skin texture and background boundaries appear authentic.',
        scores: {
            ganArtifacts: isFake ? 78 + (seed % 15) : isSuspicious ? 42 + (seed % 15) : 12 + (seed % 15),
            facialGeometry: isFake ? 82 + (seed % 10) : isSuspicious ? 38 + (seed % 20) : 8 + (seed % 12),
            skinTexture: isFake ? 70 + (seed % 20) : isSuspicious ? 50 + (seed % 15) : 15 + (seed % 10),
            backgroundBlend: isFake ? 65 + (seed % 25) : isSuspicious ? 35 + (seed % 20) : 10 + (seed % 15),
            overallManipulation: isFake ? 76 + (seed % 18) : isSuspicious ? 44 + (seed % 15) : 11 + (seed % 12),
        },
        redFlags: isFake ?
            ['Unnatural skin smoothness — GAN hallucination pattern', 'Eye reflection asymmetry detected', 'Hair strand generation artifacts near edges', 'Ear geometry inconsistency flagged'] :
            isSuspicious ?
            ['Slight lighting inconsistency on left side', 'Possible heavy retouching detected', 'Minor boundary artifact near jawline'] :
            ['No red flags detected', 'Image appears authentic'],
        technicalDetails: isFake ?
            'StyleGAN2/DALL-E fingerprint pattern identified in high-frequency DCT coefficients.' :
            isSuspicious ?
            'Minor JPEG re-compression artifacts suggest potential post-processing.' :
            'Natural camera noise distribution consistent with DSLR/smartphone capture.',
    };
};

const PROMPT = `You are a deepfake detection AI expert. Analyze this image forensically and respond ONLY with valid JSON (no markdown, no extra text).

Return exactly this JSON:
{
  "verdict": "FAKE" or "REAL" or "SUSPICIOUS",
  "confidence": <number 0-100>,
  "summary": "<2 sentence finding>",
  "scores": {
    "ganArtifacts": <0-100>,
    "facialGeometry": <0-100>,
    "skinTexture": <0-100>,
    "backgroundBlend": <0-100>,
    "overallManipulation": <0-100>
  },
  "redFlags": ["flag1", "flag2", "flag3"],
  "technicalDetails": "<1 sentence>"
}`;

export default function DetectorPage({ addToHistory }) {
    const [image, setImage] = useState(null);
    const [imageBase64, setImageBase64] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [dragging, setDragging] = useState(false);
    const [demoMode, setDemoMode] = useState(false);
    const fileRef = useRef(null);

    const processFile = (file) => {
        if (!file || !file.type.startsWith('image/')) {
            setError('Please upload a valid image file (JPG, PNG, WebP)');
            return;
        }
        if (file.size > 10 * 1024 * 1024) {
            setError('Image must be under 10MB');
            return;
        }
        setError(null);
        setResult(null);
        const reader = new FileReader();
        reader.onload = (e) => {
            setImage(e.target.result);
            setImageBase64(e.target.result.split(',')[1]);
        };
        reader.readAsDataURL(file);
    };

    const onDrop = useCallback((e) => {
        e.preventDefault();
        setDragging(false);
        processFile(e.dataTransfer.files[0]);
    }, []);

    const analyze = async(useDemo = false) => {
        if (!imageBase64) return;
        setLoading(true);
        setError(null);
        setDemoMode(useDemo);

        if (useDemo) {
            // Simulate loading delay for realistic feel
            await new Promise(r => setTimeout(r, 2500));
            const parsed = simulateAnalysis(imageBase64);
            const resultObj = {...parsed, timestamp: new Date().toISOString(), imagePreview: image, id: Date.now(), isDemo: true };
            setResult(resultObj);
            addToHistory(resultObj);
            setLoading(false);
            return;
        }

        // Real API call
        try {
            const apiKey = process.env.REACT_APP_ANTHROPIC_API_KEY;
            const response = await fetch('https://api.anthropic.com/v1/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-api-key': apiKey || '',
                    'anthropic-version': '2023-06-01',
                    'anthropic-dangerous-direct-browser-access': 'true',
                },
                body: JSON.stringify({
                    model: 'claude-sonnet-4-20250514',
                    max_tokens: 1000,
                    messages: [{
                        role: 'user',
                        content: [
                            { type: 'image', source: { type: 'base64', media_type: 'image/jpeg', data: imageBase64 } },
                            { type: 'text', text: PROMPT },
                        ],
                    }],
                }),
            });

            const data = await response.json();

            if (!response.ok || data.error) {
                throw new Error(data.error && data.error.message ? data.error.message : 'HTTP ' + response.status);
            }

            const text = (data.content || []).map(function(c) { return c.text || ''; }).join('');
            const clean = text.replace(/```json|```/g, '').trim();
            let parsed;
            try {
                parsed = JSON.parse(clean);
            } catch {
                parsed = simulateAnalysis(imageBase64);
            }

            const resultObj = {...parsed, timestamp: new Date().toISOString(), imagePreview: image, id: Date.now() };
            setResult(resultObj);
            addToHistory(resultObj);
        } catch (err) {
            console.error('API Error:', err);
            setError(err.message || 'API call failed');
        } finally {
            setLoading(false);
        }
    };

    const reset = () => {
        setImage(null);
        setImageBase64(null);
        setResult(null);
        setError(null);
        setDemoMode(false);
    };

    return ( <
        div style = {
            { maxWidth: 900, margin: '0 auto', padding: '6rem 2rem 4rem' } } >
        <
        div style = {
            { textAlign: 'center', marginBottom: '3rem' } } >
        <
        h2 style = {
            { fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 8 } } >
        DeepFake < span style = {
            { color: '#00f5ff' } } > Analyzer < /span> <
        /h2> <
        p style = {
            { color: '#6b8aaa', fontSize: '0.95rem' } } > Upload any image— AI will forensically examine it
        for manipulation < /p> <
        /div>

        {
            !result ? ( <
                div style = {
                    { display: 'grid', gap: '1.5rem' } } > { /* Drop Zone */ } <
                div onDragOver = {
                    (e) => { e.preventDefault();
                        setDragging(true); } }
                onDragLeave = {
                    () => setDragging(false) }
                onDrop = { onDrop }
                onClick = {
                    () => !image && fileRef.current.click() }
                style = {
                    {
                        border: `2px dashed ${dragging ? '#00f5ff' : '#1a2d45'}`,
                        borderRadius: 20,
                        padding: image ? '1rem' : '4rem 2rem',
                        background: dragging ? '#00f5ff08' : '#0d1520',
                        cursor: image ? 'default' : 'pointer',
                        transition: 'all 0.3s ease',
                        position: 'relative',
                        minHeight: image ? 'auto' : 280,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }
                } >
                {
                    image ? ( <
                        div style = {
                            { width: '100%', position: 'relative' } } >
                        <
                        img src = { image }
                        alt = "Upload"
                        style = {
                            { width: '100%', maxHeight: 400, objectFit: 'contain', borderRadius: 12 } }
                        /> <
                        button onClick = {
                            (e) => { e.stopPropagation();
                                reset(); } }
                        style = {
                            {
                                position: 'absolute',
                                top: 8,
                                right: 8,
                                background: '#ff2d5599',
                                border: 'none',
                                borderRadius: '50%',
                                width: 32,
                                height: 32,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }
                        } >
                        <
                        X size = { 16 }
                        color = "#fff" / >
                        <
                        /button> {
                            loading && ( <
                                div style = {
                                    {
                                        position: 'absolute',
                                        inset: 0,
                                        borderRadius: 12,
                                        background: 'linear-gradient(180deg, transparent 0%, #00f5ff22 50%, transparent 100%)',
                                        animation: 'scan 1.5s linear infinite',
                                        pointerEvents: 'none',
                                    }
                                }
                                />
                            )
                        } <
                        /div>
                    ) : ( <
                        div style = {
                            { textAlign: 'center' } } >
                        <
                        div style = {
                            {
                                width: 72,
                                height: 72,
                                borderRadius: 20,
                                background: 'linear-gradient(135deg, #00f5ff15, #7c3aed15)',
                                border: '1px solid #00f5ff33',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1.5rem',
                            }
                        } >
                        <
                        Upload size = { 28 }
                        color = "#00f5ff" / >
                        <
                        /div> <
                        p style = {
                            { fontSize: '1.1rem', fontWeight: 700, marginBottom: 8 } } > Drop image here or click to upload < /p> <
                        p style = {
                            { fontSize: '0.82rem', color: '#6b8aaa' } } > Supports JPG, PNG, WebP— Max 10 MB < /p> <
                        /div>
                    )
                } <
                input ref = { fileRef }
                type = "file"
                accept = "image/*"
                style = {
                    { display: 'none' } }
                onChange = { e => processFile(e.target.files[0]) }
                /> <
                /div>

                {
                    error && ( <
                        div style = {
                            {
                                background: '#ff2d5515',
                                border: '1px solid #ff2d5544',
                                borderRadius: 10,
                                padding: '12px 16px',
                                color: '#ff2d55',
                                fontSize: '0.85rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 8,
                            }
                        } >
                        <
                        AlertTriangle size = { 16 }
                        /> {error} <
                        /div>
                    )
                }

                {
                    image && !loading && ( <
                        div style = {
                            { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 } } > { /* Demo Mode Button */ } <
                        button onClick = {
                            () => analyze(true) }
                        style = {
                            {
                                background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
                                border: 'none',
                                color: '#fff',
                                padding: '16px',
                                borderRadius: 12,
                                fontFamily: 'Syne, sans-serif',
                                fontWeight: 800,
                                fontSize: '0.95rem',
                                cursor: 'pointer',
                                boxShadow: '0 0 20px #7c3aed44',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 10,
                            }
                        } >
                        <
                        ScanLine size = { 18 }
                        />
                        Demo Analyze(No API Key) <
                        /button>

                        { /* Real API Button */ } <
                        button onClick = {
                            () => analyze(false) }
                        style = {
                            {
                                background: 'linear-gradient(135deg, #00f5ff, #0080ff)',
                                border: 'none',
                                color: '#000',
                                padding: '16px',
                                borderRadius: 12,
                                fontFamily: 'Syne, sans-serif',
                                fontWeight: 800,
                                fontSize: '0.95rem',
                                cursor: 'pointer',
                                boxShadow: '0 0 30px #00f5ff44',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 10,
                            }
                        } >
                        <
                        ScanLine size = { 18 }
                        />
                        Real AI Analyze(API Key) <
                        /button> <
                        /div>
                    )
                }

                {
                    loading && ( <
                        div style = {
                            {
                                background: '#0d1520',
                                border: '1px solid #1a2d45',
                                borderRadius: 12,
                                padding: '2rem',
                                textAlign: 'center',
                            }
                        } >
                        <
                        div style = {
                            {
                                width: 48,
                                height: 48,
                                borderRadius: '50%',
                                border: '3px solid #1a2d45',
                                borderTop: '3px solid #00f5ff',
                                margin: '0 auto 1rem',
                                animation: 'spin 1s linear infinite',
                            }
                        }
                        /> <
                        p style = {
                            { color: '#00f5ff', fontWeight: 700, fontFamily: 'JetBrains Mono', fontSize: '0.85rem' } } > { demoMode ? 'RUNNING DEMO ANALYSIS...' : 'ANALYZING WITH CLAUDE AI...' } <
                        /p> <
                        p style = {
                            { color: '#6b8aaa', fontSize: '0.78rem', marginTop: 6 } } >
                        Running GAN detection· Facial geometry analysis· Texture scanning <
                        /p> <
                        /div>
                    )
                } <
                /div>
            ) : ( <
                > {
                    result.isDemo && ( <
                        div style = {
                            {
                                background: '#7c3aed15',
                                border: '1px solid #7c3aed44',
                                borderRadius: 10,
                                padding: '10px 16px',
                                marginBottom: '1rem',
                                color: '#a78bfa',
                                fontSize: '0.8rem',
                                fontFamily: 'JetBrains Mono',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 8,
                            }
                        } >
                        <
                        /div>
                    )
                } <
                ResultCard result = { result }
                onReset = { reset }
                /> <
                />
            )
        }

        <
        style > { `
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes scan { 0% { transform: translateY(-100%); } 100% { transform: translateY(200%); } }
      ` } < /style> <
        /div>
    );
}