'use client';
import { useEffect, useState } from 'react';

type StatCounterProps = {
  end: number;
  label: string;
  prefix?: string;
  suffix?: string;
};

export const StatCounter = ({
  end,
  label,
  prefix = "",
  suffix = "",
}: StatCounterProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = end / steps;
    const stepDuration = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [end]);

  return (
    <div className='text-center'>
      <div className='text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2'>
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className='text-gray-600 dark:text-gray-400'>{label}</div>
    </div>
  );
};
