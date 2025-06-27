
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Eye, Heart, User, Tag, Search, Filter } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { sdk } from '../lib/sdkConfig';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  category: string;
  image: string;
  excerpt: string;
  author: string;
  published: boolean;
  featured: boolean;
  tags: string[];
  readTime: number;
  views: number;
  likes: number;
  created: string;
}

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Technology', 'Design', 'Business', 'Tutorial', 'Personal'];

  useEffect(() => {
    loadPosts();
  }, []);

  useEffect(() => {
    filterPosts();
  }, [posts, selectedCategory, searchTerm]);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const blogData = await sdk.get<BlogPost>('blog');
      const publishedPosts = blogData.filter(post => post.published);
      setPosts(publishedPosts);
    } catch (error) {
      console.error('Error loading blog posts:', error);
      // Fallback sample data
      const samplePosts: BlogPost[] = [
        {
          id: '1',
          title: 'Getting Started with React Development',
          content: 'React is a powerful library for building user interfaces...',
          category: 'Technology',
          image: '/placeholder.svg',
          excerpt: 'Learn the fundamentals of React development and build your first application.',
          author: 'Ridwanullah',
          published: true,
          featured: true,
          tags: ['React', 'JavaScript', 'Frontend'],
          readTime: 8,
          views: 1250,
          likes: 45,
          created: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Modern Web Design Principles',
          content: 'Creating beautiful and functional web designs...',
          category: 'Design',
          image: '/placeholder.svg',
          excerpt: 'Explore the latest trends and principles in modern web design.',
          author: 'Ridwanullah',
          published: true,
          featured: false,
          tags: ['Design', 'UI/UX', 'Web'],
          readTime: 6,
          views: 890,
          likes: 32,
          created: new Date(Date.now() - 86400000).toISOString()
        }
      ];
      setPosts(samplePosts);
    } finally {
      setLoading(false);
    }
  };

  const filterPosts = () => {
    let filtered = posts;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(post => post.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredPosts(filtered);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const BlogCard = ({ post }: { post: BlogPost }) => (
    <article className="card-modern overflow-hidden group hover:scale-105 transition-all duration-300">
      <div className="aspect-video overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
            {post.category}
          </span>
          {post.featured && (
            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
              Featured
            </span>
          )}
        </div>

        <h2 className="text-xl font-bold text-brand-text mb-3 group-hover:text-primary-600 transition-colors">
          {post.title}
        </h2>
        
        <p className="text-brand-text-light mb-4 line-clamp-3">{post.excerpt}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-brand-text-light">
            <div className="flex items-center space-x-1">
              <User className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>{post.readTime} min read</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 text-sm text-brand-text-light">
            <div className="flex items-center space-x-1">
              <Eye className="w-4 h-4" />
              <span>{post.views}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="w-4 h-4" />
              <span>{post.likes}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-sm text-brand-text-light">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(post.created)}</span>
          </div>
          
          <Link
            to={`/blog/${post.id}`}
            className="btn-primary text-sm px-4 py-2"
          >
            Read More
          </Link>
        </div>
      </div>
    </article>
  );

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
      <section className="pt-20 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-primary-50 via-white to-green-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="heading-xl mb-6">
              Insights & Stories
            </h1>
            <p className="text-xl text-brand-text-light mb-12 max-w-2xl mx-auto">
              Discover the latest insights, tutorials, and stories from the world of technology, 
              design, and innovation.
            </p>
            
            {/* Search and Filters */}
            <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
              <div className="flex flex-col lg:flex-row gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-text-light w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search articles..."
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
                Showing {filteredPosts.length} of {posts.length} articles
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {posts.some(post => post.featured) && (
        <section className="section-padding">
          <div className="container-custom">
            <h2 className="heading-lg mb-12 text-center">Featured Articles</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              {posts.filter(post => post.featured).slice(0, 2).map(post => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="section-padding bg-brand-bg-secondary">
        <div className="container-custom">
          <h2 className="heading-lg mb-12 text-center">Latest Articles</h2>
          
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map(post => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-brand-text mb-2">No articles found</h3>
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

      {/* Newsletter CTA */}
      <section className="section-padding bg-gradient-brand">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="heading-lg text-white mb-6">
              Stay Updated
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Get the latest articles and insights delivered straight to your inbox.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="input-modern flex-1"
              />
              <button className="btn-secondary bg-white text-primary-600 hover:bg-gray-100">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
