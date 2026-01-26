import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { bounty_id, submission_text } = await request.json();

    if (!bounty_id || !submission_text) {
      return NextResponse.json(
        { error: 'Missing required fields: bounty_id and submission_text' },
        { status: 400 }
      );
    }

    const supabase = createClient();

    // Fetch the bounty to get the gold standard key
    const { data: bounty, error: bountyError } = await supabase
      .from('bounties')
      .select('id, gold_standard_key')
      .eq('id', bounty_id)
      .single();

    if (bountyError || !bounty) {
      return NextResponse.json(
        { error: 'Bounty not found' },
        { status: 404 }
      );
    }

    // Mock AI grading delay (3 seconds)
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Mock grading logic - in a real app, this would use OpenAI or similar
    // For now, we'll generate a random score between 60-95
    const score = Math.floor(Math.random() * 36) + 60; // 60-95 range

    // Generate mock feedback based on the score
    let feedback = '';
    if (score >= 90) {
      feedback = 'Excellent work! You demonstrated a strong understanding of the requirements and implemented clean, efficient code.';
    } else if (score >= 80) {
      feedback = 'Good job overall. Your solution works well, but there are some areas for improvement in code organization and edge case handling.';
    } else if (score >= 70) {
      feedback = 'Solid effort. The core functionality is there, but you missed some key requirements and edge cases.';
    } else {
      feedback = 'Your submission shows promise, but needs significant improvement. Focus on meeting the core requirements first.';
    }

    // Save the grading result to the submissions table
    const { error: submissionError } = await supabase
      .from('submissions')
      .insert({
        user_id: 'user-1', // In a real app, this would come from auth
        bounty_id,
        file_url: submission_text, // Storing the submission text as file_url for now
        ai_grade_json: JSON.stringify({
          score,
          feedback,
          graded_at: new Date().toISOString()
        }),
        status: 'graded'
      });

    if (submissionError) {
      console.error('Error saving submission:', submissionError);
      // Don't fail the request if saving fails, just log it
    }

    return NextResponse.json({
      score,
      feedback
    });

  } catch (error) {
    console.error('Error in grade-submission API:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

