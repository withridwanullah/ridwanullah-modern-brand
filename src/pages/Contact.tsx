
import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight, 
  CheckCircle,
  Clock,
  DollarSign,
  User,
  Building,
  MessageSquare,
  Calendar,
  Zap,
  Shield,
  Award
} from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import sdk from '../lib/sdkConfig';
import { toast } from 'sonner';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    type: 'contact', // 'contact' or 'order'
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    budget: '',
    timeline: '',
    message: '',
    requirements: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<'contact' | 'order'>('contact');

  const services = [
    { id: 'web-development', name: 'Website Development', price: 'From $1,299' },
    { id: 'web-design', name: 'Website Design', price: 'From $899' },
    { id: 'digital-marketing', name: 'Digital Marketing', price: 'From $799/mo' },
    { id: 'graphics-design', name: 'Graphics Design', price: 'From $399' },
    { id: 'tech-writing', name: 'Tech Writing', price: 'From $599' },
    { id: 'consultation', name: 'Consultation', price: 'From $99/hr' }
  ];

  const budgetRanges = [
    '$500 - $1,000',
    '$1,000 - $2,500',
    '$2,500 - $5,000',
    '$5,000 - $10,000',
    '$10,000+'
  ];

  const timelines = [
    'ASAP (Rush - +25% fee)',
    '1-2 weeks',
    '2-4 weeks',
    '1-2 months',
    '2+ months'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (activeTab === 'contact') {
        // Submit contact form
        await sdk.insert('contacts', {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          service: formData.service,
          message: formData.message,
          type: 'contact',
          status: 'new'
        });

        toast.success('Message sent successfully! I\'ll get back to you within 24 hours.');
      } else {
        // Submit order
        const selectedService = services.find(s => s.id === formData.service);
        await sdk.insert('orders', {
          clientName: formData.name,
          clientEmail: formData.email,
          clientPhone: formData.phone,
          clientCompany: formData.company,
          service: selectedService?.name || formData.service,
          budget: formData.budget,
          timeline: formData.timeline,
          requirements: formData.requirements,
          status: 'pending',
          totalAmount: 0 // Will be calculated based on requirements
        });

        toast.success('Order submitted successfully! I\'ll send you a detailed proposal within 24 hours.');
      }

      // Reset form
      setFormData({
        type: 'contact',
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        budget: '',
        timeline: '',
        message: '',
        requirements: ''
      });

    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Something went wrong. Please try again or email me directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 md:pt-32 md:pb-24 bg-gradient-to-br from-primary-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="heading-xl mb-6">
              Let's Work Together
            </h1>
            <p className="text-xl text-brand-text-light mb-12 max-w-2xl mx-auto">
              Ready to transform your digital presence? Get in touch for a free consultation 
              or place an order to get started immediately.
            </p>
          </div>
        </div>
      </section>

      <div className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <div className="card-modern p-8 mb-8">
                <h3 className="heading-sm mb-6">Get In Touch</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-brand-text mb-1">Email</h4>
                      <p className="text-brand-text-light">hello@ridwanullah.com</p>
                      <p className="text-sm text-brand-text-light">I typically respond within 2-4 hours</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-brand-text mb-1">Phone</h4>
                      <p className="text-brand-text-light">+234 (0) 123 456 7890</p>
                      <p className="text-sm text-brand-text-light">Available Mon-Fri, 9AM-6PM WAT</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-brand-text mb-1">Location</h4>
                      <p className="text-brand-text-light">Lagos, Nigeria</p>
                      <p className="text-sm text-brand-text-light">Working with clients worldwide</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why Choose Me */}
              <div className="card-modern p-8">
                <h3 className="heading-sm mb-6">Why Choose Me?</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0" />
                    <span className="text-brand-text-light">5+ years of experience</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0" />
                    <span className="text-brand-text-light">150+ successful projects</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0" />
                    <span className="text-brand-text-light">24/7 support & maintenance</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0" />
                    <span className="text-brand-text-light">100% satisfaction guarantee</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact/Order Form */}
            <div className="lg:col-span-2">
              <div className="card-modern overflow-hidden">
                {/* Tab Navigation */}
                <div className="flex border-b border-brand-border">
                  <button
                    onClick={() => setActiveTab('contact')}
                    className={`flex-1 py-4 px-6 font-semibold transition-colors duration-300 ${
                      activeTab === 'contact'
                        ? 'text-primary-500 border-b-2 border-primary-500 bg-primary-50'
                        : 'text-brand-text-light hover:text-brand-text'
                    }`}
                  >
                    <MessageSquare className="w-5 h-5 inline-block mr-2" />
                    General Contact
                  </button>
                  <button
                    onClick={() => setActiveTab('order')}
                    className={`flex-1 py-4 px-6 font-semibold transition-colors duration-300 ${
                      activeTab === 'order'
                        ? 'text-primary-500 border-b-2 border-primary-500 bg-primary-50'
                        : 'text-brand-text-light hover:text-brand-text'
                    }`}
                  >
                    <DollarSign className="w-5 h-5 inline-block mr-2" />
                    Place Order
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-brand-text mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-text-light w-5 h-5" />
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="input-modern pl-10"
                          placeholder="Enter your full name"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-brand-text mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-text-light w-5 h-5" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="input-modern pl-10"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-brand-text mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-text-light w-5 h-5" />
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="input-modern pl-10"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="company" className="block text-sm font-semibold text-brand-text mb-2">
                        Company/Organization
                      </label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-text-light w-5 h-5" />
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleInputChange}
                          className="input-modern pl-10"
                          placeholder="Your company name"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Service Selection */}
                  <div className="mb-6">
                    <label htmlFor="service" className="block text-sm font-semibold text-brand-text mb-2">
                      Service Interested In *
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleInputChange}
                      required
                      className="input-modern"
                    >
                      <option value="">Select a service</option>
                      {services.map(service => (
                        <option key={service.id} value={service.id}>
                          {service.name} - {service.price}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Order-specific fields */}
                  {activeTab === 'order' && (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label htmlFor="budget" className="block text-sm font-semibold text-brand-text mb-2">
                            Budget Range *
                          </label>
                          <select
                            id="budget"
                            name="budget"
                            value={formData.budget}
                            onChange={handleInputChange}
                            required
                            className="input-modern"
                          >
                            <option value="">Select budget range</option>
                            {budgetRanges.map(range => (
                              <option key={range} value={range}>
                                {range}
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="timeline" className="block text-sm font-semibold text-brand-text mb-2">
                            Timeline *
                          </label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-text-light w-5 h-5" />
                            <select
                              id="timeline"
                              name="timeline"
                              value={formData.timeline}
                              onChange={handleInputChange}
                              required
                              className="input-modern pl-10"
                            >
                              <option value="">Select timeline</option>
                              {timelines.map(timeline => (
                                <option key={timeline} value={timeline}>
                                  {timeline}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <label htmlFor="requirements" className="block text-sm font-semibold text-brand-text mb-2">
                          Project Requirements *
                        </label>
                        <textarea
                          id="requirements"
                          name="requirements"
                          value={formData.requirements}
                          onChange={handleInputChange}
                          required
                          rows={6}
                          className="textarea-modern"
                          placeholder="Please describe your project requirements in detail. Include any specific features, design preferences, target audience, competitors, and any other relevant information that will help me understand your needs better."
                        />
                      </div>
                    </>
                  )}

                  {/* Contact-specific message field */}
                  {activeTab === 'contact' && (
                    <div className="mb-6">
                      <label htmlFor="message" className="block text-sm font-semibold text-brand-text mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="textarea-modern"
                        placeholder="Tell me about your project, goals, challenges, or any questions you have. The more details you provide, the better I can assist you."
                      />
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="loading-spinner w-5 h-5 mr-2"></div>
                          {activeTab === 'contact' ? 'Sending Message...' : 'Submitting Order...'}
                        </>
                      ) : (
                        <>
                          {activeTab === 'contact' ? 'Send Message' : 'Submit Order'}
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </>
                      )}
                    </button>
                    
                    <div className="text-sm text-brand-text-light flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2 text-primary-500" />
                      {activeTab === 'contact' 
                        ? 'I\'ll respond within 24 hours' 
                        : 'You\'ll receive a proposal within 24 hours'
                      }
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <section className="section-padding bg-brand-bg-secondary">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-lg mb-4">What Happens Next?</h2>
            <p className="text-xl text-brand-text-light max-w-2xl mx-auto">
              Here's my streamlined process to get your project started quickly and efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 mx-auto">
                1
              </div>
              <h3 className="text-xl font-semibold text-brand-text mb-3">Quick Response</h3>
              <p className="text-brand-text-light">
                I'll review your {activeTab === 'contact' ? 'message' : 'order'} and respond within 24 hours 
                with {activeTab === 'contact' ? 'answers to your questions' : 'a detailed proposal'}.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 mx-auto">
                2
              </div>
              <h3 className="text-xl font-semibold text-brand-text mb-3">Free Consultation</h3>
              <p className="text-brand-text-light">
                We'll schedule a {activeTab === 'contact' ? '30-minute' : '60-minute'} consultation call 
                to discuss your project in detail and answer any questions.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4 mx-auto">
                3
              </div>
              <h3 className="text-xl font-semibold text-brand-text mb-3">Project Kickoff</h3>
              <p className="text-brand-text-light">
                Once we agree on the scope and timeline, I'll start working on your project 
                with regular updates and milestone deliveries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-brand-text mb-2">Fast Turnaround</h3>
              <p className="text-brand-text-light">
                Most projects completed within 1-4 weeks, with rush options available.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-brand-text mb-2">Money-Back Guarantee</h3>
              <p className="text-brand-text-light">
                Not satisfied? Get a full refund within 30 days, no questions asked.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold text-brand-text mb-2">Proven Results</h3>
              <p className="text-brand-text-light">
                150+ successful projects with 98% client satisfaction rate.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
