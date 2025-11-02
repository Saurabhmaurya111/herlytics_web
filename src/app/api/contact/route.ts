import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address.' },
        { status: 400 }
      );
    }

    // Get email configuration from environment variables
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = parseInt(process.env.SMTP_PORT || '587');
    const smtpUser = process.env.SMTP_USER;
    // Remove any spaces from app password (Gmail app passwords sometimes have spaces)
    const smtpPassword = process.env.SMTP_PASSWORD?.replace(/\s+/g, '') || process.env.SMTP_PASSWORD;
    const recipientEmail = process.env.RECIPIENT_EMAIL || smtpUser;

    if (!smtpUser || !smtpPassword) {
      console.error('Email configuration missing. Please set SMTP_USER and SMTP_PASSWORD environment variables.');
      return NextResponse.json(
        { error: 'Email service is not configured. Please contact the administrator.' },
        { status: 500 }
      );
    }

    // Debug logging (remove in production)
    console.log('Email config check:', {
      host: smtpHost,
      port: smtpPort,
      user: smtpUser,
      passwordLength: smtpPassword?.length,
      passwordFormat: smtpPassword?.includes(' ') ? 'has spaces' : 'no spaces',
    });

    // Create transporter with Gmail-optimized configuration
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: smtpHost,
      port: smtpPort,
      secure: false, // Use TLS for port 587
      auth: {
        user: smtpUser.trim(),
        pass: smtpPassword.trim(),
      },
      // Gmail-specific options
      tls: {
        rejectUnauthorized: false
      }
    });

    // Verify transporter configuration
    try {
      await transporter.verify();
      console.log('Email transporter verified successfully!');
    } catch (error: any) {
      console.error('Email transporter verification failed:', error);
      
      // Provide more helpful error messages
      if (error.code === 'EAUTH') {
        console.error('Authentication failed. Common causes:');
        console.error('1. App password is incorrect or expired');
        console.error('2. 2-Step Verification is not enabled');
        console.error('3. App password was copied incorrectly');
        console.error('4. Account security restrictions');
        return NextResponse.json(
          { 
            error: 'Email authentication failed. Please verify your Gmail app password is correct and that 2-Step Verification is enabled on your Google account.',
            details: 'Check your terminal/console for more details'
          },
          { status: 500 }
        );
      }
      
      return NextResponse.json(
        { error: 'Email service configuration error. Please contact the administrator.' },
        { status: 500 }
      );
    }

    // Email content
    const mailOptions = {
      from: `"${name}" <${smtpUser}>`,
      replyTo: email,
      to: recipientEmail,
      subject: subject ? `Contact Form: ${subject}` : `Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 10px;">
            New Contact Form Submission
          </h2>
          
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 5px; margin-top: 20px;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            ${phone ? `<p style="margin: 10px 0;"><strong>Phone:</strong> ${phone}</p>` : ''}
            ${subject ? `<p style="margin: 10px 0;"><strong>Subject:</strong> ${subject}</p>` : ''}
          </div>
          
          <div style="margin-top: 20px;">
            <h3 style="color: #333;">Message:</h3>
            <p style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #4CAF50; border-radius: 3px; white-space: pre-wrap;">
              ${message}
            </p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
            <p>This message was sent from the HERlytics contact form.</p>
            <p>You can reply directly to this email to respond to ${name}.</p>
          </div>
        </div>
      `,
      text: `
New Contact Form Submission

Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}` : ''}
${subject ? `Subject: ${subject}` : ''}

Message:
${message}

---
This message was sent from the HERlytics contact form.
You can reply directly to this email to respond to ${name}.
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been sent successfully!',
        messageId: info.messageId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again later.' },
      { status: 500 }
    );
  }
}

