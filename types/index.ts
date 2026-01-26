export interface Profile {
  id: string;
  email: string;
  role: 'student' | 'company' | 'admin';
  vouch_score: number;
  created_at?: string;
  updated_at?: string;
}

export interface Bounty {
  id: string;
  title: string;
  description: string;
  company: string;
  company_logo?: string;
  raw_data_url?: string;
  reward_xp: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: 'data' | 'design' | 'engineering';
  deadline: string;
  status: 'active' | 'completed' | 'expired';
  created_at?: string;
  updated_at?: string;
}

export interface Submission {
  id: string;
  user_id: string;
  bounty_id: string;
  file_url: string;
  ai_grade_json?: string;
  status: 'submitted' | 'graded' | 'approved' | 'rejected';
  submitted_at: string;
}

export interface VouchScore {
  total: number;
  categories: {
    data: number;
    design: number;
    engineering: number;
  };
}

