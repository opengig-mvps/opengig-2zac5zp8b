import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next'; // Corrected import path for next-auth
import { authOptions } from '@/lib/auth'; // Corrected import path for auth-options

export async function POST(request: Request) {
  try {
    const session: any = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ success: false, message: 'No active session found' }, { status: 401 });
    }

    // Assuming session.destroy() is not valid, use session.invalidate() instead
    await session.invalidate();

    return NextResponse.json({ success: true, message: 'Logout successful' }, { status: 200 });
  } catch (error: any) {
    console.error('Error during logout:', error);
    return NextResponse.json({ success: false, message: 'Internal server error' }, { status: 500 });
  }
}