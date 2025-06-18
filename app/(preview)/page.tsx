"use client";
import React from 'react';
import {
  BookOpen,
  Brain,
  FileText,
  PenTool,
  Video,
  BarChart,
  Sparkles,
  ArrowRight,
  Play,
  Zap,
  Users,
  Star,
  Lightbulb,
  Moon,
  Sun,
  UploadCloud,
  FlaskConical,
  MessageSquare,
  BadgeInfo,
} from "lucide-react";
import GradientBackground from '@/components/gradient-background';
import FloatingParticles from '@/components/floating-particles';
import { Button, Card } from '@/components/ui';
import FeatureCard from '@/components/feature-card';

import StatCounter from '@/components/stat-counter';
import { Footer, Header } from '@/components/layout';

export default function EnhancedThryXLanding() {

  const features = [
    {
      title: "PDF Analysis",
      description: "Extract and analyze text from PDF documents with advanced AI understanding.",
      icon: FileText,
    },
    {
      title: "Smart Summarization",
      description: "Get concise, intelligent summaries of long texts in seconds.",
      icon: BookOpen,
    },
    {
      title: "AI-Generated Questions",
      description: "Create comprehensive quizzes from any content automatically.",
      icon: Brain,
    },
    {
      title: "Intelligent Grading",
      description: "Receive instant, detailed feedback on your answers with explanations.",
      icon: PenTool,
    },
    {
      title: "Progress Tracking",
      description: "Monitor your learning journey with detailed analytics and insights.",
      icon: BarChart,
    },
    {
      title: "YouTube Assistant",
      description: "Transcribe, summarize, and interact with YouTube video content.",
      icon: Video,
    },
  ];

  const benefits = [
    { icon: Zap, title: "10x Faster Learning", description: "Accelerate your study sessions with smart tools." },
    { icon: Users, title: "Collaborative Tools", description: "Share and learn together with integrated features." },
    { icon: Star, title: "Personalized Experience", description: "AI adapts to your unique learning style." },
    { icon: Lightbulb, title: "Smart Insights", description: "Discover knowledge gaps and strengths instantly." },
  ];

  const demoSteps = [
    {
      id: 1,
      title: "Upload Your Content",
      description: "Seamlessly upload PDFs, documents, or paste text/YouTube links. Our AI is ready.",
      icon: UploadCloud,
    },
    {
      id: 2,
      title: "AI Processes & Analyzes",
      description: "ThryX AI intelligently analyzes your material, identifying key concepts and information.",
      icon: FlaskConical,
    },
    {
      id: 3,
      title: "Learn, Question, & Grow",
      description: "Instantly summarize, generate questions, get graded, and track your progress.",
      icon: MessageSquare,
    },
  ];


  return (
    <>
      <Header />
      <main className="relative overflow-hidden min-h-screen bg-background text-foreground">
        <GradientBackground />
        <FloatingParticles />
        {/* Hero Section */}
        <section className="relative min-h-[calc(100vh-64px)] flex items-center justify-center px-4 pt-8 pb-10">
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
                  See How It Works
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

        {/* How It Works / Demo Section */}
        <section id="how-it-works" className="py-10 px-4 relative bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm scroll-mt-20">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                See ThryX AI In Action
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Transform your learning in just three simple steps.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20 max-w-5xl mx-auto">
              {demoSteps.map((step) => (
                <div key={step.id} className="relative flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 transform transition-all duration-300 hover:scale-[1.02]">
                  <div className="absolute -top-6 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold border-4 border-white dark:border-gray-800 shadow-md">
                    {step.id}
                  </div>
                  <div className="mt-8 mb-4">
                    <step.icon className="w-10 h-10 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-gray-100">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{step.description}</p>
                </div>
              ))}
            </div>

            {/* Video Placeholder */}
            <div className="max-w-4xl mx-auto bg-gray-200 dark:bg-gray-900 rounded-xl overflow-hidden shadow-2xl border border-gray-300 dark:border-gray-700">
              <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}> {/* 16:9 Aspect Ratio */}
                <iframe
                  src="https://www.youtube.com/embed/YOUR_YOUTUBE_VIDEO_ID" // Replace with your actual YouTube video ID
                  title="ThryX AI Demo"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full rounded-xl"
                ></iframe>
              </div>
              <p className="text-center text-gray-700 dark:text-gray-300 text-lg py-6 px-4">
                Watch a quick overview to see how ThryX AI can revolutionize your learning experience.
              </p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-10 px-4 relative scroll-mt-20">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent dark:from-gray-100 dark:to-gray-300">
                Powerful Features for Modern Learning
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Experience the future of education with our comprehensive suite of AI-powered tools.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <FeatureCard key={index} feature={feature} />
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-10 px-4 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                Why Choose ThryX AI?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Join thousands of learners who have transformed their education journey.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">{benefit.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-10 px-4 scroll-mt-20">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                Loved by Students Worldwide
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Chen",
                  role: "Medical Student",
                  content: "ThryX AI has revolutionized how I study. The PDF analysis and question generation features have cut my study time in half while improving my retention.",
                  rating: 5
                },
                {
                  name: "Marcus Johnson",
                  role: "Graduate Researcher",
                  content: "The YouTube transcription and summarization tools are incredible. I can now process hours of lecture content in minutes.",
                  rating: 5
                },
                {
                  name: "Elena Rodriguez",
                  role: "High School Teacher",
                  content: "I use ThryX AI to create engaging quizzes for my students. The intelligent grading saves me hours of work every week.",
                  rating: 5
                }
              ].map((testimonial, index) => (
                <Card key={index} className="p-8">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-6 italic">&quot;{testimonial.content}&quot;</p>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-gray-100">{testimonial.name}</div>
                    <div className="text-gray-600 dark:text-gray-400 text-sm">{testimonial.role}</div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
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
      </main>
      <Footer />
    </>
  );
}