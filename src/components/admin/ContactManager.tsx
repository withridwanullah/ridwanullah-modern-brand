
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { sdk } from '@/lib/sdkConfig';
import { toast } from '@/hooks/use-toast';
import { Users, Settings, User } from 'lucide-react';

export const ContactManager = () => {
  const [selectedContact, setSelectedContact] = useState<any>(null);

  const queryClient = useQueryClient();

  const { data: contacts, isLoading } = useQuery({
    queryKey: ['admin-contacts'],
    queryFn: () => sdk.get('contacts')
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => sdk.update('contacts', id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-contacts'] });
      toast({ title: 'Contact status updated!' });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => sdk.delete('contacts', id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-contacts'] });
      toast({ title: 'Contact deleted successfully!' });
      setSelectedContact(null);
    }
  });

  const markAsRead = (contact: any) => {
    updateMutation.mutate({ 
      id: contact.id, 
      data: { ...contact, status: 'read' }
    });
  };

  const markAsReplied = (contact: any) => {
    updateMutation.mutate({ 
      id: contact.id, 
      data: { ...contact, status: 'replied' }
    });
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'new': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'read': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'replied': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  if (isLoading) {
    return <div>Loading contacts...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold">Contact Management</h3>
          <p className="text-muted-foreground">Manage customer inquiries and communications</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contacts?.map((contact: any) => (
                    <TableRow 
                      key={contact.id}
                      className={`cursor-pointer hover:bg-muted/50 ${selectedContact?.id === contact.id ? 'bg-muted' : ''}`}
                      onClick={() => setSelectedContact(contact)}
                    >
                      <TableCell className="font-medium">{contact.name}</TableCell>
                      <TableCell>{contact.email}</TableCell>
                      <TableCell>{contact.service || 'General'}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(contact.status)}`}>
                          {contact.status || 'New'}
                        </span>
                      </TableCell>
                      <TableCell>{new Date(contact.created).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={(e) => {
                              e.stopPropagation();
                              markAsRead(contact);
                            }}
                            disabled={contact.status === 'read' || contact.status === 'replied'}
                          >
                            <Settings className="h-4 w-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteMutation.mutate(contact.id);
                            }}
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

        <div>
          {selectedContact ? (
            <Card>
              <CardHeader>
                <CardTitle>Contact Details</CardTitle>
                <CardDescription>
                  {selectedContact.name} - {new Date(selectedContact.created).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Email</h4>
                  <p>{selectedContact.email}</p>
                </div>
                
                {selectedContact.phone && (
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground">Phone</h4>
                    <p>{selectedContact.phone}</p>
                  </div>
                )}

                {selectedContact.company && (
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground">Company</h4>
                    <p>{selectedContact.company}</p>
                  </div>
                )}

                {selectedContact.service && (
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground">Service Interest</h4>
                    <p>{selectedContact.service}</p>
                  </div>
                )}

                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Message</h4>
                  <p className="text-sm bg-muted p-3 rounded-md">{selectedContact.message}</p>
                </div>

                <div>
                  <h4 className="font-medium text-sm text-muted-foreground">Current Status</h4>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs mt-1 ${getStatusColor(selectedContact.status)}`}>
                    {selectedContact.status || 'New'}
                  </span>
                </div>

                <div className="flex flex-col gap-2 pt-4">
                  <Button 
                    size="sm" 
                    onClick={() => markAsRead(selectedContact)}
                    disabled={selectedContact.status === 'read' || selectedContact.status === 'replied'}
                  >
                    Mark as Read
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => markAsReplied(selectedContact)}
                    disabled={selectedContact.status === 'replied'}
                  >
                    Mark as Replied
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => window.open(`mailto:${selectedContact.email}`, '_blank')}
                  >
                    Send Email
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-64">
                <p className="text-muted-foreground">Select a contact to view details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
