"use client";
import React, { useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import useFetch from "@/hooks/useFetch";
import { deleteEvent } from "@/actions/events";
export default function EventCard({ event, username, isPublic = false }) {
  const [isCopied, setIsCopied] = useState(false);
  const router = useRouter();
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/${username}/${event.id}`
      );
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy: ", error);
    }
  };

  const { loading, fn: fnDeleteEvent } = useFetch(deleteEvent);
  const handleDelete = async () => {
    if (window?.confirm("Are you sure you want to delete this event?")) {
      await fnDeleteEvent(event.id);
      router.refresh();
    }
  };
  const handleClick = (e) => {
    if (e.target.tagName !== "BUTTON" && e.target.tagName !== "SVG") {
      window?.open(
        `${window?.location.origin}/${username}/${event.id}`,
        "_blank"
      );
    }
  };

  return (
    <Card
      className="flex flex-col justify-between cursor-pointer bg-slate-200"
      onClick={handleClick}
    >
      <CardHeader>
        <CardTitle className="text-3xl gradient-title font-semibold">
          {event.title}
        </CardTitle>
        <CardDescription className="flex justify-between">
          <span className="text-blue-500">
            {event.duration} mins | {event.isPrivate ? "Private" : "Public"}
          </span>
          <span className="text-blue-500">
            {event._count.bookings} Bookings
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent className="text-primary font-serif text-lg">
        {event.description.includes(".")
          ? event.description.substring(0, event.description.indexOf(".") + 1)
          : event.description}
      </CardContent>
      {!isPublic && (
        <CardFooter className="flex gap-2">
          <Button
            variant="outline"
            className="hover:text-primary flex items-center font-semibold"
            onClick={handleCopy}
          >
            <Link size={4} className="mr-0" />
            {isCopied ? "Copied!" : "Copy Link"}
          </Button>
          <Button
            variant="destructive"
            className="flex items-center font-semibold"
            onClick={handleDelete}
            disabled={loading}
          >
            <Trash size={4} className="mr-0" />
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}
