const { Resend } = require('resend');
require('dotenv').config();

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// Email template for super-admin when a new payment is initiated
function SuperAdminPaymentNotification(paymentData) {
  return {
    subject: `🚨 New Payment Request - ${paymentData.schoolName}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>🚨 New Payment Request - ${paymentData.schoolName}</title>
        <meta name="description" content="New payment request requires immediate attention">
        <meta name="keywords" content="payment, xoolhub, school, subscription">
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            margin: 0; 
            padding: 0; 
            background-color: #f8f9fa;
          }
          .container { 
            max-width: 600px; 
            margin: 0 auto; 
            padding: 20px; 
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          }
          .header { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
            color: white; 
            padding: 40px 30px; 
            text-align: center; 
            border-radius: 12px 12px 0 0; 
            margin: -20px -20px 0 -20px;
          }
          .header h1 { margin: 0; font-size: 28px; font-weight: 700; }
          .header p { margin: 10px 0 0 0; font-size: 16px; opacity: 0.9; }
          .content { padding: 30px; }
          .payment-card { 
            background: #f8f9fa; 
            border-radius: 12px; 
            padding: 25px; 
            margin: 25px 0; 
            border: 1px solid #e9ecef;
            border-left: 4px solid #007bff;
          }
          .amount { font-size: 28px; font-weight: bold; color: #28a745; }
          .status { 
            display: inline-block; 
            padding: 8px 16px; 
            background: #ffc107; 
            color: #856404; 
            border-radius: 25px; 
            font-size: 12px; 
            font-weight: bold; 
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .button { 
            display: inline-block; 
            background: linear-gradient(135deg, #007bff 0%, #0056b3 100%); 
            color: white; 
            padding: 15px 35px; 
            text-decoration: none; 
            border-radius: 8px; 
            margin: 15px 0; 
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            box-shadow: 0 4px 15px rgba(0,123,255,0.3);
            transition: all 0.3s ease;
          }
          .button:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,123,255,0.4); }
          .footer { 
            text-align: center; 
            margin-top: 40px; 
            color: #6c757d; 
            font-size: 12px; 
            padding-top: 20px;
            border-top: 1px solid #e9ecef;
          }
          .highlight { 
            background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%); 
            padding: 20px; 
            border-left: 4px solid #2196f3; 
            margin: 20px 0; 
            border-radius: 8px;
          }
          .urgent { 
            background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%); 
            border-left-color: #ffc107; 
            border: 1px solid #ffeaa7;
          }
          table { width: 100%; border-collapse: collapse; }
          td { padding: 12px 8px; border-bottom: 1px solid #e9ecef; }
          .label { font-weight: 600; color: #495057; }
          .value { color: #212529; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🚨 New Payment Request</h1>
            <p>A school has initiated a payment and requires your approval</p>
          </div>
          
          <div class="content">
            <div class="highlight urgent">
              <strong>🚨 URGENT ACTION REQUIRED:</strong> A new payment request has been submitted and requires immediate review and approval in the Super Admin dashboard.
            </div>
            
            <div class="payment-card">
              <h3 style="margin-top: 0; color: #495057; font-size: 20px;">📋 Payment Details</h3>
              <table>
                <tr>
                  <td class="label">🏫 School Name:</td>
                  <td class="value">${paymentData.schoolName}</td>
                </tr>
                <tr>
                  <td class="label">📧 Email:</td>
                  <td class="value">${paymentData.schoolEmail}</td>
                </tr>
                <tr>
                  <td class="label">📞 Contact:</td>
                  <td class="value">${paymentData.schoolContact}</td>
                </tr>
                <tr>
                  <td class="label">📦 Plan:</td>
                  <td class="value">${paymentData.subscriptionName}</td>
                </tr>
                <tr>
                  <td class="label">🔄 Billing Cycle:</td>
                  <td class="value">${paymentData.billingCycle}</td>
                </tr>
                <tr>
                  <td class="label">💰 Amount:</td>
                  <td class="value"><span class="amount">MK${paymentData.grandTotal}</span></td>
                </tr>
                <tr>
                  <td class="label">📊 Status:</td>
                  <td class="value"><span class="status">PENDING APPROVAL</span></td>
                </tr>
                <tr>
                  <td class="label">⏰ Requested At:</td>
                  <td class="value">${new Date().toLocaleString()}</td>
                </tr>
              </table>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.CLIENT_URL}/subscriptions" class="button">
                Review Payment in Subscriptions
              </a>
            </div>
            
            <div class="highlight">
              <strong>Next Steps:</strong>
              <ul>
                <li>Log into the Super Admin dashboard</li>
                <li>Navigate to the Payments section</li>
                <li>Review the payment details</li>
                <li>Approve or reject the payment</li>
                <li>The school will be automatically notified of your decision</li>
              </ul>
            </div>
          </div>
          
          <div class="footer">
            <p>This is an automated notification from XoolHub Payment System</p>
            <p>Please do not reply to this email</p>
          </div>
        </div>
      </body>
      </html>
    `
  };
}

// Email template for school when payment is approved
function SchoolPaymentApprovalEmail(paymentData) {
  return {
    subject: `✅ Payment approved - Welcome to XoolHub Premium!`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>✅ Payment approved - Welcome to XoolHub Premium!</title>
        <meta name="description" content="Your XoolHub subscription has been approved and activated">
        <meta name="keywords" content="xoolhub, subscription, approved, premium, school">
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            margin: 0; 
            padding: 0; 
            background-color: #f8f9fa;
          }
          .container { 
            max-width: 600px; 
            margin: 0 auto; 
            padding: 20px; 
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          }
          .header { 
            background: linear-gradient(135deg, #28a745 0%, #20c997 100%); 
            color: white; 
            padding: 40px 30px; 
            text-align: center; 
            border-radius: 12px 12px 0 0; 
            margin: -20px -20px 0 -20px;
          }
          .header h1 { margin: 0; font-size: 28px; font-weight: 700; }
          .header p { margin: 10px 0 0 0; font-size: 16px; opacity: 0.9; }
          .content { padding: 30px; }
          .success-card { 
            background: #f8f9fa; 
            border-radius: 12px; 
            padding: 25px; 
            margin: 25px 0; 
            border: 1px solid #e9ecef;
            border-left: 4px solid #28a745;
          }
          .amount { font-size: 28px; font-weight: bold; color: #28a745; }
          .status { 
            display: inline-block; 
            padding: 8px 16px; 
            background: #28a745; 
            color: white; 
            border-radius: 25px; 
            font-size: 12px; 
            font-weight: bold; 
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .button { 
            display: inline-block; 
            background: linear-gradient(135deg, #007bff 0%, #0056b3 100%); 
            color: white; 
            padding: 15px 35px; 
            text-decoration: none; 
            border-radius: 8px; 
            margin: 15px 0; 
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            box-shadow: 0 4px 15px rgba(0,123,255,0.3);
            transition: all 0.3s ease;
          }
          .button:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,123,255,0.4); }
          .footer { 
            text-align: center; 
            margin-top: 40px; 
            color: #6c757d; 
            font-size: 12px; 
            padding-top: 20px;
            border-top: 1px solid #e9ecef;
          }
          .highlight { 
            background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%); 
            padding: 20px; 
            border-left: 4px solid #28a745; 
            margin: 20px 0; 
            border-radius: 8px;
            border: 1px solid #c3e6cb;
          }
          .features { 
            background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%); 
            padding: 25px; 
            border-radius: 12px; 
            margin: 25px 0; 
            border: 1px solid #e9ecef;
          }
          .feature-item { 
            margin: 12px 0; 
            padding: 8px 0;
            font-weight: 500;
          }
          table { width: 100%; border-collapse: collapse; }
          td { padding: 12px 8px; border-bottom: 1px solid #e9ecef; }
          .label { font-weight: 600; color: #495057; }
          .value { color: #212529; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Payment approved!</h1>
            <p>Your XoolHub subscription is now active</p>
          </div>
          
          <div class="content">
            <div class="highlight">
              <strong>🎉 Congratulations!</strong> Your payment has been approved and your XoolHub subscription is now active. Welcome to the premium experience!
            </div>
            
            <div class="success-card">
              <h3 style="margin-top: 0; color: #495057; font-size: 20px;">📋 Subscription Details</h3>
              <table>
                <tr>
                  <td class="label">📦 Plan:</td>
                  <td class="value">${paymentData.subscriptionName}</td>
                </tr>
                <tr>
                  <td class="label">🔄 Billing Cycle:</td>
                  <td class="value">${paymentData.billingCycle}</td>
                </tr>
                <tr>
                  <td class="label">💰 Amount paid:</td>
                  <td class="value"><span class="amount">MK${paymentData.grandTotal}</span></td>
                </tr>
                <tr>
                  <td class="label">📊 Status:</td>
                  <td class="value"><span class="status">ACTIVE</span></td>
                </tr>
                <tr>
                  <td class="label">⏰ activated At:</td>
                  <td class="value">${new Date().toLocaleString()}</td>
                </tr>
              </table>
            </div>
            
            <div class="features">
              <h3>🚀 What You Can Do Now:</h3>
              <div class="feature-item">✅ Access all premium features</div>
              <div class="feature-item">✅ Manage unlimited students and teachers</div>
              <div class="feature-item">✅ Use advanced reporting and analytics</div>
              <div class="feature-item">✅ Access priority customer support</div>
              <div class="feature-item">✅ Enjoy automatic updates and new features</div>
            </div>
            
            <div style="text-align: center; margin: 30px 0; color: white;">
              <a href="${process.env.CLIENT_URL}/administrator" class="button">
                Access Your Dashboard
              </a>
            </div>
            
            <div class="highlight">
              <strong>Need Help Getting Started?</strong>
              <ul>
                <li>Check out our <a href="${process.env.CLIENT_URL}/help">Help Center</a></li>
                <li>Contact our support team at support@xoolhub.com</li>
                <li>Join our community forum for tips and best practices</li>
              </ul>
            </div>
          </div>
          
          <div class="footer">
            <p>Thank you for choosing XoolHub!</p>
            <p>This is an automated notification from XoolHub Payment System</p>
          </div>
        </div>
      </body>
      </html>
    `
  };
}

// Email sending function for super-admin notification
const sendSuperAdminNotification = async (paymentData) => {
  try {
    const emailContent = SuperAdminPaymentNotification(paymentData);
    
    const emailData = {
      from: 'XoolHub Payment System <noreply@xoolhub.com>',
      replyTo: 'support@xoolhub.com',
      to: ['admin@xoolhub.com'],
      subject: emailContent.subject,
      html: emailContent.html,
      headers: {
        'X-Mailer': 'XoolHub Payment System v1.0',
        'X-Priority': '1',
        'X-MSMail-Priority': 'high',
        'Importance': 'high',
        'List-Unsubscribe': '<mailto:unsubscribe@xoolhub.com>',
        'X-Entity-Ref-ID': `xoolhub-payment-notification-${Date.now()}`
      }
    };

    const result = await resend.emails.send(emailData);
    return { success: true, messageId: result.data?.id };
  } catch (error) {
    console.error('Error sending super admin notification email:', error);
    return { success: false, error: error.message };
  }
};

// Email sending function for school approval
const sendSchoolApprovalEmail = async (paymentData) => {
  try {
    const emailContent = SchoolPaymentApprovalEmail(paymentData);
    
    const emailData = {
      from: 'XoolHub Payment System <noreply@xoolhub.com>',
      replyTo: 'support@xoolhub.com',
      to: [paymentData.schoolEmail],
      subject: emailContent.subject,
      html: emailContent.html,
      headers: {
        'X-Mailer': 'XoolHub Payment System v1.0',
        'X-Priority': '1',
        'X-MSMail-Priority': 'high',
        'Importance': 'high',
        'List-Unsubscribe': '<mailto:unsubscribe@xoolhub.com>',
        'X-Entity-Ref-ID': `xoolhub-payment-approval-${Date.now()}`
      }
    };

    const result = await resend.emails.send(emailData);
    return { success: true, messageId: result.data?.id };
  } catch (error) {
    console.error('Error sending school approval email:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  SuperAdminPaymentNotification,
  SchoolPaymentApprovalEmail,
  sendSuperAdminNotification,
  sendSchoolApprovalEmail
};
