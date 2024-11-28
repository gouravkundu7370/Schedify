"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usernameSchema } from "@/app/lib/validators";
import { useEffect, useState } from "react";
import {updateUsername} from '@/actions/users'
import useFetch from "@/hooks/useFetch";
import { BarLoader } from "react-spinners";
import { getLatestUpdates } from "@/actions/dashboard";
import {format} from 'date-fns'

export default function Dashboard() {
  const [origin, setOrigin] = useState("");

  const { isLoaded, user } = useUser();
 const {register, handleSubmit, setValue, formState:{errors}} =  useForm({
    resolver: zodResolver(usernameSchema),
  });
  useEffect(()=>{
    setValue("username",user?.username)
    if (typeof window !== "undefined") setOrigin(window.location.origin);
  },[isLoaded])

 const {loading,error, fn: fnUpdateUsername} =  useFetch(updateUsername)
  const onSubmit = async (data) =>{

    fnUpdateUsername(data.username)
  }
  const {loading: loadingUpdates,data:upcomingMeetings,fn:fnUpdates} = useFetch(getLatestUpdates)
  useEffect(()=>{
    (async () => await fnUpdates())()
  },[])
  return (
    <div className="space-y-8">
      <Card className="bg-primary/5">
        <CardHeader>
          <CardTitle className="text-primary text-3xl">Welcome, {user?.firstName}</CardTitle>
        </CardHeader>
        <CardContent>
          {!loadingUpdates ? (
            <div className="space-y-6 font-light">
              {upcomingMeetings && upcomingMeetings.length > 0 ? (
                <ul className="list-disc pl-5 text-blue-600 font-normal">
                  {upcomingMeetings.map((meeting) => {
                    return (
                      <li key={meeting.id}>
                        {meeting.event.title} on{" "}
                        {format(
                          new Date(meeting.startTime),
                          "MMM d, yyyy h:mm a"
                        )}{" "}
                        with {meeting.name}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p>No Upcoming Meetings</p>
              )}
            </div>
          ) : (
            <p>Loading Updates</p>
          )}
        </CardContent>
      </Card>
      <Card className="bg-primary/5">
        <CardHeader>
          <CardTitle className="text-blue-700 text-2xl">Your Unique Link</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-primary font-semibold">{origin}/</span>
                <Input className='font-medium text-blue-600 text-lg' {...register("username")} placeholder="username" />
              </div>
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
              {error && (
                <p className="text-red-500 text-sm mt-1">{error?.message}</p>
              )}
            </div>
            {loading && (
              <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />
            )}
            <Button type="submit">Update Username</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
