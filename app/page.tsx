import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle, Users, Award, TrendingUp } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-vouch-navy via-vouch-navy to-vouch-blue">
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              Get work experience{' '}
              <span className="text-vouch-blue">without a job</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              Complete real-world projects from actual companies. Build a verifiable &quot;Proof-of-Work&quot; portfolio that replaces your traditional resume and gets you hired.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/bounties">
                <Button size="lg" className="bg-vouch-blue hover:bg-vouch-blue/90 text-white">
                  Browse Bounties
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="lg" className="bg-white text-vouch-navy hover:bg-gray-100">
                  Join Waitlist
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 sm:py-32 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-vouch-navy sm:text-4xl">
              How Vouch Works
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              Bridge the gap between theory and practice with our proven 3-step process.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-vouch-blue">
                  <span className="text-2xl font-bold text-white">1</span>
                </div>
                <dt className="text-xl font-semibold leading-7 text-vouch-navy">
                  Pick a Bounty
                </dt>
                <dd className="mt-4 text-base leading-7 text-gray-600">
                  Browse real projects from companies looking for talent. Choose bounties that match your skills and career goals.
                </dd>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-vouch-blue">
                  <span className="text-2xl font-bold text-white">2</span>
                </div>
                <dt className="text-xl font-semibold leading-7 text-vouch-navy">
                  Do the Work
                </dt>
                <dd className="mt-4 text-base leading-7 text-gray-600">
                  Complete the project using provided resources and datasets. Our AI grading system ensures fair evaluation.
                </dd>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-vouch-blue">
                  <span className="text-2xl font-bold text-white">3</span>
                </div>
                <dt className="text-xl font-semibold leading-7 text-vouch-navy">
                  Get Vouched
                </dt>
                <dd className="mt-4 text-base leading-7 text-gray-600">
                  Earn XP and build your Vouch Score. Companies can verify your skills through your completed work portfolio.
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-center">
            <div className="lg:pr-8 lg:pt-4">
              <div className="lg:max-w-lg">
                <h2 className="text-base font-semibold leading-7 text-vouch-blue">
                  For Students
                </h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-vouch-navy sm:text-4xl">
                  Break the experience paradox
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  {/* eslint-disable-next-line react/no-unescaped-entities */}
                  You can&apos;t get a job without experience, but you can&apos;t get experience without a job. Vouch solves this by giving you real work experience through simulated projects.
                </p>
                <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                  <div className="relative pl-9">
                    <dt className="inline font-semibold text-vouch-navy">
                      <CheckCircle className="absolute left-1 top-1 h-5 w-5 text-vouch-blue" />
                      Verifiable portfolio.
                    </dt>
                    <dd className="inline ml-2">
                      Build a portfolio of completed work that employers can verify.
                    </dd>
                  </div>
                  <div className="relative pl-9">
                    <dt className="inline font-semibold text-vouch-navy">
                      <Users className="absolute left-1 top-1 h-5 w-5 text-vouch-blue" />
                      Industry connections.
                    </dt>
                    <dd className="inline ml-2">
                      Work on projects from real companies and build your network.
                    </dd>
                  </div>
                  <div className="relative pl-9">
                    <dt className="inline font-semibold text-vouch-navy">
                      <TrendingUp className="absolute left-1 top-1 h-5 w-5 text-vouch-blue" />
                      Career acceleration.
                    </dt>
                    <dd className="inline ml-2">
                      Get hired faster with proven skills and work experience.
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            <div className="lg:pl-8">
              <div className="lg:max-w-lg">
                <h2 className="text-base font-semibold leading-7 text-vouch-blue">
                  For Companies
                </h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-vouch-navy sm:text-4xl">
                  Hire pre-vetted talent
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Access a pool of candidates who have already demonstrated their skills through real work. Reduce hiring time by 40% with verified talent.
                </p>
                <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                  <div className="relative pl-9">
                    <dt className="inline font-semibold text-vouch-navy">
                      <CheckCircle className="absolute left-1 top-1 h-5 w-5 text-vouch-blue" />
                      Skills verification.
                    </dt>
                    <dd className="inline ml-2">
                      Review actual work samples before making hiring decisions.
                    </dd>
                  </div>
                  <div className="relative pl-9">
                    <dt className="inline font-semibold text-vouch-navy">
                      <Users className="absolute left-1 top-1 h-5 w-5 text-vouch-blue" />
                      Faster recruitment.
                    </dt>
                    <dd className="inline ml-2">
                      Skip resume screening and go straight to skill assessment.
                    </dd>
                  </div>
                  <div className="relative pl-9">
                    <dt className="inline font-semibold text-vouch-navy">
                      <TrendingUp className="absolute left-1 top-1 h-5 w-5 text-vouch-blue" />
                      Better retention.
                    </dt>
                    <dd className="inline ml-2">
                      Hire candidates who are excited to work on real projects.
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-vouch-navy">
        <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to get vouched?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
              Join thousands of students building their careers through real work experience.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href="/dashboard">
                <Button size="lg" className="bg-vouch-blue hover:bg-blue-600 text-white">
                  Start Building Your Portfolio
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
