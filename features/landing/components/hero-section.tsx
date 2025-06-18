import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Play,
  BadgeInfo,
} from "lucide-react";

import { Button } from '@/components/ui';
import { StatCounter } from '@/features/landing/components';

export const Hero = () => {
    return (
        <section className="relative min-h-[calc(100vh-64px)] flex items-center justify-center px-4 pt-8 pb-10">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-600/5 dark:to-purple-600/5" />
            <div className="container mx-auto text-center relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full border border-gray-200 dark:border-gray-700 shadow-sm">
                    <Sparkles className="h-4 w-4 text-blue-500 dark:text-purple-400" />
                    <span className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Introducing AI-Powered Learning Tools for Everyone
                    </span>
                </div>

                {/* New Beta Notification */}
                <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-blue-500/10 dark:bg-blue-900/20 rounded-full border border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300 text-sm font-medium animate-pulse">
                    <BadgeInfo className="h-4 w-4" />
                    <span>Currently in Beta - Help us improve!</span>
                </div>
                <h1 className="text-6xl sm:text-5xl md:text-7xl lg:text-9xl font-bold tracking-tight mb-6 font-neue">
                    <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent dark:from-gray-100 dark:via-blue-300 dark:to-purple-300">
                        Transform the Way
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        You Learn with AI
                    </span>
                </h1>

                <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                    Unlock your full potential with ThryX AI. Our cutting-edge AI tools transform
                    the way you study, learn, and retain information making learning faster,
                    smarter, and more engaging than ever before.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
                    <Button size="lg" className="group">
                        Get Started for Free
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <a href="#how-it-works" className="group"> {/* Updated to link to the new section */}
                        <Button size="lg" variant="outline" className="group">
                            <Play className="mr-2 h-4 w-4 text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                            Watch Demo
                        </Button>
                    </a>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
                    {/* <StatCounter end={50000} label="Active Learners" suffix="+" />
                    <StatCounter end={1000000} label="Documents Processed" suffix="+" />
                    <StatCounter end={95} label="Success Rate" suffix="%" />
                    <StatCounter end={24} label="Hour Support" suffix="/7" /> */}
                    <StatCounter end={50000} label="Our Vision: Active Learners" suffix="+" />
                    <StatCounter end={1000000} label="Documents Processed (Goal)" suffix="+" />
                    <StatCounter end={95} label="Target Success Rate" suffix="%" />
                    <StatCounter end={24} label="Future Support" suffix="/7" />
                </div>
            </div>
        </section>
    )
}