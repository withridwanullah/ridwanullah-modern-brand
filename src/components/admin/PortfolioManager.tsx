
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { sdk } from '@/lib/sdkConfig';
import { toast } from '@/hooks/use-toast';
import { Users, Settings, User } from 'lucide-react';

export const PortfolioManager = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    image: '',
    technologies: '',
    url: '',
    featured: false
  });

  const queryClient = useQueryClient();

  const { data: portfolioItems, isLoading } = useQuery({
    queryKey: ['admin-portfolio'],
    queryFn: () => sdk.get('portfolio')
  });

  const createMutation = useMutation({
    mutationFn: (data: any) => {
      const processedData = {
        ...data,
        technologies: data.technologies ? data.technologies.split(',').map((t: string) => t.trim()) : []
      };
      return sdk.insert('portfolio', processedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-portfolio'] });
      toast({ title: 'Portfolio item created successfully!' });
      resetForm();
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => {
      const processedData = {
        ...data,
        technologies: data.technologies ? data.technologies.split(',').map((t: string) => t.trim()) : []
      };
      return sdk.update('portfolio', id, processedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-portfolio'] });
      toast({ title: 'Portfolio item updated successfully!' });
      resetForm();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => sdk.delete('portfolio', id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-portfolio'] });
      toast({ title: 'Portfolio item deleted successfully!' });
    }
  });

  const resetForm = () => {
    setFormData({
      title: '',
      category: '',
      description: '',
      image: '',
      technologies: '',
      url: '',
      featured: false
    });
    setIsCreating(false);
    setEditingItem(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      updateMutation.mutate({ id: editingItem.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData({
      title: item.title || '',
      category: item.category || '',
      description: item.description || '',
      image: item.image || '',
      technologies: Array.isArray(item.technologies) ? item.technologies.join(', ') : '',
      url: item.url || '',
      featured: item.featured || false
    });
    setIsCreating(true);
  };

  if (isLoading) {
    return <div>Loading portfolio items...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold">Portfolio Items</h3>
          <p className="text-muted-foreground">Manage your showcase projects</p>
        </div>
        <Button onClick={() => setIsCreating(true)}>
          <Users className="h-4 w-4 mr-2" />
          New Project
        </Button>
      </div>

      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>{editingItem ? 'Edit Portfolio Item' : 'Create New Portfolio Item'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Project title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <Input
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Project category"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Project description"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Image URL</label>
                  <Input
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="Project image URL"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Project URL</label>
                  <Input
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    placeholder="Live project URL"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Technologies (comma-separated)</label>
                <Input
                  value={formData.technologies}
                  onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                  placeholder="React, TypeScript, Tailwind CSS"
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  />
                  Featured Project
                </label>
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                  {editingItem ? 'Update Project' : 'Create Project'}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead>Technologies</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {portfolioItems?.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      item.featured 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                    }`}>
                      {item.featured ? 'Featured' : 'Standard'}
                    </span>
                  </TableCell>
                  <TableCell>
                    {Array.isArray(item.technologies) ? item.technologies.slice(0, 2).join(', ') : 'N/A'}
                    {Array.isArray(item.technologies) && item.technologies.length > 2 && '...'}
                  </TableCell>
                  <TableCell>{new Date(item.created).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(item)}>
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => deleteMutation.mutate(item.id)}
                        disabled={deleteMutation.isPending}
                      >
                        <User className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
