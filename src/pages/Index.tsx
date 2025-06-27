
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Zap, 
  Target, 
  Palette, 
  Code, 
  PenTool, 
  TrendingUp,
  CheckCircle,
  Star,
  Play,
  Download,
  Users,
  Award,
  Clock
} from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const HomePage: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      icon: Code,
      title: 'Website Development',
      description: 'Custom websites built with modern technologies for optimal performance and user experience.',
      features: ['React & Next.js', 'Full-Stack Development', 'Mobile Responsive', 'SEO Optimized'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Palette,
      title: 'Website Design',
      description: 'Stunning, conversion-focused designs that capture your brand essence and engage users.',
      features: ['UI/UX Design', 'Brand Identity', 'Wireframing', 'Prototyping'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: TrendingUp,
      title: 'Digital Marketing',
      description: 'Strategic marketing campaigns that drive traffic, engagement, and conversions.',
      features: ['SEO Strategy', 'Content Marketing', 'Social Media', 'Analytics'],
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: PenTool,
      title: 'Graphics Design',
      description: 'Eye-catching visual content that communicates your message effectively.',
      features: ['Logo Design', 'Brand Assets', 'Print Design', 'Digital Graphics'],
      color: 'from-green-500 to-teal-500'
    }
  ];

  const stats = [
    { label: 'Projects Completed', value: '150+', icon: Award },
    { label: 'Happy Clients', value: '100+', icon: Users },
    { label: 'Years Experience', value: '5+', icon: Clock },
    { label: 'Success Rate', value: '98%', icon: Star }
  ];

  const benefits = [
    'Lightning-fast delivery within agreed timelines',
    'Unlimited revisions until you\'re 100% satisfied',
    'Direct communication - no middlemen',
    '24/7 support and maintenance',
    'Competitive pricing with flexible payment plans',
    'Future-proof solutions that scale with your business'
  ];

  const portfolioItems = [
    {
      title: 'E-commerce Platform',
      category: 'Web Development',
      image: '/api/placeholder/400/300',
      technologies: ['React', 'Node.js', 'MongoDB']
    },
    {
      title: 'Brand Identity Design',
      category: 'Graphics Design',
      image: '/api/placeholder/400/300',
      technologies: ['Figma', 'Illustrator', 'Photoshop']
    },
    {
      title: 'SaaS Landing Page',
      category: 'Web Design',
      image: '/api/placeholder/400/300',
      technologies: ['Next.js', 'Tailwind', 'Framer Motion']
    }
  ];

  return (
    <div className="min-h-screen bg-brand-bg">
      <Navigation />
      
      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <div className="inline-flex items-center space-x-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 px-4 py-2 rounded-full mb-8 font-medium">
              <Zap className="w-4 h-4" />
              <span>Available for New Projects</span>
            </div>
            
            <h1 className="heading-xl mb-6 text-balance">
              Transform Your
              <span className="text-gradient"> Digital Presence </span>
              with Expert Design & Development
            </h1>
            
            <p className="text-xl text-brand-text-light mb-8 max-w-2xl mx-auto leading-relaxed">
              I craft exceptional websites, strategic digital marketing campaigns, and stunning visual designs 
              that drive results and grow your business. Let's build something extraordinary together.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link to="/contact" className="btn-primary text-lg px-8 py-4">
                Start Your Project
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link to="/portfolio" className="btn-secondary text-lg px-8 py-4">
                View My Work
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="animate-on-scroll" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="text-center p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20">
                    <stat.icon className="w-6 h-6 text-primary-500 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-brand-text">{stat.value}</div>
                    <div className="text-sm text-brand-text-light">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-brand-bg-secondary">
        <div className="container-custom">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="heading-lg mb-4">
              Comprehensive Digital Solutions
            </h2>
            <p className="text-xl text-brand-text-light max-w-2xl mx-auto">
              From initial concept to final launch, I provide end-to-end services that 
              transform your vision into powerful digital experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="animate-on-scroll card-modern p-8 group hover:scale-105" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} p-0.5 mb-6`}>
                  <div className="w-full h-full bg-white dark:bg-gray-900 rounded-2xl flex items-center justify-center">
                    <service.icon className="w-8 h-8 text-gray-700 dark:text-white" />
                  </div>
                </div>
                
                <h3 className="heading-sm mb-4">{service.title}</h3>
                <p className="text-brand-text-light mb-6">{service.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0" />
                      <span className="text-brand-text-light">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link 
                  to={`/services/${service.title.toLowerCase().replace(' ', '-')}`}
                  className="inline-flex items-center text-primary-500 hover:text-primary-600 font-semibold group-hover:translate-x-1 transition-transform duration-300"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Me Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-on-scroll">
              <h2 className="heading-lg mb-6">
                Why Choose Me for Your Next Project?
              </h2>
              <p className="text-xl text-brand-text-light mb-8">
                I don't just deliver projects – I deliver results. Here's what makes working with me different:
              </p>
              
              <div className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-6 h-6 text-primary-500 flex-shrink-0 mt-0.5" />
                    <span className="text-brand-text-light">{benefit}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/about" className="btn-primary">
                  Learn About Me
                </Link>
                <Link to="/contact" className="btn-secondary">
                  Get Free Consultation
                </Link>
              </div>
            </div>
            
            <div className="animate-on-scroll">
              <div className="relative">
                <div className="bg-gradient-brand rounded-3xl p-8 text-white">
                  <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
                  <p className="text-green-100 mb-6">
                    Let's discuss your project and see how I can help you achieve your goals.
                  </p>
                  
                  <div className="bg-white/20 rounded-2xl p-6 mb-6">
                    <h4 className="font-semibold mb-3">What You'll Get:</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• Free project consultation (30 minutes)</li>
                      <li>• Custom strategy roadmap</li>
                      <li>• Transparent pricing with no hidden fees</li>
                      <li>• Timeline and milestone breakdown</li>
                    </ul>
                  </div>
                  
                  <Link to="/contact" className="btn-secondary bg-white text-primary-600 hover:bg-gray-100 w-full text-center">
                    Book Free Consultation
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
                
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center text-2xl animate-bounce-slow">
                  🚀
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Work Section */}
      <section className="section-padding bg-brand-bg-secondary">
        <div className="container-custom">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="heading-lg mb-4">
              Featured Work
            </h2>
            <p className="text-xl text-brand-text-light max-w-2xl mx-auto">
              Take a look at some of my recent projects that have helped businesses 
              achieve their digital goals and drive growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {portfolioItems.map((item, index) => (
              <div key={index} className="animate-on-scroll card-modern overflow-hidden group hover:scale-105" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="aspect-[4/3] bg-gradient-to-br from-primary-100 to-green-100 dark:from-gray-800 dark:to-gray-700 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl opacity-20">{item.category.includes('Design') ? '🎨' : '💻'}</div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="text-sm text-primary-500 font-medium mb-2">{item.category}</div>
                  <h3 className="font-semibold text-brand-text mb-3">{item.title}</h3>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.technologies.map((tech, idx) => (
                      <span key={idx} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-sm rounded-full text-brand-text-light">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <Link to="/portfolio" className="inline-flex items-center text-primary-500 hover:text-primary-600 font-semibold">
                    View Project
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center animate-on-scroll">
            <Link to="/portfolio" className="btn-primary">
              View All Projects
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-brand">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto animate-on-scroll">
            <h2 className="heading-lg text-white mb-6">
              Ready to Transform Your Digital Presence?
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Join the growing list of successful businesses that have partnered with me 
              to achieve their digital goals. Let's make your vision a reality.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link to="/contact" className="btn-secondary bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 text-lg">
                Start Your Project Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link to="/portfolio" className="text-white hover:text-green-200 font-semibold flex items-center">
                <Play className="w-5 h-5 mr-2" />
                Watch Success Stories
              </Link>
            </div>
            
            <div className="text-green-200 text-sm">
              No upfront costs • Free consultation • 30-day money-back guarantee
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
