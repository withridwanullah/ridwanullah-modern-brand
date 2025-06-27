
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BlogManager } from './BlogManager';
import { PortfolioManager } from './PortfolioManager';
import { ServiceManager } from './ServiceManager';

export const ContentManager = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Content Management System</CardTitle>
          <CardDescription>
            Manage all your website content from one place
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="blog" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="blog">Blog Posts</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
        </TabsList>

        <TabsContent value="blog" className="mt-6">
          <BlogManager />
        </TabsContent>

        <TabsContent value="portfolio" className="mt-6">
          <PortfolioManager />
        </TabsContent>

        <TabsContent value="services" className="mt-6">
          <ServiceManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};
