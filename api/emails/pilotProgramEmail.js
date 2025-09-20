const { Resend } = require('resend');
require('dotenv').config();

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Modern email templates with professional design
const emailTemplates = { 
  newApplication: (application) => ({
    subject: `New Pilot Program Application - ${application.school_name}`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Pilot Program Application</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
      </head>
      <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center; position: relative; overflow: hidden;">
            <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><defs><pattern id=\"grain\" width=\"100\" height=\"100\" patternUnits=\"userSpaceOnUse\"><circle cx=\"50\" cy=\"50\" r=\"1\" fill=\"white\" opacity=\"0.1\"/></pattern></defs><rect width=\"100\" height=\"100\" fill=\"url(%23grain)\"/></svg></div>
            <div style="position: relative; z-index: 1;">
              <div style="width: 60px; height: 60px; background: rgba(255, 255, 255, 0.2); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                <span style="font-size: 24px; color: white;">📋</span>
              </div>
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">New Pilot Program Application</h1>
              <p style="color: rgba(255, 255, 255, 0.9); margin: 10px 0 0; font-size: 16px; font-weight: 400;">A new school has applied for our pilot program</p>
            </div>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px;">
            <div style="background: #f8fafc; border-radius: 12px; padding: 30px; margin-bottom: 30px; border: 1px solid #e2e8f0;">
              <h2 style="color: #1e293b; margin: 0 0 20px; font-size: 22px; font-weight: 600; display: flex; align-items: center;">
                <span style="width: 4px; height: 24px; background: #667eea; border-radius: 2px; margin-right: 12px;"></span>
                Application Details
              </h2>
              
              <div style="background: white; border-radius: 8px; overflow: hidden; border: 1px solid #e2e8f0;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr style="background: #f8fafc;">
                    <td style="padding: 16px 20px; font-weight: 600; color: #475569; font-size: 14px; border-bottom: 1px solid #e2e8f0; width: 40%;">School Name</td>
                    <td style="padding: 16px 20px; color: #1e293b; font-size: 14px; border-bottom: 1px solid #e2e8f0;">${application.school_name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 16px 20px; font-weight: 600; color: #475569; font-size: 14px; border-bottom: 1px solid #e2e8f0;">Contact Email</td>
                    <td style="padding: 16px 20px; color: #1e293b; font-size: 14px; border-bottom: 1px solid #e2e8f0;">
                      <a href="mailto:${application.contact_email}" style="color: #667eea; text-decoration: none;">${application.contact_email}</a>
                    </td>
                  </tr>
                  <tr style="background: #f8fafc;">
                    <td style="padding: 16px 20px; font-weight: 600; color: #475569; font-size: 14px; border-bottom: 1px solid #e2e8f0;">Contact Phone</td>
                    <td style="padding: 16px 20px; color: #1e293b; font-size: 14px; border-bottom: 1px solid #e2e8f0;">${application.contact_phone || 'Not provided'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 16px 20px; font-weight: 600; color: #475569; font-size: 14px; border-bottom: 1px solid #e2e8f0;">School Size</td>
                    <td style="padding: 16px 20px; color: #1e293b; font-size: 14px; border-bottom: 1px solid #e2e8f0;">${application.school_size}</td>
                  </tr>
                  <tr style="background: #f8fafc;">
                    <td style="padding: 16px 20px; font-weight: 600; color: #475569; font-size: 14px; border-bottom: 1px solid #e2e8f0;">Expected Students</td>
                    <td style="padding: 16px 20px; color: #1e293b; font-size: 14px; border-bottom: 1px solid #e2e8f0;">${application.expected_students || 'Not specified'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 16px 20px; font-weight: 600; color: #475569; font-size: 14px; border-bottom: 1px solid #e2e8f0;">Current System</td>
                    <td style="padding: 16px 20px; color: #1e293b; font-size: 14px; border-bottom: 1px solid #e2e8f0;">${application.current_system || 'None'}</td>
                  </tr>
                  <tr style="background: #f8fafc;">
                    <td style="padding: 16px 20px; font-weight: 600; color: #475569; font-size: 14px; border-bottom: 1px solid #e2e8f0;">Preferred Plan</td>
                    <td style="padding: 16px 20px; color: #1e293b; font-size: 14px; border-bottom: 1px solid #e2e8f0;">${application.preferred_plan_name || 'Not specified'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 16px 20px; font-weight: 600; color: #475569; font-size: 14px; border-bottom: 1px solid #e2e8f0;">applied Date</td>
                    <td style="padding: 16px 20px; color: #1e293b; font-size: 14px; border-bottom: 1px solid #e2e8f0;">${new Date(application.start_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                  </tr>
                  <tr style="background: #f8fafc;">
                    <td style="padding: 16px 20px; font-weight: 600; color: #475569; font-size: 14px; border-bottom: 1px solid #e2e8f0;">End Date</td>
                    <td style="padding: 16px 20px; color: #1e293b; font-size: 14px; border-bottom: 1px solid #e2e8f0;">${new Date(application.end_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                  </tr>
                  <tr>
                    <td style="padding: 16px 20px; font-weight: 600; color: #475569; font-size: 14px;">Pilot active</td>
                    <td style="padding: 16px 20px; color: #1e293b; font-size: 14px;">
                      <span style="display: inline-flex; align-items: center; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 500; background: ${application.pilot_active ? '#dcfce7' : '#fef2f2'}; color: ${application.pilot_active ? '#166534' : '#dc2626'};">
                        ${application.pilot_active ? '✓ active' : '✗ Inactive'}
                      </span>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
            
            <div style="background: #f8fafc; border-radius: 12px; padding: 30px; margin-bottom: 30px; border: 1px solid #e2e8f0;">
              <h3 style="color: #1e293b; margin: 0 0 16px; font-size: 18px; font-weight: 600; display: flex; align-items: center;">
                <span style="width: 4px; height: 20px; background: #667eea; border-radius: 2px; margin-right: 12px;"></span>
                Motivation
              </h3>
              <p style="color: #64748b; line-height: 1.7; margin: 0; font-size: 15px; background: white; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0;">${application.motivation}</p>
            </div>
            
            <div style="text-align: center; margin: 40px 0;">
              <a href="${process.env.FRONTEND_URL}/pilot-program-dashboard" 
                 style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600; font-size: 15px; box-shadow: 0 4px 6px -1px rgba(102, 126, 234, 0.3); transition: all 0.2s;">
                Review Application
              </a>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background: #1e293b; color: #94a3b8; padding: 30px; text-align: center; border-top: 1px solid #334155;">
            <div style="margin-bottom: 20px;">
              <div style="width: 40px; height: 40px; background: #667eea; border-radius: 8px; margin: 0 auto 12px; display: flex; align-items: center; justify-content: center;">
                <span style="color: white; font-weight: bold; font-size: 18px;">X</span>
              </div>
              <h3 style="color: white; margin: 0 0 8px; font-size: 16px; font-weight: 600;">XoolHub Pilot Program</h3>
              <p style="margin: 0; font-size: 14px;">Empowering Education Through Technology</p>
            </div>
            <div style="border-top: 1px solid #334155; padding-top: 20px; font-size: 12px;">
              <p style="margin: 0;">© 2025 XoolHub. All rights reserved.</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  applicationReceived: (application) => ({
    subject: `Application Received - XoolHub Pilot Program`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Application Received - XoolHub Pilot Program</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
      </head>
      <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); padding: 40px 30px; text-align: center; position: relative; overflow: hidden;">
            <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><defs><pattern id=\"grain\" width=\"100\" height=\"100\" patternUnits=\"userSpaceOnUse\"><circle cx=\"50\" cy=\"50\" r=\"1\" fill=\"white\" opacity=\"0.1\"/></pattern></defs><rect width=\"100\" height=\"100\" fill=\"url(%23grain)\"/></svg></div>
            <div style="position: relative; z-index: 1;">
              <div style="width: 80px; height: 80px; background: rgba(255, 255, 255, 0.2); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                <span style="font-size: 32px; color: white;">📝</span>
              </div>
              <h1 style="color: white; margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">Application Received!</h1>
              <p style="color: rgba(255, 255, 255, 0.9); margin: 10px 0 0; font-size: 18px; font-weight: 400;">Thank you for applying to our pilot program</p>
            </div>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px;">
            <div style="text-align: center; margin-bottom: 40px;">
              <h2 style="color: #1e293b; margin: 0 0 16px; font-size: 24px; font-weight: 600;">We've Received Your Application</h2>
              <p style="color: #64748b; font-size: 16px; line-height: 1.6; margin: 0;">
                Thank you for your interest in the XoolHub Pilot Program! We've successfully received your application for 
                <strong style="color: #6366f1;">${application.school_name}</strong> and our team is now reviewing it.
              </p>
            </div>
            
            <div style="background: #f0f4ff; border: 2px solid #c7d2fe; border-radius: 12px; padding: 30px; margin-bottom: 30px;">
              <h3 style="color: #3730a3; margin: 0 0 20px; font-size: 20px; font-weight: 600; display: flex; align-items: center;">
                <span style="width: 4px; height: 24px; background: #6366f1; border-radius: 2px; margin-right: 12px;"></span>
                What Happens Next?
              </h3>
              <div style="display: flex; flex-direction: column; gap: 16px;">
                <div style="display: flex; align-items: flex-start; gap: 12px;">
                  <div style="width: 24px; height: 24px; background: #6366f1; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px;">
                    <span style="color: white; font-size: 12px; font-weight: bold;">1 </span>
                  </div>
                  <div>
                    <p style="color: #3730a3; margin: 0; font-weight: 500; font-size: 15px;">Application Review</p>
                    <p style="color: #4338ca; margin: 4px 0 0; font-size: 14px; line-height: 1.5;">Our team will carefully review your application and school details</p>
                  </div>
                </div>
                <div style="display: flex; align-items: flex-start; gap: 12px;">
                  <div style="width: 24px; height: 24px; background: #6366f1; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px;">
                    <span style="color: white; font-size: 12px; font-weight: bold;">2 </span>
                  </div>
                  <div>
                    <p style="color: #3730a3; margin: 0; font-weight: 500; font-size: 15px;">Evaluation Process</p>
                    <p style="color: #4338ca; margin: 4px 0 0; font-size: 14px; line-height: 1.5;">We'll assess your school's fit for our pilot program</p>
                  </div>
                </div>
                <div style="display: flex; align-items: flex-start; gap: 12px;">
                  <div style="width: 24px; height: 24px; background: #6366f1; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px;">
                    <span style="color: white; font-size: 12px; font-weight: bold;">3 </span>
                  </div>
                  <div>
                    <p style="color: #3730a3; margin: 0; font-weight: 500; font-size: 15px;">Decision Notification</p>
                    <p style="color: #4338ca; margin: 4px 0 0; font-size: 14px; line-height: 1.5;">You'll receive our decision within 3-5 business days</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div style="background: #f8fafc; border-radius: 12px; padding: 30px; margin-bottom: 30px; border: 1px solid #e2e8f0;">
              <h3 style="color: #1e293b; margin: 0 0 20px; font-size: 20px; font-weight: 600; display: flex; align-items: center;">
                <span style="width: 4px; height: 24px; background: #6366f1; border-radius: 2px; margin-right: 12px;"></span>
                Application Summary
              </h3>
              <div style="background: white; border-radius: 8px; padding: 20px; border: 1px solid #e2e8f0;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px;">
                  <div>
                    <p style="color: #64748b; margin: 0 0 4px; font-size: 14px; font-weight: 500;">School Name</p>
                    <p style="color: #1e293b; margin: 0; font-size: 15px; font-weight: 600;">${application.school_name}</p>
                  </div>
                  <div>
                    <p style="color: #64748b; margin: 0 0 4px; font-size: 14px; font-weight: 500;">School Size</p>
                    <p style="color: #1e293b; margin: 0; font-size: 15px; font-weight: 600;">${application.school_size}</p>
                  </div>
                  <div>
                    <p style="color: #64748b; margin: 0 0 4px; font-size: 14px; font-weight: 500;">Expected Students</p>
                    <p style="color: #1e293b; margin: 0; font-size: 15px; font-weight: 600;">${application.expected_students || 'Not specified'}</p>
                  </div>
                  <div>
                    <p style="color: #64748b; margin: 0 0 4px; font-size: 14px; font-weight: 500;">applied Date</p>
                    <p style="color: #1e293b; margin: 0; font-size: 15px; font-weight: 600;">${new Date(application.start_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                  </div>
                </div>
                <div style="border-top: 1px solid #e2e8f0; padding-top: 16px;">
                  <p style="color: #64748b; margin: 0 0 8px; font-size: 14px; font-weight: 500;">Application ID</p>
                  <p style="color: #6366f1; margin: 0; font-size: 14px; font-family: monospace; background: #f0f4ff; padding: 8px 12px; border-radius: 6px; display: inline-block;">#${application.id || 'APP-' + Date.now()}</p>
                </div>
              </div>
            </div>
            
            <div style="background: #fef3c7; border: 2px solid #fbbf24; border-radius: 12px; padding: 20px; margin-bottom: 30px;">
              <div style="display: flex; align-items: flex-start; gap: 12px;">
                <div style="width: 24px; height: 24px; background: #f59e0b; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                  <span style="color: white; font-size: 14px;">⏰</span>
                </div>
                <div>
                  <p style="color: #92400e; margin: 0; font-weight: 600; font-size: 15px;">Review Timeline</p>
                  <p style="color: #a16207; margin: 4px 0 0; font-size: 14px; line-height: 1.5;">
                    We typically review applications within <strong>3-5 business days</strong>. 
                    You'll receive an email notification once our review is complete.
                  </p>
                </div>
              </div>
            </div>
            
            <div style="text-align: center; margin: 40px 0;">
              <a href="${process.env.FRONTEND_URL}/pilot-program" 
                 style="background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600; font-size: 15px; box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.3); transition: all 0.2s;">
                Learn More About Pilot Program
              </a>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background: #1e293b; color: #94a3b8; padding: 30px; text-align: center; border-top: 1px solid #334155;">
            <div style="margin-bottom: 20px;">
              <div style="width: 40px; height: 40px; background: #6366f1; border-radius: 8px; margin: 0 auto 12px; display: flex; align-items: center; justify-content: center;">
                <span style="color: white; font-weight: bold; font-size: 18px;">X</span>
              </div>
              <h3 style="color: white; margin: 0 0 8px; font-size: 16px; font-weight: 600;">XoolHub Pilot Program</h3>
              <p style="margin: 0; font-size: 14px;">Empowering Education Through Technology</p>
            </div>
            <div style="border-top: 1px solid #334155; padding-top: 20px; font-size: 12px;">
              <p style="margin: 0;">Questions? Contact us at <a href="mailto:pilot@xoolhub.com" style="color: #6366f1; text-decoration: none;">pilot@xoolhub.com</a></p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  applicationApproved: (application) => ({
    subject: `Pilot Program Application approved - ${application.school_name}`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Application approved - XoolHub Pilot Program</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
      </head>
      <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px 30px; text-align: center; position: relative; overflow: hidden;">
            <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><defs><pattern id=\"grain\" width=\"100\" height=\"100\" patternUnits=\"userSpaceOnUse\"><circle cx=\"50\" cy=\"50\" r=\"1\" fill=\"white\" opacity=\"0.1\"/></pattern></defs><rect width=\"100\" height=\"100\" fill=\"url(%23grain)\"/></svg></div>
            <div style="position: relative; z-index: 1;">
              <div style="width: 80px; height: 80px; background: rgba(255, 255, 255, 0.2); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; animation: pulse 2s infinite;">
                <span style="font-size: 32px; color: white;">🎉</span>
              </div>
              <h1 style="color: white; margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">Congratulations!</h1>
              <p style="color: rgba(255, 255, 255, 0.9); margin: 10px 0 0; font-size: 18px; font-weight: 400;">Your pilot program application has been approved</p>
            </div>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px;">
            <div style="text-align: center; margin-bottom: 40px;">
              <h2 style="color: #1e293b; margin: 0 0 16px; font-size: 24px; font-weight: 600;">Welcome to XoolHub Pilot Program!</h2>
              <p style="color: #64748b; font-size: 16px; line-height: 1.6; margin: 0;">
                We're excited to have <strong style="color: #10b981;">${application.school_name}</strong> join our pilot program. 
                You're about to experience the future of educational management!
              </p>
            </div>
            
            <div style="background: #f0fdf4; border: 2px solid #bbf7d0; border-radius: 12px; padding: 30px; margin-bottom: 30px;">
              <h3 style="color: #166534; margin: 0 0 20px; font-size: 20px; font-weight: 600; display: flex; align-items: center;">
                <span style="width: 4px; height: 24px; background: #10b981; border-radius: 2px; margin-right: 12px;"></span>
                What's Next?
              </h3>
              <div style="display: flex; flex-direction: column; gap: 16px;">
                <div style="display: flex; align-items: flex-start; gap: 12px;">
                  <div style="width: 24px; height: 24px; background: #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px;">
                    <span style="color: white; font-size: 12px; font-weight: bold;">1</span>
                  </div>
                  <div>
                    <p style="color: #166534; margin: 0; font-weight: 500; font-size: 15px;">Login to Your Account</p>
                    <p style="color: #15803d; margin: 4px 0 0; font-size: 14px; line-height: 1.5;">Use your email and password to access your pilot program</p>
                  </div>
                </div>
                <div style="display: flex; align-items: flex-start; gap: 12px;">
                  <div style="width: 24px; height: 24px; background: #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px;">
                    <span style="color: white; font-size: 12px; font-weight: bold;">2</span>
                  </div>
                  <div>
                    <p style="color: #166534; margin: 0; font-weight: 500; font-size: 15px;">complete Payment</p>
                    <p style="color: #15803d; margin: 4px 0 0; font-size: 14px; line-height: 1.5;">complete your initial payment to activate your pilot program</p>
                  </div>
                </div>
                <div style="display: flex; align-items: flex-start; gap: 12px;">
                  <div style="width: 24px; height: 24px; background: #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px;">
                    <span style="color: white; font-size: 12px; font-weight: bold;">3</span>
                  </div>
                  <div>
                    <p style="color: #166534; margin: 0; font-weight: 500; font-size: 15px;">Onboarding Session</p>
                    <p style="color: #15803d; margin: 4px 0 0; font-size: 14px; line-height: 1.5;">Our team will contact you within 24 hours to begin onboarding</p>
                  </div>
                </div>
                <div style="display: flex; align-items: flex-start; gap: 12px;">
                  <div style="width: 24px; height: 24px; background: #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px;">
                    <span style="color: white; font-size: 12px; font-weight: bold;">4</span>
                  </div>
                  <div>
                    <p style="color: #166534; margin: 0; font-weight: 500; font-size: 15px;">Start Your Journey</p>
                    <p style="color: #15803d; margin: 4px 0 0; font-size: 14px; line-height: 1.5;">Start enjoying 50% off XoolHub for the next 12 months!</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div style="background: #f8fafc; border-radius: 12px; padding: 30px; margin-bottom: 30px; border: 1px solid #e2e8f0;">
              <h3 style="color: #1e293b; margin: 0 0 20px; font-size: 20px; font-weight: 600; display: flex; align-items: center;">
                <span style="width: 4px; height: 24px; background: #10b981; border-radius: 2px; margin-right: 12px;"></span>
                Pilot Program Benefits
              </h3>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                <div style="display: flex; align-items: center; gap: 12px; padding: 12px; background: white; border-radius: 8px; border: 1px solid #e2e8f0;">
                  <div style="width: 32px; height: 32px; background: #dcfce7; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                    <span style="color: #166534; font-size: 16px;">💰</span>
                  </div>
                  <div>
                    <p style="color: #1e293b; margin: 0; font-weight: 600; font-size: 14px;">50% discount</p>
                    <p style="color: #64748b; margin: 2px 0 0; font-size: 12px;">For 12 months</p>
                  </div>
                </div>
                <div style="display: flex; align-items: center; gap: 12px; padding: 12px; background: white; border-radius: 8px; border: 1px solid #e2e8f0;">
                  <div style="width: 32px; height: 32px; background: #dcfce7; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                    <span style="color: #166534; font-size: 16px;">🚀</span>
                  </div>
                  <div>
                    <p style="color: #1e293b; margin: 0; font-weight: 600; font-size: 14px;">Priority Support</p>
                    <p style="color: #64748b; margin: 2px 0 0; font-size: 12px;">Dedicated assistance</p>
                  </div>
                </div>
                <div style="display: flex; align-items: center; gap: 12px; padding: 12px; background: white; border-radius: 8px; border: 1px solid #e2e8f0;">
                  <div style="width: 32px; height: 32px; background: #dcfce7; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                    <span style="color: #166534; font-size: 16px;">⭐</span>
                  </div>
                  <div>
                    <p style="color: #1e293b; margin: 0; font-weight: 600; font-size: 14px;">Early Access</p>
                    <p style="color: #64748b; margin: 2px 0 0; font-size: 12px;">New features first</p>
                  </div>
                </div>
                <div style="display: flex; align-items: center; gap: 12px; padding: 12px; background: white; border-radius: 8px; border: 1px solid #e2e8f0;">
                  <div style="width: 32px; height: 32px; background: #dcfce7; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                    <span style="color: #166534; font-size: 16px;">👥</span>
                  </div>
                  <div>
                    <p style="color: #1e293b; margin: 0; font-weight: 600; font-size: 14px;">Account Manager</p>
                    <p style="color: #64748b; margin: 2px 0 0; font-size: 12px;">Personal guidance</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div style="text-align: center; margin: 40px 0;">
              <a href="${process.env.FRONTEND_URL}/login" 
                 style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600; font-size: 15px; box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.3); transition: all 0.2s;">
                Login to Access Your Pilot Program
              </a>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background: #1e293b; color: #94a3b8; padding: 30px; text-align: center; border-top: 1px solid #334155;">
            <div style="margin-bottom: 20px;">
              <div style="width: 40px; height: 40px; background: #10b981; border-radius: 8px; margin: 0 auto 12px; display: flex; align-items: center; justify-content: center;">
                <span style="color: white; font-weight: bold; font-size: 18px;">X</span>
              </div>
              <h3 style="color: white; margin: 0 0 8px; font-size: 16px; font-weight: 600;">XoolHub Pilot Program</h3>
              <p style="margin: 0; font-size: 14px;">Empowering Education Through Technology</p>
            </div>
            <div style="border-top: 1px solid #334155; padding-top: 20px; font-size: 12px;">
              <p style="margin: 0;">Questions? Contact us at <a href="mailto:pilot@xoolhub.com" style="color: #10b981; text-decoration: none;">pilot@xoolhub.com</a></p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  applicationRejected: (application, reason) => ({
    subject: `Pilot Program Application Update - ${application.school_name}`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Application Update - XoolHub Pilot Program</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
      </head>
      <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); padding: 40px 30px; text-align: center; position: relative; overflow: hidden;">
            <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><defs><pattern id=\"grain\" width=\"100\" height=\"100\" patternUnits=\"userSpaceOnUse\"><circle cx=\"50\" cy=\"50\" r=\"1\" fill=\"white\" opacity=\"0.1\"/></pattern></defs><rect width=\"100\" height=\"100\" fill=\"url(%23grain)\"/></svg></div>
            <div style="position: relative; z-index: 1;">
              <div style="width: 60px; height: 60px; background: rgba(255, 255, 255, 0.2); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                <span style="font-size: 24px; color: white;">📋</span>
              </div>
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">Application Update</h1>
              <p style="color: rgba(255, 255, 255, 0.9); margin: 10px 0 0; font-size: 16px; font-weight: 400;">Thank you for your interest in our pilot program</p>
            </div>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px;">
            <div style="text-align: center; margin-bottom: 40px;">
              <h2 style="color: #1e293b; margin: 0 0 16px; font-size: 24px; font-weight: 600;">Application Status Update</h2>
              <p style="color: #64748b; font-size: 16px; line-height: 1.6; margin: 0;">
                Thank you for your interest in the XoolHub Pilot Program. After careful review, 
                we are unable to approve your application for <strong style="color: #ef4444;">${application.school_name}</strong> at this time.
              </p>
            </div>
            
            ${reason ? `
            <div style="background: #fef2f2; border: 2px solid #fecaca; border-radius: 12px; padding: 30px; margin-bottom: 30px;">
              <h3 style="color: #dc2626; margin: 0 0 16px; font-size: 18px; font-weight: 600; display: flex; align-items: center;">
                <span style="width: 4px; height: 20px; background: #ef4444; border-radius: 2px; margin-right: 12px;"></span>
                Reason for Rejection
              </h3>
              <p style="color: #991b1b; line-height: 1.7; margin: 0; font-size: 15px; background: white; padding: 20px; border-radius: 8px; border: 1px solid #fecaca;">${reason}</p>
            </div>
            ` : ''}
            
            <div style="background: #f8fafc; border-radius: 12px; padding: 30px; margin-bottom: 30px; border: 1px solid #e2e8f0;">
              <h3 style="color: #1e293b; margin: 0 0 20px; font-size: 20px; font-weight: 600; display: flex; align-items: center;">
                <span style="width: 4px; height: 24px; background: #667eea; border-radius: 2px; margin-right: 12px;"></span>
                Alternative Options
              </h3>
              <div style="display: flex; flex-direction: column; gap: 16px;">
                <div style="display: flex; align-items: flex-start; gap: 12px; padding: 16px; background: white; border-radius: 8px; border: 1px solid #e2e8f0;">
                  <div style="width: 32px; height: 32px; background: #dbeafe; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                    <span style="color: #1d4ed8; font-size: 16px;">💳</span>
                  </div>
                  <div>
                    <p style="color: #1e293b; margin: 0; font-weight: 600; font-size: 15px;">Regular Subscription Plans</p>
                    <p style="color: #64748b; margin: 4px 0 0; font-size: 14px; line-height: 1.5;">Apply for our regular subscription plans with flexible payment options</p>
                  </div>
                </div>
                <div style="display: flex; align-items: flex-start; gap: 12px; padding: 16px; background: white; border-radius: 8px; border: 1px solid #e2e8f0;">
                  <div style="width: 32px; height: 32px; background: #dbeafe; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                    <span style="color: #1d4ed8; font-size: 16px;">💬</span>
                  </div>
                  <div>
                    <p style="color: #1e293b; margin: 0; font-weight: 600; font-size: 15px;">Custom Pricing Solutions</p>
                    <p style="color: #64748b; margin: 4px 0 0; font-size: 14px; line-height: 1.5;">Contact our sales team for custom pricing solutions</p>
                  </div>
                </div>
                <div style="display: flex; align-items: flex-start; gap: 12px; padding: 16px; background: white; border-radius: 8px; border: 1px solid #e2e8f0;">
                  <div style="width: 32px; height: 32px; background: #dbeafe; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                    <span style="color: #1d4ed8; font-size: 16px;">⏰</span>
                  </div>
                  <div>
                    <p style="color: #1e293b; margin: 0; font-weight: 600; font-size: 15px;">Waiting List</p>
                    <p style="color: #64748b; margin: 4px 0 0; font-size: 14px; line-height: 1.5;">Join our waiting list for future pilot program opportunities</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div style="text-align: center; margin: 40px 0;">
              <a href="${process.env.FRONTEND_URL}/pricing" 
                 style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600; font-size: 15px; box-shadow: 0 4px 6px -1px rgba(102, 126, 234, 0.3); margin-right: 12px;">
                View Regular Plans
              </a>
              <a href="${process.env.FRONTEND_URL}/contact" 
                 style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600; font-size: 15px; box-shadow: 0 4px 6px -1px rgba(239, 68, 68, 0.3);">
                Contact Sales
              </a>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background: #1e293b; color: #94a3b8; padding: 30px; text-align: center; border-top: 1px solid #334155;">
            <div style="margin-bottom: 20px;">
              <div style="width: 40px; height: 40px; background: #667eea; border-radius: 8px; margin: 0 auto 12px; display: flex; align-items: center; justify-content: center;">
                <span style="color: white; font-weight: bold; font-size: 18px;">X</span>
              </div>
              <h3 style="color: white; margin: 0 0 8px; font-size: 16px; font-weight: 600;">XoolHub Pilot Program</h3>
              <p style="margin: 0; font-size: 14px;">Empowering Education Through Technology</p>
            </div>
            <div style="border-top: 1px solid #334155; padding-top: 20px; font-size: 12px;">
              <p style="margin: 0;">Questions? Contact us at <a href="mailto:support@xoolhub.com" style="color: #667eea; text-decoration: none;">support@xoolhub.com</a></p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  paymentReceived: (program, payment) => ({
    subject: `Pilot Program Payment Received - ${program.school_name}`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Payment Received - XoolHub Pilot Program</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
      </head>
      <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); padding: 40px 30px; text-align: center; position: relative; overflow: hidden;">
            <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><defs><pattern id=\"grain\" width=\"100\" height=\"100\" patternUnits=\"userSpaceOnUse\"><circle cx=\"50\" cy=\"50\" r=\"1\" fill=\"white\" opacity=\"0.1\"/></pattern></defs><rect width=\"100\" height=\"100\" fill=\"url(%23grain)\"/></svg></div>
            <div style="position: relative; z-index: 1;">
              <div style="width: 80px; height: 80px; background: rgba(255, 255, 255, 0.2); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                <span style="font-size: 32px; color: white;">💰</span>
              </div>
              <h1 style="color: white; margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">Payment Received!</h1>
              <p style="color: rgba(255, 255, 255, 0.9); margin: 10px 0 0; font-size: 18px; font-weight: 400;">Thank you for your payment</p>
            </div>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px;">
            <div style="text-align: center; margin-bottom: 40px;">
              <h2 style="color: #1e293b; margin: 0 0 16px; font-size: 24px; font-weight: 600;">Payment Confirmation</h2>
              <p style="color: #64748b; font-size: 16px; line-height: 1.6; margin: 0;">
                We have successfully received your initial payment for the pilot program at 
                <strong style="color: #3b82f6;">${program.school_name}</strong>.
              </p>
            </div>
            
            <div style="background: #f8fafc; border-radius: 12px; padding: 30px; margin-bottom: 30px; border: 1px solid #e2e8f0;">
              <h3 style="color: #1e293b; margin: 0 0 20px; font-size: 20px; font-weight: 600; display: flex; align-items: center;">
                <span style="width: 4px; height: 24px; background: #3b82f6; border-radius: 2px; margin-right: 12px;"></span>
                Payment Details
              </h3>
              
              <div style="background: white; border-radius: 8px; overflow: hidden; border: 1px solid #e2e8f0;">
                <table style="width: 100%; border-collapse: collapse;">
                  <tr style="background: #f8fafc;">
                    <td style="padding: 16px 20px; font-weight: 600; color: #475569; font-size: 14px; border-bottom: 1px solid #e2e8f0; width: 40%;">Amount paid</td>
                    <td style="padding: 16px 20px; color: #1e293b; font-size: 14px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #10b981;">MK ${payment.amount.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td style="padding: 16px 20px; font-weight: 600; color: #475569; font-size: 14px; border-bottom: 1px solid #e2e8f0;">Payment Method</td>
                    <td style="padding: 16px 20px; color: #1e293b; font-size: 14px; border-bottom: 1px solid #e2e8f0;">${payment.payment_method}</td>
                  </tr>
                  <tr style="background: #f8fafc;">
                    <td style="padding: 16px 20px; font-weight: 600; color: #475569; font-size: 14px; border-bottom: 1px solid #e2e8f0;">Transaction ID</td>
                    <td style="padding: 16px 20px; color: #1e293b; font-size: 14px; border-bottom: 1px solid #e2e8f0; font-family: monospace;">${payment.transaction_id}</td>
                  </tr>
                  <tr>
                    <td style="padding: 16px 20px; font-weight: 600; color: #475569; font-size: 14px;">Payment Date</td>
                    <td style="padding: 16px 20px; color: #1e293b; font-size: 14px;">${new Date(payment.payment_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
                  </tr>
                </table>
              </div>
            </div>
            
            <div style="background: #eff6ff; border: 2px solid #bfdbfe; border-radius: 12px; padding: 30px; margin-bottom: 30px;">
              <h3 style="color: #1e40af; margin: 0 0 20px; font-size: 20px; font-weight: 600; display: flex; align-items: center;">
                <span style="width: 4px; height: 24px; background: #3b82f6; border-radius: 2px; margin-right: 12px;"></span>
                What's Next?
              </h3>
              <div style="display: flex; flex-direction: column; gap: 16px;">
                <div style="display: flex; align-items: flex-start; gap: 12px;">
                  <div style="width: 24px; height: 24px; background: #3b82f6; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px;">
                    <span style="color: white; font-size: 12px; font-weight: bold;">1</span>
                  </div>
                  <div>
                    <p style="color: #1e40af; margin: 0; font-weight: 500; font-size: 15px;">Payment Verification</p>
                    <p style="color: #1d4ed8; margin: 4px 0 0; font-size: 14px; line-height: 1.5;">Our team will verify your payment within 24 hours</p>
                  </div>
                </div>
                <div style="display: flex; align-items: flex-start; gap: 12px;">
                  <div style="width: 24px; height: 24px; background: #3b82f6; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px;">
                    <span style="color: white; font-size: 12px; font-weight: bold;">2</span>
                  </div>
                  <div>
                    <p style="color: #1e40af; margin: 0; font-weight: 500; font-size: 15px;">Account Access</p>
                    <p style="color: #1d4ed8; margin: 4px 0 0; font-size: 14px; line-height: 1.5;">You'll receive login credentials for your pilot account</p>
                  </div>
                </div>
                <div style="display: flex; align-items: flex-start; gap: 12px;">
                  <div style="width: 24px; height: 24px; background: #3b82f6; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px;">
                    <span style="color: white; font-size: 12px; font-weight: bold;">3</span>
                  </div>
                  <div>
                    <p style="color: #1e40af; margin: 0; font-weight: 500; font-size: 15px;">Onboarding Session</p>
                    <p style="color: #1d4ed8; margin: 4px 0 0; font-size: 14px; line-height: 1.5;">We'll schedule your personalized onboarding session</p>
                  </div>
                </div>
                <div style="display: flex; align-items: flex-start; gap: 12px;">
                  <div style="width: 24px; height: 24px; background: #3b82f6; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px;">
                    <span style="color: white; font-size: 12px; font-weight: bold;">4</span>
                  </div>
                  <div>
                    <p style="color: #1e40af; margin: 0; font-weight: 500; font-size: 15px;">Start Your Journey</p>
                    <p style="color: #1d4ed8; margin: 4px 0 0; font-size: 14px; line-height: 1.5;">Start using XoolHub at 50% off for 12 months!</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div style="text-align: center; margin: 40px 0;">
              <a href="${process.env.FRONTEND_URL}/pilot-program" 
                 style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600; font-size: 15px; box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.3); transition: all 0.2s;">
                View Pilot Program Details
              </a>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background: #1e293b; color: #94a3b8; padding: 30px; text-align: center; border-top: 1px solid #334155;">
            <div style="margin-bottom: 20px;">
              <div style="width: 40px; height: 40px; background: #3b82f6; border-radius: 8px; margin: 0 auto 12px; display: flex; align-items: center; justify-content: center;">
                <span style="color: white; font-weight: bold; font-size: 18px;">X</span>
              </div>
              <h3 style="color: white; margin: 0 0 8px; font-size: 16px; font-weight: 600;">XoolHub Pilot Program</h3>
              <p style="margin: 0; font-size: 14px;">Empowering Education Through Technology</p>
            </div>
            <div style="border-top: 1px solid #334155; padding-top: 20px; font-size: 12px;">
              <p style="margin: 0;">Questions? Contact us at <a href="mailto:pilot@xoolhub.com" style="color: #3b82f6; text-decoration: none;">pilot@xoolhub.com</a></p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `
  }),

  programExpiring: (program) => ({
    subject: `Pilot Program Expiring Soon - ${program.school_name}`,
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Program Expiring Soon - XoolHub Pilot Program</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
      </head>
      <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 40px 30px; text-align: center; position: relative; overflow: hidden;">
            <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><defs><pattern id=\"grain\" width=\"100\" height=\"100\" patternUnits=\"userSpaceOnUse\"><circle cx=\"50\" cy=\"50\" r=\"1\" fill=\"white\" opacity=\"0.1\"/></pattern></defs><rect width=\"100\" height=\"100\" fill=\"url(%23grain)\"/></svg></div>
            <div style="position: relative; z-index: 1;">
              <div style="width: 80px; height: 80px; background: rgba(255, 255, 255, 0.2); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                <span style="font-size: 32px; color: white;">⏰</span>
              </div>
              <h1 style="color: white; margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -0.5px;">Program Expiring Soon</h1>
              <p style="color: rgba(255, 255, 255, 0.9); margin: 10px 0 0; font-size: 18px; font-weight: 400;">Action required to continue your service</p>
            </div>
          </div>
          
          <!-- Content -->
          <div style="padding: 40px 30px;">
            <div style="text-align: center; margin-bottom: 40px;">
              <h2 style="color: #1e293b; margin: 0 0 16px; font-size: 24px; font-weight: 600;">Important Notice</h2>
              <p style="color: #64748b; font-size: 16px; line-height: 1.6; margin: 0;">
                Your pilot program for <strong style="color: #f59e0b;">${program.school_name}</strong> will expire on 
                <strong style="color: #dc2626;">${new Date(program.end_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</strong>.
              </p>
            </div>
            
            <div style="background: #fef3c7; border: 2px solid #fbbf24; border-radius: 12px; padding: 30px; margin-bottom: 30px;">
              <h3 style="color: #92400e; margin: 0 0 20px; font-size: 20px; font-weight: 600; display: flex; align-items: center;">
                <span style="width: 4px; height: 24px; background: #f59e0b; border-radius: 2px; margin-right: 12px;"></span>
                Action Required
              </h3>
              <p style="color: #92400e; line-height: 1.6; margin: 0 0 20px; font-size: 15px;">
                To continue using XoolHub, please choose one of the following options:
              </p>
              <div style="display: flex; flex-direction: column; gap: 16px;">
                <div style="display: flex; align-items: flex-start; gap: 12px; padding: 16px; background: white; border-radius: 8px; border: 1px solid #fbbf24;">
                  <div style="width: 32px; height: 32px; background: #fef3c7; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                    <span style="color: #92400e; font-size: 16px;">📈</span>
                  </div>
                  <div>
                    <p style="color: #92400e; margin: 0; font-weight: 600; font-size: 15px;">Upgrade to Regular Plan</p>
                    <p style="color: #a16207; margin: 4px 0 0; font-size: 14px; line-height: 1.5;">Choose from our flexible subscription plans</p>
                  </div>
                </div>
                <div style="display: flex; align-items: flex-start; gap: 12px; padding: 16px; background: white; border-radius: 8px; border: 1px solid #fbbf24;">
                  <div style="width: 32px; height: 32px; background: #fef3c7; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                    <span style="color: #92400e; font-size: 16px;">⏳</span>
                  </div>
                  <div>
                    <p style="color: #92400e; margin: 0; font-weight: 600; font-size: 15px;">Extend Pilot Program</p>
                    <p style="color: #a16207; margin: 4px 0 0; font-size: 14px; line-height: 1.5;">Request an extension if you're eligible</p>
                  </div>
                </div>
                <div style="display: flex; align-items: flex-start; gap: 12px; padding: 16px; background: white; border-radius: 8px; border: 1px solid #fbbf24;">
                  <div style="width: 32px; height: 32px; background: #fef3c7; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                    <span style="color: #92400e; font-size: 16px;">💾</span>
                  </div>
                  <div>
                    <p style="color: #92400e; margin: 0; font-weight: 600; font-size: 15px;">Export Your Data</p>
                    <p style="color: #a16207; margin: 4px 0 0; font-size: 14px; line-height: 1.5;">Download your data before expiration</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div style="background: #f8fafc; border-radius: 12px; padding: 30px; margin-bottom: 30px; border: 1px solid #e2e8f0;">
              <h3 style="color: #1e293b; margin: 0 0 20px; font-size: 20px; font-weight: 600; display: flex; align-items: center;">
                <span style="width: 4px; height: 24px; background: #f59e0b; border-radius: 2px; margin-right: 12px;"></span>
                What Happens Next?
              </h3>
              <div style="display: flex; flex-direction: column; gap: 12px;">
                <div style="display: flex; align-items: center; gap: 12px; padding: 12px; background: white; border-radius: 8px; border: 1px solid #e2e8f0;">
                  <div style="width: 24px; height: 24px; background: #fef3c7; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                    <span style="color: #92400e; font-size: 12px; font-weight: bold;">1</span>
                  </div>
                  <p style="color: #64748b; margin: 0; font-size: 14px;">Your pilot program will automatically expire on the end date</p>
                </div>
                <div style="display: flex; align-items: center; gap: 12px; padding: 12px; background: white; border-radius: 8px; border: 1px solid #e2e8f0;">
                  <div style="width: 24px; height: 24px; background: #fef3c7; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                    <span style="color: #92400e; font-size: 12px; font-weight: bold;">2</span>
                  </div>
                  <p style="color: #64748b; margin: 0; font-size: 14px;">Access to XoolHub features will be restricted</p>
                </div>
                <div style="display: flex; align-items: center; gap: 12px; padding: 12px; background: white; border-radius: 8px; border: 1px solid #e2e8f0;">
                  <div style="width: 24px; height: 24px; background: #fef3c7; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                    <span style="color: #92400e; font-size: 12px; font-weight: bold;">3</span>
                  </div>
                  <p style="color: #64748b; margin: 0; font-size: 14px;">Your data will be securely stored for 30 days</p>
                </div>
              </div>
            </div>
            
            <div style="text-align: center; margin: 40px 0;">
              <a href="${process.env.FRONTEND_URL}/pricing" 
                 style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600; font-size: 15px; box-shadow: 0 4px 6px -1px rgba(245, 158, 11, 0.3); margin-right: 12px;">
                View Plans
              </a>
              <a href="${process.env.FRONTEND_URL}/contact" 
                 style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600; font-size: 15px; box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.3);">
                Contact Support
              </a>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background: #1e293b; color: #94a3b8; padding: 30px; text-align: center; border-top: 1px solid #334155;">
            <div style="margin-bottom: 20px;">
              <div style="width: 40px; height: 40px; background: #f59e0b; border-radius: 8px; margin: 0 auto 12px; display: flex; align-items: center; justify-content: center;">
                <span style="color: white; font-weight: bold; font-size: 18px;">X</span>
              </div>
              <h3 style="color: white; margin: 0 0 8px; font-size: 16px; font-weight: 600;">XoolHub Pilot Program</h3>
              <p style="margin: 0; font-size: 14px;">Empowering Education Through Technology</p>
            </div>
            <div style="border-top: 1px solid #334155; padding-top: 20px; font-size: 12px;">
              <p style="margin: 0;">Questions? Contact us at <a href="mailto:support@xoolhub.com" style="color: #f59e0b; text-decoration: none;">support@xoolhub.com</a></p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `
  })
};

// Email sending functions
const sendEmail = async (to, template, data) => {
  try {
    const emailContent = template(data);
    
    const emailData = {
      from: 'XoolHub <noreply@xoolhub.com>', // Use your verified domain
      replyTo: 'support@xoolhub.com', // Add reply-to for better deliverability
      to: [to],
      subject: emailContent.subject,
      html: emailContent.html,
      // Add headers for better deliverability
      headers: {
        'X-Mailer': 'XoolHub System v1.0',
        'X-Priority': '3',
        'X-MSMail-Priority': 'Normal',
        'Importance': 'Normal',
        'List-Unsubscribe': '<mailto:unsubscribe@xoolhub.com>',
        'X-Entity-Ref-ID': `xoolhub-${Date.now()}`
      }
    };

    const result = await resend.emails.send(emailData);
    console.log('Email sent successfully:', result.data?.id);
    return { success: true, messageId: result.data?.id };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

// Specific email functions
const sendNewApplicationNotification = async (application) => {
  return await sendEmail('admin@xoolhub.com', emailTemplates.newApplication, application);
};

const sendApplicationReceivedEmail = async (application) => {
  return await sendEmail(application.contact_email, emailTemplates.applicationReceived, application);
};

const sendApplicationApprovedEmail = async (application) => {
  return await sendEmail(application.contact_email, emailTemplates.applicationApproved, application);
};

const sendApplicationRejectedEmail = async (application, reason) => {
  return await sendEmail(application.contact_email, emailTemplates.applicationRejected, application, reason);
};

const sendPaymentReceivedEmail = async (program, payment) => {
  return await sendEmail(program.contact_email, emailTemplates.paymentReceived, { program, payment });
};

const sendProgramExpiringEmail = async (program) => {
  return await sendEmail(program.contact_email, emailTemplates.programExpiring, program);
};

// Admin notification for all pilot program events
const sendAdminNotification = async (eventType, data) => {
  const adminEmail = 'admin@xoolhub.com';
  
  let subject, message;
  
  switch (eventType) {
    case 'new_application':
      subject = `New Pilot Application - ${data.school_name}`;
      message = `A new pilot program application has been received from ${data.school_name}. Please review it in the admin dashboard.`;
      break;
    case 'application_approved':
      subject = `Application approved - ${data.school_name}`;
      message = `The pilot program application for ${data.school_name} has been approved.`;
      break;
    case 'application_rejected':
      subject = `Application rejected - ${data.school_name}`;
      message = `The pilot program application for ${data.school_name} has been rejected.`;
      break;
    case 'payment_received':
      subject = `Payment Received - ${data.school_name}`;
      message = `A payment of MK ${data.amount} has been received for ${data.school_name}'s pilot program.`;
      break;
    case 'program_created':
      subject = `Pilot Program Created - ${data.school_name}`;
      message = `A new pilot program has been created for ${data.school_name}.`;
      break;
    case 'program_expiring':
      subject = `Program Expiring - ${data.school_name}`;
      message = `The pilot program for ${data.school_name} will expire on ${data.end_date}.`;
      break;
    default:
      subject = 'Pilot Program Update';
      message = 'A pilot program event has occurred.';
  }

  try {
    const emailData = {
      from: 'XoolHub <noreply@xoolhub.com>',
      replyTo: 'admin@xoolhub.com',
      to: [adminEmail],
      subject: `[XoolHub Pilot] ${subject}`,
      // Add headers for better deliverability
      headers: {
        'X-Mailer': 'XoolHub Admin System v1.0',
        'X-Priority': '3',
        'X-MSMail-Priority': 'Normal',
        'Importance': 'Normal',
        'X-Entity-Ref-ID': `xoolhub-admin-${Date.now()}`
      },
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Admin Notification - XoolHub Pilot Program</title>
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        </head>
        <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center; position: relative; overflow: hidden;">
              <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 100 100\"><defs><pattern id=\"grain\" width=\"100\" height=\"100\" patternUnits=\"userSpaceOnUse\"><circle cx=\"50\" cy=\"50\" r=\"1\" fill=\"white\" opacity=\"0.1\"/></pattern></defs><rect width=\"100\" height=\"100\" fill=\"url(%23grain)\"/></svg></div>
              <div style="position: relative; z-index: 1;">
                <div style="width: 60px; height: 60px; background: rgba(255, 255, 255, 0.2); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
                  <span style="font-size: 24px; color: white;">🔔</span>
                </div>
                <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">Admin Notification</h1>
                <p style="color: rgba(255, 255, 255, 0.9); margin: 10px 0 0; font-size: 16px; font-weight: 400;">Pilot Program Management System</p>
              </div>
            </div>
            
            <!-- Content -->
            <div style="padding: 40px 30px;">
              <div style="text-align: center; margin-bottom: 40px;">
                <h2 style="color: #1e293b; margin: 0 0 16px; font-size: 24px; font-weight: 600;">${subject}</h2>
                <p style="color: #64748b; font-size: 16px; line-height: 1.6; margin: 0;">${message}</p>
              </div>
              
              <div style="background: #f8fafc; border-radius: 12px; padding: 30px; margin-bottom: 30px; border: 1px solid #e2e8f0;">
                <h3 style="color: #1e293b; margin: 0 0 20px; font-size: 20px; font-weight: 600; display: flex; align-items: center;">
                  <span style="width: 4px; height: 24px; background: #667eea; border-radius: 2px; margin-right: 12px;"></span>
                  Event Details
                </h3>
                <div style="background: white; border-radius: 8px; padding: 20px; border: 1px solid #e2e8f0; overflow-x: auto;">
                  <pre style="color: #64748b; font-size: 13px; white-space: pre-wrap; margin: 0; font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace; line-height: 1.5;">${JSON.stringify(data, null, 2)}</pre>
                </div>
              </div>
              
              <div style="text-align: center; margin: 40px 0;">
                <a href="${process.env.FRONTEND_URL}/pilot-program-dashboard" 
                   style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600; font-size: 15px; box-shadow: 0 4px 6px -1px rgba(102, 126, 234, 0.3); transition: all 0.2s;">
                  View Dashboard
                </a>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background: #1e293b; color: #94a3b8; padding: 30px; text-align: center; border-top: 1px solid #334155;">
              <div style="margin-bottom: 20px;">
                <div style="width: 40px; height: 40px; background: #667eea; border-radius: 8px; margin: 0 auto 12px; display: flex; align-items: center; justify-content: center;">
                  <span style="color: white; font-weight: bold; font-size: 18px;">X</span>
                </div>
                <h3 style="color: white; margin: 0 0 8px; font-size: 16px; font-weight: 600;">XoolHub Pilot Program</h3>
                <p style="margin: 0; font-size: 14px;">Empowering Education Through Technology</p>
              </div>
              <div style="border-top: 1px solid #334155; padding-top: 20px; font-size: 12px;">
                <p style="margin: 0;">© 2025 XoolHub. All rights reserved.</p>
              </div>
            </div>
          </div>
        </body>
        </html>
      `
    };

    const result = await resend.emails.send(emailData);
    console.log('Admin notification sent:', result.data?.id);
    return { success: true, messageId: result.data?.id };
  } catch (error) {
    console.error('Error sending admin notification:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendNewApplicationNotification,
  sendApplicationReceivedEmail,
  sendApplicationApprovedEmail,
  sendApplicationRejectedEmail,
  sendPaymentReceivedEmail,
  sendProgramExpiringEmail,
  sendAdminNotification,
  emailTemplates
};
