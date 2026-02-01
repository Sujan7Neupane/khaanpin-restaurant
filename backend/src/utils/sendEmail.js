import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, html }) => {
  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Send email
    const info = await transporter.sendMail({
      from: `"SuperAdmin" <process.env.${SMTP_USER}>`,
      to,
      subject,
      html,
    });

    console.log("Email sent: %s", info.messageId);
    return info;
  } catch (err) {
    console.error("Email sending failed", err);
    throw new Error("Failed to send email");
  }
};

/**
 * Generate professional invitation email HTML
 * @param {string} inviteLink
 */
export const generateAdminInviteEmail = (inviteLink) => {
  return `
    <div style="font-family: Arial, sans-serif; color: #1f2937; line-height: 1.5;">
      <div style="max-width: 600px; margin: auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
        <div style="background-color: #2563eb; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">Admin Invitation</h1>
        </div>

        <div style="padding: 20px;">
          <p>Hello,</p>
          <p>You have been invited to join our platform as an <strong>Admin</strong>.</p>
          <p>To get started, please click the button below to set your password and activate your account:</p>

          <div style="text-align: center; margin: 20px 0;">
            <a href="${inviteLink}" target="_blank" style="
              background-color: #2563eb;
              color: white;
              text-decoration: none;
              padding: 12px 24px;
              border-radius: 6px;
              font-weight: bold;
              display: inline-block;
            ">Invitation Link</a>
          </div>

          <p style="font-size: 14px; color: #6b7280;">
            This link is valid for <strong>24 hours</strong>. If you did not expect this invitation, please ignore this email.
          </p>

          <p>Thank you,<br/>The SuperAdmin Team</p>
        </div>

        <div style="background-color: #f3f4f6; padding: 12px; text-align: center; font-size: 12px; color: #9ca3af;">
          &copy; ${new Date().getFullYear()} Khaanpin Restaurant. All rights reserved.
        </div>
      </div>
    </div>
  `;
};
