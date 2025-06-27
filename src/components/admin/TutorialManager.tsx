
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { sdk } from '@/lib/sdkConfig';
import { toast } from '@/hooks/use-toast';
import { Plus, Edit, Trash2, BookOpen } from 'lucide-react';

export const TutorialManager = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [editingTutorial, setEditingTutorial] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    difficulty: 'Beginner',
    category: '',
    excerpt: '',
    image: '',
    published: false,
    featured: false,
    duration: 0,
    steps: [] as string[],
    prerequisites: [] as string[],
    tools: [] as string[],
    tags: [] as string[]
  });

  const queryClient = useQueryClient();

  const { data: tutorials, isLoading } = useQuery({
    queryKey: ['admin-tutorials'],
    queryFn: () => sdk.get('tutorials')
  });

  const createMutation = useMutation({
    mutationFn: (data: any) => sdk.insert('tutorials', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-tutorials'] });
      toast({ title: 'Tutorial created successfully!' });
      resetForm();
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => sdk.update('tutorials', id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-tutorials'] });
      toast({ title: 'Tutorial updated successfully!' });
      resetForm();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => sdk.delete('tutorials', id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-tutorials'] });
      toast({ title: 'Tutorial deleted successfully!' });
    }
  });

  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      difficulty: 'Beginner',
      category: '',
      excerpt: '',
      image: '',
      published: false,
      featured: false,
      duration: 0,
      steps: [],
      prerequisites: [],
      tools: [],
      tags: []
    });
    setIsCreating(false);
    setEditingTutorial(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingTutorial) {
      updateMutation.mutate({ id: editingTutorial.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleEdit = (tutorial: any) => {
    setEditingTutorial(tutorial);
    setFormData({
      title: tutorial.title || '',
      content: tutorial.content || '',
      difficulty: tutorial.difficulty || 'Beginner',
      category: tutorial.category || '',
      excerpt: tutorial.excerpt || '',
      image: tutorial.image || '',
      published: tutorial.published || false,
      featured: tutorial.featured || false,
      duration: tutorial.duration || 0,
      steps: tutorial.steps || [],
      prerequisites: tutorial.prerequisites || [],
      tools: tutorial.tools || [],
      tags: tutorial.tags || []
    });
    setIsCreating(true);
  };

  const handleArrayInput = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value.split(',').map(item => item.trim()).filter(item => item)
    });
  };

  if (isLoading) {
    return <div>Loading tutorials...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold">Tutorials</h3>
          <p className="text-muted-foreground">Manage your tutorial content</p>
        </div>
        <Button onClick={() => setIsCreating(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Tutorial
        </Button>
      </div>

      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>{editingTutorial ? 'Edit Tutorial' : 'Create New Tutorial'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter tutorial title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <Input
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Enter category"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Difficulty</label>
                  <select
                    value={formData.difficulty}
                    onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Duration (minutes)</label>
                  <Input
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) || 0 })}
                    placeholder="Duration in minutes"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Image URL</label>
                  <Input
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="Enter image URL"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Excerpt</label>
                <Textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Brief description of the tutorial"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Content</label>
                <Textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Write your tutorial content here"
                  rows={10}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Steps (comma-separated)</label>
                <Textarea
                  value={formData.steps.join(', ')}
                  onChange={(e) => handleArrayInput('steps', e.target.value)}
                  placeholder="Step 1, Step 2, Step 3..."
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Prerequisites (comma-separated)</label>
                  <Textarea
                    value={formData.prerequisites.join(', ')}
                    onChange={(e) => handleArrayInput('prerequisites', e.target.value)}
                    placeholder="Prerequisite 1, Prerequisite 2..."
                    rows={2}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Tools (comma-separated)</label>
                  <Textarea
                    value={formData.tools.join(', ')}
                    onChange={(e) => handleArrayInput('tools', e.target.value)}
                    placeholder="Tool 1, Tool 2..."
                    rows={2}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
                <Input
                  value={formData.tags.join(', ')}
                  onChange={(e) => handleArrayInput('tags', e.target.value)}
                  placeholder="tag1, tag2, tag3..."
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  />
                  Published
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  />
                  Featured
                </label>
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                  {editingTutorial ? 'Update Tutorial' : 'Create Tutorial'}
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
                <TableHead>Difficulty</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tutorials?.map((tutorial: any) => (
                <TableRow key={tutorial.id}>
                  <TableCell className="font-medium">{tutorial.title}</TableCell>
                  <TableCell>{tutorial.category}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      tutorial.difficulty === 'Beginner' 
                        ? 'bg-green-100 text-green-800'
                        : tutorial.difficulty === 'Intermediate'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                    }`}>
                      {tutorial.difficulty}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      tutorial.published 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {tutorial.published ? 'Published' : 'Draft'}
                    </span>
                  </TableCell>
                  <TableCell>{tutorial.duration} min</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(tutorial)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => deleteMutation.mutate(tutorial.id)}
                        disabled={deleteMutation.isPending}
                      >
                        <Trash2 className="h-4 w-4" />
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
