import React from 'react';

const Marquee = ({ children, speed = "60s", className = "" }) => {
  const style = {
    "--marquee-duration": speed,
  };

  return (
    <div className={`marquee-wrapper ${className}`} style={style}>
      <div className="marquee-track">
        <div className="marquee-content">{children}</div>
        <div className="marquee-content">{children}</div> {/* 👈 duplicate */}
      </div>
    </div>
  );
};

export default Marquee;
