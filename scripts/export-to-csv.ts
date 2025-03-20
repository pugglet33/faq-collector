require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

type Submission = {
  id: string;
  content: string;
  category: string;
  sessionId: string;
  createdAt: Date;
};

async function exportToCSV() {
  try {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL environment variable is not set');
    }

    // Get all submissions ordered by creation date
    const submissions: Submission[] = await prisma.submission.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });

    // Create CSV header
    const header = ['ID', 'Content', 'Category', 'Session ID', 'Created At'];
    
    // Convert submissions to CSV rows
    const rows = submissions.map((sub: Submission) => [
      sub.id,
      `"${sub.content.replace(/"/g, '""')}"`, // Escape quotes in content
      sub.category,
      sub.sessionId,
      sub.createdAt.toISOString()
    ]);

    // Combine header and rows
    const csvContent = [
      header.join(','),
      ...rows.map((row: string[]) => row.join(','))
    ].join('\n');

    // Create exports directory if it doesn't exist
    const exportDir = path.join(process.cwd(), 'exports');
    if (!fs.existsSync(exportDir)) {
      fs.mkdirSync(exportDir);
    }

    // Generate filename with current date
    const filename = `faq-submissions-${new Date().toISOString().split('T')[0]}.csv`;
    const filepath = path.join(exportDir, filename);

    // Write to file
    fs.writeFileSync(filepath, csvContent);

    console.log(`Successfully exported to ${filepath}`);
    console.log(`Found ${submissions.length} submissions`);
  } catch (error) {
    console.error('Export failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the export
exportToCSV();
