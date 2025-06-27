
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Code, 
  Palette, 
  TrendingUp, 
  PenTool, 
  FileText,
  ArrowRight,
  CheckCircle,
  Star,
  Clock,
  Shield,
  Zap,
  Target
} from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const Services: React.FC = () => {
  const { serviceId } = useParams();
  const [selectedService, setSelectedService] = useState<string | null>(serviceId || null);

  const services = [
    {
      id: 'web-development',
      icon: Code,
      title: 'Website Development',
      shortDesc: 'Custom websites built with modern technologies',
      longDesc: 'I create powerful, scalable websites using cutting-edge technologies like React, Next.js, and Node.js. Every website is built with performance, security, and user experience as top priorities.',
      features: [
        'Custom Web Applications',
        'E-commerce Platforms',
        'Content Management Systems',
        'API Development & Integration',
        'Performance Optimization',
        'Security Implementation',
        'Mobile-First Responsive Design',
        'SEO-Friendly Architecture'
      ],
      packages: [
        {
          name: 'Starter Website',
          price: '$1,299',
          duration: '1-2 weeks',
          features: [
            'Up to 5 pages',
            'Responsive design',
            'Contact form',
            'Basic SEO setup',
            '3 months support'
          ]
        },
        {
          name: 'Business Website',
          price: '$2,499',
          duration: '2-3 weeks',
          features: [
            'Up to 10 pages',
            'Custom design',
            'CMS integration',
            'Advanced SEO',
            'Analytics setup',
            '6 months support'
          ],
          popular: true
        },
        {
          name: 'E-commerce Platform',
          price: '$4,999',
          duration: '3-4 weeks',
          features: [
            'Unlimited products',
            'Payment integration',
            'Inventory management',
            'Order tracking',
            'Admin dashboard',
            '12 months support'
          ]
        }
      ],
      process: [
        'Discovery & Planning',
        'Design & Wireframing',
        'Development & Testing',
        'Launch & Optimization'
      ],
      technologies: ['React', 'Next.js', 'Node.js', 'TypeScript', 'Tailwind CSS', 'MongoDB', 'PostgreSQL'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'web-design',
      icon: Palette,
      title: 'Website Design',
      shortDesc: 'Stunning, conversion-focused designs',
      longDesc: 'I design beautiful, user-centered websites that not only look great but also drive conversions. Every design is crafted with your brand identity and business goals in mind.',
      features: [
        'UI/UX Design',
        'Brand Identity Design',
        'Wireframing & Prototyping',
        'User Research & Analysis',
        'Conversion Optimization',
        'Mobile App Design',
        'Design System Creation',
        'Accessibility Compliant'
      ],
      packages: [
        {
          name: 'Design Only',
          price: '$899',
          duration: '1-2 weeks',
          features: [
            'Up to 5 page designs',
            'Mobile responsive',
            '3 revision rounds',
            'Design files delivery',
            'Style guide'
          ]
        },
        {
          name: 'Complete Design',
          price: '$1,699',
          duration: '2-3 weeks',
          features: [
            'Up to 10 pages',
            'Interactive prototype',
            'User flow diagrams',
            'Component library',
            'Brand guidelines',
            'Unlimited revisions'
          ],
          popular: true
        },
        {
          name: 'Design System',
          price: '$2,999',
          duration: '3-4 weeks',
          features: [
            'Complete design system',
            'Component documentation',
            'Brand identity package',
            'Multiple device layouts',
            'Design tokens',
            '6 months support'
          ]
        }
      ],
      process: [
        'Research & Strategy',
        'Conceptualization',
        'Design & Iteration',
        'Handoff & Documentation'
      ],
      technologies: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'Principle', 'InVision'],
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'digital-marketing',
      icon: TrendingUp,
      title: 'Digital Marketing',
      shortDesc: 'Strategic marketing that drives results',
      longDesc: 'I develop and execute comprehensive digital marketing strategies that increase your online visibility, drive qualified traffic, and convert visitors into customers.',
      features: [
        'SEO Strategy & Implementation',
        'Content Marketing',
        'Social Media Marketing',
        'Email Marketing Campaigns',
        'Pay-Per-Click Advertising',
        'Analytics & Reporting',
        'Conversion Rate Optimization',
        'Marketing Automation'
      ],
      packages: [
        {
          name: 'SEO Starter',
          price: '$799/mo',
          duration: 'Monthly',
          features: [
            'Keyword research',
            'On-page optimization',
            'Technical SEO audit',
            'Monthly reporting',
            'Local SEO setup'
          ]
        },
        {
          name: 'Growth Marketing',
          price: '$1,499/mo',
          duration: 'Monthly',
          features: [
            'Complete SEO package',
            'Content creation',
            'Social media management',
            'Email campaigns',
            'PPC management',
            'Weekly reporting'
          ],
          popular: true
        },
        {
          name: 'Enterprise Marketing',
          price: '$2,999/mo',
          duration: 'Monthly',
          features: [
            'Full-service marketing',
            'Marketing automation',
            'Advanced analytics',
            'Dedicated account manager',
            'Custom strategy',
            'Daily monitoring'
          ]
        }
      ],
      process: [
        'Audit & Analysis',
        'Strategy Development',
        'Implementation',
        'Monitor & Optimize'
      ],
      technologies: ['Google Analytics', 'SEMrush', 'Mailchimp', 'HubSpot', 'Facebook Ads', 'Google Ads'],
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'graphics-design',
      icon: PenTool,
      title: 'Graphics Design',
      shortDesc: 'Eye-catching visual content',
      longDesc: 'I create compelling visual designs that communicate your message effectively and strengthen your brand identity across all platforms and mediums.',
      features: [
        'Logo & Brand Identity',
        'Print Design Materials',
        'Digital Graphics',
        'Social Media Assets',
        'Packaging Design',
        'Infographics',
        'Presentation Design',
        'Marketing Collateral'
      ],
      packages: [
        {
          name: 'Logo Package',
          price: '$399',
          duration: '3-5 days',
          features: [
            '3 logo concepts',
            '3 revision rounds',
            'Vector files',
            'Color variations',
            'Usage guidelines'
          ]
        },
        {
          name: 'Brand Identity',
          price: '$899',
          duration: '1-2 weeks',
          features: [
            'Complete logo suite',
            'Brand guidelines',
            'Business card design',
            'Letterhead design',
            'Social media kit',
            'Brand color palette'
          ],
          popular: true
        },
        {
          name: 'Complete Branding',
          price: '$1,999',
          duration: '2-3 weeks',
          features: [
            'Full brand identity',
            'Marketing materials',
            'Packaging design',
            'Website graphics',
            'Social media templates',
            'Brand strategy document'
          ]
        }
      ],
      process: [
        'Brief & Research',
        'Concept Development',
        'Design & Refinement',
        'Final Delivery'
      ],
      technologies: ['Adobe Illustrator', 'Photoshop', 'InDesign', 'Figma', 'Canva Pro', 'Sketch'],
      color: 'from-green-500 to-teal-500'
    },
    {
      id: 'tech-writing',
      icon: FileText,
      title: 'Tech Writing',
      shortDesc: 'Clear, engaging technical content',
      longDesc: 'I create comprehensive technical documentation, tutorials, and content that makes complex topics accessible and engaging for your target audience.',
      features: [
        'Technical Documentation',
        'API Documentation',
        'User Manuals & Guides',
        'Blog Articles & Tutorials',
        'White Papers',
        'Case Studies',
        'Product Descriptions',
        'Content Strategy'
      ],
      packages: [
        {
          name: 'Documentation',
          price: '$599',
          duration: '3-5 days',
          features: [
            'Up to 10 pages',
            'Technical writing',
            'Screenshots/diagrams',
            '2 revision rounds',
            'PDF delivery'
          ]
        },
        {
          name: 'Content Package',
          price: '$1,199',
          duration: '1-2 weeks',
          features: [
            'Up to 5 articles',
            'SEO optimization',
            'Research included',
            'Images/graphics',
            'Content calendar',
            'Publishing assistance'
          ],
          popular: true
        },
        {
          name: 'Content Strategy',
          price: '$2,499',
          duration: '2-3 weeks',
          features: [
            'Complete content audit',
            'Content strategy plan',
            '10+ articles/guides',
            'Editorial calendar',
            'Content templates',
            '3 months support'
          ]
        }
      ],
      process: [
        'Content Audit',
        'Strategy Planning',
        'Writing & Editing',
        'Review & Publishing'
      ],
      technologies: ['Notion', 'GitBook', 'Confluence', 'WordPress', 'Ghost', 'Markdown'],
      color: 'from-indigo-500 to-blue-500'
    }
  ];

  const currentService = services.find(s => s.id === selectedService);

  useEffect(() => {
    if (serviceId) {
      setSelectedService(serviceId);
    }
  }, [serviceId]);

  return (
    <div className="min-h-screen bg-brand-bg">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-primary-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="heading-xl mb-6">
              Professional Digital Services
            </h1>
            <p className="text-xl text-brand-text-light mb-12 max-w-2xl mx-auto">
              From web development to digital marketing, I provide comprehensive solutions 
              that help your business thrive in the digital landscape.
            </p>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      {!selectedService && (
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div 
                  key={service.id} 
                  className="card-modern p-8 group hover:scale-105 cursor-pointer"
                  onClick={() => setSelectedService(service.id)}
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} p-0.5 mb-6`}>
                    <div className="w-full h-full bg-white dark:bg-gray-900 rounded-2xl flex items-center justify-center">
                      <service.icon className="w-8 h-8 text-gray-700 dark:text-white" />
                    </div>
                  </div>
                  
                  <h3 className="heading-sm mb-4">{service.title}</h3>
                  <p className="text-brand-text-light mb-6">{service.shortDesc}</p>
                  
                  <div className="flex items-center text-primary-500 hover:text-primary-600 font-semibold group-hover:translate-x-1 transition-transform duration-300">
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Detailed Service View */}
      {currentService && (
        <>
          {/* Service Header */}
          <section className="section-padding bg-brand-bg-secondary">
            <div className="container-custom">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${currentService.color} p-0.5`}>
                      <div className="w-full h-full bg-white dark:bg-gray-900 rounded-2xl flex items-center justify-center">
                        <currentService.icon className="w-10 h-10 text-gray-700 dark:text-white" />
                      </div>
                    </div>
                    <div>
                      <h1 className="heading-lg">{currentService.title}</h1>
                      <p className="text-brand-text-light">{currentService.shortDesc}</p>
                    </div>
                  </div>
                  
                  <p className="text-lg text-brand-text-light mb-8">
                    {currentService.longDesc}
                  </p>
                  
                  <div className="flex flex-wrap gap-3 mb-8">
                    {currentService.technologies.map((tech, index) => (
                      <span key={index} className="px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <Link to="/contact" className="btn-primary">
                    Get Started
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {currentService.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-800 rounded-xl">
                      <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0" />
                      <span className="text-brand-text text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Service Packages */}
          <section className="section-padding">
            <div className="container-custom">
              <div className="text-center mb-16">
                <h2 className="heading-lg mb-4">Service Packages</h2>
                <p className="text-xl text-brand-text-light max-w-2xl mx-auto">
                  Choose the package that best fits your needs and budget. All packages include my personal attention and expertise.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {currentService.packages.map((pkg, index) => (
                  <div key={index} className={`card-modern p-8 relative ${pkg.popular ? 'ring-2 ring-primary-500 transform scale-105' : ''}`}>
                    {pkg.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                          Most Popular
                        </span>
                      </div>
                    )}
                    
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-brand-text mb-2">{pkg.name}</h3>
                      <div className="text-3xl font-bold text-primary-500 mb-2">{pkg.price}</div>
                      <div className="text-brand-text-light flex items-center justify-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{pkg.duration}</span>
                      </div>
                    </div>
                    
                    <ul className="space-y-3 mb-8">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                          <span className="text-brand-text-light">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Link 
                      to="/contact"
                      className={`w-full text-center ${pkg.popular ? 'btn-primary' : 'btn-secondary'}`}
                    >
                      Choose Package
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Process */}
          <section className="section-padding bg-brand-bg-secondary">
            <div className="container-custom">
              <div className="text-center mb-16">
                <h2 className="heading-lg mb-4">My Process</h2>
                <p className="text-xl text-brand-text-light max-w-2xl mx-auto">
                  I follow a proven methodology to ensure your project is delivered on time, 
                  within budget, and exceeds your expectations.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {currentService.process.map((step, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 mx-auto">
                      {index + 1}
                    </div>
                    <h3 className="font-semibold text-brand-text mb-3">{step}</h3>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Back to Services Button */}
          <section className="py-8 border-t border-brand-border">
            <div className="container-custom">
              <button 
                onClick={() => setSelectedService(null)}
                className="btn-secondary"
              >
                ← Back to All Services
              </button>
            </div>
          </section>
        </>
      )}

      {/* Why Choose Me Section */}
      <section className="section-padding bg-gradient-brand">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="heading-lg text-white mb-6">
              Why Work With Me?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Fast Delivery</h3>
                <p className="text-green-100">Quick turnaround without compromising quality</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Quality Guarantee</h3>
                <p className="text-green-100">100% satisfaction or your money back</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Results-Focused</h3>
                <p className="text-green-100">Every project designed to achieve your goals</p>
              </div>
            </div>
            
            <Link to="/contact" className="btn-secondary bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 text-lg">
              Start Your Project
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
