"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DateTimePicker } from "@/components/ui/date-picker";
import { LoaderCircleIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";

const EventListingPage: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [selectedDates, setSelectedDates] = useState<{
    start: Date | undefined;
    end: Date | undefined;
  }>({ start: undefined, end: undefined });
  const { data: session } = useSession();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/events");
        setEvents(res?.data?.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleBooking = async (eventId: number) => {
    if (!selectedDates?.start || !selectedDates?.end) {
      toast.error("Please select a valid date range.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`/api/events/${eventId}/book`, {
        userId: session?.user?.id,
        startDate: selectedDates?.start?.toISOString(),
        endDate: selectedDates?.end?.toISOString(),
      });

      if (response?.data?.success) {
        toast.success("Booking confirmed! Confirmation email sent.");
      }
    } catch (error) {
      toast.error("Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">Available Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events?.map((event: any) => (
          <Card key={event?.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{event?.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {event?.description}
              </p>
              <p className="text-sm text-muted-foreground">
                Location: {event?.location}
              </p>
            </CardContent>
            <CardFooter className="mt-auto">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedEvent(event)}
                  >
                    Book Now
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[700px]">
                  <DialogHeader>
                    <DialogTitle>Book Event: {selectedEvent?.title}</DialogTitle>
                  </DialogHeader>
                  <div className="py-4 space-y-4">
                    <div className="space-y-2">
                      <Label>Select Dates</Label>
                      <DateTimePicker
                        date={selectedDates?.start}
                        setDate={(date: any) =>
                          setSelectedDates({ ...selectedDates, start: date })
                        }
                      />
                      <DateTimePicker
                        date={selectedDates?.end}
                        setDate={(date: any) =>
                          setSelectedDates({ ...selectedDates, end: date })
                        }
                      />
                    </div>
                    <Button
                      className="w-full"
                      onClick={() => handleBooking(selectedEvent?.id)}
                      disabled={loading}
                    >
                      {loading ? (
                        <LoaderCircleIcon className="animate-spin" />
                      ) : (
                        "Confirm Booking"
                      )}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default EventListingPage;