/**
 * Mobile API Service
 * 
 * Handles all API communication with the NextTern backend.
 * Includes MOCK MODE for testing without backend.
 */

import { Platform } from 'react-native';

// ============================================================================
// MOCK MODE - Set to true to test without backend
// ============================================================================
const MOCK_MODE = true;
const MOCK_DELAY = 600; // Simulate network delay in ms

// Determine the correct API URL based on platform and environment
const getApiBaseUrl = () => {
  if (Platform.OS === 'web') {
    return 'http://localhost:3001/api/v1';
  }
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:3001/api/v1';
  }
  if (Platform.OS === 'ios') {
    return 'http://localhost:3001/api/v1';
  }
  return 'http://localhost:3001/api/v1';
};

const API_BASE_URL = getApiBaseUrl();

// ============================================================================
// TYPES
// ============================================================================

export interface User {
  id: string;
  email: string;
  role: 'STUDENT' | 'RECRUITER' | null;
  emailVerified: boolean;
  onboardingComplete: boolean;
  profile?: any;
}

export interface AuthResponse {
  success: boolean;
  user: User;
  token: string;
  devToken?: string;
  message?: string;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  duration: string;
  salary: string;
  description: string;
  requirements: string[];
  postedDate: string;
}

export interface Conversation {
  id: string;
  participantName: string;
  participantId: string;
  jobTitle: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  content: string;
  timestamp: string;
}

export interface SwipeCard {
  id: string;
  name: string;
  subtitle: string;
  location: string;
  description: string;
  tags: string[];
  type: 'candidate' | 'job';
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  candidateId?: string;
  candidateName?: string;
  status: string;
  stage: string;
  appliedDate: string;
  lastUpdate?: string;
}

export interface DashboardStats {
  totalApplications: number;
  activeJobs: number;
  matches: number;
  interviews: number;
  pendingReviews: number;
}

// ============================================================================
// MOCK DATA
// ============================================================================

const mockUsers: Record<string, User> = {
  'student@demo.nexttern.com': {
    id: 'mock-student-001',
    email: 'student@demo.nexttern.com',
    role: 'STUDENT',
    emailVerified: true,
    onboardingComplete: true,
  },
  'recruiter@demo.nexttern.com': {
    id: 'mock-recruiter-001',
    email: 'recruiter@demo.nexttern.com',
    role: 'RECRUITER',
    emailVerified: true,
    onboardingComplete: true,
  },
};

const mockJobs: Job[] = [
  {
    id: 'job-001',
    title: 'Software Engineering Intern',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    type: 'Full-time',
    duration: '3 months',
    salary: '$30/hr',
    description: 'Join our engineering team to build scalable web applications. You will work closely with senior engineers on real projects.',
    requirements: ['JavaScript', 'React', 'Node.js'],
    postedDate: '2 days ago',
  },
  {
    id: 'job-002',
    title: 'Product Design Intern',
    company: 'DesignStudio',
    location: 'New York, NY',
    type: 'Part-time',
    duration: '6 months',
    salary: '$25/hr',
    description: 'Work with our design team to create user-centered experiences for our flagship products.',
    requirements: ['Figma', 'UI/UX', 'Prototyping'],
    postedDate: '1 week ago',
  },
  {
    id: 'job-003',
    title: 'Data Science Intern',
    company: 'DataDriven AI',
    location: 'Remote',
    type: 'Full-time',
    duration: '4 months',
    salary: '$35/hr',
    description: 'Help analyze large datasets and build machine learning models to solve real business problems.',
    requirements: ['Python', 'SQL', 'Machine Learning'],
    postedDate: '3 days ago',
  },
  {
    id: 'job-004',
    title: 'Marketing Intern',
    company: 'GrowthLabs',
    location: 'Austin, TX',
    type: 'Full-time',
    duration: '3 months',
    salary: '$22/hr',
    description: 'Support our marketing team in creating campaigns and analyzing performance metrics.',
    requirements: ['Social Media', 'Analytics', 'Content Writing'],
    postedDate: '5 days ago',
  },
];

const mockConversations: Conversation[] = [
  {
    id: 'conv-001',
    participantName: 'Sarah Chen',
    participantId: 'user-sarah',
    jobTitle: 'Software Engineering Intern',
    lastMessage: 'Looking forward to our interview next week!',
    lastMessageTime: '2h ago',
    unreadCount: 2,
  },
  {
    id: 'conv-002',
    participantName: 'Mike Johnson',
    participantId: 'user-mike',
    jobTitle: 'Product Design Intern',
    lastMessage: 'Thank you for your application. We would like to...',
    lastMessageTime: '1d ago',
    unreadCount: 0,
  },
  {
    id: 'conv-003',
    participantName: 'Emily Wong',
    participantId: 'user-emily',
    jobTitle: 'Data Science Intern',
    lastMessage: 'Could you share your portfolio?',
    lastMessageTime: '3d ago',
    unreadCount: 1,
  },
];

const mockMessages: Record<string, Message[]> = {
  'conv-001': [
    { id: 'msg-001', conversationId: 'conv-001', senderId: 'user-sarah', content: 'Hi! Thanks for applying to our Software Engineering position.', timestamp: '10:30 AM' },
    { id: 'msg-002', conversationId: 'conv-001', senderId: 'mock-student-001', content: 'Thank you for considering my application!', timestamp: '10:45 AM' },
    { id: 'msg-003', conversationId: 'conv-001', senderId: 'user-sarah', content: 'We were impressed by your portfolio. Would you be available for an interview?', timestamp: '11:00 AM' },
    { id: 'msg-004', conversationId: 'conv-001', senderId: 'mock-student-001', content: 'Yes, I would be happy to interview. What times work for you?', timestamp: '11:15 AM' },
    { id: 'msg-005', conversationId: 'conv-001', senderId: 'user-sarah', content: 'Looking forward to our interview next week!', timestamp: '11:30 AM' },
  ],
  'conv-002': [
    { id: 'msg-006', conversationId: 'conv-002', senderId: 'user-mike', content: 'Thank you for your application. We would like to learn more about your design experience.', timestamp: 'Yesterday' },
  ],
  'conv-003': [
    { id: 'msg-007', conversationId: 'conv-003', senderId: 'user-emily', content: 'Could you share your portfolio?', timestamp: '3 days ago' },
  ],
};

const mockCandidateCards: SwipeCard[] = [
  {
    id: 'candidate-001',
    name: 'Alex Rivera',
    subtitle: 'Computer Science - Stanford University',
    location: 'San Francisco, CA',
    description: 'Passionate about building products that make a difference. Experience with React, Node.js, and Python. Previously interned at a Y Combinator startup.',
    tags: ['React', 'Node.js', 'Python', 'AWS'],
    type: 'candidate',
  },
  {
    id: 'candidate-002',
    name: 'Jordan Kim',
    subtitle: 'Data Science - MIT',
    location: 'Boston, MA',
    description: 'Data enthusiast with strong background in machine learning and statistical analysis. Research experience in NLP.',
    tags: ['Python', 'TensorFlow', 'SQL', 'NLP'],
    type: 'candidate',
  },
  {
    id: 'candidate-003',
    name: 'Sam Patel',
    subtitle: 'UX Design - Parsons School of Design',
    location: 'New York, NY',
    description: 'Creative designer focused on creating intuitive user experiences. Skilled in user research and prototyping.',
    tags: ['Figma', 'User Research', 'Prototyping', 'UI Design'],
    type: 'candidate',
  },
  {
    id: 'candidate-004',
    name: 'Taylor Morgan',
    subtitle: 'Business Analytics - Wharton',
    location: 'Philadelphia, PA',
    description: 'Analytical thinker with experience in product management and growth strategy. Strong communication skills.',
    tags: ['Analytics', 'Strategy', 'Excel', 'Tableau'],
    type: 'candidate',
  },
];

const mockJobCards: SwipeCard[] = [
  {
    id: 'jobcard-001',
    name: 'TechCorp Inc.',
    subtitle: 'Software Engineering Intern',
    location: 'San Francisco, CA',
    description: 'Join our engineering team to build scalable web applications. Work on real projects with senior engineers. Great mentorship program.',
    tags: ['React', 'Node.js', 'TypeScript', 'AWS'],
    type: 'job',
  },
  {
    id: 'jobcard-002',
    name: 'DesignStudio',
    subtitle: 'Product Design Intern',
    location: 'New York, NY',
    description: 'Create user-centered experiences for our flagship products. Collaborate with product and engineering teams.',
    tags: ['Figma', 'UI/UX', 'Prototyping', 'Research'],
    type: 'job',
  },
  {
    id: 'jobcard-003',
    name: 'DataDriven AI',
    subtitle: 'Data Science Intern',
    location: 'Remote',
    description: 'Analyze large datasets and build ML models. Work on cutting-edge AI projects with industry experts.',
    tags: ['Python', 'ML', 'SQL', 'TensorFlow'],
    type: 'job',
  },
  {
    id: 'jobcard-004',
    name: 'GrowthLabs',
    subtitle: 'Marketing Intern',
    location: 'Austin, TX',
    description: 'Drive growth through creative marketing campaigns. Learn from experienced marketers in a fast-paced environment.',
    tags: ['Marketing', 'Analytics', 'Social Media', 'Content'],
    type: 'job',
  },
];

const mockApplicationsStudent: Application[] = [
  {
    id: 'app-001',
    jobId: 'job-001',
    jobTitle: 'Software Engineering Intern',
    company: 'TechCorp Inc.',
    status: 'Interview',
    stage: 'Technical Interview',
    appliedDate: '1 week ago',
    lastUpdate: '2 days ago',
  },
  {
    id: 'app-002',
    jobId: 'job-002',
    jobTitle: 'Product Design Intern',
    company: 'DesignStudio',
    status: 'Reviewing',
    stage: 'Portfolio Review',
    appliedDate: '2 weeks ago',
    lastUpdate: '3 days ago',
  },
  {
    id: 'app-003',
    jobId: 'job-003',
    jobTitle: 'Data Science Intern',
    company: 'DataDriven AI',
    status: 'Pending',
    stage: 'Initial Screening',
    appliedDate: '3 days ago',
  },
  {
    id: 'app-004',
    jobId: 'job-005',
    jobTitle: 'Frontend Developer Intern',
    company: 'WebFlow',
    status: 'Offered',
    stage: 'Offer Extended',
    appliedDate: '3 weeks ago',
    lastUpdate: '1 day ago',
  },
  {
    id: 'app-005',
    jobId: 'job-006',
    jobTitle: 'Backend Developer Intern',
    company: 'CloudBase',
    status: 'Rejected',
    stage: 'Closed',
    appliedDate: '1 month ago',
    lastUpdate: '2 weeks ago',
  },
];

const mockApplicationsRecruiter: Application[] = [
  {
    id: 'rapp-001',
    jobId: 'job-001',
    jobTitle: 'Software Engineering Intern',
    company: 'TechCorp Inc.',
    candidateId: 'candidate-001',
    candidateName: 'Alex Rivera',
    status: 'Interview',
    stage: 'Technical Interview',
    appliedDate: '5 days ago',
    lastUpdate: '1 day ago',
  },
  {
    id: 'rapp-002',
    jobId: 'job-001',
    jobTitle: 'Software Engineering Intern',
    company: 'TechCorp Inc.',
    candidateId: 'candidate-002',
    candidateName: 'Jordan Kim',
    status: 'Reviewing',
    stage: 'Resume Review',
    appliedDate: '1 week ago',
    lastUpdate: '2 days ago',
  },
  {
    id: 'rapp-003',
    jobId: 'job-001',
    jobTitle: 'Software Engineering Intern',
    company: 'TechCorp Inc.',
    candidateId: 'candidate-003',
    candidateName: 'Sam Patel',
    status: 'Pending',
    stage: 'New Application',
    appliedDate: '2 days ago',
  },
];

const mockDelay = () => new Promise(resolve => setTimeout(resolve, MOCK_DELAY));

// ============================================================================
// API SERVICE
// ============================================================================

class ApiService {
  private token: string | null = null;
  private currentUser: User | null = null;

  setToken(token: string | null) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }

  setCurrentUser(user: User | null) {
    this.currentUser = user;
  }

  getCurrentUserData() {
    return this.currentUser;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      (headers as Record<string, string>)['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Request failed');
      }

      return data as T;
    } catch (error) {
      if (error instanceof TypeError && error.message === 'Network request failed') {
        throw new Error('Unable to connect to server. Please check your connection.');
      }
      throw error;
    }
  }

  // ==========================================================================
  // AUTH
  // ==========================================================================

  async requestMagicLink(email: string, role?: 'STUDENT' | 'RECRUITER'): Promise<AuthResponse> {
    if (MOCK_MODE) {
      await mockDelay();
      return {
        success: true,
        user: { id: '', email, role: role || null, emailVerified: false, onboardingComplete: false },
        token: '',
        message: 'Magic link sent (mock)',
        devToken: 'mock-token-12345',
      };
    }
    return this.request<AuthResponse>('/auth/request', {
      method: 'POST',
      body: JSON.stringify({ email, role }),
    });
  }

  async verifyMagicLink(token: string, role?: 'STUDENT' | 'RECRUITER'): Promise<AuthResponse> {
    if (MOCK_MODE) {
      await mockDelay();
      const mockUser: User = {
        id: 'mock-user-' + Date.now(),
        email: 'verified@demo.nexttern.com',
        role: role || 'STUDENT',
        emailVerified: true,
        onboardingComplete: true,
      };
      const mockToken = 'mock-jwt-token-' + Date.now();
      this.setToken(mockToken);
      this.currentUser = mockUser;
      return { success: true, user: mockUser, token: mockToken };
    }
    
    const response = await this.request<AuthResponse>('/auth/verify', {
      method: 'POST',
      body: JSON.stringify({ token, role }),
    });
    
    if (response.token) {
      this.setToken(response.token);
    }
    
    return response;
  }

  async demoLogin(email: string, role: 'STUDENT' | 'RECRUITER' = 'STUDENT'): Promise<AuthResponse> {
    if (MOCK_MODE) {
      await mockDelay();
      
      const existingUser = mockUsers[email];
      const mockUser: User = existingUser || {
        id: role === 'RECRUITER' ? 'mock-recruiter-001' : 'mock-student-001',
        email: email,
        role: role,
        emailVerified: true,
        onboardingComplete: true,
      };
      
      const mockToken = 'mock-jwt-token-' + Date.now();
      this.setToken(mockToken);
      this.currentUser = mockUser;
      
      console.log('[MOCK API] Demo login:', mockUser);
      return { success: true, user: mockUser, token: mockToken };
    }
    
    const response = await this.request<AuthResponse>('/auth/demo-login', {
      method: 'POST',
      body: JSON.stringify({ email, role }),
    });
    
    if (response.token) {
      this.setToken(response.token);
    }
    
    return response;
  }

  async logout(): Promise<void> {
    if (MOCK_MODE) {
      await mockDelay();
      this.setToken(null);
      this.currentUser = null;
      console.log('[MOCK API] Logged out');
      return;
    }
    await this.request('/auth/logout', { method: 'POST' });
    this.setToken(null);
    this.currentUser = null;
  }

  async getCurrentUser(): Promise<{ user: User }> {
    if (MOCK_MODE) {
      await mockDelay();
      if (this.token && this.currentUser) {
        return { user: this.currentUser };
      }
      if (this.token) {
        return {
          user: {
            id: 'mock-user-restored',
            email: 'restored@demo.nexttern.com',
            role: 'STUDENT',
            emailVerified: true,
            onboardingComplete: true,
          },
        };
      }
      throw new Error('Not authenticated');
    }
    return this.request<{ user: User }>('/auth/me');
  }

  async selectRole(role: 'STUDENT' | 'RECRUITER'): Promise<{ success: boolean; user: User }> {
    if (MOCK_MODE) {
      await mockDelay();
      return {
        success: true,
        user: {
          id: 'mock-user-role',
          email: 'user@demo.nexttern.com',
          role: role,
          emailVerified: true,
          onboardingComplete: false,
        },
      };
    }
    return this.request('/auth/select-role', {
      method: 'POST',
      body: JSON.stringify({ role }),
    });
  }

  // ==========================================================================
  // JOBS
  // ==========================================================================

  async getJobs(): Promise<{ jobs: Job[] }> {
    if (MOCK_MODE) {
      await mockDelay();
      return { jobs: mockJobs };
    }
    return this.request<{ jobs: Job[] }>('/internships');
  }

  async getJob(id: string): Promise<{ job: Job }> {
    if (MOCK_MODE) {
      await mockDelay();
      const job = mockJobs.find(j => j.id === id);
      if (!job) throw new Error('Job not found');
      return { job };
    }
    return this.request<{ job: Job }>(`/internships/${id}`);
  }

  // ==========================================================================
  // CONVERSATIONS & MESSAGES
  // ==========================================================================

  async getConversations(): Promise<{ conversations: Conversation[] }> {
    if (MOCK_MODE) {
      await mockDelay();
      return { conversations: mockConversations };
    }
    return this.request<{ conversations: Conversation[] }>('/chat/conversations');
  }

  async getMessages(conversationId: string): Promise<{ messages: Message[] }> {
    if (MOCK_MODE) {
      await mockDelay();
      return { messages: mockMessages[conversationId] || [] };
    }
    return this.request<{ messages: Message[] }>(`/chat/conversations/${conversationId}/messages`);
  }

  async sendMessage(conversationId: string, content: string): Promise<{ message: Message }> {
    if (MOCK_MODE) {
      await mockDelay();
      const newMessage: Message = {
        id: 'msg-' + Date.now(),
        conversationId,
        senderId: this.currentUser?.id || 'mock-student-001',
        content,
        timestamp: 'Just now',
      };
      if (mockMessages[conversationId]) {
        mockMessages[conversationId].push(newMessage);
      }
      return { message: newMessage };
    }
    return this.request<{ message: Message }>(`/chat/conversations/${conversationId}/messages`, {
      method: 'POST',
      body: JSON.stringify({ content }),
    });
  }

  // ==========================================================================
  // SWIPE
  // ==========================================================================

  async getSwipeCards(type: 'candidates' | 'jobs'): Promise<{ cards: SwipeCard[] }> {
    if (MOCK_MODE) {
      await mockDelay();
      return { cards: type === 'candidates' ? mockCandidateCards : mockJobCards };
    }
    return this.request<{ cards: SwipeCard[] }>(`/discovery/${type}`);
  }

  async swipe(cardId: string, action: 'like' | 'pass'): Promise<{ success: boolean; match: boolean }> {
    if (MOCK_MODE) {
      await mockDelay();
      const isMatch = action === 'like' && Math.random() > 0.7;
      return { success: true, match: isMatch };
    }
    return this.request<{ success: boolean; match: boolean }>('/interest/swipe', {
      method: 'POST',
      body: JSON.stringify({ cardId, action }),
    });
  }

  // ==========================================================================
  // APPLICATIONS
  // ==========================================================================

  async getApplications(): Promise<{ applications: Application[] }> {
    if (MOCK_MODE) {
      await mockDelay();
      const isRecruiter = this.currentUser?.role === 'RECRUITER';
      return { applications: isRecruiter ? mockApplicationsRecruiter : mockApplicationsStudent };
    }
    return this.request<{ applications: Application[] }>('/pipeline/applications');
  }

  async getApplication(id: string): Promise<{ application: Application }> {
    if (MOCK_MODE) {
      await mockDelay();
      const isRecruiter = this.currentUser?.role === 'RECRUITER';
      const apps = isRecruiter ? mockApplicationsRecruiter : mockApplicationsStudent;
      const application = apps.find(a => a.id === id);
      if (!application) throw new Error('Application not found');
      return { application };
    }
    return this.request<{ application: Application }>(`/pipeline/applications/${id}`);
  }

  // ==========================================================================
  // DASHBOARD
  // ==========================================================================

  async getDashboardStats(): Promise<{ stats: DashboardStats }> {
    if (MOCK_MODE) {
      await mockDelay();
      const isRecruiter = this.currentUser?.role === 'RECRUITER';
      return {
        stats: {
          totalApplications: isRecruiter ? 45 : 12,
          activeJobs: isRecruiter ? 8 : 0,
          matches: isRecruiter ? 23 : 5,
          interviews: isRecruiter ? 12 : 2,
          pendingReviews: isRecruiter ? 15 : 0,
        },
      };
    }
    return this.request<{ stats: DashboardStats }>('/dashboard/stats');
  }

  // ==========================================================================
  // HEALTH CHECK
  // ==========================================================================

  async healthCheck(): Promise<{ status: string; version: string }> {
    if (MOCK_MODE) {
      await mockDelay();
      return { status: 'ok', version: 'mock-v1' };
    }
    return this.request('/health');
  }
}

export const api = new ApiService();
export const isMockMode = () => MOCK_MODE;
