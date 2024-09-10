"use client";
import { WidthWrapper } from "@/common/components/WidthWrapper";
import { Button } from "@/common/components/shadcn/ui/button";
import { Input } from "@/common/components/shadcn/ui/input";
import { Textarea } from "@/common/components/shadcn/ui/textarea";
import { Typography } from "@/common/components/ui/Typography";
import {
  LucideBookOpen,
  LucideBookText,
  LucideCalendar,
  LucideCalendarClock,
  LucideMinus,
  LucidePenLine,
  LucidePlus,
  LucideSquareGantt,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import useAddEvent from "../../hooks/useAddEvent";
import { Spinner } from "@/common/components/ui/Spinner";
import { T_Events } from "@repo/contract";

import { useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import useGetEventById from "@/common/hooks/Web-Contents/useGetEventById";

interface ItemListProps {
  initialItems?: Date[];
}

const Index = ({ initialItems = [] }: ItemListProps) => {
  const params = useParams<{ contentId: string; eventId: string }>();
  const contentId = String(params.contentId);
  const eventId = params.eventId;

  const [items, setItems] = useState<Date[]>(initialItems);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { mutateAsync: addEvents } = useAddEvent();
  const { register, handleSubmit, watch } = useForm<T_Events>();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data } = useGetEventById(eventId);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const addItem = () => {
    setItems((prevItems) => [...prevItems, new Date()]);
  };

  const removeItem = (index: number) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newDate = new Date(e.target.value);
    if (!isNaN(newDate.getTime())) {
      const newItems = [...items];
      newItems[index] = newDate;
      setItems(newItems);
    }
  };

  // Utility function to capitalize the first letter of a string
  const capitalizeFirstLetter = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const eventDescription = watch("eventDescription", "");
  const maxDescriptionLength = 500;

  const onSubmit = async (formData: T_Events) => {
    setIsLoading(true);

    try {
      const modifiedFormData = {
        ...formData,
        eventTitle: capitalizeFirstLetter(formData.eventTitle),
        eventDescription: capitalizeFirstLetter(formData.eventDescription),
      };
      const response = await addEvents({
        eventTitle: modifiedFormData.eventTitle,
        //@ts-expect-error
        eventDates: items.map((date) => new Date(date)),
        eventDescription: modifiedFormData.eventDescription,
      });

      if (!response.error) {
        const newEventId = response.item._id;
        toast.success(response.message);

        queryClient.invalidateQueries({
          queryKey: ["events", newEventId],
        });

        setTimeout(() => {
          router.push(
            `/admin/web-contents/${contentId}/events/${newEventId}/photos`
          );
        }, 1000);
      } else {
        toast.error(response.message || "An error occurred");
      }
    } catch (error) {
      toast.error("An error occurred while saving data");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <WidthWrapper width="full">
      <div className="flex flex-col w-full space-y-4">
        <div className="flex gap-2 items-center">
          <LucideCalendarClock />
          <Typography variant="h1" fontWeight="semiBold">
            Add Events
          </Typography>
        </div>

        <div className="border-2 shadow rounded-md sm:min-h-screen h-auto p-5 flex flex-col">
          <div className="flex gap-2 items-center">
            <LucideBookOpen />
            <Typography variant="h3" fontWeight="semiBold">
              Set up announcement of events
            </Typography>
          </div>
          <div className="border-b py-2"></div>
          <div className="grid sm:grid-cols-12 pt-8 gap-6 flex-grow">
            <div className="items-stretch col-span-8 space-y-4 text-gray-600 flex flex-col">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 flex-grow flex flex-col justify-between"
              >
                <div>
                  <div className="sm:flex items-center mb-4 gap-2">
                    <LucidePenLine size={20} />
                    <Typography fontWeight="semiBold" className="w-48">
                      Title of event
                    </Typography>
                    <Input
                      placeholder="Enter title of event"
                      required
                      {...register("eventTitle", {
                        required: "You need to fill up this field",
                      })}
                      className="flex-1"
                    />
                  </div>
                  <div className="flex items-start gap-4">
                    <button
                      type="button"
                      onClick={addItem}
                      className="flex items-center gap-2 bg-white rounded-sm h-12 mr-14"
                    >
                      <div className="flex gap-2 items-center">
                        <LucidePlus
                          className="bg-gray-600 text-white rounded-sm"
                          size={20}
                        />
                        <Typography fontWeight="semiBold">Add date</Typography>
                        <LucideCalendar size={20} />
                      </div>
                    </button>
                    <div className="flex-1">
                      {items.length === 0 ? (
                        <p className="text-gray-500 mt-3 ml-7">
                          Click add date
                        </p>
                      ) : (
                        <ul className="flex flex-col mb-4">
                          {" "}
                          {items.map((item, index) => (
                            <li
                              key={index}
                              className="flex items-center gap-2 h-12"
                            >
                              <input
                                type="date"
                                value={item.toISOString().split("T")[0]}
                                onChange={(e) => handleChange(e, index)}
                                className="h-full ml-7"
                              />
                              <button
                                type="button"
                                onClick={() => removeItem(index)}
                                className="flex items-center h-full"
                              >
                                <LucideMinus
                                  className="bg-orange-600 text-white rounded-md"
                                  size={20}
                                />
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                  <div className="sm:flex items gap-2 mt-2">
                    <LucidePenLine size={20} />
                    <Typography fontWeight="semiBold" className="w-48">
                      Caption
                    </Typography>
                    <div className="sm:w-80 w-full flex flex-col">
                      <Textarea
                        placeholder="Enter caption for event"
                        style={{ width: "100%", height: "250px" }}
                        className="w-full text-justify"
                        maxLength={maxDescriptionLength}
                        {...register("eventDescription", {
                          required: true,
                        })}
                      />
                      <div className="text-right text-sm text-gray-500">
                        {eventDescription.length}/{maxDescriptionLength}
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  className="mt-4 self-start w-32"
                  variant="default"
                  size="lg"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? <Spinner size="md" /> : "Save | Submit"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </WidthWrapper>
  );
};

export default Index;
