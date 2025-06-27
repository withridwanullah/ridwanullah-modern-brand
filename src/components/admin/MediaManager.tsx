
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { sdk } from '@/lib/sdkConfig';
import { Users, Settings, User } from 'lucide-react';

export const MediaManager = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadFolder, setUploadFolder] = useState('');

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast({ title: 'Please select a file first', variant: 'destructive' });
      return;
    }

    setUploading(true);
    try {
      const result = await sdk.uploadToCloudinary(selectedFile, uploadFolder);
      toast({ title: 'File uploaded successfully!' });
      setSelectedFile(null);
      setUploadFolder('');
      console.log('Upload result:', result);
    } catch (error) {
      console.error('Upload failed:', error);
      toast({ 
        title: 'Upload failed', 
        description: 'Please check your Cloudinary configuration',
        variant: 'destructive' 
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold">Media Management</h3>
          <p className="text-muted-foreground">Upload and manage your media files</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upload New Media</CardTitle>
            <CardDescription>
              Upload images and files to Cloudinary
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Select File</label>
              <Input
                type="file"
                onChange={handleFileSelect}
                accept="image/*,video/*,.pdf,.doc,.docx"
              />
              {selectedFile && (
                <p className="text-sm text-muted-foreground mt-2">
                  Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Upload Folder (optional)</label>
              <Input
                value={uploadFolder}
                onChange={(e) => setUploadFolder(e.target.value)}
                placeholder="e.g., portfolio, blog, assets"
              />
            </div>

            <Button 
              onClick={handleUpload} 
              disabled={!selectedFile || uploading}
              className="w-full"
            >
              <Users className="h-4 w-4 mr-2" />
              {uploading ? 'Uploading...' : 'Upload File'}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Media Library</CardTitle>
            <CardDescription>
              Your uploaded media files
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                Media library functionality requires Cloudinary API credentials
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Configure your Cloudinary settings in the SDK config to view uploaded files
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Media Management Tools</CardTitle>
          <CardDescription>
            Additional media management features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4 hover:bg-muted/50 cursor-pointer transition-colors">
              <div className="text-center">
                <Settings className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <h4 className="font-medium">Image Optimization</h4>
                <p className="text-sm text-muted-foreground">Optimize images for web</p>
              </div>
            </Card>
            
            <Card className="p-4 hover:bg-muted/50 cursor-pointer transition-colors">
              <div className="text-center">
                <User className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <h4 className="font-medium">Bulk Upload</h4>
                <p className="text-sm text-muted-foreground">Upload multiple files</p>
              </div>
            </Card>
            
            <Card className="p-4 hover:bg-muted/50 cursor-pointer transition-colors">
              <div className="text-center">
                <Users className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <h4 className="font-medium">Media Analytics</h4>
                <p className="text-sm text-muted-foreground">Track media usage</p>
              </div>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
