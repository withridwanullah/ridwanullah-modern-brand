
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Download, FileText } from 'lucide-react';
import { sdk } from '@/lib/sdkConfig';

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

export const LeadMagnetManager = () => {
  const [leadMagnets, setLeadMagnets] = useState<LeadMagnet[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingMagnet, setEditingMagnet] = useState<Partial<LeadMagnet> | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadLeadMagnets();
  }, []);

  const loadLeadMagnets = async () => {
    try {
      setLoading(true);
      const data = await sdk.get<LeadMagnet>('leadMagnets');
      setLeadMagnets(data);
    } catch (error) {
      console.error('Error loading lead magnets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (magnetData: Partial<LeadMagnet>) => {
    try {
      if (editingMagnet?.id) {
        await sdk.update('leadMagnets', editingMagnet.id, magnetData);
      } else {
        await sdk.insert('leadMagnets', magnetData);
      }
      await loadLeadMagnets();
      setShowForm(false);
      setEditingMagnet(null);
    } catch (error) {
      console.error('Error saving lead magnet:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this lead magnet?')) {
      try {
        await sdk.delete('leadMagnets', id);
        await loadLeadMagnets();
      } catch (error) {
        console.error('Error deleting lead magnet:', error);
      }
    }
  };

  const LeadMagnetForm = () => {
    const [formData, setFormData] = useState<Partial<LeadMagnet>>(
      editingMagnet || {
        title: '',
        description: '',
        type: 'eBook',
        downloadUrl: '',
        image: '',
        fileSize: '',
        pages: 0,
        category: '',
        featured: false,
        active: true,
        downloads: 0
      }
    );

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      handleSave(formData);
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title || ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="type">Type</Label>
            <select
              className="w-full p-2 border rounded"
              value={formData.type || 'eBook'}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
              <option value="eBook">eBook</option>
              <option value="Checklist">Checklist</option>
              <option value="Template">Template</option>
              <option value="Guide">Guide</option>
              <option value="Worksheet">Worksheet</option>
            </select>
          </div>
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              value={formData.category || ''}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="pages">Pages</Label>
            <Input
              id="pages"
              type="number"
              value={formData.pages || 0}
              onChange={(e) => setFormData({ ...formData, pages: Number(e.target.value) })}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              value={formData.image || ''}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="downloadUrl">Download URL</Label>
            <Input
              id="downloadUrl"
              value={formData.downloadUrl || ''}
              onChange={(e) => setFormData({ ...formData, downloadUrl: e.target.value })}
              required
            />
          </div>
        </div>

        <div>
          <Label htmlFor="fileSize">File Size</Label>
          <Input
            id="fileSize"
            value={formData.fileSize || ''}
            onChange={(e) => setFormData({ ...formData, fileSize: e.target.value })}
          />
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="featured"
              checked={formData.featured || false}
              onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
            />
            <Label htmlFor="featured">Featured</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch
              id="active"
              checked={formData.active || true}
              onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
            />
            <Label htmlFor="active">Active</Label>
          </div>
        </div>

        <div className="flex space-x-2">
          <Button type="submit">Save Lead Magnet</Button>
          <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
            Cancel
          </Button>
        </div>
      </form>
    );
  };

  if (loading) {
    return <div>Loading lead magnets...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Lead Magnet Manager</h2>
          <p className="text-gray-600">Manage free resources and lead magnets</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Lead Magnet
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingMagnet ? 'Edit' : 'Create'} Lead Magnet</CardTitle>
          </CardHeader>
          <CardContent>
            <LeadMagnetForm />
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {leadMagnets.map((magnet) => (
          <Card key={magnet.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold">{magnet.title}</h3>
                <div className="flex space-x-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditingMagnet(magnet);
                      setShowForm(true);
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(magnet.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-2">{magnet.description}</p>
              
              <div className="flex flex-wrap gap-1 mb-2">
                <Badge variant={magnet.featured ? 'default' : 'secondary'}>
                  {magnet.type}
                </Badge>
                {magnet.featured && <Badge>Featured</Badge>}
                {!magnet.active && <Badge variant="destructive">Inactive</Badge>}
              </div>
              
              <div className="flex justify-between items-center text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <Download className="w-4 h-4" />
                  <span>{magnet.downloads} downloads</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FileText className="w-4 h-4" />
                  <span>{magnet.pages} pages</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
