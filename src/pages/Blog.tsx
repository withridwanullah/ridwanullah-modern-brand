
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  Search, 
  Calendar, 
  Clock, 
  Tag, 
  User, 
  ArrowRight,
  TrendingUp,
  BookOpen,
  Coffee,
  Heart,
  Share2,
  Filter
} from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import sdk from '../lib/sdkConfig';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  author: string;
  published: boolean;
  featured: boolean;
  readTime: number;
  publishedDate: string;
  tags: string[];
  views?: number;
  likes?: number;
}

const Blog: React.FC = () => {
  const { postId } = useParams();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);

  const categories = [
    'All',
    'Web Development',
    'Design',
    'Digital Marketing',
    'Tech Tutorials',
    'Business Tips',
    'Industry News'
  ];

  // Sample blog data
  const samplePosts: Omit<BlogPost, 'id' | 'uid'>[] = [
    {
      title: 'The Future of Web Development: Trends to Watch in 2024',
      excerpt: 'Explore the latest trends shaping the future of web development, from AI integration to new frameworks.',
      content: `
        <h2>Introduction</h2>
        <p>The web development landscape is constantly evolving, and 2024 promises to bring exciting new trends that will shape how we build and interact with websites...</p>
        
        <h2>1. AI-Powered Development Tools</h2>
        <p>Artificial Intelligence is revolutionizing how developers write code, debug applications, and optimize performance...</p>
        
        <h2>2. Server-Side Rendering Renaissance</h2>
        <p>With frameworks like Next.js and Nuxt.js leading the charge, server-side rendering is making a strong comeback...</p>
        
        <h2>3. Web Assembly (WASM) Growth</h2>
        <p>WebAssembly is enabling high-performance applications in the browser, opening new possibilities for web development...</p>
        
        <h2>Conclusion</h2>
        <p>These trends represent just the beginning of what's possible in modern web development. Stay tuned for more exciting developments!</p>
      `,
      category: 'Web Development',
      image: '/api/placeholder/800/400',
      author: 'Ridwanullah',
      published: true,
      featured: true,
      readTime: 8,
      publishedDate: '2024-01-15',
      tags: ['web-development', 'trends', 'ai', 'performance'],
      views: 2500,
      likes: 89
    },
    {
      title: 'Mastering Modern CSS: Grid vs Flexbox in 2024',
      excerpt: 'A comprehensive guide to choosing between CSS Grid and Flexbox for your layout needs.',
      content: `
        <h2>Understanding CSS Layout Systems</h2>
        <p>Both CSS Grid and Flexbox are powerful layout systems, but knowing when to use each one is crucial...</p>
        
        <h2>When to Use Flexbox</h2>
        <p>Flexbox excels in one-dimensional layouts and component-level design patterns...</p>
        
        <h2>When to Use CSS Grid</h2>
        <p>CSS Grid is perfect for two-dimensional layouts and page-level structure...</p>
        
        <h2>Practical Examples</h2>
        <p>Let's look at real-world examples of both in action...</p>
      `,
      category: 'Web Development',
      image: '/api/placeholder/800/400',
      author: 'Ridwanullah',
      published: true,
      featured: false,
      readTime: 12,
      publishedDate: '2024-01-10',
      tags: ['css', 'layout', 'grid', 'flexbox'],
      views: 1800,
      likes: 67
    },
    {
      title: 'UI/UX Design Principles That Actually Convert',
      excerpt: 'Learn the fundamental design principles that turn visitors into customers.',
      content: `
        <h2>The Psychology of Conversion</h2>
        <p>Understanding user psychology is key to creating designs that convert...</p>
        
        <h2>Visual Hierarchy</h2>
        <p>Guide users through your content with strategic visual hierarchy...</p>
        
        <h2>Call-to-Action Optimization</h2>
        <p>Your CTA buttons can make or break your conversion rates...</p>
      `,
      category: 'Design',
      image: '/api/placeholder/800/400',
      author: 'Ridwanullah',
      published: true,
      featured: true,
      readTime: 10,
      publishedDate: '2024-01-08',
      tags: ['design', 'ux', 'conversion', 'psychology'],
      views: 3200,
      likes: 124
    },
    {
      title: 'SEO in 2024: Beyond Keywords and Backlinks',
      excerpt: 'Modern SEO strategies that focus on user experience and technical excellence.',
      content: `
        <h2>The Evolution of SEO</h2>
        <p>SEO has evolved far beyond keyword stuffing and link building...</p>
        
        <h2>Core Web Vitals</h2>
        <p>Page speed and user experience are now ranking factors...</p>
        
        <h2>Content Quality Over Quantity</h2>
        <p>Google rewards valuable, authoritative content...</p>
      `,
      category: 'Digital Marketing',
      image: '/api/placeholder/800/400',
      author: 'Ridwanullah',
      published: true,
      featured: false,
      readTime: 15,
      publishedDate: '2024-01-05',
      tags: ['seo', 'marketing', 'google', 'content'],
      views: 2100,
      likes: 78
    },
    {
      title: 'Building a Design System from Scratch',
      excerpt: 'Step-by-step guide to creating a scalable design system for your organization.',
      content: `
        <h2>What is a Design System?</h2>
        <p>A design system is a collection of reusable components and guidelines...</p>
        
        <h2>Planning Your System</h2>
        <p>Start with an audit of your existing designs and components...</p>
        
        <h2>Implementation Strategy</h2>
        <p>Roll out your design system gradually across teams...</p>
      `,
      category: 'Design',
      image: '/api/placeholder/800/400',
      author: 'Ridwanullah',
      published: true,
      featured: false,
      readTime: 18,
      publishedDate: '2024-01-03',
      tags: ['design-system', 'components', 'scalability'],
      views: 1650,
      likes: 56
    },
    {
      title: 'React Performance Optimization: Advanced Techniques',
      excerpt: 'Deep dive into advanced React optimization techniques for large-scale applications.',
      content: `
        <h2>Understanding React Performance</h2>
        <p>Performance optimization in React goes beyond simple techniques...</p>
        
        <h2>Memo and Callback Optimization</h2>
        <p>Strategic use of React.memo and useCallback can prevent unnecessary re-renders...</p>
        
        <h2>Code Splitting Strategies</h2>
        <p>Implement effective code splitting to reduce bundle sizes...</p>
      `,
      category: 'Tech Tutorials',
      image: '/api/placeholder/800/400',
      author: 'Ridwanullah',
      published: true,
      featured: false,
      readTime: 20,
      publishedDate: '2024-01-01',
      tags: ['react', 'performance', 'optimization', 'javascript'],
      views: 2800,
      likes: 95
    }
  ];

  useEffect(() => {
    loadBlogPosts();
  }, []);

  useEffect(() => {
    if (postId) {
      const post = posts.find(p => p.id === postId);
      setCurrentPost(post || null);
    }
  }, [postId, posts]);

  useEffect(() => {
    filterPosts();
  }, [posts, selectedCategory, searchTerm]);

  const loadBlogPosts = async () => {
    try {
      setLoading(true);
      
      // Try to load from SDK
      const blogData = await sdk.get<BlogPost>('blog');
      
      if (blogData.length === 0) {
        // If no data exists, create sample data
        const createdPosts = await sdk.bulkInsert('blog', samplePosts);
        setPosts(createdPosts);
      } else {
        setPosts(blogData.filter(post => post.published));
      }
    } catch (error) {
      console.error('Error loading blog posts:', error);
      // Fallback to sample data
      const fallbackData = samplePosts.map((post, index) => ({
        ...post,
        id: (index + 1).toString(),
        uid: `blog-${index + 1}`
      })) as BlogPost[];
      setPosts(fallbackData);
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

  const handleLike = async (postId: string) => {
    try {
      const post = posts.find(p => p.id === postId);
      if (post) {
        const updatedPost = await sdk.update('blog', postId, {
          likes: (post.likes || 0) + 1
        });
        
        setPosts(prev =>
          prev.map(p => p.id === postId ? { ...p, likes: updatedPost.likes } : p)
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
                  <div className="aspect-[16/10] loading-pulse"></div>
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

  // Single post view
  if (currentPost) {
    return (
      <div className="min-h-screen bg-brand-bg">
        <Navigation />
        
        <article className="pt-20">
          {/* Hero Section */}
          <section className="py-16 md:py-24 bg-gradient-to-br from-primary-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center space-x-2 text-primary-500 font-medium mb-6">
                  <Tag className="w-4 h-4" />
                  <span>{currentPost.category}</span>
                </div>
                
                <h1 className="heading-xl mb-6">
                  {currentPost.title}
                </h1>
                
                <p className="text-xl text-brand-text-light mb-8 max-w-3xl">
                  {currentPost.excerpt}
                </p>
                
                <div className="flex flex-wrap items-center gap-6 text-brand-text-light">
                  <div className="flex items-center space-x-2">
                    <User className="w-5 h-5" />
                    <span>{currentPost.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>{new Date(currentPost.publishedDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5" />
                    <span>{currentPost.readTime} min read</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleLike(currentPost.id)}
                      className="flex items-center space-x-1 text-red-500 hover:text-red-600 transition-colors"
                    >
                      <Heart className="w-5 h-5" />
                      <span>{currentPost.likes || 0}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-primary-500 hover:text-primary-600 transition-colors">
                      <Share2 className="w-5 h-5" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Featured Image */}
          <section className="py-8">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto">
                <div className="aspect-[16/9] bg-gradient-to-br from-primary-100 to-green-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-6xl opacity-30">
                    📝
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Content */}
          <section className="pb-16">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                  {/* Main Content */}
                  <div className="lg:col-span-3">
                    <div 
                      className="prose prose-lg max-w-none prose-primary"
                      dangerouslySetInnerHTML={{ __html: currentPost.content }}
                    />
                    
                    {/* Tags */}
                    <div className="mt-12 pt-8 border-t border-brand-border">
                      <h3 className="font-semibold text-brand-text mb-4">Tags</h3>
                      <div className="flex flex-wrap gap-3">
                        {currentPost.tags.map((tag, index) => (
                          <span key={index} className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Back to Blog */}
                    <div className="mt-12 pt-8 border-t border-brand-border">
                      <Link to="/blog" className="btn-secondary">
                        ← Back to Blog
                      </Link>
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="lg:col-span-1">
                    <div className="sticky top-24 space-y-8">
                      {/* Author Card */}
                      <div className="card-modern p-6">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-gradient-brand rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                            R
                          </div>
                          <h3 className="font-semibold text-brand-text mb-2">{currentPost.author}</h3>
                          <p className="text-sm text-brand-text-light mb-4">
                            Full-Stack Developer & Digital Strategist
                          </p>
                          <Link to="/about" className="btn-primary btn-sm">
                            About Me
                          </Link>
                        </div>
                      </div>

                      {/* Related Posts */}
                      <div className="card-modern p-6">
                        <h3 className="font-semibold text-brand-text mb-4">Related Posts</h3>
                        <div className="space-y-4">
                          {filteredPosts
                            .filter(post => post.id !== currentPost.id && post.category === currentPost.category)
                            .slice(0, 3)
                            .map((post, index) => (
                              <Link
                                key={index}
                                to={`/blog/${post.id}`}
                                className="block hover:text-primary-500 transition-colors"
                              >
                                <h4 className="font-medium text-sm line-clamp-2 mb-1">{post.title}</h4>
                                <div className="text-xs text-brand-text-light">
                                  {post.readTime} min read
                                </div>
                              </Link>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </article>

        <Footer />
      </div>
    );
  }

  // Blog listing view
  return (
    <div className="min-h-screen bg-brand-bg">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-primary-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="heading-xl mb-6">
              Digital Insights & Tutorials
            </h1>
            <p className="text-xl text-brand-text-light mb-12 max-w-2xl mx-auto">
              Discover the latest trends, tutorials, and insights in web development, 
              design, and digital marketing to stay ahead of the curve.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto mb-8">
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

            <div className="flex items-center justify-center space-x-6 text-sm text-brand-text-light">
              <div className="flex items-center space-x-1">
                <BookOpen className="w-4 h-4" />
                <span>{posts.length} Articles</span>
              </div>
              <div className="flex items-center space-x-1">
                <Coffee className="w-4 h-4" />
                <span>Weekly Updates</span>
              </div>
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-4 h-4" />
                <span>Latest Trends</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      {filteredPosts.some(post => post.featured) && (
        <section className="section-padding">
          <div className="container-custom">
            <h2 className="heading-lg mb-12 text-center">Featured Articles</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              {filteredPosts.filter(post => post.featured).slice(0, 2).map((post, index) => (
                <article key={post.id} className="card-modern overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
                  <div className="aspect-[16/10] relative overflow-hidden bg-gradient-to-br from-primary-100 to-green-100 dark:from-gray-800 dark:to-gray-700">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-6xl opacity-20">📝</div>
                    </div>
                    
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {post.category}
                      </span>
                    </div>
                    
                    <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => handleLike(post.id)}
                        className="w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-red-500 hover:text-red-600 transition-colors"
                      >
                        <Heart className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <div className="flex items-center space-x-4 text-sm text-brand-text-light mb-4">
                      <div className="flex items-center space-x-1">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(post.publishedDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime} min</span>
                      </div>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-brand-text mb-4 line-clamp-2">
                      <Link to={`/blog/${post.id}`} className="hover:text-primary-500 transition-colors">
                        {post.title}
                      </Link>
                    </h2>
                    
                    <p className="text-brand-text-light mb-6 line-clamp-3">{post.excerpt}</p>
                    
                    <div className="flex items-center justify-between">
                      <Link 
                        to={`/blog/${post.id}`}
                        className="inline-flex items-center text-primary-500 hover:text-primary-600 font-semibold group-hover:translate-x-1 transition-transform duration-300"
                      >
                        Read More
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                      
                      <div className="flex items-center space-x-4 text-sm text-brand-text-light">
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4" />
                          <span>{post.likes || 0}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span>{post.views || 0} views</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Posts */}
      <section className="section-padding bg-brand-bg-secondary">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-12">
            <h2 className="heading-lg">Latest Articles</h2>
            <div className="text-brand-text-light">
              Showing {filteredPosts.length} of {posts.length} articles
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <article key={post.id} className="card-modern overflow-hidden group hover:scale-105 transition-transform duration-300">
                <div className="aspect-[16/10] relative overflow-hidden bg-gradient-to-br from-primary-100 to-green-100 dark:from-gray-800 dark:to-gray-700">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-4xl opacity-20">📝</div>
                  </div>
                  
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                  
                  {post.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-medium">
                        Featured
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <div className="flex items-center space-x-3 text-xs text-brand-text-light mb-3">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(post.publishedDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime} min</span>
                    </div>
                  </div>
                  
                  <h3 className="font-bold text-brand-text mb-3 line-clamp-2">
                    <Link to={`/blog/${post.id}`} className="hover:text-primary-500 transition-colors">
                      {post.title}
                    </Link>
                  </h3>
                  
                  <p className="text-sm text-brand-text-light mb-4 line-clamp-3">{post.excerpt}</p>
                  
                  <div className="flex items-center justify-between">
                    <Link 
                      to={`/blog/${post.id}`}
                      className="text-primary-500 hover:text-primary-600 font-semibold text-sm flex items-center"
                    >
                      Read More
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Link>
                    
                    <div className="flex items-center space-x-3 text-xs text-brand-text-light">
                      <div className="flex items-center space-x-1">
                        <Heart className="w-3 h-3" />
                        <span>{post.likes || 0}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
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
              Stay Updated with Latest Insights
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Get weekly articles, tutorials, and industry insights delivered to your inbox.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-6">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <button className="btn-secondary bg-white text-primary-600 hover:bg-gray-100 whitespace-nowrap px-6">
                Subscribe
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
            
            <div className="text-green-200 text-sm">
              Join 1,000+ developers and marketers • No spam • Unsubscribe anytime
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
