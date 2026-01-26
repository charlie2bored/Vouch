# Environment Variables

To run this application, you'll need to set up the following environment variables:

## Required

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_supabase_publishable_key_here
```

## Optional

```bash
OPENAI_API_KEY=your_openai_api_key_here  # For future AI grading integration
```

## Getting Supabase Credentials

1. Go to your Supabase project dashboard
2. Navigate to Settings > API
3. Copy the Project URL and anon/public key

## Database Schema

Make sure your Supabase database has these tables:

### profiles
- id (uuid, primary key)
- email (text)
- role (text: 'student' | 'company' | 'admin')
- vouch_score (integer, default: 0)

### bounties
- id (uuid, primary key)
- title (text)
- description (text)
- company (text)
- company_logo (text, optional)
- raw_data_url (text, optional)
- reward_xp (integer)
- difficulty (text: 'beginner' | 'intermediate' | 'advanced')
- category (text: 'data' | 'design' | 'engineering')
- deadline (timestamptz)
- status (text: 'active' | 'completed' | 'expired', default: 'active')
- gold_standard_key (text, optional) - for AI grading

### submissions
- id (uuid, primary key)
- user_id (uuid, foreign key to profiles)
- bounty_id (uuid, foreign key to bounties)
- file_url (text)
- ai_grade_json (jsonb, optional)
- status (text: 'submitted' | 'graded' | 'approved' | 'rejected', default: 'submitted')
- submitted_at (timestamptz, default: now())
