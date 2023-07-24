import { Resend } from 'resend';
import  Email  from '@/components/email-template';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);


export async function POST(request: Request) {
  const { email } = await request.json();
  await resend.sendEmail({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Your password reset link',
    react: Email(),
  });
  
  return NextResponse.json({
    status: 'ok',
  })
} 

// verti1234.krzysiek@o2.pl