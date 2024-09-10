"use client";
import { WidthWrapper } from "@/common/components/WidthWrapper";
import { Button } from "@/common/components/shadcn/ui/button";
import { Input } from "@/common/components/shadcn/ui/input";
import { Textarea } from "@/common/components/shadcn/ui/textarea";
import { Typography } from "@/common/components/ui/Typography";
import {
  LucideCalendar,
  LucideMinus,
  LucidePenLine,
  LucidePlus,
  LucideUpload,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import useAddEvent from "../../hooks/useAddEvent";
import { Spinner } from "@/common/components/ui/Spinner";
import { T_Events } from "@repo/contract";
import Photos from "./components/Photos";
import usePhotoStore from "@/module/Store/usePhotoStore";
// import useAddEventPhoto from "../../hooks/useAddEventPhoto";
// import useUpdateEventPhoto from "../../hooks/useUpdateEventPhoto";
// import useDeleteEventPhoto from "../../hooks/useDeleteEventPhoto";
import { useParams } from "next/navigation";
import EditPhotoModal from "./components/EditPhotoModal";

interface ItemListProps {
  initialItems?: Date[];
}

const Index = ({ initialItems = [] }: ItemListProps) => {
  const params = useParams();
  const contentId = String(params.contentId);
  const eventId = String(params.eventId);
  //@ts-expect-error
  const { mutateAsync: addMutateAsync } = useAddEventPhoto(contentId, eventId);
  //@ts-expect-error
  const { mutateAsync } = useUpdateEventPhoto(eventId);
  //@ts-expect-error
  const { mutateAsync: deleteMutateAsync } = useDeleteEventPhoto(eventId);
  const setPhotos = usePhotoStore((state) => state.setPhotos);
  const photos = usePhotoStore((state) => state.photos);
  const [editPhotoModal, setEditPhotoModal] = useState(false);

  const [items, setItems] = useState<Date[]>(initialItems);
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { mutateAsync: addEvents } = useAddEvent();
  const { register, handleSubmit } = useForm<T_Events>();

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
  const updatePhotosInDb = async () => {
    const toAddPhotos =
      photos
        .filter((photo) => !photo._id)
        .map(async (photo) => {
          return await addMutateAsync(photo);
        }) || [];
    const toEditPhotos =
      photos
        .filter((photo) => photo._id)
        .map(async (photo) => {
          return await mutateAsync(photo);
        }) || [];
    const toDeletePhotos =
      photos
        .filter((photo) => photo.isDeleted)
        .map(async (photo) => {
          return await deleteMutateAsync(photo);
        }) || [];
    await Promise.all([
      ...toAddPhotos,
      ...toEditPhotos,
      ...toDeletePhotos,
    ]).catch((err) => {
      toast.error(String(err));
    });
  };

  const handleSavePhotos = async () => {
    setIsLoading(true);
    await updatePhotosInDb();
    setIsLoading(false);
  };

  const onSubmit = async (formData: T_Events) => {
    try {
      setIsLoading(true);
      const saveEvent = addEvents({
        eventTitle: formData.eventTitle,
        //@ts-expect-error
        eventDates: items.map((date) => new Date(date)),
        eventDescription: formData.eventDescription,
      });
      await Promise.all([saveEvent, handleSavePhotos()]);
      setIsLoading(false);
      toast.success("Event saved successfully!");
    } catch (error) {
      setIsLoading(false);
      toast.error("An error occurred while saving data");
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <WidthWrapper width="full">
      <Typography variant="h1" fontWeight="semiBold">
        Events
      </Typography>
      <p className="text-gray-400 mt-2">
        <i>Set up announcement of events</i>
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-12 flex items-center space-x-2 mb-2">
          <LucidePenLine size={20} />
          <label htmlFor="about us" className="sm:text-md">
            <Typography variant="h4" fontWeight="semiBold">
              Title of event
            </Typography>
          </label>
        </div>
        <Input
          placeholder="Enter title of events"
          {...register("eventTitle", { required: "This field is required" })}
          className="sm:w-80 w-full mb-12"
          required
        />

        <div>
          <ul>
            {items.map((item, index) => (
              <li key={index}>
                <div className="flex gap-2 items-center mt-2">
                  <input
                    type="date"
                    value={item.toISOString().split("T")[0]}
                    onChange={(e) => handleChange(e, index)}
                  />
                  <button type="button" onClick={() => removeItem(index)}>
                    <div className="flex gap-2 items-center">
                      <LucideMinus
                        className="bg-orange-400 text-white rounded-md"
                        size={20}
                      />
                    </div>
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button type="button" onClick={addItem} className="mt-2">
            <div className="flex gap-2 items-center">
              <LucidePlus
                className="bg-gray-600 text-white rounded-sm"
                size={20}
              />
              <Typography fontWeight="semiBold">Add date</Typography>
              <LucideCalendar size={20} />
            </div>
          </button>
        </div>

        <div className="mt-8 flex items-center space-x-2 mb-2">
          <LucideUpload size={20} />
          <label htmlFor="about us" className="sm:text-md">
            <Typography variant="h4" fontWeight="semiBold">
              Event picture
            </Typography>
          </label>
        </div>
        <div>
          <div>
            <Photos />
          </div>

          {isLoading && (
            <div className="flex justify-center mt-5">
              <Spinner size="md" />
            </div>
          )}
        </div>

        <div className="mt-4 flex items-center space-x-2 mb-2">
          <LucidePenLine size={20} />
          <label htmlFor="about us" className="sm:text-md">
            <Typography variant="h4" fontWeight="semiBold">
              Caption
            </Typography>
          </label>
        </div>
        <Textarea
          placeholder="Enter caption for events"
          className="sm:w-80 w-full"
          required
          {...register("eventDescription", {
            required: "This field is required",
          })}
        />

        <div className="mt-5">
          <Button
            className="mt-12 w-32"
            variant="default"
            size="lg"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <Spinner size="md" /> : "Save | Submit"}
          </Button>
        </div>
        {isLoading && (
          <div className="flex justify-center mt-5">
            <Spinner size="md" />
          </div>
        )}
      </form>
      <EditPhotoModal
        isOpen={editPhotoModal}
        onClose={() => setEditPhotoModal(false)}
      />
    </WidthWrapper>
  );
};

export default Index;
