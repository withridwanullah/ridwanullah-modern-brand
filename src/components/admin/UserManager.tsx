
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { sdk } from '@/lib/sdkConfig';
import { toast } from '@/hooks/use-toast';
import { Users, Settings, User } from 'lucide-react';

export const UserManager = () => {
  const [isCreating, setIsCreating] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    roles: '',
    permissions: '',
    verified: false
  });

  const queryClient = useQueryClient();

  const { data: users, isLoading } = useQuery({
    queryKey: ['admin-users'],
    queryFn: () => sdk.get('users')
  });

  const createMutation = useMutation({
    mutationFn: (data: any) => {
      const processedData = {
        ...data,
        roles: data.roles ? data.roles.split(',').map((r: string) => r.trim()) : [],
        permissions: data.permissions ? data.permissions.split(',').map((p: string) => p.trim()) : []
      };
      return sdk.register(data.email, data.password, processedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast({ title: 'User created successfully!' });
      resetForm();
    }
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => {
      const processedData = {
        ...data,
        roles: data.roles ? data.roles.split(',').map((r: string) => r.trim()) : [],
        permissions: data.permissions ? data.permissions.split(',').map((p: string) => p.trim()) : []
      };
      delete processedData.password; // Don't update password through this method
      return sdk.update('users', id, processedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast({ title: 'User updated successfully!' });
      resetForm();
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => sdk.delete('users', id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      toast({ title: 'User deleted successfully!' });
    }
  });

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      roles: '',
      permissions: '',
      verified: false
    });
    setIsCreating(false);
    setEditingUser(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      updateMutation.mutate({ id: editingUser.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleEdit = (user: any) => {
    setEditingUser(user);
    setFormData({
      email: user.email || '',
      password: '', // Don't pre-fill password
      roles: Array.isArray(user.roles) ? user.roles.join(', ') : '',
      permissions: Array.isArray(user.permissions) ? user.permissions.join(', ') : '',
      verified: user.verified || false
    });
    setIsCreating(true);
  };

  if (isLoading) {
    return <div>Loading users...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold">User Management</h3>
          <p className="text-muted-foreground">Manage platform users and permissions</p>
        </div>
        <Button onClick={() => setIsCreating(true)}>
          <Users className="h-4 w-4 mr-2" />
          New User
        </Button>
      </div>

      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>{editingUser ? 'Edit User' : 'Create New User'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="user@example.com"
                  required
                  disabled={!!editingUser} // Don't allow email changes when editing
                />
              </div>

              {!editingUser && (
                <div>
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <Input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Enter password"
                    required={!editingUser}
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-2">Roles (comma-separated)</label>
                <Input
                  value={formData.roles}
                  onChange={(e) => setFormData({ ...formData, roles: e.target.value })}
                  placeholder="admin, editor, viewer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Permissions (comma-separated)</label>
                <Input
                  value={formData.permissions}
                  onChange={(e) => setFormData({ ...formData, permissions: e.target.value })}
                  placeholder="read, write, delete"
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.verified}
                    onChange={(e) => setFormData({ ...formData, verified: e.target.checked })}
                  />
                  Email Verified
                </label>
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                  {editingUser ? 'Update User' : 'Create User'}
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
                <TableHead>Email</TableHead>
                <TableHead>Roles</TableHead>
                <TableHead>Verified</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users?.map((user: any) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.email}</TableCell>
                  <TableCell>
                    {Array.isArray(user.roles) && user.roles.length > 0 
                      ? user.roles.join(', ') 
                      : 'No roles'
                    }
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.verified 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {user.verified ? 'Verified' : 'Unverified'}
                    </span>
                  </TableCell>
                  <TableCell>{new Date(user.created).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(user)}>
                        <Settings className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => deleteMutation.mutate(user.id)}
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
