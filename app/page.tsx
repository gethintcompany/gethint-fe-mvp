'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  TrendingUp,
  Shield,
  Search,
  Target,
  Brain,
  Zap,
  Eye,
  ArrowRight,
  ChevronRight,
  Star,
} from 'lucide-react';

// Mock trending stocks data
const trendingStocks = [
  {
    symbol: 'RELIANCE',
    name: 'Reliance Industries',
    price: '₹2,456',
    change: '+2.3%',
    score: 8.2,
    positive: true,
  },
  {
    symbol: 'TCS',
    name: 'Tata Consultancy',
    price: '₹3,890',
    change: '+1.8%',
    score: 9.1,
    positive: true,
  },
  {
    symbol: 'INFY',
    name: 'Infosys Limited',
    price: '₹1,654',
    change: '+0.9%',
    score: 8.7,
    positive: true,
  },
  {
    symbol: 'HDFC',
    name: 'HDFC Bank',
    price: '₹1,789',
    change: '-0.5%',
    score: 7.9,
    positive: false,
  },
];

export default function LandingPage() {
  const [currentStock, setCurrentStock] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStock((prev) => (prev + 1) % trendingStocks.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='min-h-screen bg-white'>
      {/* Navigation */}
      <nav className='bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-sm bg-white/95'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between items-center h-16'>
            <div className='flex items-center'>
              <TrendingUp className='h-7 w-7 text-blue-600' />
              <span className='ml-2 text-xl font-semibold text-gray-900'>
                GetHints
              </span>
              <Badge
                variant='secondary'
                className='ml-3 text-xs bg-blue-50 text-blue-700 border-blue-200'
              >
                AI Powered
              </Badge>
            </div>
            <div className='hidden md:flex items-center space-x-8'>
              <Link href='/' className='text-gray-900 font-medium'>
                Home
              </Link>
              <Link
                href='/stocks'
                className='text-gray-600 hover:text-gray-900 transition-colors'
              >
                Stocks
              </Link>
              <Button
                variant='outline'
                size='sm'
                className='border-gray-300 bg-transparent'
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className='pt-16 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid lg:grid-cols-2 gap-16 items-center'>
            {/* Left Column */}
            <div className='space-y-8'>
              <div className='space-y-6'>
                <div className='flex items-center space-x-3'>
                  <Badge className='bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-100'>
                    <Brain className='h-3 w-3 mr-1' />
                    AI Analysis
                  </Badge>
                  <Badge className='bg-green-100 text-green-800 border-green-200 hover:bg-green-100'>
                    <Zap className='h-3 w-3 mr-1' />
                    Real-Time
                  </Badge>
                </div>

                <h1 className='text-5xl lg:text-6xl font-bold text-gray-900 leading-tight'>
                  AI-Driven Stock{' '}
                  <span className='text-blue-600'>Insights</span> for Smarter{' '}
                  <span className='relative'>
                    Investments
                    <div className='absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600 rounded-full'></div>
                  </span>
                </h1>

                <p className='text-xl text-gray-600 leading-relaxed'>
                  Make informed investment decisions with our advanced AI that
                  analyzes market data, sentiment, and technical indicators for
                  Indian stocks.
                </p>
              </div>

              <div className='flex flex-col sm:flex-row gap-4'>
                <Link href='/stocks'>
                  <Button
                    size='lg'
                    className='bg-blue-600 hover:bg-blue-700 px-8 py-3 text-base group'
                  >
                    Explore Stocks
                    <ArrowRight className='ml-2 h-4 w-4 group-hover:translate-x-0.5 transition-transform' />
                  </Button>
                </Link>
                <Button
                  size='lg'
                  variant='outline'
                  className='px-8 py-3 text-base bg-transparent'
                >
                  View Demo
                </Button>
              </div>

              {/* Stats */}
              <div className='grid grid-cols-2 lg:grid-cols-4 gap-8 pt-8 border-t border-gray-100'>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-gray-900'>2,500+</div>
                  <div className='text-sm text-gray-600'>Stocks Analyzed</div>
                </div>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-gray-900'>50K+</div>
                  <div className='text-sm text-gray-600'>Active Users</div>
                </div>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-gray-900'>94%</div>
                  <div className='text-sm text-gray-600'>Accuracy Rate</div>
                </div>
                <div className='text-center'>
                  <div className='text-2xl font-bold text-gray-900'>4.9</div>
                  <div className='text-sm text-gray-600 flex items-center justify-center'>
                    <Star className='h-3 w-3 text-yellow-400 mr-1' />
                    Rating
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Dashboard Preview */}
            <div className='relative'>
              <Card className='shadow-xl border-0 bg-white'>
                <CardContent className='p-6'>
                  <div className='space-y-6'>
                    {/* Header */}
                    <div className='flex items-center justify-between'>
                      <h3 className='text-lg font-semibold text-gray-900'>
                        Market Overview
                      </h3>
                      <div className='flex items-center space-x-2'>
                        <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                        <span className='text-sm text-gray-600'>Live</span>
                      </div>
                    </div>

                    {/* Trending Stocks */}
                    <div className='space-y-3'>
                      <div className='flex items-center justify-between text-sm text-gray-600 mb-3'>
                        <span>Top Performers</span>
                        <TrendingUp className='h-4 w-4' />
                      </div>
                      {trendingStocks.map((stock, index) => (
                        <div
                          key={stock.symbol}
                          className={`flex items-center justify-between p-3 rounded-lg transition-all duration-700 ${
                            index === currentStock
                              ? 'bg-blue-50 border border-blue-100'
                              : 'bg-gray-50 opacity-70'
                          }`}
                        >
                          <div className='flex items-center space-x-3'>
                            <div className='w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center'>
                              <span className='text-xs font-medium text-white'>
                                {stock.symbol.substring(0, 2)}
                              </span>
                            </div>
                            <div>
                              <div className='font-medium text-gray-900 text-sm'>
                                {stock.symbol}
                              </div>
                              <div className='text-xs text-gray-500'>
                                {stock.name}
                              </div>
                            </div>
                          </div>
                          <div className='text-right'>
                            <div className='font-medium text-gray-900 text-sm'>
                              {stock.price}
                            </div>
                            <div
                              className={`text-xs ${
                                stock.positive
                                  ? 'text-green-600'
                                  : 'text-red-600'
                              }`}
                            >
                              {stock.change}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* AI Score Preview */}
                    <div className='bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100'>
                      <div className='flex items-center space-x-2 mb-3'>
                        <Brain className='h-4 w-4 text-blue-600' />
                        <span className='text-sm font-medium text-blue-900'>
                          AI Analysis
                        </span>
                      </div>
                      <div className='grid grid-cols-3 gap-4 text-center'>
                        <div>
                          <div className='text-lg font-bold text-blue-600'>
                            8.2
                          </div>
                          <div className='text-xs text-gray-600'>Overall</div>
                        </div>
                        <div>
                          <div className='text-lg font-bold text-green-600'>
                            Low
                          </div>
                          <div className='text-xs text-gray-600'>Risk</div>
                        </div>
                        <div>
                          <div className='text-lg font-bold text-blue-600'>
                            94%
                          </div>
                          <div className='text-xs text-gray-600'>
                            Confidence
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Floating Elements */}
              <div className='absolute -top-2 -right-2 w-4 h-4 bg-blue-500 rounded-full opacity-60'></div>
              <div className='absolute -bottom-2 -left-2 w-3 h-3 bg-green-500 rounded-full opacity-60'></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-white'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>
              Why Choose <span className='text-blue-600'>GetHints</span>
            </h2>
            <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
              Advanced AI technology meets intuitive design for superior stock
              analysis
            </p>
          </div>

          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {[
              {
                icon: Brain,
                title: 'AI-Powered Analysis',
                description:
                  'Advanced algorithms analyze multiple data points for comprehensive insights',
                color: 'blue',
              },
              {
                icon: Eye,
                title: 'Real-Time Monitoring',
                description:
                  'Stay updated with live market data and instant analysis updates',
                color: 'green',
              },
              {
                icon: Shield,
                title: 'Risk Assessment',
                description:
                  'Detailed risk analysis helps protect and optimize your investments',
                color: 'purple',
              },
              {
                icon: Target,
                title: 'Precision Scoring',
                description:
                  'Get clear, actionable scores from 0-10 for every stock analysis',
                color: 'orange',
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className='border-0 shadow-sm hover:shadow-md transition-shadow duration-300'
              >
                <CardContent className='p-6 text-center'>
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4 ${
                      feature.color === 'blue'
                        ? 'bg-blue-100 text-blue-600'
                        : feature.color === 'green'
                        ? 'bg-green-100 text-green-600'
                        : feature.color === 'purple'
                        ? 'bg-purple-100 text-purple-600'
                        : 'bg-orange-100 text-orange-600'
                    }`}
                  >
                    <feature.icon className='h-6 w-6' />
                  </div>
                  <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                    {feature.title}
                  </h3>
                  <p className='text-gray-600 text-sm leading-relaxed'>
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-gray-50'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl font-bold text-gray-900 mb-4'>
              How It Works
            </h2>
            <p className='text-lg text-gray-600'>
              Three simple steps to smarter investing
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-8 relative'>
            {/* Connection Lines */}
            <div className='hidden md:block absolute top-24 left-1/3 right-1/3 h-px bg-gray-200'></div>

            {[
              {
                step: '1',
                title: 'Search & Discover',
                description:
                  'Browse our comprehensive database of Indian stocks with intelligent search capabilities',
                icon: Search,
              },
              {
                step: '2',
                title: 'AI Analysis',
                description:
                  'Our AI processes fundamental data, market sentiment, and technical indicators instantly',
                icon: Brain,
              },
              {
                step: '3',
                title: 'Make Decisions',
                description:
                  'Get clear recommendations with confidence scores and detailed risk assessments',
                icon: Target,
              },
            ].map((step, index) => (
              <div key={index} className='relative text-center'>
                <div className='bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300'>
                  <div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6'>
                    <step.icon className='h-8 w-8 text-blue-600' />
                  </div>
                  <div className='text-sm font-medium text-blue-600 mb-2'>
                    Step {step.step}
                  </div>
                  <h3 className='text-xl font-semibold text-gray-900 mb-4'>
                    {step.title}
                  </h3>
                  <p className='text-gray-600 leading-relaxed'>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-20 px-4 sm:px-6 lg:px-8 bg-blue-600'>
        <div className='max-w-4xl mx-auto text-center'>
          <h2 className='text-3xl font-bold text-white mb-6'>
            Ready to Start Your Investment Journey?
          </h2>
          <p className='text-xl text-blue-100 mb-8 max-w-2xl mx-auto'>
            Join thousands of investors who trust GetHints for intelligent stock
            analysis
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Link href='/stocks'>
              <Button
                size='lg'
                className='bg-white text-blue-600 hover:bg-gray-50 px-8 py-3'
              >
                Get Started Free
                <ArrowRight className='ml-2 h-4 w-4' />
              </Button>
            </Link>
            <Button
              size='lg'
              variant='outline'
              className='border-white text-white hover:bg-white/10 px-8 py-3 bg-transparent'
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='bg-gray-900 text-white py-12'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-center mb-8'>
            <TrendingUp className='h-6 w-6 text-blue-400' />
            <span className='ml-2 text-xl font-semibold'>GetHints</span>
          </div>
          <div className='text-center text-gray-400'>
            <p>&copy; 2024 GetHints. All rights reserved.</p>
            <p className='mt-2'>
              AI-powered stock insights for the Indian market.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
