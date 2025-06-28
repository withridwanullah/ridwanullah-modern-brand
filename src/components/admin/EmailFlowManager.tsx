
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Mail, Users, TrendingUp } from 'lucide-react';
import { sdk } from '@/lib/sdkConfig';

interface EmailFlow {
  id: string;
  name: string;
  description: string;
  trigger: string;
  emails: string[];
  active: boolean;
  subscribers: number;
  openRate: number;
  clickRate: number;
  created: string;
}

export const EmailFlowManager = () => {
  const [emailFlows, setEmailFlows] = useState<EmailFlow[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingFlow, setEditingFlow] = useState<Partial<EmailFlow> | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadEmailFlows();
  }, []);

  const loadEmailFlows = async () => {
    try {
      setLoading(true);
      const data = await sdk.get<EmailFlow>('emailFlows');
      setEmailFlows(data);
    } catch (error) {
      console.error('Error loading email flows:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (flowData: Partial<EmailFlow>) => {
    try {
      if (editingFlow?.id) {
        await sdk.update('emailFlows', editingFlow.id, flowData);
      } else {
        await sdk.insert('emailFlows', flowData);
      }
      await loadEmailFlows();
      setShowForm(false);
      setEditingFlow(null);
    } catch (error) {
      console.error('Error saving email flow:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this email flow?')) {
      try {
        await sdk.delete('emailFlows', id);
        await loadEmailFlows();
      } catch (error) {
        console.error('Error deleting email flow:', error);
      }
    }
  };

  const EmailFlowForm = () => {
    const [formData, setFormData] = useState<Partial<EmailFlow>>(
      editingFlow || {
        name: '',
        description: '',
        trigger: '',
        emails: [],
        active: true,
        subscribers: 0,
        openRate: 0,
        clickRate: 0
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
            <Label htmlFor="name">Flow Name</Label>
            <Input
              id="name"
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="trigger">Trigger Event</Label>
            <Input
              id="trigger"
              value={formData.trigger || ''}
              onChange={(e) => setFormData({ ...formData, trigger: e.target.value })}
              placeholder="e.g., signup, download, purchase"
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
          />
        </div>

        <div>
          <Label htmlFor="emails">Email Sequence (one per line)</Label>
          <Textarea
            id="emails"
            value={formData.emails?.join('\n') || ''}
            onChange={(e) => {
              const emails = e.target.value.split('\n').filter(email => email.trim());
              setFormData({ ...formData, emails });
            }}
            placeholder="Welcome Email&#10;Day 2: Getting Started&#10;Day 7: Pro Tips"
            rows={5}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label htmlFor="subscribers">Subscribers</Label>
            <Input
              id="subscribers"
              type="number"
              value={formData.subscribers || 0}
              onChange={(e) => setFormData({ ...formData, subscribers: Number(e.target.value) })}
            />
          </div>
          <div>
            <Label htmlFor="openRate">Open Rate (%)</Label>
            <Input
              id="openRate"
              type="number"
              step="0.1"
              value={formData.openRate || 0}
              onChange={(e) => setFormData({ ...formData, openRate: Number(e.target.value) })}
            />
          </div>
          <div>
            <Label htmlFor="clickRate">Click Rate (%)</Label>
            <Input
              id="clickRate"
              type="number"
              step="0.1"
              value={formData.clickRate || 0}
              onChange={(e) => setFormData({ ...formData, clickRate: Number(e.target.value) })}
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="active"
            checked={formData.active || false}
            onCheckedChange={(checked) => setFormData({ ...formData, active: checked })}
          />
          <Label htmlFor="active">Active</Label>
        </div>

        <div className="flex space-x-2">
          <Button type="submit">Save Email Flow</Button>
          <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
            Cancel
          </Button>
        </div>
      </form>
    );
  };

  if (loading) {
    return <div>Loading email flows...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Email Flow Manager</h2>
          <p className="text-gray-600">Manage automated email sequences and nurturing campaigns</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Email Flow
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingFlow ? 'Edit' : 'Create'} Email Flow</CardTitle>
          </CardHeader>
          <CardContent>
            <EmailFlowForm />
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {emailFlows.map((flow) => (
          <Card key={flow.id}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold">{flow.name}</h3>
                <div className="flex space-x-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setEditingFlow(flow);
                      setShowForm(true);
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(flow.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">{flow.description}</p>
              
              <div className="flex flex-wrap gap-1 mb-3">
                <Badge variant={flow.active ? 'default' : 'secondary'}>
                  {flow.active ? 'Active' : 'Inactive'}
                </Badge>
                <Badge variant="outline">
                  {flow.trigger}
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-2 text-sm">
                <div className="flex items-center space-x-1">
                  <Mail className="w-4 h-4 text-blue-500" />
                  <span>{flow.emails.length} emails</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4 text-green-500" />
                  <span>{flow.subscribers}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-4 h-4 text-purple-500" />
                  <span>{flow.openRate}%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
