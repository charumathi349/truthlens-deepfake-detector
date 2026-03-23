import React from 'react';
import { Upload, Cpu, ScanLine, BarChart3, Shield, Eye, Layers, Zap } from 'lucide-react';

const steps = [
  { num: '01', icon: Upload, title: 'Upload Media', desc: 'User uploads any image (JPG/PNG/WebP). The file is processed locally — no permanent storage on server.' },
  { num: '02', icon: ScanLine, title: 'Preprocessing', desc: 'Image is normalized, resized and encoded in Base64 for AI model input. EXIF metadata extracted for initial analysis.' },
  { num: '03', icon: Cpu, title: 'Claude Vision AI', desc: 'Claude multimodal model performs multi-dimensional forensic analysis using visual reasoning and pattern recognition.' },
  { num: '04', icon: BarChart3, title: 'Score Generation', desc: 'AI outputs structured JSON with confidence scores across 5 detection vectors: GAN artifacts, facial geometry, skin, background, and overall manipulation.' },
  { num: '05', icon: Shield, title: 'Verdict & Report', desc: 'System returns REAL / FAKE / SUSPICIOUS verdict with detailed red flags, technical details, and radar visualization.' },
];

const techniques = [
  { icon: Eye, title: 'GAN Fingerprint Detection', desc: 'Generative Adversarial Networks leave unique statistical artifacts in pixel distributions. Our model identifies GAN-specific noise patterns invisible to the human eye.' },
  { icon: Layers, title: 'Facial Geometry Analysis', desc: 'Human faces follow strict biological symmetry rules. Deepfakes often violate these — asymmetric ears, inconsistent eye spacing, unnatural jaw lines.' },
  { icon: Zap, title: 'Texture Consistency Mapping', desc: 'Real skin has pores, micro-wrinkles, and natural variations. AI-generated faces tend to be hyper-smooth or show tiling patterns in texture.' },
  { icon: Shield, title: 'Boundary Artifact Detection', desc: 'Face-swap technology creates detectable seams at face boundaries. Lighting inconsistencies and color mismatches are key indicators.' },
];

export default function HowItWorksPage() {
  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '6rem 2rem 4rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 8 }}>
          How <span style={{ color: '#00f5ff' }}>TruthLens</span> Works
        </h2>
        <p style={{ color: '#6b8aaa', maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>
          A multi-layer AI forensic pipeline that goes beyond surface-level detection
        </p>
      </div>

      {/* Pipeline Steps */}
      <div style={{ marginBottom: '4rem' }}>
        <h3 style={{ fontWeight: 700, marginBottom: '2rem', fontSize: '1rem', color: '#6b8aaa', letterSpacing: '0.1em', fontFamily: 'JetBrains Mono' }}>
          // DETECTION PIPELINE
        </h3>
        <div style={{ position: 'relative' }}>
          {/* Vertical line */}
          <div style={{
            position: 'absolute', left: 28, top: 0, bottom: 0,
            width: 1, background: 'linear-gradient(180deg, #00f5ff, #7c3aed, #ff2d55)',
            opacity: 0.3,
          }} />

          {steps.map(({ num, icon: Icon, title, desc }) => (
            <div key={num} style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem', position: 'relative' }}>
              <div style={{
                width: 56, height: 56, borderRadius: 14, flexShrink: 0,
                background: '#0d1520', border: '1px solid #1a2d45',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 1,
              }}>
                <Icon size={22} color="#00f5ff" />
              </div>
              <div style={{
                background: '#0d1520', border: '1px solid #1a2d45', borderRadius: 14,
                padding: '1.25rem 1.5rem', flex: 1,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <span style={{ fontFamily: 'JetBrains Mono', fontSize: '0.7rem', color: '#00f5ff' }}>{num}</span>
                  <h4 style={{ fontWeight: 700, fontSize: '1rem' }}>{title}</h4>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#6b8aaa', lineHeight: 1.6 }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detection Techniques */}
      <div>
        <h3 style={{ fontWeight: 700, marginBottom: '2rem', fontSize: '1rem', color: '#6b8aaa', letterSpacing: '0.1em', fontFamily: 'JetBrains Mono' }}>
          // DETECTION TECHNIQUES
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {techniques.map(({ icon: Icon, title, desc }) => (
            <div key={title} style={{
              background: '#0d1520', border: '1px solid #1a2d45', borderRadius: 14,
              padding: '1.5rem',
              transition: 'all 0.3s ease',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#00f5ff33'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#1a2d45'; }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: '#00f5ff10', border: '1px solid #00f5ff22',
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem',
              }}>
                <Icon size={18} color="#00f5ff" />
              </div>
              <h4 style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: 8 }}>{title}</h4>
              <p style={{ fontSize: '0.82rem', color: '#6b8aaa', lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div style={{
        background: '#ff6b2b08', border: '1px solid #ff6b2b33', borderRadius: 12,
        padding: '1.25rem', marginTop: '3rem',
        fontFamily: 'JetBrains Mono', fontSize: '0.78rem', color: '#ff6b2b', lineHeight: 1.7,
      }}>
        ⚠️ DISCLAIMER: TruthLens is an AI-assisted tool and should not be used as the sole basis for legal or criminal decisions. 
        Always combine AI analysis with human expertise for high-stakes determinations.
      </div>
    </div>
  );
}
