import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { content, category } = await request.json();
    
    // Get or create session ID
    const sessionId = uuidv4();

    // Create submission in database
    const submission = await prisma.submission.create({
      data: {
        content,
        category,
        sessionId,
      },
    });

    // Create response with cookie
    const response = NextResponse.json({ success: true, submission });
    
    // Set session cookie
    const cookieOptions: ResponseCookie = {
      name: 'sessionId',
      value: sessionId,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30 // 30 days
    };
    
    response.cookies.set(cookieOptions);

    return response;
  } catch (error) {
    console.error('Submission error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit question' },
      { status: 500 }
    );
  }
}
