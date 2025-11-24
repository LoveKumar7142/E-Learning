export function otpTemplate({
  username = "User",
  otp,
  expiryMinutes = 5,
  appName = "Your App",
}) {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>${appName} OTP Verification</title>
  </head>

  <body style="margin:0; padding:0; background:#eef1f7; font-family:Arial, Helvetica, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:20px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" 
            style="
              background:#ffffff;
              border-radius:12px;
              overflow:hidden;
              box-shadow:0 4px 14px rgba(0,0,0,0.12);
            ">

            <!-- Header -->
            <tr>
              <td style="
                background:linear-gradient(135deg,#4f46e5,#3b82f6);
                padding:28px;
                color:#fff;
                text-align:center;
              ">
                <h1 style="margin:0; font-size:24px; letter-spacing:0.5px;">${appName}</h1>
                <p style="margin:6px 0 0; font-size:14px; opacity:0.9;">
                  Secure One-Time Password (OTP)
                </p>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:28px 28px 18px; color:#333; font-size:15px;">
                <p>Hello <strong>${username}</strong>,</p>

                <p>
                  Use the OTP given below to complete your verification process.  
                  This OTP will expire in 
                  <strong style="color:#dc2626">${expiryMinutes} minutes</strong>.
                </p>

                <div style="
                  margin:25px 0;
                  padding:18px 0;
                  background:#f8fafc;
                  border-radius:10px;
                  text-align:center;
                  font-size:32px;
                  font-weight:bold;
                  letter-spacing:6px;
                  border:1px solid #e5e7eb;
                  color:#111827;
                ">
                  ${otp}
                </div>

                <p style="font-size:13px; color:#6b7280;">
                  If this request wasn't made by you, please ignore this email.  
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="
                background:#f9fafb;
                padding:14px;
                text-align:center;
                font-size:12px;
                color:#9ca3af;
              ">
                © ${new Date().getFullYear()} ${appName}. All rights reserved.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>`;
}
