const { Resend } = require('resend');
require('dotenv').config();

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

function PasswordResetEmail({ resetLink, userName, expiresIn = "15 minutes" }) {
  return {
    subject: 'Reset Your XoolHub Password',
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Password - XoolHub</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
      </head>
      <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); padding: 40px 30px; text-align: center; position: relative; overflow: hidden;">
            <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><defs><pattern id=\"grain\" width=\"100\" height=\"100\" patternUnits=\"userSpaceOnUse\"><circle cx=\"50\" cy=\"50\" r=\"1\" fill=\"white\" opacity=\"0.1\"/></pattern></defs><rect width=\"100\" height=\"100\" fill=\"url(%23grain)\"/></svg></div>
            <div style="position: relative; z-index: 1;">
              <div style="width: 80px; height: 80px; background: rgba(255, 255, 255, 0.2); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                <span style="font-size: 32px; color: white;">🔐</span>
              </div>
              <h1 style="color: white; margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">Reset Your Password</h1>
              <p style="color: rgba(255, 255, 255, 0.9); margin: 10px 0 0; font-size: 18px; font-weight: 400;">Secure your XoolHub account</p>
            </div>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px;">
            <div style="text-align: center; margin-bottom: 40px;">
              <h2 style="color: #1e293b; margin: 0 0 16px; font-size: 24px; font-weight: 600;">Password Reset Request</h2>
              <p style="color: #64748b; font-size: 16px; line-height: 1.6; margin: 0;">
                Hello <strong style="color: #3b82f6;">${userName || 'User'}</strong>, we received a request to reset your password for your XoolHub account.
              </p>
            </div>
            
            <div style="background: #f8fafc; border-radius: 12px; padding: 30px; margin-bottom: 30px; border: 1px solid #e2e8f0;">
              <h3 style="color: #1e293b; margin: 0 0 20px; font-size: 20px; font-weight: 600; display: flex; align-items: center;">
                <span style="width: 4px; height: 24px; background: #3b82f6; border-radius: 2px; margin-right: 12px;"></span>
                Reset Instructions
              </h3>
              <p style="color: #64748b; line-height: 1.6; margin: 0 0 20px; font-size: 15px;">
                Click the button below to create a new password. This link will expire in <strong style="color: #3b82f6;">${expiresIn}</strong>.
              </p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="${resetLink}" 
                   style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600; font-size: 15px; box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.3); transition: all 0.2s;">
                  Reset Password
                </a>
              </div>
              
              <div style="background: #f3f4f6; border-radius: 8px; padding: 16px; margin-top: 20px; border: 1px solid #e5e7eb;">
                <p style="color: #6b7280; margin: 0 0 8px; font-size: 14px; font-weight: 500;">If the button doesn't work, copy and paste this link:</p>
                <p style="color: #3b82f6; margin: 0; font-size: 14px; word-break: break-all; font-family: monospace; background: white; padding: 8px 12px; border-radius: 4px; border: 1px solid #d1d5db;">${resetLink}</p>
              </div>
            </div>
            
            <div style="background: #fef2f2; border: 2px solid #fecaca; border-radius: 12px; padding: 20px; margin-bottom: 30px;">
              <div style="display: flex; align-items: flex-start; gap: 12px;">
                <div style="width: 24px; height: 24px; background: #fecaca; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                  <span style="color: #dc2626; font-size: 14px;">⚠️</span>
                </div>
                <div>
                  <p style="color: #dc2626; margin: 0; font-weight: 600; font-size: 15px;">Security Notice</p>
                  <p style="color: #991b1b; margin: 4px 0 0; font-size: 14px; line-height: 1.5;">
                    If you didn't request this password reset, please ignore this email. Your password will remain unchanged.
                  </p>
                </div>
              </div>
            </div>
            
            <div style="background: #f0f4ff; border: 2px solid #c7d2fe; border-radius: 12px; padding: 20px; margin-bottom: 30px;">
              <div style="display: flex; align-items: flex-start; gap: 12px;">
                <div style="width: 24px; height: 24px; background: #c7d2fe; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                  <span style="color: #3730a3; font-size: 14px;">ℹ️</span>
                </div>
                <div>
                  <p style="color: #3730a3; margin: 0; font-weight: 600; font-size: 15px;">Important Information</p>
                  <p style="color: #4338ca; margin: 4px 0 0; font-size: 14px; line-height: 1.5;">
                    For security reasons, this link will expire in <strong>${expiresIn}</strong> and can only be used once.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background: #1e293b; color: #94a3b8; padding: 30px; text-align: center; border-top: 1px solid #334155;">
            <div style="margin-bottom: 20px;">
              <div style="width: 40px; height: 40px; background: #3b82f6; border-radius: 8px; margin: 0 auto 12px; display: flex; align-items: center; justify-content: center;">
                <span style="color: white; font-weight: bold; font-size: 18px;">X</span>
              </div>
              <h3 style="color: white; margin: 0 0 8px; font-size: 16px; font-weight: 600;">XoolHub Security</h3>
              <p style="margin: 0; font-size: 14px;">Protecting Your Educational Journey</p>
            </div>
            <div style="border-top: 1px solid #334155; padding-top: 20px; font-size: 12px;">
              <p style="margin: 0;">This message was sent by XoolHub System. Questions? Contact us at <a href="mailto:support@xoolhub.com" style="color: #3b82f6; text-decoration: none;">support@xoolhub.com</a></p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `
  };
}

// Email sending function
const sendPasswordResetEmail = async (to, resetLink, userName, expiresIn = "15 minutes") => {
  try {
    const emailContent = PasswordResetEmail({ resetLink, userName, expiresIn });
    
    const emailData = {
      from: 'XoolHub <noreply@xoolhub.com>',
      replyTo: 'support@xoolhub.com',
      to: [to],
      subject: emailContent.subject,
      html: emailContent.html,
      headers: {
        'X-Mailer': 'XoolHub System v1.0',
        'X-Priority': '3',
        'X-MSMail-Priority': 'Normal',
        'Importance': 'Normal',
        'List-Unsubscribe': '<mailto:unsubscribe@xoolhub.com>',
        'X-Entity-Ref-ID': `xoolhub-password-reset-${Date.now()}`
      }
    };

    const result = await resend.emails.send(emailData);
    console.log('Password reset email sent successfully:', result.data?.id);
    return { success: true, messageId: result.data?.id };
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  PasswordResetEmail,
  sendPasswordResetEmail
};
