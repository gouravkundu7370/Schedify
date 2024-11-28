
import { getUserMeetings } from "@/actions/meetings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MeetingLists from "./_components/MeetingLists";
import { Suspense } from "react";

export const metadata = {
  title: "Your Meetings | Schedify",
  description: "View and manage your upcoming and past meetings.",
};

export default function MeetingPage() {
  return (
    <Tabs defaultValue="upcoming">
      <TabsList>
        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        <TabsTrigger value="past">Past</TabsTrigger>
      </TabsList>
      <TabsContent value="upcoming">
        <Suspense fallback ={
          <div>
            Loading upcoming meetings ...
          </div>
        } >
          <UpcomingMeetings />
        </Suspense>
      </TabsContent>
      <TabsContent value="past">
        <Suspense fallback = {
          <div>
            Loading Past meetings
          </div>
        } >
          <PastMeetings />

        </Suspense>
      </TabsContent>
    </Tabs>
  );
}

async function UpcomingMeetings() {
  const meetings = await getUserMeetings("upcoming")
  return <MeetingLists meetings={meetings} type="upcoming" />;
}


async function PastMeetings(){
  const meetings = await getUserMeetings("past");
  return <MeetingLists meetings={meetings} type="past" />;
}