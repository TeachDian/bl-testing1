import React from "react";
import ModalContainer from "@/common/components/ModalContainer";
import { Typography } from "@/common/components/ui/Typography";
import Image from "next/image";
import { Button } from "@/common/components/shadcn/ui/button";

type ViewPicturesModalProps = {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
};

const ViewPicturesModal: React.FC<ViewPicturesModalProps> = ({
  isOpen,
  onClose,
  images,
}) => {
  return (
    <ModalContainer isOpen={isOpen} onClose={onClose} headerClassName="bg-gradient-secondary">
      <div className="p-4">
        <Typography variant="h2" className="mb-4">
          Slider Photos
        </Typography>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((slider, index) => (
            <div key={index} className="relative w-full h-64">
              <Image
                src={slider}
                alt={`Picture ${index + 1}`}
                className="object-cover w-full h-full rounded-md"
                width={300} 
                height={300} 
                placeholder="blur" 
                blurDataURL="/apps/web/public/13.jpg"
                onError={(e) => (e.currentTarget.src = '/apps/web/public/13.jpg')}
              />
            </div>
          ))}
        </div>
        <div className="mt-4 text-right">
          <Button size="lg" variant="outline" onClick={onClose}>
            Back
          </Button>
        </div>
      </div>
    </ModalContainer>
  );
};

export default ViewPicturesModal;
