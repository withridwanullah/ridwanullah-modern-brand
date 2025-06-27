
import React, { useState, useEffect } from 'react';
import { Clock, Calendar, CheckCircle, Star, Users, ArrowRight } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { sdk } from '../lib/sdkConfig';

interface Consultation {
  id: string;
  title: string;
  description: string;
  duration: number;
  price: number;
  category: string;
  available: boolean;
  image: string;
  features: string[];
  bookingUrl: string;
  created: string;
}

const Consultations: React.FC = () => {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadConsultations();
  }, []);

  const loadConsultations = async () => {
    try {
      setLoading(true);
      const data = await sdk.get<Consultation>('consultations');
      const available = data.filter(c => c.available);
      setConsultations(available);
    } catch (error) {
      console.error('Error loading consultations:', error);
      // Sample data
      const sampleConsultations: Consultation[] = [
        {
          id: '1',
          title: 'Strategy Session',
          description: 'One-on-one strategy session to discuss your business goals and create an actionable plan.',
          duration: 60,
          price: 150,
          category: 'Business',
          available: true,
          image: '/placeholder.svg',
          features: ['60-minute session', 'Actionable plan', 'Follow-up notes', 'Email support'],
          bookingUrl: 'https://calendly.com/ridwan/strategy',
          created: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Technical Review',
          description: 'Comprehensive review of your technical stack and recommendations for improvement.',
          duration: 90,
          price: 200,
          category: 'Technology',
          available: true,
          image: '/placeholder.svg',
          features: ['90-minute review', 'Detailed report', 'Implementation roadmap', '2 weeks email support'],
          bookingUrl: 'https://calendly.com/ridwan/tech-review',
          created: new Date().toISOString()
        }
      ];
      setConsultations(sampleConsultations);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-bg">
        <Navigation />
        <div className="pt-32 pb-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="card-modern p-6">
                  <div className="loading-pulse h-48 w-full rounded mb-4"></div>
                  <div className="loading-pulse h-6 w-3/4 mb-2"></div>
                  <div className="loading-pulse h-4 w-full mb-4"></div>
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
              Book a Consultation
            </h1>
            <p className="text-xl text-brand-text-light mb-12 max-w-2xl mx-auto">
              Get personalized guidance and expert advice to accelerate your business growth 
              and achieve your goals faster.
            </p>
          </div>
        </div>
      </section>

      {/* Consultations Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {consultations.map(consultation => (
              <div key={consultation.id} className="card-modern overflow-hidden group hover:scale-105 transition-all duration-300">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={consultation.image}
                    alt={consultation.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                      {consultation.category}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4 text-brand-text-light" />
                      <span className="text-sm text-brand-text-light">{consultation.duration} min</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-brand-text mb-4">
                    {consultation.title}
                  </h3>
                  
                  <p className="text-brand-text-light mb-6">
                    {consultation.description}
                  </p>

                  <div className="space-y-3 mb-6">
                    {consultation.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-brand-text">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold text-brand-text">
                      ${consultation.price}
                    </div>
                    
                    <a
                      href={consultation.bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary inline-flex items-center space-x-2"
                    >
                      <Calendar className="w-5 h-5" />
                      <span>Book Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Consultation */}
      <section className="section-padding bg-brand-bg-secondary">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="heading-lg mb-12">Why Choose Professional Consultation?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-brand-text mb-2">Expert Guidance</h3>
                <p className="text-brand-text-light">Get insights from years of experience in business and technology.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-brand-text mb-2">Personalized Solutions</h3>
                <p className="text-brand-text-light">Tailored strategies that fit your unique business needs and goals.</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-brand-text mb-2">Actionable Results</h3>
                <p className="text-brand-text-light">Walk away with concrete steps and a clear path forward.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Consultations;
