import { supabase } from './supabase';

interface EmailTemplate {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

interface ConfirmationEmailData {
  to: string;
  name: string;
  date: string;
  time: string;
  meetingLink?: string;
  companyName: string;
  description: string;
}

interface AdminNotificationData {
  customerName: string;
  company: string;
  email: string;
  scheduledDate: string;
  description: string;
}

export class EmailService {
  private static readonly FROM_EMAIL = 'hello@darexai.com';
  private static readonly ADMIN_EMAIL = 'admin@darexai.com';

  static async sendConfirmationEmail(data: ConfirmationEmailData): Promise<void> {
    try {
      const emailTemplate: EmailTemplate = {
        to: data.to,
        subject: 'Demo Scheduled - Dare XAI Automation Platform',
        html: this.generateConfirmationEmailHTML(data),
        text: this.generateConfirmationEmailText(data),
      };

      // In a real implementation, this would use a Supabase Edge Function to send emails
      // For now, we'll log the email to the console
      console.log('Sending confirmation email:', emailTemplate);

      // Log the email in Supabase for tracking
      await this.logEmailSent('confirmation', data.to, emailTemplate.subject);

      return Promise.resolve();
    } catch (error) {
      console.error('Error sending confirmation email:', error);
      throw new Error('Failed to send confirmation email');
    }
  }

  static async sendAdminNotification(data: AdminNotificationData): Promise<void> {
    try {
      const emailTemplate: EmailTemplate = {
        to: this.ADMIN_EMAIL,
        subject: `New Demo Request - ${data.company}`,
        html: this.generateAdminNotificationHTML(data),
        text: this.generateAdminNotificationText(data),
      };

      // In a real implementation, this would use a Supabase Edge Function to send emails
      // For now, we'll log the email to the console
      console.log('Sending admin notification:', emailTemplate);

      // Log the email in Supabase for tracking
      await this.logEmailSent('admin_notification', this.ADMIN_EMAIL, emailTemplate.subject);

      return Promise.resolve();
    } catch (error) {
      console.error('Error sending admin notification:', error);
      throw new Error('Failed to send admin notification');
    }
  }

  private static async logEmailSent(type: string, recipient: string, subject: string): Promise<void> {
    try {
      const user = await supabase.auth.getUser();
      const userId = user.data.user?.id;

      // In a real implementation, you would log this to a Supabase table
      console.log('Logging email sent:', {
        type,
        recipient,
        subject,
        userId,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error logging email:', error);
    }
  }

  private static generateConfirmationEmailHTML(data: ConfirmationEmailData): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Demo Scheduled - Dare XAI</title>
        <style>
          body { font-family: 'Inter', Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; background-color: #f8f9fa; }
          .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
          .header { background: linear-gradient(135deg, #00FFFF 0%, #FF00FF 50%, #0066FF 100%); padding: 40px 20px; text-align: center; }
          .header h1 { color: white; margin: 0; font-size: 28px; font-weight: bold; }
          .content { padding: 40px 20px; }
          .meeting-details { background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .button { display: inline-block; background: linear-gradient(135deg, #00FFFF 0%, #FF00FF 50%, #0066FF 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; margin: 20px 0; }
          .footer { background-color: #f8f9fa; padding: 20px; text-align: center; color: #666; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Demo Scheduled Successfully!</h1>
          </div>
          <div class="content">
            <h2>Hi ${data.name},</h2>
            <p>Thank you for your interest in Dare XAI! We're excited to show you how our AI automation platform can transform your business operations.</p>
            
            <div class="meeting-details">
              <h3>Meeting Details:</h3>
              <p><strong>Date:</strong> ${data.date}</p>
              <p><strong>Time:</strong> ${data.time}</p>
              <p><strong>Duration:</strong> 30 minutes</p>
              <p><strong>Company:</strong> ${data.companyName}</p>
              ${data.meetingLink ? `<p><strong>Meeting Link:</strong> <a href="${data.meetingLink}">${data.meetingLink}</a></p>` : ''}
            </div>

            <h3>What to Expect:</h3>
            <ul>
              <li>Personalized demo based on your specific needs</li>
              <li>Discussion of your automation goals and challenges</li>
              <li>Live demonstration of relevant features</li>
              <li>Q&A session with our automation experts</li>
              <li>Next steps and implementation timeline</li>
            </ul>

            <h3>Your Requirements:</h3>
            <p><em>"${data.description}"</em></p>

            ${data.meetingLink ? `<a href="${data.meetingLink}" class="button">Join Meeting</a>` : ''}

            <p>If you need to reschedule or have any questions, please reply to this email or contact us at <a href="mailto:hello@darexai.com">hello@darexai.com</a>.</p>

            <p>Looking forward to speaking with you!</p>
            <p>Best regards,<br>The Dare XAI Team</p>
          </div>
          <div class="footer">
            <p>© 2025 Dare XAI. All rights reserved.</p>
            <p>San Francisco, CA | <a href="https://darexai.com">darexai.com</a></p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  private static generateConfirmationEmailText(data: ConfirmationEmailData): string {
    return `
Demo Scheduled Successfully!

Hi ${data.name},

Thank you for your interest in Dare XAI! We're excited to show you how our AI automation platform can transform your business operations.

Meeting Details:
- Date: ${data.date}
- Time: ${data.time}
- Duration: 30 minutes
- Company: ${data.companyName}
${data.meetingLink ? `- Meeting Link: ${data.meetingLink}` : ''}

What to Expect:
- Personalized demo based on your specific needs
- Discussion of your automation goals and challenges
- Live demonstration of relevant features
- Q&A session with our automation experts
- Next steps and implementation timeline

Your Requirements:
"${data.description}"

If you need to reschedule or have any questions, please reply to this email or contact us at hello@darexai.com.

Looking forward to speaking with you!

Best regards,
The Dare XAI Team

© 2025 Dare XAI. All rights reserved.
San Francisco, CA | darexai.com
    `;
  }

  private static generateAdminNotificationHTML(data: AdminNotificationData): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Demo Request</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #0066FF; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9f9f9; }
          .details { background-color: white; padding: 15px; border-radius: 5px; margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Demo Request</h1>
          </div>
          <div class="content">
            <div class="details">
              <h3>Customer Information:</h3>
              <p><strong>Name:</strong> ${data.customerName}</p>
              <p><strong>Company:</strong> ${data.company}</p>
              <p><strong>Email:</strong> ${data.email}</p>
              <p><strong>Scheduled:</strong> ${data.scheduledDate}</p>
            </div>
            <div class="details">
              <h3>Requirements:</h3>
              <p>${data.description}</p>
            </div>
            <p>Please prepare for the demo and reach out to the customer if needed.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  private static generateAdminNotificationText(data: AdminNotificationData): string {
    return `
New Demo Request

Customer Information:
- Name: ${data.customerName}
- Company: ${data.company}
- Email: ${data.email}
- Scheduled: ${data.scheduledDate}

Requirements:
${data.description}

Please prepare for the demo and reach out to the customer if needed.
    `;
  }
}