import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendEmail } from "@/lib/email-service";

export async function POST(
  request: Request,
  { params }: { params: { eventId: string } }
) {
  try {
    const eventId = parseInt(params.eventId, 10);
    if (isNaN(eventId)) {
      return NextResponse.json({ success: false, message: 'Invalid event ID' }, { status: 400 });
    }

    const userId = request.headers.get('user-id');
    if (!userId) {
      return NextResponse.json({ success: false, message: 'User not authenticated' }, { status: 401 });
    }

    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      return NextResponse.json({ success: false, message: 'Event not found' }, { status: 404 });
    }

    const existingBooking = await prisma.eventBooking.findUnique({
      where: {
        eventId_userId: {
          eventId: eventId,
          userId: parseInt(userId, 10),
        },
      },
    });

    if (existingBooking) {
      return NextResponse.json({ success: false, message: 'Booking already exists for this event' }, { status: 409 });
    }

    const booking = await prisma.eventBooking.create({
      data: {
        eventId: eventId,
        userId: parseInt(userId, 10),
      },
    });

    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId, 10) },
    });

    if (user) {
      await sendEmail({
        to: user.email,
        template: {
          subject: "Booking Confirmation",
          html: `<h1>Your booking for ${event.name} is confirmed!</h1>`,
          text: `Your booking for ${event.name} is confirmed!`,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Booking created successfully',
      data: { bookingId: booking.id.toString() },
    }, { status: 201 });

  } catch (error: any) {
    console.error('Error creating booking:', error);
    return NextResponse.json({ success: false, message: 'Internal server error', data: error }, { status: 500 });
  }
}