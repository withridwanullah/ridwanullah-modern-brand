
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Clock, 
  Users, 
  Star, 
  DollarSign, 
  BookOpen, 
  Award,
  Filter,
  Search,
  Play,
  CheckCircle,
  User,
  Calendar
} from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { sdk } from '../lib/sdkConfig';

interface Course {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  instructor: string;
  published: boolean;
  featured: boolean;
  duration: number;
  level: string;
  modules: string[];
  prerequisites: string[];
  tags: string[];
  enrollments: number;
  rating: number;
  created: string;
}

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Web Development', 'Mobile Development', 'Design', 'DevOps', 'Data Science', 'Business'];
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  useEffect(() => {
    loadCourses();
  }, []);

  useEffect(() => {
    filterCourses();
  }, [courses, selectedCategory, selectedLevel, searchTerm]);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const courseData = await sdk.get<Course>('courses');
      const publishedCourses = courseData.filter(course => course.published);
      setCourses(publishedCourses);
    } catch (error) {
      console.error('Error loading courses:', error);
      // Fallback sample data
      const sampleCourses: Course[] = [
        {
          id: '1',
          title: 'Complete React Development Bootcamp',
          description: 'Master React from basics to advanced concepts with hands-on projects and real-world applications.',
          price: 199,
          category: 'Web Development',
          image: '/placeholder.svg',
          instructor: 'Ridwanullah',
          published: true,
          featured: true,
          duration: 1200,
          level: 'Beginner',
          modules: [
            'React Fundamentals',
            'State Management',
            'React Router',
            'API Integration',
            'Testing',
            'Deployment'
          ],
          prerequisites: ['Basic HTML', 'Basic CSS', 'JavaScript ES6'],
          tags: ['React', 'JavaScript', 'Frontend'],
          enrollments: 1250,
          rating: 4.8,
          created: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Full Stack JavaScript Masterclass',
          description: 'Build complete web applications using Node.js, Express, MongoDB, and React.',
          price: 299,
          category: 'Web Development',
          image: '/placeholder.svg',
          instructor: 'Ridwanullah',
          published: true,
          featured: false,
          duration: 2400,
          level: 'Intermediate',
          modules: [
            'Node.js Fundamentals',
            'Express Framework',
            'MongoDB & Mongoose',
            'Authentication',
            'React Frontend',
            'Deployment & DevOps'
          ],
          prerequisites: ['JavaScript', 'Basic React', 'HTML/CSS'],
          tags: ['Node.js', 'React', 'MongoDB', 'Full Stack'],
          enrollments: 890,
          rating: 4.9,
          created: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: '3',
          title: 'UI/UX Design Fundamentals',
          description: 'Learn the principles of user interface and user experience design with practical projects.',
          price: 149,
          category: 'Design',
          image: '/placeholder.svg',
          instructor: 'Ridwanullah',
          published: true,
          featured: true,
          duration: 800,
          level: 'Beginner',
          modules: [
            'Design Principles',
            'User Research',
            'Wireframing',
            'Prototyping',
            'Visual Design',
            'Portfolio Building'
          ],
          prerequisites: ['Basic computer skills'],
          tags: ['UI', 'UX', 'Design', 'Figma'],
          enrollments: 650,
          rating: 4.7,
          created: new Date(Date.now() - 172800000).toISOString()
        }
      ];
      setCourses(sampleCourses);
    } finally {
      setLoading(false);
    }
  };

  const filterCourses = () => {
    let filtered = courses;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(course => course.category === selectedCategory);
    }

    if (selectedLevel !== 'All') {
      filtered = filtered.filter(course => course.level === selectedLevel);
    }

    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredCourses(filtered);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
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

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${remainingMinutes}m`;
    }
    return `${remainingMinutes}m`;
  };

  const CourseCard = ({ course }: { course: Course }) => (
    <article className="card-modern overflow-hidden group hover:scale-105 transition-all duration-300">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(course.level)}`}>
            {course.level}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          {course.featured && (
            <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-medium">
              Featured
            </span>
          )}
        </div>
        <div className="absolute bottom-4 left-4 bg-black bg-opacity-75 text-white px-2 py-1 rounded flex items-center space-x-1">
          <Clock className="w-4 h-4" />
          <span className="text-sm">{formatDuration(course.duration)}</span>
        </div>
        <div className="absolute bottom-4 right-4 bg-primary-500 text-white px-3 py-1 rounded font-bold">
          ${course.price}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
            {course.category}
          </span>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="font-medium">{course.rating}</span>
            <span className="text-brand-text-light text-sm">({course.enrollments})</span>
          </div>
        </div>

        <h2 className="text-xl font-bold text-brand-text mb-3 group-hover:text-primary-600 transition-colors">
          {course.title}
        </h2>
        
        <p className="text-brand-text-light mb-4 line-clamp-3">{course.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-1">
            <User className="w-4 h-4 text-brand-text-light" />
            <span className="text-sm text-brand-text-light">{course.instructor}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-brand-text-light">
            <Users className="w-4 h-4" />
            <span>{course.enrollments} students</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <BookOpen className="w-4 h-4 text-brand-text-light" />
            <span className="text-sm font-medium text-brand-text">
              {course.modules.length} Modules
            </span>
          </div>
          <div className="space-y-1">
            {course.modules.slice(0, 3).map((module, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm text-brand-text-light">
                <CheckCircle className="w-3 h-3 text-green-500" />
                <span className="truncate">{module}</span>
              </div>
            ))}
            {course.modules.length > 3 && (
              <div className="text-xs text-brand-text-light ml-5">
                +{course.modules.length - 3} more modules
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {course.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
              #{tag}
            </span>
          ))}
        </div>

        <div className="flex gap-2">
          <Link
            to={`/courses/${course.id}`}
            className="btn-primary flex-1 flex items-center justify-center space-x-2"
          >
            <Play className="w-4 h-4" />
            <span>Enroll Now</span>
          </Link>
          <button className="btn-outline px-4">
            <BookOpen className="w-4 h-4" />
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
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="heading-xl mb-6">
              Professional Courses
            </h1>
            <p className="text-xl text-brand-text-light mb-12 max-w-2xl mx-auto">
              Comprehensive courses designed to take you from beginner to expert 
              in your chosen field with hands-on projects and certification.
            </p>
            
            {/* Search and Filters */}
            <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
              <div className="flex flex-col lg:flex-row gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-text-light w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search courses..."
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
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="input-modern appearance-none cursor-pointer"
                  >
                    {levels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="text-sm text-brand-text-light">
                Showing {filteredCourses.length} of {courses.length} courses
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      {courses.some(course => course.featured) && (
        <section className="section-padding">
          <div className="container-custom">
            <h2 className="heading-lg mb-12 text-center">Featured Courses</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
              {courses.filter(course => course.featured).map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Courses */}
      <section className="section-padding bg-brand-bg-secondary">
        <div className="container-custom">
          <h2 className="heading-lg mb-12 text-center">All Courses</h2>
          
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🎓</div>
              <h3 className="text-xl font-semibold text-brand-text mb-2">No courses found</h3>
              <p className="text-brand-text-light mb-6">
                Try adjusting your search terms or filters.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                  setSelectedLevel('All');
                }}
                className="btn-primary"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="heading-lg mb-6">Why Choose Our Courses?</h2>
            <p className="text-xl text-brand-text-light">
              Get the skills you need to advance your career with our comprehensive learning platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Certification</h3>
              <p className="text-brand-text-light">Get certified upon completion</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Community</h3>
              <p className="text-brand-text-light">Join thousands of learners</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Lifetime Access</h3>
              <p className="text-brand-text-light">Learn at your own pace</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Projects</h3>
              <p className="text-brand-text-light">Build real-world projects</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-brand">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="heading-lg text-white mb-6">
              Ready to Start Learning?
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Join thousands of students who have transformed their careers with our courses.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-secondary bg-white text-primary-600 hover:bg-gray-100">
                <DollarSign className="w-5 h-5 mr-2" />
                Get Course Bundle
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Courses;
