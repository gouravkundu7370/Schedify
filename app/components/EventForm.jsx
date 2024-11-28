"use client"
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { eventSchema } from "../lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/useFetch";
import { createEvent } from "@/actions/events";
import { useRouter } from "next/navigation";

export default function EventForm({ onSubmitForm }) {
    const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      duration: 30,
      isPrivate: true,
    },
  });
  const { loading, error, fn: fnCreateEvent } = useFetch(createEvent);

  const onSubmit = async (data) => {
    await fnCreateEvent(data);
    if(!loading && !error){
        onSubmitForm()
    }
    router.refresh()
  };

  return (
    <form
      className="px-8 flex flex-col gap-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <label
          className="block text-sm font-medium text-primary justify-start"
          htmlFor="title"
        >
          Event Title
        </label>
        <Input id="title" {...register("title")} className="mt-1" />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>
      <div>
        <label
          className="block text-sm font-medium text-primary justify-start"
          htmlFor="description"
        >
          Event Description
        </label>
        <Input id="description" {...register("description")} className="mt-1" />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>
      <div>
        <label
          className="block text-sm font-medium text-primary justify-start"
          htmlFor="duration"
        >
          Event Duration (minutes)
        </label>
        <Input
          id="duration"
          {...register("duration", {
            valueAsNumber: true,
          })}
          type="number"
          className="mt-1"
        />
        {errors.duration && (
          <p className="text-red-500 text-sm mt-1">{errors.duration.message}</p>
        )}
      </div>
      <div>
        <label
          className="block text-sm font-medium text-primary justify-start"
          htmlFor="isPrivate"
        >
          Event Privacy
        </label>
        <Controller
          name="isPrivate"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value ? "true" : "false"}
              onValueChange={(value) => field.onChange(value === "true")}
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select Privacy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="true">Private</SelectItem>
                <SelectItem value="false">Public</SelectItem>
              </SelectContent>
            </Select>
          )}
        />

        {errors.isPrivate && (
          <p className="text-red-500 text-sm mt-1">
            {errors.isPrivate.message}
          </p>
        )}
      </div>

      {error && <p className="text-red-500 text-sm mt-1">{error.message} </p>}

      <Button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Create Event"}
      </Button>
    </form>
  );
}
