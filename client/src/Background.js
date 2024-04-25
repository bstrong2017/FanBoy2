import React from 'react';

const Background = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
      }}
    >
      <div
        style={{
          backgroundImage: `url('https://i0.wp.com/etownian.com/wp-content/uploads/2023/02/New-NBA-Scorer-courtesy-of-Jason-Leung-on-Unsplash.png?fit=1200%2C628&ssl=1')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(45, 27, 118, 0.528)',
        }}
      />
    </div>
  );
};

export default Background;




