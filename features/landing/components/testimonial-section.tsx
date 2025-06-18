import React from "react";
import { Star } from "lucide-react";

import { Card } from "@/components/ui";

export const Testimonial = () => {
  return (
    <section id='testimonials' className='py-10 px-4 scroll-mt-20'>
      <div className='container mx-auto'>
        <div className='text-center mb-16'>
          <h2 className='text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100'>
            Loved by Students Worldwide
          </h2>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {[
            {
              name: "Sarah Chen",
              role: "Medical Student",
              content:
                "ThryX AI has revolutionized how I study. The PDF analysis and question generation features have cut my study time in half while improving my retention.",
              rating: 5,
            },
            {
              name: "Marcus Johnson",
              role: "Graduate Researcher",
              content:
                "The YouTube transcription and summarization tools are incredible. I can now process hours of lecture content in minutes.",
              rating: 5,
            },
            {
              name: "Elena Rodriguez",
              role: "High School Teacher",
              content:
                "I use ThryX AI to create engaging quizzes for my students. The intelligent grading saves me hours of work every week.",
              rating: 5,
            },
          ].map((testimonial, index) => (
            <Card key={index} className='p-8'>
              <div className='flex mb-4'>
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className='w-5 h-5 text-yellow-400 fill-current'
                  />
                ))}
              </div>
              <p className='text-gray-700 dark:text-gray-300 mb-6 italic'>
                &quot;{testimonial.content}&quot;
              </p>
              <div>
                <div className='font-semibold text-gray-900 dark:text-gray-100'>
                  {testimonial.name}
                </div>
                <div className='text-gray-600 dark:text-gray-400 text-sm'>
                  {testimonial.role}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
