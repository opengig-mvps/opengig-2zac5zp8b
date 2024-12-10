import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendEmail } from '@/lib/email-service';

function generateRandomString(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json({ success: false, message: 'Email is required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    const resetToken = generateRandomString(32);
    const tokenExpiry = new Date();
    tokenExpiry.setHours(tokenExpiry.getHours() + 1);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        verificationToken: resetToken,
        OTPExpiry: tokenExpiry,
      },
    });

    await sendEmail({
      to: email,
      template: {
        subject: 'Password Reset Request',
        html: `<p>You requested a password reset. Use the following token: <strong>${resetToken}</strong></p>`,
        text: `You requested a password reset. Use the following token: ${resetToken}`,
      },
    });

    return NextResponse.json({ success: true, message: 'Password reset email sent successfully' }, { status: 200 });

  } catch (error: any) {
    console.error('Error processing password reset:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}