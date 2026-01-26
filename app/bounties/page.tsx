'use client';

import { useState, useMemo, useEffect } from 'react';
import { categories } from '@/lib/data';
import { createClient } from '@/lib/supabase/client';
import { BountyCard } from '@/components/bounty-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Filter, Loader2 } from 'lucide-react';
import type { Bounty } from '@/types';

export default function BountiesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'deadline' | 'reward' | 'difficulty'>('deadline');
  const [bounties, setBounties] = useState<Bounty[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch bounties from Supabase
  useEffect(() => {
    const fetchBounties = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('bounties')
          .select('*');

        if (error) {
          console.error('Error fetching bounties:', error);
          return;
        }

        // Transform data to match Bounty interface
        const transformedData = (data || []).map(item => ({
          id: item.id?.toString() || '',
          title: item.title || '',
          description: item.description || '',
          company: item.company_name || item.company || '', // Handle both field names
          company_logo: item.company_logo,
          raw_data_url: item.raw_data_url,
          reward_xp: item.reward_xp || 0,
          difficulty: (item.difficulty || 'beginner').toLowerCase() as 'beginner' | 'intermediate' | 'advanced',
          category: (item.category || 'data').toLowerCase() as 'data' | 'design' | 'engineering',
          deadline: item.deadline || '',
          status: item.status || 'active',
          created_at: item.created_at,
          updated_at: item.updated_at
        }));

        setBounties(transformedData);
      } catch (error) {
        console.error('Error fetching bounties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBounties();
  }, []);

  // Filter and sort bounties
  const filteredAndSortedBounties = useMemo(() => {
    let filtered = selectedCategory === 'all'
      ? bounties
      : bounties.filter(bounty => bounty.category === selectedCategory);

    // Sort bounties
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'deadline':
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        case 'reward':
          return b.reward_xp - a.reward_xp;
        case 'difficulty':
          const difficultyOrder = { beginner: 1, intermediate: 2, advanced: 3 };
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        default:
          return 0;
      }
    });

    return filtered;
  }, [selectedCategory, sortBy, bounties]);

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'data': return 'Data Analysis';
      case 'design': return 'Design';
      case 'engineering': return 'Engineering';
      default: return category;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-vouch-navy sm:text-4xl">
              Available Bounties
            </h1>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from real-world projects posted by companies. Complete bounties to earn XP and build your Vouch Score.
            </p>
          </div>

          {/* Filters */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filter by:</span>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('all')}
                className={selectedCategory === 'all' ? 'bg-vouch-blue' : ''}
              >
                All Categories
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? 'bg-vouch-blue' : ''}
                >
                  {getCategoryLabel(category)}
                </Button>
              ))}
            </div>
          </div>

          {/* Sort Options */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <span className="text-sm font-medium text-gray-700">Sort by:</span>
            <div className="flex gap-2">
              {[
                { value: 'deadline', label: 'Deadline' },
                { value: 'reward', label: 'Reward' },
                { value: 'difficulty', label: 'Difficulty' },
              ].map((option) => (
                <Button
                  key={option.value}
                  variant={sortBy === option.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSortBy(option.value as any)}
                  className={sortBy === option.value ? 'bg-vouch-blue' : ''}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bounty Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-vouch-blue" />
            <span className="ml-2 text-gray-600">Loading bounties...</span>
          </div>
        ) : (
          <>
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing {filteredAndSortedBounties.length} bounties
                {selectedCategory !== 'all' && (
                  <span> in <Badge variant="category" className="ml-1">
                    {getCategoryLabel(selectedCategory)}
                  </Badge></span>
                )}
              </p>
            </div>

            {filteredAndSortedBounties.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Filter className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No bounties found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your filters or check back later for new opportunities.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAndSortedBounties.map((bounty) => (
                  <BountyCard key={bounty.id} bounty={bounty} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}