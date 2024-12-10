'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import { isAxiosError } from 'axios';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DateTimePicker } from '@/components/ui/date-picker';
import api from '@/lib/api';
import { LoaderCircleIcon } from 'lucide-react';

const eventSchema = z.object({
  name: z.string().min(1, "Event name is required"),
  date: z.date(),
  location: z.string().min(1, "Event location is required"),
  description: z.string().min(1, "Event description is required"),
});

type EventFormData = z.infer<typeof eventSchema>;

const CreateEventPage: React.FC = () => {
  const { data: session } = useSession();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      name: '',
      location: '',
      description: '',
      date: undefined,
    },
  });

  const onSubmit = async (data: EventFormData) => {
    try {
      const payload = {
        name: data?.name,
        location: data?.location,
        description: data?.description,
        date: selectedDate?.toISOString(),
      };

      const response = await api.post(`/api/users/${session?.user?.id}/events`, payload);

      if (response?.data?.success) {
        toast.success("Event created successfully!");
      }
    } catch (error: any) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message ?? "Something went wrong");
      } else {
        console.error(error);
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="flex-1 p-8">
      <h2 className="text-2xl font-bold mb-6">Create New Event</h2>
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Event Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Event Name</Label>
              <Input {...register("name")} placeholder="Enter event name" />
              {errors?.name && (
                <p className="text-red-500 text-sm">{errors?.name?.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Event Date</Label>
              <DateTimePicker
                date={selectedDate}
                setDate={setSelectedDate}
              />
              {errors?.date && (
                <p className="text-red-500 text-sm">{errors?.date?.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input {...register("location")} placeholder="Enter event location" />
              {errors?.location && (
                <p className="text-red-500 text-sm">{errors?.location?.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea {...register("description")} placeholder="Describe the event" />
              {errors?.description && (
                <p className="text-red-500 text-sm">{errors?.description?.message}</p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <LoaderCircleIcon className="w-4 h-4 mr-2 animate-spin" />
                  Creating Event...
                </>
              ) : (
                "Create Event"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default CreateEventPage;