
import React, { useState, useEffect } from 'react';
import { Download, FileText, Star, Tag, Search, Filter } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { sdk } from '../lib/sdkConfig';

interface Toolkit {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
  downloadUrl: string;
  fileSize: string;
  fileType: string;
  includes: string[];
  tags: string[];
  featured: boolean;
  active: boolean;
  created: string;
}

const Toolkits: React.FC = () => {
  const [toolkits, setToolkits] = useState<Toolkit[]>([]);
  const [filteredToolkits, setFilteredToolkits] = useState<Toolkit[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Business', 'Design', 'Development', 'Marketing', 'Productivity'];

  useEffect(() => {
    loadToolkits();
  }, []);

  useEffect(() => {
    filterToolkits();
  }, [toolkits, selectedCategory, searchTerm]);

  const loadToolkits = async () => {
    try {
      setLoading(true);
      const data = await sdk.get<Toolkit>('toolkits');
      const activeToolkits = data.filter(t => t.active);
      setToolkits(activeToolkits);
    } catch (error) {
      console.error('Error loading toolkits:', error);
      // Sample data
      const sampleToolkits: Toolkit[] = [
        {
          id: '1',
          name: 'Business Plan Template Kit',
          description: 'Complete business plan templates with financial projections and market analysis worksheets.',
          category: 'Business',
          price: 29,
          image: '/placeholder.svg',
          downloadUrl: '/downloads/business-plan-kit.zip',
          fileSize: '2.5 MB',
          fileType: 'ZIP',
          includes: ['Business Plan Template', 'Financial Projections', 'Market Analysis Worksheet', 'Pitch Deck Template'],
          tags: ['business', 'planning', 'templates'],
          featured: true,
          active: true,
          created: new Date().toISOString()
        },
        {
          id: '2',
          name: 'Brand Identity Toolkit',
          description: 'Everything you need to create a professional brand identity including logos, color palettes, and style guides.',
          category: 'Design',
          price: 49,
          image: '/placeholder.svg',
          downloadUrl: '/downloads/brand-identity-kit.zip',
          fileSize: '15 MB',
          fileType: 'ZIP',
          includes: ['Logo Templates', 'Color Palette Generator', 'Brand Guidelines Template', 'Social Media Templates'],
          tags: ['branding', 'design', 'identity'],
          featured: true,
          active: true,
          created: new Date().toISOString()
        }
      ];
      setToolkits(sampleToolkits);
    } finally {
      setLoading(false);
    }
  };

  const filterToolkits = () => {
    let filtered = toolkits;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(toolkit => toolkit.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(toolkit =>
        toolkit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        toolkit.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        toolkit.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredToolkits(filtered);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-bg">
        <Navigation />
        <div className="pt-32 pb-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card-modern p-6">
                  <div className="loading-pulse h-48 w-full rounded mb-4"></div>
                  <div className="loading-pulse h-6 w-3/4 mb-2"></div>
                  <div className="loading-pulse h-4 w-full mb-4"></div>
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
      <section className="pt-20 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-primary-50 via-white to-green-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="heading-xl mb-6">
              Professional Toolkits
            </h1>
            <p className="text-xl text-brand-text-light mb-12 max-w-2xl mx-auto">
              Ready-to-use templates, resources, and tools to accelerate your business 
              and creative projects.
            </p>
            
            {/* Search and Filters */}
            <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
              <div className="flex flex-col lg:flex-row gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-text-light w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search toolkits..."
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
              
              <div className="text-sm text-brand-text-light">
                Showing {filteredToolkits.length} of {toolkits.length} toolkits
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Toolkits Grid */}
      <section className="section-padding">
        <div className="container-custom">
          {filteredToolkits.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredToolkits.map(toolkit => (
                <div key={toolkit.id} className="card-modern overflow-hidden group hover:scale-105 transition-all duration-300">
                  <div className="aspect-video overflow-hidden relative">
                    <img
                      src={toolkit.image}
                      alt={toolkit.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {toolkit.featured && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                          Featured
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                        {toolkit.category}
                      </span>
                      <div className="flex items-center space-x-1">
                        <FileText className="w-4 h-4 text-brand-text-light" />
                        <span className="text-sm text-brand-text-light">{toolkit.fileSize}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-brand-text mb-3 group-hover:text-primary-600 transition-colors">
                      {toolkit.name}
                    </h3>
                    
                    <p className="text-brand-text-light mb-4 line-clamp-3">
                      {toolkit.description}
                    </p>

                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-brand-text mb-2">Includes:</h4>
                      <ul className="space-y-1">
                        {toolkit.includes.slice(0, 3).map((item, index) => (
                          <li key={index} className="text-sm text-brand-text-light flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
                            <span>{item}</span>
                          </li>
                        ))}
                        {toolkit.includes.length > 3 && (
                          <li className="text-sm text-brand-text-light">
                            +{toolkit.includes.length - 3} more items
                          </li>
                        )}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {toolkit.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold text-brand-text">
                        ${toolkit.price}
                      </div>
                      
                      <a
                        href={toolkit.downloadUrl}
                        download
                        className="btn-primary inline-flex items-center space-x-2"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-xl font-semibold text-brand-text mb-2">No toolkits found</h3>
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

      <Footer />
    </div>
  );
};

export default Toolkits;
