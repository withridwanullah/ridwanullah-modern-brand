
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ExternalLink, 
  Github, 
  Filter,
  Search,
  ArrowRight,
  Calendar,
  Tag,
  Eye,
  Heart,
  Star
} from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import sdk from '../lib/sdkConfig';

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  url?: string;
  github?: string;
  featured: boolean;
  completedDate: string;
  client: string;
  views?: number;
  likes?: number;
  tags: string[];
}

const Portfolio: React.FC = () => {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<PortfolioItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const categories = [
    'All',
    'Web Development',
    'Web Design',
    'Graphics Design',
    'Digital Marketing',
    'Tech Writing'
  ];

  // Sample portfolio data (replace with SDK data)
  const samplePortfolio: Omit<PortfolioItem, 'id' | 'uid'>[] = [
    {
      title: 'E-commerce Platform for Fashion Brand',
      category: 'Web Development',
      description: 'Modern e-commerce platform with advanced filtering and payment integration',
      longDescription: 'Built a comprehensive e-commerce solution featuring product catalog management, shopping cart functionality, secure payment processing, and admin dashboard. Implemented advanced search and filtering capabilities to enhance user experience.',
      image: '/api/placeholder/600/400',
      technologies: ['React', 'Next.js', 'Node.js', 'Stripe', 'MongoDB', 'Tailwind CSS'],
      url: 'https://fashionstore.example.com',
      github: 'https://github.com/ridwan/fashion-store',
      featured: true,
      completedDate: '2024-01-15',
      client: 'Fashion Forward Inc.',
      views: 1250,
      likes: 89,
      tags: ['e-commerce', 'react', 'payment-integration', 'responsive']
    },
    {
      title: 'SaaS Landing Page Design',
      category: 'Web Design',
      description: 'High-converting landing page design for a productivity SaaS application',
      longDescription: 'Designed a conversion-focused landing page that increased sign-ups by 40%. Featured modern UI elements, clear value proposition, social proof sections, and optimized call-to-action buttons.',
      image: '/api/placeholder/600/400',
      technologies: ['Figma', 'Adobe XD', 'Photoshop', 'Principle'],
      url: 'https://productivityapp.example.com',
      featured: true,
      completedDate: '2024-02-20',
      client: 'ProductivityPro',
      views: 980,
      likes: 67,
      tags: ['landing-page', 'conversion', 'saas', 'ui-design']
    },
    {
      title: 'Brand Identity for Tech Startup',
      category: 'Graphics Design',
      description: 'Complete brand identity package including logo, business cards, and guidelines',
      longDescription: 'Developed a comprehensive brand identity that reflects innovation and trustworthiness. Included logo design, color palette, typography, business collateral, and brand usage guidelines.',
      image: '/api/placeholder/600/400',
      technologies: ['Illustrator', 'Photoshop', 'InDesign', 'Figma'],
      featured: true,
      completedDate: '2024-03-10',
      client: 'TechStart Solutions',
      views: 1100,
      likes: 78,
      tags: ['branding', 'logo-design', 'identity', 'startup']
    },
    {
      title: 'SEO Campaign for Local Restaurant',
      category: 'Digital Marketing',
      description: 'Comprehensive SEO strategy that increased organic traffic by 300%',
      longDescription: 'Implemented a complete SEO overhaul including keyword research, on-page optimization, local SEO, content strategy, and link building. Results showed 300% increase in organic traffic and 150% boost in reservations.',
      image: '/api/placeholder/600/400',
      technologies: ['SEMrush', 'Google Analytics', 'Google Search Console', 'Ahrefs'],
      featured: false,
      completedDate: '2024-04-05',
      client: 'Bella Vista Restaurant',
      views: 750,
      likes: 45,
      tags: ['seo', 'local-business', 'content-marketing', 'analytics']
    },
    {
      title: 'API Documentation for Developer Platform',
      category: 'Tech Writing',
      description: 'Comprehensive API documentation with interactive examples',
      longDescription: 'Created detailed API documentation with clear explanations, code examples, and interactive playground. Improved developer adoption rate by 60% and reduced support tickets by 40%.',
      image: '/api/placeholder/600/400',
      technologies: ['GitBook', 'Postman', 'Swagger', 'Markdown'],
      featured: false,
      completedDate: '2024-04-25',
      client: 'DevTools Inc.',
      views: 650,
      likes: 38,
      tags: ['documentation', 'api', 'developer-tools', 'technical-writing']
    },
    {
      title: 'Real Estate Website Platform',
      category: 'Web Development',
      description: 'Property listing platform with advanced search and virtual tours',
      longDescription: 'Developed a comprehensive real estate platform featuring property listings, advanced search filters, virtual tour integration, agent profiles, and lead management system.',
      image: '/api/placeholder/600/400',
      technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS'],
      url: 'https://dreamhomes.example.com',
      featured: false,
      completedDate: '2024-05-12',
      client: 'Dream Homes Realty',
      views: 890,
      likes: 56,
      tags: ['real-estate', 'property', 'search', 'virtual-tours']
    }
  ];

  useEffect(() => {
    loadPortfolio();
  }, []);

  useEffect(() => {
    filterItems();
  }, [portfolioItems, selectedCategory, searchTerm]);

  const loadPortfolio = async () => {
    try {
      setLoading(true);
      
      // Try to load from SDK
      const portfolioData = await sdk.get<PortfolioItem>('portfolio');
      
      if (portfolioData.length === 0) {
        // If no data exists, create sample data
        const createdItems = await sdk.bulkInsert('portfolio', samplePortfolio);
        setPortfolioItems(createdItems);
      } else {
        setPortfolioItems(portfolioData);
      }
    } catch (error) {
      console.error('Error loading portfolio:', error);
      // Fallback to sample data
      const fallbackData = samplePortfolio.map((item, index) => ({
        ...item,
        id: (index + 1).toString(),
        uid: `portfolio-${index + 1}`
      })) as PortfolioItem[];
      setPortfolioItems(fallbackData);
    } finally {
      setLoading(false);
    }
  };

  const filterItems = () => {
    let filtered = portfolioItems;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase())) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredItems(filtered);
  };

  const handleLike = async (itemId: string) => {
    try {
      const item = portfolioItems.find(p => p.id === itemId);
      if (item) {
        const updatedItem = await sdk.update('portfolio', itemId, {
          likes: (item.likes || 0) + 1
        });
        
        setPortfolioItems(prev =>
          prev.map(p => p.id === itemId ? { ...p, likes: updatedItem.likes } : p)
        );
      }
    } catch (error) {
      console.error('Error updating likes:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-bg">
        <Navigation />
        <div className="pt-32 pb-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card-modern overflow-hidden">
                  <div className="aspect-[4/3] loading-pulse"></div>
                  <div className="p-6">
                    <div className="h-4 loading-pulse mb-2"></div>
                    <div className="h-6 loading-pulse mb-4"></div>
                    <div className="h-4 loading-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-primary-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="heading-xl mb-6">
              My Portfolio
            </h1>
            <p className="text-xl text-brand-text-light mb-12 max-w-2xl mx-auto">
              Explore my latest projects showcasing innovative solutions across web development, 
              design, marketing, and technical writing.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-text-light w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-modern pl-10"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-text-light w-5 h-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="input-modern pl-10 pr-4 appearance-none cursor-pointer"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      {filteredItems.some(item => item.featured) && (
        <section className="section-padding">
          <div className="container-custom">
            <h2 className="heading-lg mb-12 text-center">Featured Projects</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              {filteredItems.filter(item => item.featured).map((item, index) => (
                <div key={item.id} className="card-modern overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
                  <div className="aspect-[16/10] relative overflow-hidden bg-gradient-to-br from-primary-100 to-green-100 dark:from-gray-800 dark:to-gray-700">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-6xl opacity-20">
                        {item.category.includes('Design') ? '🎨' : 
                         item.category.includes('Development') ? '💻' : 
                         item.category.includes('Marketing') ? '📈' : '📝'}
                      </div>
                    </div>
                    
                    {/* Project Actions */}
                    <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => handleLike(item.id)}
                        className="w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-red-500 hover:text-red-600 transition-colors"
                      >
                        <Heart className="w-5 h-5" />
                      </button>
                      {item.url && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-brand-text hover:text-primary-500 transition-colors"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                      {item.github && (
                        <a
                          href={item.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-brand-text hover:text-primary-500 transition-colors"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-primary-500 font-medium bg-primary-50 px-3 py-1 rounded-full">
                        {item.category}
                      </span>
                      <div className="flex items-center space-x-4 text-sm text-brand-text-light">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{item.views || 0}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4" />
                          <span>{item.likes || 0}</span>
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-brand-text mb-3">{item.title}</h3>
                    <p className="text-brand-text-light mb-6">{item.longDescription}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {item.technologies.slice(0, 4).map((tech, idx) => (
                        <span key={idx} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-sm rounded-full text-brand-text-light">
                          {tech}
                        </span>
                      ))}
                      {item.technologies.length > 4 && (
                        <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-sm rounded-full text-brand-text-light">
                          +{item.technologies.length - 4} more
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-sm text-brand-text-light">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(item.completedDate).toLocaleDateString()}</span>
                      </div>
                      <div className="text-sm font-medium text-brand-text">
                        {item.client}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Projects */}
      <section className="section-padding bg-brand-bg-secondary">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-12">
            <h2 className="heading-lg">All Projects</h2>
            <div className="text-brand-text-light">
              Showing {filteredItems.length} of {portfolioItems.length} projects
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => (
              <div key={item.id} className="card-modern overflow-hidden group hover:scale-105 transition-transform duration-300">
                <div className="aspect-[4/3] relative overflow-hidden bg-gradient-to-br from-primary-100 to-green-100 dark:from-gray-800 dark:to-gray-700">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-4xl opacity-20">
                      {item.category.includes('Design') ? '🎨' : 
                       item.category.includes('Development') ? '💻' : 
                       item.category.includes('Marketing') ? '📈' : '📝'}
                    </div>
                  </div>
                  
                  {item.featured && (
                    <div className="absolute top-4 left-4">
                      <div className="flex items-center space-x-1 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-medium">
                        <Star className="w-3 h-3" />
                        <span>Featured</span>
                      </div>
                    </div>
                  )}
                  
                  <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => handleLike(item.id)}
                      className="w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-red-500 hover:text-red-600 transition-colors"
                    >
                      <Heart className="w-4 h-4" />
                    </button>
                    {item.url && (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-brand-text hover:text-primary-500 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-primary-500 font-medium bg-primary-50 px-2 py-1 rounded-full">
                      {item.category}
                    </span>
                    <div className="flex items-center space-x-3 text-xs text-brand-text-light">
                      <div className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{item.views || 0}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Heart className="w-3 h-3" />
                        <span>{item.likes || 0}</span>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-brand-text mb-2 line-clamp-2">{item.title}</h3>
                  <p className="text-sm text-brand-text-light mb-4 line-clamp-2">{item.description}</p>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {item.technologies.slice(0, 3).map((tech, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-xs rounded text-brand-text-light">
                        {tech}
                      </span>
                    ))}
                    {item.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-xs rounded text-brand-text-light">
                        +{item.technologies.length - 3}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-brand-text-light">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(item.completedDate).toLocaleDateString()}</span>
                    </div>
                    <span>{item.client}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-brand-text mb-2">No projects found</h3>
              <p className="text-brand-text-light mb-6">
                Try adjusting your search terms or category filter.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="btn-primary"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-brand">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="heading-lg text-white mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Let's work together to create something amazing that drives results for your business.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-secondary bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 text-lg">
                Get Started Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link to="/services" className="text-white hover:text-green-200 font-semibold flex items-center justify-center">
                View Services
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Portfolio;
