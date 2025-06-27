
import React, { useState, useEffect } from 'react';
import { Download, FileText, Star, Mail, CheckCircle } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { sdk } from '../lib/sdkConfig';

interface LeadMagnet {
  id: string;
  title: string;
  description: string;
  type: string;
  downloadUrl: string;
  image: string;
  fileSize: string;
  pages: number;
  category: string;
  featured: boolean;
  active: boolean;
  downloads: number;
  created: string;
}

const LeadMagnets: React.FC = () => {
  const [leadMagnets, setLeadMagnets] = useState<LeadMagnet[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [selectedMagnet, setSelectedMagnet] = useState<LeadMagnet | null>(null);
  const [showEmailForm, setShowEmailForm] = useState(false);

  useEffect(() => {
    loadLeadMagnets();
  }, []);

  const loadLeadMagnets = async () => {
    try {
      setLoading(true);
      const data = await sdk.get<LeadMagnet>('leadMagnets');
      const activeMagnets = data.filter(m => m.active);
      setLeadMagnets(activeMagnets);
    } catch (error) {
      console.error('Error loading lead magnets:', error);
      // Sample data
      const sampleMagnets: LeadMagnet[] = [
        {
          id: '1',
          title: 'The Complete Web Development Checklist',
          description: 'Everything you need to launch a professional website, from planning to deployment.',
          type: 'Checklist',
          downloadUrl: '/downloads/web-dev-checklist.pdf',
          image: '/placeholder.svg',
          fileSize: '1.2 MB',
          pages: 15,
          category: 'Development',
          featured: true,
          active: true,
          downloads: 1250,
          created: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Business Growth eBook',
          description: '50 proven strategies to scale your business and increase revenue in 2024.',
          type: 'eBook',
          downloadUrl: '/downloads/business-growth-ebook.pdf',
          image: '/placeholder.svg',
          fileSize: '3.8 MB',
          pages: 42,
          category: 'Business',
          featured: true,
          active: true,
          downloads: 890,
          created: new Date().toISOString()
        }
      ];
      setLeadMagnets(sampleMagnets);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (magnet: LeadMagnet) => {
    setSelectedMagnet(magnet);
    setShowEmailForm(true);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMagnet || !email) return;

    try {
      // Save email to contacts
      await sdk.insert('contacts', {
        name: 'Lead Magnet Subscriber',
        email,
        message: `Downloaded: ${selectedMagnet.title}`,
        service: 'Lead Magnet',
        status: 'subscribed'
      });

      // Trigger download
      window.open(selectedMagnet.downloadUrl, '_blank');
      
      // Update download count
      await sdk.update('leadMagnets', selectedMagnet.id, {
        downloads: selectedMagnet.downloads + 1
      });

      setShowEmailForm(false);
      setEmail('');
      setSelectedMagnet(null);
      
      alert('Thank you! Your download will start shortly and you\'ll receive the resource via email.');
    } catch (error) {
      console.error('Error processing download:', error);
      alert('There was an error. Please try again.');
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
              Free Resources
            </h1>
            <p className="text-xl text-brand-text-light mb-12 max-w-2xl mx-auto">
              Download valuable resources, guides, and checklists to accelerate your 
              business and development journey.
            </p>
          </div>
        </div>
      </section>

      {/* Lead Magnets Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadMagnets.map(magnet => (
              <div key={magnet.id} className="card-modern overflow-hidden group hover:scale-105 transition-all duration-300">
                <div className="aspect-video overflow-hidden relative">
                  <img
                    src={magnet.image}
                    alt={magnet.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {magnet.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        Featured
                      </span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                      FREE
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                      {magnet.type}
                    </span>
                    <div className="flex items-center space-x-1">
                      <FileText className="w-4 h-4 text-brand-text-light" />
                      <span className="text-sm text-brand-text-light">{magnet.pages} pages</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-brand-text mb-3 group-hover:text-primary-600 transition-colors">
                    {magnet.title}
                  </h3>
                  
                  <p className="text-brand-text-light mb-4 line-clamp-3">
                    {magnet.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm text-brand-text-light">
                      {magnet.fileSize} • {magnet.downloads.toLocaleString()} downloads
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm text-brand-text-light">Free</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDownload(magnet)}
                    className="btn-primary w-full inline-flex items-center justify-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Free</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Email Form Modal */}
      {showEmailForm && selectedMagnet && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <div className="text-center mb-6">
              <Mail className="w-16 h-16 text-primary-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-brand-text mb-2">
                Download "{selectedMagnet.title}"
              </h3>
              <p className="text-brand-text-light">
                Enter your email to receive this free resource
              </p>
            </div>

            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-modern w-full"
                  required
                />
              </div>

              <div className="flex items-center space-x-2 text-sm text-brand-text-light">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>We respect your privacy. No spam, ever.</span>
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowEmailForm(false);
                    setSelectedMagnet(null);
                    setEmail('');
                  }}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary flex-1"
                >
                  Download Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default LeadMagnets;
