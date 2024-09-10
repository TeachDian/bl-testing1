"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Button } from "@/common/components/shadcn/ui/button";
import { FolderOpen } from "lucide-react";

interface UploadPhotoProps {
  imageKey?: string;
  alt: string;
  width: number;
  height: number;
  className: string;
}

const UploadPhoto: React.FC<UploadPhotoProps> = ({
  imageKey,
  alt = "Upload Photo",
  width = 300, 
  height = 250,
  className = "",
}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(imageKey || null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`flex flex-col items-end ${className}`} style={{ width }}>
      <div
        className="relative flex justify-center items-center bg-gray-200 border"
        style={{ width, height }}
      >
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={alt}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        ) : (
          <p className="text-center text-black font-semibold text-base">
            {alt}
          </p>
        )}
      </div>
      <div className="mt-2 flex items-center space-x-2">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          ref={fileInputRef}
          className="hidden"
        />
        <Button variant="default" onClick={handleButtonClick}>
          Upload
        </Button>
        <FolderOpen size={35} />
      </div>
    </div>
  );
};

export default UploadPhoto;
