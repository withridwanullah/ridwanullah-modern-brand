
import UniversalSDK, { type UniversalSDKConfig, type SchemaDefinition } from './sdk';

// Define proper TypeScript interfaces
interface AppSchemas {
  [key: string]: SchemaDefinition;
}

interface AppTemplates {
  [key: string]: string;
}

// Get current timestamp for defaults
const getCurrentTimestamp = (): string => new Date().toISOString();

// Define schemas with proper typing
const appSchemas: AppSchemas = {
  contacts: {
    required: ['name', 'email', 'message'],
    types: {
      name: 'string',
      email: 'string',
      message: 'string',
      service: 'string',
      phone: 'string',
      company: 'string',
      status: 'string',
      created: 'string'
    },
    defaults: {
      status: 'new',
      created: getCurrentTimestamp()
    }
  },
  portfolio: {
    required: ['title', 'category', 'image'],
    types: {
      title: 'string',
      category: 'string',
      description: 'string',
      image: 'string',
      technologies: 'array',
      url: 'string',
      featured: 'boolean',
      created: 'string'
    },
    defaults: {
      featured: false,
      created: getCurrentTimestamp()
    }
  },
  blog: {
    required: ['title', 'content', 'category'],
    types: {
      title: 'string',
      content: 'string',
      category: 'string',
      image: 'string',
      excerpt: 'string',
      author: 'string',
      published: 'boolean',
      featured: 'boolean',
      tags: 'array',
      readTime: 'number',
      views: 'number',
      likes: 'number',
      created: 'string'
    },
    defaults: {
      published: false,
      featured: false,
      author: 'Ridwanullah',
      created: getCurrentTimestamp(),
      views: 0,
      likes: 0,
      tags: []
    }
  },
  tutorials: {
    required: ['title', 'content', 'difficulty'],
    types: {
      title: 'string',
      content: 'string',
      difficulty: 'string',
      category: 'string',
      image: 'string',
      excerpt: 'string',
      author: 'string',
      published: 'boolean',
      featured: 'boolean',
      tags: 'array',
      duration: 'number',
      steps: 'array',
      prerequisites: 'array',
      tools: 'array',
      views: 'number',
      likes: 'number',
      created: 'string'
    },
    defaults: {
      published: false,
      featured: false,
      author: 'Ridwanullah',
      created: getCurrentTimestamp(),
      views: 0,
      likes: 0,
      tags: [],
      steps: [],
      prerequisites: [],
      tools: []
    }
  },
  courses: {
    required: ['title', 'description', 'price'],
    types: {
      title: 'string',
      description: 'string',
      price: 'number',
      category: 'string',
      image: 'string',
      instructor: 'string',
      published: 'boolean',
      featured: 'boolean',
      duration: 'number',
      level: 'string',
      modules: 'array',
      prerequisites: 'array',
      tags: 'array',
      enrollments: 'number',
      rating: 'number',
      created: 'string'
    },
    defaults: {
      published: false,
      featured: false,
      instructor: 'Ridwanullah',
      created: getCurrentTimestamp(),
      enrollments: 0,
      rating: 0,
      modules: [],
      prerequisites: [],
      tags: []
    }
  },
  podcasts: {
    required: ['title', 'description', 'audioUrl'],
    types: {
      title: 'string',
      description: 'string',
      audioUrl: 'string',
      image: 'string',
      category: 'string',
      host: 'string',
      guests: 'array',
      duration: 'number',
      published: 'boolean',
      featured: 'boolean',
      tags: 'array',
      transcript: 'string',
      season: 'string',
      episode: 'number',
      plays: 'number',
      likes: 'number',
      created: 'string'
    },
    defaults: {
      published: false,
      featured: false,
      host: 'Ridwanullah',
      created: getCurrentTimestamp(),
      plays: 0,
      likes: 0,
      guests: [],
      tags: []
    }
  },
  tools: {
    required: ['name', 'description', 'category'],
    types: {
      name: 'string',
      description: 'string',
      category: 'string',
      url: 'string',
      icon: 'string',
      featured: 'boolean',
      active: 'boolean',
      price: 'string',
      tags: 'array',
      rating: 'number',
      reviews: 'number',
      created: 'string'
    },
    defaults: {
      featured: false,
      active: true,
      created: getCurrentTimestamp(),
      rating: 0,
      reviews: 0,
      tags: []
    }
  },
  services: {
    required: ['name', 'description', 'price'],
    types: {
      name: 'string',
      description: 'string',
      price: 'number',
      features: 'array',
      category: 'string',
      active: 'boolean',
      created: 'string'
    },
    defaults: {
      active: true,
      created: getCurrentTimestamp(),
      features: []
    }
  },
  orders: {
    required: ['clientName', 'clientEmail', 'service'],
    types: {
      clientName: 'string',
      clientEmail: 'string',
      service: 'string',
      amount: 'number',
      status: 'string',
      requirements: 'string',
      created: 'string'
    },
    defaults: {
      status: 'pending',
      amount: 0,
      created: getCurrentTimestamp()
    }
  },
  consultations: {
    required: ['title', 'description', 'duration'],
    types: {
      title: 'string',
      description: 'string',
      duration: 'number',
      price: 'number',
      category: 'string',
      available: 'boolean',
      image: 'string',
      features: 'array',
      bookingUrl: 'string',
      created: 'string'
    },
    defaults: {
      available: true,
      created: getCurrentTimestamp(),
      features: []
    }
  },
  toolkits: {
    required: ['name', 'description', 'category'],
    types: {
      name: 'string',
      description: 'string',
      category: 'string',
      price: 'number',
      image: 'string',
      downloadUrl: 'string',
      fileSize: 'string',
      fileType: 'string',
      includes: 'array',
      tags: 'array',
      featured: 'boolean',
      active: 'boolean',
      created: 'string'
    },
    defaults: {
      featured: false,
      active: true,
      created: getCurrentTimestamp(),
      includes: [],
      tags: []
    }
  },
  leadMagnets: {
    required: ['title', 'type', 'downloadUrl'],
    types: {
      title: 'string',
      description: 'string',
      type: 'string',
      downloadUrl: 'string',
      image: 'string',
      fileSize: 'string',
      pages: 'number',
      category: 'string',
      featured: 'boolean',
      active: 'boolean',
      downloads: 'number',
      created: 'string'
    },
    defaults: {
      featured: false,
      active: true,
      downloads: 0,
      created: getCurrentTimestamp()
    }
  },
  emailFlows: {
    required: ['name', 'trigger', 'emails'],
    types: {
      name: 'string',
      description: 'string',
      trigger: 'string',
      emails: 'array',
      active: 'boolean',
      subscribers: 'number',
      openRate: 'number',
      clickRate: 'number',
      created: 'string'
    },
    defaults: {
      active: true,
      subscribers: 0,
      openRate: 0,
      clickRate: 0,
      created: getCurrentTimestamp(),
      emails: []
    }
  }
};

// Define templates with proper typing
const appTemplates: AppTemplates = {
  contactEmail: `
    <h2>New Contact Message</h2>
    <p><strong>Name:</strong> {{name}}</p>
    <p><strong>Email:</strong> {{email}}</p>
    <p><strong>Service:</strong> {{service}}</p>
    <p><strong>Message:</strong></p>
    <p>{{message}}</p>
  `,
  orderConfirmation: `
    <h2>Order Confirmation</h2>
    <p>Hi {{clientName}},</p>
    <p>Thank you for your order! Here are the details:</p>
    <p><strong>Service:</strong> {{service}}</p>
    <p><strong>Amount:</strong> ${{amount}}</p>
    <p>We'll be in touch soon to discuss your requirements.</p>
  `,
  leadMagnetDelivery: `
    <h2>Your Free Resource is Ready!</h2>
    <p>Hi there,</p>
    <p>Thank you for downloading <strong>{{title}}</strong>!</p>
    <p><a href="{{downloadUrl}}" style="background: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Download Now</a></p>
    <p>Best regards,<br>Ridwanullah</p>
  `
};

// Configuration for the SDK with proper typing
const sdkConfig: UniversalSDKConfig = {
  owner: import.meta.env.VITE_GITHUB_OWNER || 'your-github-username',
  repo: import.meta.env.VITE_GITHUB_REPO || 'ridwan-brand-data',
  token: import.meta.env.VITE_GITHUB_TOKEN || 'your-github-token',
  branch: 'main',
  basePath: 'db',
  mediaPath: 'media',
  schemas: appSchemas,
  templates: appTemplates
};

// Initialize SDK instance
export const sdk = new UniversalSDK(sdkConfig);

// Initialize SDK on app start with proper error handling
sdk.init().catch((error: Error) => {
  console.error('Failed to initialize SDK:', error);
});

// Export types for use in other parts of the app
export type { AppSchemas, AppTemplates };

export default sdk;
