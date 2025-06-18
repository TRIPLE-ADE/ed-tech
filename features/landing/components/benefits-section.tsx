'use client'

import React from "react";

import { BenefitsData } from "../constants";

export const Benefits = () => {
  return (
    <section className='py-10 px-4 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm'>
      <div className='container mx-auto'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100'>
            Why Choose ThryX AI?
          </h2>
          <p className='text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto'>
            Join thousands of learners who have transformed their education
            journey.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {BenefitsData.map((benefit, index) => (
            <div key={index} className='text-center group'>
              <div className='w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
                <benefit.icon className='w-8 h-8 text-white' />
              </div>
              <h3 className='text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100'>
                {benefit.title}
              </h3>
              <p className='text-gray-600 dark:text-gray-400'>
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
