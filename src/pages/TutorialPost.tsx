
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Calendar, Clock, Eye, Heart, User, Share2, Bookmark, ChevronLeft, 
  Tag, CheckCircle, PlayCircle, Download, Star, ArrowRight 
} from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { sdk } from '../lib/sdkConfig';

interface Tutorial {
  id: string;
  title: string;
  content: string;
  difficulty: string;
  category: string;
  image: string;
  excerpt: string;
  author: string;
  published: boolean;
  featured: boolean;
  tags: string[];
  duration: number;
  steps: string[];
  prerequisites: string[];
  tools: string[];
  views: number;
  likes: number;
  created: string;
}

const TutorialPostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [tutorial, setTutorial] = useState<Tutorial | null>(null);
  const [relatedTutorials, setRelatedTutorials] = useState<Tutorial[]>([]);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (id) {
      loadTutorial(id);
    }
  }, [id]);

  const loadTutorial = async (tutorialId: string) => {
    try {
      setLoading(true);
      const tutorialData = await sdk.get<Tutorial>('tutorials');
      const currentTutorial = tutorialData.find(t => t.id === tutorialId);
      
      if (currentTutorial) {
        setTutorial(currentTutorial);
        // Update view count
        await sdk.update('tutorials', tutorialId, {
          views: currentTutorial.views + 1
        });
        
        // Load related tutorials
        const related = tutorialData
          .filter(t => t.id !== tutorialId && t.category === currentTutorial.category && t.published)
          .slice(0, 3);
        setRelatedTutorials(related);
      }
    } catch (error) {
      console.error('Error loading tutorial:', error);
      // Sample data
      const sampleTutorial: Tutorial = {
        id: tutorialId,
        title: 'Complete Guide to Building a React App',
        content: `
          <h2>Introduction</h2>
          <p>In this comprehensive tutorial, you'll learn how to build a complete React application from scratch. We'll cover everything from setting up your development environment to deploying your app.</p>
          
          <h3>What You'll Learn</h3>
          <ul>
            <li>Setting up a React development environment</li>
            <li>Creating components and managing state</li>
            <li>Handling user interactions and events</li>
            <li>Working with APIs and external data</li>
            <li>Styling with CSS and CSS-in-JS</li>
            <li>Testing your React application</li>
            <li>Deploying to production</li>
          </ul>
          
          <h3>Getting Started</h3>
          <p>Before we begin, make sure you have the following installed on your machine:</p>
          <ul>
            <li>Node.js (version 14 or higher)</li>
            <li>npm or yarn package manager</li>
            <li>A code editor (VS Code recommended)</li>
          </ul>
        `,
        difficulty: 'Intermediate',
        category: 'Web Development',
        image: '/placeholder.svg',
        excerpt: 'Learn to build a complete React application from setup to deployment.',
        author: 'Ridwanullah',
        published: true,
        featured: true,
        tags: ['React', 'JavaScript', 'Frontend', 'Tutorial'],
        duration: 120,
        steps: [
          'Set up development environment',
          'Create project structure',
          'Build core components',
          'Implement state management',
          'Add styling and animations',
          'Connect to APIs',
          'Write tests',
          'Deploy application'
        ],
        prerequisites: [
          'Basic HTML, CSS, and JavaScript knowledge',
          'Familiarity with ES6+ features',
          'Understanding of npm/yarn'
        ],
        tools: [
          'React',
          'Create React App',
          'VS Code',
          'Chrome DevTools',
          'Git'
        ],
        views: 2340,
        likes: 89,
        created: new Date().toISOString()
      };
      setTutorial(sampleTutorial);
    } finally {
      setLoading(false);
    }
  };

  const handleStepComplete = (stepIndex: number) => {
    setCompletedSteps(prev => 
      prev.includes(stepIndex) 
        ? prev.filter(i => i !== stepIndex)
        : [...prev, stepIndex]
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
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
          <div className="container-custom max-w-6xl mx-auto">
            <div className="loading-pulse h-8 w-3/4 mb-4"></div>
            <div className="loading-pulse h-64 w-full mb-8"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!tutorial) {
    return (
      <div className="min-h-screen bg-brand-bg">
        <Navigation />
        <div className="pt-32 pb-16">
          <div className="container-custom text-center">
            <h1 className="text-4xl font-bold text-brand-text mb-4">Tutorial Not Found</h1>
            <Link to="/tutorials" className="btn-primary">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Tutorials
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const progressPercentage = (completedSteps.length / tutorial.steps.length) * 100;

  return (
    <div className="min-h-screen bg-brand-bg">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-8 bg-gradient-to-br from-primary-50 via-white to-green-50">
        <div className="container-custom max-w-6xl mx-auto">
          <Link to="/tutorials" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8 font-medium">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Tutorials
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(tutorial.difficulty)}`}>
                  {tutorial.difficulty}
                </span>
                <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                  {tutorial.category}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-brand-text mb-6 leading-tight">
                {tutorial.title}
              </h1>
              
              <p className="text-xl text-brand-text-light mb-8 leading-relaxed">
                {tutorial.excerpt}
              </p>
              
              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-brand-text-light" />
                  <span className="text-brand-text font-medium">{tutorial.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-brand-text-light" />
                  <span className="text-brand-text-light">{tutorial.duration} minutes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye className="w-5 h-5 text-brand-text-light" />
                  <span className="text-brand-text-light">{tutorial.views.toLocaleString()} views</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="text-brand-text-light">{tutorial.likes} likes</span>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="card-modern p-6 sticky top-32">
                <h3 className="font-bold text-brand-text mb-4">Tutorial Progress</h3>
                
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-brand-text-light mb-2">
                    <span>Progress</span>
                    <span>{Math.round(progressPercentage)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-brand h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-brand-text-light mt-2">
                    {completedSteps.length} of {tutorial.steps.length} steps completed
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  {tutorial.steps.map((step, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <button
                        onClick={() => handleStepComplete(index)}
                        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                          completedSteps.includes(index)
                            ? 'bg-green-500 border-green-500 text-white'
                            : 'border-gray-300 hover:border-green-500'
                        }`}
                      >
                        {completedSteps.includes(index) && <CheckCircle className="w-4 h-4" />}
                      </button>
                      <span className={`text-sm ${
                        completedSteps.includes(index) ? 'text-green-600 line-through' : 'text-brand-text'
                      }`}>
                        {step}
                      </span>
                    </div>
                  ))}
                </div>
                
                <button className="btn-primary w-full mb-3">
                  <PlayCircle className="w-4 h-4 mr-2" />
                  Start Tutorial
                </button>
                
                <button className="btn-secondary w-full text-sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download Resources
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-16">
        <div className="container-custom max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <div className="lg:col-span-3">
              {/* Prerequisites & Tools */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="card-modern p-6">
                  <h3 className="font-bold text-brand-text mb-4">Prerequisites</h3>
                  <ul className="space-y-2">
                    {tutorial.prerequisites.map((prereq, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-brand-text-light text-sm">{prereq}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="card-modern p-6">
                  <h3 className="font-bold text-brand-text mb-4">Tools & Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {tutorial.tools.map((tool, index) => (
                      <span 
                        key={index}
                        className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Tutorial Content */}
              <article className="prose prose-lg max-w-none mb-12">
                <div 
                  className="text-brand-text leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: tutorial.content }}
                />
              </article>
              
              {/* Tags */}
              <div className="pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-brand-text mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {tutorial.tags.map((tag, index) => (
                    <Link
                      key={index}
                      to={`/tutorials?tag=${tag.toLowerCase()}`}
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
              <div className="space-y-8">
                {/* Next Steps */}
                <div className="card-modern p-6">
                  <h3 className="font-bold text-brand-text mb-4">What's Next?</h3>
                  <div className="space-y-3">
                    <Link to="/tutorials" className="block p-3 bg-gray-50 hover:bg-primary-50 rounded-lg transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">More Tutorials</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </Link>
                    <Link to="/courses" className="block p-3 bg-gray-50 hover:bg-primary-50 rounded-lg transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Full Courses</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </Link>
                    <Link to="/contact" className="block p-3 bg-gray-50 hover:bg-primary-50 rounded-lg transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Get Help</span>
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Tutorials */}
      {relatedTutorials.length > 0 && (
        <section className="section-padding bg-brand-bg-secondary">
          <div className="container-custom max-w-6xl mx-auto">
            <h2 className="heading-lg mb-12 text-center">Related Tutorials</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedTutorials.map((relatedTutorial) => (
                <Link
                  key={relatedTutorial.id}
                  to={`/tutorials/${relatedTutorial.id}`}
                  className="card-modern overflow-hidden group hover:scale-105 transition-all duration-300"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={relatedTutorial.image}
                      alt={relatedTutorial.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center space-x-2 mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(relatedTutorial.difficulty)}`}>
                        {relatedTutorial.difficulty}
                      </span>
                      <span className="text-xs text-brand-text-light">
                        {relatedTutorial.duration} min
                      </span>
                    </div>
                    
                    <h3 className="font-bold text-brand-text mb-2 group-hover:text-primary-600 transition-colors">
                      {relatedTutorial.title}
                    </h3>
                    
                    <p className="text-brand-text-light text-sm line-clamp-2">
                      {relatedTutorial.excerpt}
                    </p>
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

export default TutorialPostPage;
