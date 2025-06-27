
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { sdk } from '@/lib/sdkConfig';
import { Users, Settings, User } from 'lucide-react';

export const SettingsManager = () => {
  const [activeSection, setActiveSection] = useState('general');
  const [settings, setSettings] = useState({
    siteName: 'Ridwan Brand',
    siteDescription: 'Professional web development and design services',
    contactEmail: 'contact@ridwanbrand.com',
    phone: '+1 (555) 123-4567',
    address: '123 Business St, City, State 12345',
    socialMedia: {
      linkedin: '',
      github: '',
      twitter: '',
      instagram: ''
    },
    seo: {
      metaTitle: 'Ridwan Brand - Web Development & Design',
      metaDescription: 'Professional web development and design services',
      keywords: 'web development, design, react, typescript'
    },
    email: {
      smtpHost: '',
      smtpPort: '',
      smtpUser: '',
      smtpPassword: ''
    },
    cloudinary: {
      cloudName: '',
      apiKey: '',
      apiSecret: '',
      uploadPreset: ''
    }
  });

  const handleSave = (section: string) => {
    toast({ title: `${section} settings saved successfully!` });
    console.log(`Saving ${section} settings:`, settings);
  };

  const settingSections = [
    { id: 'general', name: 'General', icon: Settings },
    { id: 'contact', name: 'Contact Info', icon: User },
    { id: 'social', name: 'Social Media', icon: Users },
    { id: 'seo', name: 'SEO Settings', icon: Settings },
    { id: 'email', name: 'Email Config', icon: User },
    { id: 'cloudinary', name: 'Cloudinary', icon: Users }
  ];

  const renderGeneralSettings = () => (
    <Card>
      <CardHeader>
        <CardTitle>General Settings</CardTitle>
        <CardDescription>Basic site configuration</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Site Name</label>
          <Input
            value={settings.siteName}
            onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
            placeholder="Your brand name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Site Description</label>
          <Textarea
            value={settings.siteDescription}
            onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
            placeholder="Brief description of your business"
            rows={3}
          />
        </div>
        <Button onClick={() => handleSave('general')}>Save General Settings</Button>
      </CardContent>
    </Card>
  );

  const renderContactSettings = () => (
    <Card>
      <CardHeader>
        <CardTitle>Contact Information</CardTitle>
        <CardDescription>Your business contact details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Contact Email</label>
          <Input
            type="email"
            value={settings.contactEmail}
            onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
            placeholder="contact@yourbrand.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Phone Number</label>
          <Input
            value={settings.phone}
            onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
            placeholder="+1 (555) 123-4567"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Business Address</label>
          <Textarea
            value={settings.address}
            onChange={(e) => setSettings({ ...settings, address: e.target.value })}
            placeholder="Your business address"
            rows={3}
          />
        </div>
        <Button onClick={() => handleSave('contact')}>Save Contact Settings</Button>
      </CardContent>
    </Card>
  );

  const renderSocialSettings = () => (
    <Card>
      <CardHeader>
        <CardTitle>Social Media Links</CardTitle>
        <CardDescription>Your social media profiles</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">LinkedIn URL</label>
          <Input
            value={settings.socialMedia.linkedin}
            onChange={(e) => setSettings({ 
              ...settings, 
              socialMedia: { ...settings.socialMedia, linkedin: e.target.value }
            })}
            placeholder="https://linkedin.com/in/yourprofile"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">GitHub URL</label>
          <Input
            value={settings.socialMedia.github}
            onChange={(e) => setSettings({ 
              ...settings, 
              socialMedia: { ...settings.socialMedia, github: e.target.value }
            })}
            placeholder="https://github.com/yourusername"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Twitter URL</label>
          <Input
            value={settings.socialMedia.twitter}
            onChange={(e) => setSettings({ 
              ...settings, 
              socialMedia: { ...settings.socialMedia, twitter: e.target.value }
            })}
            placeholder="https://twitter.com/yourusername"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Instagram URL</label>
          <Input
            value={settings.socialMedia.instagram}
            onChange={(e) => setSettings({ 
              ...settings, 
              socialMedia: { ...settings.socialMedia, instagram: e.target.value }
            })}
            placeholder="https://instagram.com/yourusername"
          />
        </div>
        <Button onClick={() => handleSave('social')}>Save Social Media Settings</Button>
      </CardContent>
    </Card>
  );

  const renderSEOSettings = () => (
    <Card>
      <CardHeader>
        <CardTitle>SEO Configuration</CardTitle>
        <CardDescription>Search engine optimization settings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Meta Title</label>
          <Input
            value={settings.seo.metaTitle}
            onChange={(e) => setSettings({ 
              ...settings, 
              seo: { ...settings.seo, metaTitle: e.target.value }
            })}
            placeholder="Your Brand - Professional Services"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Meta Description</label>
          <Textarea
            value={settings.seo.metaDescription}
            onChange={(e) => setSettings({ 
              ...settings, 
              seo: { ...settings.seo, metaDescription: e.target.value }
            })}
            placeholder="Brief description for search engines"
            rows={3}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Keywords</label>
          <Input
            value={settings.seo.keywords}
            onChange={(e) => setSettings({ 
              ...settings, 
              seo: { ...settings.seo, keywords: e.target.value }
            })}
            placeholder="keyword1, keyword2, keyword3"
          />
        </div>
        <Button onClick={() => handleSave('seo')}>Save SEO Settings</Button>
      </CardContent>
    </Card>
  );

  const renderEmailSettings = () => (
    <Card>
      <CardHeader>
        <CardTitle>Email Configuration</CardTitle>
        <CardDescription>SMTP settings for sending emails</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">SMTP Host</label>
            <Input
              value={settings.email.smtpHost}
              onChange={(e) => setSettings({ 
                ...settings, 
                email: { ...settings.email, smtpHost: e.target.value }
              })}
              placeholder="smtp.gmail.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">SMTP Port</label>
            <Input
              value={settings.email.smtpPort}
              onChange={(e) => setSettings({ 
                ...settings, 
                email: { ...settings.email, smtpPort: e.target.value }
              })}
              placeholder="587"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">SMTP Username</label>
          <Input
            value={settings.email.smtpUser}
            onChange={(e) => setSettings({ 
              ...settings, 
              email: { ...settings.email, smtpUser: e.target.value }
            })}
            placeholder="your-email@gmail.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">SMTP Password</label>
          <Input
            type="password"
            value={settings.email.smtpPassword}
            onChange={(e) => setSettings({ 
              ...settings, 
              email: { ...settings.email, smtpPassword: e.target.value }
            })}
            placeholder="your-app-password"
          />
        </div>
        <Button onClick={() => handleSave('email')}>Save Email Settings</Button>
      </CardContent>
    </Card>
  );

  const renderCloudinarySettings = () => (
    <Card>
      <CardHeader>
        <CardTitle>Cloudinary Configuration</CardTitle>
        <CardDescription>Media storage and management settings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Cloud Name</label>
          <Input
            value={settings.cloudinary.cloudName}
            onChange={(e) => setSettings({ 
              ...settings, 
              cloudinary: { ...settings.cloudinary, cloudName: e.target.value }
            })}
            placeholder="your-cloud-name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">API Key</label>
          <Input
            value={settings.cloudinary.apiKey}
            onChange={(e) => setSettings({ 
              ...settings, 
              cloudinary: { ...settings.cloudinary, apiKey: e.target.value }
            })}
            placeholder="your-api-key"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">API Secret</label>
          <Input
            type="password"
            value={settings.cloudinary.apiSecret}
            onChange={(e) => setSettings({ 
              ...settings, 
              cloudinary: { ...settings.cloudinary, apiSecret: e.target.value }
            })}
            placeholder="your-api-secret"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Upload Preset</label>
          <Input
            value={settings.cloudinary.uploadPreset}
            onChange={(e) => setSettings({ 
              ...settings, 
              cloudinary: { ...settings.cloudinary, uploadPreset: e.target.value }
            })}
            placeholder="your-upload-preset"
          />
        </div>
        <Button onClick={() => handleSave('cloudinary')}>Save Cloudinary Settings</Button>
      </CardContent>
    </Card>
  );

  const renderSettingsContent = () => {
    switch (activeSection) {
      case 'general': return renderGeneralSettings();
      case 'contact': return renderContactSettings();
      case 'social': return renderSocialSettings();
      case 'seo': return renderSEOSettings();
      case 'email': return renderEmailSettings();
      case 'cloudinary': return renderCloudinarySettings();
      default: return renderGeneralSettings();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold">Settings Management</h3>
        <p className="text-muted-foreground">Configure your platform settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Settings Categories</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {settingSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-muted transition-colors ${
                    activeSection === section.id ? 'bg-muted font-medium' : ''
                  }`}
                >
                  <section.icon className="h-4 w-4" />
                  {section.name}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-3">
          {renderSettingsContent()}
        </div>
      </div>
    </div>
  );
};
