import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

// ENV
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RECIPIENT_EMAIL = 'pramensingh@taxcservice.com';
const SENDER_EMAIL = 'noreply@taxcservice.com';

// Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Email Templates
function generateQuoteEmailHTML(data) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2>New Quote Request</h2>
      <p><strong>Name:</strong> ${data.firstName}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Pickup:</strong> ${data.pickupAddress}</p>
      <p><strong>Dropoff:</strong> ${data.dropoffAddress}</p>
      <p><strong>Date:</strong> ${data.travelDate}</p>
      <p><strong>Passengers:</strong> ${data.passengers}</p>
    </div>
  `;
}

function generateCustomerConfirmationHTML(data) {
  return `
    <div>
      <h2>Thank you ${data.firstName}</h2>
      <p>We received your request. We will contact you shortly.</p>
    </div>
  `;
}

// MAIN FUNCTION
async function handleQuoteSubmission(request) {
  try {
    const data = await request.json();

    const required = ['firstName', 'email', 'phone', 'pickupAddress', 'dropoffAddress', 'travelDate', 'passengers'];
    for (const field of required) {
      if (!data[field] || data[field].toString().trim() === '') {
        return NextResponse.json({ error: `${field} is required` }, { status: 400 });
      }
    }

    const quoteId = uuidv4();

    // SAVE TO SUPABASE
    const { error } = await supabase.from('quotes').insert([
      {
        id: quoteId,
        first_name: data.firstName,
        email: data.email,
        phone: data.phone,
        pickup_address: data.pickupAddress,
        destination_address: data.dropoffAddress,
        travel_date: data.travelDate,
        passengers: data.passengers,
        bags: data.bags || null,
        created_at: new Date().toISOString()
      }
    ]);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    // EMAIL (SAFE)
    if (RESEND_API_KEY) {
      const resend = new Resend(RESEND_API_KEY);

      try {
        await resend.emails.send({
          from: SENDER_EMAIL,
          to: [RECIPIENT_EMAIL],
          subject: `New Quote from ${data.firstName}`,
          html: generateQuoteEmailHTML(data),
        });
      } catch (e) {
        console.error('Owner email failed:', e);
      }

      try {
        await resend.emails.send({
          from: SENDER_EMAIL,
          to: [data.email],
          subject: 'Quote Request Received',
          html: generateCustomerConfirmationHTML(data),
        });
      } catch (e) {
        console.error('Customer email failed:', e);
      }
    }

    return NextResponse.json({
      success: true,
      quoteId
    });

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// GET QUOTES
async function handleGetQuotes() {
  try {
    const { data, error } = await supabase
      .from('quotes')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json({ quotes: data });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch quotes' }, { status: 500 });
  }
}

// HEALTH
function handleHealthCheck() {
  return NextResponse.json({
    status: 'ok',
    service: 'TaxcService API',
    timestamp: new Date().toISOString(),
  });
}

// ROUTES
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