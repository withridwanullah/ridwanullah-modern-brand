
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BlogManager } from './BlogManager';
import { PortfolioManager } from './PortfolioManager';
import { ServiceManager } from './ServiceManager';
import { TutorialManager } from './TutorialManager';
import { ToolsManager } from './ToolsManager';
import { ConsultationManager } from './ConsultationManager';
import { ToolkitManager } from './ToolkitManager';
import { LeadMagnetManager } from './LeadMagnetManager';

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
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="blog">Blog Posts</TabsTrigger>
          <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="tools">Tools</TabsTrigger>
          <TabsTrigger value="consultations">Consultations</TabsTrigger>
          <TabsTrigger value="toolkits">Toolkits</TabsTrigger>
          <TabsTrigger value="lead-magnets">Lead Magnets</TabsTrigger>
        </TabsList>

        <TabsContent value="blog" className="mt-6">
          <BlogManager />
        </TabsContent>

        <TabsContent value="tutorials" className="mt-6">
          <TutorialManager />
        </TabsContent>

        <TabsContent value="portfolio" className="mt-6">
          <PortfolioManager />
        </TabsContent>

        <TabsContent value="services" className="mt-6">
          <ServiceManager />
        </TabsContent>

        <TabsContent value="tools" className="mt-6">
          <ToolsManager />
        </TabsContent>

        <TabsContent value="consultations" className="mt-6">
          <ConsultationManager />
        </TabsContent>

        <TabsContent value="toolkits" className="mt-6">
          <ToolkitManager />
        </TabsContent>

        <TabsContent value="lead-magnets" className="mt-6">
          <LeadMagnetManager />
        </TabsContent>
      </Tabs>
    </div>
  );
};
