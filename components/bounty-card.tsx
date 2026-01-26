import Link from 'next/link';
import { Bounty } from '@/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Award, Building2, Music, Tv, ShoppingBag, CreditCard, Code } from 'lucide-react';

interface BountyCardProps {
  bounty: Bounty;
}

const getCompanyIcon = (companyName: string) => {
  const iconMap: Record<string, React.ReactElement> = {
    'Spotify': <Music className="h-5 w-5 text-vouch-blue flex-shrink-0" />,
    'Netflix': <Tv className="h-5 w-5 text-vouch-blue flex-shrink-0" />,
    'Amazon': <ShoppingBag className="h-5 w-5 text-vouch-blue flex-shrink-0" />,
    'Chase': <CreditCard className="h-5 w-5 text-vouch-blue flex-shrink-0" />,
    'Meta': <Code className="h-5 w-5 text-vouch-blue flex-shrink-0" />,
  };

  return iconMap[companyName] || <Building2 className="h-5 w-5 text-vouch-blue flex-shrink-0" />;
};

export function BountyCard({ bounty }: BountyCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'difficulty-beginner';
      case 'intermediate': return 'difficulty-intermediate';
      case 'advanced': return 'difficulty-advanced';
      default: return 'difficulty-beginner';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'data': return 'category-data';
      case 'design': return 'category-design';
      case 'engineering': return 'category-engineering';
      default: return 'category-data';
    }
  };

  const formatDeadline = (deadline: string) => {
    const date = new Date(deadline);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return 'Expired';
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    return `${diffDays} days left`;
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 border-0 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between space-x-3">
          {getCompanyIcon(bounty.company)}
          <h3 className="text-lg font-semibold text-vouch-navy group-hover:text-vouch-blue transition-colors flex-1 truncate">
            {bounty.title}
          </h3>
          <div className="flex items-center space-x-2 flex-shrink-0">
            <Badge variant={getDifficultyColor(bounty.difficulty) as any}>
              {bounty.difficulty}
            </Badge>
            <Badge variant={getCategoryColor(bounty.category) as any}>
              {bounty.category}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
          {bounty.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Award className="h-4 w-4" />
              <span>{bounty.reward_xp} XP</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{formatDeadline(bounty.deadline)}</span>
            </div>
          </div>
        </div>

        <Link href={`/bounties/${bounty.id}`}>
          <Button className="w-full bg-vouch-blue hover:bg-vouch-blue/90">
            View Bounty
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
