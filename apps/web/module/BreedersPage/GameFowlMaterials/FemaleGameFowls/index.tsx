"use client";
import React, { useState } from "react";
import { Typography } from "@/common/components/ui/Typography";
import { WidthWrapper } from "@/common/components/WidthWrapper";
import PaginatedTable from "@/module/Admin/component/PaginatedTable";
import { TableCell, TableRow } from "@/common/components/shadcn/ui/table";
import { LucideBookOpen, LucideCircleUser } from "lucide-react";
import Image from "next/image";
import { Button } from "@/common/components/shadcn/ui/button";

interface TableData {
  photo: string;
  microchip: string;
  wingBand: string;
  breed: string;
  age: string;
  origin: string;
  status: string;
}

const tableData: TableData[] = [
  {
    photo: "/path-to-image1.jpg",
    microchip: "950823",
    wingBand: "23568",
    breed: "1/2 Sweater + 1/2 Hatch",
    age: "1.50",
    origin: "Reyes Breeder Farm",
    status: "Brood Hen",
  },
  {
    photo: "/path-to-image2.jpg",
    microchip: "756231",
    wingBand: "256987",
    breed: "1/2 Round Head + 1/4 Lemon + 1/4 Kelso",
    age: "1.67",
    origin: "Sandoval Breeder Farm",
    status: "Brood Hen",
  },
  {
    photo: "/path-to-image3.jpg",
    microchip: "789561",
    wingBand: "23047",
    breed: "1/4 Albany + 1/4 Sid Taylor + 1/4 Madras + 1/4 Luk Thai",
    age: "2.00",
    origin: "Dela Pena Breeder Farm",
    status: "Brood Hen",
  },
  {
    photo: "/path-to-image4.jpg",
    microchip: "789564",
    wingBand: "21234",
    breed: "3/4 O-Shamo + 1/4 Kinpa",
    age: "2.30",
    origin: "Mondes Breeder Farm",
    status: "Brood Hen",
  },
];

const FemaleGameFowls: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = tableData.filter(
    (item) =>
      item.microchip.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.origin.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <WidthWrapper width="full">
      <div className="flex flex-col w-full space-y-4">
        <div className="flex gap-2 items-center">
          <LucideBookOpen size={25} />
          <Typography variant="h1" fontWeight="semiBold" className="flex items-center">
            Game Fowl Materials
          </Typography>
        </div>

        <div className="border-2 shadow rounded-md h-auto p-5 flex flex-col">
          <div className="flex gap-2 items-center">
            <LucideCircleUser size={20} />
            <Typography variant="h3" fontWeight="semiBold">
              List of Female Game Fowls
            </Typography>
          </div>
          <div className="border-b py-2"></div>

          <div className="mt-4">
            <PaginatedTable
              data={filteredData}
              headers={[
                "Photo",
                "Microchip No.",
                "Wing Band No.",
                "Cross / Breed",
                "Age",
                "Origin Farm",
                "Status",
                "Actions",
              ]}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              totalPages={Math.ceil(filteredData.length / itemsPerPage)}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onItemsPerPageChange={setItemsPerPage}
              renderRow={(item: TableData) => (
                <TableRow key={item.microchip}>
                  <TableCell>
                    <Image src={item.photo} alt="Game Fowl" width={50} height={50} />
                  </TableCell>
                  <TableCell>{item.microchip}</TableCell>
                  <TableCell>{item.wingBand}</TableCell>
                  <TableCell>{item.breed}</TableCell>
                  <TableCell>{item.age}</TableCell>
                  <TableCell>{item.origin}</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>
                  <div className="flex mt-5 space-x-2">
          <Button variant="default">View Details</Button>
          <Button variant="outline">Market Place</Button>
        </div>
                  </TableCell>
                </TableRow>
              )}
            />
          </div>
        </div>
      </div>
    </WidthWrapper>
  );
};

export default FemaleGameFowls;
