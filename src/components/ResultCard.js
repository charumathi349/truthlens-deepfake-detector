import React from 'react';
import { AlertTriangle, CheckCircle, AlertCircle, RotateCcw, TrendingUp } from 'lucide-react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts';

const verdictConfig = {
  FAKE: { color: '#ff2d55', bg: '#ff2d5515', border: '#ff2d5544', icon: AlertTriangle, label: 'DEEPFAKE DETECTED' },
  SUSPICIOUS: { color: '#ff6b2b', bg: '#ff6b2b15', border: '#ff6b2b44', icon: AlertCircle, label: 'SUSPICIOUS CONTENT' },
  REAL: { color: '#00ff88', bg: '#00ff8815', border: '#00ff8844', icon: CheckCircle, label: 'AUTHENTIC IMAGE' },
};

const ProgressBar = ({ label, value, color }) => (
  <div style={{ marginBottom: '1rem' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
      <span style={{ fontSize: '0.8rem', color: '#6b8aaa', fontFamily: 'JetBrains Mono', fontWeight: 500 }}>{label}</span>
      <span style={{ fontSize: '0.8rem', color, fontFamily: 'JetBrains Mono', fontWeight: 700 }}>{value}%</span>
    </div>
    <div style={{ height: 6, background: '#1a2d45', borderRadius: 3, overflow: 'hidden' }}>
      <div style={{
        height: '100%', width: `${value}%`, borderRadius: 3,
        background: `linear-gradient(90deg, ${color}88, ${color})`,
        boxShadow: `0 0 8px ${color}66`,
        transition: 'width 1s ease',
      }} />
    </div>
  </div>
);

export default function ResultCard({ result, onReset }) {
  const cfg = verdictConfig[result.verdict] || verdictConfig.SUSPICIOUS;
  const Icon = cfg.icon;

  const radarData = [
    { subject: 'GAN Artifacts', A: result.scores?.ganArtifacts || 0 },
    { subject: 'Facial Geo', A: result.scores?.facialGeometry || 0 },
    { subject: 'Skin Texture', A: result.scores?.skinTexture || 0 },
    { subject: 'BG Blend', A: result.scores?.backgroundBlend || 0 },
    { subject: 'Manipulation', A: result.scores?.overallManipulation || 0 },
  ];

  return (
    <div style={{ animation: 'fadeIn 0.5s ease' }}>
      {/* Verdict Banner */}
      <div style={{
        background: cfg.bg, border: `1px solid ${cfg.border}`, borderRadius: 16,
        padding: '1.5rem 2rem', marginBottom: '1.5rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 14,
            background: cfg.bg, border: `2px solid ${cfg.color}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: `0 0 20px ${cfg.color}44`,
          }}>
            <Icon size={26} color={cfg.color} />
          </div>
          <div>
            <div style={{
              fontSize: '0.7rem', fontFamily: 'JetBrains Mono', letterSpacing: '0.15em',
              color: cfg.color, marginBottom: 4,
            }}>VERDICT</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: cfg.color }}>{cfg.label}</div>
          </div>
        </div>

        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '0.7rem', fontFamily: 'JetBrains Mono', color: '#6b8aaa', marginBottom: 4 }}>CONFIDENCE</div>
          <div style={{ fontSize: '3rem', fontWeight: 800, color: cfg.color, lineHeight: 1, fontFamily: 'JetBrains Mono' }}>
            {result.confidence}%
          </div>
        </div>
      </div>

      {/* Summary */}
      <div style={{
        background: '#0d1520', border: '1px solid #1a2d45', borderRadius: 12,
        padding: '1.25rem', marginBottom: '1.5rem',
        fontFamily: 'JetBrains Mono', fontSize: '0.85rem', color: '#a0b8cc', lineHeight: 1.7,
      }}>
        {result.summary}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        {/* Detection Scores */}
        <div style={{ background: '#0d1520', border: '1px solid #1a2d45', borderRadius: 16, padding: '1.5rem' }}>
          <h4 style={{ fontWeight: 700, marginBottom: '1.25rem', fontSize: '0.9rem', color: '#e8f4ff' }}>
            Detection Scores
          </h4>
          <ProgressBar label="GAN ARTIFACTS" value={result.scores?.ganArtifacts || 0} color="#ff2d55" />
          <ProgressBar label="FACIAL GEOMETRY" value={result.scores?.facialGeometry || 0} color="#ff6b2b" />
          <ProgressBar label="SKIN TEXTURE" value={result.scores?.skinTexture || 0} color="#ffd700" />
          <ProgressBar label="BG BOUNDARY" value={result.scores?.backgroundBlend || 0} color="#00f5ff" />
          <ProgressBar label="MANIPULATION" value={result.scores?.overallManipulation || 0} color="#7c3aed" />
        </div>

        {/* Radar Chart */}
        <div style={{ background: '#0d1520', border: '1px solid #1a2d45', borderRadius: 16, padding: '1.5rem' }}>
          <h4 style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '0.9rem', color: '#e8f4ff' }}>
            Analysis Radar
          </h4>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#1a2d45" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b8aaa', fontSize: 10, fontFamily: 'JetBrains Mono' }} />
              <Radar dataKey="A" stroke={cfg.color} fill={cfg.color} fillOpacity={0.15} strokeWidth={2} />
              <Tooltip
                contentStyle={{ background: '#0d1520', border: '1px solid #1a2d45', borderRadius: 8, fontFamily: 'JetBrains Mono', fontSize: '0.78rem' }}
                labelStyle={{ color: '#e8f4ff' }}
                itemStyle={{ color: cfg.color }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Red Flags */}
      {result.redFlags?.length > 0 && (
        <div style={{ background: '#0d1520', border: '1px solid #1a2d45', borderRadius: 16, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h4 style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '0.9rem', color: '#e8f4ff', display: 'flex', alignItems: 'center', gap: 8 }}>
            <TrendingUp size={16} color="#ff2d55" /> Red Flags Detected
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {result.redFlags.map((flag, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: 10,
                background: '#ff2d5508', border: '1px solid #ff2d5522', borderRadius: 8, padding: '10px 14px',
              }}>
                <span style={{ color: '#ff2d55', fontFamily: 'JetBrains Mono', fontSize: '0.75rem', marginTop: 1 }}>
                  [{String(i + 1).padStart(2, '0')}]
                </span>
                <span style={{ fontSize: '0.85rem', color: '#a0b8cc', lineHeight: 1.5 }}>{flag}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Technical */}
      {result.technicalDetails && (
        <div style={{
          background: '#080d14', border: '1px solid #1a2d45', borderRadius: 10, padding: '1rem',
          fontFamily: 'JetBrains Mono', fontSize: '0.78rem', color: '#6b8aaa', marginBottom: '1.5rem',
        }}>
          <span style={{ color: '#00f5ff' }}>// TECHNICAL: </span>{result.technicalDetails}
        </div>
      )}

      {/* Actions */}
      <div style={{ display: 'flex', gap: 12 }}>
        <button onClick={onReset} style={{
          background: '#0d1520', border: '1px solid #1a2d45',
          color: '#e8f4ff', padding: '12px 24px', borderRadius: 10,
          fontFamily: 'Syne, sans-serif', fontWeight: 600, fontSize: '0.9rem',
          cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
          flex: 1, justifyContent: 'center',
        }}>
          <RotateCcw size={16} /> Analyze Another
        </button>
      </div>

      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
}
