
import UniversalSDK from './sdk';

// Configuration for the SDK - replace with your actual GitHub repo details
const sdkConfig = {
  owner: 'your-github-username', // Replace with your GitHub username
  repo: 'ridwan-brand-data', // Replace with your GitHub repo name
  token: 'your-github-token', // Replace with your GitHub personal access token
  branch: 'main',
  basePath: 'db',
  mediaPath: 'media',
  schemas: {
    contacts: {
      required: ['name', 'email', 'message'],
      types: {
        name: 'string',
        email: 'string',
        message: 'string',
        service: 'string',
        phone: 'string',
        company: 'string'
      },
      defaults: {
        status: 'new',
        created: new Date().toISOString()
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
        url: 'string'
      },
      defaults: {
        featured: false,
        created: new Date().toISOString()
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
        published: 'boolean'
      },
      defaults: {
        published: false,
        author: 'Ridwanullah',
        created: new Date().toISOString()
      }
    },
    services: {
      required: ['name', 'description', 'price'],
      types: {
        name: 'string',
        description: 'string',
        price: 'number',
        features: 'array',
        category: 'string'
      },
      defaults: {
        active: true,
        created: new Date().toISOString()
      }
    },
    orders: {
      required: ['clientName', 'clientEmail', 'service', 'totalAmount'],
      types: {
        clientName: 'string',
        clientEmail: 'string',
        service: 'string',
        totalAmount: 'number',
        status: 'string',
        requirements: 'string'
      },
      defaults: {
        status: 'pending',
        totalAmount: 0,
        created: new Date().toISOString()
      }
    }
  },
  templates: {
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
      <p><strong>Amount:</strong> ${{totalAmount}}</p>
      <p>We'll be in touch soon to discuss your requirements.</p>
    `
  }
};

// Initialize SDK instance
export const sdk = new UniversalSDK(sdkConfig);

// Initialize SDK on app start
sdk.init().catch(console.error);

export default sdk;
