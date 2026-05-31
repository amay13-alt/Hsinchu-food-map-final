import React from 'react';

function DrinkCard({ drink, onClick }) {
  if (!drink) return null;

  return (
    <div
      onClick={onClick}
      style={{
        background: '#fff',
        borderRadius: '12px',
        padding: '16px',
        cursor: 'pointer',
        border: '1px solid #eee',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        transition: 'box-shadow 0.2s',
      }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'}
    >
      {drink.logo && (
        <img
          src={drink.logo}
          alt={drink.name}
          style={{ width: '48px', height: '48px', objectFit: 'contain', marginBottom: '8px' }}
        />
      )}
      <h3 style={{ margin: '0 0 4px 0', fontSize: '1rem' }}>{drink.name}</h3>
      <p style={{ margin: '0 0 4px 0', color: '#888', fontSize: '0.85rem' }}>
        📍 {drink.area}
      </p>
      {drink.category && (
        <span style={{
          display: 'inline-block',
          background: '#f0f0f0',
          borderRadius: '99px',
          padding: '2px 10px',
          fontSize: '0.8rem',
          color: '#555',
        }}>
          {drink.category}
        </span>
      )}
      <p style={{ margin: '8px 0 0 0', color: '#aaa', fontSize: '0.8rem' }}>🔗 查看更多</p>
    </div>
  );
}

export default DrinkCard;