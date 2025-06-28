
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, Eye, Heart, User, Share2, Bookmark, ChevronLeft, Tag, MessageSquare } from 'lucide-react';
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

const BlogPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    if (id) {
      loadPost(id);
    }
  }, [id]);

  const loadPost = async (postId: string) => {
    try {
      setLoading(true);
      const blogData = await sdk.get<BlogPost>('blog');
      const currentPost = blogData.find(p => p.id === postId);
      
      if (currentPost) {
        setPost(currentPost);
        // Update view count
        await sdk.update('blog', postId, {
          views: currentPost.views + 1
        });
        
        // Load related posts
        const related = blogData
          .filter(p => p.id !== postId && p.category === currentPost.category && p.published)
          .slice(0, 3);
        setRelatedPosts(related);
      }
    } catch (error) {
      console.error('Error loading blog post:', error);
      // Sample data
      const samplePost: BlogPost = {
        id: postId,
        title: 'Getting Started with React Development',
        content: `
          <h2>Introduction</h2>
          <p>React is a powerful library for building user interfaces. In this comprehensive guide, we'll explore the fundamentals of React development and build your first application from scratch.</p>
          
          <h3>What is React?</h3>
          <p>React is a JavaScript library developed by Facebook for building user interfaces, particularly web applications. It allows developers to create reusable UI components and manage the state of their applications efficiently.</p>
          
          <h3>Key Features</h3>
          <ul>
            <li><strong>Component-Based:</strong> Build encapsulated components that manage their own state</li>
            <li><strong>Virtual DOM:</strong> Efficient rendering through a virtual representation of the DOM</li>
            <li><strong>JSX:</strong> Write HTML-like syntax within JavaScript</li>
            <li><strong>Unidirectional Data Flow:</strong> Predictable data flow makes debugging easier</li>
          </ul>
          
          <h3>Getting Started</h3>
          <p>To start with React, you'll need Node.js installed on your machine. Then you can create a new React application using Create React App:</p>
          
          <pre><code>npx create-react-app my-app
cd my-app
npm start</code></pre>
          
          <h3>Your First Component</h3>
          <p>Here's a simple React component example:</p>
          
          <pre><code>function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}

function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}</code></pre>
          
          <h3>Conclusion</h3>
          <p>React provides a solid foundation for building modern web applications. With its component-based architecture and powerful ecosystem, you can create scalable and maintainable applications.</p>
        `,
        category: 'Technology',
        image: '/placeholder.svg',
        excerpt: 'Learn the fundamentals of React development and build your first application.',
        author: 'Ridwanullah',
        published: true,
        featured: true,
        tags: ['React', 'JavaScript', 'Frontend', 'Tutorial'],
        readTime: 8,
        views: 1250,
        likes: 45,
        created: new Date().toISOString()
      };
      setPost(samplePost);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!post) return;
    
    try {
      const newLikes = liked ? post.likes - 1 : post.likes + 1;
      await sdk.update('blog', post.id, { likes: newLikes });
      setPost({ ...post, likes: newLikes });
      setLiked(!liked);
    } catch (error) {
      console.error('Error updating likes:', error);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post?.title,
        text: post?.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-bg">
        <Navigation />
        <div className="pt-32 pb-16">
          <div className="container-custom max-w-4xl mx-auto">
            <div className="loading-pulse h-8 w-3/4 mb-4"></div>
            <div className="loading-pulse h-64 w-full mb-8"></div>
            <div className="space-y-4">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="loading-pulse h-4 w-full"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-brand-bg">
        <Navigation />
        <div className="pt-32 pb-16">
          <div className="container-custom text-center">
            <h1 className="text-4xl font-bold text-brand-text mb-4">Post Not Found</h1>
            <p className="text-brand-text-light mb-8">The blog post you're looking for doesn't exist.</p>
            <Link to="/blog" className="btn-primary">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-bg">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-8 bg-gradient-to-br from-primary-50 via-white to-green-50">
        <div className="container-custom max-w-4xl mx-auto">
          <Link to="/blog" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8 font-medium">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
          
          <div className="mb-6">
            <span className="bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-medium mb-4 inline-block">
              {post.category}
            </span>
            
            <h1 className="text-4xl md:text-5xl font-bold text-brand-text mb-6 leading-tight">
              {post.title}
            </h1>
            
            <p className="text-xl text-brand-text-light mb-8 leading-relaxed">
              {post.excerpt}
            </p>
            
            <div className="flex flex-wrap items-center gap-6 mb-6">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-brand-text-light" />
                <span className="text-brand-text font-medium">{post.author}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-brand-text-light" />
                <span className="text-brand-text-light">{formatDate(post.created)}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-brand-text-light" />
                <span className="text-brand-text-light">{post.readTime} min read</span>
              </div>
              <div className="flex items-center space-x-2">
                <Eye className="w-5 h-5 text-brand-text-light" />
                <span className="text-brand-text-light">{post.views.toLocaleString()} views</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={handleLike}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-colors ${
                  liked 
                    ? 'bg-red-50 border-red-200 text-red-600' 
                    : 'bg-white border-gray-200 text-brand-text-light hover:border-red-200 hover:text-red-600'
                }`}
              >
                <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
                <span>{post.likes}</span>
              </button>
              
              <button
                onClick={handleShare}
                className="flex items-center space-x-2 px-4 py-2 rounded-full border border-gray-200 text-brand-text-light hover:border-primary-200 hover:text-primary-600 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
              
              <button
                onClick={() => setBookmarked(!bookmarked)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-colors ${
                  bookmarked 
                    ? 'bg-primary-50 border-primary-200 text-primary-600' 
                    : 'bg-white border-gray-200 text-brand-text-light hover:border-primary-200 hover:text-primary-600'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
                <span>Save</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="py-8">
        <div className="container-custom max-w-4xl mx-auto">
          <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-16">
        <div className="container-custom max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <div className="lg:col-span-3">
              <article className="prose prose-lg max-w-none">
                <div 
                  className="text-brand-text leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              </article>
              
              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-brand-text mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <Link
                      key={index}
                      to={`/blog?tag=${tag.toLowerCase()}`}
                      className="inline-flex items-center space-x-1 bg-gray-100 hover:bg-primary-100 text-brand-text-light hover:text-primary-600 px-3 py-1 rounded-full text-sm transition-colors"
                    >
                      <Tag className="w-3 h-3" />
                      <span>{tag}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 space-y-8">
                {/* Author Bio */}
                <div className="card-modern p-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-brand rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white text-xl font-bold">R</span>
                    </div>
                    <h3 className="font-semibold text-brand-text mb-2">{post.author}</h3>
                    <p className="text-sm text-brand-text-light mb-4">
                      Full-stack developer and tech writer passionate about creating amazing digital experiences.
                    </p>
                    <Link to="/about" className="btn-primary btn-sm w-full">
                      View Profile
                    </Link>
                  </div>
                </div>
                
                {/* Newsletter */}
                <div className="card-modern p-6 bg-gradient-brand text-white">
                  <h3 className="font-bold mb-2">Stay Updated</h3>
                  <p className="text-green-100 text-sm mb-4">
                    Get the latest articles delivered to your inbox.
                  </p>
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="Your email"
                      className="w-full px-3 py-2 rounded-lg text-brand-text"
                    />
                    <button className="btn-secondary bg-white text-primary-600 hover:bg-gray-100 w-full">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="section-padding bg-brand-bg-secondary">
          <div className="container-custom max-w-6xl mx-auto">
            <h2 className="heading-lg mb-12 text-center">Related Articles</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.id}`}
                  className="card-modern overflow-hidden group hover:scale-105 transition-all duration-300"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="p-6">
                    <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium mb-3 inline-block">
                      {relatedPost.category}
                    </span>
                    
                    <h3 className="font-bold text-brand-text mb-2 group-hover:text-primary-600 transition-colors">
                      {relatedPost.title}
                    </h3>
                    
                    <p className="text-brand-text-light text-sm mb-4 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-brand-text-light">
                      <span>{formatDate(relatedPost.created)}</span>
                      <span>{relatedPost.readTime} min read</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default BlogPostPage;
