"use client";

import { cancelMeeting } from "@/actions/meetings";
import useFetch from "@/hooks/useFetch";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";



export default function CancelMeetingButton({ meetingId }) {
  const router = useRouter();

  const { loading, error, fn: fnCancelMeeting } = useFetch(cancelMeeting);

  const handleCancel = async () => {
    if (window.confirm("Are you sure you want to cancel this meeting?")) {
      await fnCancelMeeting(meetingId);
      router.refresh();
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <Button variant="destructive" onClick={handleCancel} disabled={loading}>
        {loading ? "Canceling..." : "Cancel Meeting"}
      </Button>
      {error && <span className="text-red-500 text-sm">{error.message}</span>}
    </div>
  );
}