"use client";

import React from "react";

import { Features } from "../constants";
import { FeatureCard } from "./feature-card";

export const Feature = () => {
  return (
    <section id='features' className='py-10 px-4 relative scroll-mt-20'>
      <div className='container mx-auto'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent dark:from-gray-100 dark:to-gray-300'>
            Powerful Features for Modern Learning
          </h2>
          <p className='text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto'>
            Experience the future of education with our comprehensive suite of
            AI-powered tools.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {Features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};
