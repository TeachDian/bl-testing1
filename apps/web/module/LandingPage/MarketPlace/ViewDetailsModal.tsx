import ModalContainer from "@/common/components/ModalContainer";
import React from "react";
import Image from "next/image";
import { Typography } from "@/common/components/ui/Typography";
import { Button } from "@/common/components/shadcn/ui/button";

const detailsItem = [
  { "Wing Band Number": "text here" },
  { "Microchip Number": "text here" },
  { "Game Fowl Gender": "text here" },
  { "Breed / Bloodline": "text here" },
  { "Feather Color": "text here" },
  { "Leg Color": "text here" },
  { "Markings": "text here" },
  { "Age": "text here" },
  { "Vaccine": "text here" },
  { "Origin Farm": "text here" },
  { "Price": "text here" },
];

interface ViewDetailsModalProps {
  isModalOpen: boolean;
  onClose: () => void;
  selectedItem: any | null;
}

const ViewDetailsModal: React.FC<ViewDetailsModalProps> = ({
  selectedItem,
  isModalOpen,
  onClose,
}) => {
  return (
    <ModalContainer isOpen={isModalOpen} onClose={onClose} size="md">
      {isModalOpen && selectedItem && (
        <div className="modal-overlay" onClick={onClose}>
          <div className="modal">
            <div className="modal-content h-[500px] overflow-y-auto p-5">
              <div className="sm:grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col items-center">
                  <div className="relative w-full h-64">
                    <Image
                      src={selectedItem.imageKey}
                      alt={selectedItem.alt}
                      layout="fill"
                      objectFit="contain"
                      className="object-contain rounded-md"
                    />
                  </div>
                  <div className="flex gap-4 p-4">
                    <Image
                      src={selectedItem.imageKey}
                      alt={selectedItem.alt}
                      width={120}
                      height={120}
                      className="object-contain rounded-md"
                    />
                    <Image
                      src={selectedItem.imageKey}
                      alt={selectedItem.alt}
                      width={120}
                      height={120}
                      className="object-contain rounded-md"
                    />
                    <Image
                      src={selectedItem.imageKey}
                      alt={selectedItem.alt}
                      width={120}
                      height={120}
                      className="object-contain rounded-md"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  {detailsItem.map((detail, index) => (
                    <Typography key={index} fontWeight="semiBold">
                      <div className="flex">
                        <div className="w-1/2">{Object.keys(detail)[0]}:</div>
                        <div>{Object.values(detail)[0]}</div>
                      </div>
                    </Typography>
                  ))}
                  <div className="flex gap-4 mt-4 fixed bottom-12">
                    <Button size="lg" className="bg-gradient-primary">
                      Add to cart
                    </Button>
                    <Button size="lg" variant="default">
                      Buy now
                    </Button>
                    <Button size="lg" variant="outline"  onClick={onClose}>
                      Back
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </ModalContainer>
  );
};

export default ViewDetailsModal;
