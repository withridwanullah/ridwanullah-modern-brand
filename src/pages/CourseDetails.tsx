
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Calendar, Clock, Eye, User, Share2, ChevronLeft, 
  Tag, CheckCircle, PlayCircle, Download, Star, Users,
  Award, BookOpen, Video, FileText, ArrowRight
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

const CourseDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [relatedCourses, setRelatedCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'curriculum' | 'instructor'>('overview');

  useEffect(() => {
    if (id) {
      loadCourse(id);
    }
  }, [id]);

  const loadCourse = async (courseId: string) => {
    try {
      setLoading(true);
      const courseData = await sdk.get<Course>('courses');
      const currentCourse = courseData.find(c => c.id === courseId);
      
      if (currentCourse) {
        setCourse(currentCourse);
        
        // Load related courses
        const related = courseData
          .filter(c => c.id !== courseId && c.category === currentCourse.category && c.published)
          .slice(0, 3);
        setRelatedCourses(related);
      }
    } catch (error) {
      console.error('Error loading course:', error);
      // Sample data
      const sampleCourse: Course = {
        id: courseId,
        title: 'Complete React Development Bootcamp',
        description: 'Master React from beginner to advanced level with hands-on projects, real-world applications, and industry best practices. This comprehensive course will take you from zero to hero in React development.',
        price: 199,
        category: 'Web Development',
        image: '/placeholder.svg',
        instructor: 'Ridwanullah',
        published: true,
        featured: true,
        duration: 40,
        level: 'Intermediate',
        modules: [
          'React Fundamentals',
          'Components & Props',
          'State Management',
          'Hooks Deep Dive',
          'Context API',
          'React Router',
          'API Integration',
          'Testing React Apps',
          'Performance Optimization',
          'Deployment Strategies'
        ],
        prerequisites: [
          'HTML, CSS, and JavaScript basics',
          'ES6+ features understanding',
          'Basic command line knowledge'
        ],
        tags: ['React', 'JavaScript', 'Frontend', 'Web Development'],
        enrollments: 1234,
        rating: 4.8,
        created: new Date().toISOString()
      };
      setCourse(sampleCourse);
    } finally {
      setLoading(false);
    }
  };

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
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

  if (!course) {
    return (
      <div className="min-h-screen bg-brand-bg">
        <Navigation />
        <div className="pt-32 pb-16">
          <div className="container-custom text-center">
            <h1 className="text-4xl font-bold text-brand-text mb-4">Course Not Found</h1>
            <Link to="/courses" className="btn-primary">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Courses
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
        <div className="container-custom max-w-6xl mx-auto">
          <Link to="/courses" className="inline-flex items-center text-primary-600 hover:text-primary-700 mb-8 font-medium">
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Courses
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(course.level)}`}>
                  {course.level}
                </span>
                <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                  {course.category}
                </span>
                {course.featured && (
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </span>
                )}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-brand-text mb-6 leading-tight">
                {course.title}
              </h1>
              
              <p className="text-xl text-brand-text-light mb-8 leading-relaxed">
                {course.description}
              </p>
              
              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-brand-text-light" />
                  <span className="text-brand-text font-medium">{course.instructor}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-brand-text-light" />
                  <span className="text-brand-text-light">{course.duration} hours</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-brand-text-light" />
                  <span className="text-brand-text-light">{course.enrollments.toLocaleString()} students</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                  <span className="text-brand-text-light">{course.rating}/5</span>
                </div>
              </div>
              
              <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl mb-8">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="card-modern p-6 sticky top-32">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-brand-text mb-2">
                    ${course.price}
                  </div>
                  <div className="text-sm text-brand-text-light">One-time payment</div>
                </div>
                
                <button className="btn-primary w-full mb-4 text-lg py-4">
                  <PlayCircle className="w-5 h-5 mr-2" />
                  Enroll Now
                </button>
                
                <button className="btn-secondary w-full mb-6">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview Course
                </button>
                
                <div className="space-y-4 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-brand-text-light">Duration</span>
                    <span className="text-brand-text font-medium">{course.duration} hours</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-brand-text-light">Level</span>
                    <span className="text-brand-text font-medium">{course.level}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-brand-text-light">Students</span>
                    <span className="text-brand-text font-medium">{course.enrollments.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-brand-text-light">Rating</span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-brand-text font-medium">{course.rating}/5</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-brand-text-light">Access</span>
                    <span className="text-brand-text font-medium">Lifetime</span>
                  </div>
                </div>
                
                <div className="border-t pt-4 mt-6">
                  <h4 className="font-semibold text-brand-text mb-3">What's Included:</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Video className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-brand-text-light">HD Video Lectures</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-brand-text-light">Downloadable Resources</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-brand-text-light">Certificate of Completion</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-brand-text-light">Community Access</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content Tabs */}
      <section className="pb-16">
        <div className="container-custom max-w-6xl mx-auto">
          <div className="flex space-x-8 border-b border-gray-200 mb-8">
            {[
              { key: 'overview', label: 'Overview' },
              { key: 'curriculum', label: 'Curriculum' },
              { key: 'instructor', label: 'Instructor' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSelectedTab(tab.key as any)}
                className={`pb-4 font-medium transition-colors ${
                  selectedTab === tab.key
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-brand-text-light hover:text-brand-text'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {selectedTab === 'overview' && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-brand-text mb-4">Course Overview</h2>
                    <p className="text-brand-text-light leading-relaxed mb-6">
                      {course.description}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-brand-text mb-4">Prerequisites</h3>
                    <ul className="space-y-2">
                      {course.prerequisites.map((prereq, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-brand-text-light">{prereq}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold text-brand-text mb-4">What You'll Learn</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {course.modules.map((module, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-brand-text-light">{module}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {selectedTab === 'curriculum' && (
                <div>
                  <h2 className="text-2xl font-bold text-brand-text mb-6">Course Curriculum</h2>
                  <div className="space-y-4">
                    {course.modules.map((module, index) => (
                      <div key={index} className="card-modern p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-semibold">
                              {index + 1}
                            </div>
                            <div>
                              <h3 className="font-semibold text-brand-text">{module}</h3>
                              <p className="text-sm text-brand-text-light">
                                {Math.floor(Math.random() * 5) + 3} lessons • {Math.floor(Math.random() * 60) + 30} minutes
                              </p>
                            </div>
                          </div>
                          <PlayCircle className="w-5 h-5 text-primary-600" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedTab === 'instructor' && (
                <div>
                  <h2 className="text-2xl font-bold text-brand-text mb-6">About the Instructor</h2>
                  <div className="card-modern p-6">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-brand rounded-full flex items-center justify-center">
                        <span className="text-white text-xl font-bold">R</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-brand-text">{course.instructor}</h3>
                        <p className="text-brand-text-light">Full-Stack Developer & Tech Educator</p>
                      </div>
                    </div>
                    
                    <p className="text-brand-text-light leading-relaxed mb-6">
                      With over 5 years of experience in web development and a passion for teaching, 
                      Ridwanullah has helped thousands of students master modern web technologies. 
                      He specializes in React, Node.js, and cloud technologies.
                    </p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-brand-text">1.2K+</div>
                        <div className="text-sm text-brand-text-light">Students</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-brand-text">15</div>
                        <div className="text-sm text-brand-text-light">Courses</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-brand-text">4.9</div>
                        <div className="text-sm text-brand-text-light">Rating</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-brand-text">5+</div>
                        <div className="text-sm text-brand-text-light">Years</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                {/* Tags */}
                <div className="card-modern p-6">
                  <h3 className="font-bold text-brand-text mb-4">Course Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {course.tags.map((tag, index) => (
                      <Link
                        key={index}
                        to={`/courses?tag=${tag.toLowerCase()}`}
                        className="inline-flex items-center space-x-1 bg-primary-100 hover:bg-primary-200 text-primary-700 px-3 py-1 rounded-full text-sm transition-colors"
                      >
                        <Tag className="w-3 h-3" />
                        <span>{tag}</span>
                      </Link>
                    ))}
                  </div>
                </div>
                
                {/* More Actions */}
                <div className="card-modern p-6">
                  <h3 className="font-bold text-brand-text mb-4">More Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full p-3 bg-gray-50 hover:bg-primary-50 rounded-lg transition-colors text-left">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Share Course</span>
                        <Share2 className="w-4 h-4" />
                      </div>
                    </button>
                    <button className="w-full p-3 bg-gray-50 hover:bg-primary-50 rounded-lg transition-colors text-left">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Download Syllabus</span>
                        <Download className="w-4 h-4" />
                      </div>
                    </button>
                    <Link to="/contact" className="block w-full p-3 bg-gray-50 hover:bg-primary-50 rounded-lg transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Ask Questions</span>
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

      {/* Related Courses */}
      {relatedCourses.length > 0 && (
        <section className="section-padding bg-brand-bg-secondary">
          <div className="container-custom max-w-6xl mx-auto">
            <h2 className="heading-lg mb-12 text-center">Related Courses</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedCourses.map((relatedCourse) => (
                <Link
                  key={relatedCourse.id}
                  to={`/courses/${relatedCourse.id}`}
                  className="card-modern overflow-hidden group hover:scale-105 transition-all duration-300"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={relatedCourse.image}
                      alt={relatedCourse.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(relatedCourse.level)}`}>
                        {relatedCourse.level}
                      </span>
                      <div className="text-lg font-bold text-brand-text">
                        ${relatedCourse.price}
                      </div>
                    </div>
                    
                    <h3 className="font-bold text-brand-text mb-2 group-hover:text-primary-600 transition-colors">
                      {relatedCourse.title}
                    </h3>
                    
                    <div className="flex items-center justify-between text-sm text-brand-text-light">
                      <span>{relatedCourse.duration} hours</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span>{relatedCourse.rating}</span>
                      </div>
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

export default CourseDetailsPage;
