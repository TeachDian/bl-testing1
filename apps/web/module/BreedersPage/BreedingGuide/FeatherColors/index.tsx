"use client";
import React, { useState } from "react";
import { Typography } from "@/common/components/ui/Typography";
import { WidthWrapper } from "@/common/components/WidthWrapper";
import PaginatedTable from "@/module/Admin/component/PaginatedTable";
import { TableCell, TableRow } from "@/common/components/shadcn/ui/table";
import { LucideBookOpen, LucideCircleUser } from "lucide-react";

interface TableData {
  color: string;
  details: string;
}

const tableData: TableData[] = [
  { color: "Black Breasted Red", details: "Red neck and breast with black body and tail feathers." },
  { color: "Blue", details: "Bluish-gray body with darker lacing around the feather edges." },
  { color: "Brown Red", details: "Deep brown or mahogany neck and breast with black body and tail feathers." },
  { color: "Brown Red", details: "Deep brown or mahogany neck and breast with black body and tail feathers." },
  { color: "Buff", details: "Yellowish or light brown feathers, resembling a lion's coat." },
  { color: "Golden Duckwing", details: "Golden or yellowish neck and back with black breast and tail feathers." },
  { color: "Gray", details: "Mix of light and dark gray feathers with a subtle sheen." },
  { color: "Red Pyle", details: "White body with red neck and sometimes red on wings and saddle." },
  { color: "Silver Duckwing", details: "Silver or white neck and back with black breast and tail feathers (males), lighter gray (females)." },
  { color: "Wheaten", details: "Golden or wheat-like body color with darker wings and tail feathers (common in hens)." },
  { color: "White", details: "Pure white feathers throughout the body." },
];

const Feathercolors: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = tableData.filter(
    (item) =>
      item.color.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.details.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <WidthWrapper width="full">
      <div className="flex flex-col w-full space-y-4">
        <div className="flex gap-2 items-center">
          <LucideBookOpen size={25} />
          <Typography
            variant="h1"
            fontWeight="semiBold"
            className="flex items-center"
          >
            Breeding Guide
          </Typography>
        </div>

        <div className="border-2 shadow rounded-md h-auto p-5 flex flex-col">
          <div className="flex gap-2 items-center">
          <LucideCircleUser size={20} />
            <Typography variant="h3" fontWeight="semiBold">
              Game Fowl Feather Colors
            </Typography>
          </div>
          <div className="border-b py-2"></div>

          <div className="mt-4">
            <PaginatedTable
              data={filteredData}
              headers={["Game Fowl Feather Color", "Details"]}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
              totalPages={Math.ceil(filteredData.length / itemsPerPage)}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onItemsPerPageChange={setItemsPerPage}
              renderRow={(item: TableData) => (
                <TableRow key={item.color}>
                  <TableCell>{item.color}</TableCell>
                  <TableCell>{item.details}</TableCell>
                </TableRow>
              )}
            />
          </div>
        </div>
      </div>
    </WidthWrapper>
  );
};

export default Feathercolors;
