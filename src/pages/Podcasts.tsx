
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { 
  Search, 
  Calendar, 
  Clock, 
  Tag, 
  User, 
  ArrowRight,
  Play,
  Pause,
  Share2,
  Download,
  Heart,
  Filter,
  Mic,
  Users,
  Volume2
} from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import sdk from '../lib/sdkConfig';

interface Podcast {
  id: string;
  title: string;
  description: string;
  audioUrl: string;
  image: string;
  category: string;
  host: string;
  guests: string[];
  duration: number;
  published: boolean;
  featured: boolean;
  tags: string[];
  transcript: string;
  season: string;
  episode: number;
  created: string;
  plays?: number;
  likes?: number;
}

const Podcasts: React.FC = () => {
  const { podcastId } = useParams();
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [filteredPodcasts, setFilteredPodcasts] = useState<Podcast[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPodcast, setCurrentPodcast] = useState<Podcast | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const categories = [
    'All',
    'Technology',
    'Business',
    'Education',
    'Career',
    'Entrepreneurship',
    'Design',
    'Marketing'
  ];

  // Sample podcast data
  const samplePodcasts: Omit<Podcast, 'id'>[] = [
    {
      title: 'The Future of Web Development',
      description: 'Join us as we explore the latest trends and technologies shaping the future of web development.',
      audioUrl: '/api/placeholder/audio/episode1.mp3',
      image: '/api/placeholder/800/800',
      category: 'Technology',
      host: 'Ridwanullah',
      guests: ['Sarah Johnson', 'Mike Chen'],
      duration: 2850,
      published: true,
      featured: true,
      tags: ['web-development', 'javascript', 'react', 'future-tech'],
      transcript: 'Welcome to the Tech Talk podcast. Today we\'re discussing...',
      season: 'Season 1',
      episode: 1,
      created: '2024-01-15',
      plays: 5200,
      likes: 187
    },
    {
      title: 'Building a Successful Tech Startup',
      description: 'Learn from successful entrepreneurs about building and scaling tech startups.',
      audioUrl: '/api/placeholder/audio/episode2.mp3',
      image: '/api/placeholder/800/800',
      category: 'Entrepreneurship',
      host: 'Ridwanullah',
      guests: ['Alex Rodriguez', 'Emma Thompson'],
      duration: 3200,
      published: true,
      featured: true,
      tags: ['startup', 'entrepreneurship', 'business', 'technology'],
      transcript: 'In this episode, we dive deep into the world of tech startups...',
      season: 'Season 1',
      episode: 2,
      created: '2024-01-12',
      plays: 4800,
      likes: 165
    },
    {
      title: 'Design Systems and User Experience',
      description: 'A deep dive into design systems, user experience principles, and creating consistent digital products.',
      audioUrl: '/api/placeholder/audio/episode3.mp3',
      image: '/api/placeholder/800/800',
      category: 'Design',
      host: 'Ridwanullah',
      guests: ['Lisa Wang', 'David Park'],
      duration: 2650,
      published: true,
      featured: false,
      tags: ['design', 'ux', 'design-systems', 'user-interface'],
      transcript: 'Design systems have become essential for modern product development...',
      season: 'Season 1',
      episode: 3,
      created: '2024-01-10',
      plays: 3600,
      likes: 142
    }
  ];

  useEffect(() => {
    loadPodcasts();
  }, []);

  useEffect(() => {
    if (podcastId) {
      const podcast = podcasts.find(p => p.id === podcastId);
      setCurrentPodcast(podcast || null);
    }
  }, [podcastId, podcasts]);

  useEffect(() => {
    filterPodcasts();
  }, [podcasts, selectedCategory, searchTerm]);

  const loadPodcasts = async () => {
    try {
      setLoading(true);
      
      const podcastData = await sdk.get<Podcast>('podcasts');
      
      if (podcastData.length === 0) {
        const createdPodcasts = await sdk.bulkInsert('podcasts', samplePodcasts);
        setPodcasts(createdPodcasts);
      } else {
        setPodcasts(podcastData.filter(podcast => podcast.published));
      }
    } catch (error) {
      console.error('Error loading podcasts:', error);
      const fallbackData = samplePodcasts.map((podcast, index) => ({
        ...podcast,
        id: (index + 1).toString()
      })) as Podcast[];
      setPodcasts(fallbackData);
    } finally {
      setLoading(false);
    }
  };

  const filterPodcasts = () => {
    let filtered = podcasts;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(podcast => podcast.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(podcast =>
        podcast.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        podcast.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        podcast.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredPodcasts(filtered);
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  const handleLike = async (podcastId: string) => {
    try {
      const podcast = podcasts.find(p => p.id === podcastId);
      if (podcast) {
        const updatedPodcast = await sdk.update('podcasts', podcastId, {
          likes: (podcast.likes || 0) + 1
        });
        
        setPodcasts(prev =>
          prev.map(p => p.id === podcastId ? { ...p, likes: updatedPodcast.likes } : p)
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
                  <div className="aspect-square loading-pulse"></div>
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

  // Single podcast view
  if (currentPodcast) {
    return (
      <div className="min-h-screen bg-brand-bg">
        <Navigation />
        
        <div className="pt-20">
          {/* Podcast Hero */}
          <section className="py-16 md:py-24 bg-gradient-to-br from-primary-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
            <div className="container-custom">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center space-x-4 mb-6">
                    <span className="text-primary-500 font-medium">{currentPodcast.category}</span>
                    <span className="text-brand-text-light">•</span>
                    <span className="text-brand-text-light">{currentPodcast.season}</span>
                    <span className="text-brand-text-light">•</span>
                    <span className="text-brand-text-light">Episode {currentPodcast.episode}</span>
                  </div>
                  
                  <h1 className="heading-xl mb-6">
                    {currentPodcast.title}
                  </h1>
                  
                  <p className="text-xl text-brand-text-light mb-8">
                    {currentPodcast.description}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-6 mb-8">
                    <div className="flex items-center space-x-2">
                      <User className="w-5 h-5 text-brand-text-light" />
                      <span>Hosted by {currentPodcast.host}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-brand-text-light" />
                      <span>{formatDuration(currentPodcast.duration)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Volume2 className="w-5 h-5 text-brand-text-light" />
                      <span>{currentPodcast.plays || 0} plays</span>
                    </div>
                  </div>

                  {/* Guests */}
                  {currentPodcast.guests.length > 0 && (
                    <div className="mb-8">
                      <h3 className="font-semibold text-brand-text mb-3">Featured Guests</h3>
                      <div className="flex flex-wrap gap-3">
                        {currentPodcast.guests.map((guest, index) => (
                          <span key={index} className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm">
                            {guest}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Audio Player */}
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-8">
                    <div className="flex items-center space-x-4 mb-4">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
                      >
                        {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                      </button>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between text-sm text-brand-text-light mb-2">
                          <span>{Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')}</span>
                          <span>{formatDuration(currentPodcast.duration)}</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(currentTime / currentPodcast.duration) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => handleLike(currentPodcast.id)}
                          className="flex items-center space-x-1 text-red-500 hover:text-red-600 transition-colors"
                        >
                          <Heart className="w-5 h-5" />
                          <span>{currentPodcast.likes || 0}</span>
                        </button>
                        <button className="flex items-center space-x-1 text-primary-500 hover:text-primary-600 transition-colors">
                          <Share2 className="w-5 h-5" />
                          <span>Share</span>
                        </button>
                        <button className="flex items-center space-x-1 text-brand-text-light hover:text-brand-text transition-colors">
                          <Download className="w-5 h-5" />
                          <span>Download</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="aspect-square bg-gradient-to-br from-primary-100 to-green-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl flex items-center justify-center">
                  <div className="text-8xl opacity-30">🎙️</div>
                </div>
              </div>
            </div>
          </section>

          {/* Transcript */}
          <section className="py-16">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto">
                <h2 className="heading-md mb-8">Episode Transcript</h2>
                <div className="card-modern p-8">
                  <p className="text-brand-text-light leading-relaxed">
                    {currentPodcast.transcript}
                  </p>
                </div>
                
                {/* Tags */}
                <div className="mt-12 pt-8 border-t border-brand-border">
                  <h3 className="font-semibold text-brand-text mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-3">
                    {currentPodcast.tags.map((tag, index) => (
                      <span key={index} className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Back to Podcasts */}
                <div className="mt-12 pt-8 border-t border-brand-border">
                  <Link to="/podcasts" className="btn-secondary">
                    ← Back to Podcasts
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>

        <Footer />
      </div>
    );
  }

  // Podcasts listing view
  return (
    <div className="min-h-screen bg-brand-bg">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-primary-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="heading-xl mb-6">
              Tech Talk Podcast
            </h1>
            <p className="text-xl text-brand-text-light mb-12 max-w-2xl mx-auto">
              Join the conversation about technology, business, and innovation. 
              Weekly episodes featuring industry experts and thought leaders.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-text-light w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search episodes..."
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
                <Mic className="w-4 h-4" />
                <span>{podcasts.length} Episodes</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>Expert Guests</span>
              </div>
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Weekly</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Podcasts Grid */}
      <section className="section-padding">
        <div className="container-custom">
          {filteredPodcasts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPodcasts.map((podcast) => (
                <article key={podcast.id} className="card-modern overflow-hidden group hover:scale-105 transition-transform duration-300">
                  <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-primary-100 to-green-100 dark:from-gray-800 dark:to-gray-700">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-6xl opacity-20">🎙️</div>
                    </div>
                    
                    <div className="absolute top-4 left-4 flex space-x-2">
                      <span className="bg-primary-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Episode {podcast.episode}
                      </span>
                      {podcast.featured && (
                        <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-medium">
                          Featured
                        </span>
                      )}
                    </div>
                    
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-white/90 text-brand-text px-2 py-1 rounded text-xs font-medium">
                        {formatDuration(podcast.duration)}
                      </span>
                    </div>

                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <button className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors">
                        <Play className="w-8 h-8 ml-1" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center space-x-3 text-xs text-brand-text-light mb-3">
                      <span>{podcast.category}</span>
                      <span>•</span>
                      <span>{podcast.season}</span>
                      <span>•</span>
                      <span>{new Date(podcast.created).toLocaleDateString()}</span>
                    </div>
                    
                    <h3 className="font-bold text-brand-text mb-3 line-clamp-2">
                      <Link to={`/podcasts/${podcast.id}`} className="hover:text-primary-500 transition-colors">
                        {podcast.title}
                      </Link>
                    </h3>
                    
                    <p className="text-sm text-brand-text-light mb-4 line-clamp-3">{podcast.description}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-xs text-brand-text-light">
                        Hosted by {podcast.host}
                      </div>
                      <div className="flex items-center space-x-3 text-xs text-brand-text-light">
                        <div className="flex items-center space-x-1">
                          <Volume2 className="w-3 h-3" />
                          <span>{podcast.plays || 0}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Heart className="w-3 h-3" />
                          <span>{podcast.likes || 0}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Link 
                      to={`/podcasts/${podcast.id}`}
                      className="btn-primary w-full flex items-center justify-center space-x-2"
                    >
                      <Play className="w-4 h-4" />
                      <span>Listen Now</span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-brand-text mb-2">No episodes found</h3>
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

export default Podcasts;
