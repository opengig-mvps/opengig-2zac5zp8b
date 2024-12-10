import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      select: {
        id: true,
        name: true,
        date: true,
        location: true,
        description: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Events retrieved successfully',
      data: events,
    }, { status: 200 });

  } catch (error: any) {
    console.error('Error retrieving events:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error',
    }, { status: 500 });
  }
}

type EventRequestBody = {
  name: string;
  date: string;
  location: string;
  description: string;
  creatorId: number;
};

export async function POST(request: Request) {
  try {
    const body: EventRequestBody = await request.json();

    const { name, date, location, description, creatorId } = body;
    if (!name || !date || !location || !description || isNaN(creatorId)) {
      return NextResponse.json({ success: false, message: 'Missing required fields or incorrect format' }, { status: 400 });
    }

    const event = await prisma.event.create({
      data: {
        name,
        date: new Date(date),
        location,
        description,
        creatorId,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Event created successfully',
      data: {
        eventId: event.id.toString(),
        name: event.name,
        date: event.date.toISOString(),
        location: event.location,
        description: event.description,
      },
    }, { status: 201 });

  } catch (error: any) {
    console.error('Error creating event:', error);
    return NextResponse.json({ success: false, message: 'Internal server error', data: error }, { status: 500 });
  }
}