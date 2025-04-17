import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { nanoid } from 'nanoid';
import * as os from 'os';

/**
 * Handles the contact form submissions, including file attachments
 * This would typically send an email to the support team, but for demo purposes
 * we'll just log the data and create a mock response
 */
export async function POST(request: NextRequest) {
  try {
    // Process form data
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const category = formData.get('category') as string;
    const message = formData.get('message') as string;
    const file = formData.get('file') as File | null;
    
    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Process file if it exists
    let fileInfo = null;
    if (file) {
      // In a real app, you might:
      // 1. Save the file to a cloud storage
      // 2. Attach it to an email
      // 3. Store a reference in a database
      
      // For demo, we'll save it to a temp directory
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      
      // Use a unique filename to prevent collisions
      const uniqueId = nanoid();
      const fileExt = file.name.split('.').pop();
      const fileName = `${uniqueId}.${fileExt}`;
      const filePath = join(os.tmpdir(), fileName);
      
      // Save the file
      await writeFile(filePath, buffer);
      
      fileInfo = {
        originalName: file.name,
        size: file.size,
        type: file.type,
        savedPath: filePath
      };
    }
    
    // In a real application, you would send an email here
    // For example, using a service like SendGrid, Mailgun, or AWS SES
    /*
    await sendEmail({
      to: "support@fileswift.app",
      from: email,
      subject: `New ${category} Inquiry from ${name}`,
      text: message,
      attachments: fileInfo ? [{
        filename: fileInfo.originalName,
        path: fileInfo.savedPath
      }] : []
    });
    */
    
    // Log the submission for demo purposes
    console.log('Contact form submission:', {
      name,
      email,
      category,
      message,
      fileInfo
    });
    
    // Return success response
    return NextResponse.json({ 
      success: true, 
      message: 'Message received successfully. We will respond to your email shortly.' 
    });
    
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Failed to process contact form' },
      { status: 500 }
    );
  }
} 