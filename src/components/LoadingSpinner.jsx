import React from 'react';

const LoadingSpinner = () => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 24px', gap: 14 }}>
    <div style={{
      width: 44, height: 44, borderRadius: '50%',
      border: '3px solid var(--green-100)',
      borderTopColor: 'var(--primary)',
      animation: 'spin .7s linear infinite',
    }} />
    <div style={{ fontSize: 13, color: 'var(--text-3)', fontWeight: 500 }}>Loading...</div>
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

export default LoadingSpinner;
