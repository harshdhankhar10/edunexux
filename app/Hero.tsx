"use client"

import React from 'react';
import {
  BookOpen,
  Users,
  ClipboardCheck,
  MessageSquare,
  BarChart3,
  Cloud,
  ChevronRight,
  Laptop,
  Brain,
  Target,
  Award,
  Clock,
  Shield,
  Zap,
  Heart,
  Star,
  Coffee,
  Sparkles,
  Lightbulb,
  GraduationCap,
  PenTool,
  FileText,
  Calendar,
  Bell,
  Settings,
  Lock,
  Globe,
  Smartphone,
  Video,
  Mail,
  Headphones,
  Book,
  Monitor,
  Wifi,
  Database,
  Share2,
  Palette,
  Layout,
  Sliders,
  Bookmark,
  Printer,
  Download,
  Upload,
  Search,
  Filter,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  Info
} from 'lucide-react';
import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Hero() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.section

        className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 to-white"

      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeIn}>
              <span className="inline-block px-4 py-2 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold mb-6">
                #1 Classroom Management Platform
              </span>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Transform Your Classroom Into a 
                <span className="text-blue-500"> Smart Learning Hub</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                Experience the future of education with our comprehensive classroom management system. 
                Engage students, track progress, and streamline your teaching workflow - all in one platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-blue-500 text-white px-8 py-4 rounded-lg hover:bg-blue-600 transition flex items-center justify-center text-lg font-semibold">
                  Start Free Trial <ChevronRight className="ml-2 h-5 w-5" />
                </button>
                <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:bg-gray-50 transition flex items-center justify-center text-lg font-semibold">
                  Watch Demo <Video className="ml-2 h-5 w-5" />
                </button>
              </div>
              <div className="mt-8 flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <img
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-white"
                      src={`https://i.pravatar.cc/150?img=${i + 1}`}
                      alt="User avatar"
                    />
                  ))}
                </div>
                <div className="text-gray-600">
                  <span className="font-semibold text-blue-500">10,000+</span> educators trust us
                </div>
              </div>
            </motion.div>
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
                alt="Digital Classroom"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Target className="h-6 w-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold">98% Success Rate</h3>
                    <p className="text-sm text-gray-500">Student Engagement</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Trust Indicators */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-lg text-gray-600">Trusted by leading educational institutions</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-60">
            {[
              'Harvard University',
              'Stanford Education',
              'MIT Learning',
              'Oxford Academy'
            ].map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-xl font-semibold text-gray-500"
              >
                {partner}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Transform Your Teaching Experience
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how SmartClass revolutionizes classroom management with powerful features designed for modern education
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: 'AI-Powered Learning',
                desc: 'Leverage artificial intelligence to personalize learning paths and provide adaptive content recommendations.',
                features: [
                  'Smart content adaptation',
                  'Personalized learning paths',
                  'Progress prediction',
                  'Learning style analysis'
                ]
              },
              {
                icon: Users,
                title: 'Collaborative Environment',
                desc: 'Foster engagement with real-time collaboration tools and interactive learning experiences.',
                features: [
                  'Group projects',
                  'Discussion boards',
                  'Peer reviews',
                  'Live collaboration'
                ]
              },
              {
                icon: BarChart3,
                title: 'Advanced Analytics',
                desc: 'Gain deep insights into student performance and learning patterns with comprehensive analytics.',
                features: [
                  'Performance tracking',
                  'Engagement metrics',
                  'Progress reports',
                  'Behavioral analysis'
                ]
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="bg-blue-50 p-4 rounded-lg inline-block mb-6">
                  <benefit.icon className="h-8 w-8 text-blue-500" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">{benefit.title}</h3>
                <p className="text-gray-600 mb-6">{benefit.desc}</p>
                <ul className="space-y-3">
                  {benefit.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-700">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: '10K+', label: 'Active Users', icon: Users },
              { number: '500+', label: 'Schools', icon: GraduationCap },
              { number: '1M+', label: 'Assignments', icon: FileText },
              { number: '99.9%', label: 'Uptime', icon: Clock },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 rounded-xl bg-blue-600/30 backdrop-blur-sm"
              >
                <div className="flex justify-center mb-4">
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-blue-100">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to create an engaging and effective learning environment
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: Users, title: 'User Management', desc: 'Role-based access control and permissions' },
              { icon: ClipboardCheck, title: 'Smart Attendance', desc: 'Automated tracking with multiple options' },
              { icon: Calendar, title: 'Scheduling', desc: 'Flexible calendar and event management' },
              { icon: MessageSquare, title: 'Communication', desc: 'Real-time messaging and notifications' },
              { icon: BarChart3, title: 'Analytics', desc: 'Comprehensive performance tracking' },
              { icon: Cloud, title: 'Cloud Storage', desc: 'Secure file management system' },
              { icon: Shield, title: 'Security', desc: 'Enterprise-grade data protection' },
              { icon: Settings, title: 'Customization', desc: 'Flexible platform configuration' },
              { icon: Globe, title: 'Accessibility', desc: 'Multi-language support' },
              { icon: Database, title: 'Data Management', desc: 'Robust data handling' },
              { icon: Layout, title: 'Interface', desc: 'Intuitive user experience' },
              { icon: Heart, title: 'Support', desc: '24/7 customer assistance' },
              { icon: Video, title: 'Video Learning', desc: 'Integrated video platform' },
              { icon: Book, title: 'Resources', desc: 'Digital library access' },
              { icon: Target, title: 'Goals', desc: 'Progress tracking system' },
              { icon: Share2, title: 'Sharing', desc: 'Content distribution tools' }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition group cursor-pointer"
              >
                <div className="bg-blue-50 p-3 rounded-lg inline-block mb-4 group-hover:bg-blue-500 transition-colors duration-300">
                  <feature.icon className="h-6 w-6 text-blue-500 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-500 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How SmartClass Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get started with our simple and intuitive platform in just a few steps
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Create Your Account',
                desc: 'Sign up and customize your profile with your teaching preferences and subjects.',
                icon: UserPlus
              },
              {
                step: '02',
                title: 'Set Up Your Class',
                desc: 'Create virtual classrooms, invite students, and organize your course materials.',
                icon: Layout
              },
              {
                step: '03',
                title: 'Start Teaching',
                desc: 'Use our comprehensive tools to deliver engaging lessons and track progress.',
                icon: Sparkles
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="relative bg-white p-8 rounded-xl shadow-lg"
              >
                <div className="absolute -top-4 -left-4 bg-blue-500 text-white w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold">
                  {step.step}
                </div>
                <div className="mb-6 pt-4">
                  <step.icon className="h-12 w-12 text-blue-500" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-blue-500 font-semibold">TESTIMONIALS</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-4">
              Loved by Educators Worldwide
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See what teachers and administrators are saying about SmartClass
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                role: 'High School Teacher',
                image: 'https://i.pravatar.cc/150?img=1',
                text: 'SmartClass has revolutionized how I manage my classroom. The automated attendance and grading features save me hours each week, and my students love the interactive learning tools.',
                rating: 5,
              },
              {
                name: 'Dr. Michael Chen',
                role: 'University Professor',
                image: 'https://i.pravatar.cc/150?img=2',
                text: 'As a professor handling multiple large classes, SmartClass has been a game-changer. The analytics help me identify struggling students early, and the automated workflows have significantly reduced my administrative burden.',
                rating: 5,
              },
              {
                name: 'Emily Brown',
                role: 'School Administrator',
                image: 'https://i.pravatar.cc/150?img=3',
                text: 'The comprehensive analytics and reporting features have transformed how we track and improve student performance. SmartClass is an essential tool for modern education management.',
                rating: 5,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                    <p className="text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 italic">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the perfect plan for your educational needs
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Basic',
                price: '$29',
                description: 'Perfect for small classes',
                features: [
                  'Up to 50 students',
                  'Basic analytics',
                  'Email support',
                  'Core features'
                ]
              },
              {
                name: 'Pro',
                price: '$79',
                description: 'Ideal for growing institutions',
                features: [
                  'Up to 500 students',
                  'Advanced analytics',
                  'Priority support',
                  'All features'
                ]
              },
              {
                name: 'Enterprise',
                price: 'Custom',
                description: 'For large organizations',
                features: [
                  'Unlimited students',
                  'Custom analytics',
                  '24/7 support',
                  'Custom features'
                ]
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`bg-white p-8 rounded-xl shadow-lg ${
                  index === 1 ? 'border-2 border-blue-500 relative' : ''
                }`}
              >
                {index === 1 && (
                  <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm font-semibold">
                    Popular
                  </div>
                )}
                <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold mb-4">{plan.price}<span className="text-lg text-gray-500">/month</span></div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center text-gray-700">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-lg font-semibold transition ${
                  index === 1
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}>
                  Get Started
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about SmartClass
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                q: 'How does the free trial work?',
                a: 'Our 30-day free trial includes all Pro features. No credit card required.'
              },
              {
                q: 'Can I import existing student data?',
                a: 'Yes, you can easily import student data using CSV files or our API.'
              },
              {
                q: 'Is SmartClass GDPR compliant?',
                a: 'Yes, we maintain strict GDPR compliance and data protection standards.'
              },
              {
                q: 'What support options are available?',
                a: '24/7 email support for all plans, with phone and priority support for Pro and Enterprise.'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition"
              >
                <h3 className="text-xl font-semibold mb-4 flex items-start">
                  <HelpCircle className="h-6 w-6 text-blue-500 mr-3 flex-shrink-0" />
                  {faq.q}
                </h3>
                <p className="text-gray-600 ml-9">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-blue-500 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Stay Updated with SmartClass
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Get the latest updates, tips, and educational resources delivered to your inbox
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-6 py-3 rounded-lg text-gray-900 w-full sm:w-96"
              />
              <button className="bg-white text-blue-500 px-8 py-3 rounded-lg hover:bg-blue-50 transition font-semibold">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-12 text-center text-white"
          >
            <h2 className="text-4xl font-bold mb-6">
              Ready to Transform Your Classroom?
            </h2>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              Join thousands of educators who are already using SmartClass to create engaging learning experiences
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-500 px-8 py-4 rounded-lg hover:bg-blue-50 transition font-semibold">
                Start Free Trial
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-blue-600 transition font-semibold">
                Schedule Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

function UserPlus(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <line x1="19" x2="19" y1="8" y2="14" />
      <line x1="22" x2="16" y1="11" y2="11" />
    </svg>
  );
}