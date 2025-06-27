
import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowRight, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Services: [
      { name: 'Website Design', href: '/services/web-design' },
      { name: 'Web Development', href: '/services/web-development' },
      { name: 'Digital Marketing', href: '/services/digital-marketing' },
      { name: 'Graphics Design', href: '/services/graphics-design' },
      { name: 'Tech Writing', href: '/services/tech-writing' }
    ],
    Resources: [
      { name: 'Blog', href: '/blog' },
      { name: 'Portfolio', href: '/portfolio' },
      { name: 'Free Tools', href: '/tools' },
      { name: 'Tutorials', href: '/tutorials' },
      { name: 'Courses', href: '/courses' }
    ],
    Company: [
      { name: 'About', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' }
    ]
  };

  const socialLinks = [
    { name: 'Twitter', href: '#', icon: '𝕏' },
    { name: 'LinkedIn', href: '#', icon: 'in' },
    { name: 'GitHub', href: '#', icon: 'gh' },
    { name: 'Instagram', href: '#', icon: 'ig' }
  ];

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-brand-border">
      {/* Newsletter Section */}
      <div className="bg-gradient-brand">
        <div className="container-custom py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="heading-md text-white mb-4">
              Stay Updated with Latest Insights
            </h3>
            <p className="text-green-100 mb-8">
              Get weekly tips on design, development, and digital marketing delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="btn-secondary bg-white text-primary-600 hover:bg-gray-100 whitespace-nowrap">
                Subscribe
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-brand rounded-xl flex items-center justify-center font-bold text-white text-xl">
                R
              </div>
              <div>
                <div className="font-display font-bold text-xl text-brand-text">
                  Ridwanullah
                </div>
                <div className="text-sm text-brand-text-light">
                  Professional Brand Platform
                </div>
              </div>
            </div>
            
            <p className="text-brand-text-light mb-6 max-w-md">
              Transforming ideas into exceptional digital experiences through innovative web design, 
              development, and strategic digital marketing solutions.
            </p>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-brand-text-light">
                <Mail className="w-5 h-5 text-primary-500" />
                <span>hello@ridwanullah.com</span>
              </div>
              <div className="flex items-center space-x-3 text-brand-text-light">
                <Phone className="w-5 h-5 text-primary-500" />
                <span>+234 (0) 123 456 7890</span>
              </div>
              <div className="flex items-center space-x-3 text-brand-text-light">
                <MapPin className="w-5 h-5 text-primary-500" />
                <span>Lagos, Nigeria</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-brand-text mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-brand-text-light hover:text-primary-500 transition-colors duration-300"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-brand-border bg-brand-bg-secondary">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-1 text-brand-text-light">
              <span>© {currentYear} Ridwanullah. Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>in Nigeria</span>
            </div>

            <div className="flex items-center space-x-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center text-brand-text hover:bg-primary-500 hover:text-white transition-all duration-300 font-bold text-sm"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-primary-500 hover:bg-primary-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-40"
        aria-label="Scroll to top"
      >
        <ArrowRight className="w-5 h-5 transform -rotate-90" />
      </button>
    </footer>
  );
};

export default Footer;
