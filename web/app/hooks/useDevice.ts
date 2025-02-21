'use client';

import { useState, useEffect } from 'react';

export function useDevice() {
  const [isMobile, setIsMobile] = useState(false);

  const checkDevice = () => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));

  }

  useEffect(() => {
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return {
    isMobile
  }
} 
