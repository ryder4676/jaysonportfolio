import nodemailer from 'nodemailer';
import { WebsiteAnalysis } from '@shared/schema';

// Create a transporter using the default SMTP transport
let transporter: nodemailer.Transporter | null = null;

// Initialize the email transporter - in production, you'd use real SMTP credentials
function initializeTransporter() {
  // For testing/development, we can use a preview service like Ethereal
  // In production, you would use real SMTP credentials
  if (!transporter) {
    // If running in development, create a test account on Ethereal
    if (process.env.NODE_ENV !== 'production') {
      nodemailer.createTestAccount().then(testAccount => {
        transporter = nodemailer.createTransport({
          host: 'smtp.ethereal.email',
          port: 587,
          secure: false,
          auth: {
            user: testAccount.user,
            pass: testAccount.pass,
          },
        });
        console.log('Email test account created:', testAccount.web);
      }).catch(err => {
        console.error('Failed to create test email account:', err);
      });
    } else {
      // In production, use real SMTP credentials
      transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      });
    }
  }
}

// Initialize the email transporter on module load
initializeTransporter();

/**
 * Send a confirmation email to the user who submitted a website analysis request
 */
export async function sendWebsiteAnalysisConfirmation(
  email: string,
  websiteUrl: string
): Promise<boolean> {
  if (!transporter) {
    console.warn('Email transporter not configured. Email not sent.');
    return false;
  }

  try {
    const info = await transporter.sendMail({
      from: '"DevCraft Studio" <info@devcraftstudio.com>',
      to: email,
      subject: 'Your Website Analysis Request Confirmation',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2 style="color: #3b82f6;">Website Analysis Confirmation</h2>
          <p>Thank you for submitting your website <strong>${websiteUrl}</strong> for analysis!</p>
          <p>We've received your request and will conduct a thorough review of your site. Within 48 hours, you'll receive a detailed report including:</p>
          <ul>
            <li>Design and user experience assessment</li>
            <li>Performance optimization recommendations</li>
            <li>Mobile responsiveness evaluation</li>
            <li>Functionality improvement suggestions</li>
            <li>Cost estimates for recommended changes</li>
          </ul>
          <p>If you have any questions in the meantime, please reply to this email.</p>
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #666;">Best regards,</p>
            <p style="color: #666;">The DevCraft Studio Team</p>
          </div>
        </div>
      `,
    });

    console.log('Confirmation email sent:', info.messageId);
    
    // If using Ethereal, log the preview URL
    if (process.env.NODE_ENV !== 'production' && info.messageId) {
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
    
    return true;
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return false;
  }
}

/**
 * Send notification to admin about a new website analysis request
 */
export async function sendAdminWebsiteAnalysisNotification(
  analysis: WebsiteAnalysis
): Promise<boolean> {
  if (!transporter) {
    console.warn('Email transporter not configured. Admin notification not sent.');
    return false;
  }

  try {
    const info = await transporter.sendMail({
      from: '"DevCraft Studio System" <system@devcraftstudio.com>',
      to: 'admin@devcraftstudio.com', // Replace with the actual admin email
      subject: 'New Website Analysis Request',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
          <h2 style="color: #3b82f6;">New Website Analysis Request</h2>
          <p>A new website analysis request has been submitted with the following details:</p>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Website URL:</td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="${analysis.websiteUrl}">${analysis.websiteUrl}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Client Email:</td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="mailto:${analysis.email}">${analysis.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Budget:</td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${analysis.budget}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Improvement Areas:</td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${analysis.improvementAreas?.join(', ') || 'None specified'}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Pain Points:</td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${analysis.painPoints || 'None specified'}</td>
            </tr>
          </table>
          <p>Please log in to the <a href="https://devcraftstudio.com/admin">admin dashboard</a> to view more details.</p>
        </div>
      `,
    });

    console.log('Admin notification email sent:', info.messageId);
    
    // If using Ethereal, log the preview URL
    if (process.env.NODE_ENV !== 'production' && info.messageId) {
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
    
    return true;
  } catch (error) {
    console.error('Error sending admin notification email:', error);
    return false;
  }
}