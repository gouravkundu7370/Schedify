import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Clock, Video } from "lucide-react";
import CancelMeetingButton from "./CancelMeeting";
export default function MeetingLists({ meetings, type }) {
  if (meetings.length === 0) {
    return <p className="text-primary font-medium text-xl">No {type} meetings found.</p>;
  }
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 ">
      {meetings.map((meeting) => (
        <Card key={meeting.id} className="flex flex-col justify-between bg-primary/10">
          <CardHeader>
            <CardTitle className="text-blue-700 text-xl">
              {meeting.event.title}
            </CardTitle>
            <CardDescription className="text-blue-600">
              with {meeting.name}
            </CardDescription>
            <CardDescription>
              &quot;{meeting.additionalInfo}&quot;
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-2">
              <Calendar className="mr-2 h-4 w-4 text-primary" />
              <span className="text-primary">
                {format(new Date(meeting.startTime), "MMMM d, yyyy")}
              </span>
            </div>
            <div className="flex items-center mb-2">
              <Clock className="mr-2 h-4 w-4 text-primary" />
              <span className="text-primary">
                {format(new Date(meeting.startTime), "h:mm a")} -{" "}
                {format(new Date(meeting.endTime), "h:mm a")}
              </span>
            </div>
            {meeting.meetLink && (
              <div className="flex items-center">
                <Video className="mr-2 h-4 w-4 text-primary" />
                <a
              
                  href={meeting.meetLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-800 font-medium hover:underline hover:font-semibold"
                >
                  Join Meeting
                </a>
              </div>
            )}
          </CardContent>
          {type === "upcoming" && (
            <CardFooter className="flex justify-between">
              <CancelMeetingButton meetingId={meeting.id} />
            </CardFooter>
          )}
        </Card>
      ))}
    </div>
  );
}
