
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { sdk } from '@/lib/sdkConfig';
import { Users, Settings, User } from 'lucide-react';

export const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalContacts: 0,
    totalOrders: 0,
    totalPortfolio: 0,
    totalBlogs: 0,
    totalServices: 0
  });

  const { data: contacts } = useQuery({
    queryKey: ['admin-contacts'],
    queryFn: () => sdk.get('contacts')
  });

  const { data: orders } = useQuery({
    queryKey: ['admin-orders'],
    queryFn: () => sdk.get('orders')
  });

  const { data: portfolio } = useQuery({
    queryKey: ['admin-portfolio'],
    queryFn: () => sdk.get('portfolio')
  });

  const { data: blogs } = useQuery({
    queryKey: ['admin-blogs'],
    queryFn: () => sdk.get('blog')
  });

  const { data: services } = useQuery({
    queryKey: ['admin-services'],
    queryFn: () => sdk.get('services')
  });

  useEffect(() => {
    setStats({
      totalContacts: contacts?.length || 0,
      totalOrders: orders?.length || 0,
      totalPortfolio: portfolio?.length || 0,
      totalBlogs: blogs?.length || 0,
      totalServices: services?.length || 0
    });
  }, [contacts, orders, portfolio, blogs, services]);

  const statCards = [
    {
      title: 'Total Contacts',
      value: stats.totalContacts,
      description: 'Contact inquiries received',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Active Orders',
      value: stats.totalOrders,
      description: 'Orders in progress',
      icon: Settings,
      color: 'text-green-600'
    },
    {
      title: 'Portfolio Items',
      value: stats.totalPortfolio,
      description: 'Showcase projects',
      icon: User,
      color: 'text-purple-600'
    },
    {
      title: 'Blog Posts',
      value: stats.totalBlogs,
      description: 'Published articles',
      icon: Users,
      color: 'text-orange-600'
    },
    {
      title: 'Services',
      value: stats.totalServices,
      description: 'Available services',
      icon: Settings,
      color: 'text-red-600'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {statCards.map((stat) => (
          <Card key={stat.title} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest platform activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div>
                  <p className="font-medium">New contact inquiry</p>
                  <p className="text-sm text-muted-foreground">2 minutes ago</p>
                </div>
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div>
                  <p className="font-medium">Service order updated</p>
                  <p className="text-sm text-muted-foreground">1 hour ago</p>
                </div>
                <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
              </div>
              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div>
                  <p className="font-medium">Blog post published</p>
                  <p className="text-sm text-muted-foreground">3 hours ago</p>
                </div>
                <div className="h-2 w-2 bg-purple-500 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors">
                <div className="text-center">
                  <Users className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                  <p className="font-medium">Add User</p>
                </div>
              </Card>
              <Card className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors">
                <div className="text-center">
                  <Settings className="h-8 w-8 mx-auto mb-2 text-green-600" />
                  <p className="font-medium">Create Post</p>
                </div>
              </Card>
              <Card className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors">
                <div className="text-center">
                  <User className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                  <p className="font-medium">Add Service</p>
                </div>
              </Card>
              <Card className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors">
                <div className="text-center">
                  <Users className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                  <p className="font-medium">View Reports</p>
                </div>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
