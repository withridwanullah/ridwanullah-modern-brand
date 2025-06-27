
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  Search, 
  Calendar, 
  Clock, 
  Tag, 
  User, 
  ArrowRight,
  BookOpen,
  Code,
  Heart,
  Share2,
  Filter,
  Play,
  CheckCircle,
  Star,
  Users
} from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import sdk from '../lib/sdkConfig';

interface Tutorial {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  difficulty: string;
  category: string;
  image: string;
  author: string;
  published: boolean;
  featured: boolean;
  duration: number;
  publishedDate: string;
  tags: string[];
  steps: string[];
  prerequisites: string[];
  tools: string[];
  views?: number;
  likes?: number;
}

const Tutorials: React.FC = () => {
  const { tutorialId } = useParams();
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [filteredTutorials, setFilteredTutorials] = useState<Tutorial[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentTutorial, setCurrentTutorial] = useState<Tutorial | null>(null);

  const categories = [
    'All',
    'Web Development',
    'Mobile Development',
    'Data Science',
    'Machine Learning',
    'Design',
    'DevOps',
    'Database',
    'Security'
  ];

  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  // Sample tutorial data
  const sampleTutorials: Omit<Tutorial, 'id'>[] = [
    {
      title: 'Building a React Dashboard from Scratch',
      excerpt: 'Learn how to create a modern, responsive dashboard using React, TypeScript, and Tailwind CSS.',
      content: `
        <h2>Introduction</h2>
        <p>In this comprehensive tutorial, we'll build a fully functional React dashboard...</p>
        
        <h2>Setting Up the Project</h2>
        <p>First, let's create a new React project with TypeScript support...</p>
        
        <h2>Creating the Layout</h2>
        <p>We'll start by creating a responsive layout using Tailwind CSS...</p>
      `,
      difficulty: 'Intermediate',
      category: 'Web Development',
      image: '/api/placeholder/800/400',
      author: 'Ridwanullah',
      published: true,
      featured: true,
      duration: 45,
      publishedDate: '2024-01-15',
      tags: ['react', 'typescript', 'tailwind', 'dashboard'],
      steps: [
        'Set up React project with TypeScript',
        'Install and configure Tailwind CSS',
        'Create responsive layout components',
        'Implement data visualization',
        'Add interactive features',
        'Deploy to production'
      ],
      prerequisites: ['Basic React knowledge', 'JavaScript fundamentals', 'CSS basics'],
      tools: ['Node.js', 'npm/yarn', 'VS Code', 'Git'],
      views: 3500,
      likes: 125
    },
    {
      title: 'Complete Guide to Node.js Authentication',
      excerpt: 'Implement secure user authentication in Node.js using JWT, bcrypt, and MongoDB.',
      content: `
        <h2>Understanding Authentication</h2>
        <p>Authentication is a crucial part of web applications...</p>
        
        <h2>Setting Up the Backend</h2>
        <p>Let's start by creating our Node.js server...</p>
      `,
      difficulty: 'Advanced',
      category: 'Web Development',
      image: '/api/placeholder/800/400',
      author: 'Ridwanullah',
      published: true,
      featured: true,
      duration: 60,
      publishedDate: '2024-01-12',
      tags: ['nodejs', 'authentication', 'jwt', 'mongodb'],
      steps: [
        'Set up Node.js server',
        'Configure MongoDB connection',
        'Implement user registration',
        'Add login functionality',
        'Secure routes with JWT',
        'Handle password reset'
      ],
      prerequisites: ['Node.js basics', 'Express.js knowledge', 'Database concepts'],
      tools: ['Node.js', 'Express.js', 'MongoDB', 'Postman'],
      views: 2800,
      likes: 98
    },
    {
      title: 'Machine Learning with Python: First Steps',
      excerpt: 'Get started with machine learning using Python, scikit-learn, and pandas.',
      content: `
        <h2>What is Machine Learning?</h2>
        <p>Machine learning is a subset of artificial intelligence...</p>
        
        <h2>Setting Up Your Environment</h2>
        <p>We'll use Python with several libraries...</p>
      `,
      difficulty: 'Beginner',
      category: 'Machine Learning',
      image: '/api/placeholder/800/400',
      author: 'Ridwanullah',
      published: true,
      featured: false,
      duration: 35,
      publishedDate: '2024-01-10',
      tags: ['python', 'machine-learning', 'scikit-learn', 'pandas'],
      steps: [
        'Install Python and libraries',
        'Load and explore data',
        'Prepare data for training',
        'Train your first model',
        'Evaluate model performance',
        'Make predictions'
      ],
      prerequisites: ['Basic Python knowledge', 'High school math'],
      tools: ['Python', 'Jupyter Notebook', 'pandas', 'scikit-learn'],
      views: 4200,
      likes: 156
    }
  ];

  useEffect(() => {
    loadTutorials();
  }, []);

  useEffect(() => {
    if (tutorialId) {
      const tutorial = tutorials.find(t => t.id === tutorialId);
      setCurrentTutorial(tutorial || null);
    }
  }, [tutorialId, tutorials]);

  useEffect(() => {
    filterTutorials();
  }, [tutorials, selectedCategory, selectedDifficulty, searchTerm]);

  const loadTutorials = async () => {
    try {
      setLoading(true);
      
      const tutorialData = await sdk.get<Tutorial>('tutorials');
      
      if (tutorialData.length === 0) {
        const createdTutorials = await sdk.bulkInsert('tutorials', sampleTutorials);
        setTutorials(createdTutorials);
      } else {
        setTutorials(tutorialData.filter(tutorial => tutorial.published));
      }
    } catch (error) {
      console.error('Error loading tutorials:', error);
      const fallbackData = sampleTutorials.map((tutorial, index) => ({
        ...tutorial,
        id: (index + 1).toString()
      })) as Tutorial[];
      setTutorials(fallbackData);
    } finally {
      setLoading(false);
    }
  };

  const filterTutorials = () => {
    let filtered = tutorials;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(tutorial => tutorial.category === selectedCategory);
    }

    if (selectedDifficulty !== 'All') {
      filtered = filtered.filter(tutorial => tutorial.difficulty === selectedDifficulty);
    }

    if (searchTerm) {
      filtered = filtered.filter(tutorial =>
        tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tutorial.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tutorial.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredTutorials(filtered);
  };

  const handleLike = async (tutorialId: string) => {
    try {
      const tutorial = tutorials.find(t => t.id === tutorialId);
      if (tutorial) {
        const updatedTutorial = await sdk.update('tutorials', tutorialId, {
          likes: (tutorial.likes || 0) + 1
        });
        
        setTutorials(prev =>
          prev.map(t => t.id === tutorialId ? { ...t, likes: updatedTutorial.likes } : t)
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

  // Single tutorial view
  if (currentTutorial) {
    return (
      <div className="min-h-screen bg-brand-bg">
        <Navigation />
        
        <article className="pt-20">
          {/* Hero Section */}
          <section className="py-16 md:py-24 bg-gradient-to-br from-primary-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center space-x-4 mb-6">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    currentTutorial.difficulty === 'Beginner' 
                      ? 'bg-green-100 text-green-800'
                      : currentTutorial.difficulty === 'Intermediate'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                  }`}>
                    {currentTutorial.difficulty}
                  </span>
                  <span className="text-primary-500 font-medium">{currentTutorial.category}</span>
                </div>
                
                <h1 className="heading-xl mb-6">
                  {currentTutorial.title}
                </h1>
                
                <p className="text-xl text-brand-text-light mb-8 max-w-3xl">
                  {currentTutorial.excerpt}
                </p>
                
                <div className="flex flex-wrap items-center gap-6 text-brand-text-light mb-8">
                  <div className="flex items-center space-x-2">
                    <User className="w-5 h-5" />
                    <span>{currentTutorial.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>{new Date(currentTutorial.publishedDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5" />
                    <span>{currentTutorial.duration} min tutorial</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleLike(currentTutorial.id)}
                      className="flex items-center space-x-1 text-red-500 hover:text-red-600 transition-colors"
                    >
                      <Heart className="w-5 h-5" />
                      <span>{currentTutorial.likes || 0}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-primary-500 hover:text-primary-600 transition-colors">
                      <Share2 className="w-5 h-5" />
                      <span>Share</span>
                    </button>
                  </div>
                </div>

                {/* Tutorial Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="card-modern p-4">
                    <h3 className="font-semibold text-brand-text mb-2">Prerequisites</h3>
                    <ul className="text-sm text-brand-text-light space-y-1">
                      {currentTutorial.prerequisites.map((prereq, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span>{prereq}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="card-modern p-4">
                    <h3 className="font-semibold text-brand-text mb-2">Tools Needed</h3>
                    <ul className="text-sm text-brand-text-light space-y-1">
                      {currentTutorial.tools.map((tool, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <Code className="w-4 h-4 text-blue-500" />
                          <span>{tool}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="card-modern p-4">
                    <h3 className="font-semibold text-brand-text mb-2">What You'll Learn</h3>
                    <div className="text-sm text-brand-text-light">
                      <div className="flex items-center space-x-2 mb-2">
                        <Play className="w-4 h-4 text-primary-500" />
                        <span>{currentTutorial.steps.length} steps</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-purple-500" />
                        <span>{currentTutorial.views || 0} learners</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Steps Overview */}
          <section className="py-8 bg-brand-bg-secondary">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto">
                <h2 className="heading-md mb-6">Tutorial Steps</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentTutorial.steps.map((step, index) => (
                    <div key={index} className="flex items-center space-x-3 p-4 bg-white dark:bg-gray-800 rounded-lg">
                      <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <span className="text-brand-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Content */}
          <section className="pb-16">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto">
                <div 
                  className="prose prose-lg max-w-none prose-primary"
                  dangerouslySetInnerHTML={{ __html: currentTutorial.content }}
                />
                
                {/* Tags */}
                <div className="mt-12 pt-8 border-t border-brand-border">
                  <h3 className="font-semibold text-brand-text mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-3">
                    {currentTutorial.tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Back to Tutorials */}
                <div className="mt-12 pt-8 border-t border-brand-border">
                  <Link to="/tutorials" className="btn-secondary">
                    ← Back to Tutorials
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </article>

        <Footer />
      </div>
    );
  }

  // Tutorials listing view
  return (
    <div className="min-h-screen bg-brand-bg">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-primary-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="heading-xl mb-6">
              Step-by-Step Tutorials
            </h1>
            <p className="text-xl text-brand-text-light mb-12 max-w-2xl mx-auto">
              Master new skills with our comprehensive, hands-on tutorials. 
              From beginner to advanced, we've got you covered.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-text-light w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search tutorials..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-modern pl-10"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="input-modern appearance-none cursor-pointer"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="input-modern appearance-none cursor-pointer"
                >
                  {difficulties.map(difficulty => (
                    <option key={difficulty} value={difficulty}>{difficulty}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-6 text-sm text-brand-text-light">
              <div className="flex items-center space-x-1">
                <BookOpen className="w-4 h-4" />
                <span>{tutorials.length} Tutorials</span>
              </div>
              <div className="flex items-center space-x-1">
                <Play className="w-4 h-4" />
                <span>Step-by-Step</span>
              </div>
              <div className="flex items-center space-x-1">
                <Code className="w-4 h-4" />
                <span>Hands-On</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tutorials Grid */}
      <section className="section-padding">
        <div className="container-custom">
          {filteredTutorials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTutorials.map((tutorial) => (
                <article key={tutorial.id} className="card-modern overflow-hidden group hover:scale-105 transition-transform duration-300">
                  <div className="aspect-[16/10] relative overflow-hidden bg-gradient-to-br from-primary-100 to-green-100 dark:from-gray-800 dark:to-gray-700">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-6xl opacity-20">📚</div>
                    </div>
                    
                    <div className="absolute top-4 left-4 flex space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        tutorial.difficulty === 'Beginner' 
                          ? 'bg-green-100 text-green-800'
                          : tutorial.difficulty === 'Intermediate'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {tutorial.difficulty}
                      </span>
                      {tutorial.featured && (
                        <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-medium">
                          Featured
                        </span>
                      )}
                    </div>
                    
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-white/90 text-brand-text px-2 py-1 rounded text-xs font-medium">
                        {tutorial.duration} min
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center space-x-3 text-xs text-brand-text-light mb-3">
                      <span>{tutorial.category}</span>
                      <span>•</span>
                      <span>{tutorial.steps.length} steps</span>
                      <span>•</span>
                      <span>{new Date(tutorial.publishedDate).toLocaleDateString()}</span>
                    </div>
                    
                    <h3 className="font-bold text-brand-text mb-3 line-clamp-2">
                      <Link to={`/tutorials/${tutorial.id}`} className="hover:text-primary-500 transition-colors">
                        {tutorial.title}
                      </Link>
                    </h3>
                    
                    <p className="text-sm text-brand-text-light mb-4 line-clamp-3">{tutorial.excerpt}</p>
                    
                    <div className="flex items-center justify-between">
                      <Link 
                        to={`/tutorials/${tutorial.id}`}
                        className="text-primary-500 hover:text-primary-600 font-semibold text-sm flex items-center"
                      >
                        Start Tutorial
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Link>
                      
                      <div className="flex items-center space-x-3 text-xs text-brand-text-light">
                        <div className="flex items-center space-x-1">
                          <Heart className="w-3 h-3" />
                          <span>{tutorial.likes || 0}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Users className="w-3 h-3" />
                          <span>{tutorial.views || 0}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-brand-text mb-2">No tutorials found</h3>
              <p className="text-brand-text-light mb-6">
                Try adjusting your search terms or filters.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                  setSelectedDifficulty('All');
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

export default Tutorials;
