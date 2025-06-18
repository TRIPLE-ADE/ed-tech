import React from 'react'
import { ArrowRight } from 'lucide-react'

import { Button } from '@/components/ui'

export const CTA = () => {
    return (
        <section className="py-10 px-4 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600" />
            <div className="absolute inset-0 bg-black/20" />
            <div className="container mx-auto text-center relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
                    Ready to Transform Your Learning?
                </h2>
                <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
                    Join thousands of students and professionals who are already learning smarter with ThryX AI.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 hover:scale-105">
                        Start Learning Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </div>
        </section>
    )
}
