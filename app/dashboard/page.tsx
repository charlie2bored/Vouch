'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { sampleBounties } from '@/lib/data';
import { createClient } from '@/lib/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Home,
  Briefcase,
  FolderOpen,
  Settings,
  Trophy,
  Clock,
  TrendingUp,
  Award,
  Loader2
} from 'lucide-react';
import type { Profile, VouchScore } from '@/types';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home, current: true },
  { name: 'Bounties', href: '/bounties', icon: Briefcase, current: false },
  { name: 'My Portfolio', href: '/portfolio', icon: FolderOpen, current: false },
  { name: 'Settings', href: '/settings', icon: Settings, current: false },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState<Profile | null>(null);
  const [vouchScore, setVouchScore] = useState<VouchScore | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const supabase = createClient();

        // For now, we'll simulate a logged-in user with ID 'user-1'
        // In a real app, this would come from auth context
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', 'user-1')
          .single();

        if (profileError) {
          console.error('Error fetching profile:', profileError);
          return;
        }

        setUser(profile);

        // Create a mock vouch score based on the profile
        // In a real app, this might be calculated or stored separately
        setVouchScore({
          total: profile.vouch_score,
          categories: {
            data: Math.floor(profile.vouch_score * 0.4),
            design: Math.floor(profile.vouch_score * 0.25),
            engineering: Math.floor(profile.vouch_score * 0.35),
          },
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Get active bounties (in real app, this would be user's active submissions)
  const activeBounties = sampleBounties.slice(0, 3);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-vouch-blue mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user || !vouchScore) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Unable to load dashboard data.</p>
        </div>
      </div>
    );
  }

  const VouchScoreRadar = () => {
    // Simple radar chart visualization using SVG
    const categories = ['Data', 'Design', 'Engineering'];
    const scores = [
      vouchScore.categories.data,
      vouchScore.categories.design,
      vouchScore.categories.engineering
    ];
    const maxScore = 500; // Assuming max score per category

    // Calculate points for radar chart
    const centerX = 120;
    const centerY = 120;
    const radius = 80;

    const points = scores.map((score, index) => {
      const angle = (index * 360) / categories.length - 90; // Start from top
      const scoreRadius = (score / maxScore) * radius;
      const x = centerX + scoreRadius * Math.cos(angle * Math.PI / 180);
      const y = centerY + scoreRadius * Math.sin(angle * Math.PI / 180);
      return `${x},${y}`;
    }).join(' ');

    return (
      <div className="flex flex-col items-center">
        <svg width="240" height="240" className="mb-4">
          {/* Background grid */}
          <polygon
            points={categories.map((_, index) => {
              const angle = (index * 360) / categories.length - 90;
              const x = centerX + radius * Math.cos(angle * Math.PI / 180);
              const y = centerY + radius * Math.sin(angle * Math.PI / 180);
              return `${x},${y}`;
            }).join(' ')}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="1"
          />

          {/* Data polygon */}
          <polygon
            points={points}
            fill="#2F80ED"
            fillOpacity="0.2"
            stroke="#2F80ED"
            strokeWidth="2"
          />

          {/* Center dot */}
          <circle cx={centerX} cy={centerY} r="3" fill="#2F80ED" />

          {/* Category labels */}
          {categories.map((category, index) => {
            const angle = (index * 360) / categories.length - 90;
            const x = centerX + (radius + 20) * Math.cos(angle * Math.PI / 180);
            const y = centerY + (radius + 20) * Math.sin(angle * Math.PI / 180);
            return (
              <text
                key={category}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs font-medium fill-gray-600"
              >
                {category}
              </text>
            );
          })}
        </svg>

        <div className="grid grid-cols-3 gap-4 w-full">
          {categories.map((category, index) => (
            <div key={category} className="text-center">
              <div className="text-lg font-bold text-vouch-navy">{scores[index]}</div>
              <div className="text-xs text-gray-600">{category}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:flex md:w-64 md:flex-col">
          <div className="flex flex-col flex-grow pt-5 bg-white overflow-y-auto border-r border-gray-200">
            <div className="flex items-center flex-shrink-0 px-4 mb-8">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Award className="h-8 w-8 text-vouch-blue" />
                </div>
                <div className="ml-3">
                  <p className="text-xl font-bold text-vouch-navy">VOUCH</p>
                </div>
              </div>
            </div>

            <div className="mt-5 flex-grow flex flex-col">
              <nav className="flex-1 px-2 pb-4 space-y-1">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`${
                        item.current
                          ? 'bg-vouch-blue text-white'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      } group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors`}
                    >
                      <Icon
                        className={`${
                          item.current ? 'text-white' : 'text-gray-400 group-hover:text-gray-500'
                        } mr-3 flex-shrink-0 h-5 w-5`}
                      />
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* User Profile Section */}
            <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-vouch-blue flex items-center justify-center">
                    <span className="text-sm font-medium text-white">
                      {user.email.charAt(0).toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                    {user.email.split('@')[0]}
                  </p>
                  <p className="text-xs text-gray-500">{user.vouch_score} XP</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1">
          <main className="flex-1">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                <h1 className="text-2xl font-semibold text-vouch-navy">Dashboard</h1>

                {/* Stats Overview */}
                <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <Trophy className="h-6 w-6 text-vouch-blue" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">
                              Total Vouch Score
                            </dt>
                            <dd className="text-lg font-medium text-vouch-navy">
                              {vouchScore.total} XP
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <Briefcase className="h-6 w-6 text-green-500" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">
                              Active Bounties
                            </dt>
                            <dd className="text-lg font-medium text-vouch-navy">
                              {activeBounties.length}
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <TrendingUp className="h-6 w-6 text-yellow-500" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">
                              Completed This Month
                            </dt>
                            <dd className="text-lg font-medium text-vouch-navy">
                              3
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <Clock className="h-6 w-6 text-red-500" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">
                              Upcoming Deadlines
                            </dt>
                            <dd className="text-lg font-medium text-vouch-navy">
                              2
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                  {/* Vouch Score Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Vouch Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <VouchScoreRadar />
                    </CardContent>
                  </Card>

                  {/* Active Bounties */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle>Active Bounties</CardTitle>
                        <Link href="/bounties">
                          <Button variant="outline" size="sm">
                            View All
                          </Button>
                        </Link>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {activeBounties.map((bounty) => (
                          <div key={bounty.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                            <div className="flex-shrink-0">
                              <div className="h-10 w-10 bg-vouch-blue rounded-lg flex items-center justify-center">
                                <Briefcase className="h-5 w-5 text-white" />
                              </div>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-vouch-navy truncate">
                                {bounty.title}
                              </p>
                              <p className="text-sm text-gray-500 truncate">
                                {bounty.company} • {bounty.reward_xp} XP
                              </p>
                            </div>
                            <div className="flex-shrink-0">
                              <Badge variant="difficulty" className="capitalize">
                                {bounty.difficulty}
                              </Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
