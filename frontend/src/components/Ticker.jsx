import React, { useEffect, useState, useRef } from 'react';
import "../Ticker.css"

export default function Ticker() {
  const [message, setMessage] = useState('Waiting for updates...');
  const tickerRef = useRef(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');
    socket.onmessage = (event) => {
      setMessage(event.data);
    };
    return () => socket.close();
  }, []);

  // Restart animation on message change
  useEffect(() => {
    const el = tickerRef.current;
    if (el) {
      el.style.animation = 'none'; // Stop animation
      void el.offsetWidth; // Trigger reflow
      el.style.animation = ''; // Restart animation
    }
  }, [message]);

const repeatCount = 4; // How many times each set repeats
return (
  <div className="ticker">
    <div className="ticker__list" ref={tickerRef}>
      {Array.from({ length: repeatCount }).map((_, index) => (
        <span key={`set1-${index}`} className="ticker__item">{message}</span>
      ))}
      {Array.from({ length: repeatCount }).map((_, index) => (
        <span key={`set2-${index}`} className="ticker__item">{message}</span>
      ))}
    </div>
  </div>
);

}
