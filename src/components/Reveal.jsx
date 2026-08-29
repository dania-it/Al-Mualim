// src/components/Reveal.jsx
import { useEffect, useRef, useState } from 'react';

// بيلف أي قسم ويخليه يظهر بحركة ناعمة (fade + slide up) أول ما يدخل الشاشة وقت السكرول،
// بدل ما تكون كل الأقسام ثابتة وظاهرة دفعة وحدة من البداية.
export default function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // مرة وحدة بس، مش كل ما يدخل ويطلع من الشاشة
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}