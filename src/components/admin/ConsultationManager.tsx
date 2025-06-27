
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Edit, Check, Clock, Calendar } from 'lucide-react';
import { sdk } from '../../lib/sdkConfig';

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

export const ConsultationManager = () => {
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: 60,
    price: 0,
    category: '',
    available: true,
    image: '',
    features: [''],
    bookingUrl: ''
  });

  useEffect(() => {
    loadConsultations();
  }, []);

  const loadConsultations = async () => {
    try {
      setLoading(true);
      const data = await sdk.get<Consultation>('consultations');
      setConsultations(data);
    } catch (error) {
      console.error('Error loading consultations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const consultationData = {
        ...formData,
        features: formData.features.filter(f => f.trim() !== '')
      };

      if (editingId) {
        await sdk.update('consultations', editingId, consultationData);
      } else {
        await sdk.insert('consultations', consultationData);
      }

      await loadConsultations();
      resetForm();
    } catch (error) {
      console.error('Error saving consultation:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      duration: 60,
      price: 0,
      category: '',
      available: true,
      image: '',
      features: [''],
      bookingUrl: ''
    });
    setEditingId(null);
  };

  const handleEdit = (consultation: Consultation) => {
    setFormData({
      title: consultation.title,
      description: consultation.description,
      duration: consultation.duration,
      price: consultation.price,
      category: consultation.category,
      available: consultation.available,
      image: consultation.image,
      features: consultation.features.length > 0 ? consultation.features : [''],
      bookingUrl: consultation.bookingUrl
    });
    setEditingId(consultation.id);
  };

  const toggleAvailability = async (id: string, currentStatus: boolean) => {
    try {
      await sdk.update('consultations', id, { available: !currentStatus });
      await loadConsultations();
    } catch (error) {
      console.error('Error updating availability:', error);
    }
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const updateFeature = (index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.map((f, i) => i === index ? value : f)
    }));
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  if (loading) {
    return <div className="p-6">Loading consultations...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Consultation Management</CardTitle>
          <CardDescription>
            Manage your consultation offerings and booking settings
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                className="w-full min-h-[100px] p-3 border border-input rounded-md"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="available">Available</Label>
                <select
                  id="available"
                  className="w-full p-2 border border-input rounded-md"
                  value={formData.available.toString()}
                  onChange={(e) => setFormData(prev => ({ ...prev, available: e.target.value === 'true' }))}
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                  placeholder="/placeholder.svg"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bookingUrl">Booking URL</Label>
                <Input
                  id="bookingUrl"
                  value={formData.bookingUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, bookingUrl: e.target.value }))}
                  placeholder="https://calendly.com/..."
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Features</Label>
              {formData.features.map((feature, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={feature}
                    onChange={(e) => updateFeature(index, e.target.value)}
                    placeholder="Enter feature"
                  />
                  {formData.features.length > 1 && (
                    <Button type="button" variant="outline" onClick={() => removeFeature(index)}>
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addFeature}>
                <Plus className="w-4 h-4 mr-2" />
                Add Feature
              </Button>
            </div>

            <div className="flex gap-2">
              <Button type="submit">
                {editingId ? 'Update' : 'Create'} Consultation
              </Button>
              {editingId && (
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Consultations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {consultations.map(consultation => (
              <div key={consultation.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">{consultation.title}</h3>
                    <p className="text-sm text-muted-foreground">{consultation.category}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toggleAvailability(consultation.id, consultation.available)}
                    >
                      {consultation.available ? (
                        <>
                          <Check className="w-4 h-4 mr-1" />
                          Available
                        </>
                      ) : (
                        <>
                          <Clock className="w-4 h-4 mr-1" />
                          Unavailable
                        </>
                      )}
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleEdit(consultation)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm mb-2">{consultation.description}</p>
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <span>{consultation.duration} minutes</span>
                  <span>${consultation.price}</span>
                  <span>{consultation.features.length} features</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
