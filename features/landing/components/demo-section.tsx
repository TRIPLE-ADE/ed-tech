'use client'
import React from "react";

import { DemoSteps } from "../constants";

export const Demo = () => {
  return (
    <section
      id='how-it-works'
      className='py-10 pt-20 px-4 relative bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm scroll-mt-20'
    >
      <div className='container mx-auto'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-gray-100'>
            See ThryX AI In Action
          </h2>
          <p className='text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto'>
            Transform your learning in just three simple steps.
          </p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20 max-w-5xl mx-auto'>
          {DemoSteps.map((step) => (
            <div
              key={step.id}
              className='relative flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 transform transition-all duration-300 hover:scale-[1.02]'
            >
              <div className='absolute -top-6 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold border-4 border-white dark:border-gray-800 shadow-md'>
                {step.id}
              </div>
              <div className='mt-8 mb-4'>
                <step.icon className='w-10 h-10 text-blue-600 dark:text-blue-400' />
              </div>
              <h3 className='text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100'>
                {step.title}
              </h3>
              <p className='text-gray-600 dark:text-gray-400'>
                {step.description}
              </p>
            </div>
          ))}
        </div>
        <div className='max-w-4xl mx-auto bg-gray-200 dark:bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-300 dark:border-gray-700'>
          <div
            className='relative'
            style={{ paddingBottom: "56.25%", height: 0 }}
          >
            <iframe
              src='https://www.youtube.com/embed/YOUR_YOUTUBE_VIDEO_ID'
              title='ThryX AI Demo'
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
              className='absolute top-0 left-0 w-full h-full rounded-xl'
            ></iframe>
          </div>
          <p className='text-center text-gray-700 dark:text-gray-300 text-lg py-6 px-4'>
            Watch a quick overview to see how ThryX AI can revolutionize your
            learning experience.
          </p>
        </div>
      </div>
    </section>
  );
};
