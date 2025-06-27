
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Code, 
  Palette, 
  TrendingUp, 
  PenTool,
  Award,
  Users,
  Clock,
  Star,
  Download,
  CheckCircle,
  Target,
  Heart,
  Zap
} from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const About: React.FC = () => {
  const skills = [
    {
      category: 'Frontend Development',
      technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vue.js', 'Angular'],
      level: 95
    },
    {
      category: 'Backend Development',
      technologies: ['Node.js', 'Python', 'PHP', 'MongoDB', 'PostgreSQL', 'Express.js'],
      level: 90
    },
    {
      category: 'Design & UI/UX',
      technologies: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'Sketch', 'InVision'],
      level: 88
    },
    {
      category: 'Digital Marketing',
      technologies: ['SEO', 'Google Ads', 'Facebook Ads', 'Analytics', 'Content Marketing'],
      level: 85
    }
  ];

  const experience = [
    {
      year: '2024',
      title: 'Senior Full-Stack Developer & Digital Strategist',
      company: 'Freelance',
      description: 'Providing comprehensive digital solutions to businesses worldwide, specializing in modern web applications and conversion-focused marketing strategies.',
      achievements: [
        'Completed 50+ projects with 98% client satisfaction',
        'Increased client revenue by an average of 40%',
        'Built 20+ e-commerce platforms generating $2M+ in sales'
      ]
    },
    {
      year: '2022-2024',
      title: 'Lead Frontend Developer',
      company: 'TechStart Solutions',
      description: 'Led a team of 5 developers in creating scalable web applications for startups and established businesses.',
      achievements: [
        'Reduced application load times by 60%',
        'Implemented design systems used across 15+ projects',
        'Mentored 10+ junior developers'
      ]
    },
    {
      year: '2020-2022',
      title: 'Full-Stack Developer',
      company: 'Digital Innovations Ltd',
      description: 'Developed custom web applications and digital marketing solutions for SMEs across various industries.',
      achievements: [
        'Built 30+ responsive websites',
        'Improved client SEO rankings by 200%',
        'Launched 5 successful SaaS platforms'
      ]
    },
    {
      year: '2019-2020',
      title: 'Frontend Developer',
      company: 'WebCraft Agency',
      description: 'Created modern, responsive websites and implemented conversion optimization strategies.',
      achievements: [
        'Increased client conversion rates by 35%',
        'Developed reusable component library',
        'Optimized site performance across 25+ projects'
      ]
    }
  ];

  const values = [
    {
      icon: Target,
      title: 'Results-Driven',
      description: 'Every project is measured by its impact on your business goals and bottom line.'
    },
    {
      icon: Heart,
      title: 'Client-Focused',
      description: 'Your success is my success. I\'m committed to delivering beyond expectations.'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Staying ahead of trends and using cutting-edge technologies for competitive advantage.'
    },
    {
      icon: CheckCircle,
      title: 'Quality',
      description: 'No compromises on quality. Every detail matters in creating exceptional experiences.'
    }
  ];

  const stats = [
    { icon: Award, label: 'Projects Completed', value: '150+' },
    { icon: Users, label: 'Happy Clients', value: '100+' },
    { icon: Clock, label: 'Years Experience', value: '5+' },
    { icon: Star, label: 'Client Satisfaction', value: '98%' }
  ];

  const certifications = [
    'Google Analytics Certified',
    'Google Ads Certified',
    'Facebook Blueprint Certified',
    'AWS Cloud Practitioner',
    'React Advanced Certification',
    'UI/UX Design Certification'
  ];

  return (
    <div className="min-h-screen bg-brand-bg">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-primary-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="heading-xl mb-6">
                Hi, I'm Ridwanullah
              </h1>
              <div className="text-2xl text-primary-500 font-semibold mb-6">
                Full-Stack Developer & Digital Strategist
              </div>
              <p className="text-xl text-brand-text-light mb-8 leading-relaxed">
                With over 5 years of experience, I help businesses transform their digital presence 
                through innovative web solutions, strategic marketing, and compelling design that drives real results.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link to="/contact" className="btn-primary">
                  Work With Me
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
                <Link to="/portfolio" className="btn-secondary">
                  View My Work
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center p-4 bg-white/50 backdrop-blur-sm border border-white/20 rounded-xl">
                    <stat.icon className="w-6 h-6 text-primary-500 mx-auto mb-2" />
                    <div className="text-xl font-bold text-brand-text">{stat.value}</div>
                    <div className="text-sm text-brand-text-light">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square bg-gradient-brand rounded-3xl p-8 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">What I Do</h3>
                    <ul className="space-y-3">
                      <li className="flex items-center space-x-3">
                        <Code className="w-5 h-5" />
                        <span>Web Development</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <Palette className="w-5 h-5" />
                        <span>UI/UX Design</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <TrendingUp className="w-5 h-5" />
                        <span>Digital Marketing</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <PenTool className="w-5 h-5" />
                        <span>Graphics Design</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-white/20 rounded-2xl p-4">
                    <div className="text-sm mb-2">Available for projects</div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <span>Currently accepting new clients</span>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center text-2xl animate-float">
                  👋
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* My Story */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="heading-lg mb-4">My Story</h2>
              <p className="text-xl text-brand-text-light">
                From curious beginner to trusted digital partner
              </p>
            </div>
            
            <div className="prose prose-lg max-w-none text-brand-text-light">
              <p className="text-xl leading-relaxed mb-8">
                My journey in the digital world began over 5 years ago with a simple curiosity about how websites work. 
                What started as a hobby quickly became a passion, and eventually, my life's work.
              </p>
              
              <p className="text-lg leading-relaxed mb-8">
                I've had the privilege of working with startups that became industry leaders, small businesses that grew into 
                regional powerhouses, and established companies that needed to modernize their digital presence. Each project 
                has taught me something new and reinforced my belief that great digital solutions can truly transform businesses.
              </p>
              
              <p className="text-lg leading-relaxed mb-8">
                Today, I focus on creating comprehensive digital strategies that combine beautiful design, robust development, 
                and smart marketing to deliver measurable results. I don't just build websites or run campaigns – I build 
                digital assets that grow with your business and drive real ROI.
              </p>
              
              <p className="text-lg leading-relaxed">
                When I'm not coding or strategizing, you'll find me exploring new technologies, contributing to open-source 
                projects, or sharing knowledge through my blog and tutorials. I believe in continuous learning and giving back 
                to the community that has given me so much.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="section-padding bg-brand-bg-secondary">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">Professional Experience</h2>
            <p className="text-xl text-brand-text-light">
              A timeline of growth, learning, and impact
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary-200"></div>
              
              <div className="space-y-12">
                {experience.map((exp, index) => (
                  <div key={index} className="relative flex items-start space-x-8">
                    {/* Timeline Dot */}
                    <div className="flex-shrink-0 w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center text-white font-bold border-4 border-brand-bg z-10">
                      {exp.year.split('-')[0]}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 card-modern p-8">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-brand-text mb-1">{exp.title}</h3>
                          <div className="text-primary-500 font-semibold">{exp.company}</div>
                        </div>
                        <div className="text-sm text-brand-text-light bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full mt-2 md:mt-0">
                          {exp.year}
                        </div>
                      </div>
                      
                      <p className="text-brand-text-light mb-6">{exp.description}</p>
                      
                      <div>
                        <h4 className="font-semibold text-brand-text mb-3">Key Achievements:</h4>
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, idx) => (
                            <li key={idx} className="flex items-start space-x-3">
                              <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                              <span className="text-brand-text-light">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills & Expertise */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">Skills & Expertise</h2>
            <p className="text-xl text-brand-text-light">
              Technologies and tools I use to bring your vision to life
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {skills.map((skill, index) => (
              <div key={index} className="card-modern p-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <h3 className="text-xl font-bold text-brand-text mb-2 md:mb-0">{skill.category}</h3>
                  <div className="text-2xl font-bold text-primary-500">{skill.level}%</div>
                </div>
                
                <div className="mb-6">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-primary-500 to-primary-400 h-3 rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-3">
                  {skill.technologies.map((tech, idx) => (
                    <span key={idx} className="px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values & Philosophy */}
      <section className="section-padding bg-brand-bg-secondary">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">My Values & Philosophy</h2>
            <p className="text-xl text-brand-text-light">
              The principles that guide every project and client relationship
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {values.map((value, index) => (
              <div key={index} className="card-modern p-8 text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-primary-500" />
                </div>
                <h3 className="text-xl font-bold text-brand-text mb-4">{value.title}</h3>
                <p className="text-brand-text-light">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">Certifications & Credentials</h2>
            <p className="text-xl text-brand-text-light">
              Continuous learning and professional development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {certifications.map((cert, index) => (
              <div key={index} className="card-modern p-6 text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-400 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-brand-text">{cert}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-brand">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="heading-lg text-white mb-6">
              Ready to Work Together?
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Let's discuss your project and see how my expertise can help you achieve your digital goals.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link to="/contact" className="btn-secondary bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 text-lg">
                Start a Project
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link to="/portfolio" className="text-white hover:text-green-200 font-semibold flex items-center">
                View My Portfolio
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
            
            <div className="text-green-200 text-sm">
              Free consultation • No commitment required • Response within 24 hours
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
