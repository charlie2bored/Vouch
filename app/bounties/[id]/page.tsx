'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { sampleBounties } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Upload, Clock, Award, Building, CheckCircle } from 'lucide-react';
import type { Bounty } from '@/types';

export default function BountyDetailPage() {
  const params = useParams();
  const bountyId = params.id as string;

  // In a real app, this would be an API call
  const bounty = sampleBounties.find(b => b.id === bountyId);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [gradingResult, setGradingResult] = useState<{ score: number; feedback: string } | null>(null);

  if (!bounty) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Bounty not found</h1>
          <p className="text-gray-600 mb-4">
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            The bounty you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link href="/bounties">
            <Button>Back to Bounties</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) return;

    setIsUploading(true);

    try {
      // First simulate file upload
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Then call the grading API
      const response = await fetch('/api/grade-submission', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bounty_id: bountyId,
          submission_text: selectedFile.name, // In a real app, this would be the uploaded file content/URL
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to grade submission');
      }

      const result = await response.json();
      setGradingResult(result);
    } catch (error) {
      console.error('Error submitting work:', error);
      // In a real app, you'd show an error message to the user
    } finally {
      setIsUploading(false);
      setUploadComplete(true);
    }
  };

  const formatDeadline = (deadline: string) => {
    return new Date(deadline).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysUntilDeadline = () => {
    const now = new Date();
    const deadline = new Date(bounty.deadline);
    const diffTime = deadline.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysLeft = getDaysUntilDeadline();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link href="/bounties" className="inline-flex items-center text-vouch-blue hover:text-vouch-blue/80">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Bounties
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Building className="h-5 w-5 text-vouch-blue" />
                  <span className="font-medium text-vouch-navy">{bounty.company}</span>
                </div>
                <div className="flex space-x-2">
                  <Badge variant="difficulty" className="capitalize">
                    {bounty.difficulty}
                  </Badge>
                  <Badge variant="category" className="capitalize">
                    {bounty.category}
                  </Badge>
                </div>
              </div>

              <h1 className="text-2xl font-bold text-vouch-navy mb-2">
                {bounty.title}
              </h1>

              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Award className="h-4 w-4" />
                  <span>{bounty.reward_xp} XP</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>Due {formatDeadline(bounty.deadline)}</span>
                  {daysLeft <= 7 && daysLeft > 0 && (
                    <Badge variant="destructive" className="ml-2 text-xs">
                      {daysLeft} days left
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Task Description */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-vouch-blue mr-2" />
                  The Task
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {bounty.description}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Resources */}
            {bounty.raw_data_url && (
              <Card>
                <CardHeader>
                  <CardTitle>Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Download className="h-5 w-5 text-vouch-blue" />
                      <div>
                        <p className="font-medium text-gray-900">raw_data.csv</p>
                        <p className="text-sm text-gray-600">Dataset for this bounty</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Submit Work */}
            <Card>
              <CardHeader>
                <CardTitle>Submit Your Work</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!uploadComplete ? (
                  <>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Upload your completed work
                      </label>
                      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-vouch-blue transition-colors">
                        <div className="space-y-1 text-center">
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-vouch-blue hover:text-vouch-blue/80 focus-within:outline-none"
                            >
                              <span>Upload a file</span>
                              <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                                accept=".zip,.pdf,.doc,.docx,.xlsx,.csv"
                                onChange={handleFileSelect}
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            ZIP, PDF, DOC, XLS up to 10MB
                          </p>
                        </div>
                      </div>
                    </div>

                    {selectedFile && (
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-md">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-gray-700">{selectedFile.name}</span>
                        </div>
                        <button
                          onClick={() => setSelectedFile(null)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    )}

                    <Button
                      onClick={handleSubmit}
                      disabled={!selectedFile || isUploading}
                      className="w-full bg-vouch-blue hover:bg-vouch-blue/90"
                    >
                      {isUploading ? 'Grading...' : 'Submit Work'}
                    </Button>
                  </>
                ) : gradingResult ? (
                  <div className="text-center py-6">
                    <div className="mb-4">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${
                        gradingResult.score >= 80 ? 'bg-green-100' :
                        gradingResult.score >= 60 ? 'bg-yellow-100' : 'bg-red-100'
                      }`}>
                        <span className={`text-2xl font-bold ${
                          gradingResult.score >= 80 ? 'text-green-600' :
                          gradingResult.score >= 60 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {gradingResult.score}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Graded: {gradingResult.score >= 80 ? 'Excellent!' :
                               gradingResult.score >= 60 ? 'Good Job!' : 'Needs Improvement'}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {gradingResult.feedback}
                    </p>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <p className="text-xs text-gray-500">
                        You earned {Math.floor(gradingResult.score / 10) * bounty.reward_xp / 10} XP for this submission.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Submission Received!
                    </h3>
                    <p className="text-sm text-gray-600">
                      {/* eslint-disable-next-line react/no-unescaped-entities */}
                      Your work has been submitted and will be graded within 24 hours.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Bounty Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Bounty Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium text-muted-foreground">Reward</span>
                  <span className="text-sm font-semibold text-foreground">{bounty.reward_xp} XP</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium text-muted-foreground">Difficulty</span>
                  <Badge variant="difficulty" className="capitalize text-sm">
                    {bounty.difficulty}
                  </Badge>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium text-muted-foreground">Category</span>
                  <Badge variant="category" className="capitalize text-sm">
                    {bounty.category}
                  </Badge>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm font-medium text-muted-foreground">Deadline</span>
                  <span className="text-sm font-semibold text-foreground">{formatDeadline(bounty.deadline)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
