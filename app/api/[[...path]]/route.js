import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import { v4 as uuidv4 } from 'uuid';
import { Resend } from 'resend';

const MONGO_URL = process.env.MONGO_URL;
const DB_NAME = process.env.DB_NAME || 'taxcservice';
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RECIPIENT_EMAIL = process.env.RECIPIENT_EMAIL || 'nzroadtours@gmail.com';
const SENDER_EMAIL = process.env.SENDER_EMAIL || 'onboarding@resend.dev';

let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) return cachedDb;
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  cachedClient = client;
  cachedDb = client.db(DB_NAME);
  return cachedDb;
}

function generateQuoteEmailHTML(data) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #0d7377 0%, #0a5c5f 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 24px;">New Quote Request</h1>
        <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0;">TaxcService.com</p>
      </div>
      <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px 0; color: #6b7280; font-size: 14px; width: 40%;">Name</td>
            <td style="padding: 12px 0; color: #111827; font-weight: 600;">${data.firstName}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px 0; color: #6b7280; font-size: 14px;">Email</td>
            <td style="padding: 12px 0; color: #111827;">${data.email}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px 0; color: #6b7280; font-size: 14px;">Phone</td>
            <td style="padding: 12px 0; color: #111827;">${data.phone}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px 0; color: #6b7280; font-size: 14px;">Pick Up</td>
            <td style="padding: 12px 0; color: #111827;">${data.pickupAddress}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px 0; color: #6b7280; font-size: 14px;">Drop Off</td>
            <td style="padding: 12px 0; color: #111827;">${data.dropoffAddress}</td>
          </tr>
          ${data.flightNumber ? `
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px 0; color: #6b7280; font-size: 14px;">Flight Number</td>
            <td style="padding: 12px 0; color: #111827;">${data.flightNumber}</td>
          </tr>` : ''}
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px 0; color: #6b7280; font-size: 14px;">Travel Date</td>
            <td style="padding: 12px 0; color: #111827;">${data.travelDate}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px 0; color: #6b7280; font-size: 14px;">Passengers</td>
            <td style="padding: 12px 0; color: #111827;">${data.passengers}</td>
          </tr>
          <tr style="border-bottom: 1px solid #e5e7eb;">
            <td style="padding: 12px 0; color: #6b7280; font-size: 14px;">Return Required</td>
            <td style="padding: 12px 0; color: #111827;">${data.returnRequired === 'yes' ? 'Yes' : 'No'}</td>
          </tr>
          <tr>
            <td style="padding: 12px 0; color: #6b7280; font-size: 14px;">Bags</td>
            <td style="padding: 12px 0; color: #111827;">${data.bags || 'Not specified'}</td>
          </tr>
        </table>
      </div>
      <p style="color: #9ca3af; font-size: 12px; text-align: center; margin-top: 20px;">
        This quote request was submitted via taxcservice.com
      </p>
    </div>
  `;
}

function generateCustomerConfirmationHTML(data) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #0d7377 0%, #0a5c5f 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 24px;">Thank You, ${data.firstName}!</h1>
        <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0;">We've received your quote request</p>
      </div>
      <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb;">
        <p style="color: #374151; line-height: 1.6;">Hi ${data.firstName},</p>
        <p style="color: #374151; line-height: 1.6;">Thank you for choosing TaxcService! We've received your transport quote request and our team will review it shortly.</p>
        <p style="color: #374151; line-height: 1.6;">Here's a summary of your request:</p>
        <div style="background: white; padding: 20px; border-radius: 8px; margin: 16px 0;">
          <p style="margin: 4px 0; color: #6b7280;"><strong style="color: #111827;">From:</strong> ${data.pickupAddress}</p>
          <p style="margin: 4px 0; color: #6b7280;"><strong style="color: #111827;">To:</strong> ${data.dropoffAddress}</p>
          <p style="margin: 4px 0; color: #6b7280;"><strong style="color: #111827;">Date:</strong> ${data.travelDate}</p>
          <p style="margin: 4px 0; color: #6b7280;"><strong style="color: #111827;">Passengers:</strong> ${data.passengers}</p>
        </div>
        <p style="color: #374151; line-height: 1.6;">We typically respond within <strong>2 hours</strong> during business hours. For urgent enquiries, please call us directly.</p>
        <p style="color: #374151; line-height: 1.6;">Best regards,<br/><strong>The TaxcService Team</strong></p>
      </div>
      <p style="color: #9ca3af; font-size: 12px; text-align: center; margin-top: 20px;">
        TaxcService | Auckland, New Zealand | taxcservice.com
      </p>
    </div>
  `;
}

async function handleQuoteSubmission(request) {
  try {
    const data = await request.json();

    // Validate required fields
    const required = ['firstName', 'email', 'phone', 'pickupAddress', 'dropoffAddress', 'travelDate', 'passengers'];
    for (const field of required) {
      if (!data[field] || data[field].toString().trim() === '') {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Save to MongoDB
    const db = await connectToDatabase();
    const quoteDoc = {
      id: uuidv4(),
      ...data,
      status: 'new',
      createdAt: new Date().toISOString(),
    };

    await db.collection('quotes').insertOne(quoteDoc);

    // Send emails via Resend
    if (RESEND_API_KEY) {
      const resend = new Resend(RESEND_API_KEY);

      // Send notification to business owner
      try {
        await resend.emails.send({
          from: SENDER_EMAIL,
          to: [RECIPIENT_EMAIL],
          subject: `New Quote Request from ${data.firstName} - TaxcService`,
          html: generateQuoteEmailHTML(data),
        });
      } catch (emailError) {
        console.error('Failed to send owner notification email:', emailError);
      }

      // Send confirmation to customer
      try {
        await resend.emails.send({
          from: SENDER_EMAIL,
          to: [data.email],
          subject: 'Your TaxcService Quote Request - Confirmation',
          html: generateCustomerConfirmationHTML(data),
        });
      } catch (emailError) {
        console.error('Failed to send customer confirmation email:', emailError);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Quote request submitted successfully',
      quoteId: quoteDoc.id,
    });
  } catch (error) {
    console.error('Quote submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit quote request' },
      { status: 500 }
    );
  }
}

async function handleGetQuotes() {
  try {
    const db = await connectToDatabase();
    const quotes = await db.collection('quotes')
      .find({}, { projection: { _id: 0 } })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ quotes });
  } catch (error) {
    console.error('Get quotes error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quotes' },
      { status: 500 }
    );
  }
}

function handleHealthCheck() {
  return NextResponse.json({
    status: 'ok',
    service: 'TaxcService API',
    timestamp: new Date().toISOString(),
  });
}

export async function GET(request) {
  const { pathname } = new URL(request.url);
  const path = pathname.replace('/api', '') || '/';

  switch (path) {
    case '/':
    case '/health':
      return handleHealthCheck();
    case '/quotes':
      return handleGetQuotes();
    default:
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
}

export async function POST(request) {
  const { pathname } = new URL(request.url);
  const path = pathname.replace('/api', '') || '/';

  switch (path) {
    case '/quote':
      return handleQuoteSubmission(request);
    default:
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
}
