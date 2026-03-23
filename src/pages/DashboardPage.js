import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from 'recharts';
import { Clock, TrendingUp, Shield, AlertTriangle } from 'lucide-react';

const COLORS = { FAKE: '#ff2d55', REAL: '#00ff88', SUSPICIOUS: '#ff6b2b' };

export default function DashboardPage({ history }) {
  const total = history.length;
  const fakes = history.filter(h => h.verdict === 'FAKE').length;
  const reals = history.filter(h => h.verdict === 'REAL').length;
  const suspicious = history.filter(h => h.verdict === 'SUSPICIOUS').length;
  const avgConfidence = total ? Math.round(history.reduce((a, b) => a + b.confidence, 0) / total) : 0;

  const pieData = [
    { name: 'Fake', value: fakes },
    { name: 'Real', value: reals },
    { name: 'Suspicious', value: suspicious },
  ].filter(d => d.value > 0);

  const barData = history.slice(0, 10).reverse().map((h, i) => ({
    name: `#${i + 1}`,
    confidence: h.confidence,
    verdict: h.verdict,
  }));

  const StatCard = ({ icon: Icon, label, value, color }) => (
    <div style={{
      background: '#0d1520', border: '1px solid #1a2d45', borderRadius: 14,
      padding: '1.5rem', display: 'flex', alignItems: 'center', gap: 16,
    }}>
      <div style={{
        width: 48, height: 48, borderRadius: 12,
        background: `${color}15`, border: `1px solid ${color}33`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon size={22} color={color} />
      </div>
      <div>
        <div style={{ fontSize: '2rem', fontWeight: 800, color, fontFamily: 'JetBrains Mono', lineHeight: 1 }}>{value}</div>
        <div style={{ fontSize: '0.78rem', color: '#6b8aaa', marginTop: 4, fontWeight: 500 }}>{label}</div>
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '6rem 2rem 4rem' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <h2 style={{ fontSize: '2.2rem', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 8 }}>
          Analysis <span style={{ color: '#00f5ff' }}>Dashboard</span>
        </h2>
        <p style={{ color: '#6b8aaa' }}>Your detection history and statistics</p>
      </div>

      {total === 0 ? (
        <div style={{
          background: '#0d1520', border: '1px solid #1a2d45', borderRadius: 20,
          padding: '5rem', textAlign: 'center',
        }}>
          <Shield size={48} color="#374a60" style={{ margin: '0 auto 1rem', display: 'block' }} />
          <p style={{ color: '#6b8aaa', fontSize: '1rem' }}>No analyses yet. Upload an image to get started!</p>
        </div>
      ) : (
        <>
          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
            <StatCard icon={Shield} label="Total Analyzed" value={total} color="#00f5ff" />
            <StatCard icon={AlertTriangle} label="Deepfakes Found" value={fakes} color="#ff2d55" />
            <StatCard icon={TrendingUp} label="Avg Confidence" value={`${avgConfidence}%`} color="#7c3aed" />
            <StatCard icon={Clock} label="Suspicious" value={suspicious} color="#ff6b2b" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
            {/* Bar Chart */}
            <div style={{ background: '#0d1520', border: '1px solid #1a2d45', borderRadius: 16, padding: '1.5rem' }}>
              <h4 style={{ fontWeight: 700, marginBottom: '1.5rem', fontSize: '0.9rem' }}>Confidence by Analysis</h4>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={barData}>
                  <XAxis dataKey="name" tick={{ fill: '#6b8aaa', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#6b8aaa', fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{ background: '#080d14', border: '1px solid #1a2d45', borderRadius: 8, fontFamily: 'JetBrains Mono', fontSize: '0.78rem' }}
                    labelStyle={{ color: '#e8f4ff' }}
                  />
                  <Bar dataKey="confidence" radius={[4, 4, 0, 0]}>
                    {barData.map((entry, i) => (
                      <Cell key={i} fill={COLORS[entry.verdict] || '#00f5ff'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            <div style={{ background: '#0d1520', border: '1px solid #1a2d45', borderRadius: 16, padding: '1.5rem' }}>
              <h4 style={{ fontWeight: 700, marginBottom: '1.5rem', fontSize: '0.9rem' }}>Verdict Distribution</h4>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} paddingAngle={3}>
                    {pieData.map((entry, i) => (
                      <Cell key={i} fill={COLORS[entry.name.toUpperCase()]} />
                    ))}
                  </Pie>
                  <Legend
                    formatter={(v) => <span style={{ color: '#6b8aaa', fontFamily: 'JetBrains Mono', fontSize: '0.78rem' }}>{v}</span>}
                  />
                  <Tooltip
                    contentStyle={{ background: '#080d14', border: '1px solid #1a2d45', borderRadius: 8, fontFamily: 'JetBrains Mono', fontSize: '0.78rem' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* History List */}
          <div style={{ background: '#0d1520', border: '1px solid #1a2d45', borderRadius: 16, padding: '1.5rem' }}>
            <h4 style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '0.9rem' }}>Recent Analyses</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {history.map((h) => (
                <div key={h.id} style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  background: '#080d14', border: '1px solid #1a2d45', borderRadius: 10, padding: '12px 16px',
                }}>
                  <img src={h.imagePreview} alt="" style={{ width: 44, height: 44, objectFit: 'cover', borderRadius: 8 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.82rem', color: '#6b8aaa', fontFamily: 'JetBrains Mono' }}>
                      {new Date(h.timestamp).toLocaleString()}
                    </div>
                    <div style={{ fontSize: '0.85rem', color: '#a0b8cc', marginTop: 2, lineHeight: 1.4 }}>
                      {h.summary?.slice(0, 80)}...
                    </div>
                  </div>
                  <div style={{
                    padding: '4px 12px', borderRadius: 6,
                    background: `${COLORS[h.verdict]}20`, border: `1px solid ${COLORS[h.verdict]}44`,
                    color: COLORS[h.verdict], fontSize: '0.72rem', fontFamily: 'JetBrains Mono', fontWeight: 700,
                    whiteSpace: 'nowrap',
                  }}>
                    {h.verdict} · {h.confidence}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
