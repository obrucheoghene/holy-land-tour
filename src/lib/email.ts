import nodemailer from "nodemailer";
import { Registration } from "@/lib/db/schema";

const transporter = nodemailer.createTransporter({
  host: process.env.EMAIL_SERVER_HOST,
  port: parseInt(process.env.EMAIL_SERVER_PORT || "587"),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

interface ConfirmationEmailData {
  to: string;
  registration: Registration;
  paymentAmount: number;
}

export async function sendConfirmationEmail({
  to,
  registration,
  paymentAmount,
}: ConfirmationEmailData) {
  const tourDate = new Date("2025-03-15");
  const formattedTourDate = tourDate.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Holy Land Tour Registration Confirmation</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          line-height: 1.6;
          color: #44403c;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #fafaf9;
        }
        .header {
          background: linear-gradient(135deg, #3b82f6 0%, #5f7a5f 100%);
          color: white;
          text-align: center;
          padding: 40px 20px;
          border-radius: 12px 12px 0 0;
        }
        .header h1 {
          margin: 0;
          font-size: 28px;
          font-weight: bold;
        }
        .header p {
          margin: 10px 0 0 0;
          font-size: 18px;
          opacity: 0.9;
        }
        .content {
          background: white;
          padding: 40px;
          border-radius: 0 0 12px 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .welcome {
          font-size: 18px;
          margin-bottom: 30px;
          color: #3b82f6;
          font-weight: 600;
        }
        .registration-details {
          background: #f8fafc;
          border-left: 4px solid #3b82f6;
          padding: 20px;
          margin: 30px 0;
          border-radius: 0 8px 8px 0;
        }
        .detail-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
          padding-bottom: 10px;
          border-bottom: 1px solid #e2e8f0;
        }
        .detail-row:last-child {
          border-bottom: none;
          margin-bottom: 0;
        }
        .detail-label {
          font-weight: 600;
          color: #475569;
        }
        .detail-value {
          color: #1e293b;
          font-weight: 500;
        }
        .tour-info {
          background: linear-gradient(135deg, #f5a623 0%, #f8c474 100%);
          color: white;
          padding: 25px;
          border-radius: 12px;
          margin: 30px 0;
          text-align: center;
        }
        .tour-info h3 {
          margin: 0 0 15px 0;
          font-size: 22px;
        }
        .tour-info p {
          margin: 0;
          font-size: 16px;
          opacity: 0.95;
        }
        .next-steps {
          background: #ecfdf5;
          border: 1px solid #10b981;
          border-radius: 12px;
          padding: 25px;
          margin: 30px 0;
        }
        .next-steps h3 {
          color: #047857;
          margin: 0 0 15px 0;
          font-size: 20px;
        }
        .next-steps ul {
          margin: 0;
          padding-left: 20px;
          color: #064e3b;
        }
        .next-steps li {
          margin-bottom: 8px;
        }
        .contact-info {
          background: #f1f5f9;
          border-radius: 12px;
          padding: 25px;
          margin: 30px 0;
          text-align: center;
        }
        .contact-info h3 {
          color: #334155;
          margin: 0 0 15px 0;
        }
        .contact-info p {
          margin: 5px 0;
          color: #475569;
        }
        .footer {
          text-align: center;
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #e2e8f0;
          color: #64748b;
          font-size: 14px;
        }
        .button {
          display: inline-block;
          background: #3b82f6;
          color: white;
          padding: 15px 30px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          margin: 20px 0;
        }
        .status-badge {
          background: #10b981;
          color: white;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 600;
          display: inline-block;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🙏 Registration Confirmed!</h1>
        <p>Your Holy Land pilgrimage awaits</p>
      </div>
      
      <div class="content">
        <p class="welcome">
          Dear ${registration.firstName} ${registration.lastName},
        </p>
        
        <p>
          <strong>Congratulations!</strong> Your registration for the Holy Land Tour with Pastor Chris and Pastor Benny has been successfully confirmed. We are thrilled that you've chosen to embark on this life-changing spiritual journey with us.
        </p>
        
        <div class="registration-details">
          <h3 style="margin: 0 0 20px 0; color: #1e293b;">Registration Details</h3>
          <div class="detail-row">
            <span class="detail-label">Registration ID:</span>
            <span class="detail-value">${registration.id}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Pilgrim Name:</span>
            <span class="detail-value">${registration.firstName} ${
    registration.lastName
  }</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Email:</span>
            <span class="detail-value">${registration.email}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Phone:</span>
            <span class="detail-value">${registration.phone}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Registration Fee:</span>
            <span class="detail-value">$${paymentAmount.toFixed(
              2
            )} <span class="status-badge">PAID</span></span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Registration Date:</span>
            <span class="detail-value">${new Date().toLocaleDateString()}</span>
          </div>
        </div>
        
        <div class="tour-info">
          <h3>🕊️ Holy Land Tour 2025</h3>
          <p><strong>Dates:</strong> ${formattedTourDate} - March 25, 2025</p>
          <p><strong>Duration:</strong> 10 Days of Spiritual Discovery</p>
          <p><strong>Guides:</strong> Pastor Chris Johnson & Pastor Benny Williams</p>
        </div>
        
        <div class="next-steps">
          <h3>📋 What Happens Next?</h3>
          <ul>
            <li><strong>Detailed Itinerary:</strong> You'll receive your complete day-by-day itinerary within 2 weeks</li>
            <li><strong>Travel Documents:</strong> We'll send you packing lists, travel tips, and required documentation</li>
            <li><strong>Hotel Information:</strong> Details about accommodation options will be sent separately</li>
            <li><strong>Group Orientation:</strong> Join our pre-tour online meeting scheduled for February 1st, 2025</li>
            <li><strong>Final Instructions:</strong> Receive final meeting details 1 week before departure</li>
          </ul>
        </div>
        
        <div class="contact-info">
          <h3>📞 Need Assistance?</h3>
          <p><strong>Email:</strong> info@holylandtour.com</p>
          <p><strong>Phone:</strong> (555) 123-4567</p>
          <p><strong>Office Hours:</strong> Monday-Friday, 9 AM - 6 PM EST</p>
        </div>
        
        <p>
          We're here to support you every step of the way as you prepare for this sacred journey. If you have any questions or special requirements, please don't hesitate to reach out to our team.
        </p>
        
        <p>
          <strong>Blessings and peace,</strong><br>
          Pastor Chris Johnson & Pastor Benny Williams<br>
          <em>Holy Land Tour Ministry Team</em>
        </p>
      </div>
      
      <div class="footer">
        <p>This email was sent regarding your Holy Land Tour registration.</p>
        <p>© 2025 Holy Land Tour with Pastor Chris & Pastor Benny. All rights reserved.</p>
      </div>
    </body>
    </html>
  `;

  const textContent = `
    Holy Land Tour Registration Confirmation
    
    Dear ${registration.firstName} ${registration.lastName},
    
    Congratulations! Your registration for the Holy Land Tour with Pastor Chris and Pastor Benny has been successfully confirmed.
    
    Registration Details:
    - Registration ID: ${registration.id}
    - Pilgrim Name: ${registration.firstName} ${registration.lastName}
    - Email: ${registration.email}
    - Phone: ${registration.phone}
    - Registration Fee: $${paymentAmount.toFixed(2)} (PAID)
    - Registration Date: ${new Date().toLocaleDateString()}
    
    Tour Information:
    - Dates: ${formattedTourDate} - March 25, 2025
    - Duration: 10 Days of Spiritual Discovery
    - Guides: Pastor Chris Johnson & Pastor Benny Williams
    
    What Happens Next:
    1. Detailed itinerary will be sent within 2 weeks
    2. Travel documents and packing lists coming soon
    3. Hotel booking information will be sent separately
    4. Pre-tour online orientation on February 1st, 2025
    5. Final instructions 1 week before departure
    
    Contact Information:
    - Email: info@holylandtour.com
    - Phone: (555) 123-4567
    - Office Hours: Monday-Friday, 9 AM - 6 PM EST
    
    Blessings and peace,
    Pastor Chris Johnson & Pastor Benny Williams
    Holy Land Tour Ministry Team
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject:
      "🙏 Holy Land Tour Registration Confirmed - Welcome to Your Spiritual Journey!",
    text: textContent,
    html: htmlContent,
  });
}

export async function sendHotelBookingConfirmation(data: any) {
  // Implementation for hotel booking confirmation email
  // Similar structure to registration confirmation
}

export async function sendTourReminder(data: any) {
  // Implementation for tour reminder emails
  // Send closer to departure date
}
