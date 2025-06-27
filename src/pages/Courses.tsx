
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
  Play,
  Users,
  Star,
  DollarSign,
  Award,
  Filter,
  Heart,
  Share2
} from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import sdk from '../lib/sdkConfig';

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
  const { courseId } = useParams();
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null);

  const categories = [
    'All',
    'Web Development',
    'Mobile Development',
    'Data Science',
    'Machine Learning',
    'Design',
    'Business',
    'Marketing'
  ];

  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  // Sample course data
  const sampleCourses: Omit<Course, 'id'>[] = [
    {
      title: 'Complete React Developer Course',
      description: 'Master React from basics to advanced concepts. Build real-world projects and deploy them to production.',
      price: 99,
      category: 'Web Development',
      image: '/api/placeholder/800/400',
      instructor: 'Ridwanullah',
      published: true,
      featured: true,
      duration: 1200,
      level: 'Intermediate',
      modules: [
        'React Fundamentals',
        'State Management with Redux',
        'React Router',
        'Testing React Applications',
        'Performance Optimization',
        'Deployment Strategies'
      ],
      prerequisites: ['JavaScript fundamentals', 'HTML/CSS basics', 'Basic programming concepts'],
      tags: ['react', 'javascript', 'frontend', 'web-development'],
      enrollments: 2500,
      rating: 4.8,
      created: '2024-01-15'
    },
    {
      title: 'Full-Stack Development Bootcamp',
      description: 'Become a full-stack developer with this comprehensive course covering frontend, backend, and database technologies.',
      price: 199,
      category: 'Web Development',
      image: '/api/placeholder/800/400',
      instructor: 'Ridwanullah',
      published: true,
      featured: true,
      duration: 2400,
      level: 'Advanced',
      modules: [
        'Frontend with React',
        'Backend with Node.js',
        'Database Design',
        'API Development',
        'Authentication & Security',
        'DevOps & Deployment'
      ],
      prerequisites: ['Programming experience', 'Web development basics'],
      tags: ['fullstack', 'react', 'nodejs', 'mongodb'],
      enrollments: 1800,
      rating: 4.9,
      created: '2024-01-12'
    },
    {
      title: 'Data Science with Python',
      description: 'Learn data science from scratch using Python, pandas, NumPy, and machine learning libraries.',
      price: 149,
      category: 'Data Science',
      image: '/api/placeholder/800/400',
      instructor: 'Ridwanullah',
      published: true,
      featured: false,
      duration: 1800,
      level: 'Beginner',
      modules: [
        'Python for Data Science',
        'Data Analysis with pandas',
        'Data Visualization',
        'Statistical Analysis',
        'Machine Learning Basics',
        'Real-world Projects'
      ],
      prerequisites: ['Basic programming knowledge'],
      tags: ['python', 'data-science', 'pandas', 'machine-learning'],
      enrollments: 3200,
      rating: 4.7,
      created: '2024-01-10'
    }
  ];

  useEffect(() => {
    loadCourses();
  }, []);

  useEffect(() => {
    if (courseId) {
      const course = courses.find(c => c.id === courseId);
      setCurrentCourse(course || null);
    }
  }, [courseId, courses]);

  useEffect(() => {
    filterCourses();
  }, [courses, selectedCategory, selectedLevel, searchTerm]);

  const loadCourses = async () => {
    try {
      setLoading(true);
      
      const courseData = await sdk.get<Course>('courses');
      
      if (courseData.length === 0) {
        const createdCourses = await sdk.bulkInsert('courses', sampleCourses);
        setCourses(createdCourses);
      } else {
        setCourses(courseData.filter(course => course.published));
      }
    } catch (error) {
      console.error('Error loading courses:', error);
      const fallbackData = sampleCourses.map((course, index) => ({
        ...course,
        id: (index + 1).toString()
      })) as Course[];
      setCourses(fallbackData);
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

  // Single course view
  if (currentCourse) {
    return (
      <div className="min-h-screen bg-brand-bg">
        <Navigation />
        
        <div className="pt-20">
          {/* Course Hero */}
          <section className="py-16 md:py-24 bg-gradient-to-br from-primary-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
            <div className="container-custom">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center space-x-4 mb-6">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      currentCourse.level === 'Beginner' 
                        ? 'bg-green-100 text-green-800'
                        : currentCourse.level === 'Intermediate'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                    }`}>
                      {currentCourse.level}
                    </span>
                    <span className="text-primary-500 font-medium">{currentCourse.category}</span>
                  </div>
                  
                  <h1 className="heading-xl mb-6">
                    {currentCourse.title}
                  </h1>
                  
                  <p className="text-xl text-brand-text-light mb-8">
                    {currentCourse.description}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-6 mb-8">
                    <div className="flex items-center space-x-2">
                      <User className="w-5 h-5 text-brand-text-light" />
                      <span>{currentCourse.instructor}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-brand-text-light" />
                      <span>{Math.floor(currentCourse.duration / 60)} hours</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-brand-text-light" />
                      <span>{currentCourse.enrollments} students</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span>{currentCourse.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <div className="text-3xl font-bold text-primary-500">
                      ${currentCourse.price}
                    </div>
                    <button className="btn-primary flex items-center space-x-2">
                      <Play className="w-5 h-5" />
                      <span>Enroll Now</span>
                    </button>
                  </div>
                </div>
                
                <div className="aspect-video bg-gradient-to-br from-primary-100 to-green-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl flex items-center justify-center">
                  <div className="text-8xl opacity-30">🎓</div>
                </div>
              </div>
            </div>
          </section>

          {/* Course Content */}
          <section className="py-16">
            <div className="container-custom">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-12">
                  {/* What You'll Learn */}
                  <div className="card-modern p-8">
                    <h2 className="heading-md mb-6">What You'll Learn</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentCourse.modules.map((module, index) => (
                        <div key={index} className="flex items-center space-x-3">
                          <div className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            ✓
                          </div>
                          <span>{module}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Prerequisites */}
                  <div className="card-modern p-8">
                    <h2 className="heading-md mb-6">Prerequisites</h2>
                    <ul className="space-y-3">
                      {currentCourse.prerequisites.map((prereq, index) => (
                        <li key={index} className="flex items-center space-x-3">
                          <Award className="w-5 h-5 text-blue-500" />
                          <span>{prereq}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-8">
                  {/* Course Stats */}
                  <div className="card-modern p-6">
                    <h3 className="font-semibold text-brand-text mb-4">Course Statistics</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-brand-text-light">Duration</span>
                        <span className="font-medium">{Math.floor(currentCourse.duration / 60)}h</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-brand-text-light">Students</span>
                        <span className="font-medium">{currentCourse.enrollments}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-brand-text-light">Rating</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="font-medium">{currentCourse.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-brand-text-light">Level</span>
                        <span className="font-medium">{currentCourse.level}</span>
                      </div>
                    </div>
                  </div>

                  {/* Instructor */}
                  <div className="card-modern p-6">
                    <h3 className="font-semibold text-brand-text mb-4">Instructor</h3>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gradient-brand rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                        R
                      </div>
                      <h4 className="font-semibold text-brand-text mb-2">{currentCourse.instructor}</h4>
                      <p className="text-sm text-brand-text-light mb-4">
                        Full-Stack Developer & Educator
                      </p>
                      <Link to="/about" className="btn-primary btn-sm">
                        View Profile
                      </Link>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="card-modern p-6">
                    <h3 className="font-semibold text-brand-text mb-4">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {currentCourse.tags.map((tag, index) => (
                        <span key={index} className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <Footer />
      </div>
    );
  }

  // Courses listing view
  return (
    <div className="min-h-screen bg-brand-bg">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-primary-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="heading-xl mb-6">
              Professional Online Courses
            </h1>
            <p className="text-xl text-brand-text-light mb-12 max-w-2xl mx-auto">
              Advance your career with our comprehensive online courses. 
              Learn at your own pace with expert instruction and hands-on projects.
            </p>
            
            <div className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto mb-8">
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

            <div className="flex items-center justify-center space-x-6 text-sm text-brand-text-light">
              <div className="flex items-center space-x-1">
                <BookOpen className="w-4 h-4" />
                <span>{courses.length} Courses</span>
              </div>
              <div className="flex items-center space-x-1">
                <Award className="w-4 h-4" />
                <span>Certificates</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>Expert Instructors</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="section-padding">
        <div className="container-custom">
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <article key={course.id} className="card-modern overflow-hidden group hover:scale-105 transition-transform duration-300">
                  <div className="aspect-[16/10] relative overflow-hidden bg-gradient-to-br from-primary-100 to-green-100 dark:from-gray-800 dark:to-gray-700">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-6xl opacity-20">🎓</div>
                    </div>
                    
                    <div className="absolute top-4 left-4 flex space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        course.level === 'Beginner' 
                          ? 'bg-green-100 text-green-800'
                          : course.level === 'Intermediate'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {course.level}
                      </span>
                      {course.featured && (
                        <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-medium">
                          Featured
                        </span>
                      )}
                    </div>
                    
                    <div className="absolute top-4 right-4">
                      <span className="bg-white/90 text-brand-text px-2 py-1 rounded font-bold text-sm">
                        ${course.price}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center space-x-3 text-xs text-brand-text-light mb-3">
                      <span>{course.category}</span>
                      <span>•</span>
                      <span>{Math.floor(course.duration / 60)}h</span>
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span>{course.rating}</span>
                      </div>
                    </div>
                    
                    <h3 className="font-bold text-brand-text mb-3 line-clamp-2">
                      <Link to={`/courses/${course.id}`} className="hover:text-primary-500 transition-colors">
                        {course.title}
                      </Link>
                    </h3>
                    
                    <p className="text-sm text-brand-text-light mb-4 line-clamp-3">{course.description}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2 text-xs text-brand-text-light">
                        <Users className="w-3 h-3" />
                        <span>{course.enrollments} students</span>
                      </div>
                      <span className="text-brand-text-light text-xs">by {course.instructor}</span>
                    </div>
                    
                    <Link 
                      to={`/courses/${course.id}`}
                      className="btn-primary w-full flex items-center justify-center space-x-2"
                    >
                      <span>View Course</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
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

      <Footer />
    </div>
  );
};

export default Courses;
