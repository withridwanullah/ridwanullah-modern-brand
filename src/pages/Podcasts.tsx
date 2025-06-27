
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Play, 
  Pause, 
  Clock, 
  Calendar, 
  User, 
  Users,
  Heart,
  Eye,
  Filter,
  Search,
  Download,
  Share2,
  Volume2
} from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { sdk } from '../lib/sdkConfig';

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
  plays: number;
  likes: number;
  created: string;
}

const Podcasts: React.FC = () => {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [filteredPodcasts, setFilteredPodcasts] = useState<Podcast[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPlaying, setCurrentPlaying] = useState<string | null>(null);
  const [audioElements, setAudioElements] = useState<{ [key: string]: HTMLAudioElement }>({});

  const categories = ['All', 'Technology', 'Business', 'Design', 'Personal Development', 'Interviews'];

  useEffect(() => {
    loadPodcasts();
  }, []);

  useEffect(() => {
    filterPodcasts();
  }, [podcasts, selectedCategory, searchTerm]);

  const loadPodcasts = async () => {
    try {
      setLoading(true);
      const podcastData = await sdk.get<Podcast>('podcasts');
      const publishedPodcasts = podcastData.filter(podcast => podcast.published);
      setPodcasts(publishedPodcasts);
    } catch (error) {
      console.error('Error loading podcasts:', error);
      // Fallback sample data
      const samplePodcasts: Podcast[] = [
        {
          id: '1',
          title: 'The Future of Web Development',
          description: 'Exploring the latest trends and technologies shaping the future of web development.',
          audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
          image: '/placeholder.svg',
          category: 'Technology',
          host: 'Ridwanullah',
          guests: ['Jane Doe', 'John Smith'],
          duration: 3600,
          published: true,
          featured: true,
          tags: ['Web Development', 'Technology', 'Future Trends'],
          transcript: 'Full transcript available...',
          season: 'Season 1',
          episode: 1,
          plays: 5200,
          likes: 145,
          created: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Building a Successful Design Career',
          description: 'Tips and strategies for building a successful career in design from industry experts.',
          audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
          image: '/placeholder.svg',
          category: 'Design',
          host: 'Ridwanullah',
          guests: ['Sarah Wilson'],
          duration: 2700,
          published: true,
          featured: false,
          tags: ['Design', 'Career', 'Success'],
          transcript: 'Full transcript available...',
          season: 'Season 1',
          episode: 2,
          plays: 3800,
          likes: 98,
          created: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: '3',
          title: 'Entrepreneurship in the Digital Age',
          description: 'How to start and grow a business in today\'s digital landscape.',
          audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
          image: '/placeholder.svg',
          category: 'Business',
          host: 'Ridwanullah',
          guests: ['Mark Johnson', 'Lisa Chen'],
          duration: 4200,
          published: true,
          featured: true,
          tags: ['Business', 'Entrepreneurship', 'Digital'],
          transcript: 'Full transcript available...',
          season: 'Season 1',
          episode: 3,
          plays: 6100,
          likes: 187,
          created: new Date(Date.now() - 172800000).toISOString()
        }
      ];
      setPodcasts(samplePodcasts);
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
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const togglePlayPause = (podcastId: string, audioUrl: string) => {
    if (!audioElements[podcastId]) {
      const audio = new Audio(audioUrl);
      setAudioElements(prev => ({ ...prev, [podcastId]: audio }));
      
      audio.play();
      setCurrentPlaying(podcastId);
      
      audio.onended = () => {
        setCurrentPlaying(null);
      };
    } else {
      const audio = audioElements[podcastId];
      
      if (currentPlaying === podcastId) {
        audio.pause();
        setCurrentPlaying(null);
      } else {
        // Pause other audio if playing
        Object.keys(audioElements).forEach(id => {
          if (id !== podcastId) {
            audioElements[id].pause();
          }
        });
        
        audio.play();
        setCurrentPlaying(podcastId);
      }
    }
  };

  const PodcastCard = ({ podcast }: { podcast: Podcast }) => (
    <article className="card-modern overflow-hidden group hover:scale-105 transition-all duration-300">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={podcast.image}
          alt={podcast.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => togglePlayPause(podcast.id, podcast.audioUrl)}
            className="w-16 h-16 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200"
          >
            {currentPlaying === podcast.id ? (
              <Pause className="w-8 h-8 text-primary-600" />
            ) : (
              <Play className="w-8 h-8 text-primary-600 ml-1" />
            )}
          </button>
        </div>
        <div className="absolute top-4 left-4">
          {podcast.featured && (
            <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-medium">
              Featured
            </span>
          )}
        </div>
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-75 text-white px-2 py-1 rounded flex items-center space-x-1">
          <Clock className="w-4 h-4" />
          <span className="text-sm">{formatDuration(podcast.duration)}</span>
        </div>
        <div className="absolute bottom-4 right-4 bg-primary-500 text-white px-2 py-1 rounded text-sm">
          EP {podcast.episode}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
            {podcast.category}
          </span>
          <span className="text-sm text-brand-text-light">{podcast.season}</span>
        </div>

        <h2 className="text-xl font-bold text-brand-text mb-3 group-hover:text-primary-600 transition-colors">
          {podcast.title}
        </h2>
        
        <p className="text-brand-text-light mb-4 line-clamp-3">{podcast.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1">
            <User className="w-4 h-4 text-brand-text-light" />
            <span className="text-sm text-brand-text-light">{podcast.host}</span>
          </div>
          
          <div className="flex items-center space-x-3 text-sm text-brand-text-light">
            <div className="flex items-center space-x-1">
              <Volume2 className="w-4 h-4" />
              <span>{podcast.plays}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="w-4 h-4" />
              <span>{podcast.likes}</span>
            </div>
          </div>
        </div>

        {podcast.guests.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <Users className="w-4 h-4 text-brand-text-light" />
              <span className="text-sm font-medium text-brand-text">Guests:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {podcast.guests.map((guest, index) => (
                <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                  {guest}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          {podcast.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1 text-sm text-brand-text-light">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(podcast.created)}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => togglePlayPause(podcast.id, podcast.audioUrl)}
            className="btn-primary flex-1 flex items-center justify-center space-x-2"
          >
            {currentPlaying === podcast.id ? (
              <>
                <Pause className="w-4 h-4" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4" />
                <span>Play</span>
              </>
            )}
          </button>
          <button className="btn-outline px-4">
            <Download className="w-4 h-4" />
          </button>
          <button className="btn-outline px-4">
            <Share2 className="w-4 h-4" />
          </button>
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
          <div className="max-width-4xl mx-auto text-center">
            <h1 className="heading-xl mb-6">
              Tech Talks & Insights
            </h1>
            <p className="text-xl text-brand-text-light mb-12 max-w-2xl mx-auto">
              Listen to expert conversations, industry insights, and inspiring stories 
              from the world of technology and innovation.
            </p>
            
            {/* Search and Filters */}
            <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
              <div className="flex flex-col lg:flex-row gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-text-light w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search podcasts..."
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
                Showing {filteredPodcasts.length} of {podcasts.length} episodes
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Podcasts */}
      {podcasts.some(podcast => podcast.featured) && (
        <section className="section-padding">
          <div className="container-custom">
            <h2 className="heading-lg mb-12 text-center">Featured Episodes</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
              {podcasts.filter(podcast => podcast.featured).map(podcast => (
                <PodcastCard key={podcast.id} podcast={podcast} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Podcasts */}
      <section className="section-padding bg-brand-bg-secondary">
        <div className="container-custom">
          <h2 className="heading-lg mb-12 text-center">All Episodes</h2>
          
          {filteredPodcasts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPodcasts.map(podcast => (
                <PodcastCard key={podcast.id} podcast={podcast} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🎙️</div>
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

      {/* Subscribe CTA */}
      <section className="section-padding bg-gradient-brand">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="heading-lg text-white mb-6">
              Never Miss an Episode
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Subscribe to get notified when new episodes are available and join our community of listeners.
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

export default Podcasts;
