"use client";
import { WidthWrapper } from "@/common/components/WidthWrapper";
import React, { useState } from "react";
import { Typography } from "@/common/components/ui/Typography";
import { LucideStore } from "lucide-react";
import ViewDetailsModal from "./ViewDetailsModal";
import CartCards from "../components/CartCards";
import { IImage } from "../Events/EventsSection";


const dummyProducts = [
  {
    id: 1,
    image: 
      {
        imageKey: "/cart1.jpg",
        alt: "Events image",
        width: 300,
        height: 200,
      },
    
    productName: "Stag Booster",
    farmersName: "Johny Tumalia",
    price: 200
  },
  {
    id: 2,
    image: 
      {
        imageKey: "/cart2.png",
        alt: "Events image",
        width: 300,
        height: 200,
      },
    
    productName: "Propel Feed Booster",
    farmersName: "Alice Smith",
    price: 150
  },
  {
    id: 3,
    image: 
      {
        imageKey: "/cart3.jpg",
        alt: "Events image",
        width: 300,
        height: 200,
      },
    
    productName: "Fighting Cock",
    farmersName: "David Johnson",
    price: 80
  },
  {
    id: 4,
    image: 
      {
        imageKey: "/cart4.jpg",
        alt: "Events image",
        width: 300,
        height: 200,
      },
    
    productName: "Thunder Powder",
    farmersName: "Emily Brown",
    price: 300
  },
  {
    id: 5,
    image: 
      {
        imageKey: "/cart5.jpg",
        alt: "Events image",
        width: 300,
        height: 200,
      },
    
    productName: "Power Booster Feeds",
    farmersName: "Michael Wilson",
    price: 120
  },
  {
    id: 6,
    image: 
      {
        imageKey: "/cart6.jpg",
        alt: "Events image",
        width: 400,
        height: 250,
      },
    
    productName: "Farm Accessories",
    farmersName: "Michael Wilson",
    price: 120
  }
];

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IImage | null>(null);

  const openModal = (item: IImage) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <WidthWrapper width="wide" className="mt-40 mb-36">
      <div className="w-full">
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <Typography
              variant="h1"
              fontWeight="semiBold"
              className="flex items-center"
            >
              Marketplace
            </Typography>
            <LucideStore />
          </div>
          <div>
            <CartCards items={dummyProducts} onViewDetails={openModal} />
          </div>

          <ViewDetailsModal
            isModalOpen={isModalOpen}
            onClose={closeModal}
            selectedItem={selectedItem}
          />
        </div>
      </div>
    </WidthWrapper>
  );
};

export default Index;
