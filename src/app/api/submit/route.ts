import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { RequestCookies } from 'next/dist/server/web/spec-extension/cookies';
import { appendToSheet } from '@/utils/sheets';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { content, category } = await request.json();
    
    // Get existing session ID from cookies or create new one
    const cookieStore = new RequestCookies(request.headers);
    const sessionId = cookieStore.get('sessionId')?.value ?? uuidv4();

    // Create submission in database
    const submission = await prisma.submission.create({
      data: {
        content,
        category,
        sessionId,
      },
    });

    // Append to Google Sheet
    await appendToSheet([
      submission.id,
      submission.content,
      submission.category,
      submission.sessionId,
      submission.createdAt.toISOString()
    ]);

    // Create response with cookie
    const response = NextResponse.json({ success: true, submission });
    
    // Set cookie only if it doesn't exist
    if (!cookieStore.get('sessionId')) {
      response.cookies.set({
        name: 'sessionId',
        value: sessionId,
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
