import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { content, category } = await request.json();
    
    // Get or create session ID
    const sessionCookie = cookies().get('sessionId');
    let sessionId = sessionCookie?.value;
    
    if (!sessionId) {
      sessionId = uuidv4();
    }

    // Create submission in database
    const submission = await prisma.submission.create({
      data: {
        content,
        category,
        sessionId,
      },
    });

    const response = NextResponse.json({ success: true, submission });
    
    // Set cookie if it doesn't exist
    if (!sessionCookie) {
      response.cookies.set('sessionId', sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 30 // 30 days
      });
    }

    return response;
  } catch (error) {
    console.error('Submission error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit question' },
      { status: 500 }
    );
  }
}
