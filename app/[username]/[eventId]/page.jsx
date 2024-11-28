import { getUserByUsername, updatename } from "@/actions/users";
import { notFound } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getEventDetails } from "@/actions/events";
import EventDetails from "./_components/EventDetails";
import { Suspense } from "react";
import BookingForm from "./_components/BookingForm";
import { getEventAvailability } from "@/actions/availability";

export async function generateMetadata({ params }) {
  const { eventId,username } = await params;
  const event = await getEventDetails(username,eventId)
  if(!event){
    return {
        title: "Event Not Found"
    }
  }
  return {
    title: `Book ${event.title} with ${event.user.name} | Your App Name`,
    description: `Schedule a ${event.duration}-minute ${event.title} event with ${event.user.name}.`,
  };

}

export default async function EventBookingPage({params}) {
    const { eventId,username } = await params;

  const event = await getEventDetails(username,eventId)
  const availability = await getEventAvailability(eventId)

 
  if (!event) {
    notFound();
  }
  return (
    <div className="flex flex-col justify-center lg:flex-row px-4 py-8">
        
        <EventDetails event={event}/>
        <Suspense fallback={<div>Loading Booking Form...</div>}>
        <BookingForm  event={event} availability={availability} />
        </Suspense>
    </div>
  );
}
