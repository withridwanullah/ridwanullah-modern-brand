
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Clock, 
  BookOpen, 
  CheckCircle, 
  User, 
  Calendar,
  Star,
  Filter,
  Search,
  Play,
  Users,
  Award
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

const Tutorials: React.FC = () => {
  const [tutorials, setTutorials] = useState<Tutorial[]>([]);
  const [filteredTutorials, setFilteredTutorials] = useState<Tutorial[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Web Development', 'Mobile Development', 'Design', 'DevOps', 'Data Science'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  useEffect(() => {
    loadTutorials();
  }, []);

  useEffect(() => {
    filterTutorials();
  }, [tutorials, selectedCategory, selectedDifficulty, searchTerm]);

  const loadTutorials = async () => {
    try {
      setLoading(true);
      const tutorialData = await sdk.get<Tutorial>('tutorials');
      const publishedTutorials = tutorialData.filter(tutorial => tutorial.published);
      setTutorials(publishedTutorials);
    } catch (error) {
      console.error('Error loading tutorials:', error);
      // Fallback sample data
      const sampleTutorials: Tutorial[] = [
        {
          id: '1',
          title: 'Build a React Todo App from Scratch',
          content: 'Complete step-by-step guide to building a todo application...',
          difficulty: 'Beginner',
          category: 'Web Development',
          image: '/placeholder.svg',
          excerpt: 'Learn React fundamentals by building a practical todo application with modern hooks.',
          author: 'Ridwanullah',
          published: true,
          featured: true,
          tags: ['React', 'JavaScript', 'Hooks'],
          duration: 45,
          steps: [
            'Setting up the project',
            'Creating components',
            'Managing state with hooks',
            'Adding functionality',
            'Styling the application'
          ],
          prerequisites: ['Basic JavaScript knowledge', 'HTML & CSS'],
          tools: ['Node.js', 'npm', 'VS Code'],
          views: 2500,
          likes: 89,
          created: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Advanced TypeScript Patterns',
          content: 'Deep dive into advanced TypeScript concepts...',
          difficulty: 'Advanced',
          category: 'Web Development',
          image: '/placeholder.svg',
          excerpt: 'Master advanced TypeScript patterns and techniques for large-scale applications.',
          author: 'Ridwanullah',
          published: true,
          featured: false,
          tags: ['TypeScript', 'Advanced', 'Patterns'],
          duration: 90,
          steps: [
            'Generic constraints',
            'Conditional types',
            'Mapped types',
            'Template literal types',
            'Advanced utility types'
          ],
          prerequisites: ['TypeScript basics', 'JavaScript ES6+'],
          tools: ['TypeScript', 'VS Code'],
          views: 1800,
          likes: 65,
          created: new Date(Date.now() - 86400000).toISOString()
        }
      ];
      setTutorials(sampleTutorials);
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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const TutorialCard = ({ tutorial }: { tutorial: Tutorial }) => (
    <article className="card-modern overflow-hidden group hover:scale-105 transition-all duration-300">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={tutorial.image}
          alt={tutorial.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(tutorial.difficulty)}`}>
            {tutorial.difficulty}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          {tutorial.featured && (
            <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-medium">
              Featured
            </span>
          )}
        </div>
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-75 text-white px-2 py-1 rounded flex items-center space-x-1">
          <Clock className="w-4 h-4" />
          <span className="text-sm">{tutorial.duration} min</span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
            {tutorial.category}
          </span>
          <div className="flex items-center space-x-2 text-sm text-brand-text-light">
            <Users className="w-4 h-4" />
            <span>{tutorial.views}</span>
          </div>
        </div>

        <h2 className="text-xl font-bold text-brand-text mb-3 group-hover:text-primary-600 transition-colors">
          {tutorial.title}
        </h2>
        
        <p className="text-brand-text-light mb-4 line-clamp-3">{tutorial.excerpt}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1">
            <User className="w-4 h-4 text-brand-text-light" />
            <span className="text-sm text-brand-text-light">{tutorial.author}</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium">{tutorial.likes}</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <BookOpen className="w-4 h-4 text-brand-text-light" />
            <span className="text-sm font-medium text-brand-text">
              {tutorial.steps.length} Steps
            </span>
          </div>
          <div className="space-y-1">
            {tutorial.steps.slice(0, 3).map((step, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm text-brand-text-light">
                <CheckCircle className="w-3 h-3 text-green-500" />
                <span className="truncate">{step}</span>
              </div>
            ))}
            {tutorial.steps.length > 3 && (
              <div className="text-xs text-brand-text-light ml-5">
                +{tutorial.steps.length - 3} more steps
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {tutorial.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
              #{tag}
            </span>
          ))}
        </div>

        <Link
          to={`/tutorials/${tutorial.id}`}
          className="btn-primary w-full flex items-center justify-center space-x-2"
        >
          <Play className="w-4 h-4" />
          <span>Start Tutorial</span>
        </Link>
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
              Learn & Master New Skills
            </h1>
            <p className="text-xl text-brand-text-light mb-12 max-w-2xl mx-auto">
              Step-by-step tutorials to help you learn programming, design, 
              and technology skills at your own pace.
            </p>
            
            {/* Search and Filters */}
            <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
              <div className="flex flex-col lg:flex-row gap-4 mb-4">
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
              
              <div className="text-sm text-brand-text-light">
                Showing {filteredTutorials.length} of {tutorials.length} tutorials
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tutorials */}
      {tutorials.some(tutorial => tutorial.featured) && (
        <section className="section-padding">
          <div className="container-custom">
            <h2 className="heading-lg mb-12 text-center">Featured Tutorials</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              {tutorials.filter(tutorial => tutorial.featured).slice(0, 2).map(tutorial => (
                <TutorialCard key={tutorial.id} tutorial={tutorial} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Tutorials */}
      <section className="section-padding bg-brand-bg-secondary">
        <div className="container-custom">
          <h2 className="heading-lg mb-12 text-center">All Tutorials</h2>
          
          {filteredTutorials.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTutorials.map(tutorial => (
                <TutorialCard key={tutorial.id} tutorial={tutorial} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📚</div>
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

      {/* Learning Path CTA */}
      <section className="section-padding bg-gradient-brand">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="heading-lg text-white mb-6">
              Ready to Start Learning?
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Follow our structured learning paths and become a master in your chosen field.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-secondary bg-white text-primary-600 hover:bg-gray-100">
                <Award className="w-5 h-5 mr-2" />
                Get Personal Mentoring
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Tutorials;
