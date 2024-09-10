import { Button } from "@/common/components/shadcn/ui/button";
import { Card, CardContent } from "@/common/components/shadcn/ui/card";
import { Typography } from "@/common/components/ui/Typography";
import Image from "next/image";
import React from "react";

interface ImageProps {
  imageKey: string;
  alt: string;
  width: number;
  height: number;
}

interface DummyProduct {
  id: number;
  image: ImageProps;
  productName: string;
  farmersName: string;
  price: number;
}

interface Props {
  items: DummyProduct[];
  onViewDetails: (item: ImageProps) => void;
}

const CartCards = ({ items, onViewDetails }: Props) => {
  return (
    <div className="w-full px-4 py-8">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item.id} className="hover:shadow-lg">
            <Card>
              <CardContent>
                <div className="relative w-full h-56">
                  <Image
                    src={item.image.imageKey}
                    alt={item.image.alt}
                    layout="fill"
                    objectFit="contain"
                    className="rounded-md object-fit"
                  />
                </div>
                <div className="space-y-2 mt-4 mb-4">
                  <Typography fontWeight="semiBold">
                    Name: {item.productName}
                  </Typography>
                  <Typography className="text-gray-600">
                    Farmer: {item.farmersName}
                  </Typography>
                  <Typography className="text-orange-500">
                    Price: {item.price}
                  </Typography>
                </div>
                <div className="flex flex-col space-y-2">
                  <Button className="bg-gradient-primary hover:bg-orange-200">
                    Add to cart
                  </Button>
                  <Button variant="outline" onClick={() => onViewDetails(item.image)}>
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartCards;
