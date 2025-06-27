
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Star, 
  ExternalLink,
  Heart,
  TrendingUp,
  Grid,
  List,
  Tag
} from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { sdk } from '../lib/sdkConfig';
import { defaultTools, Tool } from '../data/toolsData';

const Tools: React.FC = () => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [filteredTools, setFilteredTools] = useState<Tool[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');

  const categories = [
    'All',
    'Development',
    'Design',
    'Analytics',
    'Communication',
    'Productivity',
    'Database',
    'Payment',
    'Marketing',
    'SEO',
    'Cloud',
    'Automation',
    'AI',
    'Writing'
  ];

  useEffect(() => {
    loadTools();
  }, []);

  useEffect(() => {
    filterAndSortTools();
  }, [tools, selectedCategory, searchTerm, sortBy]);

  const loadTools = async () => {
    try {
      setLoading(true);
      
      // Try to load from SDK
      const toolsData = await sdk.get<Tool>('tools');
      
      if (toolsData.length === 0) {
        // If no data exists, create default tools
        const createdTools = await sdk.bulkInsert('tools', defaultTools);
        setTools(createdTools.filter((tool: Tool) => tool.active));
      } else {
        setTools(toolsData.filter((tool: Tool) => tool.active));
      }
    } catch (error) {
      console.error('Error loading tools:', error);
      // Fallback to default data
      const fallbackData = defaultTools.map((tool, index) => ({
        ...tool,
        id: (index + 1).toString()
      })) as Tool[];
      setTools(fallbackData.filter(tool => tool.active));
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortTools = () => {
    let filtered = tools;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(tool => tool.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(tool =>
        tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tool.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Sort tools
    switch (sortBy) {
      case 'featured':
        filtered = filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.rating - a.rating;
        });
        break;
      case 'rating':
        filtered = filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'reviews':
        filtered = filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        break;
    }

    setFilteredTools(filtered);
  };

  const ToolCard = ({ tool }: { tool: Tool }) => (
    <div className="card-modern overflow-hidden group hover:scale-105 transition-all duration-300">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="text-4xl mb-2">{tool.icon}</div>
          <div className="flex items-center space-x-2">
            {tool.featured && (
              <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-medium">
                Featured
              </span>
            )}
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              tool.price === 'Free' 
                ? 'bg-green-100 text-green-800' 
                : tool.price.includes('Free') 
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-orange-100 text-orange-800'
            }`}>
              {tool.price}
            </span>
          </div>
        </div>

        <h3 className="text-xl font-bold text-brand-text mb-2 group-hover:text-primary-500 transition-colors">
          {tool.name}
        </h3>
        
        <p className="text-brand-text-light mb-4 line-clamp-3">{tool.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="font-medium">{tool.rating}</span>
            </div>
            <span className="text-brand-text-light text-sm">({tool.reviews})</span>
          </div>
          
          <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs">
            {tool.category}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {tool.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
              #{tag}
            </span>
          ))}
        </div>

        <a
          href={tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary w-full flex items-center justify-center space-x-2"
        >
          <span>Visit Tool</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );

  const ToolListItem = ({ tool }: { tool: Tool }) => (
    <div className="card-modern p-6 hover:scale-[1.02] transition-transform duration-300">
      <div className="flex items-start space-x-6">
        <div className="text-3xl">{tool.icon}</div>
        
        <div className="flex-1">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-xl font-bold text-brand-text mb-1">{tool.name}</h3>
              <p className="text-brand-text-light">{tool.description}</p>
            </div>
            
            <div className="flex items-center space-x-2 ml-4">
              {tool.featured && (
                <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-medium">
                  Featured
                </span>
              )}
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                tool.price === 'Free' 
                  ? 'bg-green-100 text-green-800' 
                  : tool.price.includes('Free') 
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-orange-100 text-orange-800'
              }`}>
                {tool.price}
              </span>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="font-medium">{tool.rating}</span>
                <span className="text-brand-text-light text-sm">({tool.reviews})</span>
              </div>
              
              <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs">
                {tool.category}
              </span>
            </div>
            
            <a
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center space-x-2"
            >
              <span>Visit Tool</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-bg">
        <Navigation />
        <div className="pt-32 pb-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="card-modern p-6">
                  <div className="loading-pulse h-12 w-12 rounded mb-4"></div>
                  <div className="loading-pulse h-6 w-3/4 mb-2"></div>
                  <div className="loading-pulse h-4 w-full mb-4"></div>
                  <div className="loading-pulse h-10 w-full"></div>
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
              Professional Tools & Resources
            </h1>
            <p className="text-xl text-brand-text-light mb-12 max-w-2xl mx-auto">
              Discover the best tools and resources to supercharge your productivity, 
              streamline your workflow, and accelerate your projects.
            </p>
            
            {/* Search and Filters */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-8">
              <div className="flex flex-col lg:flex-row gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-text-light w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search tools..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input-modern pl-10"
                  />
                </div>
                
                <div className="flex gap-2">
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
                  
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="input-modern appearance-none cursor-pointer"
                  >
                    <option value="featured">Featured First</option>
                    <option value="rating">Highest Rated</option>
                    <option value="name">Alphabetical</option>
                    <option value="reviews">Most Reviewed</option>
                  </select>
                  
                  <div className="flex border border-brand-border rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 ${viewMode === 'grid' ? 'bg-primary-500 text-white' : 'bg-white text-brand-text hover:bg-gray-50'}`}
                    >
                      <Grid className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 ${viewMode === 'list' ? 'bg-primary-500 text-white' : 'bg-white text-brand-text hover:bg-gray-50'}`}
                    >
                      <List className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-brand-text-light">
                <span>Showing {filteredTools.length} of {tools.length} tools</span>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>Updated Weekly</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Heart className="w-4 h-4" />
                    <span>Curated by Experts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid/List */}
      <section className="section-padding">
        <div className="container-custom">
          {filteredTools.length > 0 ? (
            viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredTools.map((tool) => (
                  <ToolListItem key={tool.id} tool={tool} />
                ))}
              </div>
            )
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-brand-text mb-2">No tools found</h3>
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

      {/* Featured Categories */}
      <section className="section-padding bg-brand-bg-secondary">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="heading-lg mb-6">Explore by Category</h2>
            <p className="text-xl text-brand-text-light">
              Find the perfect tools for your specific needs and workflow.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {categories.slice(1).map((category) => {
              const categoryCount = tools.filter(tool => tool.category === category).length;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`p-4 rounded-xl text-center transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-primary-500 text-white transform scale-105'
                      : 'bg-white dark:bg-gray-800 text-brand-text hover:bg-primary-50 hover:scale-105'
                  }`}
                >
                  <div className="font-semibold text-sm mb-1">{category}</div>
                  <div className="text-xs opacity-75">{categoryCount} tools</div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-brand">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="heading-lg text-white mb-6">
              Missing a Tool?
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Have a suggestion for a tool that should be featured? 
              Let us know and we'll consider adding it to our collection.
            </p>
            
            <Link to="/contact" className="btn-secondary bg-white text-primary-600 hover:bg-gray-100">
              <Tag className="w-5 h-5 mr-2" />
              Suggest a Tool
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Tools;
