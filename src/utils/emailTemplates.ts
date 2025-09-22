export interface EmailTemplateData {
  otp: string;
  type: string;
  userName?: string;
  expiryMinutes?: number;
}

export const generateOTPEmailTemplate = (data: EmailTemplateData): { text: string; html: string } => {
  const { otp, type, userName  } = data;
  
  // StayTrack theme colors
  const primaryColor = "#2563eb"; // Blue
  const secondaryColor = "#1e40af"; // Darker blue
  const accentColor = "#3b82f6"; // Light blue
  const successColor = "#10b981"; // Green
  const textColor = "#374151"; // Dark gray
  const lightGray = "#f9fafb";
  const borderColor = "#e5e7eb";

  const textContent = `
StayTrack - ${type} Verification

Hello

Your verification code is: ${otp}


If you didn't request this code, please ignore this email.

Best regards,
StayTrack Team
  `.trim();

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>StayTrack - ${type} Verification</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            background-color: ${lightGray};
            color: ${textColor};
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .header {
            background: linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%);
            padding: 40px 30px;
            text-align: center;
            color: white;
        }
        .logo {
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 8px;
            letter-spacing: -0.5px;
        }
        .tagline {
            font-size: 16px;
            opacity: 0.9;
            margin: 0;
        }
        .content {
            padding: 40px 30px;
        }
        .greeting {
            font-size: 18px;
            margin-bottom: 20px;
            color: ${textColor};
        }
        .message {
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 30px;
            color: ${textColor};
        }
        .otp-container {
            background: linear-gradient(135deg, ${lightGray} 0%, #ffffff 100%);
            border: 2px solid ${borderColor};
            border-radius: 12px;
            padding: 30px;
            text-align: center;
            margin: 30px 0;
        }
        .otp-label {
            font-size: 14px;
            color: ${textColor};
            margin-bottom: 10px;
            font-weight: 500;
        }
        .otp-code {
            font-size: 36px;
            font-weight: bold;
            color: ${primaryColor};
            letter-spacing: 8px;
            margin: 10px 0;
            font-family: 'Courier New', monospace;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .otp-expiry {
            font-size: 14px;
            color: #6b7280;
            margin-top: 10px;
        }
        .security-notice {
            background-color: #fef3c7;
            border-left: 4px solid #f59e0b;
            padding: 16px;
            margin: 30px 0;
            border-radius: 0 8px 8px 0;
        }
        .security-notice-title {
            font-weight: 600;
            color: #92400e;
            margin-bottom: 8px;
            font-size: 14px;
        }
        .security-notice-text {
            font-size: 14px;
            color: #92400e;
            margin: 0;
            line-height: 1.5;
        }
        .footer {
            background-color: ${lightGray};
            padding: 30px;
            text-align: center;
            border-top: 1px solid ${borderColor};
        }
        .footer-text {
            font-size: 14px;
            color: #6b7280;
            margin: 0;
            line-height: 1.5;
        }
        .footer-brand {
            font-weight: 600;
            color: ${primaryColor};
        }
        .divider {
            height: 1px;
            background: linear-gradient(90deg, transparent 0%, ${borderColor} 50%, transparent 100%);
            margin: 20px 0;
        }
        @media (max-width: 600px) {
            .container {
                margin: 0;
                border-radius: 0;
            }
            .header, .content, .footer {
                padding: 30px 20px;
            }
            .otp-code {
                font-size: 28px;
                letter-spacing: 6px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">🏠 StayTrack</div>
            <p class="tagline">Your Property Management Solution</p>
        </div>
        
        <div class="content">
            <div class="greeting">Hello!</div>
            
            <div class="message">
                We received a request to ${type.toLowerCase()} your StayTrack account. 
                Please use the verification code below to complete the process.
            </div>
            
            <div class="otp-container">
                <div class="otp-label">Your verification code</div>
                <div class="otp-code">${otp}</div>
            </div>
            
            <div class="security-notice">
                <div class="security-notice-title">🔒 Security Notice</div>
                <div class="security-notice-text">
                    Never share this code with anyone. StayTrack will never ask for your verification code via phone, email, or text message.
                </div>
            </div>
            
            <div class="message">
                If you didn't request this verification code, please ignore this email or contact our support team if you have concerns.
            </div>
        </div>
        
        <div class="footer">
            <div class="footer-text">
                This email was sent by <span class="footer-brand">StayTrack</span><br>
                If you have any questions, please contact our support team.
            </div>
        </div>
    </div>
</body>
</html>
  `.trim();

  return { text: textContent, html: htmlContent };
};

// Additional email templates can be added here
export const generateWelcomeEmailTemplate = (userName: string) => {
  const primaryColor = "#2563eb";
  const textColor = "#374151";
  const lightGray = "#f9fafb";
  
  return {
    text: `Welcome to StayTrack, ${userName}!`,
    html: `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to StayTrack</title>
    <style>
        body { font-family: Arial, sans-serif; background-color: ${lightGray}; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 8px; overflow: hidden; }
        .header { background: ${primaryColor}; color: white; padding: 30px; text-align: center; }
        .content { padding: 30px; color: ${textColor}; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🏠 Welcome to StayTrack!</h1>
        </div>
        <div class="content">
            <h2>Hello ${userName}!</h2>
            <p>Welcome to StayTrack - your comprehensive property management solution.</p>
            <p>You can now start managing your properties, tenants, and more!</p>
        </div>
    </div>
</body>
</html>
    `.trim()
  };
};
