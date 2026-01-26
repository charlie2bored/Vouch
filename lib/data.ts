import { Bounty, Profile, VouchScore } from '@/types';

export const sampleBounties: Bounty[] = [
  {
    id: '1',
    title: 'Spotify Data Analysis',
    description: 'Analyze Spotify streaming data to identify top genres and artist trends. Clean the dataset, perform exploratory analysis, and create visualizations showing the top 5 genres by streaming hours.',
    company: 'Spotify',
    company_logo: '/spotify-logo.png',
    raw_data_url: '/sample-data/spotify-data.csv',
    reward_xp: 500,
    difficulty: 'intermediate',
    category: 'data',
    deadline: '2024-02-15T23:59:59Z',
    status: 'active',
  },
  {
    id: '2',
    title: 'E-commerce Dashboard Design',
    description: 'Design a modern dashboard interface for an e-commerce analytics platform. Create wireframes and high-fidelity mockups showing key metrics like revenue, conversion rates, and customer behavior.',
    company: 'ShopFlow',
    company_logo: '/shopflow-logo.png',
    raw_data_url: undefined,
    reward_xp: 750,
    difficulty: 'intermediate',
    category: 'design',
    deadline: '2024-02-20T23:59:59Z',
    status: 'active',
  },
  {
    id: '3',
    title: 'API Integration Service',
    description: 'Build a RESTful API service that integrates with multiple third-party APIs. Implement proper error handling, authentication, and rate limiting. Include comprehensive documentation.',
    company: 'TechCorp',
    company_logo: '/techcorp-logo.png',
    raw_data_url: undefined,
    reward_xp: 1000,
    difficulty: 'advanced',
    category: 'engineering',
    deadline: '2024-02-25T23:59:59Z',
    status: 'active',
  },
  {
    id: '4',
    title: 'Customer Survey Analysis',
    description: 'Analyze customer survey responses to identify key insights and trends. Perform sentiment analysis, create summary statistics, and generate a report with actionable recommendations.',
    company: 'SurveyPro',
    company_logo: '/surveypro-logo.png',
    raw_data_url: '/sample-data/survey-data.csv',
    reward_xp: 400,
    difficulty: 'beginner',
    category: 'data',
    deadline: '2024-02-10T23:59:59Z',
    status: 'active',
  },
  {
    id: '5',
    title: 'Mobile App Wireframes',
    description: 'Create wireframes for a fitness tracking mobile application. Design user flows for workout logging, progress tracking, and social features. Include annotations for interactions.',
    company: 'FitTrack',
    company_logo: '/fittrack-logo.png',
    raw_data_url: undefined,
    reward_xp: 600,
    difficulty: 'beginner',
    category: 'design',
    deadline: '2024-02-18T23:59:59Z',
    status: 'active',
  },
  {
    id: '6',
    title: 'Database Optimization',
    description: 'Optimize a PostgreSQL database for a high-traffic web application. Create indexes, analyze query performance, and implement caching strategies to improve response times.',
    company: 'DataFlow',
    company_logo: '/dataflow-logo.png',
    raw_data_url: undefined,
    reward_xp: 900,
    difficulty: 'advanced',
    category: 'engineering',
    deadline: '2024-03-01T23:59:59Z',
    status: 'active',
  },
];

export const sampleUser: Profile = {
  id: 'user-1',
  email: 'student@example.com',
  role: 'student',
  vouch_score: 1250,
};

export const sampleVouchScore: VouchScore = {
  total: 1250,
  categories: {
    data: 450,
    design: 300,
    engineering: 500,
  },
};

export const categories = ['data', 'design', 'engineering'] as const;
export const difficulties = ['beginner', 'intermediate', 'advanced'] as const;

