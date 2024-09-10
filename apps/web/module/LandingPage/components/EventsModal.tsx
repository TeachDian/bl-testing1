import ModalContainer from "@/common/components/ModalContainer";
import React from "react";
import { IImage } from "../Events/EventsSection";
import Image from "next/image";

interface EventsModalProps {
  isModalOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  selectedImage: IImage | null;
}

const EventsModal: React.FC<EventsModalProps> = ({
  selectedImage,
  isModalOpen,
  onClose,
  children,
}) => {
  return (
    <ModalContainer isOpen={isModalOpen} onClose={onClose} size="sm">
      {isModalOpen && (
        <div className="modal-overlay" onClick={onClose}>
          <div className="modal">
            <div className="modal-content">
              <Image
                src={selectedImage?.imageKey || ""}
                alt={selectedImage?.alt || ""}
                width={selectedImage?.width}
                height={selectedImage?.height}
                className="object-cover w-full"
              />
            </div>
          </div>
        </div>
      )}
    </ModalContainer>
  );
};

export default EventsModal;
