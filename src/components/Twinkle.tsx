"use client";
import React, { useEffect, useRef } from "react";
import './Twink.css'

const TwinklingStars: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const starCount = 200;
    const sizes = ["star-small", "star-medium", "star-large"];
    const sizeWeights = [0.7, 0.2, 0.1];

    const stars: HTMLDivElement[] = [];

    function getRandomSize() {
      const random = Math.random();
      let cumulative = 0;

      for (let i = 0; i < sizeWeights.length; i++) {
        cumulative += sizeWeights[i];
        if (random < cumulative) return sizes[i];
      }
      return sizes[0];
    }

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement("div");
      star.className = `star ${getRandomSize()}`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.animationDuration = `${2 + Math.random() * 3}s`;
      star.style.animationDelay = `${Math.random() * 5}s`;

      stars.push(star);
      container.appendChild(star);
    }

    return () => {
      stars.forEach((s) => container.removeChild(s));
    };
  }, []);

  return <div ref={containerRef} className="stars-background" />;
};

export default TwinklingStars;
