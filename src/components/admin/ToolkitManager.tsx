
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Download, Package } from 'lucide-react';
import { sdk } from '@/lib/sdkConfig';

interface Toolkit {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
  downloadUrl: string;
  fileSize: string;
  fileType: string;
  includes: string[];
  tags: string[];
  featured: boolean;
  active: boolean;
  created: string;
}

export const ToolkitManager = () => {
  const [toolkits, setToolkits] = useState<Toolkit[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingToolkit, setEditingToolkit] = useState<Partial<Toolkit> | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadToolkits();
  }, []);

  const loadToolkits = async () => {
    try {
      setLoading(true);
      const data = await sdk.get<Toolkit>('toolkits');
      setToolkits(data);
    } catch (error) {
      console.error('Error loading toolkits:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (toolkitData: Partial<Toolkit>) => {
    try {
      if (editingToolkit?.id) {
        await sdk.update('toolkits', editingToolkit.id, toolkitData);
      } else {
        await sdk.insert('toolkits', toolkitData);
      }
      await loadToolkits();
      setShowForm(false);
      setEditingToolkit(null);
    } catch (error) {
      console.error('Error saving toolkit:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this toolkit?')) {
      try {
        await sdk.delete('toolkits', id);
        await loadToolkits();
      } catch (error) {
        console.error('Error deleting toolkit:', error);
      }
    }
  };

  const ToolkitForm = () => {
    const [formData, setFormData] = useState<Partial<Toolkit>>(
      editingToolkit || {
        name: '',
        description: '',
        category: '',
        price: 0,
        image: '',
        downloadUrl: '',
        fileSize: '',
        fileType: '',
        includes: [],
        tags: [],
        featured: false,
        active: true
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
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              value={formData.category || ''}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
            />
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
            <Label htmlFor="price">Price ($)</Label>
            <Input
              id="price"
              type="number"
              value={formData.price || 0}
              onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
              required
            />
          </div>
          <div>
            <Label htmlFor="fileSize">File Size</Label>
            <Input
              id="fileSize"
              value={formData.fileSize || ''}
              onChange={(e) => setFormData({ ...formData, fileSize: e.target.value })}
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
          <Button type="submit">Save Toolkit</Button>
          <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
            Cancel
          </Button>
        </div>
      </form>
    );
  };

  if (loading) {
    return <div>Loading toolkits...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Toolkit Manager</h2>
          <p className="text-gray-600">Manage downloadable toolkits and resources</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Toolkit
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingToolkit ? 'Edit' : 'Create'} Toolkit</CardTitle>
          </CardHeader>
          <CardContent>
            <ToolkitForm />
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {toolkits.map((toolkit) => (
          <Card key={toolkit.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold">{toolkit.name}</h3>
                <div className="flex space-x-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditingToolkit(toolkit);
                      setShowForm(true);
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(toolkit.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-2">{toolkit.description}</p>
              
              <div className="flex flex-wrap gap-1 mb-2">
                <Badge variant={toolkit.featured ? 'default' : 'secondary'}>
                  {toolkit.category}
                </Badge>
                {toolkit.featured && <Badge>Featured</Badge>}
                {!toolkit.active && <Badge variant="destructive">Inactive</Badge>}
              </div>
              
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>${toolkit.price}</span>
                <div className="flex items-center space-x-1">
                  <Package className="w-4 h-4" />
                  <span>{toolkit.fileSize}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
