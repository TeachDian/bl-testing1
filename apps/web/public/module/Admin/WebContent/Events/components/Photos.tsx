"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import { Typography } from "@/common/components/ui/Typography";
import Image from "next/image";
import { FileWithPath, useDropzone } from "react-dropzone";
import { cn } from "@/common/helpers/cn";
import usePhotoStore from "@/module/Store/usePhotoStore";
import EditPhotoModal from "./EditPhotoModal";

const Photos = () => {
  const [editPhotoModal, setEditPhotoModal] = useState(false);
  const isPending: boolean = false;
  const photos = usePhotoStore((state) => state.photos);
  const setPhotos = usePhotoStore((state) => state.setPhotos);
  const setToEditPhotoIndex = usePhotoStore(
    (state) => state.setToEditPhotoIndex
  );
  const { getRootProps, getInputProps, isFocused } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/jpg": [],
      "image/png": [],
    },
    onDrop: (acceptedPhotos: FileWithPath[]) => {
      const updatedPhotos = acceptedPhotos.map((file, index) => ({
        file: Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
        key: "",
        description: "",
        tags: "",
        isMain: (photos?.length === 0 || !photos) && index === 0 ? true : false,
      }));
      setPhotos([...(photos || []), ...updatedPhotos]);
    },
    onDropRejected: () => {
      toast.error("Only images are allowed");
    },
    disabled: isPending,
  });

  return (
    <div>
      <div>
        <div className="grid grid-cols-4 gap-6">
          <>
            <div className="relative h-52 w-full overflow-hidden bg-primary-100 hover:bg-primary-200 flex justify-center items-center rounded-lg hover:cursor-pointer">
              <label
                {...getRootProps()}
                htmlFor="dropzone-file"
                className={cn(
                  isPending && "opacity-50",
                  isFocused && "opacity-80",
                  "flex flex-col items-center justify-center w-full h-52 border-2 border-primary-300 border-dashed rounded-lg cursor-pointer bg-primary-50 hover:bg-primary-100"
                )}
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-primary-500"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <Typography className="mb-2 text-text-500 px-2 text-center">
                    <span className="font-semibold">Drop photos here</span> or
                    click this
                  </Typography>
                  <Typography className="text-xs text-text-500">
                    PNG, JPG or GIF
                  </Typography>
                </div>
                <input {...getInputProps()} />
              </label>
            </div>
            {photos?.map((photo, index) => {
              return !photo.isDeleted ? (
                <div key={index} className="h-full">
                  {photo.isMain && (
                    <div className="flex justify-center">
                      <span className="absolute mt-[-16px] z-10 rounded-md bg-secondary-500 px-2 py-1 text-sm font-medium text-white">
                        Preferred main photo
                      </span>
                    </div>
                  )}
                  <button
                    className={cn(
                      `relative h-52 w-full bg-primary-50 rounded-lg`,
                      photo.isMain && "border-2 border-secondary-500"
                    )}
                    type="button"
                    onClick={() => {
                      setToEditPhotoIndex(index);
                      setEditPhotoModal(true);
                    }}
                  >
                    <Image
                      src={photo?.file?.preview ?? `/assets/${photo.key}`}
                      alt={`preview-` + index}
                      layout="fill"
                      objectFit="cover"
                      objectPosition="center"
                      className="rounded-lg"
                    />
                  </button>
                  <Typography
                    className={`${photo.description ? "text-gray-900" : "text-gray-500"} text-sm mt-3 truncate`}
                  >
                    {photo.description || "No description"}
                  </Typography>
                </div>
              ) : null;
            })}
          </>
        </div>
        <EditPhotoModal
          isOpen={editPhotoModal}
          onClose={() => setEditPhotoModal(false)}
        />
      </div>
    </div>
  );
};

export default Photos;
