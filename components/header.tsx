import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Award } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Award className="h-8 w-8 text-vouch-blue" />
            <span className="text-xl font-bold text-vouch-navy">VOUCH</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/bounties"
              className="text-gray-600 hover:text-vouch-blue transition-colors"
            >
              Bounties
            </Link>
            <Link
              href="/dashboard"
              className="text-gray-600 hover:text-vouch-blue transition-colors"
            >
              Dashboard
            </Link>
          </nav>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              Login
            </Button>
            <Link href="/dashboard">
              <Button size="sm" className="bg-vouch-blue hover:bg-vouch-blue/90">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

