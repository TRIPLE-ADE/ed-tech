'use client'
import { useState } from 'react';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui';


type Feature = {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
};

export const FeatureCard = ({ feature }: { feature: Feature }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className="group relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:from-blue-700/20 dark:via-purple-700/20 dark:to-pink-700/20" />
      <div className="absolute top-0 right-0 w-0 h-0 border-l-[60px] border-b-[60px] border-l-transparent border-b-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 dark:border-b-blue-700/20" />

      <CardHeader>
        <div className="relative">
          <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4 transition-transform duration-300 ${isHovered ? 'scale-110 rotate-6' : ''}`}>
            <feature.icon className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            {feature.title}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-300">
          {feature.description}
        </CardDescription>
      </CardContent>
    </Card>
  );
};
